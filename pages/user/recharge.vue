<template>
  <section class="recharge">
    <h2>用户充值</h2>
    <h3>操作提示</h3>
    <div class="recharge_text">
      <div class="recharge_info">
        <p>账号主体：浙江数秦科技有限公司</p>
        <p>对公银行：杭州银行</p>
        <p>银行卡号：3301 0401 6000 4867 449</p>
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
    <form class="form" @submit.prevent="submit" novalidate>
      <FormField :form="form"></FormField>
      <button name="btn">提交申请</button>
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
        form: [{name: 'amount', type: 'text', title: '充值金额', placeholder: '请输入充值金额', pattern: 'bigMoney', len: 7}, {name: 'bank_num', type: 'text', title: '充值银行卡', value: 'bank_card'}, {name: 'request_id', type: 'text', title: '充值流水号', placeholder: '请输入充值流水号', pattern: 'int'}]
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkFrom(form)
        var sendData = {token: this.token}
        if (!data) return false
        var self = this
        form.btn.setAttribute('disabled', true)
        util.post('balance_recharge', Object.assign(data, sendData)).then(function (res) {
          api.checkAjax(self, res, () => {
            form.amount.value = ''
            form.request_id.value = ''
            api.tips('提交成功，请等待工作人员确认', () => {
              form.btn.removeAttribute('disabled')
            })
          }, form.btn)
        })
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        bank_card: state => state.info.bank_card
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
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
            width:450px;
            @include process
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
    .form{
      margin: 0 auto;
      padding:40px 130px;
      @include form(v)
      width:450px;
      .input{
        span:first-child {
          width: 80px;
        }
      }
    }
  }
</style>
