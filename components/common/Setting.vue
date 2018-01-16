<template>
  <div class="setting">
    <div :class="['item', {fail: !menu[type==='password'?k+4:k].status}, {success: menu[type==='password'?k+4:k].status}, {address_item: n.name==='address'}]" v-for="n,k in nav">
      <template v-if="n.name!=='address'">
        <div class="icon"></div>
        <div class="con_title">{{n.title}}</div>
        <div class="desc">{{n.desc}}</div>
        <div class="val">
          <template v-if="menu[k].status&&n.name==='tel'">{{n.text}}：<span>{{mobile|format}}</span></template>
          <template v-if="menu[k].status&&n.name==='auth'">{{true_name.truename}}：<span>{{true_name.idcard|cardformat}}</span></template>
          <template v-if="menu[k].status&&n.name==='card'&&bank_card.open_bank">{{bank_card.open_bank}}：<span>{{bank_card.card_no|cardformat}}</span></template>
        </div>
        <div class="opr" @click="setEdit(n.name,n.title,menu[type==='password'?k+4:k].setting)">{{menu[type==='password'?k+4:k].opr}}</div>
      </template>
      <template v-else>
        <div class="item">
          <div class="icon"></div>
          <div class="con_title">{{n.title}}</div>
          <div class="desc">{{n.desc}}</div>
          <div class="val"></div>
          <div class="opr" @click="setEdit(n.name,n.title,menu[k].setting)">{{menu[k].opr}}</div>
        </div>
        <div class="item" v-for="a in address">
          <div class="val">{{a.product_hash_type+'地址: '+a.address}}</div>
          <div class="opr" @click="setEdit(n.name,n.title,menu[k].setting,a.product_hash_type)">修改</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  import { mapState, mapGetters } from 'vuex'
  export default {
    props: {
      nav: {
        type: Array
      },
      type: {
        type: String,
        default: 'account'
      }
    },
    methods: {
      setEdit (str, title, setting, n) {
        if (str === 'card' || str === 'address' || str === 'trade') {
          if (!(this.true_name && this.true_name.status === 1)) {
            api.tips('请先实名认证')
            return false
          }
        }
        if (!setting) return false
        this.$emit('setEdit', {str, title, n})
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        address: state => state.info.address
      }),
      ...mapGetters([
        'menu'
      ])
    },
    filters: {
      format: api.telReadable,
      cardformat: api.cardReadable
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .setting{
    padding:25px 30px;
    .item{
      &:not(.address_item){
        @include flex(space-between)
        padding:15px;
        border:1px solid #e5e5e5;
      }
      &.success{
        .icon{
          position: relative;
          background: $green;
          &:before{
            content:'';
            @include right
          }
        }
        .con_title{
          color: $green;
        }
      }
      &.fail{
        .icon{
          text-align: center;
          background: $fail;
          color: $white;
          &:before{
            content:'!'
          }
        }
        .con_title{
          color: $fail;
        }
      }
      &:not(:last-child){
        margin-bottom:25px;
      }
      &.address_item{
        .item:not(:last-child){
          margin-bottom: 0;
          border-bottom:0
        }
        .item:not(:first-child){
          .val{
            text-align: left;
            padding-left:19%;
            width:80%
          }
        }
      }
      .icon{
        @include block(18,50%)
      }
      .con_title{
        width: 13%;
        font-size: 16px;
        font-weight: bold;
      }
      .desc{
        width:38%;
      }
      .val{
        width: 22%;
        color: $light_text;
        text-align: center;
        span{
          color: $text;
        }
      }
      .opr{
        width: 17%;
        text-align: right;
        color: $blue;
        cursor: pointer;
      }
    }
  }
</style>
