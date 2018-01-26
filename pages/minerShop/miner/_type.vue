<template>
  <section class="compute_shop">
    <Sort :sort="sort" :sortText="sortText" :sortNav="type==='1'?sortNav:sortNav2" :status="status" @setStatus="setStatus" @fetchData="fetchData"></Sort>
    <MinerList v-if="type==='1'" :status="status" :minerData="minerData" :len="len" :now="now" @getMobileData="getMobileData"></MinerList>
    <CloudMinerList :status="status" :cloudMinerData="cloudMinerData" :len="len" :now="now" @getMobileData="getMobileData" v-else></CloudMinerList>
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
        sort: [
          {title: '价格', option: ['price_asc', 'price_desc']},
          {title: '算力', option: ['base_asc','base_desc']},
          {title: '剩余总数', option: ['num_asc', 'num_desc']}
        ],
        sortNav: [
          {
            name: 'status',
            title: '商品状态', 
            options: [
              {code: 0, title: '综合推荐'},
              {code: 1, title: '热销'},
              {code: 4, title: '预热'},
              {code: 2, title: '已售罄'}
            ]
          }
        ],
        sortNav2: [
          {
            name: 'status',
            title: '商品状态',
            options: [
              {code: 0, title: '综合推荐'},
              {code: 5, title: '热销'},
              {code: 4, title: '预热'},
              {code: 10, title: '活动'},
              {code: 1000, title: '转售'},
              {code: 7, title: '已售罄'}
            ]
          }
        ],
        cloudMinerData: [],
        minerData: [],
        len: 0,
        now: 1,
        show: false,
        status: 0,
        sortText: '',
        type : ''
      }
    },
    asyncData ({ params }) {
      return {type: params.type}
    },
    methods: {
      fetchData (sort, more) {
        var self = this
        this.type = this.$route.params.type
        var obj = {token: this.token, page: this.now, product_type: '1'}
        var url = ''
        if (sort) {
          this.sortText = sort
          obj = Object.assign({sort}, obj)
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
              self.setData(more, res.data, 'minerData')
            } else {
              self.setData(more, res.data, 'cloudMinerData')
            }
            self.show = !res.data.length
            if (self.now > 1) return false
            self.len = res.page.total_page
          })
        })
      },
      setStatus (n) {
        this.now = 1
        this.sortText = ''
        this.status = n
        this.fetchData()
      },
      getMobileData (isMore) {
        if (isMore) {
          this.now++
          this.fetchData('', 1)
        }
      },
      setPage (n) {
        this.now = n
        this.sortText = ''
        if (!this.isMobile) {
          this.fetchData()
        }
      },
      setData (more, data, dataText) {
        if (more) {
          for (let i = 0, len = data.length; i < len; i++) {
            this[dataText].push(data[i])
          }
        } else {
          this[dataText] = data
        }
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      if (!this.isMobile) {
        this.fetchData('')
      } else {
        this.fetchData('', 1)
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
