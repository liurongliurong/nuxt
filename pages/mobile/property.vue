<template>
  <section class="mobile_propery">
    <div class="property_view">
      <div class="property_data">
        <div class="data_title">总资产（元）</div>
        <div class="data_value">2000008.02</div>
        <div class="balance">
          <div class="val">
            <span class="val_title">可用余额:</span>
            <span class="val_num">{{property.balance}}</span>
          </div>
          <div class="opr">
            <span>提现</span>
            <span>充值</span>
          </div>
        </div>
        <div class="frozen_balance">
          <div class="val">
            <span class="val_title">冻结余额:</span>
            <span class="val_num">{{property.frozen_balance}}</span>
          </div>
        </div>
        <div class="coin_data">
          <div class="val">
            <span class="val_title">{{property.coin_btc}}BTC:</span>
            <span class="val_num">{{property.coin_cny}}</span>
          </div>
          <div class="opr">
            <span @click="openMask(1)">提币</span>
          </div>
        </div>
      </div>
      <div class="miner_data">
        <span>共有云算力{{property.cloudMiner}}台，算力{{property.totalHash}}T</span>
        <nuxt-link to="/mobile/cloudProduct">了解详情></nuxt-link>
      </div>
    </div>
    <div class="property_chart">
      <div class="chart_title">近七日收益折线图（人民币结算）</div>
      <income-chart></income-chart>
    </div>
    <MyMask :form="edit===2?[]:GetIncome" :title="title" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange">
      <p slot="fee">手续费：0.0002btc</p>
      <opr-select slot="select_opr" :no="maskNo" @closeMask="closeMask"></opr-select>
    </MyMask>
    <coin-returns></coin-returns>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  import IncomeChart from '@/pages/user/incomeChart'
  import MyMask from '@/components/common/Mask'
  import OprSelect from '@/components/common/OprSelect'
  import coinReturns from '@/components/mobile/coinReturns'
  export default {
    components: {
      FormField, IncomeChart, MyMask, OprSelect, coinReturns
    },
    data () {
      return {
        nowEdit: 0,
        GetIncome: [{name: 'product_hash_type', type: 'text', title: '算力类型', edit: 'hashType', value: ''}, {name: 'amount', type: 'text', title: '提取额度', placeholder: '请输入提取额度', changeEvent: true, pattern: 'coin', tipsInfo: '余额', value2: 0, tipsUnit: ''}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}],
        edit: 0,
        fee: 0,
        total_price: 0,
        amount: 0,
        product_hash_type: '',
        title: '',
        maskNo: 0,
        cloudMiner: 2,
        property: {balance: 0, frozen_balance: 0, coin_btc: 0, coin_cny: 0, cloudMiner: 2, totalHash: 100}
      }
    },
    methods: {
      getData () {
        if (this.token !== 0 && this.hashType.length) {
          var self = this
          util.post('showCoinData', {sign: api.serialize({token: this.token})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.qwsl = res[0]
              self.output = res[0].output.split(" ")[0]
            })
          }).catch(res => {
            console.log(res)
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      openMask (k) {
        this.total_price = 0
        if (!(this.true_name && this.true_name.status === 1)) {
          this.goAuth ('立即认证', 0)
          return false
        }
        if (!this.address.length) {
          this.goAuth ('立即绑定', 2)
          return false
        }
        if (+this.property.coin_btc <= 0 && this.edit !== 2) {
          api.tips('您的账户余额不足，不能提取收益')
          return false
        }
        var requestUrl = 'showWithdrawCoin'
        var data = {token: this.token, product_hash_type: this.hashType[this.nowEdit] && this.hashType[this.nowEdit].id}
        this.product_hash_type = this.hashType[this.nowEdit].name.toUpperCase()
        var self = this
        util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.fee = res.withdraw_coin_fee
            self.amount = res.coin_account
            self.GetIncome[1].value2 = res.coin_account
            self.edit = k
            self.title = '提取收益'
          })
        })
      },
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkForm(form, 1)
        var sendData = {token: this.token}
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post('withdrawCoin', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.edit = 0
            api.tips('提币成功')
          }, form.btn)
        })
      },
      onChange (obj) {
        var amount = this.GetIncome[1].value2
        if (parseFloat(obj.e.target.value) > parseFloat(amount)) {
          obj.e.target.value = amount
        }
        this.total_price = obj.e.target.value
      },
      closeMask () {
        this.edit = 0
      },
      goAuth (str, n) {
        this.title = str
        this.maskNo = n
        this.edit = 3
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
        address: state => state.info.address
      })
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/style.scss';
  .mobile_propery {
    background:#f5f5f9;
    .property_view {
      background: url(~assets/images/mobile/property.jpg);
      background-size: cover;
      color: #c1d7ff;
      font-size: 0.3rem;
      .property_data {
        padding: 0 0.3rem 0.2rem;
        .data_title {
          padding-top: 0.4rem;
        }
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
</style>
