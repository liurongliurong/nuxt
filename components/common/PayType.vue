<template>
  <div class="mobile_pay_type">
    <div :class="['pay_item', {active:payNo===2}]" @click="setPayNo(2)">
      <div class="pay_item_left">
        <span>支付宝支付</span>
      </div>
    </div>
    <div :class="['pay_item', {active:payNo===1}]" @click="setPayNo(1)">
      <div class="pay_item_left">
        <span>可用余额</span>
        <span class="val">{{balance}}元</span>
      </div>
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
