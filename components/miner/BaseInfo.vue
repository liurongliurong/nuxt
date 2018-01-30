<template>
  <div class="product_base_info">
    <div class="miner" v-if="params2==='1'">
      <div class="miner_type">
        <div class="iconfont">&#xe603;</div>
        <span>算力服务器</span>
      </div>
      <div class="miner_left">
        <img :src="detail.minerPicture" alt="">
      </div>
      <div class="miner_right">
        <h4>
          <span :class="(detail.status===2||detail.status===3)?'gray':'red'">{{detail.statusStr}}</span>
          <span>{{detail.name}}</span>
        </h4>
        <p class="time">{{detail.DeliveryTime}}</p>
        <p class="suan_price">
          <span class="left_miner">单 价</span>
          <span class="right_miner">¥ <em>{{detail.one_amount_value}}</em></span>
        </p>
        <p class="address">
          <span class="left_miner">总 算 力</span>
          <span class="right_miner"><em>{{(detail.one_amount_value*number)|format}}</em>T</span>
        </p>
        <p class="address">
          <span class="left_miner">物&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;流</span>
          <span class="right_miner">订单委托第三方物流公司发货，物流费用到付</span>
        </p>
        <div class="miner_input">
          <span class="left_miner">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
          <div class="input_box right_miner">
            <span :class="{active:number>detail.single_limit_amount}" @click="changeNum(+number-1)">-</span>
            <input type="text" :value="number" id="number" :placeholder="detail.single_limit_amount+'台起售'" @blur="changeNum($event.target.value)">
            <span :class="{active:number!==detail.leftNum}" @click="changeNum(+number+1)">+</span>
          </div>
          <p class="miner_number">库存{{detail.leftNum}}台<span class="detail_limit_text">({{detail.single_limit_amount+'台起售'}})</span></p>
        </div>
        <button class="btn" disabled v-if="detail.status===2">已售罄</button>
        <button class="btn" disabled v-else-if="detail.status===3">产品撤销</button>
        <button class="btn" @click="checkPay(false)" :disabled="detail.status===4" v-else>立即购买</button>
      </div>
    </div>
    <div class="cloud_miner" v-if="params2!=='1'">
      <div class="miner_type">
        <div class="iconfont">&#xe610;</div>
        <span>云算力</span>
      </div>
      <div class="cloud_miner_left">
        <h4>
          {{detail.product_name}}
          <span>{{(detail.sell_type===2&&detail.status!==7&&'转售')||detail.statusStr}}</span>
        </h4>
        <div class="product_data">
          <div class="item" v-for="d,k in proData">
            <div class="item_word">
              <span class="num" v-if="k==='price'">{{detail[k]|format}}</span>
              <span class="num" v-else>{{detail[k]}}</span>
              <span class="unit">{{d.unit}}</span>
            </div>
            <p class="tips">{{d.title}}</p>
          </div>
        </div>
        <div class="progress_info press">
          <div class="progress_box">
            <div class="box" :style="{margin:0,width:detail.sellProgress}"></div>
          </div>
        </div>
        <div class="progress_price">
          <span class="one">当前进度 {{detail.sellProgress}}</span>
          <span class="two">剩余可售 {{detail.leftNum}}台</span>
        </div>
      </div>
      <div class="cloud_miner_right">
        <div class="price_text">我要购买<span class="detail_limit_text">({{detail.single_limit_amount+'台起售'}})</span></div>
        <div class="input_box">
          <input type="text" :value="number" id="number" :placeholder="detail.single_limit_amount+'台起售'" @blur="changeNum($event.target.value)">
          <span>台</span>
        </div>
        <div class="price_text1">总算力：<span class="money">{{(detail.hash*number)|format}}T</span></div>
        <div class="price_text1">需支付：<span class="money">{{(detail.one_amount_value*number)|format}}元</span></div>
        <button class="btn" disabled v-if="detail.status===7">已售罄</button>
        <button class="btn" @click="checkPay(false)" v-else :disabled="detail.status===4">立即购买</button>
        <button class="btn loan_btn" @click="checkPay(true)" v-if="detail.status!==4&&params2==='2'&&detail.is_loan===1">分期购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  export default {
    props: {
      detail: {
        type: Object
      },
      params2: {
        type: String
      },
      number: {
        type: Number
      }
    },
    data () {
      return {
        proData: {
          one_amount_value: {title: '每台价格', unit: '元'},
          hash: {title: '每台算力', unit: 'T'},
          amount: {title: '出售总数', unit: '台'}
        }
      }
    },
    filters: {
      format: api.decimal
    },
    methods: {
      changeNum (n) {
        this.$emit('changeNum', n)
      },
      checkPay (isLoan) {
        this.$emit('checkPay', isLoan)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .product_base_info{
    .miner,.cloud_miner{
      @include main
      margin-bottom:30px;
      background: white;
      height: 370px;
      box-shadow: #dfe0e1 0 5px 5px -3px;
      position: relative;
      margin-top:10px;
      .miner_type{
        position: absolute;
        left: -10px;
        top:11px;
        width: 82px;
        height: 78px;
        text-align: center;
        color:white;
        .iconfont{
          font-size: 24px;
          padding-top:10px
        }
      }
    }
    .miner{
      .miner_type{
        background: #fe5039;
      }
      .miner_left{
        width: 500px;
        border:1px solid #dcdcdc;
        height:324px;
        margin-top: 12px;
        margin-left: 12px;
        text-align: center;
        float: left;
        img{
          width: 50%;
          margin-top: 78px;
          height: 160px;
          object-fit: contain;
        }
      }
      .miner_right{
        padding:20px 90px 0 20px;
        width: calc(100% - 512px);
        float: left;
        h4{
          color: #666666;
          font-weight: 800;
          font-size: 22px;
          line-height: 0;
          margin-top: 10px;
          .red{
            display:inline-block;
            background: #327fff;
            padding:10px 15px;
            border-radius: 10px;
            font-size: 12px;
            font-weight:100;
            color:white;
            margin-right: 10px;
            position: relative;
            top: -4px;
          }
          .gray{
            display:inline-block;
            background: rgb(195, 187, 186);
            padding:10px 15px;
            border-radius: 10px;
            font-size: 12px;
            font-weight:100;
            color:white;
            margin-right: 10px;
          }
        }
        .time{
          color: #fe5039;
          font-size: 12px;
          margin:15px 0;
        }
        .suan_price{
          height: 50px;
          background:#f3f3f3;
          line-height: 50px;
          margin-bottom: 20px;
          .left_miner{
            position:relative;
            top:-5px;
          }
          .right_miner{
            color: #ea2c2c;
            font-weight: 800;
            font-size: 21px;
            em{
              font-size: 24px;
            }
          }
        }
        .left_miner{
          color: #999999;
          font-size: 12px;
          width: 80px;
          display:inline-block;
          text-align: left;
          padding-left: 12px;
          box-sizing: border-box;
        }
        .right_miner{
          color: #121212;
          font-size: 14px;
          em{
            font-style: normal;
            font-size: 14px;
          }
        }
        .address{
          margin-bottom: 15px;
        }
        .miner_input{
          height: 34px;
          .left_miner{
            float: left;
            line-height: 34px;
          }
          .input_box{
            display:inline-block;
            width: 142px;
            height: 34px;
            border:1px solid #e5e5e5;
            border-radius: 3px;
            box-sizing: border-box;
            float: left;
            margin-right: 28px;
            span{
              width: 22px;
              height: 100%;
              display:inline-block;
              background:#e5e5e5;
              float: left;
              font-size: 16px;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
              color: #c5c5c5;
              user-select: none;
              &.active {
                color: #333333;
              }
            }
            input{
              width: 96px;
              height: 100%;
              float: left;
              text-align: center;
            }
            :nth-child(1){
              border-top-left-radius: 3px;
              border-bottom-left-radius: 3px;
            }
            :nth-child(3){
              border-top-right-radius: 3px;
              border-bottom-right-radius: 3px;
            }
          }
          .miner_number{
            float: left;
            line-height: 28px;
            color:#666666;
            span{
              color: #fe5039;
            }
          }
        }
        .btn{
          position: relative;
          width: 242px;
          height: 44px;
          border:0;
          margin-top: 26px;
          background: $orange;
          color: white;
          font-size: 18px;
          margin-left: 79px;
          &:disabled{
            background: #b5b0af;
          }
        }
      }
    }
    .cloud_miner{
      .miner_type{
        background:#327fff;
      }
      .cloud_miner_left{
        width: 722px;
        height: 100%;
        padding-top: 53px;
        padding-left: 98px;
        box-sizing: border-box;
        float: left;
        background: #f3f8ff;
        h4{
          font-size: 27px;
          color: #333333;
          font-weight: 800;
          span{
            width: 56px;
            height: 16px;
            display:inline-block;
            border-radius: 16px;
            border:1px solid #fe5039;
            text-align: center;
            margin-left: 20px;
            line-height: 15px;
            font-size: 12px;
            color: #fe5039;
            font-weight: 100;
          }
        }
        .white{
          color: #327fff;
          border:1px solid #327fff;
          width: 115px;
          height: 25px;
          text-align: center;
          margin-top: 12px;
          font-size: 12px;
          line-height: 22px;
        }
        .product_data{
          width: 550px;
          height: 60px;
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          aligns-item: center;
          .item {
            display: flex;
            justify: flex-start;
            flex-direction: column;
            .num {
              color: #333;
              font-size: 30px;
            }
            .unit {
              margin-left: 7px;
            }
            &:nth-of-type(1) {
              .num {
                color: #f00;
                font-weight: 800;
              }
              .unit {
                color: #f00;
              }
            }
          }
        }
        .press{
          width: 550px;
          height: 16px;
          background: #e3e3e3;
          margin-top: 44px;
          margin-bottom:15px;
          border-radius: 16px;
          overflow:hidden;
          .progress_box{
            position: relative;
            overflow:hidden;
            height:100%;
            .box{
              @include position;
              background: linear-gradient(to right, #337eff 20%, #c72abc);
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#337eff', endColorstr='#c72abc',GradientType=1 );
              border-top-left-radius: 16px;
              border-bottom-left-radius: 16px;
            }
          }
        }
        .progress_price{
          width: 550px;
          height: auto;
          .one{
            color:#327fff;
            font-weight: 800;
            float: left;
          }
          .two{
            float:right;
          }
        }
      }
      .cloud_miner_right{
        width: 456px;
        overflow: hidden;
        background: white;
        padding-bottom: 20px;
        float: left;
        padding-top: 40px;
        padding-left: 44px;
        box-sizing: border-box;
        .price_text{
          font-size: 18px;
          color:#121212;
          .buy_tips{
            color: #fe5039;
            font-size: 14px;
            margin-left: 20px;
          }
        }
        .input_box{
          border:1px solid #d2d2d2;
          margin-top: 20px;
          width: 288px;
          height: 50px;
          line-height: 50px;
          box-sizing: border-box;
          border-radius: 5px;
          display: block;
          margin-bottom: 20px;
          input{
            width: 90%;
            float: left;
            padding-left: 22px;
            line-height: 50px;
          }
        }
        .price_text1{
          text-align: left;
          color: #666666;
          font-size: 14px;
          margin-top: 10px;
          .money{
            color: #fe5039;
            font-size: 14px;
          }
        }
        .btn{
          width: 242px;
          height: 44px;
          border:0;
          margin-top: 20px;
          background: #fe5039;
          color: white;
          font-size: 18px;
          &:disabled{
            background: #b5b0af;
          }
          &.loan_btn{
            background: #01bfb5;
            margin-top: 12px;
          }
        }
      }
    }
  }
</style>
