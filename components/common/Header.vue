<template>
  <header class="header">
    <PcHeader class="pc_header" v-if="isMobile===0"></PcHeader>
    <div class="mobile_header" v-if="isMobile===1&&showTitle()">
      <div class="header_conten">
        <div class="logo">
          <nuxt-link to="/">
            <img :src="require('@/assets/images/mobile/index/logo.png')">
          </nuxt-link>
        </div>
        <div class="title">{{title}}</div>
        <div class="mobile_headerRight">
          <span class="icon iconfont icon-geren" v-if="token === 0"></span>
          <span class="header_mobile" v-else>{{mobile|format}}</span>
          <span class="navlink icon iconfont icon-more" v-if="!showNav" @click="showNavlink"></span>
          <span class="navlink icon iconfont icon-close" v-if="showNav" @click="showNavlink"></span>
        </div>
      </div>
      <div class="mobile_navlink" v-if="showNav" @click="showNavlink">
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
        navLink: [
          {title: '云算力', path: '/minerShop/miner/2'},
          {title: '品牌矿机', path: '/minerShop/miner/1'},
          {title: 'BDC托管', path: '/bdc'},
          {title: '产业资讯', path: '/mobile/property'},
        ],
        isMobilePage: ['index', 'bdc', 'mobile-cloudProduct','mobile-assetDetail', 'mobile-property']
      }
    },
    methods: {
      showNavlink() {
        this.showNav = !this.showNav
      },
      showTitle() {
        if (this.isMobilePage.indexOf(this.$route.name) > -1) {
          return true
        }
        return false
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
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_header{
    width: 100%;
    height: 0.88rem;
    background: #327fff;
    position: fixed;
    top:0;
    z-index: 9999;
    .header_conten{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;
      line-height: 0.88rem;
      box-sizing: border-box;
      .logo {
        width: 1.8rem;
        height: auto;
        line-height: 0.6rem;
      }
      .title{
        color: #fff;
        font-size: 0.32rem;
        letter-spacing: 0.05rem;
      }
      .mobile_headerRight{
        position: relative;
        :nth-child(1){
          font-size: 0.42rem;
          margin-right: 0.28rem;
          color:#fff;
        }
        .header_mobile{
          font-size: 0.32rem;
        }
        .navlink{
          font-size: 0.37rem;
          color: #fff;
        }
      }
    }
    .mobile_navlink{
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
