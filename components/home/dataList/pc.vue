<template>
  <div class="cloud_list">
    <div class="box">
      <h2>
        <div>
          <span>矿机推荐</span>
          <span>全球算力输出服务由保全网提供全流程区块链存证、保全服务</span>
        </div>
        <router-link to="/minerShop/list">更多矿机 ></router-link>
      </h2>
      <table>
        <thead>
          <tr>
            <th v-for="n in nav">{{n.title}}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l,i in list" @click="goPay(l.product_id||l.id)">
            <td v-for="v,k in nav">
              <template v-if="k==='name'"><i class="iconfont">&#xe605;</i>{{l[k]}}</template>
              <!-- <template v-else-if="k==='one_amount_value'">{{+l[k]||'????'}}</template> -->
              <template v-else-if="k==='left_num'">{{l.amount-(l.sell_amount||l.buyed_amount)+v.unit}}</template>
              <template v-else>{{l[k]+[v.unit]}}</template>
            </td>
            <td>
              <!-- <a href="javascript:;">购买</a> -->
               <a class="btn" v-if="l.status===4">预热</a> 
               <a class="btn" v-else-if="l.amount-(l.sell_amount||l.buyed_amount)>0">立即购买</a> 
              <button class="btn" disabled v-else>已售罄</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
        // nav: {'name': {title: '矿机名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'buy_step_amount': {title: '最小购买单位', unit: '台'}, 'hash': {title: '算力', unit: 'T'}, 'type_name': {title: '算力类型', unit: ''}, 'plan': {title: '项目进度', unit: ''}},
        nav: {'name': {title: '矿机名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'left_num': {title: '剩余数量', unit: '台'}},
        list: [],
        index: ''
      }
    },
    methods: {
      goPay (id) {
        this.$router.push({path: '/minerShop/detail/' + id + '&1'})
      }
    },
    mounted () {
      var self = this
      util.post('showTopMiner', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.list = res
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
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .cloud_list{
    margin:60px 0;
    overflow: hidden;
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
      h2{
        @include data_title
      }
      table{
        @include table;
        @include main;
        margin:0 auto;
        th{
          font-size: 18px;
          line-height: 65px;
          background: #ecf3ff
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
        tr:not(:first-child){
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
  }
</style>