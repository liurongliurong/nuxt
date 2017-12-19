<template>
  <section class="compute_shop">
    <Sort :sort="sort" :sortNav="type==='1'?sortNav:sortNav2" :sortType="sortType"></Sort>
    <MinerList v-if="type==='1'" :status="status"></MinerList>
    <CloudMinerList page="minerShop" :status="status" v-else></CloudMinerList>
    <Pager :len="len" v-if="!isMobile"></Pager>
  </section>
</template>
<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import CloudMinerList from '@/components/miner/CloudMinerList'
  import MinerList from '@/components/miner/MinerList'
  import ProductNav from '@/components/miner/ProductNav'
  import Pager from '@/components/common/Pager'
  import Sort from '@/components/common/Sort'
  export default {
    components: {
      CloudMinerList, ProductNav, Pager, Sort, MinerList
    },
    data () {
      return {
        sort: [{title: '价格', option: 'price_desc'}, {title: '算力', option: 'base_desc'}, {title: '出售总数', option: 'num_desc'}],
        sortNav: [{name: 'status', title: '商品状态', options: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热中'}, {code: 1, title: '热销中'}, {code: 2, title: '已售罄'}]}],
        sortNav2: [{name: 'status', title: '商品状态', options: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热中'}, {code: 5, title: '热销中'}, {code: 7, title: '已售罄'}]}],
        sortType: {title: '商品列表', options: ['矿机', '云算力']},
        cloudMinerDate: [],
        minerData: [],
        len: 0,
        now: 1,
        show: false,
        status: 0
      }
    },
    asyncData ({ params }) {
      return {type: params.type}
    },
    methods: {
      fetchData (sort) {
        if (this.isMobile) {
          return
        }
        var self = this
        this.type = this.$route.params.type
        var obj = {token: this.token, page: this.now, product_type: '1'}
        var url = ''
        if (sort >= 0 && this.sort[sort] && this.sort[sort].option) {
          obj = Object.assign({sort: this.sort[sort].option}, obj)
        }
        if (this.status) {
          obj = Object.assign({status: this.status}, obj)
        }
        if (this.type === '1') {
          url = 'showList'
        } else {
          url = 'productList'
        }
        util.post(url, {sign: api.serialize(obj)}).then(function (res) {
          api.checkAjax(self, res, () => {
            if (self.type === '1') {
              self.minerData = res.data
            } else {
              self.cloudMinerDate = res.data
            }
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
      if (!this.isMobile) {
        this.fetchData()
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
  @import '~assets/css/style.scss';
  .compute_shop{
    background: #f7f8fa;
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
  }
</style>
