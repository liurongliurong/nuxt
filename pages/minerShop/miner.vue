<template>
  <section class="compute_shop">
    <Sort :sortNav="sortNav" :status="status" @setStatus="setStatus" @fetchData="fetchData"></Sort>
    <MinerList :status="status" :minerData="minerData" :len="len" :now="now" @getMobileData="getMobileData"></MinerList>
    <Pager :len="len" v-if="!isMobile" :now="now" @setPage="setPage"></Pager>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import { mapState } from 'vuex'
  import MinerList from '@/components/miner/MinerList'
  import Pager from '@/components/common/Pager'
  import Sort from '@/components/common/Sort'
  export default {
    components: {
      Pager, Sort, MinerList
    },
    data () {
      return {
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
        minerData: [],
        len: 0,
        now: 1,
        show: false,
        status: 0
      }
    },
    methods: {
      fetchData (sort, more) {
        var obj = {token: this.token, page: this.now, product_type: '1'}
        if (sort) {
          obj = Object.assign({sort}, obj)
        }
        if (this.status) {
          obj = Object.assign({status: this.status}, obj)
        }
        fetchApiData(this, 'showList', obj, (res) => {
          this.setData(more, res.data, 'minerData')
          this.show = !res.data.length
          if (this.now > 1) return false
          this.len = res.page.total_page
        })
      },
      setStatus (n) {
        this.now = 1
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
  .compute_shop {
    background: #f7f8fa;
    .pager {
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
