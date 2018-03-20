<template>
  <div class="transaction">
    <info-nav></info-nav>
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
          <p class="time">
            <span>{{times[k]}}</span>
            / {{n.miner_kind}} / {{n.depreciate}}
          </p>
          <!-- <p class="time"><span v-if="times[k]>0" v-else-if="k==='hours'">{{times[k]}} 小时前</span><span v-else>现在</span> / {{n.miner_kind}} / {{n.depreciate}}</p> -->
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
  import InfoNav from '@/components/common/InfoNav'
  import { mapState } from 'vuex'
  export default {
    components: {
      Pager, InfoNav
    },
    data () {
      return {
        len: 0,
        now: 1,
        total: '',
        lists: '',
        times: [],
        show: -1
      }
    },
    head () {
      return {
        title: '比特币算力服务器二手交易信息-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '二手算力服务器,二手信息,二手交易,比特币算力服务器' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）二手算力服务器撮合交易，各类二手比特币算力服务器，买卖信息聚集地，如阿瓦隆算力服务器，蚂蚁算力服务器，翼比特算力服务器等。' }
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
      util.post('showSecondHandTradeList', {token: 0, page: this.now}).then((res) => {
        this.lists = res.msg.trade_info
        for (var a = 0; a < res.msg.trade_info.length; a++) {
          var date1 = res.msg.trade_info[a].created_time
          var date2 = new Date()
          var date3 = date2.getTime() - new Date(date1).getTime()
          var leave1 = date3 % (24 * 3600 * 1000)
          var days = Math.floor(date3 / (24 * 3600 * 1000)) * 24
          var hours = Math.floor(leave1 / (3600 * 1000)) + days
          var nowdays = ''
          if (hours >= 24) {
            nowdays = Math.floor(hours / 24) + ' 天前'
          } else {
            nowdays = hours + ' 小时前'
          }
          this.times.push(nowdays)
        }
        this.total = res.msg.num
        if (this.now > 1) return false
        this.len = Math.ceil(res.msg.num / 15)
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
            &:disabled {
              background: #fff !important;
              color: rgb(153, 153, 153) !important;
              border: solid rgb(153, 153, 153) 1px !important;
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
