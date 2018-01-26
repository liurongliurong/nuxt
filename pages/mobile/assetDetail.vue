<template>
  <div class="asset_detail">
    <div class="form_title">
      <span class="name">{{title.name}}</span>
      <span class="coin">+{{title.coin}}</span>
      <span class="money">≈{{title.money}}</span>
    </div>
    <div class="form_none"></div>
    <div class="form_content">
      <section v-for="item in formData" class="form_item">
        <span class="name">{{item.name}}</span>
        <span class="value">{{item.value}}</span>
      </section>
    </div>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'assetDetail',
    data () {
      return {
        title: {
          name: '元旦乐1号-10T收益',
          coin: '0.0000123BTC',
          money: '40元'
        },
        formData: [
          {name: '类型', value: 'BTC', suanLi: '1T'},
          {name: '原始收益', value: '1BTC', suanLi: '1T'},
          {name: '电费', value: '1BTC', suanLi: '1T'},
          {name: '托管费', value: '1BTC', suanLi: '1T'},
          {name: '收益发放时间', value: '1BTC', suanLi: '1T'},
          {name: '已运行时长', value: '1天', suanLi: '1T'}
        ]
      }
    },
    methods: {
    },
    mounted () {
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .asset_detail {
    width: 100%;
    font-size: 0.3rem;
    padding-top: 0;
    .form_title {
      @include flex(center, center, column);
      padding: 1rem 0 0.45rem;
      color: #fff;
      font-size: 0.3rem;
      background: #327fff;
      .coin {
        margin: 0.48rem 0 0;
        font-size: 0.56rem;
        font-weight: bold;
      }
      .money {
        color: #c1d7ff;
      }
    }
    .form_none {
      height: 0.2rem;
      background: #f5f5f9;
    }
    .form_content {
      padding: 0 0.3rem;
      .form_item {
        @include flex(space-between, center);
        height: 1rem;
        border-bottom: solid 1px #e5e5e5;
        .name {
          color: #999;
        }
        .count{
          color: #333;
        }
      }
    }
  }
</style>
