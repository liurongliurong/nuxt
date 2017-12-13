<template>
  <header class="header" v-if="$route.name===('index')||$route.path.includes('bdc')">
    <div class="left" v-if="token === 0">
      <router-link to="/auth/regist">注册</router-link>
      <span>|</span>
      <router-link to="/auth/login">登录</router-link>
    </div>
    <div v-else class="left">
      <router-link to="/mobile/personcenter">
        <img :src="require('@/assets/images/mobile/user.png')">
      </router-link>
    </div>
    <div class="logo">
      <router-link to="/">
        <img :src="require('@/assets/images/mobile/logo.png')">
      </router-link>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        token: state => state.info.token
      })
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
