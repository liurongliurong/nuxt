<template>
  <div class="cominfor_type">
    <h4>
    <p class="title">挖矿币种</p>
    <p class="text">虚拟数字货币百科</p>
    <router-link to="/currency" v-if="$route.name === 'industryInformation'">了解更多 ></router-link>
    </h4>
    <table border="0"  class="covertable" style="margin:0; ">
        <thead>
            <tr style="background:white;">
            <th v-for="n, k in tr">{{n.title}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d, m in td">
            <td><span>{{d.name}}</span> - {{d.chinese_name}}</td>
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
  import api from '@/util/function'
  export default {
    data () {
      return {
        td: [],
        tr: [{title: '币种'}, {title: '价格(元)'}, {title: '流通市值（亿/美元）'}, {title: '全网算力'}, {title: '单位挖矿产出'}]
      }
    },
    mounted () {
      var self = this
      util.post('showCoinData', {sign: api.serialize({token: 0})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.td = res
        })
      }).catch(res => {
        console.log(res)
      })
    }
  }
</script>

<style lang="scss">
    .cominfor_type{
        width: 1180px;
        overflow: hidden;
        margin: 0 auto;
        background: white;
        box-shadow: #d2d4db 0 0 20px;
        padding:30px 44px 0px 44px;
        margin-bottom: 25px;
        padding-bottom: 58px;
        background-image: url('~assets/images/table.jpg');
        background-size: 100% 100%;
        h4{
            width: 100%;
            overflow: hidden;
            padding-bottom: 18px;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 20px;
            .title{
                font-size: 24px;
                color: #333333;
                font-weight: 800;
                display: inline;
            }
            .text{
                font-size: 12px;
                color: #808080;
                margin-left: 22px;
                display: inline;
            }
            a{
                float: right;
                color:#327fff;
                font-size: 16px;
            }
        }
        .covertable{
            text-align: center;
            width: 100%;
            thead{
                tr{
                  padding-bottom:24px;
                  border-bottom: 1px solid #dcdcdc;
                  th{
                      color: #333;
                      height: 40px;
                      padding-left: 30px;
                      text-align: left;
                      width: 20%;
                  }
                  :nth-child(2){
                    padding-left: 5px;
                  }
                  :nth-child(3){
                    padding-left: 0px;
                  }
                  :nth-child(5){
                    padding-left: 60px;
                  }
                }
            }
            tbody{
                tr{
                    height: 55px;
                    line-height: 55px;
                    border-bottom: 1px solid #e5e5e5;
                    &:first-child{
                       margin-top: 20px;
                    }
                    td{
                        text-align: left;
                        // padding-left: 50px;
                        box-sizing: border-box;
                        span{
                            color: #fe5039;
                            font-weight: 800;
                        }
                    }
                    :nth-child(3){
                      padding-left: 15px;
                    }
                    :nth-child(5){
                      text-align: right;
                    }
                }
            }
        }
    }
</style>

