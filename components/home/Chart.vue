<template>
  <div class="chart">
    <div class="text">
      <div class="select_coin">
        <div class="now">
          <div :class="'icon_currency '+coin[no].title"></div>
          <span class="text" title="0">{{coin[no].title}}</span>
          <span class="arrow"></span>
        </div>
        <div class="other">
          <div :class="['item', {active: k==no}]" v-for="c,k in coin">
            <div :class="'icon_currency '+coin[k].title"></div>
            <span class="text" @click="selectCoin" :title="k">{{coin[k].title}}</span>
            <span class="arrow" v-if="k===0"></span>
          </div>
        </div>
      </div>
      <div>全网算力：{{info.hashrate}}P</div>
      <div>比特币价格：1btc=${{info.btc_price}} (okcoin提供)</div>
      <div>难度调整时间：{{parseInt(info.leavetime/24)}}天{{info.leavetime%24}}小时</div>
      <div>困难度：{{info.difficulty}}</div>
    </div>
    <div class="chart_show">
      <div class="chart_main">
        <div class="myChart"></div>
        <div class="myText">
          <h1>
            <span>{{coin[no].title}}</span>
            <span>{{coin[no].value}}</span>
          </h1>
          <div class="address">
            <p>挖矿服务地址：</p>
            <p v-for="a in coin[no].address">{{a}}</p>
          </div>
          <div class="data">
            <div class="item" v-for="d,k in coin[no].data">
              <span>{{k}}</span>
              <span>{{d}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../util/function'
  import util from '../../util'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  export default {
    name: 'chart',
    data () {
      return {
        info: {btc_price: 0, hashrate: 0, leavetime: 0, difficulty: 1103400932964},
        coin: [{title: 'BTC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'BCC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'ETH', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'ETC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'LTC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}],
        no: 0
      }
    },
    methods: {
      drawLine () {
        let myChart = echarts.init(document.querySelector('.myChart'))
        var now = +new Date(2010, 9, 3)
        var oneDay = 24 * 3600 * 1000
        var value = Math.random() * 1000
        function randomData () {
          now = new Date(+now + oneDay)
          value = value + Math.random() * 21 - 10
          return {
            name: now.toString(),
            value: [
              [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
              Math.round(value)
            ]
          }
        }
        function getData () {
          var data = []
          for (var i = 0; i < 1000; i++) {
            data.push(randomData())
          }
          return data
        }
        myChart.setOption({
          color: '#fff',
          title: {
            text: '动态数据 + 时间坐标轴'
          },
          grid: {
            show: true,
            borderColor: '#3c3c49',
            left: '7%',
            bottom: 80
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0]
              var date = new Date(params.name)
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              lineStyle: {
                color: '#3c3c49'
              }
            },
            axisLabel: {
              color: '#e9e9eb'
            },
            axisTick: {
              length: 0
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              lineStyle: {
                color: '#3c3c49'
              }
            },
            axisLabel: {
              color: '#e9e9eb'
            },
            axisTick: {
              length: 0
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: getData(),
            lineStyle: {
              normal: {
                color: '#518abb'
              }
            }
          }]
        })
        // setInterval(function () {
        //   for (var i = 0; i < 5; i++) {
        //     data.shift()
        //     data.push(randomData())
        //   }
        //   myChart.setOption({
        //     series: [{
        //       data: data
        //     }]
        //   })
        // }, 1000)
      },
      selectCoin (e) {
        this.no = e.target.title
        this.drawLine()
      }
    },
    mounted () {
      this.drawLine()
      var self = this
      util.post('showCoinData', {token: 0}).then(function (data) {
        self.info = data
      })
    },
    filters: {
      format: api.readable
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .chart{
    @include position(490)
    bottom:auto;
    height:60px;
    background:rgba(27, 27, 27, 0.2);
    .text{
      @include main
      @include flex(space-between)
      color:$white;
      line-height:60px;
      font-size: 16px;
      .select_coin{
        position: relative;
        .now{
          position: relative;
          width:140px;
          @include flex
          @include gap(10,h)
          cursor: pointer;
          .text{
            flex:1;
            padding-left:10px
          }
          .arrow{
            @include triangle(bottom)
          }
        }
        .other{
          @include position
          display: none;
          z-index: 4;
          transition: all 1s;
          .item{
            @include flex
            @include gap(10,h)
            cursor: pointer;
            background:#232428;
            .text{
              flex:1;
              padding-left:10px
            }
            &:hover,&.active{
              background:#44444f
            }
            .arrow{
              @include triangle(bottom)
            }
          }
        }
        &:hover{
          .now{
            background:#232428;
            &:hover{
              background:#44444f
            }
          }
          .other{
            display: block;
          }
        }
      }
    }
    .chart_show{
      @include position()
      top:100%;
      bottom:auto;
      background: #2e2e3d;
      z-index: 3;
      display: none;
      .chart_main{
        @include main
        @include flex
        .myChart{
          width:640px;
          height:400px;
        }
        .myText{
          width:leave(640);
          padding-left:100px;
          color:$white;
          font-size: 16px;
          line-height: 1.6;
          h1{
            @include flex(space-between)
            font-size: 30px;
            font-weight: bold;
            padding-bottom: 10px
          }
          h1,.address{
            border-bottom: 1px solid #59a1d9;
            margin-bottom: 13px
          }
          .address{
            padding-bottom: 30px
          }
          .data{
            .item{
              @include flex(space-between)
            }
          }
        }
      }
    }
    &:hover .chart_show{
      display: block;
    }
  }
</style>