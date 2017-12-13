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
             <td><button class="yes" @click="showButton(true, n.id)">去还款</button></td>
           </template>
         </tr>
       </tbody>
     </table>
    </div>
    <div class="button" v-show="show">
      <div class="opaction">
        <form class="form" action="" @submit.prevent="submit" novalidate>
            <h4>确认还款<span @click="showButton(false)"></span></h4>
            <div class="one">
              <label>还款方式</label>
              <select @change="onChange">
                <option v-for="n,k in sort" :value="k">{{n.type}}</option>
              </select>
            </div>
            <div class="one">
              <label>账户余额</label>
              <input type="text" placeholder="0.0024562 btc" class="total" :value="banlance" onfocus="this.blur()"/>
            </div>
            <div class="one">
              <label>还款总额</label>
              <input type="text" placeholder="0.0024562 btc" class="total" :value="total" onfocus="this.blur()"/>
            </div>
            <div class="one">
              <label>交易密码</label>
              <input type="password" placeholder="请输入交易密码" class="passwordone"/>
            </div>
            <p class="block1" style="color:red;font-size:12px;padding-left:160px;padding-top:10px;display:none;">请输入交易密码</p>
            <button name="btn">提交</button>
        </form>
      </div>
    </div>
    <div class="design_formulas" v-show = "showpa">
       <div class="opaction">
         <h4>分期业务计算<span @click="showpay(false)">x</span></h4>
         <p>利息=贷款额*手续费率</p>
         <p>贷款总额=利息+贷款额</p>
         <p>每期需还款=贷款额/期数</p>
         <p>贷款余额=贷款总额-期数*每期需还款</p>
         <p>手续费=利息/期数</p>
         <p>本期还款额=每期需还款+手续费 ||   本期还款额=贷款总额/期数</p>
       </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        detail: {},
        item: {},
        moneydata: {},
        show: '',
        showpa: '',
        status: '',
        repayment_method: 0,
        total: '',
        banlance: '',
        password: '',
        mode: '',
        repayment_id: '',
        sort: [{type: '算力收益', unit: 'btc'}, {type: '资金用户', unit: '元'}],
        showbutton: false
      }
    },
    methods: {
      showButton (type, id) {
        this.repayment_id = id
        this.show = type
        document.getElementsByClassName('passwordone')[0].value = ''
        this.select()
      },
      select () {
        var self = this
        this.model = document.querySelector('select').value
        console.log(this.model)
        util.post('showRepayment', {sign: api.serialize({token: this.token, user_id: this.user_id, repayment_id: this.repayment_id, product_hash_type: 1, mode: this.model})}).then(function (res) {
          api.checkAjax(self, res, () => {
            var ff = document.querySelector('.form')
            if (self.model === '0') {
              if (res.user_coin_value < res.coin_repayment) {
                self.banlance = res.user_coin_value + ' btc'
                self.total = '您的币余额不足'
                ff.btn.setAttribute('disabled', true)
                // return false
              } else {
                self.banlance = res.user_coin_value + ' btc'
                self.total = res.coin_repayment + ' btc'
                ff.btn.removeAttribute('disabled')
              }
            } else {
              if (res.user_balance < res.repayment) {
                self.banlance = res.user_balance + ' 元'
                self.total = '您的账户余额不足'
                ff.btn.setAttribute('disabled', true)
                // return false
              } else {
                self.banlance = res.user_balance + ' 元'
                self.total = res.repayment + ' 元'
                ff.btn.removeAttribute('disabled')
              }
            }
          })
        })
      },
      showpay (type) {
        this.showpa = type
      },
      items () {
        if (this.token !== 0) {
          var self = this
          util.post('getLoanListDetail', {sign: api.serialize({token: this.token, user_id: this.user_id, loan_id: this.$route.params.id})}).then(function (res) {
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
        this.password = document.getElementsByClassName('passwordone')[0].value
        this.model = document.querySelector('select').value
        console.log(this.model)
        var self = this
        if (!this.password) {
          document.querySelector('.block1').style = 'display:block;color:red;font-size:12px;padding-left:160px;padding-top:10px;'
          return false
        } else {
          document.querySelector('.block1').style = 'display:none;color:red;font-size:12px;padding-left:160px;padding-top:10px;'
        }
        util.post('repayment', {sign: api.serialize({token: this.token, user_id: this.user_id, repayment_id: this.repayment_id, product_hash_type: 1, mode: this.model, trade_password: md5(this.password)})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('提交成功', self.isMobile, () => {
              self.show = false
              window.location.reload()
            })
          }, ff.btn)
        })
      },
      onChange () {
        this.select()
      }
    },
    mounted () {
      this.items()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
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
      ol{
        width: 100%;
        border:1px solid #eeeeee;
        height: 54px;
        box-sizing: border-box;
        li{
          width: 25%;
          float: left;
          line-height: 54px;
          text-align: center; 
          color: #999999;
          span{
            color: black;
          }
        }
      }
      .table{
        width: 100%;
        margin-top: 118px;
        border:1px solid #d2e9ff;
        border-bottom:0;
        border-right:0;
        box-sizing: border-box;
        overflow: hidden;
        .item{
          width: 50%;
          float: left;
          box-sizing: border-box;
          border-bottom:1px solid #d2e9ff;
          border-right:1px solid #d2e9ff;
          height: 40px;
          line-height:40px;
          text-align:center;
          .title{
            float: left;
            width: 164px;
            border:1px solid #d2e9ff;
            height: 40px;
            border-left:0;
            border-top:0;
            background-color: rgba(240,247,253,1);
            font-size: 16px;
            color: black;
            box-sizing: border-box;
          }
          .value{
            font-size: 16px;
            color:#666666;
          }
        }
      }
    }
    .button{
      width: 100%;
      height: 100%;
      position: fixed;
      background:rgba(0,0,0,.2);
      top:0;
      left:0;
      z-index:999;
    }
    .button .opaction{
      width: 476px;
      height: 450px;
      background: white;
      position: absolute;
      left: 50%;
      top:50%;
      margin-left:-238px;
      margin-top:-190px;
      h4{
        width: 100%;
        margin-top: 29px;
        font-size: 18px;
        text-align: center;
        span{
          @include close()
          position: absolute;
          right: 0;
          margin-right: 42px;
          cursor: pointer;
          font-family: cursive;
        }
      }
      .one{
        width: 100%;
        padding:0 70px;
        box-sizing: border-box;
        margin-top: 42px;
        label{
          display:inline-block;
          width: 70px;
          font-size: 16px;
          line-height: 28px;
          height: 28px;
        }
        input{
          width: 250px;
          height: 28px;
          border:1px solid #dcd7d7;
          margin-left: 10px;
          padding-left: 22px;
          box-sizing: border-box;
        }
        select{
          width: 250px;
          height: 28px;
          border:1px solid #dcd7d7;
          margin-left: 10px;
          padding-left: 22px;
          box-sizing: border-box;
        }
      }
      button{
        width: 180px;
        height: 28px;
        background: $blue;
        border:0;
        margin-top: 45px;
        margin-left: 147px;
        color: white;
        border-radius: 0;
        &:hover{
          background: #2470ef;
        }
      }
    }
    .design_formulas{
      width: 100%;
      height: 100%;
      position: fixed;
      background:rgba(0,0,0,.2);
      top:0;
      left:0;
      .opaction{
        width: 476px;
        height: 380px;
        background: white;
        position: absolute;
        left: 50%;
        top:50%;
        margin-left:-238px;
        margin-top:-190px;
        h4{
          width: 100%;
          margin-top: 29px;
          font-size: 18px;
          text-align: center;
          span{
            position: absolute;
            right: 0;
            margin-right: 42px;
            cursor: pointer;
            font-family: cursive;
          }
        }
        p{
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: black;
          margin-top: 20px;
        }
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
  .web_tips{
    z-index: 99999;
  }
</style>
