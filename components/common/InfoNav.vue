<template>
  <div class="infomation_nav">
    <div class="nav_box">
      <router-link :to="n.path" v-for="n, k in navLists" :key="k">{{n.title}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navLists: [
          {title: '算力资讯', path: '/industryInformation', word: ''},
          {title: '设备之家', path: '/equipments/list', word: ''},
          {title: '交易信息', path: '/transaction', word: ''},
          {title: '收益币种', path: '/currency/list', word: ''}
        ]
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .infomation_nav{
    height: 50px;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    .nav_box{
      width: 1180px;
      margin:0 auto;
      a{
        display:inline-block;
        width: 64px;
        text-align: center;
        line-height: 48px;
        margin-right: 34px;
        color: #666;
        border-top: 2px solid #fff;
        &:hover,&.active,&.router-link-active{
          color:#327fff;
          border-top: 2px solid #327fff;
        }
      }
    }
  }
</style>
