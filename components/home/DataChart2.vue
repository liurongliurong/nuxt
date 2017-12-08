<template>
  <div class="myChart2"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  export default {
    data () {
      return {
        data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
        yMax: 500,
        dataShadow: []
      }
    },
    methods: {
      getdays (year, month) {
        var days = []
        if ((year % 100 !== 100 && year % 4 === 0) || (year % 400 === 100)) {
          days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          return days[month]
        } else {
          days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          return days[month]
        }
      },
      drawMap (chart, v) {
        var dataAxis = []
        var y1 = new Date().getFullYear()
        var d1 = new Date().getDate()
        var m1 = new Date().getMonth()
        var l = 20 - d1
        var days = this.getdays(y1, m1 - 1)
        for (var j = d1; j > 0; j--) {
          dataAxis.unshift(m1 + 1 + '-' + j)
        }
        if (l > 0) {
          for (var n = days, z = 0; z < l; n--, z++) {
            dataAxis.unshift(m1 + '-' + n)
          }
        }
        for (var i = 0; i < this.data.length; i++) {
          this.dataShadow.push(this.yMax)
        }
        var myChart = echarts.init(document.querySelector('.myChart2'))
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            data: dataAxis,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: this.dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: this.data
            }
          ]
        })
      }
    },
    mounted () {
      this.drawMap()
    }
  }
</script>

<style type="text/css" lang="scss">
  .myChart2{
    width:100%;
    height:600px;
    .anchorBL{
      display: none;
    }
  }
</style>