<template>
  <section class="repayment_detail">
    <div class="pc_box" v-if="isMobile===0">
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
          <li>
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
              <td>{{(+n.repayment_balance).toFixed(2)}}</td>
              <td>{{(+n.repayment_charge).toFixed(2)}}</td>
              <td>{{(+n.repayment_money).toFixed(2)}}</td>
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
              <td v-if="n.status == '0'">
                <button disabled="disabled" class="no">已还款</button>
              </td>
              <td v-else-if="n.status == '2'">
                <button disabled="disabled" class="not_yet">还不到还款日期</button>
              </td>
              <td v-else>
                <button class="yes" @click="openMask(n.id)">待还款</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mobile_box" v-if="isMobile===1&&!show">
      <div class="box_list">
        <div :class="['item', {active: n.status == '0'}]" v-for="n,k in item" @click="openMask(n.id, n.status)">
          <div class="item_left">
            <div class="item_text">{{(+n.repayment_number)|format}}/{{(item.length)|format}}期</div>
            <div class="item_tips">还款日{{n.repayment_time}}</div>
          </div>
          <div class="item_right">
            <div class="item_text">{{(+n.repayment_money).toFixed(2)+'(含手续费'+(+n.repayment_charge).toFixed(2)+')'}}</div>
            <div class="item_tips">{{n.status == '0'?'已还清':n.status == '2'?'未到还款日期':'剩余应还'+(+n.repayment_money).toFixed(2)}}</div>
          </div>
        </div>
      </div>
    </div>
    <my-mask :form="form" title="确认还款" v-if="!isMobile&&show" @submit="submit" @closeMask="closeMask" @onChange="onChange"></my-mask>
    <form class="form repayment_form" @submit.prevent="submit" novalidate v-if="isMobile&&show">
      <form-field :form="form" @onChange="onChange"></form-field>
      <button name="btn">确认提交</button>
      <div class="btn" @click="closeMask">取消</div>
    </form>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      MyMask, FormField
    },
    data () {
      return {
        form: [{name: '', type: 'select', title: '还款方式', option: [{id: 0, item: '算力收益'}, {id: 1, item: '资金用户'}], changeEvent: true}, {name: 'balance', type: 'text', title: '账户余额', value: 0, edit: 'balance'}, {name: 'totalMoney', type: 'text', title: '还款总额', value: 0, edit: 'totalMoney'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}],
        loanData: {0: {data1: '', data2: '', unit: 'btc'}, 1: {data1: '', data2: '', unit: '元'}},
        model: 0,
        item: {},
        moneydata: {},
        show: '',
        mode: '',
        detailId: '',
        repaymentId: ''
      }
    },
    methods: {
      items () {
        if (this.token !== 0 && this.detailId) {
          fetchApiData(this, 'getLoanListDetail', {token: this.token, loan_id: this.detailId}, (res) => {
            this.moneydata = res
            this.item = res.list
          })
        } else {
          setTimeout(() => {
            this.items()
          }, 5)
        }
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        let sendData = {token: this.token, repayment_id: this.repaymentId, product_hash_type: 1, mode: this.model, mobile: form.mobile.value, code: form.code.value}
        fetchApiData(this, 'repayment', sendData, (res) => {
          api.tips('提交成功', () => {
            this.show = false
            window.location.reload()
          })
        }, form.btn)
      },
      onChange (obj) {
        this.model = obj.e.target.value
        this.form[1].value = this.loanData[this.model].data1 + this.loanData[this.model].unit
        this.form[2].value = this.loanData[this.model].data2 + this.loanData[this.model].unit
        this.initBtn()
      },
      openMask (id, status) {
        if (status === 0) return false
        if (status === 2) {
          api.tips('未到还款日期')
          return false
        }
        this.repaymentId = id
        let sendData = {token: this.token, repayment_id: this.repaymentId, product_hash_type: 1, mode: 0}
        fetchApiData(this, 'showRepayment', sendData, (res) => {
          this.show = true
          this.loanData[0].data1 = res.user_coin_value
          this.loanData[0].data2 = res.coin_repayment
          this.loanData[1].data1 = res.user_balance
          this.loanData[1].data2 = res.repayment
          this.form[1].value = this.loanData[this.model].data1 + this.loanData[this.model].unit
          this.form[2].value = this.loanData[this.model].data2 + this.loanData[this.model].unit
          window.scroll(0, 0)
          document.body.style.overflow = 'hidden'
          setTimeout(() => {
            this.initBtn()
          }, 5)
        })
      },
      closeMask () {
        this.show = ''
        document.body.style.overflow = 'auto'
      },
      initBtn () {
        let form = document.querySelector('.form')
        let count_btn = document.querySelector('.count_btn')
        if (+this.loanData[this.model].data1 < +this.loanData[this.model].data2) {
          api.tips('余额不足')
          form && form.btn.setAttribute('disabled', true)
          count_btn.setAttribute('disabled', true)
        } else {
          form && form.btn.removeAttribute('disabled')
          count_btn.removeAttribute('disabled')
        }
        if (this.isMobile) {
          this.form[1].value += '(余额)'
          this.form[2].value += '(需支付)'
        }
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
        mobile: state => state.info.mobile,
        isMobile: state => state.isMobile
      })
    },
    filters: {
      format: api.f
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .repayment_detail{
    .pc_box {
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
            &:not(:last-child) {
              border-right:1px solid #e5e5e5;
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
              &.no {
                background:none;
                color:gray;
              }
              &.not_yet {
                background:none;
                color:gray;
                width:120px;
              }
            }
          }
        }
      }
    }
    .mobile_box {
      font-size: 0.3rem;;
      background: #f5f5f9;
      min-height: calc(100vh -0.88rem);
      .box_list {
        background: #fff;
        padding:0 0.3rem;
        .item {
          @include flex(space-between)
          padding: 0.24rem 0;
          .item_left {

          }
          .item_right {
            text-align: right;
          }
          .item_text {
            margin-bottom: 3px
          }
          .item_tips {
            font-size: 0.24rem;
            color: $light_text
          }
          &.active, &.active .item_tips {
            color: $light_black
          }
          &:not(:last-child) {
            border-bottom: 1px solid $border
          }
        }
      }
    }
    .repayment_form {
      background: #fff;
      min-height: calc(100vh - 0.88rem);
      @include form(v)
    }
  }
</style>
