<template>
  <section class="compute_shop">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <ProductNav page="computeShop"></ProductNav>
    <ProductList :sort="sort" :dataNav="dataNav" page="computeShop"></ProductList>
    <Pager :len="len"></Pager>
    <SideBar></SideBar>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import ProductList from '@/components/common/ProductList'
  import ProductNav from '@/components/common/ProductNav'
  import Pager from '@/components/common/Pager'
  import SideBar from '@/components/home/SideBar'
  export default {
    components: {
      ProductList, ProductNav, Pager, SideBar
    },
    data () {
      return {
        computeDate: [],
        sort: [{title: '价格', option: ['price_asc', 'price_desc'], value: 0}, {title: '算力', option: ['base_asc', 'base_desc'], value: 0}, {title: '出售总数', option: ['num_asc', 'num_desc'], value: 0}],
        dataNav: {'one_amount_value': {title: '每台服务器价格', unit: '元'}, 'hash': {title: '每台服务器算力', unit: 'T'}, 'buyed_amount': {title: '出售服务器总数', unit: '台'}, 'leftNum': {title: '剩余可售服务器', unit: '台'}},
        len: 0,
        now: 1,
        show: false
      }
    },
    methods: {
      fetchData (sort) {
        var params = this.$route.params.type
        var self = this
        var obj = {}
        if (sort) {
          obj = {product_type: params, sort: params[1]}
        } else {
          obj = {product_type: params}
        }
        obj =Object.assign(obj, {token: this.token, page: this.now})
        util.post('productList', obj).then(function (res) {
          api.checkAjax(self, res, () => {
            self.computeDate = res.data
            self.show = !res.data.length
            if (self.now > 1) return false
            self.len = res.page.total_page
          })
        })
      },
      getList (sort) {
        this.fetchData(sort)
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      this.fetchData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '.~assets/css/style.scss';
  // @import '~assets/fonts/iconfont.css';
  .compute_shop{
    .bg_box{
      @include bg(1920,420px,#1863f0)
      z-index: -1;
      .bg{
        background:url(~assets/images/cloudCompute.jpg) no-repeat;
      }
    }
    .pager{
      background: #f7f8fa;
      padding-top:0;
      padding-bottom:30px;
      .pager_box{
        border:0;
        @include main
        background: #fff;
        padding:30px 15px;
      }
    }
    .sort{
      border:0;
      border-bottom: 1px solid #e8e8e8;
    }
  }
</style>
