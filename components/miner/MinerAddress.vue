<template>
  <div class="pay_address">
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
  import { fetchApiData } from '@/util/index'
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
        fetchApiData(this, 'setDefault', {token: this.token, post_id: id}, (res) => {
          api.tips('设置成功')
          this.$emit('getAddress')
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

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .pay_address{
    .address_box{
      @include address_data
      .item{
        background: #FAFAFA;
        &.active,&:hover{
          background: #EFF6FE;
        }
      }
      .all_address_btn{
        float: right;
        margin-top:20px;
        font-size: 12px;
        color:$blue;
        cursor: pointer;
        padding-right:15px;
      }
    }
  }
</style>
