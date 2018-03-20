<template>
  <div class="miner_list">
    <div class="miner_list_box">
      <slot></slot>
      <div :class="['box', {mobile_list_box: isMobile}]">
        <template v-if="isMobile===0">
          <MinerItem v-for="n,k in minerData" :n="n" :key="k"></MinerItem>
        </template>
        <template v-if="isMobile===1">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="item_box">
            <MobileMinerItem v-for="n,k in minerData" :n="n" :key="k"></MobileMinerItem>
          </div>
          <p v-if="loading"  class="loadmore">加载中······</p>
        </template>
        <div class="nodata" v-if="$parent.show">
          <div class="nodata_img"></div>
          <p>即将上线，敬请期待</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  import MinerItem from '@/components/miner/MinerItem'
  import MobileMinerItem from '@/components/miner/MobileMinerItem'
  export default {
    components: {
      MinerItem, MobileMinerItem
    },
    props: {
      status: {
        type: Number
      },
      minerData: {
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
      }
    },
    mounted () {
      this.$emit('getMobileData')
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
  .miner_list{
    background: #f6f7f9;
    padding-top: 50px;
    .miner_list_box{
      @include main
      .loadmore{
        width: 100%;
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
      }
      .box:not(.mobile_list_box){
        @include row(4, 1%)
      }
      .box.mobile_list_box{
        padding: 0 0.3rem;
      }
      .box.mobile_list_box .item_box{
        @include row(2)
      }
      .nodata{
        width:100%;
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
    }
    @media  screen and (max-width: 600px) {
      padding-top:0;
      .miner_list_box .box{
        padding:.5rem .5rem 0 .5rem;
        background: #fff;
      }
    }
  }
</style>
