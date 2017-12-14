<template>
  <div class="currency">
    <div class="compute_news_nav">
      <div class="compute_news_box">
        <router-link :to="n.path" v-for="n, k in computationallist" :class="{'active': k === 3}" :key="k">{{n.title}}</router-link>
      </div>
    </div>
    <div class="currency_content">
      <div class="cominfor_type">
        <h4>
            <p class="title">挖矿币种</p>
            <p class="text">虚拟数字货币百科</p>
        </h4>
        <table border="0"  class="covertable" style="margin:0;">
            <thead>
            <tr style="background:white;">
                <th v-for="n, k in tr">{{n.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="d, m in td">
                <td><span>{{d.name}}</span> - {{d.chinese_name}}</td>
                <td>¥ {{d.price}}</td>
                <td>¥ {{(d.market_cap_usd / 100000000).toFixed(2)}}</td>
                <td>{{d.qwsl}} <span>{{d.unit}}</span></td>
                <td>{{d.output}}</td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div class="currency_bottom">
        <h1 style="position:relative;">主流币种资料<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
        <div class="currency_toplist">
        <div @click="goDetail(n.id)" class="toplist" v-for="n, k in toplists" :key="k">
            <img :src="n.icon"/>
            <span>{{n.coin_name}}</span>
        </div>
        </div>
        <h1 style="position:relative;" class="bottomlist">各类代币资料<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
        <div class="currency_toplist">
        <div @click="goDetail(n.id)" class="toplist" v-for="n, k in bottomlists" :key="k">
            <img :src="n.icon"/>
            <span>{{n.coin_name}}</span>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import util from '@/util/index'
import api from '@/util/function'
export default {
  data () {
    return {
      toplists: [{unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}, {unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}],
      bottomlists: [{unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}, {unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}],
      td: '',
      tr: [{title: '币种'}, {title: '价格(元)'}, {title: '流通市值（亿/元）'}, {title: '全网算力'}, {title: '单位挖矿产出'}],
      computationallist: [{title: '算力资讯', path: '/industryInformation'}, {title: '设备之家', path: '/equipments/list'}, {title: '交易信息', path: '/transaction'}, {title: '挖矿币种', path: '/Currency'}]
      // , {title: '电场矿场', path: '/computational/electric'}
    }
  },
  head () {
      return {
        title: '比特币-数字货币-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '数字货币,比特币,莱特币,以太币,数字货币查询' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）列举了常见的数字货币，如比特币，莱特币，以太币等主流币种，以及各类代币如DASH、ZCash、EOS等。' }
        ]
      }
    },
    methods: {
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/digitalCurrency/detail/'})
      }
    },    
  mounted () {
    var self = this
    util.post('showCoinInfo', {sign: api.serialize({token: 0})}).then(function (res) {
      api.checkAjax(self, res, () => {
        self.toplists = res.main_coin
        self.bottomlists = res.other_coin
      })
    }).catch(res => {
      console.log(res)
    })
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

<style lang="scss" scoped>
  .currency{
    background: #eceff8;
    width: 100%;
    overflow: hidden;
    .compute_news_nav{
      width: 100%;
      height: 50px;
      background: white;
    border-top: 1px solid #e5e5e5;
      .compute_news_box{
        width: 1180px;
        margin:0 auto;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        a{
          display:inline-block;
          width: 64px;
          height: 50px;
          box-sizing: border-box;
          text-align: center;
          margin-right: 34px;
          color: #666666;
          font-size: 14px;
          border-top: 2px solid white;
          &:hover{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
          &.active{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
          &.router-link-active{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
        }
      }
    }
    .currency_content{
        background: url('~assets/images/information.png');
        background-size: 100% 100%;
        width: 100%;
        padding-top: 30px;
        box-sizing: border-box;
        height: 540px;
        .cominfor_type{
            width: 1180px;
            overflow: hidden;
            margin: 0 auto;
            background: white;
            padding:20px 45px 0px 45px;
            margin-bottom: 25px;
            padding-bottom: 58px;
            // background-image: url('../../assets/images/table.png');
            background-size: 100% 100%;
            h4{
                width: 100%;
                overflow: hidden;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e5e5;
                margin-bottom: 0px;
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
                    padding-left: 80px;
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
    }
    .currency_bottom{
        width: 1180px;
        overflow: hidden;
        margin:0 auto;
        background: white;
        padding: 0 62px;
        padding-top: 40px;
        box-sizing: border-box;
        padding-bottom: 192px;
        margin-bottom: 60px;
        margin-top: 20px;
      h1{
            color: #121212;
            font-size: 24px;
            font-weight: 800;
            span{
                font-size: 20px;
                margin-left: 13px;
            }
            }
            .bottomlist{
                margin-top: 58px;
            }
            .currency_toplist{
            width: 100%;
            margin-top: 30px;
            overflow: hidden;
            .toplist{
                width: 240px;
                height: 45px;
                border:1px solid #bfbfbf;
                float: left;
                display:block;
                margin-right: 24px;
                margin-bottom: 17px;
                cursor: pointer;
                img{
                width:25px;
                margin-top: 6px;
                margin-left: 20px;
                position: relative;
                top:-10px;
                }
                span{
                margin-left: 20px;
                line-height: 45px;
                font-size: 14px;
                color: #333333;
                }
            }
            }
        }
  }
</style>
