<template>
  <div class="order_msg address_msg">
    <h3 class="title">选择收货地址</h3>
    <div class="address_box">
      <div :class="['item',{active:a.id===addressObject.id}]" v-for="a,k in showAll?addressData:addressData.slice(0, 3)">
        <span @click="selectAddress(k)">{{a.province_name+a.city_name+a.area_name+a.area_details+'('+a.post_user+' 收) '+a.post_mobile}}</span>
        <span v-if="a.is_default">默认地址</span>
        <span class="set_default" v-else @click="setDefault(a.id)">设为默认地址</span>
      </div>
      <div class="address_btn" @click="openMask(2)">使用新地址</div>
      <div class="all_address_btn" @click="showAll=!showAll" v-if="addressData.length>3">{{showAll?'收起':'查看所有地址'}}</div>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util/index'
  import { mapState } from 'vuex'
  export default {
    props: {
      addressObject: {
        type: Object
      },
      addressData: {
        type: Array
      }
    },
    data () {
      return {
        showAll: 0
      }
    },
    methods: {
      selectAddress (k) {
        this.$emit('selectAddress', k)
      },
      setDefault (id) {
        var self = this
        util.post('setDefault', {sign: api.serialize({token: this.token, post_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('设置成功')
            self.$emit('getAddress')
          })
        })
      },
      openMask (k) {
        this.$emit('openMask', k)
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>
