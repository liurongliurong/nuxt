<template>
  <section class="product_nav">
    <router-link class="item" :to="'/'+page+'/list/'+(k+1)+'/'+$route.params.sort" v-for="n,k in nav" :key="k">
      <span :class="['iconfont', 'icon'+n.name]"></span>
      <span class="iconfont_name">{{n.name}}</span>
    </router-link>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      page: {
        type: String
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        nav: state => state.hashType
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .product_nav{
    position: relative;
    z-index: 1;
    margin-top:-40px;
    line-height: 60px;
    @include main
    @include gap(70,h)
    @include flex(space-between)
    padding:0;
    background: $white;
    box-shadow:5px 10px 15px 0px rgba(63, 113, 197, 0.2);
    .item{
      color: $text;
      font-size: 18px;
      cursor: pointer;
      width: 33.3%;
      text-align: center;
      color:#999999;
      border-bottom:2px solid transparent;
      @include gap(10,h)
      &:hover,&.router-link-active{
        background:$blue;
        color:white;
      }
      .iconfont{
        @include block(36)
        vertical-align: middle;
        &:before{
          font-size: 36px
        }
        &.iconBTC:before{
          content: "\e62d"
        }
        &.iconBCC:before{
          content: "\e6ad"
        }
        &.iconETH:before{
          content: "\e60f"
        }
        &.iconETC:before{
          content: "\e60d"
        }
        &.iconLTC:before{
          font-size: 26px;
          content: "\e612"
        }
      }
      .iconfont_name:after{
        content:'挖矿'
      }
    }
    @media screen and (max-width: $mobile) {
      margin-top:0;
      box-shadow:none;
      line-height: 40px;
      .item{
        .iconfont{
          display: none;
        }
        .iconfont_name:after{
          content:''
        }
        &:hover,&.router-link-active{
          background:$white;
          border-color:$blue;
          color:$blue
        }
      }
    }
  }
</style>
