<template>
  <section class="transfer_detail">
    <div class="main">
      <Pay v-if="next" page="computeTransfer" :proData="proData" :proText="proText"></Pay>
      <Product v-else page="computeTransfer" :proData="proData" :proText="proText"></Product>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pay from '@/components/common/Pay'
  import Product from '@/components/common/Product'
  export default {
    components: {
      Pay, Product
    },
    data () {
      return {
        next: false,
        detail: {buyType: '转让', incomeType: '每日结算，次日发放', status: 0, transfer_amount: 0, total_price: 0},
        proData: {product_name: {title: '矿机名称', unit: ''}, transfer_price: {title: '每T算力价格', unit: '元'}, transfer_amount: {title: '算力总量', unit: 'T'}, transfer_time: {title: '转让时长', unit: '天'}},
        proText: {hashType: '算力类型', buyType: '购买类型', incomeType: '结算方式'},
        balance: 0,
        content: '',
        content1: ''
      }
    },
    methods: {
      goPay () {
        if (!this.trade_password) {
          api.tips('请先设置交易密码', () => {
            this.$router.push({name: 'password'})
          })
          return false
        }
        var self = this
        util.post('doTransfer_Hashrate_show', {sign: api.serialize({token: this.token, user_id: this.user_id, transfer_order_id: this.$route.params.id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.next = true
            self.balance = res.balance_account
            self.content = res.contract_result.content
            self.content1 = res.contract_result.content1
          })
        })
      }
    },
    mounted () {
      var self = this
      util.post('getHashrate_details', {sign: api.serialize({token: this.token, transfer_order_id: this.$route.params.id})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.detail = Object.assign(self.detail, res)
          self.detail = Object.assign(self.detail, res.has_product_hash.has_product_miner_base)
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
  .transfer_detail{
    padding-top: 30px;
    padding-bottom: 110px;
    background: #f7f8fa;
    .main{
      @include main
    }
  }
</style>
