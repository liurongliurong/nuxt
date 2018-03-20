<template>
  <section class="pay">
    <div class="pc_box" v-if="isMobile===0">
      <div class="left_box">
        <div class="pay_info">
          <h3 class="title">确认订单信息</h3>
          <div class="pay_info_detail">
            <template v-for="d in proData">
              <div class="item">
                <p class="value"><span>{{detail[d]}}{{params[d].unit}}</span></p>
                <p>{{params[d].title}}</p>
              </div>
              <div class="line"></div>
            </template>
          </div>
        </div>
        <miner-address :addressObject="addressObject" :addressData="addressData" @getAddress="getAddress" @selectAddress="selectAddress" @openMask="openMask" v-if="params2==='1'"></miner-address>
        <div class="pay_profit" v-if="params2!=='1'">
          <h3 class="title">收益信息</h3>
          <div class="pay_profit_detail">
            <div class="item" v-for="n in mobileCloudNav">
              <span class="info_left">{{params[n].title}}</span>
              <span class="info_right">{{cloudMinerData[n]||'暂无'}}<em>{{params[n].unit}}</em></span>
            </div>
          </div>
        </div>
        <hire-purchase :totalPrice="totalPrice*loan" :rateList="rateList" :rate="rate" @setRate="setRate" v-if="detail.isLoan"></hire-purchase>
        <div class="pay_form">
          <h3 class="title">支付订单信息</h3>
          <div :class="['pay_text',{active:payNo===2}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setPayNo(2)" checked>
              <span class="zhifubao">支付宝</span>
            </label>
            <div class="pay_info">
              <span>支付</span>
              <span class="money">{{totalPrice*(1-loan)|format}}</span>
              <span>元</span>
            </div>
          </div>
          <div :class="['pay_text',{active:payNo===1}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setPayNo(1)">
              <span class="yue">账户余额{{balance}}元</span>
            </label>
            <div class="pay_info">
              <span>金额不足，可先</span>
              <a href="javascript:;" @click="goRecharge('/user/recharge')">充值</a>
            </div>
          </div>
          <form class="form payForm" action="" @submit.prevent="pay" novalidate>
            <input type="hidden" name="mobile" :value="mobile">
            <FormField :form="form" class="form" v-if="payNo===1"></FormField>
             <label for="accept">
              <input type="checkbox" checked id="accept" name="accept">
              <span @click="openMask(1)">阅读并接受<a href="javascript:;" v-if="params2==='1'">《算力服务器销售协议》</a><template v-else><a href="javascript:;">《云算力销售协议》</a>、<a href="javascript:;">《云算力托管协议》</a></template></span>
            </label> 
            <button name="btn">确认支付</button>
          </form>
        </div>
      </div>
      <div :class="['right_box', {fix_top:isFixTop}]">
        <div class="order_title">订单信息</div>
        <div class="item">
          <span>总算力</span>
          <span>{{number*detail.hash}}T</span>
        </div>
        <div class="item" v-if="detail.isLoan">
          <span>总金额</span>
          <span class="price">￥{{totalPrice|format}}元</span>
        </div>
        <div class="item">
          <span>支付金额</span>
          <span class="price">￥{{totalPrice*(1-loan)|format}}元</span>
        </div>
      </div>
    </div>
    <div class="mobile_box" v-else-if="isMobile===1">
      <div class="confirm_data">
        <div class="confirm_value">
          <div class="data_img_name">
            <div class="data_img">
              <img :src="detail.img" alt="">
            </div>
            <div class="data_name">
              <div class="name">{{detail.name}}</div>
              <div class="hash">{{detail.hash}}T算力</div>
            </div>
          </div>
          <div class="data_price_number">
            <div class="data_price">￥{{detail.one_amount_value}}</div>
            <div class="data_number">&times;{{detail.number}}</div>
          </div>
        </div>
        <div class="confirm_price">
          <span>应付金额</span>
          <span class="val">￥<i>{{totalPrice}}</i></span>
        </div> 
      </div>
      <div class="mobile_address" v-if="params2==='1'">
        <div class="address_box" @click="selectAddress" v-if="addressObject.id">
          <h3 :class="{active:addressObject.is_default}">收货人地址：{{addressObject.post_user+'  '+addressObject.post_mobile}}</h3>
          <p>{{addressObject.province_name+addressObject.city_name+addressObject.area_name+addressObject.area_details}}</p>
        </div>
        <div class="address_btn" @click="selectAddress" v-else>使用新地址</div>
        <div class="address_text" v-if="addressObject.id">配送费用：第三方物流、费用到付</div>
      </div>
      <div class="confirm_info" v-if="params2!=='1'">
        <div class="item" v-for="m in mobileCloudNav">
          <span>{{params[m].title}}</span>
          <span>{{cloudMinerData[m]+params[m].unit}}</span>
        </div>
      </div>
      <form action="" class="form" @submit.prevent="pay" novalidate>
        <div class="pay_item" @click="openMask(3)">
          <span>支付方式</span>
          <span>{{payNo===1?'余额支付':'支付宝'}}</span>
        </div>
        <input type="hidden" name="mobile" :value="mobile">
        <FormField :form="form" v-if="payNo===1"></FormField>
        <label for="accept">
          <input type="checkbox" checked id="accept" name="accept">
          <span @click="openMask(1)">阅读并接受<a href="javascript:;" v-if="params2==='1'">《算力服务器销售协议》</a><template v-else><a href="javascript:;">《云算力销售协议》</a>、<a href="javascript:;">《云算力托管协议》</a></template></span>
        </label>
        <div class="mobile_btn">
          <button name="btn">确认支付</button>
        </div>
      </form>
    </div>
    <my-mask :form="addressForm" :title="title" position="bottom" :contract="contract" v-if="edit" @submit="submit" @closeMask="closeMask">
      <pay-type slot="pay_type" @setPayNo="setPayNo" :payNo="payNo" :balance="+balance"></pay-type>
    </my-mask>
  </section>
</template>

<script>
  import util, { fetchApiData } from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { post_address } from '@/util/form'
  import FormField from '@/components/common/FormField'
  import MyMask from '@/components/common/Mask'
  import PayType from '@/components/common/PayType'
  import MinerAddress from '@/components/miner/MinerAddress'
  import HirePurchase from '@/components/miner/HirePurchase'
  export default {
    components: {
      FormField, MyMask, PayType, MinerAddress, HirePurchase
    },
    data () {
      return {
        params: {
          name: {title: '服务器名称', unit: ''},
          one_amount_value: {title: '服务器单价', unit: '元'},
          number: {title: '购买数量', unit: '台'},
          hash: {title: '每台算力', unit: 'T'},
          hashType: {title: '算力类型', unit: ''},
          incomeType: {title: '结算方式', unit: ''},
          output: {title: '预期收益', unit: 'btc/T/天'},
          total_electric_fee: {title: '预计支出费用', unit: 'btc/台/天'},
          batch_area: {title: '批次所在区域', unit: ''},
          contract_time: {title: '合约周期', unit: ''},
          electric_fee: {title: '电费', unit: '元/度'},
          safeguard_time: {title: '停电维护', unit: ''},
          settle_time: {title: '结算周期', unit: ''},
          trust_fee: {title: '托管费', unit: '元/台/月'}
        },
        proData: ['name', 'one_amount_value', 'number', 'hash'],
        cloudMinerNav: ['output', 'total_electric_fee', 'batch_area', 'hashType', 'incomeType'],
        mobileCloudNav: ['electric_fee', 'trust_fee', 'contract_time', 'settle_time', 'safeguard_time', 'batch_area'],
        thead: [{title: '选择'}, {title: '分期金额（元）'}, {title: '分期期数'}, {title: '手续费率'}, {title: '每期应还（元）'}, {title: '每期手续费（元）'}],
        form: [{name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6, value2: 0, value3: 0}],
        address: post_address,
        totalPrice: 0,
        edit: false,
        contract: '',
        addressData: [],
        addressObject: {},
        addressForm: [],
        rateList: [],
        loan: 0,
        payNo: 2,
        rate: 3,
        isFixTop: false,
        params1: '',
        params2: '',
        detail: {},
        cloudMinerData: {},
        number: 0,
        balance: 0
      }
    },
    methods: {
      pay (e) {
        var ff = e.target
        var url = ''
        var callbackUrl = ''
        var data = {token: this.token}
        if (this.payNo === 1) {
          var val = ff.code.value
          data = Object.assign({code: val, mobile: ff.mobile.value}, data)
          if (this.totalPrice > +this.balance) {
            api.tips('余额不足，请充值')
            return false
          }
          if (!val) {
            api.tips('短信验证码不能为空')
            return false
          } else if (!api.check('^[0-9]{6}$', ff.code.value)) {
            if (this.isMobile) {
              api.tips('请输入6位数字')
            }
            return false
          }
        } else {
          callbackUrl = location.protocol + '//' + location.host
        }
        if (!ff.accept.checked) {
          api.tips('请同意服务条款')
          return false
        }
        if (this.isMobile) {
          callbackUrl += '/mobile/'
        } else {
          callbackUrl += '/user/'
        }
        if (this.params2 === '1') {
          if (!this.addressObject.id) {
            api.tips('请添加地址')
            return false
          }
          url = 'saveMiner'
          callbackUrl += 'order/3'
          if (this.payNo === 2) {
            data = Object.assign({url: callbackUrl, mode: '2'}, data)
          }
          data = Object.assign({post_id: this.addressObject.id, miner_id: this.params1, number: this.number}, data)
        } else {
          callbackUrl += 'order/0'
          if (this.detail.isLoan) {
            url = 'productMallLoan'
            if (this.payNo === 2) {
              data = Object.assign({url: callbackUrl, mode: '3'}, data)
            }
            data = Object.assign({product_id: this.params1, rate_name: this.rate, num: this.number}, data)
          } else {
            url = 'productMall'
            if (this.payNo === 2) {
              data = Object.assign({url: callbackUrl, mode: '1'}, data)
            }
            data = Object.assign({product_id: this.params1, num: this.number}, data)
          }
        }
        ff.btn.setAttribute('disabled', true)
        fetchApiData(this, url, data, (res) => {
          this.paySuccess(callbackUrl, res, ff.btn)
        }, ff.btn)
      },
      paySuccess (url, data, btn) {
        var str = '恭喜您购买成功！'
        if (this.payNo === 2) {
          this.alipay(url, data)
          btn.removeAttribute('disabled')
        } else {
          api.tips(str, () => {
            api.setStorge('info', {payType: this.params2, addressData: this.addressObject})
            this.$router.push({path: '/minerShop/paySuccess'})
          })
        }
      },
      alipay (url, data) {
        if (api.checkWechat()) {
          api.tips('请在浏览器里打开')
          return false
        }
        data.subject = encodeURIComponent(data.subject)
        fetchApiData(this, 'alipay_wap', Object.assign({is_mobile: +this.isMobile, url: url, token: this.token}, data), (resData) => {
          location.href = resData.url
        })
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        data.is_default = 1
        data.token = this.token
        fetchApiData(this, 'addAddress', data, (res) => {
          this.getAddress()
          api.tips('添加成功')
          this.closeMask()
        }, form.btn)
      },
      openMask (n) {
        document.body.style.overflow = 'hidden'
        window.scroll(0, 0)
        this.edit = n
        this.addressForm = []
        this.contract = ''
        if (n === 1) {
          this.contract = this.content1 ? this.content + '<br>' + this.content1 : this.content
          this.title = '协议详情'
        } else if (n === 2) {
          this.addressForm = this.address
          this.title = '收货地址'
        } else if (n === 3) {
          this.title = '支付方式'
        }
      },
      closeMask () {
        document.body.style.overflow = 'auto'
        this.edit = false
      },
      setRate (n) {
        this.rate = +n
      },
      setPayNo (k) {
        this.payNo = k
        this.closeMask()
      },
      fixTop (e) {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 5) {
          this.isFixTop = true
        } else {
          this.isFixTop = false
        }
      },
      getAddress () {
        fetchApiData(this, 'showAddress', {token: this.token}, (res) => {
          this.addressData = res
          this.addressObject = this.addressData[0] || {}
        })
      },
      selectAddress (k) {
        if (this.isMobile) {
          this.$store.commit('SET_ADDRESS', {url: this.params1 + '/' + this.params2, num: this.number})
          this.$router.push({path: '/mobile/address?select'})
        } else {
          this.addressObject = this.addressData[k]
        }
      },
      goRecharge (url) {
        this.$store.commit('SET_URL', this.$route.path)
        this.$router.push({path: url})
      },
      pageInit () {
        if (this.token && this.number) {
          this.totalPrice = this.detail.one_amount_value * +this.number
          this.form[0].value2 = this.detail.one_amount_value
          this.form[0].value3 = +this.number
          if (this.addressObj.id) {
            this.addressObject = this.addressObj
          } else if (this.params2 === '1') {
            this.getAddress()
          }
          var url = ''
          var data = {token: this.token, num: this.number}
          if (this.params2 === '1') {
            url = 'buy_miner'
            data = Object.assign({miner_id: this.params1}, data)
          } else {
            url = 'productOrder'
            data = Object.assign({product_id: this.params1}, data)
          }
          fetchApiData(this, url, data, (res) => {
            this.balance = +res.balance
            if (res.output) {
              this.detail.output = res.output
              this.detail.total_electric_fee = res.total_electric_fee
            }
            if (this.detail.isLoan) {
              this.content = res.part_content
              this.rateList = res.period_num
              this.rate = this.rateList[0] && +this.rateList[0].num
              this.loan = +res.loan_limit
              if (this.isMobile) {
                this.totalPrice = this.totalPrice - this.detail.loanPrice
                this.rate = this.detail.rate
              }
            } else {
              this.content = res.content
            }
            if (this.params2 !== '1') {
              this.content1 = res.content1
            }
          })
          if (!this.detail.bdc_id) return false
          util.post('bdc_info', {token: this.token, bdc_id: this.detail.bdc_id}).then((res) => {
            this.cloudMinerData = {...res.msg, batch_area: this.detail.batch_area}
          })
        } else {
          setTimeout(() => {
            this.pageInit()
          }, 5)
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.fixTop, false)
      var p = api.getStorge('suanli')
      var p2 = api.getStorge('info')
      if (p.proId) {
        this.params1 = p.proId
        this.params2 = p.proType
      } else {
        this.$router.push({path: '/minerShop/detail'})
      }
      if (p2) {
        this.detail = p2
        this.number = this.detail.number
      } else {
        this.$router.push({path: '/minerShop/detail'})
      }
      this.pageInit()
    },
    filters: {
      format: api.decimal
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        isMobile: state => state.isMobile,
        trade_password: state => state.info.trade_password,
        addressObj: state => state.addressData
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .pay{
    @include main
    color: #999;
    .pc_box {
      @include flex(flex-start,flex-start)
      .left_box{
        width:calc(100% - 280px);
        h3.title{
          font-size: 16px;
          font-weight: bold;
          color: #333;
          padding: 10px 15px;
          border-top: 2px solid $blue_border;
          background: #FAFAFA;
        }
        .pay_info{
          .pay_info_detail{
            @include flex(space-between);
            background: #fff9f3;
            margin: 20px 0;
            color: #999;
            padding: 25px;
            text-align: center;
            .item{
              .value{
                color:#333;
                span {
                  font-size: 20px;
                }
              }
            }
            .line:not(:last-child){
              width:1px;
              height:35px;
              background: $border;
            }
            .line:last-child{
              display: none;
            }
          }
        }
        .pay_profit{
          .pay_profit_detail{
            padding: 20px 60px;
            .item{
              span{
                line-height: 2;
              }
              .info_left{
                width: 121px;
                display:inline-block;
                text-align: right;
                margin-right: 54px;
              }
              .info_right{
                font-size: 16px;
                color: #121212;
                font-weight: 800;
                em{
                  font-style: normal;
                  margin-left: 10px;
                  font-weight: 100;
                  color:$light_text;
                  font-size: 13px;
                }
              }
            }
          }
        }
        .pay_form{
          margin-top: 20px;
          background:$white;
          .pay_text{
            @include pay_type
          }
          form{
            padding:15px;
            @include form(h,1)
            width:400px;
            margin:30px auto 0 auto;
            .input{
              margin-bottom: 15px;
              input{
                height:42px;
              }
              .count_btn {
                top: 0;
                right: 0;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                height: 42px;
                line-height: 42px;
              }
            }
            label{
              color: #666;
              input{
                @include checkbox(18)
              }
              span{
                margin-left:10px;
                a{
                  color:#327fff;
                }
              }
            }
            button{
              background: #FE5038;
              border-color: #FE5038;
              margin: 10px 0;
              line-height: 2.2;
            }
          }
        }
      }
      .right_box{
        position: fixed;
        right:calc(50% - 590px);
        width:260px;
        margin-left:20px;
        border:1px solid $blue_border;
        padding:15px 15px 30px 15px;
        background: #F2F6FF;
        line-height: 2.4;
        color:$text;
        top:80px;
        transition: all .3s;
        .item{
          border-top:1px solid $blue_border;
          @include flex(space-between)
          .price{
            color:$orange;
            font-weight: bold;
            font-size: 18px;
          }
        }
        &.fix_top{
          top:0
        }
      }
    }
    .mobile_box {
      min-height: calc(100vh - 0.88rem);
      padding-bottom: 57px;
      font-size: 0.3rem;
      color:$text;
      background: #F1F2F7;
      padding-top: 0.2rem;
      .mobile_address {
        padding: 15px 0.3rem;
        background: #fff;
        margin-bottom: 0.2rem;
        .address_box:before,.address_box:after,.address_btn:after {
          @include position(13,auto,auto,0)
        }
        .address_box:after,.address_btn:after {
          content:'';
          @include block(8)
          @include arrow
        }
        .address_box {
          position: relative;
          padding-bottom: 10px;
          &:before {
            left: -5px;
            right: auto;
            font-family: "iconfont" !important;
            content: '\e641';
            font-size: 20px;
          }
          &:after {
            top: 20px;
          }
          h3,p {
            margin-left: 15px;
            font-size: 0.3rem;
          }
          h3{
            position: relative;
            &.active:after{
              content:'默认';
              @include position(10,auto,auto,25)
              font-size: 12px;
              font-weight: normal;
              border:1px solid $orange;
              border-radius:3px;
              padding:0 8px;
              color:$orange
            }
          }
          p{
            @include ellipsis(2)
          }
        }
        .address_btn:after {
          top:23px
        }
        .address_text {
          font-size: 12px;
          color: $light_text;
          border-top: 1px solid $border;
          padding-top: 10px;
        }
      }
      .confirm_data {
        background: #fff;
        padding: 0.3rem;
        margin-bottom: 0.2rem;
        .confirm_value,.confirm_price {
          @include flex(space-between)
        }
        .confirm_value {
          border-bottom: 1px solid $border;
          padding-bottom: 0.3rem;
          .data_img_name {
            @include flex
            .data_img{
              width: 90px;
              height: 70px;
              text-align: center;
              border: 1px solid $border;
              margin-right: 0.3rem;
              img{
                width:60px;
                height: 50px;
                margin-top: 10px;
                object-fit: contain;
              }
            }
            .data_name {
              .name {
                font-size: 0.36rem;
                font-weight: bold;
              }
              .hash {
                color: $light_text;
                font-size: 0.3rem;
              }
            }
          }
          .data_price_number{
            text-align: right;
            .data_price {
              margin-bottom: 15px;
            }
          }
        }
        .confirm_price {
          padding-top: 0.3rem;
          .val{
            color:$orange;
            i {
              font-size: 0.4rem;
            }
          }
        }
      }
      .confirm_info {
        padding: 0.3rem;
        background: #fff;
        margin-bottom: 0.2rem;
        .item{
          @include flex(space-between)
          line-height: 30px;
          color:$light_black;
          span:last-child{
            color:$text
          }
        }
      }
      .form {
        @include form(h,1)
        .form_field{
          padding:0.3rem;
          background: #fff;
        }
        .pay_item{
          padding:0 0.3rem;
          background: #fff;
          @include flex(space-between)
          line-height: 50px;
          span:last-child:after{
            content:'';
            @include block(8)
            @include arrow
          }
        }
        label{
          display: block;
          padding: 0.3rem;
          font-size: 0.28rem;
          color: #666;
          input{
            @include checkbox(18)
          }
          span{
            margin-left:10px;
            a{
              color:#327fff;
            }
          }
        }
        .mobile_btn{
          @include mobile_footer_btn
          button{
            margin: 0;
          }
        }
      }
    }
  }
</style>
