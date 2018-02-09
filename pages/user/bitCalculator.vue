<template>
  <div class="calculator">
    <h2>收益计算器</h2>
    <form @submit.prevent="submit">
      <!-- <div class="fromone">
        <label>币种</label>
        <select id="currency" @change="changeon">
          <option v-for="n, k in option">{{n.name}}</option>
        </select>
      </div> -->
      <div class="fromone" v-for="i,k in inputData1">
        <label>{{params[i].title}}</label>
        <div class="rightblock" v-if="params[i].unit">
          <input type="text" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" v-model="data[i]"/>
          <span>{{params[i].unit}}</span>
        </div>
        <input type="text" class="cover" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" v-model="data[i]" v-else/>
        <span class="biao block1">请输入{{params[i].title}}</span>
      </div>
      <div class="fromone">
        <label>每T功耗</label>
        <span class="tespan">{{data.MillWorkforce<=0?'0':(data.MillPower/data.MillWorkforce).toFixed(2)}} W/T</span>
      </div>
      <div class="fromone">
        <label>每T价格</label>
        <span class="tespan">¥ {{data.MillWorkforce <= 0 ? 0 : (data.IndividualMillPrice / data.MillWorkforce).toFixed(2)}} /T</span>
      </div>
      <div class="fromone">
        <label>全网算力</label>
        <span class="tespan">{{data.difficulty}} PH/S</span>
      </div>
      <div class="fromone" v-for="i,k in inputData2">
        <label>{{params[i].title}}</label>
        <div class="rightblock">
          <input type="text" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" v-model="data[i]"/>
          <span>{{params[i].unit}}</span>
        </div>
      </div>
      <div class="fromone">
        <label>开始时间</label>
        <input type="date" v-model="dateStart" class="cover el-range-input" name="timestart"/>
      </div>
      <div class="fromone">
        <label>结束时间</label>
        <input type="date" v-model="dateEnd" class="cover el-range-input" name="timeend"/>
      </div>
      <button class="button" name="btn">计算</button>
    </form>
    <h2>预期利润概览</h2>
    <div class="total">
      <p>
        <span class="p_left">总利润</span>
        <span class="p_right">￥ {{(((data.TProfit * data.CoinPrice * data.MillWorkforce) * days) - ((data.MillPower / 1000) * 24 * data.ElectricCharge * data.MillNumber * days)).toFixed(2)|format}}</span>
      </p>
      <p>
        <span class="p_left">总收入</span>
        <span class="p_right">￥ {{((data.TProfit * data.CoinPrice * data.MillWorkforce) * days).toFixed(2)}}</span>
      </p>
      <p>
        <span class="p_left">总电费</span>
        <span class="p_right">￥ {{((data.MillPower / 1000) * 24 * data.ElectricCharge * data.MillNumber * days).toFixed(2)}}</span>
      </p>
      <p>
        <span class="p_left">总算力服务器成本</span>
        <span class="p_right">￥ {{data.IndividualMillPrice * data.MillNumber}}</span>
      </p>
      <p>
        <span class="p_left">每T价格</span>
        <span class="p_right">￥ {{data.MillWorkforce <= 0 ? 0 : (data.IndividualMillPrice / data.MillWorkforce).toFixed(2)}}</span>
      </p>
      <p>
        <span class="p_left">投资回报率</span>
        <span class="p_right">{{data.MillNumber <= 0 ? 0 : (((data.TProfit * data.CoinPrice * data.MillWorkforce) * days) / ((data.IndividualMillPrice * data.MillNumber) + (((data.MillPower / 1000) * 24 * data.ElectricCharge * data.MillNumber * days)))).toFixed(2)|format}} %</span>
      </p>
      <p>
        <span class="p_left">当前每日收入</span>
        <span class="p_right">￥ {{(data.TProfit * data.CoinPrice * data.MillWorkforce).toFixed(2)}}</span>
      </p>
      <p>
        <span class="p_left">当前每日电费</span>
        <span class="p_right">￥ {{((data.MillPower / 1000) * 24 * data.ElectricCharge * data.MillNumber).toFixed(2)}}</span>
      </p>
      <p>
        <span class="p_left">当前每日利润</span>
        <span class="p_right">￥ {{((data.TProfit * data.CoinPrice * data.MillWorkforce) - ((data.MillPower / 1000) * 24 * data.ElectricCharge * data.MillNumber)).toFixed(2)|format}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        params: {
          IndividualMillPrice: {title: '单台算力服务器价格', unit: '￥'},
          MillNumber: {title: '算力服务器数量', unit: ''},
          MillWorkforce: {title: '算力服务器算力', unit: 'TH/S'},
          MillPower: {title: '算力服务器功耗', unit: 'W'},
          TPower: {title: '每T功耗', unit: 'W/T'},
          TPrice: {title: '每T价格', unit: '￥/T'},
          ElectricCharge: {title: '电费', unit: '￥/KWh'},
          CoinPrice: {title: '币价', unit: '￥/BTC'},
          Difficulty: {title: '起始难度', unit: ''},
          DifficultyIncrease: {title: '难度增幅', unit: ''},
          EarningsRatio: {title: '收益比', unit: ''},
          Days: {title: '天数', unit: ''},
          MiningDays: {title: '挖矿天数', unit: ''},
          MaxMiningDays: {title: '最多可挖天数', unit: ''},
          TProfit: {title: '每天每T收益', unit: 'BTC'},
          TotalProfit: {title: '总利润', unit: '￥'},
          TotalRevenue: {title: '总收入', unit: '￥'},
          TotalElectricFee: {title: '总电费', unit: '￥'},
          TotalMillPrice: {title: '总成本', unit: '￥'},
          ReturnInvest: {title: '投资回报率', unit: '%'},
          CurrentDailyIncome: {title: '当前每日收入', unit: '￥'},
          CurrentDailyElectricFee: {title: '当前每日电费', unit: '￥'},
          CurrentDailyProfit: {title: '当前每日利润', unit: '￥'},
          BackDays: {title: '回本天数', unit: ''}
        },
        inputData1: ['IndividualMillPrice', 'MillNumber', 'MillWorkforce', 'MillPower'],
        inputData2: ['TProfit', 'ElectricCharge', 'CoinPrice'],
        data: {IndividualMillPrice: '10000', MillNumber: '1', MillWorkforce: 9, MillPower: '1300', TProfit: '', ElectricCharge: '0.32', CoinPrice: ''},
        days: '1',
        dateStart: '',
        dateEnd: ''
      }
    },
    methods: {
      submit (e) {
        this.getDays(this.dateStart, this.dateEnd)
      },
      initDate (addDay) {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate() + addDay
        return year + '-' + api.f(month) + '-' + api.f(day)
      },
      getDays (d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
        this.days = Math.floor((parseInt(d2 - d1)) / (24 * 3600 * 1000))
      }
    },
    mounted () {
      util.post('showCoinData', {token: 0}).then((res) => {
        this.data.CoinPrice = res.msg[0].price
        this.data.TProfit = res.msg[0].output.split(' ')[0]
      })
      util.post('showDifficulty', {token: 0}).then((res) => {
        this.data.difficulty = (res.msg.difficulty.replace(/,/g, '') * 7.158 * 0.001 / 1000000).toFixed(0)
        // this.TProfit = ((1000 / this.difficulty * 7.158 * 0.001) * 1800).toFixed(5)
      })
      this.dateStart = this.initDate(0)
      this.dateEnd = this.initDate(1)
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    },
    filters: {
      format: (n) => {
        return n <= 0 ? 0 : n
      }
    }
  }
</script>

<style lang="scss" scoped>
  .calculator{
    width: 100%;
    overflow: hidden;
    background: white;
    h2{
      width: 100%;
      background: white;
      margin-bottom: 20px;
    }
    .fromone{
      width: 100%;
      overflow: hidden;
      padding: 0 10%;
      box-sizing: border-box;
      margin-bottom: 5px;
      .biao{
        color: red;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
        display:none;
      }
      label{
        width: 143px;
        height: 40px;
        display:inline-block;
        float: left;
        font-size: 14px;
        line-height: 40px;
      }
      select{
        width: 400px;
        height: 40px;
        float: left;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        padding-left: 7px;
      }
      .rightblock{
        width: 400px;
        height: 40px;
        float: left;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        span{
          display:inline-block;
          background:#eee;
          color: #555;
          height: 100%;
          float: right;
          font-size: 14px;
          line-height: 40px;
          padding: 0 5px;
          box-sizing: border-box;
        }
        input{
          float: left;
          height: 100%;
          width: auto;
          box-sizing: border-box;
          padding-left: 10px;
        }
      }
      .cover{
        width: 400px;
        height: 40px;
        float: left;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        padding-left: 10px;
      }
      .cover1{
          border:0;
      }
      .tespan{
        display:inline-block;
        float: left;
        text-align: right;
        width: 400px;
        height: 40px;
        line-height: 40px;
        color: #888;
      }
    }
    button{
      width: 242px;
      height: 44px;
      background: #01bfb5;
      color: white;
      font-size: 16px;
      margin-top: 30px;
      margin-left: 30%;
    }
    .total{
      width: 80%;
      overflow: hidden;
      padding: 0 10%;
      box-sizing: border-box;
      margin-bottom: 5px;
      p{
        width: 40%;
        float: left;
        height: 30px;
        margin-right: 10%;
        margin-bottom: 10px;
        .p_right{
          color:#888;
          float: right;
        }
      }
    }
  }
</style>
