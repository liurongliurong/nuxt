<template>
  <section class="compute_shop">
    <Sort v-if="type==='1'" :sort="sort" :sortNav="sortNav"? :status="status" @setStatus="setStatus" @fetchData="fetchData"></Sort>
    <MinerList v-if="type==='1'" :status="status" :minerData="minerData" :len="len" :now="now" @getMobileData="getMobileData"></MinerList>
    <CloudMinerList v-else :status="status" :cloudMinerData="cloudMinerData" :len="len" :now="now" @getMobileData="getMobileData"></CloudMinerList>
    <Pager :len="len" v-if="!isMobile" :now="now" @setPage="setPage"></Pager>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import CloudMinerList from '@/components/miner/CloudMinerList'
  import MinerList from '@/components/miner/MinerList'
  import Pager from '@/components/common/Pager'
  import Sort from '@/components/common/Sort'
  export default {
    components: {
      CloudMinerList, Pager, Sort, MinerList
    },
    data () {
      return {
        sort: [{title: '价格', option: 'price_desc'}, {title: '算力', option: 'base_desc'}, {title: '剩余总数', option: 'num_desc'}],
        sortNav: [{name: 'status', title: '商品状态', options: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热'}, {code: 1, title: '热销'}, {code: 2, title: '已售罄'}]}],
        sortNav2: [{name: 'status', title: '商品状态', options: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热'}, {code: 5, title: '热销'}, {code: 10, title: '活动'}, {code: 1000, title: '转售'}, {code: 7, title: '已售罄'}]}],
        cloudMinerData: [],
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
      fetchData (sort, more) {
        var self = this
        this.cloudMinerData = []
        this.minerData = []
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
              if (more) {
                for (let i = 0, len = res.data.length; i < len; i++) {
                  self.minerData.push(res.data[i])
                }
              } else {
                self.minerData = res.data
              }
            } else {
              if (more) {
                for (let i = 0, len = res.data.length; i < len; i++) {
                  self.cloudMinerData.push(res.data[i])
                }
              } else {
                self.cloudMinerData = res.data
              }
            }
            self.show = !res.data.length
            if (self.now > 1) return false
            self.len = res.page.total_page
          })
        })
      },
      setStatus (n) {
        this.now = 1
        this.status = n
        if (this.isMobile) {
          this.fetchData(this.status, 1)
        } else {
          this.fetchData(this.status)
        }
      },
      getMobileData (isMore) {
        if (isMore) {
          this.now++
          this.fetchData(0, 1)
        }
      },
      setPage (n) {
        this.now = n
        if (!this.isMobile) {
          this.fetchData()
        }
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      if (!this.isMobile) {
        this.fetchData(this.status)
      } else {
        this.fetchData(this.status, 1)
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
