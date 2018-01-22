<template>
  <section class="mpropery">
    <div class="property">
      <img src="../../assets/images/beaut.png" style="width:100%;position:absolute;"/>
      <div class="property_top">
        <div class="left">
          <h1>今日获得收益</h1>
          <p>{{(+computeData.today_hash).toFixed(8)}} <i>{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</i></p>
        </div>
        <div class="mobile_select_hash">
          <div class="now_hash" @click="showList">{{hashType[nowEdit]&&hashType[nowEdit].name}}资产<span></span></div>
          <div class="other" v-if="showSelect">
            <div class="item" @click="setList(k)" v-for="n,k in hashType">{{n.name}}资产</div>
          </div>
        </div>
      </div>
      <div class="property_bottom">
        <div class="left" style="border-right:1px solid white;">
          <h1>累积获得收益</h1>
          <p>{{(+computeData.total_hash).toFixed(8)}} <i>{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</i></p>
        </div>
        <div class="left" style="padding-left:0.3rem;">
          <h1>账户余额</h1>
          <p>{{(+computeData.balance_account).toFixed(8)}} <i>{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</i></p>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="m,k in compute">
        <span>{{m.title}}</span>
        <i v-if="k===0">{{(qwsl.price * (+computeData.balance_account)).toFixed(2)}} CNY</i>
        <i v-if="k===1">{{qwsl.price}} CNY</i>
        <i v-else-if="k===2">{{output}}{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}} /T/天</i>
      </li>
      <li v-for="d,k in computeProperty">
        <span>{{d[0]}}</span>
        <i>{{dataProperty[k]}}{{d[1]}}</i>
      </li>
      <li @click="openMask(1)">
        <span>提取收益</span>
      </li>
      <li @click="openMask(2)" style="border-bottom:0;">
        <span>算力收益图表</span>
      </li>
    </ul>
    <MyMask :form="form" :title="title" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange">
      <p slot="fee">手续费：0.0002btc</p>
      <opr-select slot="select_opr" :no="maskNo" @closeMask="closeMask"></opr-select>
      <div class="popup_chart" slot="chart">
        <IncomeChart></IncomeChart>
      </div>
    </MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  import IncomeChart from '@/pages/user/incomeChart'
  import MyMask from '@/components/common/Mask'
  import OprSelect from '@/components/common/OprSelect'
  export default {
    components: {
      FormField, IncomeChart, MyMask, OprSelect
    },
    data () {
      return {
        nowEdit: 0,
        computeData: {today_hash: 0, balance_account: 0, total_hash: 0},
        compute: [{title: '现货资产'}, {title: '币价'}, {title: '单位收益产出'}],
        computeProperty: {total_miner: ['已购入云算力', '台'], total_hash: ['算力总和', 'T'], selled_miner: ['已出售云算力', '台'], selling_miner: ['出售中云算力', '台']},
        dataProperty: {total_miner: 0, total_hash: 0, selled_miner: 0, selling_miner: 0},
        GetIncome: [{name: 'product_hash_type', type: 'text', title: '算力类型', edit: 'hashType', value: ''}, {name: 'amount', type: 'text', title: '提取额度', placeholder: '请输入提取额度', changeEvent: true, pattern: 'coin', tipsInfo: '余额', value2: 0, tipsUnit: ''}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}],
        showSelect: false,
        edit: 0,
        fee: 0,
        total_price: 0,
        amount: 0,
        product_hash_type: '',
        qwsl: '',
        output: '',
        title: '',
        maskNo: 0,
        form: []
      }
    },
    methods: {
      getData () {
        if (this.token !== 0 && this.hashType.length) {
          var self = this
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
      },
      showList () {
        this.showSelect = !this.showSelect
      },
      setList (n) {
        this.showSelect = false
        this.nowEdit = n
        this.getList()
      },
      getList () {
        var self = this
        var nowHash = this.hashType[this.nowEdit]
        this.GetIncome[0].value =  nowHash.name
        this.GetIncome[1].tipsUnit = nowHash.name.toLowerCase()
        var sendData = {token: this.token, product_hash_type: nowHash.id || '1'}
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
      },
      openMask (k) {
        this.form = []
        if (k === 1) {
          this.total_price = 0
          if (!(this.true_name && this.true_name.status === 1)) {
            this.goAuth ('立即认证', 0)
            return false
          }
          if (!this.address.length) {
            this.goAuth ('立即绑定', 2)
            return false
          }
          if (+this.computeData.balance_account <= 0 && this.edit !== 2) {
            api.tips('您的账户余额不足，不能提取收益')
            return false
          }
          this.form = this.GetIncome
          var requestUrl = 'showWithdrawCoin'
          var data = {token: this.token, product_hash_type: this.hashType[this.nowEdit] && this.hashType[this.nowEdit].id}
          this.product_hash_type = this.hashType[this.nowEdit].name.toUpperCase()
          var self = this
          util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.fee = res.withdraw_coin_fee
              self.amount = res.coin_account
              self.GetIncome[1].value2 = res.coin_account
              self.edit = k
              self.title = '提取收益'
            })
          })
        } else {
          this.edit = k
          this.title = '收益图表'
        }
      },
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkForm(form, this.isMobile)
        var sendData = {token: this.token}
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post('withdrawCoin', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.edit = 0
            api.tips('提币成功')
          }, form.btn)
        })
      },
      onChange (obj) {
        var amount = this.GetIncome[1].value2
        if (parseFloat(obj.e.target.value) > parseFloat(amount)) {
          obj.e.target.value = amount
        }
        this.total_price = obj.e.target.value
      },
      closeMask () {
        this.edit = 0
      },
      goAuth (str, n) {
        this.title = str
        this.maskNo = n
        this.edit = 3
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile,
        mobile: state => state.info.mobile,
        hashType: state => state.hashType,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        address: state => state.info.address
      })
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/style.scss';
  .mpropery{
    background:#f5f5f9;
    .property{
      width: 100%;
      overflow: hidden;
      background:white;
      background: #327fff;
      padding-bottom: 0.43rem;
      .property_top{
        width: 100%;
        display: flex;
        padding:0 .3rem;
        box-sizing: border-box;
        justify-content: space-between;
        padding-top: 0.43rem;
        color: white;
        .left h1{
          font-size: 0.23rem;
        }
        .left p{
           font-size: 0.32rem;
        }
        .left i{
          font-weight: 100;
          font-size: 0.23rem;
          padding-top: 0.24rem;
        }
        .right{
          width: 3.3rem;
          height: 1rem;
          line-height: 0.9rem;
          text-align: center;
          border-radius: 1rem;
          border:1px solid white;
          margin-top: 0.6rem;
        }
        .mobile_select_hash{
          @include position(15,auto,auto,15)
          .now_hash{
            padding:0 0.43rem;
            font-size: 0.23rem;
            span{
              @include triangle(bottom)
              margin-left:10px;
            }
          }
          .other{
            padding:0 5px;
            padding:0 0.3rem;
            background: rgba(12, 90, 220, 0.75);
            color:#eee;
            line-height: 0.69rem;
            .item{
              font-size: 0.23rem;
            }
          }
        }
      }
      .property_bottom{
        width: 100%;
        display: flex;
        padding:0 .5rem;
        padding-right: 0;
        box-sizing: border-box;
        justify-content: space-between;
        color: white;
        margin-top: 0.91rem;
        .left{
          width: 50%;
        }
        .left h1{
          font-size: 0.23rem;
        }
        .left p{
           font-size: 0.32rem;
        }
        .left i{
          font-weight: 100;
          font-size: 0.23rem;
          padding-top: 0.24rem;
        }
      }
    }
    ul{
        width: 100%;
        margin-top: 0.2rem;
        overflow: hidden;
        background:white;
        padding:0 .5rem;
        padding:0 .3rem;
        box-sizing: border-box;
        margin-bottom: 60px;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          height:0.89rem;
          border-bottom:1px solid #ddd;
          line-height:0.89rem;
          span{
            color: #121212;
            font-size: 0.27rem;
          }
          i{
            color: #999999;
            font-size: 0.27rem;
          }
        }
    }
  }
  .tips_info span{
    font-size: 12px;
  }
  .mpropery .popup .form .input .tips_info{
    top:3px;
  }
</style>
