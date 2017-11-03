<template>
  <section class="compute_detail">
    <div class="main">
      <Pay v-if="next" page="computeShop" :proData="proData2" :proText="proText2"></Pay>
      <Product v-else page="computeShop" :proData="proData" :proText="proText"></Product>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import Pay from '@/components/common/Pay'
  import Product from '@/components/common/Product'
  import { mapState } from 'vuex'
  export default {
    components: {
      Pay, Product
    },
    data () {
      return {
        next: false,
        detail: {incomeType: '每日结算，次日发放'},
        proData: {one_amount_value: {title: '每台服务器价格', unit: '元'}, hash: {title: '每台服务器算力', unit: 'T'}, amount: {title: '服务器总台数', unit: '台'}},
        proText: {hashType: '算力类型', status: '购买类型', incomeType: '结算方式'},
        proData2: {product_name: {title: '矿机名称', unit: ''}, one_amount_value: {title: '每台服务器价格', unit: '元'}, number: {title: '购买服务器数量', unit: '台'}, income: {title: '今日每T预期收益', unit: 'btc'}, electricityFees: {title: '每日电费约', unit: 'btc'}},
        proText2: {hashType: '算力类型', hash: '每台矿机算力', status: '购买类型', incomeType: '结算方式'},
        totalPrice: 0,
        totalHash: 0,
        number: '',
        initNum: 0,
        leftNum: 0,
        balance: 0,
        leftStatus: false,
        overStatus: false,
        content: '',
        content1: '',
        str: {4: '预热', 5: '可售'}
      }
    },
    methods: {
      goPay (e) {
        if (!this.trade_password) {
          api.tips('请先设置交易密码', () => {
            this.$router.push({name: 'auth-password'})
          })
          return false
        }
        if (this.number < 1) {
          e.target.classList.add('error')
          setTimeout(() => {
            e.target.classList.remove('error')
          }, 2000)
          return false
        }
        if (this.detail.status === 4) {
          api.tips('暂不能购买')
          return false
        }
        var self = this
        // 100002:参数缺失，200009：不能购买自己发布的订单
        util.post('productOrder', {token: this.token, product_id: this.$route.params.id, num: this.number}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.next = true
            self.balance = res.balance
            self.content = res.content
            self.content1 = res.content1
          })
        })
      },
      changeNum (n) {
        if (this.leftStatus) return false
        this.number = n < 1 || isNaN(+n) || typeof +n !== 'number' ? 1 : n > this.initNum ? this.initNum : n
        this.number = parseInt(this.number)
        if (n > this.initNum) {
          this.overStatus = true
          setTimeout(() => {
            this.overStatus = false
          }, 2000)
        }
        this.totalPrice = this.detail.one_amount_value * this.number
        this.totalHash = this.detail.hash * this.number
        var leftAmount = this.initNum - this.number
        this.leftNum = leftAmount < 0 ? 0 : leftAmount
      }
    },
    mounted () {
      var self = this
      util.post('productDetail', {token: this.token, product_id: this.$route.params.id}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.initNum = res.amount - res.buyed_amount
          self.leftNum = self.initNum
          self.leftStatus = self.leftNum === 0
          self.detail = Object.assign(self.detail, res)
          self.detail = Object.assign(self.detail, res.has_product_miner_base)
          self.detail.hashType = res.hashtype.name
        })
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        trade_password: state => state.info.trade_password
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .compute_detail{
    padding-top: 30px;
    padding-bottom: 110px;
    background: #f7f8fa;
    .main{
      @include main
    }
  }
</style>
