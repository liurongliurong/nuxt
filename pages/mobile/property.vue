<template>
  <section class="mobile_propery">
    <div class="property_box" v-if="!edit">
      <div class="property_view">
        <div class="property_data">
          <div class="data_title">总资产 (元)</div>
          <div class="data_value">{{+property.total_money|currency}}</div>
        </div>
        <div class="miner_data" v-if="property.total_miner">
          <span>共有云算力{{property.total_miner}}台，算力{{property.total_hash}}T</span>
          <nuxt-link to="/mobile/cloudProduct">了解详情></nuxt-link>
        </div>
      </div>
      <div class="property_detail">
        <div class="balance">
          <div class="val">
            <span class="val_title">可用余额：</span>
            <span class="val_num">{{+property.balance_account|currency}}</span>
          </div>
          <div class="opr">
            <span @click="openMask(2)">提现</span>
            <span @click="openMask(3)">充值</span>
          </div>
        </div>
        <div class="frozen_balance">
          <div class="val">
            <span class="val_title">冻结余额：</span>
            <span class="val_num">{{+property.freeze_account|currency}}</span>
          </div>
        </div>
        <div class="coin_data" v-for="c,k in property.coin_list">
          <div class="val">
            <span class="val_title">{{c.product_hash_type_name}}：</span>
            <span class="val_num">{{(+c.balance_account).toFixed(8)}}</span>
            <span class="val_num_tips" v-if="+c.freeze_withdraw_account>0">{{` (冻结：${(+c.freeze_withdraw_account).toFixed(8)})`}}</span>
          </div>
          <div class="opr coin_list_opr">
            <span @click="openMask(1, c.balance_account, c.product_hash_type, c.product_hash_type_name)">提币</span>
          </div>
        </div>
      </div>
      <div class="property_chart" v-if="showChart">
        <div class="chart_title">近期收益折线图</div>
        <income-chart></income-chart>
      </div>
      <coin-returns></coin-returns>
    </div>
    <form class="form" @submit.prevent="submit" novalidate v-else>
      <div class="bg"></div>
      <form-field :form="form" @onChange="onChange"></form-field>
      <p class="fee" v-if="edit===1">手续费：{{fee + nowHashType.toLowerCase()}}</p>
      <p class="fee" v-if="edit===2">手续费：{{(+totalPrice * +fee).toFixed(2) + '元(' + (fee * 100) + '%)'}}</p>
      <button name="btn">确认提交</button>
      <div class="btn" @click="closeMask">取消</div>
    </form>
    <div :class="'popup middle'" v-if="maskNo>-1">
      <div class="popup_con">
        <opr-select :no="maskNo" @closeMask="closeMask"></opr-select>
      </div>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { getIncome, withdrawals } from '@/util/form'
  import FormField from '@/components/common/FormField'
  import IncomeChart from '@/pages/user/incomeChart'
  import OprSelect from '@/components/common/OprSelect'
  import coinReturns from '@/components/mobile/coinReturns'
  export default {
    components: {
      FormField, IncomeChart, OprSelect, coinReturns
    },
    data () {
      return {
        getIncome: getIncome,
        withdrawals: withdrawals,
        form: [],
        edit: 0,
        fee: 0,
        totalPrice: 0,
        product_hash_type: '',
        maskNo: -1,
        showChart: false,
        property: {total_money: 0, balance_account: 0, freeze_account: 0, coin_list: [], total_miner: 0, total_hash: 0},
        nowHashType: ''
      }
    },
    methods: {
      getData () {
        if (this.token !== 0 && this.hashType.length) {
          fetchApiData(this, 'showCoinData', {token: this.token}, (res) => {
            this.qwsl = res[0]
            this.output = res[0].output.split(" ")[0]
          })
          fetchApiData(this, 'user_account', {token: this.token}, (res) => {
            this.property = res
          })
          fetchApiData(this, 'showIncome', {token: this.token, product_hash_type: 1}, (res) => {
            let chart = res.income.filter((v) => {
              return v > 0
            })
            this.showIncome = chart.length > 0
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      openMask (k ,balance, hashType, hashName) {
        this.form = []
        this.totalPrice = 0
        var requestUrl = ''
        var data = {}
        if (!(this.true_name && this.true_name.status === 1)) {
          this.maskNo = 0
          return false
        }
        if (k === 1) {
          if (!this.address.length) {
            this.maskNo = 2
            return false
          }
          if (+balance <= 0 && this.edit !== 2) {
            api.tips('您的账户余额不足，不能提取收益')
            return false
          }
          this.getIncome[0].value = hashName
          requestUrl = 'showWithdrawCoin'
          data = {token: this.token, product_hash_type: hashType}
          this.nowHashType = hashName
        } else if (k === 2) {
          if (!(this.bank_card && this.bank_card.status === 1)) {
            this.maskNo = 1
            return false
          }
          if (+this.balance <= 0) {
            api.tips('您的账户余额不足，不能提现')
            return false
          }
          requestUrl = 'showWithdraw'
          data = {token: this.token}
        } else if (k === 3) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'mobile-recharge'})
          return false
        }
        fetchApiData(this, requestUrl, data, (res) => {
          if (k === 1) {
            this.fee = res.withdraw_coin_fee
            this.getIncome[1].value2 = res.coin_account
            // this.title = '提取收益'
            this.form = this.getIncome
          } else if (k === 2) {
            this.fee = res.withdraw_fee
            this.withdrawals[0].value2 = parseInt(res.balance_account)
            // this.title = '提取现金'
            this.form = this.withdrawals
          }
          this.edit = k
        })
      },
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkForm(form, 1)
        var sendData = {token: this.token}
        var url = ''
        var tipsStr = ''
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        if (this.edit === 2) {
          url = 'withdraw'
          tipsStr = '提现成功'
        } else if (this.edit === 1) {
          url = 'withdrawCoin'
          tipsStr = '提币成功'
        }
        fetchApiData(this, url, Object.assign(data, sendData), (res) => {
          this.edit = 0
          api.tips(tipsStr, () => {
            if (this.edit === 2) {
              window.location.reload()
            }
          })
        }, form.btn)
      },
      onChange (obj) {
        var amount = 0
        if (this.edit === 1) {
          amount = this.getIncome[1].value2
        } else if (this.edit === 2) {
          amount = this.withdrawals[0].value2
        }
        if (parseFloat(obj.e.target.value) > parseFloat(amount)) {
          obj.e.target.value = amount
        }
        this.totalPrice = obj.e.target.value
      },
      closeMask () {
        this.edit = 0
        this.maskNo = -1
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        hashType: state => state.hashType,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        address: state => state.info.address,
        balance: state => state.info.balance
      })
    },
    filters: {
      format: api.decimal,
      currency: api.currency
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/style.scss';
  .mobile_propery {
    background:#f5f5f9;
    padding-top: 0;
    min-height: 100vh;
    .property_box {
      .property_view {
        background: url(~assets/images/mobile/property.jpg);
        background-size: cover;
        color: #c1d7ff;
        font-size: 0.3rem;
        .property_data {
          padding: 0.88rem 0.3rem 0.2rem;
          .data_value {
            color: #fff;
            font-size: 0.9rem;
          }
        }
        .miner_data {
          padding: 0.2rem 0.3rem;
          background: #5491fd;
          span {
            color: #fff
          }
          a {
            color: #c1d7ff;
            margin-left: 0.3rem;
          }
        }
      }
      .property_detail {
        margin-bottom: 0.3rem;
        padding: 0.3rem 0.3rem 0.1rem;
        background: #fff;
        .balance,.frozen_balance,.coin_data {
          @include flex(space-between)
          padding-bottom: 0.2rem;
          .val {
            flex:1;
            .val_title {
              color: $light_black;
            }
            .val_num_tips {
              font-size: 0.24rem;
              color: $light_black
            }
          }
          .opr {
            width: 2.6rem;
            text-align: left;
            span {
              padding: 0.05rem 0.3rem;
              font-size: 0.28rem;
              border: 1px solid;
              border-radius: 2px;
              color: $blue;
              & + span {
                margin-left: 0.2rem
              }
            }
            &.coin_list_opr {
              width: 1.23rem;
            }
          }
        }
      }
      .property_chart {
        margin-bottom: 0.3rem;
        background: #fff;
        .chart_title {
          padding: 0.2rem 0.3rem;
          border-bottom: 1px solid $border;
        }
        .income_chart .myChart {
          height: 300px;
        }
      }
    }
    .form {
      background: #fff;
      min-height: 100vh;
      @include form(v)
      .bg {
        height: 0.88rem;
        background: #327fff;
      }
      .fee {
        padding: 0.3rem;
      }
    }
  }
</style>
