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
          <router-link class="header_mobile iconfont" to="/mobile/personCenter" v-else>&#xe63f;</router-link>
          <span class="nav_link iconfont icon-more" v-if="!showNav" @click="showNavlink"></span>
          <span class="nav_link iconfont icon-close" v-if="showNav" @click="showNavlink"></span>
        </div>
      </div>
      <div class="mobile_header_nav" v-if="showNav" @click="showNavlink">
        <div class="white_bg">
          <nuxt-link :to="i.path" v-for="i,k in navLink" :key="k">{{i.title}}</nuxt-link>
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
        showNav: false,
        scroll: false,
        headerType: '',
        navLink: [
          {title: '云算力', path: '/minerShop/miner/2'},
          {title: '品牌矿机', path: '/minerShop/miner/1'},
          {title: 'BDC托管', path: '/bdc'},
          {title: '产业资讯', path: '/mobile/property'},
        ],
        isBlueHeader: ['bdc', 'mobile-assetDetail', 'mobile-property', 'mobile-personCenter']
      }
    },
    methods: {
      showNavlink() {
        this.showNav = !this.showNav
      },
      showTitle() {
        if (this.isBlueHeader.indexOf(this.$route.name) > -1) {
          this.headerType = 'blue'
        } else {
          this.headerType = ''
        }
        return true
      },
      scrollFunc (e) {
        if (!this.headerType) return false
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 0) {
          this.scroll = true
        } else {
          this.scroll = false
        }
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
    z-index: 9999;
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
        a{
          width: 100%;
          height: 0.88rem;
          background: #fff;
          display: block;
          border-bottom: 1px solid #efefef;
          text-align: center;
          line-height: 0.88rem;
          font-size: 0.32rem;
          letter-spacing: 0.05rem;
        }
      }
    }
  }
</style>
