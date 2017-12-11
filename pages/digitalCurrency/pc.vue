<template>
   <div class="currency_right">
    <h1 style="position:relative;">主流币种资料<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
    <div class="currency_toplist">
      <router-link :to="'/digitalCurrency/detail/' + n.id" class="toplist" v-for="n, k in $parent.toplists" :key="k">
        <img :src="n.icon"/>
        <span>{{n.coin_name}}</span>
      </router-link>
    </div>
    <h1 style="position:relative;" class="bottomlist">各类代币资料<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
    <div class="currency_toplist">
      <router-link :to="'/digitalCurrency/detail/' + n.id" class="toplist" v-for="n, k in $parent.bottomlists" :key="k">
        <img :src="n.icon"/>
        <span>{{n.coin_name}}</span>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .currency_right{
    float: left;
    width: 1002px;
    height: 1424px;
    background: white;
    padding:32px 62px 0 62px;
    box-sizing: border-box;
    h1{
      color: #121212;
      font-size: 24px;
      font-weight: 800;
      span{
        font-size: 20px;
        margin-left: 13px;
      }
    }
    .bottomlist{
        margin-top: 58px;
    }
    .currency_toplist{
      width: 100%;
      margin-top: 30px;
      overflow: hidden;
      .toplist{
        width: 240px;
        height: 45px;
        border:1px solid #bfbfbf;
        float: left;
        display:block;
        margin-right: 10px;
        margin-bottom: 17px;
        img{
          width:25px;
                height: 20px;
                margin-top: 6px;
                margin-left: 20px;
                position: relative;
                top:-13px;
        }
        span{
          margin-left: 20px;
          line-height: 45px;
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }
</style>
