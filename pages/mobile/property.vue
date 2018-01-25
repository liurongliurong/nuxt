<template>
  <section class="mobile_propery">
    <div class="property_box" v-if="!edit">
      <div class="property_view">
        <div class="property_data">
          <div class="data_title">总资产 (元)</div>
          <div class="data_value">{{+property.total_money|currency}}</div>
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
              <span class="val_title">{{(+c.balance_account).toFixed(8)}}BTC：</span>
              <span class="val_num">≈{{+c.coin_price*(+c.balance_account)|currency}}元</span>
            </div>
            <div class="opr">
              <span @click="openMask(1, k, c.balance_account)">提币</span>
            </div>
          </div>
        </div>
        <div class="miner_data">
          <span>共有云算力{{property.total_miner}}台，算力{{property.total_hash}}T</span>
          <nuxt-link to="/mobile/cloudProduct">了解详情></nuxt-link>
        </div>
      </div>
      <div class="property_chart">
        <div class="chart_title">近七日收益折线图（人民币结算）</div>
        <income-chart></income-chart>
      </div>
      <coin-returns></coin-returns>
    </div>
    <form class="form" @submit.prevent="submit" novalidate v-else>
      <div class="bg"></div>
      <form-field :form="form" @onChange="onChange"></form-field>
      <p class="fee" v-if="edit===1">手续费：{{fee + (hashType[nowEdit] && hashType[nowEdit].name).toLowerCase()}}</p>
      <p class="fee" v-if="edit===2">手续费：{{totalPrice * fee + '元(' + (fee * 100) + '%)'}}</p>
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
  import util from '@/util'
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
        nowEdit: 0,
        getIncome: getIncome,
        withdrawals: withdrawals,
        form: [],
        edit: 0,
        fee: 0,
        totalPrice: 0,
        product_hash_type: '',
        maskNo: -1,
        property: {total_money: 0, balance_account: 0, freeze_account: 0, coin_list: [], total_miner: 0, total_hash: 0}
      }
    },
    methods: {
      getData () {
        if (this.token !== 0 && this.hashType.length) {
          util.post('showCoinData', {sign: 'token=' + this.token}).then((res) => {
            api.checkAjax(this, res, () => {
              this.qwsl = res[0]
              this.output = res[0].output.split(" ")[0]
            })
          })
          util.post('user_account', {sign: 'token=' + this.token}).then((res) => {
            api.checkAjax(this, res, () => {
              this.property = res
            })
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      openMask (k, n ,balance) {
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
          this.getIncome[0].value = this.hashType[n] && this.hashType[n].name
          requestUrl = 'showWithdrawCoin'
          data = {token: this.token, product_hash_type: this.hashType[n] && this.hashType[n].id}
          this.nowEdit = n
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
        util.post(requestUrl, {sign: api.serialize(data)}).then((res) => {
          api.checkAjax(this, res, () => {
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
            window.scroll(0, 0)
            document.body.style.overflow = 'hidden'
          })
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
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.edit = 0
            api.tips(tipsStr)
          }, form.btn)
        })
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
        document.body.style.overflow = 'auto'
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
            padding-top: 0.2rem;
            padding-bottom: 0.4rem;
          }
          .balance,.frozen_balance,.coin_data {
            @include flex(space-between)
            padding-bottom: 0.2rem;
            .val {
              .val_num {
                color: #fff
              }
            }
            .opr {
              width: 2.2rem;
              text-align: left;
              span {
                padding: 0.05rem 0.2rem;
                font-size: 0.28rem;
                border: 1px solid;
                border-radius: 2px;
                color: rgba(255, 255, 255, 0.9);
                & + span {
                  margin-left: 0.2rem
                }
                &:first-child {
                  border-color: #ccc #fff #fff #ccc;
                }
                &:last-child {
                  border-color: #ccc #ccc #fff #fff;
                }
                &:only-child {
                  border-color: #fff #fff #ccc #ccc;
                }
              }
            }
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
      .property_chart {
        margin: 0.3rem 0;
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
