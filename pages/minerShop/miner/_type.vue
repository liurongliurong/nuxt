<template>
  <section class="compute_shop">
    <Sort :sort="sort"></Sort>
    <MinerList v-if="$route.params.type==='1'"></MinerList>
    <CloudMinerList page="minerShop" v-else></CloudMinerList>
    <Pager :len="len"></Pager>
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
  import SideBar from '@/components/home/SideBar'
  import Sort from '@/components/common/Sort'
  export default {
    components: {
      CloudMinerList, ProductNav, Pager, SideBar, Sort, MinerList
    },
    data () {
      return {
        sort: [{title: '价格', option: ['price_asc', 'price_desc'], value: 0}, {title: '算力', option: ['base_asc', 'base_desc'], value: 0}, {title: '出售总数', option: ['num_asc', 'num_desc'], value: 0}],
        cloudMinerDate: [],
        minerData: [],
        len: 0,
        now: 1,
        show: false,
        status: 0
      }
    },
    methods: {
      fetchData (sort) {
        var params = this.$route.params.type
        var self = this
        var obj = {token: this.token, page: this.now, product_type: '1'}
        var url = ''
        if (sort) {
          obj = Object.assign({sort: sort}, obj)
        }
        if (this.status) {
          obj = Object.assign({status: this.status}, obj)
        }
        if (this.$route.params.type === '1') {
          url = 'showList'
        } else {
          url = 'productList'
        }
        util.post(url, {sign: api.serialize(obj)}).then(function (res) {
          api.checkAjax(self, res, () => {
            if (self.$route.params.type === '1') {
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
  @import '~assets/css/style.scss';
  // @import '~assets/fonts/iconfont.css';
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
