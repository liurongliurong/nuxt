<template>
  <section class="pay">
    <div class="pc_box" v-if="isMobile===0">
      <div class="left_box">
        <div class="order_msg address_msg" v-if="params2==='1'">
          <h3 class="title">选择收货地址</h3>
          <div class="address_box">
            <div :class="['item',{active:a.id===addressObject.id}]" v-for="a,k in addressShowData">
              <span @click="selectAddress(k)">{{a.province_name+a.city_name+a.area_name+a.area_details+'('+a.post_user+' 收) '+a.post_mobile}}</span>
              <span v-if="a.is_default">默认地址</span>
              <span class="set_default" v-else @click="setDefault(a.id)">设为默认地址</span>
            </div>
            <div class="address_btn" @click="openMask(2)">使用新地址</div>
            <div class="all_address_btn" @click="allAddress" v-if="addressData.length>3">查看所有地址</div>
          </div>
        </div>
        <div class="order_msg order_info">
          <h3 class="title">确认订单信息</h3>
          <div class="order_detail">
            <div class="order_detail_info1">
              <template v-for="d in params2==='1'?proData2:proData1">
                <div class="item">
                  <p class="value"><span>{{detail[d]}}{{params[d].unit}}</span></p>
                  <p>{{params[d].title}}</p>
                </div>
                <div class="line"></div>
              </template>
            </div>
            <div class="order_detail_info2" v-if="params2!=='1'">
              <div class="item" v-for="t in proText">{{params[t].title}}：
                <span class="value" v-if="t==='hash'">{{detail[t]}}T</span>
                <span class="value" v-else>{{detail[t]}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="order_msg miner_info" v-if="params2!=='1'">
          <h3 class="title">挖矿收益信息</h3>
          <div class="miner_info_detail">
            <div class="item" v-for="n in cloudMinerNav">
              <span class="info_left">{{params[n].title}}</span>
              <span class="info_right">{{detail[n]||'暂无'}}<em>{{params[n].unit}}</em></span>
            </div>
          </div>
        </div>
        <div class="order_msg hire_purchase" v-show="detail.isLoan">
          <h3 class="title">分期购买计划</h3>
          <div class="order_detail">
            <table border="0">
               <thead>
                 <tr>
                   <th v-for="n,k in thead">{{n.title}}</th>
                 </tr>
               </thead>
               <tbody>
                 <tr :class="{active: rate===3}">
                   <td><input type="radio" class="teradio" name="qi" @click="setValue('rate',3)" checked/></td>
                   <td>{{totalPrice}}</td>
                   <td>3期</td>
                   <td>2%</td>
                   <td>{{(totalPrice/3 + (totalPrice*0.02)).toFixed(2)}}（含每期手续费）</td>
                   <td>{{(totalPrice*0.02).toFixed(2)}}</td>
                 </tr>
                 <tr :class="{active: rate===6}">
                   <td><input type="radio" name="qi" class="teradio" @click="setValue('rate',6)"/></td>
                   <td>{{totalPrice}}</td>
                   <td>6期</td>
                   <td>3%</td>
                   <td>{{(totalPrice/6 + (totalPrice*0.03)).toFixed(2)}}（含每期手续费）</td>
                   <td>{{(totalPrice*0.03).toFixed(2)}}</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </div>
        <div class="order_msg order_pay">
          <h3 class="title">支付订单信息</h3>
          <div :class="['pay_text',{active:payNo===2}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setValue('payNo',2)" checked>
              <span class="zhifubao">支付宝</span>
            </label>
            <div class="pay_info">
              <span>支付</span>
              <span class="money" style="font-size:16px;">{{totalPrice|format}}</span>
              <span>元</span>
            </div>
          </div>
          <div :class="['pay_text',{active:payNo===1}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setValue('payNo',1)">
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
              <input type="checkbox" :checked="accept" id="accept" name="accept" @click="setValue('accept',true)">
              <span @click="openMask(1)">阅读并接受<a href="javascript:;">《矿机销售协议》</a><template v-if="params2!=='1'">和<a href="javascript:;">《矿机托管协议》</a></template></span><br>
              <span class="select_accept">{{tips}}</span>
            </label> 
            <button name="btn">确认支付</button>
          </form>
        </div>
      </div>
      <div :class="['right_box', {fix_top:isFixTop}]">
        <div class="order_title">订单信息</div>
        <div class="item">
          <span>总算力</span>
          <span style="font-size:13px;">{{number*detail.hash}}T</span>
        </div>
        <div class="item" v-if="detail.isLoan">
          <span>总金额</span>
          <span class="price">￥{{totalPrice*2|format}}元</span>
        </div>
        <div class="item">
          <span>支付金额</span>
          <span class="price" style="font-size:16px;">￥{{totalPrice|format}}元</span>
        </div>
      </div>
    </div>
    <div class="mobile_box" v-else-if="isMobile===1">
      <div class="mobile_address" v-if="params2==='1'">
        <div class="address_box" @click="selectAddress" v-if="addressObject.id">
          <h3 :class="{active:addressObject.is_default}">收货人地址：{{addressObject.post_user+'  '+addressObject.post_mobile}}</h3>
          <p>{{addressObject.province_name+addressObject.city_name+addressObject.area_name+addressObject.area_details}}</p>
        </div>
        <div class="address_btn" @click="selectAddress" v-else>使用新地址</div>
      </div>
      <div class="price">
        <span>应付金额：</span>
        <span class="val">{{totalPrice}}元</span>
      </div>
      <div class="confirm_info">
        <div class="item" v-for="m in params2 === '1'?mobileNav2:mobileNav1">
          <span>{{params[m].title}}</span>
          <span v-if="m==='number'">{{number}}{{params[m].unit}}</span>
          <span v-else>{{detail[m]}}{{params[m].unit}}</span>
        </div>
      </div>
      <div class="confirm_info confirm_info2" v-if="params2==='1'">
        <div class="item">
          <span>配送费用</span>
          <span>第三方物流、费用到付</span>
        </div>
      </div>
      <form action="" class="form payForm2" @submit.prevent="pay" novalidate>
        <div class="pay_item" @click="openMask(3)">
          <span>支付方式</span>
          <span>{{payNo===1?'余额支付':'支付宝'}}</span>
        </div>
        <input type="hidden" name="mobile" :value="mobile">
        <FormField :form="form" class="form" v-if="payNo===1"></FormField>
        <div class="mobile_btn">
          <label for="accept">
            <input type="checkbox" :checked="accept" id="accept" name="accept" @click="setValue('accept',true)">
            <span @click="openMask(1)">阅读并接受<a href="javascript:;">《矿机销售协议》</a><template v-if="params2!=='1'">、<a href="javascript:;">《矿机托管协议》</a></template></span>
            <span class="select_accept">{{tips}}</span>
          </label> 
          <button name="btn">确认支付</button>
        </div>
      </form>
    </div>
    <MyMask :form="addressForm" :title="title" :contract="contract" v-if="edit"></MyMask>
  </section>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  import MyMask from '@/components/common/Mask'
  export default {
    components: {
      FormField, MyMask
    },
    data () {
      return {
        params: {name: {title: '矿机名称', unit: ''}, one_amount_value: {title: '矿机单价', unit: '元'}, number: {title: '购买数量', unit: '台'}, hash: {title: '每台算力', unit: 'T'}, hashType: {title: '算力类型', unit: ''}, incomeType: {title: '结算方式', unit: ''}, output: {title: '预期收益', unit: 'btc/T/天'}, total_electric_fee: {title: '预计支出费用', unit: 'btc/台/天'}, batch_area: {title: '批次所在区域', unit: ''}},
        proData1: ['name', 'one_amount_value', 'number'],
        proData2: ['name', 'one_amount_value', 'number', 'hash'],
        proText: ['hashType', 'hash', 'incomeType'],
        cloudMinerNav: ['output', 'total_electric_fee', 'batch_area'],
        mobileNav1: ['one_amount_value', 'number', 'batch_area'],
        mobileNav2: ['one_amount_value', 'number', 'hash'],
        thead: [{title: '选择'}, {title: '分期金额（元）'}, {title: '分期期数'}, {title: '手续费率'}, {title: '每期应还（元）'}, {title: '每期手续费（元）'}],
        form: [{name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', checkData: 'balance'}],
        address: [{name: 'post_user', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'post_mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'}, {name: 'address', type: 'select', title: '地址', isChange: true}, {name: 'area_details', type: 'text', title: '详细地址', placeholder: '请输入详细地址', isChange: true}, {name: 'is_default', type: 'radio', title: '是否设为默认地址'}],
        tips: '请同意服务条款',
        totalPrice: 0,
        accept: false,
        edit: false,
        contract: '',
        addressShowData: [],
        addressData: [],
        addressObject: {},
        addressForm: [],
        payNo: 2,
        rate: 3,
        isFixTop: false,
        timer: 0,
        params1: '',
        params2: '',
        detail: {},
        balance: '',
        number: 0
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
          if (this.totalPrice > this.balance) {
            this.tip('余额不足，请充值', ff.accept)
            return false
          }
          if (!val) {
            this.tip('短信验证码不能为空', ff.accept)
            return false
          } else if (!api.check('^[0-9]{6}$', ff.code.value)) {
            if (this.isMobile) {
              api.tips('请输入6位数字', 1)
            }
            return false
          }
        } else {
          callbackUrl = location.protocol + '//' + location.host
        }
        if (!ff.accept.checked) {
          this.tip('请同意服务条款', ff.accept)
          return false
        }
        if (this.isMobile) {
          callbackUrl += '/mobile/'
        } else {
          callbackUrl += '/user/'
        }
        if (this.params2 === '1') {
          if (!this.addressObject.id) {
            this.tip('请添加地址', ff.accept)
            return false
          }
          url = 'saveMiner'
          callbackUrl += 'order/3'
          if (this.payNo === 2) {
            data = Object.assign({url: callbackUrl, mode: '2'}, data)
          }
          data = Object.assign({post_id: this.addressObject.id, user_id: this.user_id, miner_id: this.params1, number: this.number}, data)
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
            data = Object.assign({product_id: this.params1, num: this.number, user_id: this.user_id}, data)
          }
        }
        var self = this
        ff.btn.setAttribute('disabled', true)
        util.post(url, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.paySuccess(callbackUrl, res)
          }, ff.btn)
        })
      },
      paySuccess (url, data) {
        var str = '恭喜您购买成功！'
        if (this.payNo === 2) {
          this.alipay(url, data)
        } else {
          api.tips(str, this.isMobile, () => {
            if (this.isMobile) {
              this.$router.push({path: url})
            } else {
              api.setStorge('info', {payType: this.params2, addressData: this.addressObject})
              this.$router.push({path: '/minerShop/paySuccess'})
            }
          })
        }
      },
      alipay (url, data) {
        if (api.checkWechat()) {
          api.tips('请在浏览器里打开', 1)
          return false
        }
        var self = this
        data.subject = encodeURIComponent(data.subject)
        util.post('alipay_wap', {sign: api.serialize(Object.assign({is_mobile: +this.isMobile, url: url, token: self.token}, data))}).then((resData) => {
          api.checkAjax(self, resData, () => {
            location.href = resData.url
          })
        })
      },
      submit (e) {
        var form = e.target
        var data = api.checkFrom(form, this.isMobile)
        if (!data) return false
        data.is_default = 1
        data.token = this.token
        var self = this
        util.post('addAddress', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.getAddress()
            api.tips('添加成功', self.isMobile)
            self.closeMask()
          }, form.btn)
        })
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
          this.accept = true
        } else if (n === 2) {
          this.addressForm = this.address
          this.title = '收货地址'
        } else if (n === 3) {
          this.title = '选择支付方式'
        }
      },
      closeMask () {
        document.body.style.overflow = 'auto'
        this.edit = false
      },
      setValue (name, k) {
        this[name] = k
      },
      tip (str, ele) {
        if (this.isMobile) {
          api.tips(str, 1)
        } else {
          this.tips = str
          ele.setAttribute('data-status', 'invalid')
          setTimeout(() => {
            ele.setAttribute('data-status', '')
          }, 2000)
        }
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
        var self = this
        util.post('showAddress', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.addressData = res
            self.addressShowData = self.addressData.slice(0, 3)
            self.addressObject = self.addressShowData[0] || {}
          })
        })
      },
      allAddress (e) {
        if (this.addressShowData.length === 3) {
          this.addressShowData = this.addressData
          e.target.innerHTML = '收起'
        } else {
          this.addressShowData = this.addressData.slice(0, 3)
          e.target.innerHTML = '查看所有地址'
        }
      },
      selectAddress (k) {
        if (this.isMobile) {
          this.$store.commit('SET_ADDRESS', {url: this.params1 + '/' + this.params2, num: this.number})
          this.$router.push({path: '/mobile/address?select'})
        } else {
          this.addressObject = this.addressShowData[k]
        }
      },
      setDefault (id) {
        var self = this
        util.post('setDefault', {sign: api.serialize({token: this.token, post_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('设置成功', self.isMobile)
            self.getAddress()
          })
        })
      },
      goRecharge (url) {
        this.$store.commit('SET_URL', this.$route.path)
        this.$router.push({path: url})
      },
      pageInit () {
        if (this.token && this.number) {
          this.totalPrice = this.detail.one_amount_value * +this.number
          if (this.detail.isLoan) {
            this.totalPrice /= 2
          }
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
          var self = this
          util.post(url, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.balance = res.balance
              if (res.output) {
                self.detail.output = res.output
                self.detail.total_electric_fee = res.total_electric_fee
              }
              if (self.params2 === '2') {
                self.content = res.part_content
              } else {
                self.content = res.content
              }
              if (self.params2 !== '1') {
                self.content1 = res.content1
              }
            })
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
        user_id: state => state.info.user_id,
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
    .pc_box{
      @include flex(flex-start,flex-start)
      .left_box{
        width:calc(100% - 280px);
        .order_msg{
          background: #fff;
          h3.title{
            font-size: 16px;
            font-weight: bold;
            color: #333;
            padding: 10px 15px;
            border-top: 2px solid $blue_border;
            background: #FAFAFA;
          }
        }
        .address_msg{
          .address_box{
            @include address_data
            .item{
              background: #FAFAFA;
              &.active,&:hover{
                background: #EFF6FE;
              }
            }
            .all_address_btn{
              float: right;
              margin-top:20px;
              font-size: 12px;
              color:$blue;
              cursor: pointer;
              padding-right:15px;
            }
          }
        }
        .order_info{
          .order_detail{
            margin-top: 20px;
            color: #999;
            .value{
              color:#333;
            }
            .order_detail_info1{
              @include flex(space-between);
              background: #fff9f3;
              padding: 25px;
              text-align: center;
              .item{
                .value span{
                  font-size: 20px;
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
            .order_detail_info2{
              @include flex(space-between);
              margin: 20px 0;
              border: 1px solid #eee;
              padding: 20px 25px;
              .item{
                select{
                  width:178px;
                  height:22px;
                  border:1px solid #dcdcdc;
                  border-radius:4px;
                  background:#f7f8fa;
                  padding-left:15px;
                  font-size:12px;
                  box-sizing:border-box;
                  display:inline-block;
                }
                a{
                  color: #327fff;
                }
              }
            }
          }
        }
        .miner_info{
          .miner_info_detail{
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
        .hire_purchase{
          h3.title{
            background:#01bfb5;
            color:white;
          }
          .order_detail{
            width: 100%;
            table{
              width: 900px;
            }
            thead{
              height: 40px !important;
              line-height: 40px;
              border:1px solid #e5e5e5;
              background:#f5f5f5;
              width: 900px;
              box-sizing: border-box;
            }
            tbody{
              tr{
                line-height: 56px;
                border-bottom: 1px solid #e5e5e5;
                td{
                  color: #121212;
                  font-size: 14px;
                  text-align: center;
                  input{
                    @include checkbox(18);
                    border:1px solid #d2d2d2;
                    width: 12px;
                    border-radius: 0;
                    height: 12px;
                    background:white;
                  }
                }
                &:hover{
                  background:#edffff;
                }
                &.active{
                  background:#edffff;
                }
              }
            }
          }
        }
        .order_pay{
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
            }
            label{
              @include accept_label
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
          @include mobile_hide
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
    .mobile_box{
      min-height:calc(100vh - 61px);
      font-size: 0.45rem;
      color:$text;
      background: #F1F2F7;
      .mobile_address{
        padding:15px 25px;
        background: #fff;
        margin-bottom:15px;
        .address_box:before,.address_box:after,.address_btn:after{
          @include position(28,auto,auto,15)
        }
        .address_box:after,.address_btn:after{
          content:'';
          @include block(8)
          @include arrow
        }
        .address_box{
          &:before{
            left:2px;
            right:auto;
            font-family:"iconfont" !important;
            content:'\e641';
            font-size: 20px;
          }
          &:after{
            top:36px
          }
          h3{
            font-size: 0.5rem;
            position: relative;
            &.active:after{
              content:'默认';
              @include position(4,auto,auto,10)
              font-size: 0.4rem;
              font-weight: normal;
              border:1px solid $orange;
              border-radius:3px;
              padding:0 8px;
              color:$orange
            }
          }
          p{
            @include ellipsis(2)
            font-size: 0.5rem;
          }
        }
        .address_btn:after{
          top:23px
        }
      }
      .price,.confirm_info,.pay_info{
        padding:0 15px;
        background: #fff;
      }
      .price{
        line-height: 50px;
        font-weight: bold;
        font-size: 0.52rem;
        .val{
          color:$orange;
        }
      }
      .confirm_info{
        margin-bottom:15px;
        padding-bottom:20px;
        .item{
          @include flex(space-between)
          line-height: 30px;
          color:$light_text;
          span:last-child{
            color:$light_black
          }
        }
        &.confirm_info2{
          padding:10px 15px;
        }
      }
      .payForm2{
        @include form(h,1)
        .form.form_field{
          padding:0.5rem;
          background: #fff;
          .input input{
            height:34px;
          }
        }
        .pay_item{
          padding:0 0.5rem;
          background: #fff;
          @include flex(space-between)
          line-height: 50px;
          span:last-child:after{
            content:'';
            @include block(8)
            @include arrow
          }
        }
        .mobile_btn{
          padding:15px;
          button{
            border:0;
            color:#fff;
            background: $orange;
            line-height: 2.2;
            label{
              color:$white;
            }
          }
          label{
            font-size: 0.5rem;
            @include accept_label
            span{
              margin-left:10px;
              a{
                color:#327fff;
              }
            }
          }
        }
      }
    }
  }
</style>
