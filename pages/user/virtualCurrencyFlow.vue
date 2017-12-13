<template>
  <section class="vcurrency_flow">
    <div class="vcurrency_title">
      <span class="text_title">币流水</span>
      <div class="title_content">
        <span class="title_now">{{hashType[nowEdit]&&hashType[nowEdit].name}}</span>
        <div class="title_list">
          <a href="javascript:;" @click="setList(k)" v-for="n,k in hashType">{{n.name}}</a>
        </div>
      </div>
    </div>
    <h3>流水详情</h3>
    <div class="detail_box">
      <div class="data">
        <template v-for="d,k in dataNav">
          <div class="item">
            <p>{{d}}</p>
            <div>
              <span class="currency">{{data[k].toFixed(8)}}</span>
              <span class="">{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</span>
            </div>
          </div>
          <div class="line" v-if="k!==1"></div>
        </template>
      </div>
    </div>
    <div class="detail_table">
      <Sort :sort="sort" page="virtualCurrencyFlow"></Sort>
      <table>
        <thead>
          <tr>
            <th v-for="n in nav">{{n}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in list">
            <td v-for="v,k in nav">{{l[k]}}</td>
          </tr>
        </tbody>
      </table>
      <Pager :len="len"></Pager>
      <div class="nodata" v-if="showImg">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  import Sort from '@/components/common/Sort'
  export default {
    components: {
      Pager, Sort
    },
    data () {
      return {
        nowEdit: 0,
        dataNav: {total_income: '累积已获得BTC', total_electric_fee: '累计支付电费'},
        data: {total_income: 0, total_electric_fee: 0},
        nav: {product_name: '算力服务器', payable_time: '收益时间', paid_time: '派发时间', hold_amount: '总算力', paid_amount: '获得BTC', electric_fee: '支付电费', status: '状态'},
        list: [],
        len: 0,
        now: 1,
        sort: [{title: '时间', option: 'desc'}],
        showImg: false
      }
    },
    methods: {
      getList (sort) {
        var self = this
        this.list = []
        var sendData = {}
        var data = {token: this.token, user_id: this.user_id, product_hash_type: this.nowEdit + 1, page: this.now}
        if (sort >= 0 && this.sort[sort] && this.sort[sort].option) {
          sendData = {sort: this.sort[sort].option}
        } else {
          sendData = {sort: ''}
        }
        util.post('userCoinList', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.list = res.value_list
            self.showImg = !res.value_list.length
            if (self.now > 1) return false
            self.len = Math.ceil(res.total_num / 15)
          })
        })
      },
      setList (n) {
        this.nowEdit = n
        this.getList()
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          util.post('userCoin', {sign: api.serialize({token: this.token, user_id: this.user_id, product_hash_type: '1'})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.data = res
            })
          })
          this.getList()
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    watch: {
      '$route': 'getList'
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        hashType: state => state.hashType
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .vcurrency_flow{
    padding:0 15px;
    .vcurrency_title{
      padding:15px;
      @include select_list
      border-bottom:1px solid $border
    }
    .detail_box{
      @include gap(25,v)
      margin-bottom:10px;
      .data{
        width:70%;
        @include detail_data
        .item{
          width:48%;
        }
        .item:first-child{
          span.currency{
            color:$blue
          }
        }
      }
    }
    .detail_table{
      @include data_table
    }
  }
</style>
