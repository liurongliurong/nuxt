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
          <button @click="openMask('Withdrawals', '资金提现')">提现</button>
        </div>
      </div>
      <div class="detail_table">
        <Sort :sort="sort" page="moneyFlow"></Sort>
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
        <Pager :len="len"></Pager>
      </div>
    </template>
    <div class="mobile_box" v-else>
      <p class="flow_p" v-if="!show">
        <span>资金用途</span>
        <span>金额（元）</span>
      </p>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists" v-if="!showcontent">
        <div class="moneyflow">
          <div v-for="n, k in cloudMinerDate" class="monrylist">
            <span class="left">
              <i>{{n.type_name}}</i>
              <em>{{n.create_time}}</em>
            </span>
            <span :class="['right', {active: n.value<=0}]">{{n.value}}</span>
          </div>
        </div>
      </div>
      <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
      <p v-if="showno" class="showno loadmore">暂无数据······</p>
    </div>
    <MyMask :form="form[edit]" :title="editText" v-if="edit"></MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  import Pager from '@/components/common/Pager'
  import Sort from '@/components/common/Sort'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      MyMask, Pager, Sort
    },
    data () {
      return {
        dataNav: {total_buy: '累积购买总金额', total_recharge: '累积充值总金额', balance_account: '账户余额'},
        data: {total_buy: 0, total_recharge: 0, balance_account: 0},
        nav: {create_time: '时间', type_name: '交易类型', trade_content: '交易内容', value: '交易金额', remark: '备注', status: '状态'},
        list: [],
        edit: '',
        form: {
          Withdrawals: [{name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}]
        },
        editText: '',
        sort: [{title: '时间', option: 'desc'}],
        show: false,
        fee: 0,
        total_price: 0,
        loading: false,
        showcontent: false,
        cloudMinerDate: [],
        showno: false,
        len: 0,
        now: 1,
        total: -1
      }
    },
    methods: {
      loadMore () {
        var self = this
        this.loading = true
        if (this.total === 0) {
          this.loading = false
          this.showno = true
          return
        }
        var self = this
        if (this.total > this.cloudMinerDate.length || this.cloudMinerDate.length === 0) {
          let time = this.cloudMinerDate.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('userCapitalList', {sign: api.serialize({token: this.token, user_id: this.user_id, page: this.now,sort: ''})}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.total_num
                for (let i = 0, len = res.value_list.length; i < len; i++) {
                  self.cloudMinerDate.push(res.value_list[i])
                }
                self.loading = false
                self.now++
              })
            }).catch(res => {
              console.log(res)
            })
          }, time)
        } else {
          this.loading = false
        }
      },
      openMask (str, title) {
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
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
        this.editText = title
        this.edit = str
        var data = {token: this.token, user_id: this.user_id}
        var self = this
        util.post('showWithdraw', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.fee = res.withdraw_fee
          })
        })
      },
      closeMask () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      getList (sort) {
        var self = this
        this.list = []
        var sendData = {}
        var data = {token: this.token, user_id: this.user_id, page: this.now}
        if (sort >= 0 && this.sort[sort] && this.sort[sort].option) {
          sendData = {sort: this.sort[sort].option}
        } else {
          sendData = {sort: ''}
        }
        util.post('userCapitalList', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.list = res.value_list
            self.show = !res.value_list.length
            if (self.now > 1) return false
            self.len = Math.ceil(res.total_num / 15)
          })
        })
      },
      submit () {
        var form = document.querySelector('.form_content')
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
      onChange (e) {
        this.total_price = e.target.value
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          util.post('userCapital', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
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
    filters: {
      currency: api.currency
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
      padding:0;
      background: #f5f5f9;
      .flow_p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 0.73rem;
        line-height:0.73rem;
        background: #f5f5f9;
        color: #999999;
        padding:0 0.3rem;
        font-size: 0.25rem;
        box-sizing: border-box;
      }
      .moneyflow{
        width: 100%;
        overflow: hidden;
        background: white;
        .monrylist{
          width: 100%;
          height: 100%;
          padding:0.3rem .3rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          border-top:1px solid #ddd;
          .left i{
            display: block;
            font-size: .25rem;
          }
          .left em{
            display: block;
            font-size: .25rem;
            color: #a9a9a9;
            padding-top: 0.1rem;
            font-style: normal;
          }
          .right{
            line-height: 0.88rem;
            color: #01beb5;
            font-weight: 800;
            font-size: 0.3rem;
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
        height: 1.3rem;
        text-align: center;
        line-height: 1.3rem;
        background: white;
    }
</style>
