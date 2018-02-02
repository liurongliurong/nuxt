<template>
  <pageFrame>
    <div class="compute_chart right_content">
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
  import util from '@/util'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/tooltip'
  import pageFrame from '@/components/common/PageFrame'
  export default {
    components: {
      pageFrame
    },
    data () {
      return {
        data1: [],
        data2: []
      }
    },
    methods: {
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
      util.post('showMiningPoolData', {token: 0}).then((data) => {
        data.msg.data.diff_history.slice(0, 250).forEach((v, k) => {
          this.data1.push({name: v._id, value: [v.timestamp, v.difficulty]})
          this.data2.push({name: v._id, value: [v.timestamp, v.avg_network_hashrate[0], v.avg_network_hashrate[1]]})
        })
        this.initChart('.myChart', this.data1, '算力困难度历史曲线')
        this.initChart('.myChart2', this.data2, '全网算力历史曲线')
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .compute_chart{
    padding:0 !important;
    background:rgba(27, 27, 27, 0.2);
    .chart_show{
      top:100%;
      bottom:auto;
      background: #2e2e3d;
      z-index: 3;
      .chart_main{
        .myChart,.myChart2{
          width:100%;
          height:450px;
          padding-top:20px;
        }
      }
    }
  }
</style>