<template>
  <div class="mobile_base_info">
    <div class="img">
      <img :src="detail.product_img||detail.minerPicture" alt="">
    </div>
    <div class="first_box">
      <h4>
        <span :class="['status_box', {'gray': detail.status === 7 || detail.status === 2}]">{{detail.statusStr}}</span>
        <span class="name_box">{{detail.name}}</span>
      </h4>
      <div class="mobile_price">
        <div :class="['type_name', {'name_type': params2 !== '1'}]">{{params2==='1'?'矿机':'云算力'}}</div>
        <div>算力价：<span class="price">￥{{detail.one_amount_value}}</span></div>
      </div>
      <div class="buy_tips" v-if="params2==='1'">{{detail.DeliveryTime}}</div>
      <div class="progress_info">
        <div class="progress_box">
          <div class="box" :style="{width:detail.sellProgress}"></div>
        </div>
        <div class="progress_text">剩余{{detail.leftNum}}台</div>
      </div>
      <div class="base_info">
        <template v-for="n,k in params2==='1'?mobileNav1:mobileNav2">
          <div class="item">
            <div class="item_data">{{detail[k]}}{{n.unit}}</div>
            <div class="item_text">{{n.title}}</div>
          </div>
          <div class="line"></div>
        </template>
      </div>
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
        mobileNav2: {hashType: {title: '算力类型', unit: ''}, amount: {title: '服务器总数', unit: '台'}, incomeType: {title: '结算方式', unit: ''}}
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_base_info{
    background: $white;
    .img{
      text-align: center;
      padding: 5% 20%;
    }
    .first_box{
      padding: 15px;
      margin-top:-15px;
      h4{
        margin:10px 0;
        .status_box{
          border: 1px solid $blue;
          color:$blue;
          padding:0.02rem 0.07rem;
          border-radius:3px;
          margin-right: 0.1rem;
          font-size: 0.28rem;
        }
        .gray{
          color: #999;
          border: 1px solid #999;
        }
        .name_box{
          font-size: 0.36rem;
          font-weight: bold;
        }
      }
      .mobile_price{
        @include flex(space-between);
        color:$light_text;
        font-size: 0.28rem;
        .type_name{
          background: $orange;
          color:#fff;
          padding:0.02rem 0.05rem;
          border-radius:3px;
        }
        .name_type{
          background: #327fff;
        }
        .price{
          color:$orange;
          font-weight: bold;
          font-size: 0.36rem;
        }
      }
      .buy_tips{
        color:$orange;
        padding-top:15px;
      }
      .base_info{
        @include flex(space-between);
        background: #F5F5F5;
        padding:15px 10px;
        .item{
          text-align: center;
          .item_data{
            font-size: 0.3rem;
          }
          .item_text{
            color:$light_black;
            font-size: 0.28rem;;
          }
        }
        .line{
          height:30px;
          width:1px;
          background: #BFBFBF;
          &:last-child{
            display: none;
          }
        }
      }
      .progress_info{
        position: relative;
        padding:30px 0;
        .progress_box{
          position: relative;
          overflow:hidden;
          border-radius:8px;
          height:0.3rem;
          background: $border;
          .box{
            @include position
            @include process_color
          }
        }
        .progress_text{
          position: absolute;
          right:0;
          top:50%;
          margin-top:-0.39rem;
          color:$text;
          padding:0.1rem 0.18rem;
          border:0.08rem solid $purple;
          border-radius:0.4rem;
          background: #fff;
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
