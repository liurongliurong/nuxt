<template>
  <div class="calculator">
    <h2>挖矿计算器</h2>
     <form @submit.prevent="submit">
      <div class="fromone">
        <label>币种</label>
        <select id="select" @change="changeon">
          <option v-for="n, k in option">{{n.name}}</option>
        </select>
      </div>
      <div class="fromone">
        <label>单台矿机价格</label>
        <input type="text" value="IndividualMillPrice"  class="cover" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')"  id="input1" v-model="IndividualMillPrice"/>
        <span class="biao block1">请输入单台矿机价格</span>
      </div>
      <div class="fromone">
        <label>矿机数量</label>
        <input type="text" value="MillNumber" class="cover"  onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" id="input2" v-model="MillNumber"/>
        <span class="biao block2">请输入单台矿机价格</span>
      </div>
      <div class="fromone">
        <label>矿机算力</label>
        <div class="rightblock">
            <input type="text" value="MillWorkforce" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" id="input3" v-model="MillWorkforce"/>
            <span>TH/S</span>
        </div>
        <span class="biao block3">请输入单台矿机价格</span>
      </div>
      <div class="fromone">
        <label>矿机功耗</label>
        <div class="rightblock">
            <input type="text" value="MillPower" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" id="input4" v-model="MillPower"/>
            <span>W</span>
        </div>
        <span class="biao block4">请输入单台矿机价格</span>
      </div>
      <div class="fromone">
        <label>每T功耗</label>
        <span class="tespan">{{(MillPower/MillWorkforce)?((MillPower/MillWorkforce).toFixed(1)): '0'}} W/T</span>
      </div>
      <div class="fromone">
        <label>每T价格</label>
        <span class="tespan">¥ {{(IndividualMillPrice/MillNumber)?(IndividualMillPrice/MillNumber): '0'}} /T</span>
      </div>
      <div class="fromone">
        <label>全网算力</label>
        <span class="tespan">{{difficulty}} PH/S</span>
      </div>
      <div class="fromone">
        <label>每天每T收益</label>
        <div class="rightblock">
          <input type="text" value="message8" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" id="input8" v-model="message8"/>
          <span>BTC</span>
        </div>
      </div>
      <div class="fromone">
        <label>电费</label>
        <div class="rightblock">
            <input type="text" value="ElectricCharge" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" id="input5" v-model="ElectricCharge"/>
            <span>¥/KWh</span>
        </div>
        <span class="biao block5">请输入单台矿机价格</span>
      </div>
      <div class="fromone">
        <label>币价</label>
        <div class="rightblock">
            <input type="text" :value="CoinPrice" class="cover cover1" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" id="input6" v-model="CoinPrice"/>
            <span>¥/BTC</span>
        </div>
        <span class="biao block6">请输入单台矿机价格</span>
      </div>
      <!-- <div class="fromone">
        <label>起始难度</label>
        <input type="text" value="message7" class="cover" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" onblur="this.value=this.value.replace(/[^\d\.]/g,'')" id="input7" v-model="message7"/>
        <span class="biao block7">请输入单台矿机价格</span>
      </div> -->
      <div class="fromone">
        <label>开始时间</label>
        <input type="datetime-local" :value="timedays" class="cover el-range-input" name="timestart"/>
      </div>
      <div class="fromone">
        <label>结束时间</label>
        <input type="datetime-local" :value="timedays1" class="cover el-range-input" name="timeend" :min="timedays"/>
      </div>
      <button class="button" name="btn">计算</button>
    </form>
      <h2>预期利润概览</h2>
      <div class="total">
        <p>
          <span class="p_left">总利润</span>
          <span class="p_right">{{typebi}} {{(((message8 * CoinPrice * MillWorkforce) * timeall) - ((MillPower / 1000) * 24 * ElectricCharge * MillNumber * timeall)).toFixed(2)}}</span>
        </p>
        <p>
          <span class="p_left">总收入</span>
          <span class="p_right">{{typebi}} {{((message8 * CoinPrice * MillWorkforce) * timeall).toFixed(2)}}</span>
        </p>
        <p>
          <span class="p_left">总电费</span>
          <span class="p_right">{{typebi}} {{((MillPower / 1000) * 24 * ElectricCharge * MillNumber * timeall).toFixed(2)}}</span>
        </p>
        <p>
          <span class="p_left">总矿机成本</span>
          <span class="p_right">{{typebi}} {{IndividualMillPrice * MillNumber}}</span>
        </p>
        <p>
          <span class="p_left">每T价格</span>
          <span class="p_right">{{typebi}} {{(IndividualMillPrice / MillWorkforce).toFixed(2)}}</span>
        </p>
        <p>
          <span class="p_left">投资回报率</span>
          <span class="p_right">{{(((message8 * CoinPrice * MillWorkforce) * timeall) / ((IndividualMillPrice * MillNumber) + (((MillPower / 1000) * 24 * ElectricCharge * MillNumber * timeall)))).toFixed(2)}} %</span>
        </p>
        <p>
          <span class="p_left">当前每日收入</span>
          <span class="p_right">{{typebi}} {{(message8 * CoinPrice * MillWorkforce).toFixed(2)}}</span>
        </p>
        <p>
          <span class="p_left">当前每日电费</span>
          <span class="p_right">{{typebi}} {{((MillPower / 1000) * 24 * ElectricCharge * MillNumber).toFixed(2)}}</span>
        </p>
        <p>
          <span class="p_left">当前每日利润</span>
          <span class="p_right">{{typebi}} {{((message8 * CoinPrice * MillWorkforce) - ((MillPower / 1000) * 24 * ElectricCharge * MillNumber)).toFixed(2)}}</span>
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
        IndividualMillPrice: '10000',
        MillNumber: '1',
        MillWorkforce: '9',
        MillPower: '1300',
        ElectricCharge: '0.32',
        CoinPrice: '',
        message7: '0.33',
        message8: '0',
        typebi: '¥',
        difficulty: '0',
        totallist: [{title: '总利润', prev: '¥'}, {title: '总收入', prev: '¥'}, {title: '总电费', prev: '¥'}, {title: '总矿机成本', prev: '¥'}, {title: '每T价格', prev: '¥'}, {title: '投资回报率', next: '%'}, {title: '当前每日收入', prev: '¥'}, {title: '当前每日电费', prev: '¥'}, {title: '当前每日利润', prev: '¥'}],
        option: [{name: 'CNY - ¥'}, {name: 'USD - $'}],
        timeall: '1',
        flag: false,
        oldStart: '',
        oldEnd: ''
      }
    },
    methods: {
      changeon (e) {
        var select = document.getElementById('select').value
        if (select === 'CNY - ¥') {
          this.typebi = '¥'
        } else {
          this.typebi = '$'
        }
        var time = document.getElementsByClassName('el-range-input')[0].value
        var time1 = document.getElementsByClassName('el-range-input')[1].value
        var d1 = new Date(time)
        var d2 = new Date(time1)
        this.timeall = Math.floor((parseInt(d2 - d1)) / (24 * 3600 * 1000))
      },
      submit (e) {
        this.flag = true
        var form = e.target
        this.oldStart = form.timestart.value
        this.oldEnd = form.timeend.value
        var d1 = new Date(this.oldStart)
        var d2 = new Date(this.oldEnd)
        this.timeall = Math.floor((parseInt(d2 - d1)) / (24 * 3600 * 1000))
      },
      getTimeDays (addDay) {
        addDay = addDay || 0
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        month = (month.length === 1) && ('0' + month) || month
        var day = date.getDate() + addDay
        day = (day.length === 1) && ('0' + day) || day
        var hour = date.getHours()
        hour = (hour.length === 1) && ('0' + hour) || hour
        var minute = date.getMinutes()
        if (minute.length === 1) {
          minute = '0' + minute
        } else {
          minute = '' + minute
        }
        var second = date.getSeconds()
        if (second.length === 1) {
          second = '0' + second
        } else {
          second = '' + second
        }
        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute
      }
    },
    mounted () {
      var self = this
      util.post('showCoinData', {sign: api.serialize({token: 0})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.CoinPrice = res[0].price
          self.message8 = res[0].output.split(' ')[0]
        })
      }).catch(res => {
        console.log(res)
      })
      util.post('showDifficulty', {sign: api.serialize({token: 0})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.difficulty = (res.difficulty.replace(/,/g, '') * 7.158 * 0.001 / 1000000).toFixed(0)
          self.message8 = ((1000 / self.difficulty * 7.158 * 0.001) * 1800).toFixed(5)
        })
      }).catch(res => {
        console.log(res)
      })
      var time = document.getElementsByClassName('el-range-input')[0].value
      var time1 = document.getElementsByClassName('el-range-input')[1].value
      var d1 = new Date(time)
      var d2 = new Date(time1)
      this.timeall = Math.floor((parseInt(d2 - d1)) / (24 * 3600 * 1000))
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      }),
      timedays: function () {
        if (!this.flag) {
          return this.getTimeDays()
        }
        return this.oldStart
      },
      timedays1: function () {
        if (!this.flag) {
          return this.getTimeDays(1)
        }
        return this.oldEnd
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
