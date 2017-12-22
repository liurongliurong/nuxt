<template>
  <div class="lists_all">
    <template v-if="!isMobile">
      <div class="cloud_list">
        <div class="box">
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
      </div>
    </template>
    <template v-else>
      <div class="mobile_data" v-if="total">
        <h2>一 云算力抢购 一 <router-link to="/minerShop/miner/2">更多云算力 ></router-link></h2>
        <div class="mobile_listdata">
          <div class="mobile_list_box">
            <div v-for="d,i in list" @click="goPay(d.product_id, 2)" :key="i" class="mobile_lists">
              <div class="imgposition">
                <img :src="d.productPicture"/>
              </div>
              <h3>{{d.name}}</h3>
              <h4><b>¥ {{d.one_amount_value}}</b><span class="icon iconfont icon-jinrong"></span></h4>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  export default {
    name: 'chart',
    data () {
      return {
        nav: {'name': {title: '云算力名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'power': {title: '功耗', unit: 'W/T'}, 'type_name': {title: '算力类型', unit: ''}, 'left_num': {title: '剩余数量', unit: '台'}},
        list: [],
        list1: [],
        index: '',
        total: ''
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
          self.list = res
          self.total = res.length
          document.getElementsByClassName('mobile_list_box')[1].style.width = (res.length * 6) + (res.length) + 'rem'
        })
      }).catch(res => {
        console.log(res)
      })
      var self = this
      util.post('product_top_list', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.list1 = res
          if (self.isMobile) {
            document.getElementsByClassName('mobile_list_box')[0].style.width = (res.length * 6) + (res.length) + 'rem'
          }
        })
      }).catch(res => {
        console.log(res)
      })
    },
    filters: {
      format: api.readable
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
    .cloud_list{
      overflow: hidden;
      background: #F6F7FB;
      .btn{
        border:0;
        width:145px;
        color: $orange;
        text-align: center;
        line-height: 48px;
        border-radius:5px;
        background: transparent;
        &:disabled{
          cursor: no-drop;
          color:$light_black
        }
      }
      .box{
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
          margin:37px 0;
          display: block;
          font-size: 18px;
          color: #327fff !important;
        }
      }
    }
  .mobile_data{
    width: 100%;
    height: 9.3rem;
    background: white;
    margin-bottom: 0.5rem;
    h2{
      width: 100%;
      position: relative;
      text-align: center;
      font-size: 0.55rem;
      font-weight: 800;
      color: #1b1b1b;
      padding-top: .5rem;
      padding-bottom: 0.5rem;
      a{
        position: absolute;
        right: 0.5rem;
        font-size: 0.4rem;
        color: #999;
        font-weight: 100;
      }
    }
    .mobile_listdata{
      width: 100%;
      overflow: auto;
    }
    .mobile_listdata::-webkit-scrollbar{width:0px}
    .mobile_list_box{
      height: 7rem;
      margin-top: 0.2rem;
      overflow: auto;
      display: flex;
      justify-content:flex-start;
      border-left:1px solid #dddddd;
      .mobile_lists{
        width: 6rem;
        height: 6.8rem;
        border:1px solid #dddddd;
        border-left: 0;
        float: left;
        .imgposition{
          width: 100%;
          height: 3.8rem;
          text-align: center;
          img{
            width: 75%;
            height: 3rem;
            margin-top: 0.5rem;
          }
        }
        h3{
          width: 100%;
          padding:0 .4rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-top: 0.4rem;
          box-sizing: border-box;
          font-size: 0.7rem;
        }
        h4{
          color: #fe5039;
          width: 100%;
          padding:0 .4rem;
          box-sizing: border-box;
          font-size: 0.6rem;
          margin-top: 0.3rem;
          span{
            display:inline-block;
            float: right;
            width: 0.9rem;
            height: 0.9rem;
            background: #fe5039;
            color:white;
            border-radius: .1rem;
            font-size: .7rem;
            line-height: 1rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
