<template>
  <div class="miner_list">
    <div class="miner_list_box">
      <slot></slot>
      <div :class="['box', {mobile_list_box: isMobile}]">
        <template v-if="isMobile===0">
          <MinerItem v-for="n,k in minerData" :n="n" :key="k"></MinerItem>
        </template>
        <template v-if="isMobile===1">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="item_box">
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
  import api from '@/util/function'
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
        loading: false,
        // minerDate: [],
        total: -1,
        currentPage: 1
      }
    },
    asyncData ({ params }) {
      return {type: params.type}
    },
    methods: {
      loadMore () {
        if (this.now < this.len ) {
          this.loading = true
          this.$emit('fetchData')
        } else {
          this.loading = false
        }
        // let self = this
        // let obj = {token: this.token, page: this.currentPage, product_type: '1'}
        // this.loading = true
        // if (this.total === 0) {
        //   this.loading = false
        //   this.$parent.show = true
        //   return
        // } else {
        //   this.$parent.show = false
        // }
        // this.type = this.$route.params.type
        // if (this.status) {
        //   obj = Object.assign({status: this.status}, obj)
        // }
        // if (this.total > this.minerDate.length || this.minerDate.length === 0) {
        //   let time = this.minerDate.length === 0 ? 0 : 1000
        //   setTimeout(() => {
        //     util.post('showList', {sign: api.serialize(obj)}).then(function (res) {
        //       api.checkAjax(self, res, () => {
        //         self.total = res.page.count
        //         for (let i = 0, len = res.data.length; i < len; i++) {
        //           self.minerDate.push(res.data[i])
        //         }
        //         self.loading = false
        //         self.currentPage++
        //       })
        //     })
        //   }, time)
        // } else {
        //   this.loading = false
        // }
      }
    },
    mounted () {
      this.loadMore()
    },
    watch: {
      'status': function () {
        // this.currentPage = 1
        // this.minerData = []
        // this.total = -1
        this.loadMore()
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
  .miner_list{
    background: #f6f7f9;
    padding-top: 20px;
    .miner_list_box{
      @include main
      .loadmore{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
      }
      h2{
        @include data_title
      }
      .box:not(.mobile_list_box){
        @include row(4, 1%)
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
