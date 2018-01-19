<template>
  <header class="header">
    <PcHeader class="pc_header" v-if="isMobile===0"></PcHeader>
    <div :class="['mobile_header', headerType, {scroll}]" v-if="isMobile===1&&showTitle()">
      <div class="mobile_header_box">
        <div class="logo">
          <nuxt-link to="/">
            <img class="fixed_logo" :src="require('@/assets/images/mobile/logo3.png')">
            <img class="normal_logo" :src="require('@/assets/images/mobile/logo2.png')">
          </nuxt-link>
        </div>
        <div class="title">{{title}}</div>
        <div class="header_right">
          <template v-if="token === 0">
            <router-link to="/auth/regist">注册</router-link>
            <span>|</span>
            <router-link to="/auth/login">登录</router-link>
          </template>
          <span class="header_mobile iconfont" v-else @click="showNavlink('person')">&#xe63f;</span>
          <span class="nav_link iconfont icon-more" v-if="showNav !== 'product'" @click="showNavlink('product')"></span>
          <span class="nav_link iconfont icon-close" v-if="showNav === 'product'" @click="showNavlink('product')"></span>
        </div>
      </div>
      <div class="mobile_header_nav" v-if="showNav !== ''" @click="showNavlink">
        <div class="white_bg">
          <a href="javascript:;" @click="goPage(i.title,i.path)" v-for="i,k in navList" :key="k" class="item">
            <span>{{i.title}}</span>
            <em></em>
          </a>
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
        showNav: '',
        scroll: false,
        headerType: '',
        navList: [],
        navLink: [
          {title: '云算力', path: '/minerShop/miner/2'},
          {title: '品牌矿机', path: '/minerShop/miner/1'},
          {title: 'BDC托管', path: '/bdc'},
          {title: '产业资讯', path: '/mobile/property'},
        ],
        navPerson: [
          {title: '我的资产', path: '/mobile/property', icon: 'icon-31shoucangxuanzhong'},
          {title: '我的订单', path: '/mobile/order/0', icon: 'icon-31shoucangxuanzhong'},
          {title: '消息中心', path: '/mobile/message', icon: 'icon-31wangwangxuanzhong'},
          {title: '账户流水', path: '/mobile/moneyFlow', icon: 'icon-wodezichan'},
          {title: '个人认证', path: '/mobile/idVerfication', icon: 'icon-wodezichan'},
          {title: '银行卡管理', path: '/mobile/bankCard', icon: 'icon-wodezichan'},
          {title: '收益地址管理', path: '/mobile/assetsAddress', icon: 'icon-pinpaizhuanxiang'},
          {title: '账户设置', path: '/mobile/administration', icon: 'icon-pinpaizhuanxiang'}
        ],
        isBlueHeader: ['bdc', 'mobile-assetDetail', 'mobile-property', 'mobile-personalCenter'],
        noHeader: ['mobileIndex', 'auth-login', 'auth-regist', 'auth-passwordRetrieval']
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
        if (!this.headerType) {
          return false
        }

        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        this.scroll = scrollTop > 0
      },
      logout () {
        this.$router.push({name: 'index'})
        this.$store.commit('LOGOUT')
      },
      goPage (title, link) {
        this.$store.commit('SET_TITLE', title)
        this.$router.push({path: link})
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        title: state => state.title
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
    position: fixed;
    top:0;
    width: 100%;
    z-index: 1000002;
    background: #fff;
    &.blue.scroll {
      background: $blue;
    }
    &.blue {
      background: transparent;
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
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;
      line-height: 0.88rem;
      border-bottom: 1px solid $border;
      &,a {
        color: $text;
        font-size: 12px;
      }
      a {
        margin: 0 5px;
      }
      .logo {
        width: 1.8rem;
        height: auto;
        line-height: 0.6rem;
        .fixed_logo {
          display: none;
        }
        .normal_logo {
          display: inline;
        }
      }
      .title{
        font-size: 0.32rem;
        letter-spacing: 0.05rem;
      }
      .header_right{
        position: relative;
        .header_mobile{
          font-size: 0.32rem;
          margin-right: 0.28rem;
        }
        .nav_link{
          font-size: 0.37rem;
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
          width: 100%;
          height: 0.88rem;
          background: #fff;
          @include flex (space-between, center);
          padding: 0 0.3rem;
          border-bottom: 1px solid #efefef;
          text-align: center;
          line-height: 0.88rem;
          font-size: 0.32rem;
          letter-spacing: 0.05rem;

          em{
            @include block(5);
            @include arrow(right, #c7c7c9);
            width: 0.1rem;
            height:0.1rem;
            border-width: 1px;
          }
        }
      }
    }
  }
</style>
