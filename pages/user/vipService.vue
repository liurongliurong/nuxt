<template>
  <section class="vip_service">
    <div class="vcurrency_title">
      <span class="text_title">币详情</span>
      <div class="title_content">
        <span class="title_now">{{hashType[nowEdit]}}</span>
        <div class="title_list">
          <a href="javascript:;" @click="fetchData(k)" v-for="n,k in hashType">{{n}}</a>
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
          <tr v-for="l in list[hashType[nowEdit]]">
            <template v-for="v,k in nav">
              <td v-if="k === 'price' || k === 'total'">￥{{l[k]}}</td>
              <td v-else>{{l[k]}}</td>
            </template>
            <td><a :href="l.baoquan" target="_brank">查看保全</a></td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>{{hashType[nowEdit]}}购买总计</td>
            <td>￥{{list[hashType[nowEdit]].reduce((total, item) => total + item.total, 0)}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table class="total_table">
        <tbody>
          <tr>
            <td>总计购买</td>
            <td colspan="2">￥{{list.total}}</td>
            <td>账户余额</td>
            <td>￥{{list.left}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import data from '@/service/vipData'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        hashType: ['BTC', 'ETH'],
        nowEdit: 0,
        nav: {date: '日期', num: '数量', price: '单价', total: '总价'},
        list: data,
      }
    },
    methods: {
      fetchData (sort) {
        this.nowEdit = sort || 0
      }
    },
    watch: {
      '$route': 'fetchData'
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
        margin-top: 20px;
        background: #f0f7fd;
        tr {
          border-bottom: none
        }
      }
    }
  }
</style>
