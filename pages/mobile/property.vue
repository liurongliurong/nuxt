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
    <div class="popup" v-if="showModal">
      <div class="close" @click="closeEdit()">
        <span class="icon"></span>
      </div>
      <form class="form" @submit.prevent="submit" novalidate v-if="edit===1" style="box-sizing:border-box;margin-top:1rem;">
        <FormField :form="GetIncome"></FormField>
        <p>手续费：0.002btc</p>
        <button name="btn">提交</button>
      </form>
      <div class="popup_chart" v-if="edit===2">
        <IncomeChart></IncomeChart>
      </div>
    </div>
    <div class="popup_mask" v-if="showModal"></div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  import IncomeChart from '@/pages/user/incomeChart'
  export default {
    components: {
      FormField, IncomeChart
    },
    data () {
      return {
        nowEdit: 0,
        computeData: {today_hash: 0, balance_account: 0, total_hash: 0},
        compute: [{title: '现货资产'}, {title: '币价'}, {title: '单位挖矿产出'}],
        computeProperty: {total_miner: ['已购入云算力', '台'], total_hash: ['算力总和', 'T'], selled_miner: ['已出售云算力', '台'], selling_miner: ['出售中云算力', '台']},
        dataProperty: {total_miner: 0, total_hash: 0, selled_miner: 0, selling_miner: 0},
        GetIncome: [{name: 'product_hash_type', type: 'text', title: '算力类型', edit: 'hashType'}, {name: 'amount', type: 'text', title: '提取额度', placeholder: '请输入提取额度', changeEvent: true, pattern: 'coin', tipsInfo: '余额', tipsUnit: 'hash'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
        showSelect: false,
        edit: 0,
        showModal: false,
        fee: 0,
        total_price: 0,
        amount: 0,
        product_hash_type: '',
        qwsl: '',
        output: ''
      }
    },
    methods: {
      getData () {
        if (this.token !== 0) {
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
      },
      openMask (k) {
        if (k === 1) {
          this.total_price = 0
          if (!(this.true_name && this.true_name.status === 1)) {
            api.tips('请先实名认证', 1)
            return false
          }
          if (!this.address.length) {
            api.tips('请先绑定算力地址', 1, () => {
              if (this.isMobile) {
                this.$router.push({name: 'mobile-administration'})
              } else {
                this.$router.push({name: 'user-account'})
              }
            })
            return false
          }
          if (+this.computeData.balance_account <= 0 && this.edit !== 2) {
            api.tips('您的账户余额不足，不能提取收益', 1)
            return false
          }
          this.edit = k
          this.showModal = true
          var requestUrl = 'showWithdrawCoin'
          var data = {token: this.token, user_id: this.user_id, product_hash_type: this.hashType[this.nowEdit] && this.hashType[this.nowEdit].id}
          this.product_hash_type = this.hashType[this.nowEdit].name.toUpperCase()
          var self = this
          util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.fee = res.withdraw_coin_fee
              self.amount = res.coin_account
            })
          })
        } else {
          this.edit = k
          this.showModal = true
        }
      },
      submit () {
        var form = document.querySelector('.form')
        // if (document.querySelector('.form')[1].value < 0.001) {
        //   document.querySelector('.form')[1].value = '最小提取0.001'
        //   document.querySelector('.form')[1].style = 'color:red'
        //   return false
        // }
        var data = api.checkFrom(form, this, true)
        var sendData = {token: this.token, user_id: this.user_id}
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post('withdrawCoin', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.showModal = false
            api.tips('提币成功', 1)
          }, form.btn)
        })
      },
      onChange (e) {
        if (parseFloat(e.target.value) > parseFloat(this.amount)) {
          e.target.value = this.amount
        }
        this.total_price = e.target.value
      },
      closeEdit () {
        this.showModal = false
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
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
      padding-bottom: 0.8rem;
      .property_top{
        width: 100%;
        display: flex;
        padding:0 .5rem;
        box-sizing: border-box;
        justify-content: space-between;
        padding-top: 0.5rem;
        color: white;
        .left h1{
          font-size: 0.6rem;
        }
        .left p{
           font-size: 0.8rem;
        }
        .left i{
          font-weight: 100;
          font-size: 0.6rem;
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
            padding:0 5px;
            font-size: 0.6rem;
            span{
              @include triangle(bottom)
              margin-left:10px;
            }
          }
          .other{
            padding:0 5px;
            background: rgba(12, 90, 220, 0.75);
            color:#eee;
            line-height: 1.8;
            .item{
              font-size: 0.6rem;
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
        margin-top: 0.7rem;
        .left{
          width: 50%;
        }
        .left h1{
          font-size: 0.6rem;
        }
        .left p{
           font-size: 0.8rem;
        }
        .left i{
          font-weight: 100;
          font-size: 0.6rem;
        }
      }
    }
    ul{
        width: 100%;
        margin-top: 0.5rem;
        overflow: hidden;
        background:white;
        padding:0 .5rem;
        box-sizing: border-box;
        margin-bottom: 60px;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          height:2rem;
          border-bottom:1px solid #ddd;
          line-height: 2rem;
          span{
            color: #121212;
            font-size: 0.6rem;
          }
          i{
            color: #999999;
            font-size: 0.5rem;
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
