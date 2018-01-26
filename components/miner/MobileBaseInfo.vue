<template>
  <div class="mobile_base_info">
    <div class="img">
      <img :src="detail.product_img||detail.minerPicture" alt="">
      <div class="bg"></div>
    </div>
    <div class="first_box">
      <div class="base_title">
        <div>
          <span class="name_box">{{detail.name}}</span>
          <span :class="['status_box', {'gray': detail.status === 7 || detail.status === 2 || detail.status === 3}]">{{(detail.sell_type===2&&detail.status!==7&&'转售')||detail.statusStr}}</span>
          <span class="hash_type" v-if="detail.hashType">{{detail.hashType}}</span>
        </div>
        <div class="left_amount">剩余{{detail.leftNum}}台</div>
      </div>
      <div class="buy_tips" v-if="params2==='1'">{{detail.DeliveryTime}}</div>
      <!-- <div class="progress_info">
        <div class="progress_box">
          <div class="box" :style="{width:detail.sellProgress}"></div>
        </div>
        <div class="progress_text">剩余{{detail.leftNum}}台</div>
      </div> -->
      <div class="base_info">
        <div class="item" v-for="n,k in params2==='1'?mobileNav1:mobileNav2">
          <div class="item_data">{{detail[k]}}<span>{{n.unit}}</span></div>
          <div class="item_text">{{n.title}}</div>
        </div>
      </div>
      <div class="base_text" v-if="params2!=='1'">{{detail.incomeType}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detail: {
        type: Object
      },
      params2: {
        type: String
      }
    },
    data () {
      return {
        mobileNav1: {hash: {title: '服务器算力', unit: 'T'}, weight: {title: '服务器重量', unit: 'kg'}, single_limit_amount: {title: '最少购买数量', unit: '台'}},
        mobileNav2: {hash_income: {title: '预计每日收益', unit: '元'}, one_amount_value: {title: '每台价格', unit: '元'}, hash: {title: '每台算力', unit: 'T'}}
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_base_info{
    background: $white;
    .img{
      position: relative;
      text-align: center;
      padding: 10% 20%;
      margin-top: -1px;
      .bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(to bottom, transparent, rgba(8,6,6,.2));
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=transparent, endColorstr=rgba(8,6,6,.2),GradientType=0 );
      }
    }
    .first_box{
      padding: 15px;
      margin-top:-15px;
      .base_title{
        @include flex(space-between)
        margin-top:15px;
        .status_box{
          color:$white;
          background: $orange;
          padding: 0.02rem 0.2rem;
          border-radius: 5px;
          margin: 0 0.2rem;
          font-size: 12px;
          &.gray{
            color: #999;
            border: 1px solid #999;
            background: #fff;
          }
        }
        .name_box{
          font-size: 0.36rem;
          font-weight: bold;
          max-width: 100px;
          height: 18px;
          display: inline-block;
          @include ellipsis
        }
        .left_amount{
          color: $orange;
          font-size: 0.32rem;
        }
        .hash_type{
          border: 1px solid $blue;
          padding: 0.02rem 0.2rem;
          color: $blue;
          border-radius: 5px;
          font-size: 12px;;
        }
      }
      .buy_tips{
        color:$orange;
        padding-top:15px;
      }
      .base_info{
        @include flex(space-between);
        padding:15px 0;
        border-bottom: 1px solid $border;
        .item{
          .item_data{
            font-size: 0.3rem;
            span{
              font-size: 0.32rem;
            }
          }
          .item_text{
            color:$light_black;
            font-size: 0.28rem;;
          }
          &:first-child .item_data{
            font-size: 0.4rem;
            color: $orange;
            span{
              font-size: 0.28rem;
            }
          }
        }
      }
      .base_text{
        padding-top: 10px;
        color:$light_text;
      }
      // .progress_info{
      //   position: relative;
      //   padding:30px 0;
      //   .progress_box{
      //     position: relative;
      //     overflow:hidden;
      //     border-radius:8px;
      //     height:0.3rem;
      //     background: $border;
      //     .box{
      //       @include position
      //       background: linear-gradient(to right, #337eff 20%, #c72abc);
      //       filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#337eff', endColorstr='#c72abc',GradientType=1 );
      //     }
      //   }
      //   .progress_text{
      //     position: absolute;
      //     right:0;
      //     top:50%;
      //     margin-top:-0.39rem;
      //     color:$text;
      //     padding:0.1rem 0.18rem;
      //     border:0.08rem solid $purple;
      //     border-radius:0.4rem;
      //     background: #fff;
      //     font-size: 0.28rem;
      //   }
      // }
    }
  }
</style>
