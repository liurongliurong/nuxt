<template>
  <section class="money_flow">
    <template v-if="!isMobile">
      <h2>资金流水</h2>
      <h3>流水详情</h3>
      <div class="detail_box">
        <div class="data">
          <template v-for="d,k in dataNav">
            <div class="item">
              <p>{{d}}</p>
              <span class="currency">{{data[k]|currency}}</span>
              <span class="">元</span>
            </div>
            <div class="line"></div>
          </template>
        </div>
        <div class="btn">
          <button @click="openMask('recharge')">充值</button>
          <button @click="openMask('Withdrawals')">提现</button>
        </div>
      </div>
      <div class="detail_table">
        <table>
          <thead>
            <tr>
              <th v-for="n in nav">{{n}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in list">
              <td v-for="v,k in nav">
                <template v-if="k==='value'">{{l[k]|currency(2,1)}}元</template>
                <template v-else-if="k==='status'">{{l[k]==2&&'成功'}}</template>
                <template v-else>{{l[k]}}</template>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="nodata" v-if="show">
          <div class="nodata_img"></div>
          <p>暂无列表信息</p>
        </div>
        <Pager :len="len" :now="now" @setPage="setPage"></Pager>
      </div>
    </template>
    <div class="mobile_box" v-else>
      <p class="flow_p">
        <span>资金用途</span>
        <span>金额（元）</span>
      </p>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists">
        <div class="moneyflow">
          <div v-for="n, k in list" class="monrylist">
            <span class="left">
              <i>{{n.type_name}}</i>
              <em>{{n.create_time}}</em>
            </span>
            <span :class="['right', {active: n.value<=0}]">{{n.value}}</span>
          </div>
        </div>
      </div>
      <p v-if="loading"  class="loadmore">加载中······</p>
    </div>
    <MyMask :form="Withdrawals" title="资金提现" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange">
      <p slot="fee">手续费：{{chargeMoney|format}}元<span class="fee">({{fee*100+'%'}})</span></p>
    </MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  import Pager from '@/components/common/Pager'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      MyMask, Pager
    },
    data () {
      return {
        dataNav: {total_buy: '累积购买总金额', total_recharge: '累积充值总金额', balance_account: '账户余额'},
        data: {total_buy: 0, total_recharge: 0, balance_account: 0},
        nav: {create_time: '时间', type_name: '交易类型', trade_content: '交易内容', value: '交易金额', remark: '备注', status: '状态'},
        list: [],
        edit: '',
        Withdrawals: [{name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7, tipsInfo: '余额', tipsUnit: '元', value2: 0}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}],
        show: false,
        loading: false,
        len: 0,
        now: 1,
        fee: 0,
        chargeMoney: 0,
        balance: 0
      }
    },
    methods: {
      loadMore () {
        if (this.now <= this.len ) {
          this.loading = true
          this.now++
          this.fetchData(1)
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
        }
      },
      openMask (str) {
        if ((str === 'Withdrawals') && !this.bank_card) {
          api.tips('请先绑定银行卡', this.isMobile, () => {
            this.$router.push({name: 'user-account'})
          })
          return false
        }
        if (str === 'recharge') {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'user-recharge'})
          return false
        }
        var data = {token: this.token, user_id: this.user_id}
        var self = this
        util.post('showWithdraw', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.fee = res.withdraw_fee
            self.balance = parseInt(res.balance_account)
            self.Withdrawals[0].value2 = self.balance
            window.scroll(0, 0)
            document.body.style.overflow = 'hidden'
            self.edit = str
          })
        })
      },
      closeMask () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      fetchData (more) {
        var self = this
        var data = {token: this.token, user_id: this.user_id, page: this.now, sort: ''}
        util.post('userCapitalList', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            if (more) {
              for (let i = 0, len = res.value_list.length; i < len; i++) {
                self.list.push(res.value_list[i])
              }
            } else {
              self.list = res.value_list
            }
            if (self.now > 1) return false
            self.len = Math.ceil(res.total_num / 15)
          })
        })
      },
      submit (e) {
        var form = e.target
        var data = api.checkFrom(form)
        var sendData = {token: this.token, user_id: this.user_id}
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post('withdraw', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeMask()
            api.tips('提现成功', self.isMobile)
          }, form.btn)
        })
      },
      onChange (obj) {
        var value = obj.e.target.value
        if (parseFloat(value) > parseFloat(this.balance)) {
          obj.e.target.value = this.balance
        }
        this.chargeMoney = obj.e.target.value * this.fee
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          util.post('userCapital', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.data = res
            })
          })
          this.fetchData()
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      setPage (n) {
        this.now = n
        this.fetchData()
      }
    },
    filters: {
      currency: api.currency,
      format: api.decimal
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        bank_card: state => state.info.bank_card,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .money_flow{
    padding:0 15px;
    h2{
      padding:0 15px !important;
    }
    .detail_box{
      @include gap(25,v)
      @include flex(space-between)
      margin-bottom:10px;
      .data{
        width:79%;
        @include detail_data
        .item{
          width:32%;
        }
        .item:nth-child(5){
          span.currency{
            color:$orange
          }
        }
      }
      .btn{
        @include detail_btn
        @include gap(50,h)
        button:first-child{
          @include button($orange)
        }
        button{
          @include button($blue)
        }
      }
    }
    .detail_table{
      @include data_table
    }
    h2,h3,.detail_box,.detail_table{
      @include mobile_hide
    }
    .mobile_box{
      @include mobile_show
      width: 100%;
      background: #f5f5f9;
      .flow_p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding:0 .5rem;
        height: 2rem;
        line-height:2rem;
        background: white;
        color: #999999;
        font-size: 0.6rem;
        padding-bottom:.4rem;
        box-sizing: border-box;
      }
      .moneyflow{
        width: 100%;
        overflow: hidden;
        background: white;
        .monrylist{
          width: 100%;
          height: 100%;
          padding:0 .5rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          border-top:1px solid #ddd;
          .left i{
            display: block;
            font-size: .6rem;
            padding-top: .5rem;
          }
          .left em{
            display: block;
            font-size: .45rem;
            padding-top: .3rem;
            color: #a9a9a9;
            font-style: normal;
          }
          .right{
            line-height: 3rem;
            color: #01beb5;
            font-weight: 800;
            font-size: 0.6rem;
            &.active{
              color: red;
            }
          }
        }
      }
    }
    @media screen and (max-width: $mobile) {
      padding-bottom:61px;
    }
  }
  .loadmore{
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        background: white;
    }
</style>
