<template>
  <div class="cloud_list">
    <div class="box" v-if="total">
      <h1 class="home_item_title">全方位为你推荐算力服务器</h1>
      <p class="home_item_desc">全球算力输出服务由保全网提供全流程区块链存证、保全服务</p>
      <table>
        <thead>
          <tr>
            <th v-for="n in nav">{{n.title}}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l,i in list1" @click="goPay(l.product_id||l.id, 2)">
            <td v-for="v,k in nav">
              <template v-if="k==='name'"><i class="iconfont">&#xe605;</i>{{l[k]}}</template>
              <template v-else-if="k==='left_num'">{{l.amount-(l.sell_amount||l.buyed_amount)+v.unit}}</template>
              <template v-else>{{l[k]+[v.unit]}}</template>
            </td>
            <td>
              <a class="btn" v-if="l.status===4">预热</a> 
              <a class="btn" v-else-if="l.amount-(l.sell_amount||l.buyed_amount)>0">立即购买</a> 
              <button class="btn" disabled v-else>已售罄</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="get_more" to="/minerShop/miner/2">查看更多云算力 ></router-link>
    </div>
    <div class="box">
      <div class="miner_list_box">
        <div v-for="n,k in minerData" class="listmill">
          <a href="javascript:;" @click="goPay(n.id)">
            <span class="status" v-if="n.status===1">热销中</span>
            <span class="gray" v-if="n.status===3">已下架</span>
            <span class="gray" v-if="n.status===2">已售罄 </span>
            <span class="gray" v-if="n.status===4" style="background: #32cf99;">预热</span>
            <div class="img1">
              <img :src="n.minerPicture"/>
            </div>
            <h6>{{n.name}}</h6>
            <p class="address"><span class="left">{{n.unit?n.unit: 'BitCoin'}}</span><span class="right">{{n.MinerAddress?n.MinerAddress: '未定'}}</span></p>
            <div class="progress_info press">
              <div class="progress_box">
                <div class="box" :style="{width:(n.buyed_amount/n.amount * 100)+'%'}"></div>
              </div>
            </div>
            <div class="items">
              <div class="item" v-for="item,d in items">
                <p class="price" v-if="d==='buyed_amount'">{{n.amount-n.buyed_amount}}{{item.unit}}</p>
                <p class="price" v-else>{{n[d]}}{{item.unit}}</p>
                <p class="title">{{item.title}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <router-link class="get_more" to="/minerShop/miner/1">查看更多矿机 ></router-link>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  export default {
    name: 'cloud_list',
    data () {
      return {
        nav: {'name': {title: '云算力名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'power': {title: '功耗', unit: 'W/T'}, 'type_name': {title: '算力类型', unit: ''}, 'left_num': {title: '剩余数量', unit: '台'}},
        list: [],
        list1: [],
        index: '',
        total: '',
        items: {'one_amount_value': {title: '矿机单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'buyed_amount': {title: '剩余数量', unit: '台'}},
        minerData: []
      }
    },
    methods: {
      goPay (id, type) {
        localStorage.setItem('params', JSON.stringify([ id, type]))
        this.$router.push({path: '/minerShop/detail/'})
      }
    },
    mounted () {
      var self = this
      util.post('product_top_list', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.list1 = res
          self.total = res.length
        })
      }).catch(res => {
        console.log(res)
      })
      util.post('showTopMiner', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.minerData = res
        })
      }).catch(res => {
        console.log(res)
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .cloud_list{
    overflow: hidden;
    background: #F6F7FB;
    .box{
      .miner_list_box{
        @include main
        overflow:hidden;
        .listmill{
          width: 280px;
          height: 320px;
          background: white;
          float: left;
          text-align: center;
          margin-left: 8px;
          margin-right: 11px;
          position: relative;
          .img1{
            width: 100%;
            height: 180px;
            position: relative;
            img{
              width: 126px;
              height: 81px;
              left: 50%;
              margin-left: -63px;
              object-fit: cover;
              top:64px;
              position: absolute;
            }
          }
          .status{
            width: 70px;
            height: 25px;
            display: block;
            text-align: center;
            line-height: 25px;
            background: #ff6458;
            color:white;
            font-size: 12px;
            position: absolute;
            left: 0;
            left:0;
          }
          .gray{
            background: #bfbfbf;
            width: 70px;
            height: 25px;
            display: block;
            text-align: center;
            line-height: 25px;
            color:white;
            font-size: 12px;
            position: absolute;
            left: 0;
            top:0;
          }
          h6{
            font-size: 16px;
            color:#121212;
            padding-left: 20px;
            padding-right: 20px;
            box-sizing: border-box;
            text-align: left;
          }
          .address{
            width: 100%;
            padding:0 20px;
            box-sizing: border-box;
            padding-top: 9px;
            overflow: hidden;
            .left{
              color: #327fff;
              float: left;
              font-size: 12px;
            }
            .right{
              float: right;
              color: #a9a9a9;
              font-size: 12px;
            }
          }
          .press{
            width: 240px;
            height: 5px;
            background: #e3e3e3;
            margin: 0 auto;
            margin-top: 20px;
            .progress_box{
              position: relative;
              height:100%;
              .box{
                @include position
                background: #32cf99;
              }
            }
          }
          .items{
            width: 100%;
            padding: 0 20px;
            padding-top: 18px;
            .item{
              width: 33.3%;
              float: left;
              text-align: center;
              p{
                margin:0;
                padding:0;
              }
              .price{
                height: 20px;
                font-size: 14px;
                color: #666666;
                text-align: left;
              }
              .title{
                color: #a9a9a9;
                font-size: 12px;
                text-align: left;
              }
            }
            :nth-child(1){
              width: 80px;
              height: 30px;
            }
            :nth-child(2){
              padding-left:35px;
            }
            :nth-child(3){
              padding-left: 30px;
            }
          }
          &:hover{
            box-shadow:#dfe0e1 0 0 30px;
            z-index: 999;
            img{
              transform: scale(1.1);
            }
          }
        }
      }
      table{
        @include table;
        @include main;
        background: #fff;
        margin:0 auto;
        th{
          font-size: 18px;
          line-height: 65px;
          border-bottom: 1px solid $border;
          font-weight: bold;
        }
        td{
          font-size: 16px;
          color:$light_text;
          line-height: 75px;
          border-bottom: 1px solid $border;
          .iconfont{
            color:$orange;
            font-size: 24px
          }
        }
        tbody{
          tr{
            cursor: pointer;
            &:hover{
              background: #ecf3ff;
            }
            td:nth-child(3),a{
              color:$orange
            }
            td:last-child{
              a{
                width:130px;
                padding:5px 25px;
                border-radius:5px
              }
            }
            &:hover a{
              background:$orange;
              color:$white
            }
          }
        }
      }
      .get_more{
        text-align: center;
        margin:20px 0;
        display: block;
        color: #327fff !important;
      }
    }
  }
</style>
