<template>
  <section class="product_list">
    <div class="box">
      <slot></slot>
      <div class="data">
        <template v-if="isMobile===0">
          <CloudMinerItem v-for="d,k in $parent.cloudMinerDate" :d="d" :key="k"></CloudMinerItem>
        </template>
        <template v-else-if="isMobile===1">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists" v-if="!showcontent">
            <MobileCloudMinerItem v-for="d,k in cloudMinerDate" :d="d" @click="goPay(d.id)" :key="k"></MobileCloudMinerItem>
          </div>
          <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
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
      page: {
        type: String
      },
      status: {
        type: Number
      }
    },
    data () {
      return {
        loading: false,
        showcontent: false,
        cloudMinerDate: [],
        len: 0,
        now: 1,
        total: -1,
        currentPage: 1
      }
    },
    asyncData ({ params }) {
      return {type: params.type}
    },
    methods: {
      loadMore () {
        let self = this
        let obj = {token: this.token, page: this.currentPage, product_type: '1'}
        this.loading = true
        if (this.total === 0) {
          this.loading = false
          this.$parent.show = true
          return
        } else {
          this.$parent.show = false
        }
        this.type = this.$route.params.type
        if (this.status) {
          obj = Object.assign({status: this.status}, obj)
        }
        if (this.total > this.cloudMinerDate.length || this.cloudMinerDate.length === 0) {
          let time = this.cloudMinerDate.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('productList', {sign: api.serialize(obj)}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.page.count
                for (let i = 0, len = res.data.length; i < len; i++) {
                  self.cloudMinerDate.push(res.data[i])
                }
                self.loading = false
                self.currentPage++
              })
            }).catch(res => {
              console.log(res)
            })
          }, time)
        } else {
          this.loading = false
        }
      },
      goPay (id) {
        localStorage.setItem('params', JSON.stringify([ id, '2']))
        this.$router.push({path: '/' + this.page + '/detail/'})
      }
    },
    mounted () {
      this.loadMore()
    },
    watch: {
      'status': function () {
        this.currentPage = 1
        this.cloudMinerDate = []
        this.total = -1
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
      .box .data .item{
        h3{
          margin-bottom:0;
        }
      }
    }
  }
</style>
