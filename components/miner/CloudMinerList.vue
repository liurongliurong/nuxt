<template>
  <section class="product_list">
    <div class="box">
      <slot></slot>
      <div class="data">
        <template v-if="isMobile===0">
          <CloudMinerItem v-for="d,k in cloudMinerData" :d="d" :key="k"></CloudMinerItem>
        </template>
        <template v-else-if="isMobile===1">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="list_lists">
            <MobileCloudMinerItem v-for="d,k in cloudMinerData" :itemData="d" @click="goPay(d.id)" :key="k"></MobileCloudMinerItem>
          </div>
          <p v-if="loading"  class="loadmore">加载中······</p>
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
        loading: false
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
      .data{
        .item{
          @include cloud_miner_box
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
