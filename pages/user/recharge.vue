<template>
  <section class="recharge">
    <h2>用户充值</h2>
    <h3>操作提示</h3>
    <div class="recharge_text">
      <div class="recharge_info">
        <p>账号主体：浙江数秦科技有限公司</p>
        <p>开户银行：杭州联合农村商业银行股份有限公司吴山支行</p>
        <p>银行卡号：2010 0018 4219 726</p>
        <div class="recharge_process">
          <div>流程说明：</div>
          <div class="process">
            <div class="item active" v-for="p,k in processText">
              <i>{{k+1}}</i>
              <span>{{p}}</span>
              <div class="line" v-if="k<3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3>充值申请</h3>
    <nav>
      <div :class="['item', {active:rechargeNo===k}]" v-for="r,k in rechargeType" @click="changeType(k)">{{r}}</div>
    </nav>
    <form class="form" @submit.prevent="submit" novalidate>
      <FormField :form="form[rechargeNo]"></FormField>
      <button name="btn">{{rechargeNo?'去支付':'提交申请'}}</button>
    </form>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import FormField from '@/components/common/FormField'
  import { mapState } from 'vuex'
  export default {
    components: {
      FormField
    },
    props: {
      page: {
        type: String
      }
    },
    data () {
      return {
        processText: ['银行转账', '提交申请', '审核通过'],
        processStatus: 2,
        form: [
          [{name: 'amount', type: 'text', title: '充值金额', placeholder: '请输入充值金额', pattern: 'bigMoney', len: 7}, {name: 'bank_num', type: 'text', title: '充值银行卡', placeholder: '请输入充值银行卡', value: 'bank_num', pattern: 'bankCard'}, {name: 'request_id', type: 'text', title: '充值流水号', placeholder: '请输入充值流水号', pattern: 'int'}],
          [{name: 'amount', type: 'text', title: '充值金额', placeholder: '请输入充值金额', pattern: 'bigMoney', len: 6}]
        ],
        rechargeType: ['银行卡充值', '支付宝充值'],
        rechargeNo: 0
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkFrom(form, this.isMobile)
        var sendData = {token: this.token}
        var callbackUrl = ''
        if (!data) return false
        var self = this
        form.btn.setAttribute('disabled', true)
        if (this.rechargeNo) {
          util.post('applyBalanceRecharge', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
            api.checkAjax(self, res, () => {
              res.subject = encodeURIComponent(res.subject)
              if (self.isMobile) {
                res = Object.assign(res, {is_mobile: 1})
              } else {
                res = Object.assign(res, {is_mobile: 0})
              }
              callbackUrl = location.protocol + '//' + location.host + self.callUrl
              util.post('alipay', {sign: api.serialize(Object.assign({url: callbackUrl, token: self.token}, res))}).then((resData) => {
                api.checkAjax(self, resData, () => {
                  location.href = resData.url
                })
              })
            })
          })
        } else {
          util.post('balance_recharge', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
            api.checkAjax(self, res, () => {
              form.amount.value = ''
              form.request_id.value = ''
              api.tips('提交成功，请等待工作人员确认', self.isMobile, () => {
                if (self.callUrl) {
                  self.$router.push({path: self.callUrl})
                  self.$store.commit('SET_URL', '')
                }
                // form.btn.removeAttribute('disabled')
              })
            }, form.btn)
          })
        }
      },
      changeType (n) {
        this.rechargeNo = n
      }
    },
    computed: {
      ...mapState({
        callUrl: state => state.callUrl,
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        isMobile: state => state.isMobile,
        unread_num: state => state.unread_num
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .recharge{
    padding:0 15px;
    .recharge_text{
      padding:20px 30px;
      .recharge_info{
        font-size: 16px;
        line-height: 2;
        color:$light_text;
        .recharge_process{
          @include flex
          .process{
            font-size: 14px;
            width:600px;
            @include process
            .item{
              i{
                vertical-align: middle;
              }
              &:not(:last-child){
                width: calc(50% - 50px);
                .line {
                  width: calc(100% - 130px);
                }
              }
            }
            padding: 0;
            .item.active ~ .item{
              & i {
                color: $white;
              }
              & span{
                color: $blue;
              }
            }
          }
        }
      }
    }
    nav{
      @include flex(center)
      margin-top:30px;
      margin-bottom:10px;
      .item{
        margin:0 15px;
        line-height: 1.8;
        cursor: pointer;
        border-bottom:2px solid transparent;
        &:hover,&.active{
          color:$blue;
          border-color:$blue;
        }
      }
    }
    .form{
      margin: 20px auto;
      @include form(v)
      width:450px;
      .input{
        span:first-child {
          width: 80px;
        }
      }
      button{
        margin:0
      }
    }
    @media screen and (max-width: $mobile) {
      background:#f4f4f4;
      padding:0;
      margin-bottom: 60px;
      h2{
        display: none;
      }
      h3,.recharge_text,nav,.form{
        padding:0 15px;
        margin:0;
        background: #fff;
      }
      h3{
        line-height: 2;
        padding-top:10px;
        &:before{
          content:'|';
          color:$blue;
          font-weight: bold;
          font-size: 14px;
          margin-right:8px;
        }
      }
      nav{
        padding-bottom:15px;
      }
      .recharge_text{
        padding-bottom:15px;
        margin-bottom:15px;
        .recharge_info{
          font-size: 0.6rem;
          .recharge_process{
            display: block;
            .process{
              width:100%;
              .item{
                position: relative;
                display: inline-block;
                text-align: center;
                width:33%;
                i,span{
                  display: block;
                  margin: 0 auto;
                }
                .line{
                  position: absolute;
                }
                &:not(:last-child){
                  .line{
                    margin:0;
                    top:12px;
                    left:calc(50% + 21px);
                    width:calc(100% - 42px);
                  }
                }
              }
            }
          }
        }
      }
      .form{
        width:100%;
        padding:0;
        .form_field{
          margin-left:15px;
          margin-right:15px;
          .input{
            line-height: 1.5;
          }
        }
        button{
          width:calc(100% - 30px);
          font-size: 0.6rem;
          margin-bottom:15px;
          margin-left:15px;
        }
      }
    }
  }
</style>
