<template>
  <section class="income_chart">
    <h2>收益图表</h2>
    <div class="myChart"></div>
    <div class="chart_btn">
      <router-link class="back" to="/user/computeProperty">返回</router-link>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import { mapState } from 'vuex'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  // import 'echarts/lib/component/legend'
  export default {
    data () {
      return {
        val: [],
        date: []
      }
    },
    methods: {
      drawLine () {
        let myChart = echarts.init(document.querySelector('.myChart'))
        // var now = +new Date(2017, 8, 30)
        // var oneDay = 24 * 3600 * 1000
        // for (var i = 0; i < 10; i++) {
        //   now = new Date(+now + oneDay)
        //   this.date.push([now.getMonth() + 1, now.getDate()].join('-'))
        //   this.val.push(Math.round(Math.random() * 5) / 10000)
        // }
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              // params = params[0]
              return '日期 ： ' + params[0].name + '<br/>收益 ：' + params[0].data + ' btc'
            }
          },
          // legend: {
          //   right: 10,
          //   data: ['获得收益'],
          //   top: 20
          // },
          title: {
            text: '',
            top: 20
          },
          grid: {
            show: true,
            borderColor: '#eee',
            left: '20%',
            top: '20%'
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              color: '#333',
              margin: 15
            },
            axisTick: {
              length: 0
            },
            axisLine: {
              lineStyle: {
                color: '#327fff'
              }
            },
            data: this.date
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            },
            axisLabel: {
              color: '#333',
              margin: 15
            },
            axisTick: {
              length: 0
            },
            axisLine: {
              lineStyle: {
                color: '#327fff'
              }
            }
          },
          series: [{
            name: '获得收益',
            type: 'line',
            showSymbol: true,
            hoverAnimation: true,
            data: this.val,
            lineStyle: {
              normal: {
                color: '#ff721f'
              }
            }
          }]
        })
      },
      getData () {
        if (this.token !== 0) {
          fetchApiData(this, 'showIncome', {token: this.token, product_hash_type: 1}, (res) => {
            this.date = res.time
            this.val = res.income
            this.drawLine()
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .income_chart{
    padding:0 15px;
    h2{
      padding:0 15px !important;
      @include mobile_hide
    }
    .myChart{
      width:100%;
      height:400px;
    }
    .chart_btn{
      text-align: center;
      @include mobile_hide
      .back{
        width:100px;
        display: inline-block;
        @include button($blue)
        line-height: 2;
        margin-top: 20px;
      }
    }
    @media screen and (max-width: $mobile) {
      padding:0;
    }
  }
</style>
