<template>
  <header class="header">
    <PcHeader class="pc_header" v-if="isMobile===0"></PcHeader>
    <div :class="['mobile_header', headerType, {scroll}]" v-if="isMobile===1&&showTitle()">
      <div class="mobile_header_box">
        <nuxt-link to="/" class="logo">
          <img class="fixed_logo" :src="require('@/assets/images/mobile/logo3.png')">
          <img class="normal_logo" :src="require('@/assets/images/mobile/logo2.png')">
        </nuxt-link>
        <div class="title">{{pages[$route.path]}}</div>
        <div class="header_right">
          <template v-if="token === 0">
            <router-link class="link" to="/auth/regist">注册</router-link>
            <span class="line">|</span>
            <router-link class="link" to="/auth/login">登录</router-link>
          </template>
          <span class="header_mobile iconfont" v-else @click="showNavlink('person')">&#xe63f;<i v-if="unread_num"></i></span>
          <span class="nav_link iconfont icon-more" v-if="showNav !== 'product'" @click="showNavlink('product')"></span>
          <span class="nav_link iconfont icon-close" v-if="showNav === 'product'" @click="showNavlink('product')"></span>
        </div>
      </div>
      <div class="mobile_header_nav" v-if="showNav !== ''" @click="showNavlink">
        <div class="white_bg">
          <nuxt-link :to="i" v-for="i,k in navList" :key="k" class="item">
            <span :class="{active:i==='/minerShop/activity'}">{{pages[i]}}</span>
            <em></em>
            <span class="unread_num" v-if="i==='/mobile/message'&&unread_num">您有{{unread_num}}条未读消息</span>
          </nuxt-link>
          <div class="item" v-if="token !== 0 && showNav === 'person'">
            <span>{{mobile}}</span>
            <span @click="logout()">退出</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import PcHeader from './header/pc'
  import api from '@/util/function'
  export default {
    name: 'header',
    data () {
      return {
        pages: {
          '/minerShop/cloudCompute': '云算力',
          '/minerShop/miner': '算力服务器',
          '/bdc': 'BDC托管',
          '/quickNews': '产业资讯',
          '/computeNews/listm': '产业资讯',
          '/equipmentEvaluate/list': '产业资讯',
          '/currency/list': '产业资讯',
          '/manufacturer/list': '产业资讯',
          '/mobile/property': '我的资产',
          '/mobile/order/0': '我的订单',
          '/mobile/order/3': '我的订单',
          '/mobile/repayment/0': '我的分期',
          '/mobile/repayment/1': '我的分期',
          '/mobile/message': '消息中心',
          '/mobile/moneyFlow': '账户流水',
          '/mobile/idVerfication': '个人认证',
          '/mobile/bankCard': '银行卡管理',
          '/mobile/assetsAddress': '收益地址管理',
          '/mobile/administration': '账户设置',
          '/mobile/address': '邮寄地址',
          '/mobile/help': '常见问题',
          '/mobile/advice': '意见反馈',
          '/mobile/orderDetail': '订单详情',
          '/mobile/cloudProduct': '云算力列表',
          '/mobile/recharge': '充值',
          '/minerShop/activity': '新春优惠购',
          '/minerShop/hirePurchase': '分期',
          '/mobile/repaymentDetail': '分期明细'
        },
        showNav: '',
        scroll: false,
        headerType: '',
        navList: [],
        navLink: ['/minerShop/miner', '/minerShop/cloudCompute', '/bdc', '/quickNews', '/minerShop/activity'],
        navPerson: ['/mobile/property', '/mobile/order/0', '/mobile/repayment/0', '/mobile/message', '/mobile/moneyFlow', '/mobile/idVerfication', '/mobile/bankCard', '/mobile/assetsAddress', '/mobile/administration'
        ],
        isBlueHeader: ['bdc', 'mobile-assetDetail', 'mobile-property', 'mobile-personalCenter', 'mobileIndex'],
        noHeader: ['auth-login', 'auth-regist', 'auth-passwordRetrieval']
      }
    },
    methods: {
      showNavlink(type) {
        if (typeof type !== 'string') {
          this.showNav = ''
          return
        }
        this.showNav = this.showNav === type ? '' : type
        this.navList = type === 'person'? [...this.navPerson] : [...this.navLink]
      },
      showTitle() {
        if (this.noHeader.indexOf(this.$route.name) > -1) {
          return false;
        }
        this.headerType = this.isBlueHeader.indexOf(this.$route.name) > -1 ? 'blue' : ''
        return true
      },
      scrollFunc (e) {
        // if (!this.headerType) {
        //   return false
        // }
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        this.scroll = scrollTop > 30
        if (scrollTop > 5) {
          this.showNav = ''
        }
      },
      logout () {
        this.$store.commit('LOGOUT')
        if (this.isMobile) {
          this.$router.push({path: '/minerShop/cloudCompute'})
        } else {
          this.$router.push({path: '/'})
        }
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        unread_num: state => state.info.unread_num
      })
    },
    filters: {
      format: api.telReadable
    },
    components: {
      PcHeader
    },
    mounted () {
      window.addEventListener('scroll', this.scrollFunc, false)
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_header{
    height: 0.88rem;
    background: #fff;
    &.blue.scroll {
      position: static;
      display: none;
    }
    &.blue {
      position: fixed;
      top:0;
      width: 100%;
      background: transparent;
      z-index: 100;
      display: block;
      .mobile_header_box {
        border-bottom: 0;
        &,a {
          color: #fff;
        }
        .logo {
          .fixed_logo {
            display: inline;
          }
          .normal_logo {
            display: none;
          }
        }
      }
    }
    .mobile_header_box{
      width: 100%;
      height: 100%;
      @include flex(space-between)
      padding: 0 0.3rem;
      line-height: 0.88rem;
      border-bottom: 1px solid $border;
      &,a {
        color: $text;
        font-size: 12px;
      }
      .logo {
        width: 1.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        .fixed_logo {
          display: none;
        }
        .normal_logo {
          display: inline;
        }
      }
      .title{
        flex:1;
        font-size: 0.32rem;
        text-align: center;
      }
      .header_right{
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: right;
        .line {
          margin: 0 8px;
        }
        .header_mobile {
          position: relative;
          i {
            position: absolute;
            right: -6px;
            top:0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #ff0000;
          }
        }
        .nav_link{
          font-size: 18px;
          margin-left: 15px;
        }
      }
    }
    .mobile_header_nav{
      position: fixed;
      top: 0.88rem;
      width: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
      height: 100%;
      .white_bg{
        width: 100%;
        height: auto;
        background: #fff;
        .item{
          position: relative;
          width: 100%;
          height: 0.88rem;
          background: #fff;
          @include flex (space-between, center);
          padding: 0 0.3rem;
          border-bottom: 1px solid #efefef;
          text-align: center;
          line-height: 0.88rem;
          font-size: 0.32rem;
          span.active {
            color: #fe5039
          }
          em{
            @include block(5);
            @include arrow(right, #c7c7c9);
            width: 0.1rem;
            height:0.1rem;
            border-width: 1px;
          }
          .unread_num {
            position: absolute;
            right: 25px;
            font-size: 12px;
            color: #fff;
            background: #ff0000;
            height: 14px;
            line-height: 14px;
            padding: 0 3px;
            border-radius: 20px;
          }
        }
      }
    }
  }
</style>
