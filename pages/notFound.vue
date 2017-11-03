<template>
  <article class="not_found">
    <div class="bg">
      <router-link to="/">回到首页</router-link>
    </div>
  </article>
</template>

<style type="text/css" lang="scss">
  @import '../assets/css/style.scss';
  .not_found{
    @include bg(1920,100vh)
    .bg{
      @include flex(center)
      background: url(../assets/images/404.jpg);
      a{
        display: block;
        font-size: 16px;
        @include button(#ff9f00)
        padding:10px 80px;
        border-radius:25px;
        font-weight: bold;
      }
    }
  }
</style>
