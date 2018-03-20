<template>
  <div class="currency_list">
    <h4>
      <span class="title">主流币种</span>
      <span class="text">虚拟数字货币百科</span>
      <router-link to="/currency/list" v-if="$route.name === 'industryInformation'">了解更多 ></router-link>
    </h4>
    <table>
      <thead>
        <tr>
          <th v-for="n, k in nav">{{n}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d, m in lists">
          <td class="currency_name"><span>{{d.name}}</span></td>
          <td>¥ {{d.price}}</td>
          <td>$ {{(d.market_cap_usd / 100000000).toFixed(2)}}</td>
          <td>{{d.qwsl}} <span>{{d.unit}}</span></td>
          <td>{{d.output}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import util from '@/util/index'
  export default {
    data () {
      return {
        lists: [],
        nav: ['币种', '价格(元)', '流通市值（亿/美元）', '全网算力', '单位收益产出']
      }
    },
    mounted () {
      util.post('showCoinData', {token: 0}).then((res) => {
        this.lists = res.msg
      })
    }
  }
</script>

<style lang="scss">
  .currency_list{
    width: 1180px;
    margin: 0 auto;
    box-shadow: #d2d4db 0 0 20px;
    padding:30px 44px 58px;
    margin-bottom: 25px;
    background: url('~assets/images/table.jpg');
    background-size: 100% 100%;
    h4{
      padding-bottom: 18px;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      .title{
        font-size: 24px;
        color: #333333;
        font-weight: 800;
      }
      .text{
        font-size: 12px;
        color: #808080;
        margin-left: 22px;
      }
      a{
        float: right;
        color:#327fff;
        font-size: 16px;
      }
    }
    table {
      text-align: center;
      width: 100%;
      tr {
        border-bottom: 1px solid #dcdcdc;
      }
      thead tr {
        th{
          color: #333;
          height: 40px;
          width: 20%;
        }
        :nth-child(1){
          width: 10%;
        }
      }
      tbody tr{
        height: 55px;
        line-height: 55px;
        td{
          span{
            color: #fe5039;
            font-weight: 800;
          }
        }
        :nth-child(5){
          text-align: right;
        }
      }
    }
  }
</style>
