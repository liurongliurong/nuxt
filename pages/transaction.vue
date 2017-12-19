<template>
  <div class="transaction">
    <div class="compute_news_nav">
      <div class="compute_news_box">
        <router-link :to="n.path" v-for="n, k in computationallist" :class="{'active': k === 2}" :key="k">{{n.title}}</router-link>
      </div>
    </div>
    <div class="transaction_all">
      共有<span>{{total}}</span>条交易信息
    </div>
    <div class="transaction_lists">
      <div class="transaction_list" v-for="n,k in lists">
        <div class="transaction_left">
          <h2>
            <template v-if="n.status===2">
              <span class="gray">【求购】</span>
            </template>
            <template v-else-if="n.status===1">
              <span>【出售】</span>
            </template>
            <template v-else-if="n.status===5">
              <span style="color:#999;">【售罄】</span>
            </template>
            {{n.title}}
          </h2>
          <p class="text" v-html="n.content ? n.content : '暂无简介'"></p>
          <p class="address">{{n.address}}</p>
          <p class="time"><span v-if="times[k]>0">{{times[k]}} 小时前</span><span v-else>现在</span> / {{n.miner_kind}} / {{n.depreciate}}</p>
        </div>
        <div class="transaction_right">
          <div class="mobile" v-if="show === k">
            <span class="icon iconfont icon-dianhua1" style="background:#999;" v-if="n.status===5"></span>
            <span class="icon iconfont icon-dianhua1" v-else></span>
            {{n.mobile}}
          </div>
          <div class="mobile" v-else>
            <span class="icon iconfont icon-dianhua1" style="background:#999;" v-if="n.status===5"></span>
            <span class="icon iconfont icon-dianhua1" v-else></span>
            {{n.mobile|format}}
          </div>
          <button @click="allclick(k)" v-if="n.status===5" style="background:#999;color:white;border:0;" disabled>点击查看完整号码</button>
          <button @click="allclick(k)" v-else>点击查看完整号码</button>
        </div>
      </div>
      <Pager :len="len"  style="padding-top:0;"></Pager>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import Pager from '@/components/common/Pager'
  import { mapState } from 'vuex'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        len: 0,
        now: 1,
        total: '',
        computationallist: [{title: '算力资讯', path: '/computeNews/list'}, {title: '设备之家', path: '/equipments/list'}, {title: '交易信息', path: '/transaction'}, {title: '挖矿币种', path: '/currency'}],
        lists: '',
        times: [],
        show: -1
      }
    },
    head () {
      return {
        title: '比特币矿机二手交易信息-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '二手矿机,二手信息,二手交易,比特币矿机' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）二手矿机撮合交易，各类二手比特币矿机，买卖信息聚集地，如阿瓦隆矿机，蚂蚁矿机，翼比特矿机等。' }
        ]
      }
    },
    methods: {
      allclick (i) {
        this.show = i
        if (!this.token) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'auth-login'})
          this.$store.commit('LOGOUT')
          return false
        }
      }
    },
    mounted () {
      var self = this
      util.post('showSecondHandTradeList', {sign: api.serialize({token: this.token ? this.token : 0, page: this.now})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.lists = res.trade_info
          for (var a = 0; a < res.trade_info.length; a++) {
            var date1 = res.trade_info[a].created_time
            var date2 = new Date()
            var date3 = date2.getTime() - new Date(date1).getTime()
            var leave1 = date3 % (24 * 3600 * 1000)
            var days = Math.floor(date3 / (24 * 3600 * 1000)) * 24
            var hours = Math.floor(leave1 / (3600 * 1000)) + days
            self.times.push(hours)
          }
          self.total = res.num
          if (self.now > 1) return false
          self.len = Math.ceil(res.num / 15)
        })
      }).catch(res => {
        console.log(res)
      })
    },
    filters: {
      format: api.telReadable
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style lang="scss" scoped>
  .transaction{
    width: 100%;
    overflow: hidden;
    margin:0 auto;
    background: #eceff8;
     .compute_news_nav{
      width: 100%;
      height: 50px;
      background: white;
      border-top: 1px solid #e5e5e5;
      .compute_news_box{
        width: 1180px;
        margin:0 auto;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        a{
          display:inline-block;
          width: 64px;
          height: 50px;
          box-sizing: border-box;
          text-align: center;
          margin-right: 34px;
          color: #666666;
          font-size: 14px;
          border-top: 2px solid white;
          &:hover{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
          &.router-link-active{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
          &.active{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
        }
      }
    }
    .transaction_all{
        width: 1180px;
        height: 40px;
        border:1px solid #f2e5d2;
        margin:0 auto;
        position: relative;
        margin-top: 20px;
        box-sizing: border-box;
        background: #fbfaf5;
        padding-left: 20px;
        line-height: 40px;
        color:#999999;
        font-size: 12px;
        box-shadow: #999 0 0 10px;
        span{
            color:#fe5039;
            font-weight: 800;
            margin:0 5px;
            font-size: 16px;
        }
    }
    .transaction_lists{
      width: 1180px;
      height: auto;
      padding-bottom:29px;
      margin: 0 auto;
      margin-top: 20px;
      .transaction_list{
          width: 100%;
          height: 150px;
          box-shadow: #999 0 0 10px;
          background:white;
          margin-bottom: 20px;
          .transaction_left{
              width: 75%;
              float: left;
              height: 100%;
              padding-top: 20px;
              padding-left: 20px;
              h2{
                  font-size: 16px;
                  color: #333333;
                  margin-bottom: 7px;
                  span{
                      color: #fe5039;
                      margin-right: 12px;
                  }
                  .gray{
                    color: #327fff;
                      margin-right: 12px;
                  }
              }
              .text{
                  font-size: 14px;
                  color:#999999;
                  width: 626px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  margin-bottom: 7px;
              }
              .address{
                  font-size: 14px;
                  color:#999999;
                  margin-bottom: 7px;
              }
              .time{
                  font-size: 14px;
                  color: #333333;
              }
          }
          .transaction_right{
              text-align: right;
              float: right;
              width: 266px;
              margin-right: 17px;
              margin-top: 28px;
              .mobile{
                  width: 266px;
                  height: 38px;
                  border:1px solid #dcdcdc;
                  line-height: 38px;
                  text-align: center;
                  color: #666;
                  font-weight: 800;
                  font-size: 18px;
                  span{
                    display:inline-block;
                    width: 38px;
                    height: 100%;
                    background: #fe5039;
                    border-right:1px solid #dcdcdc;
                    float: left;
                    line-height:46px;
                  }
                  .icon-dianhua1:before{
                    color:white;
                    font-size:24px;
                    font-weight: 100;
                  }
              }
              button{
                  width: 266px;
                  height: 38px;
                  font-size: 16px;
                  color: #fe5039;
                  border:1px solid #fe5039;
                  margin-top: 18px;
                  background:white;
                  &:hover{
                    background: #fe5039;
                    color: white;
                  }
              }
          }
          &:hover{
            background: #f6f7fb;
            cursor: pointer;
          }
      }
    }
  }
</style>

