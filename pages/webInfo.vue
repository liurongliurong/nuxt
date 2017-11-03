<template>
  <article class="web_info">
    <nuxt-child />
  </article>
</template>

<style type="text/css" lang="scss">
  @import '../assets/css/style.scss';
  @import '../assets/fonts/iconfont.css';
  .web_info{
    width: 100%;
    background: #f7f8fa;
    padding-bottom: 60px;
    .content_box{
      @include main
    }
    .box{
      margin: 0 auto;
      height: 60px;
      line-height: 60px;
      background: #fff;
      .tab{
        font-size: 16px;
        color: #666;
        margin-right: 36px;
        font-weight: 100;
      }
      .nuxt-link-active{
        color:#327fff;
      }
    }
    .content{
      margin-top: 30px;
    }
  }
</style>
