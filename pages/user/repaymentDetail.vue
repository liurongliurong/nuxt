<template>
  <section class="message_detail">
    <h2>还款管理</h2>
    <h3>分期详情</h3>
    <div class="data">
     <ul>
       <li>
         <h4>{{moneydata.product_name}}</h4>
         <p>算力服务器</p>
       </li>
       <li>
         <h4>{{moneydata.loan_money}} <span>元</span></h4>
         <p>分期金额</p>
       </li>
       <li>
         <h4>{{moneydata.fee_value*100}} <span>%</span></h4>
         <p>手续费率</p>
       </li>
       <li style="border-right:0;">
         <h4>{{moneydata.loan_start_time}}</h4>
         <p>分期时间</p>
       </li>
     </ul>
     <table border="1">
       <thead>
         <tr>
           <th>期数</th>
           <th>还款日期</th>
           <th>分期余额</th>
           <th>手续费</th>
           <th>本期还款额</th>
           <th>状态</th>
           <th>还款类型</th>
           <th>操作</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="n,k in item">
           <td>{{n.repayment_number}}</td>
           <td>{{n.repayment_time}}</td>
           <td>{{n.repayment_balance}}</td>
           <td>{{n.repayment_charge}}</td>
           <td>{{n.repayment_money}}</td>
           <template v-if="n.status == '0' && n.repayment_method == '0'">
             <td class="green">已还款</td>
             <td class="gay">算力收益</td>
           </template>
           <template v-else-if="n.status == '0' && n.repayment_method == '1'">
             <td class="green">已还款</td>
             <td class="gay">资金账户</td>
           </template>
           <template v-else>
             <td class="red">未还款</td>
             <td class="gay">算力收益 / 资金账户</td>
           </template>
           <template v-if="n.status == '0'">
             <td><button disabled="disabled" class="no" style="background:none;color:gray;">已还款</button></td>
           </template>
           <template v-else-if="n.status == '2'">
             <td><button disabled="disabled" class="no" style="background:none;color:gray;width:120px;">还不到还款日期</button></td>
           </template>
           <template v-else>
             <td><button class="yes" @click="openMask(n.id)">待还款</button></td>
           </template>
         </tr>
       </tbody>
     </table>
    </div>
    <MyMask :form="form" title="确认还款" v-if="show"></MyMask>
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
        form: [{name: '', type: 'select', title: '还款方式', option: ['算力收益', '资金用户'], dataNo: 1, changeEvent: true}, {name: 'balance', type: 'text', title: '账户余额', edit: 'balance'}, {name: 'totalMoney', type: 'text', title: '还款总额', edit: 'totalMoney'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
        loanData: {0: {data1: '', data2: '', unit: 'btc'}, 1: {data1: '', data2: '', unit: '元'}},
        model: 0,
        item: {},
        moneydata: {},
        show: '',
        mode: '',
        detailId: '',
        balance: '',
        totalMoney: '',
        repaymentId: ''
      }
    },
    methods: {
      items () {
        if (this.token !== 0 && this.detailId) {
          var self = this
          util.post('getLoanListDetail', {sign: api.serialize({token: this.token, user_id: this.user_id, loan_id: this.detailId})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.moneydata = res
              self.item = res.list
            })
          })
        } else {
          setTimeout(() => {
            this.items()
          }, 5)
        }
      },
      submit () {
        var ff = document.querySelector('.form')
        var data = api.checkFrom(ff)
        if (!data) return false
        ff.btn.setAttribute('disabled', true)
        var self = this
        util.post('repayment', {sign: api.serialize({token: this.token, user_id: this.user_id, repayment_id: this.repaymentId, product_hash_type: 1, mode: this.model, mobile: ff.mobile.value, code: ff.code.value})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('提交成功', self.isMobile, () => {
              self.show = false
              window.location.reload()
            })
          }, ff.btn)
        })
      },
      changeEvent (e) {
        // console.log(11)
        this.model = e.target.value
        this.balance = this.loanData[this.model].data1 + this.loanData[this.model].unit
        this.totalMoney = this.loanData[this.model].data2 + this.loanData[this.model].unit
        // this.select()
        if (+this.loanData[this.model].data1 < +this.loanData[this.model].data2) {
          var ff = document.querySelector('.form')
          api.tips('余额不足')
          ff.btn.setAttribute('disabled', true)
          // return false
        }
      },
      openMask (id) {
        this.repaymentId = id
        var self = this
        util.post('showRepayment', {sign: api.serialize({token: this.token, user_id: this.user_id, repayment_id: this.repaymentId, product_hash_type: 1, mode: 0})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.loanData[0].data1 = res.user_coin_value
            self.loanData[0].data2 = res.coin_repayment
            self.loanData[1].data1 = res.user_balance
            self.loanData[1].data2 = res.repayment
            console.log(self.balance)
            self.balance = self.loanData[self.model].data1 + self.loanData[self.model].unit
            self.totalMoney = self.loanData[self.model].data2 + self.loanData[self.model].unit
            window.scroll(0, 0)
            document.body.style.overflow = 'hidden'
            self.show = true
          })
        })
      },
      closeEdit () {
        this.show = ''
        document.body.style.overflow = 'auto'
      }
    },
    mounted () {
      var p = localStorage.getItem('info')
      if (p) {
        p = JSON.parse(p)
        this.detailId = p.repaymentId
      } else {
        this.$router.push({path: '/repayment/0'})
      }
      this.items()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        isMobile: state => state.isMobile
      })
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .message_detail{
    padding:0 15px;
    h2{
      padding:0 15px !important;
    }
    .data{
      width: 100%;
      padding:20px 10px 0;
      ul{
        width: 100%;
        height: 104px;
        background: #fff9f3;
        padding-top:28px;
        box-sizing: border-box;
        li{
          width: 25%;
          float: left;
          height: 50px;
          border-right:1px solid #e5e5e5;
          text-align:center;
          h4{
            font-size:18px;
            color:black;
            span{
              font-size: 14px;
            }
          }
          p{
            color: #999999;
          }
        }
      }
      table{
        width: 100%;
        margin-top: 40px;
        margin-bottom: 30px;
        thead tr{
          height: 40px;
          background: #f0f7fd;
        }
        tbody tr{
          height: 30px;
          text-align: center;
          .green{
            color: #009944;
          }
          .red{
            color: #fe5039;
          }
          .gay{
            color: rgb(50, 127, 255);
          }
          button{
            width: 60px;
            height: 30px;
            border:0;
            background: #327fff;
            color: white;
            margin:5px 0;
          }
        }
      }
    }
    .mask_con{
      .form button:disabled{
        background: #999;
        border:#999;
        cursor: no-drop;
      }
    }
  }
  .web_tips{
    z-index: 99999;
  }
</style>
