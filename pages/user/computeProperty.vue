<template>
  <section class="compute_property">
    <h2>个人中心</h2>
    <h3>资金账户</h3>
    <div class="compute_box money_box">
      <div class="data">
        <div class="item">
          <p>总资金</p>
          <span class="currency">{{priceall|currency}}</span>
          <span class="">元</span>
        </div>
        <div class="line"></div>
        <template v-for="d,k in moneyNav">
          <div class="item">
            <div class="frozeeData">
              <span>{{d}}</span>
              <span class="problem" v-if="k==='freeze_account'">?</span>
              <div class="frozee_tips" v-if="k==='freeze_account'">暂时不能使用的资金</div>
            </div>
            <span class="currency">{{moneyData[k]|currency}}</span>
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
    <div class="compute_title">
      <span class="text_title">算力账户</span>
      <div class="title_content">
        <span class="title_now">{{hashType[nowEdit]&&hashType[nowEdit].name}}</span>
        <div class="title_list">
          <a href="javascript:;" @click="setList(k)" v-for="n,k in hashType">{{n.name}}</a>
        </div>
      </div>
    </div>
    <div class="compute_box compute_account">
      <div class="data">
        <template v-for="d,k in computeNav">
          <div class="item">
            <p>{{d}}</p>
            <span class="currency">{{computeData[k]|format(8)}}</span>
            <span class="">{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</span>
          </div>
          <div class="line"></div>
        </template>
      </div>
      <div class="btn">
        <router-link to="/user/incomeChart">收益图表</router-link>
        <button @click="openMask('GetIncome', '提取收益')">提取收益</button>
      </div>
    </div>
    <div class="compute_box compute_account">
      <div class="data">
        <template v-for="d,k in computeNav1">
          <div class="item">
            <p>{{d}}</p>
            <!-- <span class="currency">{{computeData[k]|format(8)}}</span>  -->
            <template v-if="k==='today_hash'">
              <span class="currency">{{(qwsl.price * computeData.balance_account)|format(1)}}</span>
            </template>
            <template v-else-if="k==='total_hash'">
              <span class="currency">{{output}}</span>
            </template>
            <template v-else>
              <span class="currency">{{qwsl.price}}</span>
            </template>
            <template v-if="k==='total_hash'">
              <span class="">{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}} /T/天</span>
            </template>
            <template v-else>
              <span class=""> CNY</span>
            </template>
          </div>
          <div class="line"></div>
        </template>
      </div>
    </div>
    <h3>算力资产</h3>
    <div class="detail_table">
      <div class="item" v-for="d,k in computeProperty">
        <div class="item_title">{{d[0]}}</div><div class="item_value" v-if="k==='total_hash'">{{dataProperty[k]|format}}{{d[1]}}</div><div class="item_value" v-else>{{dataProperty[k]}}{{d[1]}}</div>
      </div>
    </div>
    <template v-if="scode">
      <h4>基金资产</h4>
      <div class="detail_table fund_table">
        <div class="item" v-for="d,k in computeFund">
          <div class="item_title">{{d[0]}}</div>
          <div class="item_value">{{dataFund[k]}}{{d[1]}}</div>
        </div>
        <div class="item" v-if="4%2">
          <div class="item_title"></div>
          <div class="item_value"></div>
        </div>
      </div>
    </template>
    <div class="fund_btn">
      <router-link to="/user/bitCalculator">挖矿计算器</router-link>
      <router-link to="/user/order/0">出售云算力</router-link>
      <router-link to="/user/order/0">查看订单</router-link>
    </div>
    <MyMask :form="form[edit]" :title="editText" v-if="edit" @submit="submit" @closeMask="closeMask">
      <template slot="fee">
        <p v-if="edit==='Withdrawals'">手续费：{{total_price * fee|format}}元<span class="fee">({{fee*100+'%'}})</span></p>
        <p v-if="edit==='GetIncome'">手续费：0.0002btc</p>
      </template>
    </MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  export default {
    components: {
      MyMask
    },
    data () {
      return {
        nowEdit: 0,
        priceall: '',
        moneyNav: {freeze_account: '冻结资金', balance_account: '账户余额'},
        moneyData: {freeze_account: 0, balance_account: 0},
        computeNav: {today_hash: '今日收益', balance_account: '账户余额', total_hash: '累积已获得收益'},
        computeNav1: {today_hash: '现货资产', balance_account: '币价', total_hash: '单位挖矿产出'},
        computeData: {today_hash: 0, balance_account: 0, total_hash: 0},
        computeProperty: {total_miner: ['已购入云算力', '台'], total_hash: ['算力总和', 'T'], selled_miner: ['已出售云算力', '台'], selling_miner: ['出售中云算力', '台']},
        // , selled_hash: ['已出租云算力', '台'], selling_hash: ['出租中云算力', '台']
        dataProperty: {total_miner: 0, total_hash: 0, buy_transfer_hash: 0, selled_miner: 0, selling_miner: 0, selled_hash: 0, selling_hash: 0},
        computeFund: {total_miner: ['云算力', '台'], total_hash: ['云算力总和', 'T'], selled_miner: ['已出租云算力', 'T'], selling_miner: ['出租中云算力', 'T']},
        dataFund: {total_miner: 0, total_hash: 0, selled_miner: 0, selling_miner: 0},
        edit: '',
        form: {
          Withdrawals: [{name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7, tipsInfo: '余额', tipsUnit: '元'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
          GetIncome: [{name: 'product_hash_type', type: 'text', title: '算力类型', edit: 'hashType'}, {name: 'amount', type: 'text', title: '提取额度', placeholder: '请输入提取额度', changeEvent: true, pattern: 'coin', tipsInfo: '余额', tipsUnit: 'hash'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}]
        },
        editText: '',
        fee: 0,
        total_price: 0,
        amount: 0,
        product_hash_type: '',
        qwsl: '',
        output: ''
      }
    },
    methods: {
      openMask (str, title) {
        this.total_price = 0
        if (!(this.true_name && this.true_name.status === 1)) {
          api.tips('请先实名认证', this.isMobile, () => {
            this.$router.push({name: 'user-account'})
          })
          return false
        }
        var requestUrl = ''
        var data = {}
        if (str === 'recharge') {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'user-recharge'})
          return false
        }
        if (str === 'GetIncome') {
          if (!this.address.length) {
            api.tips('请先绑定算力地址', this.isMobile, () => {
              this.$router.push({name: 'user-account'})
            })
            return false
          }
          if (+this.computeData.balance_account <= 0) {
            api.tips('您的账户余额不足，不能提取收益', this.isMobile)
            return false
          }
          requestUrl = 'showWithdrawCoin'
          data = {token: this.token, user_id: this.user_id, product_hash_type: this.hashType[this.nowEdit] && this.hashType[this.nowEdit].id}
          this.product_hash_type = this.hashType[this.nowEdit].name.toUpperCase()
        }
        if (str === 'Withdrawals') {
          if (!(this.bank_card && this.bank_card.status === 1)) {
            api.tips('请先绑定银行卡', this.isMobile, () => {
              this.$router.push({name: 'user-account'})
            })
            return false
          }
          if (+this.moneyData.balance_account <= 0) {
            api.tips('您的账户余额不足，不能提现', this.isMobile)
            return false
          }
          requestUrl = 'showWithdraw'
          data = {token: this.token, user_id: this.user_id}
        }
        var self = this
        util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            window.scroll(0, 0)
            document.body.style.overflow = 'hidden'
            self.editText = title
            self.edit = str
            if (str === 'Withdrawals') {
              self.fee = res.withdraw_fee
              self.amount = parseInt(res.balance_account)
            } else if (str === 'GetIncome') {
              self.fee = res.withdraw_coin_fee
              self.amount = res.coin_account
            }
          })
        })
      },
      closeMask () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      setList (n) {
        this.nowEdit = n
        this.getList()
      },
      getList () {
        var self = this
        var sendData = {token: this.token, user_id: this.user_id, product_hash_type: (this.hashType[this.nowEdit] && this.hashType[this.nowEdit].id) || '1'}
        util.post('myHashAccount', {sign: api.serialize(sendData)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.computeData = res
          })
        })
        util.post('hashAsset', {sign: api.serialize(sendData)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.dataProperty = res
          })
        })
        util.post('hashFund', {sign: api.serialize(sendData)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.dataFund = res
          })
        })
      },
      submit (e) {
        var form = e.target
        var data = api.checkFrom(form, 1)
        var url = ''
        var sendData = {token: this.token, user_id: this.user_id}
        var tipsStr = ''
        switch (this.edit) {
          case 'Withdrawals':
            url = 'withdraw'
            tipsStr = '提现成功'
            break
          case 'GetIncome':
            url = 'withdrawCoin'
            tipsStr = '提币成功'
            break
        }
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeMask()
            api.tips(tipsStr, self.isMobile)
          }, form.btn)
        })
      },
      onChange (obj) {
        var value = obj.e.target.value
        if (parseFloat(value) > parseFloat(this.amount)) {
          value = this.amount
        }
        this.total_price = value
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          util.post('myAccount', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.moneyData = res
              self.priceall = +self.moneyData.freeze_account + (+self.moneyData.balance_account)
            })
          })
          util.post('showCoinData', {sign: api.serialize({token: this.token})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.qwsl = res[0]
              self.output = res[0].output.split(" ")[0]
            })
          }).catch(res => {
            console.log(res)
          })
          this.getList()
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    mounted () {
      this.getData()
    },
    filters: {
      currency: api.currency,
      format: api.decimal
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        address: state => state.info.address,
        hashType: state => state.hashType,
        scode: state => state.info.scode,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .compute_property{
    padding:0 15px;
    h2{
      padding:0 15px !important;
    }
    .compute_box{
      @include gap(25,v)
      @include flex(space-between)
      margin-bottom:10px;
      .data{
        width:79%;
        @include detail_data
        .item{
          width:34%;
          padding-right: 15px;
        }
        .frozeeData{
          position: relative;
          span{
            color:$text;
            &.problem{
              display: inline-block;
              width:18px;
              text-align: center;
              line-height: 16px;
              cursor: pointer;
              border:1px solid $text;
              border-radius:50%;
              font-size: 12px;
              margin-left:5px;
              &:hover + .frozee_tips{
                display: block;
              }
            }
          }
          .frozee_tips{
            font-size: 12px;
            height:20px;
            line-height: 20px;
            color:$light_text;
            width:130px;
            @include position(0,88)
            padding:0 10px;
            background: $border;
            display: none;
          }
        }
      }
      .btn{
        @include detail_btn
        @include gap(25,h)
        a{
          @include button($orange)
        }
      }
      &.money_box{
        .data{
          .item:nth-child(5){
            span.currency{
              color:$orange
            }
          }
          .item:nth-child(3){
            span.currency{
              color:$light_black
            }
          }
        }
        .btn{
          button{
            &:first-child{
              @include button($orange)
            }
            &:not(:first-child){
              @include button($blue)
            }
          }
        }
      }
      &.compute_account{
        .btn{
          button,a{
            @include button(#c2d9ff,bg,$blue)
          }
        }
      }
    }
    .compute_title{
      background: #f7f8fa;
      padding:15px;
      @include select_list
      .text_title{
        font-size: 16px;
        &:before{
          content: '|';
          padding-right: 10px;
          color: #000;
          font-weight: bold;
        }
      }
    }
    h4{
      margin:0 15px;
      text-align: center;
      font-size: 16px;
      @include button($blue)
      line-height: 2.1;
    }
    .detail_table{
      @include detail
      &.fund_table{
        margin-top:3px
      }
    }
    .fund_btn{
      text-align: right !important;
      padding:0 15px 30px 15px;
      a{
        display: inline-block;
        text-align: center !important;
        width:85px;
        border-radius:5px;
        line-height: 2;
        &:not(:last-child){
          @include button($blue)
        }
        &:last-child{
          @include button($blue,border)
        }
        & + a{
          margin-left:13px
        }
      }
    }
  }
</style>
