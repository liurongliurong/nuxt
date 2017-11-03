<template>
  <section class="pay">
    <template v-if="!showAgreement">
      <div class="orderMsg">
        <h3 class="title">确认订单信息</h3>
        <div class="orderDetail">
          <div class="detailH">
            <div class="borderR" v-for="d,k in proData">
              <p class="value" v-if="k==='number'&&page==='computeShop'"><span>{{$parent.number}}{{d.unit}}</span></p>
              <p class="value" v-else-if="k==='number'&&page!=='computeShop'"><span>{{$parent.detail.hash}}{{d.unit}}</span></p>
              <p class="value" v-else><span>{{$parent.detail[k]}}{{d.unit}}</span></p>
              <p>{{d.title}}</p>
            </div>
          </div>
          <div class="detailF">
            <p v-for="t,k in proText">{{t}}：
              <span class="value" v-if="k==='hash'">{{$parent.detail[k]}}T</span>
              <span class="value" v-else-if="k==='status'">{{$parent.str[$parent.detail[k]]}}</span>
              <span class="value" v-else>{{$parent.detail[k]}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="orderPay">
        <div class="detail">
          <div class="img">
            <img :src="$parent.detail.product_img" alt="">
          </div>
          <div class="text">
            <p>
              <span class="title">批次所在区域：</span>
              <span class="value">{{$parent.detail.batch_area}}</span>
            </p>
          </div>
        </div>
        <form class="form payForm" action="" @submit.prevent="pay" novalidate>
          <div class="pay_text">
            <div class="pay_value">
              应付金额：
              <span class="value">{{(page==='computeShop'?totalPrice:$parent.detail.total_price)|format}}</span>
              <span>元</span>
            </div>
          </div>
          <div class="pay_text">
            <div class="pay_money">
              账户余额：
              <span class="money">{{$parent.balance}}</span>
              <span>元</span>
            </div>
            <router-link to="/user/recharge">充值</router-link>
          </div>
          <FormField :form="form" class="form"></FormField>
          <label for="accept">
            <input type="checkbox" v-model="toggle" id="accept" name="accept">
            <span @click="openContract(1)">阅读并接受<a href="javascript:;">《算力网{{page === 'computeShop'?'购买':'转让'}}协议》</a>和<a href="javascript:;">《算力网托管协议》</a></span>
            <span class="select_accept">{{tips}}</span>
          </label>
          <button name="btn">确认支付</button>
        </form>
      </div>
    </template>
    <div v-else-if="showAgreement===1" class="agreement_text">
      <div class="" v-html="$parent.content"></div>
      <div class="" v-html="$parent.content1"></div>
      <div class="btn_box">
        <button @click="agree">我同意</button>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import FormField from '@/components/common/FormField'
  import md5 from 'js-md5'
  export default {
    props: {
      page: {
        type: String
      },
      proData: {
        type: Object
      },
      proText: {
        type: Object
      }
    },
    components: {
      FormField
    },
    data () {
      return {
        form: [{name: 'password', type: 'password', title: '交易密码', placeholder: '请输入交易密码', pattern: 'telCode'}],
        tips: '请同意服务条款',
        totalPrice: 0,
        showAgreement: 0,
        toggle: false
      }
    },
    methods: {
      pay () {
        var ff = document.querySelector('.payForm')
        if (this.totalPrice > this.$parent.balance) {
          this.tips = '余额不足，请充值'
          ff.accept.setAttribute('data-status', 'invalid')
          setTimeout(() => {
            ff.accept.setAttribute('data-status', '')
          }, 2000)
          return false
        }
        var data = api.checkFrom(ff)
        if (!data) return false
        if (!ff.accept.checked) {
          this.tips = '请同意服务条款'
          ff.accept.setAttribute('data-status', 'invalid')
          setTimeout(() => {
            ff.accept.setAttribute('data-status', '')
          }, 2000)
          return false
        }
        var self = this
        ff.btn.setAttribute('disabled', true)
        if (this.page === 'computeShop') {
          util.post('productMall', {token: this.$parent.token, product_id: this.$route.params.id, num: this.$parent.number, trade_password: md5(data.password)}).then(function (res) {
            api.checkAjax(self, res, () => {
              api.tips('恭喜您购买成功！', () => {
                self.$router.push({path: '/user/order/0&1'})
              })
            }, ff.btn)
          })
        } else {
          // 100002:参数缺失，200004：账户余额不足，1000：交易成功，800007：交易失败，800003：禁止交易，200006：交易密码错误，800004：转让已结束，800005：产品已撤销,800008:不能购买自己的产品
          util.post('doTransfer_Hashrate', {token: this.$parent.token, user_id: this.$parent.user_id, transfer_order_id: this.$route.params.id, trade_password: md5(data.password)}).then(function (res) {
            api.checkAjax(self, res, () => {
              api.tips('恭喜您购买成功！', () => {
                self.$router.push({path: '/user/order/1&1'})
              })
            }, ff.btn)
          })
        }
      },
      openContract (v) {
        this.showAgreement = v
        this.toggle = true
      },
      agree () {
        this.showAgreement = 0
      }
    },
    mounted () {
      if (this.page === 'computeShop') {
        this.totalPrice = this.$parent.detail.one_amount_value * this.$parent.number
      } else {
        this.totalPrice = this.$parent.detail.total_price
      }
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .pay{
    @include main
    color: #999;
    .orderMsg{
      background: #fff;
      padding: 0 30px 15px;
      h3.title{
        font-size: 18px;
        font-weight: bold;
        color: #333;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .orderDetail{
        margin-top: 20px;
        color: #999;
        .value{
          color:#333;
        }
        .detailH{
          @include flex(space-between);
          background: #fff9f3;
          padding: 25px;
          text-align: center;
          div{
            width: 20%;
            .value span{
              font-size: 20px;
            }
          }
          .borderR:not(:last-child){
            border-right: 1px solid #e5e5e5;
          }
        }
        .detailF{
          @include flex(flex-start);
          margin: 20px 0;
          border: 1px solid #eee;
          padding: 20px 25px;
          p{
            padding: 0 48px 0 42px;
          }
        }
      }
    }
    .orderPay{
      margin-top: 20px;
      outline: 1px solid #ff975a;
      border: 5px solid #ffe6d7;
      background:$white;
      padding: 20px 25px;
      @include flex(space-between);
      .detail{
        flex:1;
        background: #f7f8fa;
        height: 290px;
        margin-right: 115px;
        @include flex
        .img{
          @include fitimg(295,235)
        }
        .text{
          flex:1;
          padding:25px;
          p{
            color:$light_text;
            .title{
              color: $light_black;
            }
            .value{
              font-size: 18px;
              font-weight: bold;
              color:$text;
            }
            & + p{
              margin-top:30px
            }
          }
        }
      }
      form{
        @include form(v);
        width:360px;
        .pay_text{
          margin-bottom: 20px;
          @include flex(space-between);
          color: $light_black;
          .pay_value{
            span{
              color: #c80009;
              &.value{
                font-size: 24px;
                font-weight: bold;
              }
            }
          }
          .pay_money{
            span{
              color: $text;
              &.money{
                font-weight: bold;
              }
            }
          }
          a{
            color: #327fff;
          }
        }
        .input,.input input{
          line-height: 1.5;
        }
        .input{
          margin-bottom: 25px;
          & span:last-child{
            top: 44px;
            &:before{
              top:0px
            }
          }
        }
        label{
          color: #666;
          input{
            &:checked{
              background: #ff721f;
              border-color: #ff721f;
            }
            & ~ span.select_accept{
              display: none;
              color: #ff721f;
              font-size: 12px;
            }
            &[data-status='invalid'] ~ span.select_accept{
              display: inline;
            }
          }
        }
        button{
          background: #ff721f;
          border-color: #ff721f;
          margin: 15px 0;
        }
      }
    }
    .agreement_text{
      padding:15px;
      background: #fff;
      .btn_box{
        text-align: center;
        button{
          line-height: 2;
          width:100px;
          margin:30px auto;
          @include button($blue)
        }
      }
    }
  }
</style>
