<template>
  <section class="lp_center">
    <div class="no_scode" v-if="show===1">
      <div class="no_scode_box">
        <div class="input">
          <span>验证S码</span>
          <span>*</span>
          <input ref="scode" type="text" name="scode" autocomplete="off" placeholder="请输入S码" @blur="test" pattern="^[0-9a-zA-Z]{6}$" data-status="" maxlength="6">
          <span title="请输入6位字符串" tips="请输入S码"></span>
        </div>
        <button @click="check">提交</button>
      </div>
    </div>
    <template v-if="show===2">
      <h2>LP中心<button @click="open">添加基金</button><span class="scode_info">风险测评：{{scodeInfo.risk.user_risk_score+'分('+scodeInfo.risk.risk_type+')'}}</span></h2>
      <template v-if="s.fund_invest_id" v-for="s,k in scodeInfo.list">
        <h3>{{s.fund_invest_id===1?'BDC基金':'算力基金'}}</h3>
        <div class="detail_table">
          <div class="item" v-for="d,k in nav[s.fund_invest_id-1]">
            <div class="item_title">{{d[0]}}</div>
            <div class="item_value">
              <template v-if="k==='start_end_time'">{{s.fund_start_time}}-{{s.fund_end_time}}</template>
              <!-- <template v-else-if="s.fund_invest_id===1&&d==='累积电费'">{{s[k]}}<span>查看明细</span></template>
              <template v-else-if="s.fund_invest_id===2&&d==='累计获得收益'">{{s[k]}}<span>查看明细</span></template> -->
              <template v-else>{{s[k]}}{{d[1]}}</template>
            </div>
          </div>
          <div class="item" v-if="Object.keys(nav[s.fund_invest_id-1]).length%2">
            <div class="item_title"></div>
            <div class="item_value"></div>
          </div>
        </div>
      </template>
    </template>
    <div v-if="show===3" class="agreement_text">
      <div class="" v-html="content"></div>
      <div class="btn_box">
        <button @click="agree">我同意，签合同</button>
      </div>
    </div>
    <div class="mask" v-if="edit">
      <div class="form_box">
        <div class="close" @click="closeEdit()">
          <span class="icon"></span>
          <span>关闭</span>
        </div>
        <h2>验证S码</h2>
        <form class="form_content" @submit.prevent="submit" novalidate>
          <p>请输入S码绑定算力产业基金</p>
          <div class="input">
            <span>S码</span>
            <span>*</span>
            <input type="text" name="scode" autocomplete="off" placeholder="请输入S码" @blur="test" pattern="^[0-9a-zA-Z]{6}$" data-status="" maxlength="6">
            <span title="请输入6位字符串" tips="请输入S码"></span>
          </div>
          <button>确认提交</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        data: {},
        nav: [{fund_name: ['基金名称', ''], fund_manager: ['基金管理人', ''], invest_money: ['投资金额', '万'], start_end_time: ['投资时间', ''], fund_time: ['投资期限', '天'], electric_amount: ['累计用电力量', '度'], electric_total_price: ['累积电费', '元']}, {fund_name: ['基金名称', ''], fund_manager: ['基金管理人', ''], invest_money: ['投资金额', '万'], start_end_time: ['投资时间', ''], fund_time: ['投资期限', '天'], miner_num: ['云矿机', '台'], miner_hash: ['运算力', 'T'], hash_income: ['累计获得收益', 'btc']}],
        edit: false,
        show: 0,
        content: '',
        contract: {},
        no: '',
        scodeInfo: {}
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.form_content')
        var data = api.checkFrom(form)
        var self = this
        if (!data) return false
        util.post('ScodeVerify', {token: this.token, user_id: this.user_id, s_code: form.scode.value}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.edit = false
            document.body.style.overflow = 'auto'
            self.show = 3
            self.content = res.content
            self.contract = {contract_id: res.id, funds_id: res.funds_id, s_code: res.s_code}
          })
        })
      },
      open () {
        this.edit = true
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
      },
      closeEdit () {
        this.edit = false
        document.body.style.overflow = 'auto'
      },
      test (e) {
        var ele = e.target
        if (!ele.checkValidity()) {
          api.setTips(ele, 'invalid')
        } else {
          api.setTips(ele, 'valid')
          return true
        }
      },
      check (e) {
        var ele = this.$refs.scode
        if (!ele.value) {
          api.setTips(ele, 'null')
          return false
        }
        if (!(this.true_name && this.true_name.status === 1)) {
          api.tips('请先实名认证', () => {
            this.$router.push({name: 'auth-account'})
          })
          return false
        }
        if (!(this.bank_card && this.bank_card.status === 2)) {
          api.tips('请先绑定银行卡', () => {
            this.$router.push({name: 'auth-account'})
          })
          return false
        }
        var self = this
        var sCodeData = {token: this.token, user_id: this.user_id, s_code: ele.value}
        util.post('ScodeVerify', sCodeData).then(function (res) {
          api.checkAjax(self, res, () => {
            if (self.risk && self.risk.user_risk_score < 0) {
              self.$router.push({name: 'auth-accountEvaluate'})
            } else {
              self.show = 3
              self.content = res.content
              self.contract = {contract_id: res.id, funds_id: res.funds_id, s_code: res.s_code}
            }
          })
        })
      },
      agree () {
        var self = this
        util.post('sign_contract', Object.assign({token: this.token, user_id: this.user_id}, self.contract)).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips(res)
            self.show = 2
            util.post('scode_info', {sign: 'token=' + self.token}).then(function (data) {
              if (data && !data.code) {
                self.scodeInfo = data
              }
            })
            if (!self.scode) {
              self.$store.commit('SET_INFO', {scode: 1})
            }
          })
        })
      }
    },
    mounted () {
      var self = this
      util.post('scode_info', {token: self.token}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.no = res.s_code
          self.scodeInfo = res
          if (!res.list) {
            self.show = 1
            return false
          }
          if (res.s_code && res.risk && res.risk.user_risk_score < 0) {
            self.$router.push({name: 'accountEvaluate'})
            return false
          }
          if (res.s_code && res.risk && res.risk.user_risk_score > 0 && !res.list[res.s_code].is_contract) {
            var sCodeData = {token: self.token, user_id: self.user_id, s_code: res.s_code}
            util.post('show_contract', sCodeData).then(function (r) {
              api.checkAjax(self, r, () => {
                self.show = 3
                self.content = r.content
                self.contract = {contract_id: r.id, funds_id: r.funds_id, s_code: r.s_code}
              })
            })
            return false
          }
          self.show = 2
        })
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        risk: state => state.info.risk,
        scode: state => state.info.scode
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .lp_center{
    padding:0 15px;
    h2{
      padding:0 15px !important;
      .scode_info{
        float: right;
        font-size: 14px;
        margin-right:50px;
        color:$blue
      }
      button{
        float: right;
        @include button($blue)
        padding:5px 15px;
        margin-top:10px;
      }
    }
    .detail_table{
      @include detail
    }
    .mask{
      @include mask
      .form_box{
        h2{
          padding: 10px 25px;
          border-bottom: 1px solid #e8e8e8;
          margin-bottom:0
        }
        .form_content{
          padding:20px 100px;
          @include form(v)
          p{
            margin-bottom:15px
          }
        }
      }
    }
    .no_scode{
      width:100%;
      height:100%;
      .no_scode_box{
        width:300px;
        height: 124px;
        margin:auto;
        margin-top:210px;
        .input{
          @include input
        }
        button{
          width:100%;
          line-height: 3;
          @include button($blue)
        }
      }
    }
    .agreement_text{
      padding:15px;
      .btn_box{
        text-align: center;
        button{
          line-height: 2;
          width:120px;
          margin:30px auto;
          @include button($blue)
        }
      }
    }
  }
</style>
