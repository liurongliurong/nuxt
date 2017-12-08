<template>
  <section class="pay">
    <div class="pc_box" v-if="!isMobile">
      <div class="left_box">
        <div class="order_msg address_msg" v-if="$route.params.type==='1'">
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
              <template v-for="d,k in $route.params.type==='1'?proData2:proData1">
                <div class="item">
                  <p class="value" v-if="k==='number'&&page==='minerShop'"><span>{{$parent.number}}{{d.unit}}</span></p>
                  <p class="value" v-else-if="k==='number'&&page!=='minerShop'"><span>{{$parent.detail.hash}}{{d.unit}}</span></p>
                  <p class="value" v-else><span>{{$parent.detail[k]}}{{d.unit}}</span></p>
                  <p>{{d.title}}</p>
                </div>
                <div class="line"></div>
              </template>
            </div>
            <div class="order_detail_info2" v-if="$route.params.type!=='1'">
              <div class="item" v-for="t,k in proText">{{t}}：
                <span class="value" v-if="k==='hash'">{{$parent.detail[k]}}T</span>
                <span class="value" v-else>{{$parent.detail[k]}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="order_msg miner_info" v-if="$route.params.type!=='1'">
          <h3 class="title">挖矿收益信息</h3>
          <div class="miner_info_detail">
            <div class="item" v-for="n,k in cloudMinerNav">
              <span class="info_left">{{n.title}}</span>
              <span class="info_right">{{$parent.detail[k]}}<em>{{n.unit}}</em></span>
            </div>
          </div>
        </div>
        <div class="order_msg hire_purchase" v-show="$parent.show">
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
          <div :class="['pay_text',{active:payNo===1}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setValue('payNo',1)" checked>
              <span class="yue">账户余额{{$parent.balance}}元</span>
            </label>
            <div class="pay_info">
              <span>金额不足，可先</span>
              <router-link to="/user/recharge">充值</router-link>
            </div>
          </div>
          <div :class="['pay_text',{active:payNo===2}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setValue('payNo',2)">
              <span class="zhifubao">支付宝</span>
            </label>
            <div class="pay_info">
              <span>支付</span>
              <span class="money" style="font-size:16px;">{{(page==='minerShop'?totalPrice:$parent.detail.total_price)|format}}</span>
              <span>元</span>
            </div>
          </div>
          <form class="form payForm" action="" @submit.prevent="pay" novalidate>
            <FormField :form="form" class="form" v-if="payNo===1"></FormField>
             <label for="accept">
              <input type="checkbox" :value="accept" id="accept" name="accept" @click="setAssept">
              <span @click="openMask(1)">阅读并接受<a href="javascript:;" style="color:#327fff;">《矿机{{page === 'minerShop'? '销售':'转让'}}协议》</a><template v-if="$route.params.type!=='1'">和<a href="javascript:;" style="color:#327fff;">《矿机托管协议》</a></template></span>
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
          <span style="font-size:13px;">{{$parent.number*$parent.detail.hash}}T</span>
        </div>
        <div class="item" v-if="$parent.show">
          <span>总金额</span>
          <span class="price">￥{{totalPrice*2|format}}元</span>
        </div>
        <div class="item">
          <span>支付金额</span>
          <span class="price" style="font-size:16px;">￥{{(page==='minerShop'?totalPrice:$parent.detail.total_price)|format}}元</span>
        </div>
      </div>
    </div>
    <div class="mobile_box" v-else>
      <div class="mobile_address" v-if="$route.params.type==='1'">
        <div class="address_box" @click="selectAddress" v-if="addressObject">
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
        <div class="item" v-for="m,k in $route.params.type === '1'?mobileNav2:mobileNav1">
          <span>{{m.title}}</span>
          <span v-if="k==='number'&&page==='minerShop'">{{$parent.number}}{{m.unit}}</span>
          <span v-else-if="k==='number'&&page!=='minerShop'">{{$parent.detail.hash}}{{m.unit}}</span>
          <span v-else>{{$parent.detail[k]}}{{m.unit}}</span>
        </div>
      </div>
      <div class="confirm_info confirm_info2" v-if="$route.params.type==='1'">
        <div class="item">
          <span>配送费用</span>
          <span>第三方物流、费用到付</span>
        </div>
      </div>
      <form action="" class="form payForm2" @submit.prevent="pay" novalidate>
        <div class="pay_info">
          <div class="pay_item" @click="openMask(3)">
            <span>支付方式</span>
            <span>{{payNo===1?'余额支付':'支付宝'}}</span>
          </div>
          <div class="pay_item" v-if="payNo===1">
            <mt-field type="password" label="交易密码" name="password" placeholder="请输入交易密码" state="" @blur="test"></mt-field>
          </div>
        </div>
        <div class="mobile_btn">
           <label for="accept">
            <input type="checkbox" :value="accept" id="accept" name="accept" @click="setAssept">
            <span @click="openMask(1)">阅读并接受<a href="javascript:;" style="color:#327fff;">《矿机{{page === 'minerShop'? '销售':'转让'}}协议》</a><template v-if="$route.params.type!=='1'">、<a href="javascript:;" style="color:#327fff;">《矿机托管协议》</a></template></span>
            <span class="select_accept">{{tips}}</span>
          </label> 
          <mt-button type="primary" size="large" name="btn">确认支付</mt-button>
        </div>
      </form>
    </div>
    <MyMask :form="address" :title="title" :contract="contract" :val="addressForm" v-if="edit&&!isMobile"></MyMask>
    <mt-popup position="bottom" v-model="mobileEdit" :closeOnClickModal="false" v-if="isMobile">
      <div class="close" @click="closeMask">
        <span class="icon"></span>
      </div>
      <div class="agreement" v-html="contract" v-if="contract"></div>
      <div class="mobile_pay_type" v-else>
        <div class="mobile_pay_title">选择支付方式</div>
        <div :class="['pay_item', {active:payNo===1}]" @click="setPay(1)">
          <div>
            <span>可用余额</span>
            <span class="val">{{$parent.balance}}元</span>
          </div>
          <router-link to="/mobile/recharge">充值</router-link>
        </div>
        <div :class="['pay_item', {active:payNo===2}]" @click="setPay(2)">
          <div>
            <span>支付宝支付</span>
          </div>
        </div>
      </div>
    </mt-popup>
  </section>
</template>

<script>
  import { Toast } from 'mint-ui'
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  import MyMask from '@/components/common/AddressMask'
  import md5 from 'js-md5'
  export default {
    props: {
      page: {
        type: String
      }
    },
    components: {
      FormField, MyMask
    },
    data () {
      return {
        proData1: {product_name: {title: '矿机名称', unit: ''}, one_amount_value: {title: '每台服务器价格', unit: '元'}, number: {title: '购买服务器数量', unit: '台'}},
        proData2: {name: {title: '矿机名称', unit: ''}, one_amount_value: {title: '每台服务器价格', unit: '元'}, number: {title: '购买服务器数量', unit: '台'}, hash: {title: '每台服务器算力', unit: 'T'}},
        proText: {hashType: '算力类型', hash: '每台矿机算力', incomeType: '结算方式'},
        cloudMinerNav: {income: {title: '今日每T预期收益', unit: 'btc'}, electricityFees: {title: '每日电费支出约', unit: 'btc'}, batch_area: {title: '批次所在区域', unit: ''}},
        mobileNav1: {one_amount_value: {title: '每台服务器价格', unit: '元'}, number: {title: '购买服务器数量', unit: '台'}, batch_area: {title: '批次所在区域', unit: ''}},
        mobileNav2: {one_amount_value: {title: '每台服务器价格', unit: '元'}, number: {title: '购买服务器数量', unit: '台'}, hash: {title: '每台服务器算力', unit: 'T'}},
        thead: [{title: '选择'}, {title: '分期金额（元）'}, {title: '分期期数'}, {title: '手续费率 （%）'}, {title: '每期应还（元）'}, {title: '每期手续费（元）'}],
        form: [{name: 'password', type: 'password', title: '交易密码', placeholder: '请输入交易密码', pattern: 'telCode'}],
        address: [{name: 'post_user', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'post_mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'}, {name: 'address', type: 'select', title: '地址', isChange: true}, {name: 'area_details', type: 'text', title: '详细地址', placeholder: '请输入详细地址', isChange: true}, {name: 'is_default', type: 'radio', title: '是否设为默认地址'}],
        tips: '请同意服务条款',
        totalPrice: 0,
        accept: false,
        edit: false,
        mobileEdit: false,
        contract: '',
        addressShowData: [],
        addressData: [],
        addressObject: {},
        addressForm: {},
        payNo: 1,
        rate: 3,
        isFixTop: false,
        timer: 0
      }
    },
    created () {
      window.addEventListener('scroll', this.fixTop, false)
    },
    methods: {
      pay (e) {
        var ff = e.target
        var val = ff[0].value
        var url = ''
        var callbackUrl = ''
        var data = {token: this.token, trade_password: md5(val)}
        if (this.payNo === 1) {
          if (this.totalPrice > this.$parent.balance) {
            this.tip('余额不足，请充值', ff.accept)
            return false
          }
          if (!(this.bank_card && this.bank_card.status === 1)) {
            api.tips('请先绑定银行卡', () => {
              if (this.isMobile) {
                this.$router.push({name: 'madministration'})
              } else {
                this.$router.push({name: 'account'})
              }
            })
            return false
          }
          if (!this.trade_password) {
            api.tips('请先设置交易密码', () => {
              this.$router.push({name: 'password'})
            })
            return false
          }
          if (!val) {
            this.tip('交易密码不能为空', ff.accept)
            return false
          } else if (!api.check('^[0-9]{6}$', ff[0].value)) {
            if (this.isMobile) {
              this.myToast('请输入6位数字')
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
        if (this.$route.params.type === '1') {
          console.log(this.addressObject)
          if (!this.addressObject.id) {
            this.tip('请添加地址', ff.accept)
            return false
          }
          url = 'saveMiner'
          callbackUrl += 'order/3/1'
          if (this.payNo === 2) {
            data = Object.assign({url: callbackUrl, mode: '2'}, data)
          }
          data = Object.assign({post_id: this.addressObject.id, user_id: this.user_id, miner_id: this.$route.params.id, number: this.$parent.number}, data)
        } else {
          if (this.page === 'minerShop') {
            callbackUrl += 'order/0/1'
            if (this.$parent.show) {
              url = 'productMallLoan'
              if (this.payNo === 2) {
                data = Object.assign({url: callbackUrl, mode: '3'}, data)
              }
              data = Object.assign({product_id: this.$route.params.id, rate_name: this.rate, num: this.$parent.number}, data)
            } else {
              url = 'productMall'
              if (this.payNo === 2) {
                data = Object.assign({url: callbackUrl, mode: '1'}, data)
              }
              data = Object.assign({product_id: this.$route.params.id, num: this.$parent.number, user_id: this.user_id}, data)
            }
          } else {
            url = 'doTransfer_Hashrate'
            data = Object.assign({user_id: this.user_id, transfer_order_id: this.$route.params.id, num: this.$parent.number}, data)
            callbackUrl = 'order/1/1'
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
      openMask (n) {
        document.body.style.overflow = 'hidden'
        window.scroll(0, 0)
        if (this.isMobile) {
          this.mobileEdit = true
        } else {
          this.edit = true
        }
        if (n === 1) {
          this.contract = this.$parent.content1 ? this.$parent.content + '<br>' + this.$parent.content1 : this.$parent.content
          this.title = '协议详情'
          this.accept = true
        } else if (n === 2) {
          this.contract = ''
          this.title = '收货地址'
        } else if (n === 3) {
          this.contract = ''
        }
      },
      closeMask () {
        document.body.style.overflow = 'auto'
        if (this.isMobile) {
          this.mobileEdit = false
        } else {
          this.edit = false
        }
      },
      test (e) {
        var ele = e.target
        var ff = document.querySelector('.form')
        api.checkFiled(ele, ff)
      },
      paySuccess (url, data) {
        var str = '恭喜您购买成功！'
        if (this.isMobile) {
          if (this.payNo === 2) {
            this.alipay(url, data)
          } else {
            // if (this.$route.params.type === '1') {
            //   this.$parent.next = 2
            // } else {}
            Toast({
              message: str,
              position: 'middle',
              duration: 3000
            })
            setTimeout(() => {
              this.$router.push({path: url})
            }, 3000)
          }
        } else {
          if (this.payNo === 2) {
            this.alipay(url, data)
          } else {
            // if (this.$route.params.type === '1') {
            //   this.$parent.next = 2
            // } else {}
            api.tips(str, () => {
              this.$router.push({path: url})
            })
          }
        }
      },
      alipay (url, data) {
        if (api.checkWechat()) {
          this.myToast('请在浏览器里打开')
          return false
        }
        var self = this
        data.subject = encodeURIComponent(data.subject)
        util.post('alipay_wap', {sign: api.serialize(Object.assign({is_mobile: +this.isMobile, url: url, token: self.$parent.token}, data))}).then((resData) => {
          api.checkAjax(self, resData, () => {
            location.href = resData.url
          })
        })
      },
      setValue (name, k) {
        this[name] = k
      },
      setAssept (e) {
        this.accept = e.target.checked
      },
      setPay (n) {
        this.payNo = n
        this.mobileEdit = false
      },
      submit (e) {
        var form = e.target
        var data = api.checkFrom(form, this, this.isMobile)
        if (!data) return false
        data.is_default = 1
        data.token = this.$parent.token
        var self = this
        util.post('addAddress', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.getAddress()
            self.prompt('添加成功')
            self.closeMask()
          }, form.btn)
        })
      },
      getAddress () {
        var self = this
        util.post('showAddress', {sign: api.serialize({token: this.$parent.token, user_id: this.$parent.user_id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.addressData = res
            self.addressShowData = self.addressData.slice(0, 3)
            self.addressObject = self.addressShowData[0]
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
          this.$store.commit('SET_ADDRESS', {url: this.$route.params.id + '/' + this.$route.params.type, num: this.$parent.number})
          this.$router.push({path: '/mobile/address?select'})
        } else {
          this.addressObject = this.addressShowData[k]
        }
      },
      setDefault (id) {
        var self = this
        util.post('setDefault', {sign: api.serialize({token: this.$parent.token, post_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.prompt('设置成功')
            self.getAddress()
          })
        })
      },
      check (ele, str) {
        this.tips = str
        ele.setAttribute('data-status', 'invalid')
        setTimeout(() => {
          ele.setAttribute('data-status', '')
        }, 2000)
      },
      tip (str, ele) {
        if (this.isMobile) {
          this.myToast(str)
        } else {
          this.check(ele, str)
        }
      },
      prompt (str) {
        if (this.isMobile) {
          this.myToast(str)
        } else {
          api.tips(str)
        }
      },
      myToast (str) {
        Toast({
          message: str,
          position: 'middle',
          duration: 3000
        })
      },
      fixTop (e) {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 5) {
          this.isFixTop = true
        } else {
          this.isFixTop = false
        }
      }
    },
    mounted () {
      if (this.page === 'minerShop') {
        this.totalPrice = this.$parent.detail.one_amount_value * +this.$parent.number
        if (this.$parent.show) {
          this.totalPrice /= 2
        }
      } else {
        this.totalPrice = this.$parent.detail.total_price
      }
      if (this.$parent.show) {
        // var self = this
        // util.post('getRate', {sign: api.serialize({token: this.token, rate_name: this.rate})}).then(function (res) {
        //   api.checkAjax(self, res, () => {
        //     console.log(res)
        //   })
        // })
        // var loanAmount = this.detail.one_amount_value * this.number / 2
        // util.post('getLoanDetail', {sign: api.serialize({token: this.token, rate_name: this.rate, loan_money: loanAmount})}).then(function (res) {
        //   api.checkAjax(self, res, () => {
        //     console.log(res)
        //   })
        // })
      }
      if (this.addressObj.id) {
        this.addressObject = this.addressObj
      } else if (this.$route.params.type === '1') {
        this.getAddress()
      }
    },
    filters: {
      format: api.decimal
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        bank_card: state => state.info.bank_card,
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
            padding:15px 20px;
            margin:10px 15px;
            @include flex(space-between);
            color: $light_black;
            .pay_value{
              input{
                @include checkbox(18)
                margin-right:5px;
                vertical-align: text-top;
              }
              span{
                line-height: 25px;
                height:25px;
                &:before{
                  font-family:"iconfont" !important;
                  font-size: 26px;
                  padding-right:8px;
                  line-height: 25px;
                  vertical-align: bottom;
                }
                &.yue:before{
                  content:'\e60c'
                }
                &.zhifubao:before{
                  content:'\e615';
                  color:#00AAF0
                }
              }
            }
            .pay_info{
              .money{
                color:$orange;
                font-weight: bold;
              }
            }
            a{
              color: #327fff;
            }
            &.active{
              outline:5px solid $blue_border
            }
          }
          form{
            padding:15px;
            @include form(v);
            width:340px;
            margin:30px auto 0 auto;
            .input,.input input{
              line-height: 1.5;
            }
            .input{
              margin-bottom: 25px;
              & > span:first-child,& > span:nth-child(2){
                display: none;
              }
              input{
                padding-left:15px;
                height:42px;
              }
              & span:last-child{
                top: 44px;
                &:before{
                  top:0px
                }
              }
            }
            label{
              @include accept_label
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
      .pay_info{
        .pay_item{
          @include flex(space-between)
          line-height: 50px;
          &:first-child{
            span:last-child:after{
              content:'';
              @include block(8)
              @include arrow
            }
          }
          &:not(:last-child){
            border-bottom:1px solid $border;
          }
          .mint-cell{
            width:100%;
            .mint-cell-wrapper{
              padding:0;
              border:0;
              font-size: 0.45rem;;
              .mint-cell-title{
                width:85px;
                color:$text
              }
              .mint-cell-value{
                width:calc(100% - 85px);
                input{
                  width:100%;
                  height:40px;
                  line-height: 40px;
                  border-radius:3px;
                  padding: 0 10px;
                }
                .mint-field-state{
                  position: absolute;
                  right:15px;
                }
              }
            }
          }
        }
      }
      .mobile_btn{
        padding:15px;
        button{
          margin:10px 0;
          background: $orange;
          label{
            color:$white;
          }
        }
        label{
          font-size: 0.5rem;
          @include accept_label
        }
      }
    }
    .mask_con{
      h2{
        line-height: 52px;
        padding:0 28px;
        border-bottom: 1px solid $border;
      }
    }
    .mint-popup{
      @include popup
      .mobile_pay_type{
        padding:15px 0;
        color: $text;
        .mobile_pay_title{
          text-align: center;
          font-size: 0.55rem;
          border-bottom:1px solid $border;
          padding-bottom:15px
        }
        .pay_item{
          padding:0 15px;
          @include flex(space-between)
          line-height: 50px;
          border-bottom:1px solid $border;
          span.val{
            color:$light_text;
            margin-left:15px;
          }
          a{
            color:$blue
          }
          &.active{
            position: relative;
            div:after{
              content:'';
              @include right
              border-color:$orange;
              left:80%;
            }
          }
        }
      }
    }
  }
</style>
