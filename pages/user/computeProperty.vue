<template>
  <section class="compute_property">
    <h2>个人中心</h2>
    <h3>资金账户</h3>
    <div class="compute_box money_box">
      <div class="data">
        <template v-for="d,k in moneyNav">
          <div class="item">
            <div class="frozeeData" v-if="k==='freeze_account'">
              <span>{{d}}</span>
              <span class="problem">?</span>
              <div class="frozee_tips">暂时不能使用的资金</div>
            </div>
            <p v-else>{{d}}</p>
            <span class="currency">{{moneyData[k]|currency}}</span>
            <span class="">元</span>
          </div>
          <div class="line"></div>
        </template>
      </div>
      <div class="btn">
        <button @click="openMask('recharge')">充值</button>
        <button @click="openMask('withdrawals', '资金提现')">提现</button>
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
            <div class="frozeeData" v-if="k==='today_hash'">
              <span>{{d}}</span>
              <span class="problem">?</span>
              <div class="frozee_tips">派发一天前收益，如:2号派发1号收益</div>
            </div>
            <p v-else>{{d}}</p>
            <span class="currency">{{computeData[k]|format(8)}}</span>
            <span class="">{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</span>
          </div>
          <div class="line"></div>
        </template>
      </div>
      <div class="btn">
        <router-link to="/user/incomeChart">收益图表</router-link>
        <button @click="openMask('getIncome', '提取收益')">提取收益</button>
      </div>
    </div>
    <div class="compute_box compute_account">
      <div class="data">
        <div class="item">
          <div class="frozeeData">
            <span>冻结资产</span>
            <span class="problem">?</span>
            <div class="frozee_tips">提币申请后，会暂时放入冻结数量中</div>
          </div>
          <span class="currency">{{computeData.freeze_coin_withdraw_account}}</span>
          <span class=""> {{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</span>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="frozeeData">
            <span>现货资产</span>
            <span class="problem">?</span>
            <div class="frozee_tips">币价:{{computeData2.coin_price}}CNY</div>
          </div>
          <span>≈ </span>
          <span class="currency">{{(computeData2.coin_price * computeData.balance_account)|format(1)}}</span>
          <span class=""> CNY</span>
        </div>
        <div class="line"></div>
        <div class="item">
          <p>单位收益产出</p>
          <span>≈ </span>
          <span class="currency">{{computeData2.out_put&&computeData2.out_put.split(" ")[0]}}</span>
          <span class=""> {{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}/T/天</span>
        </div>
        <div class="line"></div>
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
      <router-link to="/user/bitCalculator">收益计算器</router-link>
      <router-link to="/user/order/0">出售云算力</router-link>
      <router-link to="/user/order/0">查看订单</router-link>
    </div>
    <MyMask :form="form[edit]" :title="editText" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange">
      <template slot="fee">
        <p v-if="edit==='withdrawals'">手续费：{{total_price * fee|format}}元<span class="fee">({{fee*100+'%'}})</span></p>
        <p v-if="edit==='getIncome'">手续费：0.0002btc</p>
      </template>
      <opr-select slot="select_opr" :no="maskNo" @closeMask="closeMask"></opr-select>
    </MyMask>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { getIncome, withdrawals } from '@/util/form'
  import MyMask from '@/components/common/Mask'
  import OprSelect from '@/components/common/OprSelect'
  export default {
    components: {
      MyMask, OprSelect
    },
    data () {
      return {
        nowEdit: 0,
        moneyNav: {account: '总资金', freeze_account: '冻结资金', balance_account: '账户余额'},
        moneyData: {account: 0, freeze_account: 0, balance_account: 0},
        computeNav: {today_hash: '今日收益', balance_account: '账户余额', total_hash: '累积已获得收益'},
        computeData: {today_hash: 0, balance_account: 0, total_hash: 0, freeze_coin_withdraw_account: 0},
        computeData2: {coin_price: 0, out_put: 0},
        computeProperty: {total_miner: ['已购入云算力', '台'], total_hash: ['算力总和', 'T'], selled_miner: ['已出售云算力', '台'], selling_miner: ['出售中云算力', '台']},
        dataProperty: {total_miner: 0, total_hash: 0, buy_transfer_hash: 0, selled_miner: 0, selling_miner: 0, selled_hash: 0, selling_hash: 0},
        computeFund: {total_miner: ['云算力', '台'], total_hash: ['云算力总和', 'T'], selled_miner: ['已出租云算力', 'T'], selling_miner: ['出租中云算力', 'T']},
        dataFund: {total_miner: 0, total_hash: 0, selled_miner: 0, selling_miner: 0},
        edit: '',
        form: {getIncome, withdrawals},
        editText: '',
        fee: 0,
        total_price: 0,
        maskNo: 0
      }
    },
    methods: {
      openMask (str, title) {
        this.total_price = 0
        if (!(this.true_name && this.true_name.status === 1)) {
          this.goAuth ('立即认证', 0)
          return false
        }
        var requestUrl = ''
        var data = {}
        if (str === 'recharge') {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'user-recharge'})
          return false
        }
        if (str === 'getIncome') {
          if (!this.address.length) {
            this.goAuth ('立即绑定', 2)
            return false
          }
          if (+this.computeData.balance_account <= 0) {
            api.tips('您的账户余额不足，不能提取收益')
            return false
          }
          var nowHash = this.hashType[this.nowEdit]
          requestUrl = 'showWithdrawCoin'
          data = {token: this.token, product_hash_type: nowHash && nowHash.id}
        }
        if (str === 'withdrawals') {
          if (!(this.bank_card && this.bank_card.status === 1)) {
            this.goAuth ('立即绑定', 1)
            return false
          }
          if (+this.moneyData.balance_account <= 0) {
            api.tips('您的账户余额不足，不能提现')
            return false
          }
          requestUrl = 'showWithdraw'
          data = {token: this.token}
        }
        fetchApiData(this, requestUrl, data, (res) => {
          if (str === 'withdrawals') {
            this.fee = res.withdraw_fee
            this.form.withdrawals[0].value2 = parseInt(res.balance_account)
          } else if (str === 'getIncome') {
            this.fee = res.withdraw_coin_fee
            this.form.getIncome[1].value2 = res.coin_account
          }
          window.scroll(0, 0)
          document.body.style.overflow = 'hidden'
          this.editText = title
          this.edit = str
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
        var nowHash = this.hashType[this.nowEdit]
        this.form.getIncome[0].value = nowHash.name
        this.form.getIncome[1].tipsUnit = nowHash.name.toLowerCase()
        var sendData = {token: this.token, product_hash_type: (nowHash && nowHash.id) || '1'}
        fetchApiData(this, 'myHashAccount', sendData, (res) => {
          this.computeData = res
        })
        fetchApiData(this, 'myHashAccountOut', sendData, (res) => {
          this.computeData2 = res
        })
        fetchApiData(this, 'hashAsset', sendData, (res) => {
          this.dataProperty = res
        })
        fetchApiData(this, 'hashFund', sendData, (res) => {
          this.dataFund = res
        })
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        var url = ''
        var sendData = {token: this.token}
        var tipsStr = ''
        switch (this.edit) {
          case 'withdrawals':
            url = 'withdraw'
            tipsStr = '提现成功'
            break
          case 'getIncome':
            url = 'withdrawCoin'
            tipsStr = '提币成功'
            break
        }
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        fetchApiData(this, url, Object.assign(data, sendData), (res) => {
          this.closeMask()
          api.tips(tipsStr, () => {
            window.location.reload()
          })
        }, form.btn)
      },
      onChange (obj) {
        var value = obj.e.target.value
        var amount = this.edit === 'getIncome' ? this.form.getIncome[1].value2 : this.form.withdrawals[0].value2
        if (parseFloat(value) > parseFloat(amount)) {
          obj.e.target.value = amount
        }
        this.total_price = obj.e.target.value
      },
      getData () {
        if (this.token !== 0 && this.hashType.length) {
          fetchApiData(this, 'myAccount', {token: this.token}, (res) => {
            this.moneyData = {...res, account: +res.freeze_account + (+res.balance_account)}
          })
          this.getList()
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      goAuth (str, n) {
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
        this.editText = str
        this.maskNo = n
        this.edit = 'auth'
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
    .compute_box{
      margin: 25px 0;
      @include flex(space-between)
      margin-bottom:10px;
      .data{
        width:79%;
        @include detail_data
        .item{
          position: relative;
          width:34%;
          padding-right: 15px;
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
              line-height: 20px;
              color:$light_text;
              width:130px;
              position: absolute;
              top: -12px;
              left: 88px;
              padding: 5px 10px;
              background: $border;
              display: none;
            }
          }
        }
      }
      .btn{
        @include detail_btn
        padding: 0 25px;
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
