<template>
  <div class="mobile_pay_type">
    <div :class="['pay_item', {active:payNo===2}]" @click="setPayNo(2)">
      <span class="zhifubao">支付宝支付</span>
    </div>
    <div :class="['pay_item', {active:payNo===1}]" @click="setPayNo(1)">
      <span class="yue">可用余额</span>
      <span class="val">{{balance}}元</span>
      <router-link to="/mobile/recharge">充值</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'payType',
    props: {
      payNo: {
        type: Number
      },
      balance: {
        type: Number,
        default: 0
      }
    },
    methods: {
      setPayNo (k) {
        this.$emit('setPayNo', k)
      }
    }
  }
</script>
