<template>
  <section class="compute_detail">
    <Product v-if="!next" page="minerShop"></Product>
    <Pay v-else-if="next===1" page="minerShop"></Pay>
    <PaySuccess v-else-if="next===2"></PaySuccess>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import Pay from '@/components/miner/Pay'
  import Product from '@/components/miner/Product'
  import PaySuccess from '@/components/miner/PaySuccess'
  import { mapState } from 'vuex'
  export default {
    components: {
      Pay, Product, PaySuccess
    },
    data () {
      return {
        next: 0,
        detail: {incomeType: '每日结算，次日发放', fee: '', product_name: '', name: ''},
        totalPrice: 0,
        totalHash: 0,
        number: '',
        initNum: 0,
        leftNum: 0,
        balance: 0,
        leftStatus: false,
        buyStatus: 0,
        content: '',
        content1: '',
        show: '',
        str: {4: '预热中', 5: '可售', 7: '已售馨'},
        rate: 6,
        params1: '',
        params2: ''
      }
    },
    methods: {
      goPay (e, show) {
        this.show = show
        if (this.number < 1) {
          if (!this.isMobile) {
            this.buyStatus = 1
            setTimeout(() => {
              this.buyStatus = 0
            }, 2000)
          } else {
            api.tips('请输入或添加至少1台矿机', 1)
          }
          return false
        }
        this.getBuyInfo()
      },
      getBuyInfo () {
        var url = ''
        var data = {token: this.token, num: this.number}
        if (this.params2 === '1') {
          url = 'buy_miner'
          data = Object.assign({miner_id: this.params1}, data)
        } else {
          url = 'productOrder'
          data = Object.assign({product_id: this.params1}, data)
        }
        var self = this
        util.post(url, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.next = 1
            self.balance = res.balance
            if (self.params2 === '2') {
              self.content = res.part_content
            } else {
              self.content = res.content
            }
            if (self.params2 !== '1') {
              self.content1 = res.content1
            }
          })
        })
      },
      changeNum (n) {
        var minNum = this.detail.single_limit_amount || 1
        if (this.leftStatus) return false
        var isOver = n > this.initNum
        if (isOver) {
          this.buyStatus = 2
          setTimeout(() => {
            this.buyStatus = 0
          }, 2000)
        }
        this.number = +n < minNum || isNaN(+n) || typeof +n !== 'number' ? minNum : isOver ? this.initNum : n
        this.number = parseInt(this.number)
        if (n > this.initNum) {
          this.buyStatus = 2
          setTimeout(() => {
            this.buyStatus = 0
          }, 2000)
        }
        this.totalPrice = this.detail.one_amount_value * this.number
        this.totalHash = this.detail.hash * this.number
        var leftAmount = this.initNum - this.number
        this.leftNum = leftAmount < 0 ? 0 : leftAmount
      },
      getData () {
        if (this.params1) {
          var self = this
          var url = ''
          var data = {token: this.token}
          if (this.params2 === '1') {
            url = 'miner_detail'
            data = Object.assign({miner_id: this.params1}, data)
          } else {
            url = 'productDetail'
            data = Object.assign({product_id: this.params1}, data)
          }
          util.post(url, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.initNum = res.amount - res.buyed_amount
              self.leftNum = self.initNum
              self.leftStatus = self.leftNum === 0
              self.detail = Object.assign(self.detail, res)
              if (self.params2 !== '1') {
                self.detail = Object.assign(self.detail, res.has_product_miner_base)
                self.detail.name = res.product_name
                self.detail.hashType = (res.hashtype && res.hashtype.name) || ''
              } else {
                self.detail.name = res.name
                self.detail.weight = (res.miner_list && res.miner_list.weight) || ''
              }
            })
          })
          if (this.addressObj.id) {
            this.number = this.addressObj.num
            this.getBuyInfo()
          }
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    mounted () {
      var p = localStorage.getItem('params')
      if (p) {
        p = JSON.parse(p)
        this.params1 = p[0]
        this.params2 = p[1]
      } else {
        this.$router.push({path: '/minerShop/list'})
      }
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        isMobile: state => state.isMobile,
        addressObj: state => state.addressData
      })
    }
  }
</script>
