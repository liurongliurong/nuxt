<template>
  <pageFrame isComponent="true">
    <div class="chart currency_right">
      <!-- <div class="text">
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
      </div> -->
      <div class="chart_show">
        <div class="chart_main">
          <div class="myChart"></div>
          <div class="myChart2"></div>
        </div>
      </div>
    </div>
  </pageFrame>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import pageFrame from '@/components/computeNews/pageFrame'
  export default {
    components: {
      pageFrame
    },
    data () {
      return {
        info: {btc_price: 0, hashrate: 0, leavetime: 0, difficulty: 1103400932964},
        coin: [{title: 'BTC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'BCC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'ETH', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'ETC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}, {title: 'LTC', value: '1571.18 PH/s', address: ['stratum+tcp://stratum.suanli.com:3333', 'stratum+tcp://stratum.suanli.com:443', 'stratum+tcp://stratum.suanli.com:25'], data: {'总幸运': '100%', '全网难度': 1103400932964, 'Block总数': 29447, '有效矿工数': 163721}}],
        data1: [],
        data2: [],
        no: 0
      }
    },
    methods: {
      drawLine () {
        // myChart.setOption({
        //   series: [{
        //     data: data
        //   }]
        // })
      },
      selectCoin (e) {
        this.no = e.target.title
        // this.drawLine()
      },
      initChart (ele, data, title) {
        let myChart = echarts.init(document.querySelector(ele))
        myChart.setOption({
          color: '#fff',
          title: {
            text: title,
            textStyle: {
              color: '#fff',
              align: 'right'
            },
            left: 20
          },
          grid: {
            show: true,
            borderColor: '#3c3c49',
            bottom: 80,
            left: 130
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0]
              return params.value[0] + ' : ' + params.value[1] + (params.value[2] || '')
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
            data: data,
            lineStyle: {
              normal: {
                color: '#518abb'
              }
            }
          }]
        })
      }
    },
    mounted () {
      var self = this
      util.post('showMiningPoolData', {sign: 'token=0'}).then(function (data) {
        data.data.diff_history.slice(0, 70).forEach((v, k) => {
          self.data1.push({name: v._id, value: [v.timestamp, v.difficulty]})
          self.data2.push({name: v._id, value: [v.timestamp, v.avg_network_hashrate[0], v.avg_network_hashrate[1]]})
        })
        self.initChart('.myChart', self.data1, '算力困难度历史曲线')
        self.initChart('.myChart2', self.data2, '全网算力历史曲线')
      })
    },
    filters: {
      format: api.readable
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .chart{
    // @include position(726)
    // bottom:auto;
    // height:60px;
    padding:0 !important;
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
        }
        .other{
          @include position
          display: none;
          z-index: 4;
          transition: all 1s;
          .item{
            background:#232428;
            &:hover,&.active{
              background:#44444f
            }
          }
        }
        .now,.other .item{
          @include flex(space-between)
          @include gap(10,h)
          cursor: pointer;
          .text{
            width:75%;
            padding-left:10px
          }
          .arrow{
            @include position(25,auto,auto,15)
            @include triangle(bottom)
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
      top:100%;
      bottom:auto;
      background: #2e2e3d;
      z-index: 3;
      .chart_main{
        .myChart{
          width:100%;
          height:420px;
          padding-top:20px;
        }
        .myChart2{
          width:100%;
          height:420px;
          padding-top:20px;
        }
      }
    }
    &:hover .chart_show{
      display: block;
    }
  }
</style>