<template>
  <section class="product_list">
    <div class="box">
      <slot></slot>
      <div class="data">
        <template v-if="isMobile===0">
          <CloudMinerItem v-for="d,k in cloudMinerData" :d="d" :key="k"></CloudMinerItem>
        </template>
        <template v-else-if="isMobile===1">
          <div class="tab_cloud_miner">
            <span v-for="item in tabCloudMiner" :class="{tab_cloud_active: item.active}">{{item.name}}</span>
          </div>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists">
            <MobileCloudMinerItem v-for="item,key in cloudMinerData" :itemData="item" @click="goPay(item.id)" :key="key"></MobileCloudMinerItem>
          </div>
          <p v-if="loading" class="loadmore">加载中······</p>
        </template>
        <div class="nodata" v-if="$parent.show">
          <div class="nodata_img"></div>
          <p>即将上线，敬请期待</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import CloudMinerItem from '@/components/miner/CloudMinerItem'
  import MobileCloudMinerItem from '@/components/miner/MobileCloudMinerItem'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      CloudMinerItem, MobileCloudMinerItem
    },
    props: {
      status: {
        type: Number
      },
      cloudMinerData: {
        type: Array
      },
      len: {
        type: Number
      },
      now: {
        type: Number
      }
    },
    data () {
      return {
        loading: false,
        tabCloudMiner: [
          {name: '云算力市场', active: true},
          {name: '转售市场', active: false}
        ]
      }
    },
    asyncData ({ params }) {
      return {type: params.type}
    },
    mounted () {
      this.$emit('getMobileData')
    },
    methods: {
      loadMore () {
        if (this.now < this.len ) {
          this.loading = true
          this.$emit('getMobileData', 1)
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
        }
      },
      goPay (id) {
        api.setStorge('suanli', {proId: id, proType: '2'})
        this.$router.push({path: '/minerShop/detail/'})
      }
    },
    watch: {
      'status': function () {
        this.loading = false
        this.$emit('getMobileData')
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        isMobile: state => state.isMobile
      })
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .product_list{
    padding-top:20px;
    padding-bottom:30px;
    background: #f6f7f9;
    .box{
      @include main
      h2{
        @include data_title
      }
      .data{
        .tab_cloud_miner {
          @include flex(space-around, center)
          margin-top: 0.88rem;
          padding: 0.26rem 0;
          background: #327fff;
          color: #fff;
          font-size: 0.3rem;
          position: relative;

          .tab_cloud_active {
            font-weight: bold;
          }
        }
        .item{
          @include cloud_miner_box
        }
        .list_lists {
          padding-top: 0.2rem;
        }
      }
    }
    .loadmore{
      text-align: center;
    }
    .nodata{
      background: #fff;
      min-height:500px;
      padding-top:100px;
      text-align: center;
      .nodata_img{
        display: inline-block;
        width: 305px;
        height: 234px;
        background: url('../../assets/images/css_sprites.png') -10px -10px;
      }
      p{
        color:$light_black;
        margin-top:15px
      }
    }
    @media screen and (max-width: $mobile) {
      padding-top:0;
      padding-bottom: 0.2rem;
      .box .data .item{
        h3{
          margin-bottom:0;
        }
      }
    }
  }
</style>
