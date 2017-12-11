<template>
  <div class="mobile">
    <div class="introduce">
      <div class="background">
        <img :src="require('@/assets/images/mobile/bdc.png')">
      </div>
      <div class="content">
        <p class="title">{{article.title}}</p>
        <p class="text" v-html="article.text"></p>
      </div>
    </div>
    <div class="bdc-lists">
      <div class="card" v-for="item in $parent.list">
        <span class="title">-{{item.bdc_name}}-</span>
        <img :src="item.bdc_img">
        <div v-for="params in item.params" class="line">
          <span class="name">{{params.name}}</span>
          <span class="value">{{params.value}}</span>
        </div>
      </div>
      <button class="apply">
        <router-link to="/mobile/bdcForm">点击申请矿机托管</router-link>
      </button>
      <span class="tips">算力网全国BDC即将陆续开放...</span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        article: {
          title: 'Blockchain Data Center',
          text: '<i>BDC</i>是平台整合优质品牌商与分销商，通过平台的优势及服务以吸引广大消费者的一种形式，算力网通过自身的优势整合筛选出行业内<i>优质合规的BDC机房</i>，算力服务器生产商，为算力爱好者<i>提供算力服务器托管</i>，算力服务器采购，算力服务器租赁等服务，打通算力及衍生商品产业链的完整交易，做到<i>平台，供应商，消费者三方互惠互利</i>。'
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mobile {
    .introduce {
      width: 100%;
      position: relative;

      .content {
        padding: 0 15px;
        position: absolute;
        bottom: 0;

        .title {
          text-align: center;
          font-size: 18px;
          line-height: 45px;
          color: #fff;
          font-weight: bold;
        }

        .text {
          padding: 0 10px;
          line-height: 26px;
          color: #bfbfbf;

          i {
            color: #ff9f00;
          }
        }
      }
    }

    .bdc-lists {
      width: 100%;
      height: auto;
      padding: 45px 15px 0 15px;
      background: #13141f;
      margin-bottom: -61px;

      .card {
        @include flex(center, center, column);
        margin-bottom: 20px;

        .title {
          color: #fff;
          font-size: 18px;
          line-height: 45px;
        }

        img {
          margin: 20px 0;
        }

        .line {
          width: 100%;
          line-height: 45px;
          margin-right: -15px;
          padding-right: 15px;
          @include flex(space-between, center);
          font-size: 15px;
          border-bottom: solid 1px #3a3a3a;

          .name {
            color: #fff;
          }
          .value {
            color: #999;
          }
        }
      }

      .apply {
        height: 43px;
        line-height: 43px;
        width: 265px;
        margin: 60px auto;
        display: block;
        background: url('../../assets/images/mobile/button.png') no-repeat;
        background-size: 100%;
        a {
          display: inline-block;
          height: 43px;
          width: 100%;
          font-size: 15px;
          font-weight: bold;
          color: #1b1b1b;
        }
      }

      .tips {
        text-align: center;
        padding-bottom: 20px;
        display: block;
        color: #666;
        font-size: 13px;
      }
    }
  }
</style>