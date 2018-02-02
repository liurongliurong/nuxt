<template>
  <div class="index_data_list">
    <div class="box">
      <h1 class="home_item_title">全方位为你推荐算力服务器</h1>
      <p class="home_item_desc">全球算力输出服务由保全网提供全流程区块链存证、保全服务</p>
      <template v-if="total">
        <table>
          <thead>
            <tr>
              <th v-for="n in nav">{{n.title}}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l,i in cloudMinerData" @click="goPay(l.product_id||l.id, '2')">
              <td v-for="v,k in nav">
                <template v-if="k==='name'"><i class="iconfont">&#xe605;</i>{{l[k]}}</template>
                <template v-else-if="k==='amount'">{{+l[k]}} 台</template>
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
        <router-link class="get_more" to="/minerShop/cloudCompute">查看更多云算力 ></router-link>
      </template>
    </div>
    <div class="box">
      <div class="miner_list_box">
        <MinerItem v-for="n,k in minerData" :n="n" :key="k"></MinerItem>
      </div>
      <router-link class="get_more" to="/minerShop/miner">查看更多算力服务器 ></router-link>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  import MinerItem from '@/components/miner/MinerItem'
  export default {
    name: 'index_data_list',
    components: {
      MinerItem
    },
    data () {
      return {
        nav: {'name': {title: '云算力名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'power': {title: '功耗', unit: 'W/T'}, 'type_name': {title: '算力类型', unit: ''}, 'left_num': {title: '剩余数量', unit: '台'}},
        cloudMinerData: [],
        index: '',
        total: '',
        minerData: []
      }
    },
    methods: {
      goPay (id, type) {
        api.setStorge('suanli', {proId: id, proType: type})
        this.$router.push({path: '/minerShop/detail/'})
      }
    },
    mounted () {
      util.post('product_top_list', {token: this.token}).then((res) => {
        this.cloudMinerData = res
        this.total = res.length
      })
      util.post('showTopMiner', {token: this.token}).then((res) => {
        this.minerData = res.msg
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
  .index_data_list{
    overflow: hidden;
    background: #F6F7FB;
    .box{
      .miner_list_box{
        @include main
        @include row(4, 1%)
      }
      table{
        @include table(#ecf3ff)
        @include main;
        background: #fff;
        thead {
          border-bottom: 1px solid $border;
          th {
            font-size: 18px;
            line-height: 65px;
          }
        }
        td{
          font-size: 16px;
          color:$light_text;
          line-height: 75px;
          .iconfont{
            color:$orange;
            font-size: 24px
          }
        }
        tbody{
          tr{
            cursor: pointer;
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
