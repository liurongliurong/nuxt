<template>
  <article class="user">
    <div class="info">
      <div class="box">
        <div class="welcome">
          <h2>{{time}}，{{mobile|format}}</h2>
          <div class="line"></div>
          <div class="icons">
            <span class="iconfont active"></span>
            <span :class="['iconfont', {active: true_name}]"></span>
            <span :class="['iconfont', {active: bank_card}]"></span>
            <span>上次登录时间：{{new Date(last_login_time*1000)|date}}</span>
          </div>
        </div>
        <router-link class="message" to="/user/message" v-if="unread_num">
          <span class="iconfont"></span>
          <span>未读信息：{{unread_num}}</span>
        </router-link>
      </div>
    </div>
    <section class="main">
      <div class="box">
        <aside class="con" v-if="!$route.path.includes('accountEvaluate')">
          <router-link :class="['item', {active:$route.path.includes(n.name)}]" :to="n.path" v-for="n,k in nav" :key="k">{{n.title}}</router-link>
        </aside><router-view class="main_content"></router-view>
      </div>
    </section>
  </article>
</template>

<script>
  import { mapState } from 'vuex'
  import util from '@/util'
  import api from '../util/function'
  export default {
    data () {
      return {
        nav: [{name: 'computeProperty', title: '算力资产', path: '/user/computeProperty'}, {name: 'account', title: '账户管理', path: '/user/account'}, {name: 'order', title: '订单管理', path: '/user/order/0'}, {name: 'address', title: '地址管理', path: '/user/address'}, {name: 'virtualCurrencyFlow', title: '币流水', path: '/user/virtualCurrencyFlow'}, {name: 'moneyFlow', title: '资金流水', path: '/user/moneyFlow'}, {name: 'lp', title: '合伙人中心', path: '/user/lpCenter'}, {name: 'deposit', title: '托管信息', path: '/user/deposit'}, {name: 'message', title: '消息中心', path: '/user/message'}, {name: 'repayment', title: '还款管理', path: '/user/repayment/0'}, {name: 'calculator', title: '挖矿计算器', path: '/user/Calculator'}],
        now: 1
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        unread_num: state => state.info.unread_num,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        risk: state => state.info.risk,
        last_login_time: state => state.info.last_login_time
      }),
      time () {
        var time = new Date().getHours()
        if (time >= 6 && time < 9) {
          return '早上好'
        } else if (time >= 9 && time < 12) {
          return '上午好'
        } else if (time >= 12 && time < 18) {
          return '下午好'
        } else {
          return '晚上好'
        }
      }
    },
    filters: {
      format: api.telReadable,
      date: api.date
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .user{
    overflow:hidden;
    .info{
      width: 100%;
      height: 140px;
      background: #1d2433 url('~assets/images/user_bg.jpg') repeat-x 50%;
      .box{
        line-height: 140px;
        @include main
        @include flex(space-between)
        height:100%;
        .welcome,.message{
          line-height: 1.5;
        }
        .welcome{
          width:90%;
          h2{
            color:$white
          }
          .line{
            width:100%;
            height: 1px;
            background: linear-gradient(to right, #5c6474 40%, transparent 80%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5c6474', endColorstr='#fff',GradientType=1 );
            margin:15px 0
          }
          .icons{
            .iconfont{
              text-align: center;
              @include block(22,5px)
              line-height: 28px;
              & + .iconfont{
                margin-left:10px
              }
              background:$light_black;
              &:before{
                color:$white;
              }
              &:first-child{
                &.active{
                  background: #4d83dd;
                }
                &:before{
                  content:'\e601'
                }
              }
              &:nth-child(2){
                &.active{
                  background: #ffbc38;
                }
                &:before{
                  content:'\e63f';
                }
              }
              &:nth-child(3){
                &.active{
                  background: #93cd38;
                }
                &:before{
                  content:'\e602'
                }
              }
            }
            span:last-child{
              padding-left:25px;
              color: #aaaaaa;
            }
          }
        }
        .message{
          width:155px;
          background: #efe9cf;
          border-radius:8px;
          padding:5px 15px;
          margin-left:10px;
          color:#74620e;
          .iconfont{
            font-size: 20px;
            color: #cec6a6;
            vertical-align: sub;
            padding-right: 5px;
            line-height: 10px;
            &:before{
              content:'\e653'
            }
          }
        }
      }
    }
    .main{
      background: #f7f8fa;
      padding:35px 0;
      .box{
        @include flex(flex-start,stretch)
        @include main
        & > *{
          vertical-align:top;
        }
        .con{
          width:210px;
          background: $white;
          margin-right:25px;
          border-radius:5px;
          overflow: hidden;
          a{
            display: block;
            line-height: 48px;
            text-align: center;
            border-top:1px solid #eaf1f5;
            border-left:2px solid transparent;
            border-radius:5px;
            &:hover{
              background: #f5f8ff;
            }
            &.nuxt-link-active,&.active{
              position: relative;
              background: #f5f8ff;
              border-left-color:$blue;
              color: $blue;
              &:after{
                content:'';
                @include position(20,auto,auto,35)
                @include triangle(right,$blue)
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 5px solid #327fff;
              }
            }
          }
        }
        .main_content{
          background: $white;
          width:leave(235);
          min-height: 600px;
          border-radius:5px;
          h2{
            line-height: 52px;
            padding:0 28px;
            border-bottom: 1px solid $border;
          }
          h3{
            background: #f7f8fa;
            padding: 12px 15px;
            &:before{
              content:'|';
              padding-right:10px;
              color:#000;
              font-weight: bold;
            }
          }
        }
      }
    }
    h2{
      font-size: 18px
    }
  }
</style>
