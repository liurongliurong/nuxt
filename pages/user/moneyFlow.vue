<template>
  <section class="money_flow">
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
        <img :src="img" alt="">
        <p>暂无列表信息</p>
      </div>
      <Pager :len="len"></Pager>
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
  import md5 from 'js-md5'
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
          Withdrawals: [{name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7}, {name: 'password', type: 'trade_password', title: '交易密码', placeholder: '请输入交易密码', pattern: 'telCode'}]
        },
        editText: '',
        len: 0,
        now: 1,
        sort: [{title: '时间', option: ['asc', 'desc'], value: 0}],
        img: require('@/assets/images/no_data.jpg'),
        show: false,
        fee: 0,
        total_price: 0
      }
    },
    methods: {
      openMask (str, title) {
        if ((str === 'Withdrawals') && !this.bank_card) {
          api.tips('请先绑定银行卡', () => {
            this.$router.push({name: 'account'})
          })
          return false
        }
        if (str === 'recharge') {
          this.$router.push({name: 'recharge'})
        }
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
        this.editText = title
        this.edit = str
        var data = {token: this.token, user_id: this.user_id}
        var self = this
        util.post('showWithdraw', data).then(function (res) {
          api.checkAjax(self, res, () => {
            self.fee = res.withdraw_fee
          })
        })
      },
      closeEdit () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      getList (sort) {
        var self = this
        this.list = []
        var sendData = {}
        var data = {token: this.token, user_id: this.user_id, page: this.now}
        if (!sort) {
          sendData = {sort: ''}
        } else {
          sendData = {sort}
        }
        util.post('userCapitalList', Object.assign(data, sendData)).then(function (res) {
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
        data.trade_password = md5(data.trade_password)
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post('withdraw', Object.assign(data, sendData)).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeEdit()
            api.tips('提现成功')
          }, form.btn)
        })
      },
      onChange (e) {
        this.total_price = e.target.value
      }
    },
    filters: {
      currency: api.currency
    },
    watch: {
      '$route': 'getList'
    },
    mounted () {
      var self = this
      util.post('userCapital', {token: this.token, user_id: this.user_id}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.data = res
        })
      })
      this.getList()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        bank_card: state => state.info.bank_card
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
      @include flex
      margin-bottom:10px;
      .data{
        flex:1;
        @include detail_data
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
  }
</style>
