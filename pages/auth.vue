<template>
  <section :class="['auth', {login_block:$route.name === 'auth-login'}, {agreement_box: agree}]">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <div class="mobile_logo">
      <router-link to="/"></router-link>
    </div>
    <div class="box">
      <router-view></router-view>
    </div>
    <div class="regist_mobile" v-if="$route.name === 'auth-passwordRetrieval'||$route.name === 'auth-regist'">已有账号？<router-link to="/auth/login">立即登录</router-link></div>
    <p class="copyright">算力网 版权所有 Copyright © 2013-2017<br>Zhejiang Shuqin Technology Co., Ltd. All Rights Reserved. </p>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        banner: require('@/assets/images/auth_bg.jpg'),
        bg: require('@/assets/images/login_bg.jpg'),
        agree: false
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .auth{
    position: relative;
    padding-top:40px;
    .bg_box{
      @include bg(1920,calc(100vh - 80px))
      @include position
      z-index: -1;
      color:$light_text;
      .bg{
        background:url(~assets/images/auth_bg.jpg) no-repeat;
      }
      @include mobile_hide
    }
    .mobile_logo{
      @include mobile_show
      text-align: center;
      padding-top:30px;
      a{
        display: inline-block;
        width:140px;
        height:29px;
        background:url(~assets/images/css_sprites.png) -170px -364px;
      }
    }
    &:not(.login_block){
      min-height:calc(100vh - 80px);
      .bg_box{
        .bg{
          height:100%
        }
      }
      .box .form h2{
        font-size: 24px;
        text-align:center;
        color:$blue;
        margin: 35px 0;
      }
      @media screen and (max-width: $mobile) {
        min-height:100vh;
      }
    }
    .box{
      @include main
      background: #fff;
      overflow: hidden;
      // min-height:700px;
    }
    .regist_mobile{
      text-align: center;
      @include mobile_show
      a{
        color:$blue
      }
    }
    .copyright{
      text-align: center;
      padding: 15px 0;
      margin-top:50px;
    }
    &.login_block{
      min-height:100vh;
      padding-top:0;
      .bg_box{
        top:0;
        background: #181a1c;
        padding-top:calc(100vh - 1px);
        .bg{
          background:url(~assets/images/login_bg.jpg) no-repeat;
          height:calc(100vh - 1px)
        }
      }
      .box{
        padding-top:180px;
        background:transparent;
        .text a{
          color:$white
        }
      }
      .copyright{
        margin-top:150px;
        color:$light_text
      }
    }
    &.agreement_box{
      background: #f7f8fa;
      padding:40px 0;
      .bg_box,.copyright{
        display: none;
      }
    }
    @media screen and (max-width: $mobile) {
      background: #f4f4f4;
      padding-top:0;
      .box{
        padding:15px;
        min-height:auto;
        background: transparent;
        .form {
          .input input {
            padding: .3rem 0;
          }
          label {
            padding: 0;
          }
          button {
            width: 100%;
            line-height: 2;
            margin-top:30px;
            margin: 30px 0 0;
          }
        }
      }
      &.login_block .box{
        padding:15px;
        .form{
          padding:30px 15px;
        }
      }
      &.login_block .copyright{
        margin-top:0
      }
      .copyright{
        font-size: 12px;
        color:$light_text;
        margin-top:0
      }
    }
  }
</style>
