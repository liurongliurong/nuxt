<template>
  <div class="currency" v-if="isMobile===0">
    <info-nav></info-nav>
    <div class="currency_content">
      <currency-list></currency-list>
    </div>
    <div class="currency_items">
      <h1>主流币种资料<span class="icon iconfont icon-jiantou"></span></h1>
      <div class="currency_item">
        <div class="item" @click="goDetail(n.id)" v-for="n, k in mainCurrency" :key="k">
          <img :src="n.icon"/>
          <span>{{n.coin_name}}</span>
        </div>
      </div>
      <h1 class="other_list">各类代币资料<span class="icon iconfont icon-jiantou"></span></h1>
      <div class="currency_item">
        <div class="item" @click="goDetail(n.id)" v-for="n, k in otherCurrency" :key="k">
          <img :src="n.icon"/>
          <span>{{n.coin_name}}</span>
        </div>
      </div>
    </div>
  </div>
  <pageFrame v-else-if="isMobile===1">
    <scroll-list :content="content" :loading="loading" :showContent="showContent" @loadMore="loadMore" @back="showContent=false">
      <div class="currency_item" v-for="item, k in list" :key="k" @click="clickcontent(item.id)">
        <div class="left">
          <img :src="item.icon"/>
          <p>{{item.coin_name}}</p>
        </div>
        <div class="right">市值: 暂无</div>
      </div>
    </scroll-list>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import { mapState } from 'vuex'
  import CurrencyList from '@/components/common/CurrencyList'
  import InfoNav from '@/components/common/InfoNav'
  import pageFrame from '@/components/common/PageFrame'
  import ScrollList from '@/components/common/ScrollList'
  export default {
    components: {
      InfoNav, CurrencyList, pageFrame, ScrollList
    },
    data () {
      return {
        mainCurrency: [],
        otherCurrency: [],
        now: 1,
        total: 0,
        loading: false,
        list: [],
        showContent: false,
        content: {}
      }
    },
    head () {
      return {
        title: '比特币-数字货币-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '数字货币,比特币,莱特币,以太币,数字货币查询' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）列举了常见的数字货币，如比特币，莱特币，以太币等主流币种，以及各类代币如DASH、ZCash、EOS等。' }
        ]
      }
    },
    methods: {
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/currency/detail'})
      },
      loadMore () {
        if (this.total > this.list.length || this.list.length === 0) {
          this.loading = true
          util.post('showCoinlist_h5', {token: 0, page: this.now}).then((res) => {
            this.loading = false
            this.now++
            for (let i = 0, len = res.msg.list.length; i < len; i++) {
              this.list.push(res.msg.list[i])
            }
            if (this.now > 1) return false
            this.total = res.msg.total
          })
        } else {
          this.loading = false
        }
      },
      clickcontent (id) {
        this.showContent = true
        util.post('showCoinInfoDetail', {token: 0, coin_id: id}).then((res) => {
          this.content = res.msg
        })
      },
      pageInit () {
        if (this.isMobile !== false) {
          if (this.isMobile) return false
          util.post('showCoinInfo', {token: 0}).then((res) => {
            this.mainCurrency = res.msg.main_coin
            this.otherCurrency = res.msg.other_coin
          })
        } else {
          setTimeout(() => {
            this.pageInit()
          }, 5)
        }
      }
    },
    mounted () {
      this.pageInit()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style lang="scss">
  .currency{
    background: #eceff8;
    overflow: hidden;
    .currency_content{
      height: 540px;
      background: url('~assets/images/information.png');
      background-size: 100% 100%;
      padding-top: 30px;
      .currency_list {
        padding-top: 20px;
        background: #fff;
        box-shadow: none;
        h4 {
          margin-bottom: 0;
          padding-bottom: 10px;
        }
      }
    }
    .currency_items{
      width: 1180px;
      margin: 20px auto 60px;
      background: white;
      padding: 40px 62px 192px;
      h1{
        position:relative;
        color: #121212;
        font-size: 24px;
        font-weight: 800;
        span{
          font-size: 20px;
          margin-left: 13px;
          transform:rotate(90deg);
          position:absolute;
          top:3px;
        }
        &.other_list{
          margin-top: 58px;
        }
      }
      .currency_item{
        padding-top: 30px;
        overflow: hidden;
        .item{
          width: 240px;
          height: 45px;
          border:1px solid #bfbfbf;
          float: left;
          margin-right: 24px;
          margin-bottom: 17px;
          cursor: pointer;
          display: flex;
          align-items: center;
          img{
            width:25px;
            margin-left: 20px;
          }
          span{
            margin-left: 20px;
            line-height: 45px;
            font-size: 14px;
            color: #333333;
          }
          &:hover {
            box-shadow:#ddd 0 0 10px;
          }
        }
      }
    }
  }
  .scroll_list .list_box{
    .currency_item{
      width: 100%;
      height: 1.08rem;
      display:flex;
      border-bottom: 1px solid #bfbfbf;
      .left{
        float: left;
        width: 50%;
        display:flex;
        img{
          width: 0.32rem;
          height: 0.32rem;
          position: relative;
          top:0.37rem;
        }
        p{
          font-weight: 800;
          margin-left: .16rem;
          width: 90%;
          white-space: normal;
          text-overflow: hidden;
          overflow: hidden;
          font-size: 0.28rem;
          line-height: 1.08rem;
        }
      }
      .right{
        float:right;
        width: 50%;
        font-size: 0.24rem;
        color: #747474;
        text-align: right;
        line-height:1.08rem;
      }
    }
  }
</style>
