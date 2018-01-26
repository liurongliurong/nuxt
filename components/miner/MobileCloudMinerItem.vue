<template>
  <div class="mobile_cloud_miner_item item" :disabled="itemData.status&&(itemData.status===2||itemData.status===3)||(itemData.amount-itemData.buyed_amount<=0)" @click="goDetail(itemData.id, '2')">
    <div class="item_title">
      <div class="left">
        <span class="name">{{itemData.name}}</span>
        <span :class="['sell_type', {active: itemData.sell_type===2&&itemData.status!==7}, {gray: itemData.status===7}]">{{(itemData.sell_type===2&&itemData.status!==7&&'转售')||str[itemData.status]}}</span>
        <span class="coin_sign" v-if="itemData.hashtype">{{itemData.hashtype.name}}</span>
      </div>
      <div class="right">
        剩余{{remain}}台
      </div>
    </div>
    <div class="item_info">
      <div class="info">
        <span class="price"><b>{{itemData.hash_income}}</b>元</span>
        <span class="info_name">预计每日收益</span>
      </div>
      <div class="info">
        <span>{{itemData.one_amount_value}}元</span>
        <span class="info_name">每台价格</span>
      </div>
      <div class="info">
        <span>{{itemData.hash}}T</span>
        <span class="info_name">每台算力</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import api from '@/util/function'
  export default {
    props: {
      itemData: {
        type: Object
      }
    },
    data () {
      return {
        str: {4: '预热', 5: '热销', 7: '已售馨', 10: '活动'},
        percent: ''
      }
    },
    methods: {
      goDetail (id, type) {
        api.goPage(id, type, this)
      }
    },
    computed: {
      remain: function() {
        return this.itemData.amount - this.itemData.buyed_amount < 0 ? 0 : this.itemData.amount - this.itemData.buyed_amount
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mobile_cloud_miner_item {
    background: $white;
    padding: 0 0.3rem;
    position: relative;
    border-top:1px solid $border;
    border-bottom:1px solid $border;

    .item_title {
      padding: 0.24rem 0 0.18rem;
      @include flex(space-between,center)
      border-bottom: solid 1px #e5e5e5;

      .left {
        .name {
          margin-right: 0.2rem;
          font-size: 0.3rem;
          font-weight: bold;
          color: #333;
        }
        .coin_sign, .sell_type {
          border: solid 1px #327fff;
          border-radius: 5px;
          color: #327fff;
          padding: 0 0.18rem;
          font-size: 0.22rem;
        }

        .sell_type {
          color: #fff;
          margin-right: 0.2rem;
          background: #ff721f;
          border: solid 1px #ff721f;
          &.gray {
            background: $border;
            border-color:$border;
          }
        }
      }
      .right {
        color: #666;
        font-size: 0.28rem;
      }
    }

    .item_info {
      @include flex(space-between,center)
      padding: 0.4rem 0;

      .info {
        @include flex(center,centet,column)
        .price {
          color: #ff721f;
          b {
            font-size: 0.48rem;
          }
        }
        .info_name {
          color: #999;
          font-size: 0.26rem;
        }
        :first-child {
          height: 0.62rem;
          line-height: 0.62rem;
        }
      }
    }

  }
</style>
