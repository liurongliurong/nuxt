<template>
  <section :class="['auth', {login_block:$route.path.includes('login')}, {agreement_box: agree}]">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <div class="box">
      <router-view></router-view>
    </div>
    <p class="copyright">Copyright © 2013-2017 Zhejiang Shuqin Technology Co., Ltd. All Rights Reserved. 算力网 版权所有</p>
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
  @import '../assets/css/style.scss';
  .auth{
    position: relative;
    .bg_box{
      @include bg(1920,calc(100vh - 80px))
      @include position
      z-index: -1;
      color:$light_text;
      .bg{
        background:url(../assets/images/auth_bg.jpg) no-repeat;
      }
    }
    &:not(.login_block){
      min-height:calc(100vh - 80px);
      .bg_box{
        .bg{
          height:100%
        }
      }
    }
    .box{
      @include flex(center,flex-start)
      @include main
    }
    .copyright{
      text-align: center;
      padding: 15px 0
    }
    &.login_block{
      height:100vh;
      .bg_box{
        top:0;
        background: #181a1c;
        padding-top:calc(100vh - 1px);
        .bg{
          background:url(../assets/images/login_bg.jpg) no-repeat;
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
        margin-top:50px;
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
  }
</style>
