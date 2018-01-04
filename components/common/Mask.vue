<template>
  <div class="popup">
    <div class="popup_con">
      <div class="popup_title">
        <span>{{title}}</span>
        <span class="icon_close" @click="$parent.closeMask"></span>
      </div>
      <form :class="['form form_content', {card_form: $parent.edit==='card'}]" @submit.prevent="$parent.submit" novalidate v-if="form.length">
        <AddressInput :form="form" :val="val" v-if="val"></AddressInput>
        <template v-else>
          <FormField :form="form"></FormField>
          <p v-if="$parent.fee&&$parent.edit!=='GetIncome'">手续费：{{$parent.total_price * $parent.fee|format}}元<span class="fee">({{$parent.fee*100+'%'}})</span></p>
          <p v-if="$parent.fee&&$parent.edit==='GetIncome'">手续费：0.0002btc</p>
        </template>
        <button name="btn">确认提交</button>
      </form>
      <template v-else-if="contract">
        <div class="popup_body" v-html="contract" v-if="contract!=='selfEdit'"></div>
        <slot v-else></slot>
        <div class="popup_foot">
          <label for="accept1" @click="goOn">
            <span>同意并继续</span>
          </label>
        </div>
      </template>
      <div class="mobile_pay_type" v-else>
        <div :class="['pay_item', {active:$parent.payNo===2}]" @click="setPayNo(2)">
          <div class="pay_item_left">
            <span>支付宝支付</span>
          </div>
        </div>
        <div :class="['pay_item', {active:$parent.payNo===1}]" @click="setPayNo(1)">
          <div class="pay_item_left">
            <span>可用余额</span>
            <span class="val">{{$parent.balance}}元</span>
          </div>
          <router-link to="/mobile/recharge">充值</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FormField from '@/components/common/FormField'
  import AddressInput from '@/components/common/AddressInput'
  import api from '@/util/function'
  export default {
    components: {
      FormField, AddressInput
    },
    props: {
      form: {
        type: Array
      },
      title: {
        type: String
      },
      contract: {
        type: String
      },
      val: {
        type: Object
      }
    },
    filters: {
      format: api.decimal
    },
    methods: {
      goOn () {
        this.$parent.closeMask()
        var accept = document.querySelector('#accept')
        accept.checked = true
      },
      setPayNo (k) {
        this.$parent.payNo = k
        this.$parent.closeMask()
      }
    }
  }
</script>
