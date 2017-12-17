<template>
  <header class="header">
    <PcHeader class="pc_header" v-if="isMobile===0"></PcHeader>
    <div class="mobile_header" v-if="isMobile===1&&($route.name===('index')||$route.name === 'bdc')">
      <div class="left" v-if="token === 0">
        <nuxt-link to="/auth/regist">注册</nuxt-link>
        <span>|</span>
        <nuxt-link to="/auth/passwordRetrieval">登录</nuxt-link>
      </div>
      <div v-else class="left">
        <nuxt-link to="/mobile/personcenter">
          <img :src="require('@/assets/images/mobile/user.png')">
        </nuxt-link>
      </div>
      <div class="logo">
        <nuxt-link to="/">
          <img :src="require('@/assets/images/mobile/logo.png')">
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import MobileHeader from './header/mobile'
  import PcHeader from './header/pc'

  export default {
    name: 'header',
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token
      })
    },
    components: {
      MobileHeader,
      PcHeader
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_header{
    width: 100%;
    height: 45px;
    padding: 0 15px;
    box-sizing: border-box;
    background: #fff;
    @include flex;
    .left {
      position: absolute;
      left: 15px;
      top: 12px;
      a {
        color: #666;
      }
      i {
        font-size: 20px;
      }
      img {
        width: 25px;
      }
    }
    .logo {
      width: 90px;
      height: 20px;
      margin: 0 auto;
    }
  }
</style>
