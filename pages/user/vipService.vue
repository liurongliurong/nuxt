<template>
  <section class="vip_service">
    <div class="vcurrency_title">
      <span class="text_title">币详情</span>
      <div class="title_content">
        <span class="title_now">{{nowEdit}}</span>
        <div class="title_list">
          <a href="javascript:;" @click="fetchData(n)" v-for="n,k in hashType">{{n}}</a>
        </div>
      </div>
    </div>
    <h3>购买详情</h3>
    <div class="detail_table">
      <table>
        <thead>
          <tr>
            <th v-for="n in nav">{{n}}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in list[nowEdit]">
            <template v-for="v,k in nav">
              <td v-if="k === 'price' || k === 'total'">￥{{l[k]|currency}}</td>
              <td v-else>{{l[k]}}</td>
            </template>
            <td><a :href="'https://www.baoquan.com'+l.baoquan" target="_brank">查看保全</a></td>
          </tr>
          <tr>
            <td>{{hashType[nowEdit]}}合计</td>
            <td>{{list[nowEdit+'Num']}}</td>
            <td></td>
            <td>￥{{list[nowEdit+'Total']|currency}}</td>
            <td></td>
          </tr>
          <tr class="total_table">
            <td colspan="2"></td>
            <td>总计购买</td>
            <td>￥{{list.total|currency}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import data from '@/service/vipData'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        hashType: ['BTC', 'ETH'],
        nowEdit: 'BTC',
        nav: {date: '日期', num: '数量', price: '单价', total: '总价'},
        list: data,
      }
    },
    methods: {
      fetchData (sort) {
        this.nowEdit = sort || 'BTC'
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    filters: {
      currency: api.currency
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .vip_service{
    padding:0 15px;
    .vcurrency_title{
      padding:15px;
      @include select_list
      border-bottom:1px solid $border
    }
    .detail_table{
      @include data_table
      .total_table {
        background: #f0f7fd;
        border-bottom: none
      }
    }
  }
</style>
