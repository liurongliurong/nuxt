<template>
  <section class="mobile_hire_purchase">
    <div class="hire_title">
      <span>分期金额</span>
      <span>{{totalPrice.toFixed(2)}}</span>
    </div>
    <div class="hire_box">
      <div class="hire_box_head">选择分期类型</div>
      <div class="hire_list">
        <label :class="['item', {active: rate==r.num}]" class="item" v-for="r,k in rateList" @click="setRate(r.num, r.fee)">
          <div class="item_content">
            <div class="item_content_value">{{'每期'+(totalPrice/r.num).toFixed(2)+' &times; '+r.num+'期'}}</div>
            <div class="item_content_fee">{{'手续费'+(totalPrice*r.fee).toFixed(2)+'/期'}}</div>
          </div>
          <div class="icon_select">
            <input type="radio" name="rate" checked v-if="k===0">
            <input type="radio" name="rate" v-else>
          </div>
        </label>
      </div>
      <div class="hire_box_foot">
        <div class="text">
          <span>手续费</span>
          <span class="value">{{loanPrice}}</span>
        </div>
        <!-- <div class="text">
          <span>还款日</span>
          <span class="date">每月17日</span>
        </div> -->
      </div>
    </div>
    <div class="mobile_btn">
      <button name="btn" @click="goConfirm">确认分期</button>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        totalPrice: 0,
        rateList: [],
        rate: 0,
        params1: '',
        detail: {},
        number: 0,
        fee: 0
      }
    },
    methods: {
      pageInit () {
        if (this.token && this.number) {
          let data = {product_id: this.params1, token: this.token, num: this.number}
          fetchApiData(this, 'productOrder', data, (res) => {
            this.totalPrice = (this.detail.one_amount_value * +this.number) * res.loan_limit
            this.rateList = res.period_num
            this.rate = this.rateList[0] && +this.rateList[0].num
            this.fee = this.rateList[0] && +this.rateList[0].fee
          })
        } else {
          setTimeout(() => {
            this.pageInit()
          }, 5)
        }
      },
      setRate (n, fee) {
        this.rate = +n
        this.fee = +fee
      },
      goConfirm () {
        var data = {loanPrice: this.totalPrice, rate: this.rate}
        api.setStorge('info', data)
        this.$router.push({name: 'minerShop-pay'})
      }
    },
    mounted () {
      var p = api.getStorge('suanli')
      var p2 = api.getStorge('info')
      if (p.proId) {
        this.params1 = p.proId
      } else {
        this.$router.push({path: '/minerShop/detail'})
      }
      if (p2) {
        this.detail = p2
        this.number = this.detail.number
      } else {
        this.$router.push({path: '/minerShop/detail'})
      }
      this.pageInit()
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      }),
      loanPrice () {
        return (this.totalPrice * this.fee * this.rate).toFixed(2)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mobile_hire_purchase {
    min-height: calc(100vh - 0.88rem);
    padding-bottom: 57px;
    font-size: 0.32rem;
    color:$text;
    background: #F5F5F9;
    padding-top: 0.2rem;
    .hire_title {
      margin-top: 0.1rem;
      background: #fff;
      line-height: 0.8rem;
      padding: 0 0.3rem;
      span:last-child {
        margin-left: 0.3rem;
        color: #000
      }
    }
    .hire_box {
      .hire_box_head,.hire_box_foot {
        padding: 0 0.3rem
      }
      .hire_box_head {
        color: $light_black;
        margin-top: 0.2rem;
        line-height: 2;
      }
      .hire_list {
        padding-left: 0.3rem;
        background: #fff;
        .item {
          @include flex(space-between)
          padding: 0.3rem 0;
          .item_content {
            .item_content_value {
              margin-bottom: 0.08rem
            }
            .item_content_fee {
              color: $light_black;
              font-size: 0.28rem
            }
          }
          .icon_select {
            margin-right: 0.6rem;
            input{
              @include checkbox
              width: 0.36rem;
              height: 0.36rem;
            }
          }
          &:not(:last-child) {
            border-bottom: 1px solid $border
          }
        }
      }
      .hire_box_foot {
        margin-top: 0.2rem;
        .text {
          line-height: 2;
          span {
            &.value {
              color: $orange
            }
            &.date {
              color: $light_black
            }
            &:last-child {
              margin-left: 0.4rem
            }
          }
        }
      }
    }
    .mobile_btn {
      @include mobile_footer_btn
      button {
        margin: 0
      }
    }
  }
</style>
