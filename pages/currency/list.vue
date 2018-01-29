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
    <div class="mobiledigital">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="digital_lists" v-if="!showcontent">
        <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)">
          <div class="left">
            <img :src="item.icon"/>
            <p>{{item.coin_name}}</p>
          </div>
          <p class="right">市值: 暂无</p>
        </div>
      </div>
      <p v-if="loading && !showcontent" class="loadmore">加载中······</p>
      <div class="quicknews_content"  v-if="showcontent">
        <div class="title">
          <span>{{content.title}}</span>
          <a class="button" onclick="window.location.reload()">< 返回列表</a>
        </div>
        <div class="info_quick" v-html="content.content"></div>
      </div>
    </div>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import CurrencyList from '@/components/common/CurrencyList'
  import InfoNav from '@/components/common/InfoNav'
  import pageFrame from '@/components/common/PageFrame'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      InfoNav, CurrencyList, pageFrame
    },
    data () {
      return {
        mainCurrency: [],
        otherCurrency: [],
        len: 0,
        now: 1,
        total: 0,
        loading: false,
        museum: [],
        showcontent: false,
        content: ''
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
        var self = this
        this.loading = true
        if (this.total > this.museum.length || this.museum.length === 0) {
          let time = this.museum.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('showCoinlist_h5', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.total
                for (let i = 0, len = res.list.length; i < len; i++) {
                  self.museum.push(res.list[i])
                }
                self.loading = false
                self.now++
              })
            }).catch(res => {
              console.log(res)
            })
          }, time)
        } else {
          this.loading = false
        }
      },
      clickcontent (id) {
        this.showcontent = true
        var self = this
        util.post('showCoinInfoDetail', {sign: 'token=0&coin_id=' + id}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      }
    },
    mounted () {
      var self = this
      util.post('showCoinInfo', {sign: api.serialize({token: 0})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.mainCurrency = res.main_coin
          self.otherCurrency = res.other_coin
        })
      })
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
  .mobiledigital{
    width: 100%;
    overflow: hidden;
    background: white;
    .digital_lists{
      width: 100%;
      padding:0 0.5rem;
      box-sizing: border-box;
      div{
        width: 100%;
        height: 1.08rem;
        display:flex;
        justify-content: space-between;
        border-bottom: 1px solid #bfbfbf;
        .left{
          float: left;
          width: 50%;
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
    .loadmore{
        width: 100%;
        height: 1.08rem;
        text-align: center;
        line-height: 1.08rem;
    }
    .quicknews_content{
      width: 100%;
      padding-bottom: 50px;
      background: white;
      .title{
        padding: 0.3rem;
      }
      span{
        font-weight: 800;
        font-size: 0.4rem;
      }
      a{
        float: right;
        color:#327fff;
        font-size: 0.27rem;
      }
      .info_quick{
        width: 100%;
        padding:0 0.5rem;
      }
    }
  }
</style>
