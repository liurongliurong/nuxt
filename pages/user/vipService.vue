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
            <td v-for="v,k in nav">{{l[k]}}</td>
            <td><a href="">查看保全</a></td>
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
    }
  }
</style>
