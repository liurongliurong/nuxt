<template>
  <div class="activity_box">
    <div class="activity_pc" v-if="isMobile===0">
      <div class="bg_box">
        <img src="~assets/images/swiper/5_1.jpg"/>  
      </div>
      <div class="activity_form">
        <img :src="require('@/assets/images/buy_bg.png')" alt="">
        <div class="buy_title">
          <b>{{data.name}}</b>
          <span class="title_key">批次所在区域：</span>
          <span class="title_val">{{data.area}}</span>
        </div>
        <div class="buy_desc">
          <div class="item" v-for="t,k in text">
            <div class="item_num">
              <b v-if="k==='left_amount'">{{data.amount-data.sell_amount}}</b>
              <b v-else>{{data[k]}}</b>
              <span>{{t.unit}}</span>
            </div>
            <div class="item_desc">{{t.title}}</div>
          </div>
        </div>
        <div class="buy_input">
          <p>购买数量（台）</p>
          <div class="input_box">
            <span @click="changeNum(+number-1)">-</span>
            <input type="text" v-model="number" name="number" placeholder="请输入购买数量，1台起售" @blur="changeNum(number)">
            <span @click="changeNum(+number+1)">+</span>
          </div>
          <p>总算力 ：<span>{{totalHash}}T</span></p>
          <p>需支付 ：<span>{{totalPrice}}元</span></p>
          <button @click="gobuy()">立即支付</button>
          <label for="accept">
            <input type="checkbox" checked id="accept">
            <span @click="openContract(1)">阅读并接受<a href="javascript:;">{{activityType[activity].agreement}}</a></span><br>
          </label>
        </div>
      </div>
      <div class="activity_info">
        <div class="activity_img">
          <h4>产品简介</h4>
          <div class="activity_advantage" v-html="paramsData.machine_advantage"></div>
          <h4>官方参数</h4>
          <div class="activity_content">
            <div class="activity_left">
              <img :src="data.activity_picture"/>
              <h6>{{data.name}}</h6>
            </div>
            <div class="activity_right">
              <div class="activity_one" v-for="n, k in params">
                <span class="one_left">{{n.title}}</span>
                 <span class="one_right" v-if="k === 'hash'">{{data[k]}} T</span> 
                 <span class="one_right" v-else-if="k === 'chips_num'">{{data.product_info ? data.product_info[k] : ''}}</span>  
                 <span class="one_right" v-else>{{paramsData[k]}}</span>   
              </div>
            </div>
          </div>
        </div>
        <div class="activity_vs">
          <h4>
            <img src="~assets/images/activity.png"/>
            云算力VS自己挖 "坑"
            <img src="~assets/images/activity.png"/>
          </h4>
          <div class="activity_ul">
            <div class="activity_li" v-for="n, k in advantage">
              <p class="left">{{n.left}}</p>
              <p class="unit">{{n.unit}}</p>
              <p class="right">{{n.right}}</p>
            </div>
          </div>
          <p class="bottom">本次活动最终解释权归算力网所有</p>
        </div>
      </div>
    </div>
    <div class="activity_mobile" v-else-if="isMobile===1">
      <div class="mobile_bg_box">
        <img :src="require('@/assets/images/swiper/mobile4.jpg')" alt="">
        <h1>{{data.name}}</h1>
      </div>
      <div class="mobile_activity_form">
        <div class="activity_data_box">
          <div class="activity_data1">
            <div v-for="t,k in text" class="item">
              <p class="price" v-if="k==='left_amount'"><em>{{data.amount-data.sell_amount}}</em> {{t.unit}}</p>
              <p class="price" v-else><em>{{data[k]}}</em> {{t.unit}}</p>
              <p class="title">{{t.title}}</p>
            </div>
          </div>
          <div class="activity_data2">
            <div class="item">
              <span>购买数量</span>
              <div class="mobile_input">
                <span class="minus" @click="changeNum(+number-1)">-</span>
                <input class="number" type="number" v-model="number" name="number" :haha="number" placeholder="购买数量" @blur="changeNum(number)"/>
                <span class="plus" @click="changeNum(+number+1)">+</span>
              </div>
            </div>
            <div class="item">
              <span>购买算力</span>
              <span class="price">{{totalHash}}T</span>
            </div>
            <div class="item">
              <span>支付金额</span>
              <span class="price">{{totalPrice}}元</span>
            </div>
          </div>
        </div>
        <button class="mobile_btn" @click="gobuy(1)">立即支付</button>
        <label for="accept">
          <input type="checkbox" checked id="accept">
          <span @click="openContract(1)">阅读并接受<a href="javascript:;">{{activityType[activity].agreement}}</a></span>
        </label>
      </div>
      <div class="mobile_activity_info">
        <div class="item">
          <h5>产品简介</h5>
          <div v-html="paramsData.machine_advantage"></div>
        </div>
        <div class="item">
          <h5>官方参数</h5>
          <div class="item_data_box">
            <div class="item_data" v-for="n, k in params">
              <span class="one_left">{{n.title}}</span>
              <span class="one_right" v-if="k === 'hash'">{{data[k]}} T</span> 
              <span class="one_right" v-else-if="k === 'chips_num'">{{data.product_info ? data.product_info[k] : ''}}</span>  
              <span class="one_right" v-else>{{paramsData[k]}}</span>
            </div>
          </div>
        </div>
        <div class="logo">
          <div class="logo_img"></div>
        </div>
        <p class="tel">咨询电话： 0571-28031736</p>
      </div>
    </div>
    <MyMask :form="nowFormData" :position="position" :title="title" :contract="contract" @submit="submit" @closeMask="closeMask" v-if="edit&&edit!==4"></MyMask>
    <div :class="'popup pay_type_select'+(isMobile?' mobile_popup bottom':'')" v-if="edit===4">
      <div class="popup_con">
        <div class="popup_title">
          <template v-if="isMobile===0">
            <span class="pay_type_title">{{title}}</span>
            <span class="pay_type_desc">全球算力输出服务由保全网提供全流程区块链存证、保全服务</span>
          </template>
          <span v-else>{{title}}</span>
          <span class="icon_close" @click="closeMask"></span>
          <span class="mobile_close" @click="closeMask"></span>
        </div>
        <div class="select_pay_type" v-if="isMobile===0">
          <div :class="['pay_text',{active:payNo===2}]">
            <label class="pay_value">
              <input type="radio" name="payType" @click="setPayNo(2)" checked>
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
              <input type="radio" name="payType" @click="setPayNo(1)">
              <span class="yue">账户余额{{balance}}元</span>
            </label>
            <div class="pay_info">
              <span>金额不足，可先</span>
              <a href="javascript:;" @click="goRecharge('/user/recharge')">充值</a>
            </div>
          </div>
        </div>
        <div class="mobile_pay_type" v-else-if="isMobile===1">
          <div :class="['pay_item', {active:payNo===2}]" @click="setPayNo(2)">
            <span class="zhifubao">支付宝支付</span>
          </div>
          <div :class="['pay_item', {active:payNo===1}]" @click="setPayNo(1)">
            <span class="yue">可用余额</span>
            <span class="val">{{balance}}元</span>
            <router-link to="/mobile/recharge">充值</router-link>
          </div>
        </div>
        <form class="form" @submit.prevent="submit" novalidate>
          <input type="hidden" name="mobile" :value="mobile">
          <FormField :form="nowFormData" v-if="payNo===1"></FormField>
          <button name="btn">确认提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { auth, post_address } from '@/util/form'
  import MyMask from '@/components/common/Mask'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      MyMask, FormField
    },
    data () {
      return {
        params: {
          hash: {title: '算力', value: '9TH/S (-5%~+10%)'},
          wallPower: {title: '墙上功耗比', value: '145W/T（AC/DC 93%的效率）'},
          voltage: {title: '额定电压', value: '11.8V～13.0V'},
          minerOuterSize: {title: '外箱尺寸', value: '9个6PIN接口'},
          chips_num: {title: '芯片数量', value: 'DW1227 132颗（14nm LPP工艺）'},
          minerSize: {title: '服务器尺寸', value: '290mm*126mm*155mm'},
          weight: {title: '重量', value: '4.7KG'},
          network: {title: '网络连接', value: '以太网'},
          temperature: {title: '工作温度', value: '-10℃～40℃'},
          humidity: {title: '工作湿度', value: '5%RH～95%RH 非凝露'}
        },
        advantage: [
          {left: '规模化部署，专业的散热设备，远离运行噪音，使用低价合规电。', unit: '运行', right: '在家运行占空间，又会产生大量的噪音和热量，家用电的成本也是不小的开支。'},
          {left: '基础设施全方位提供服务。', unit: '配套', right: '需要自己购买专用电源、控制组件和服务器支架等。'},
          {left: 'IT专业人员进行配置、维护。', unit: '软件', right: '组装服务器后需要专业的软件支持，对于新人需要付出一定的学习成本。'},
          {left: '出现问题平台负责解决，并安排专业人员进行维修。', unit: '维修', right: '一旦服务器出现问题，需要自行解决维修问题，收益停止，将会造成一定的损失。'}
        ],
        text: {
          one_amount_value: {unit: '元/台', title: '算力服务器价格'},
          hash: {unit: 'T/台', title: '服务器算力'},
          left_amount: {unit: '台', title: '剩余数量'}
        },
        data: {name: '', area: '', one_amount_value: 0, hash: 0, amount: 0, sell_amount: 0},
        form: {
          auth, 
          address: post_address.slice(0, 4),
          payType: [{name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6, value2: 0, value3: 0}]
        },
        activityType: {
          1: {dataRequest: 'showMiner', dataCommit: 'saveMiner', agreement: '《算力服务器销售协议》'},
          2: {dataRequest: 'showProduct', dataCommit: 'productMall', agreement: '《云算力购买协议》和《云算力托管协议》'}
        },
        totalHash: '0.00',
        totalPrice: '0.00',
        number: 1,
        edit: 0,
        title: '',
        contract: '',
        content: '',
        nowFormData: [],
        addressData: '',
        activity: 2,
        paramsData: '',
        payNo: 2,
        position: 'all'
      }
    },
    methods: {
      changeNum (n) {
        var maxNum = +this.data.amount - (+this.data.sell_amount)
        this.number = n < 1 ? 1 : n > maxNum ? maxNum : n
        this.totalHash = (this.number * this.data.hash).toFixed(2)
        this.totalPrice = this.number * this.data.one_amount_value
      },
      openContract (n) {
        this.edit = n
        document.body.style.overflow = 'hidden'
        this.contract = ''
        this.nowFormData = []
        if (n === 1 || n === 4 || n === 5) {
          if (this.isMobile) {
            this.position = 'bottom'
          } else {
            this.position = 'all'
          }
        }
        if (n === 1) {
          this.contract = this.content
          this.title = '协议详情'
        } else if (n === 2) {
          this.nowFormData = this.form.auth
          this.title = '实名认证'
        } else if (n === 3) {
          this.nowFormData = this.form.address
          this.title = '收货地址'
        } else if (n === 4 || n === 5) {
          this.nowFormData = this.form.payType
          this.title = '选择支付方式'
          this.form.payType[0].value2 = this.data.one_amount_value
          this.form.payType[0].value3 = this.number
        }
      },
      gobuy () {
        var startTime = this.data.activity_time
        var now = Date.parse(new Date()) / 1000
        if (now < startTime) {
          api.tips('活动未开始，开始时间为：' + api.date(new Date(startTime * 1000)))
          return false
        }
        var ele = document.querySelector('#accept')
        if (!this.token) {
          api.setStorge('suanli', {number: this.number})
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'auth-login'})
          this.$store.commit('LOGOUT')
          return false
        }
        if (!this.true_name) {
          this.openContract(2)
          return false
        }
        // if (!this.addressData) {
        //   this.openContract(3)
        //   return false
        // }
        if (!this.number) {
          api.tips('请填写数量')
          return false
        }
        if (!ele.checked) {
          api.tips('请同意服务条款')
          return false
        }
        this.openContract(4)
      },
      goPay (inputData) {
        var url = 'productMall'
        // var url = 'saveMiner'
        var callbackUrl = location.protocol + '//' + location.host + (this.isMobile ? '/mobile/order/0' : '/user/order/0')
        // var data = {miner_id: this.data.miner_id, number: this.number, mode: '2', token: this.token, amount: this.totalPrice, url: callbackUrl}
        var data = {product_id: this.data.product_id, num: this.number, token: this.token, amount: this.totalPrice}
        if (this.payNo === 2) {
          data = Object.assign({mode: '1', url: callbackUrl}, data)
        } else {
          data = Object.assign(inputData, data)
        }
        if (api.checkWechat()) {
          api.tips('请在浏览器里打开')
          return false
        }
        fetchApiData(this, url, data, (res) => {
          localStorage.removeItem('activity')
          if (this.payNo === 2) {
            res.subject = encodeURIComponent(res.subject)
            if (this.isMobile) {
              res = Object.assign(res, {is_mobile: 1})
            } else {
              res = Object.assign(res, {is_mobile: 0})
            }
            fetchApiData(this, 'alipay_wap', Object.assign({token: this.token}, res), (resData) => {
              location.href = resData.url
            })
          } else {
            api.tips('恭喜您购买成功！', () => {
              location.href =  callbackUrl
            })
          }
        })
      },
      closeMask () {
        document.body.style.overflow = 'auto'
        this.edit = 0
      },
      setPayNo (k) {
        this.payNo = k
      },
      goRecharge (url) {
        this.$store.commit('SET_URL', this.$route.path)
        this.$router.push({path: url})
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        var sendData = {token: this.token}
        if (this.edit === 3) {
          this.addressData = data
          api.tips('收货地址已提交，点击“立即支付”完成购买')
          this.closeMask(this.isMobile)
        } else if (this.edit === 4 || this.edit === 5) {
          this.goPay(data)
        } else if (this.edit === 2) {
          var val = 'true_name'
          var tipsStr = '实名认证已提交，请您耐心等待几秒即可看到认证结果'
          var tipsStr2 = '恭喜您实名认证成功'
          // var tipsStr2 = '恭喜您实名认证成功，请填写收货地址'
          fetchApiData(this, 'user_truename', Object.assign(data, sendData), (res) => {
            api.tips(tipsStr)
            this.$store.commit('SET_INFO', {[val]: {status: 0}})
            setTimeout(() => {
              this.requestData('show_user_truename', sendData, val, () => {
                api.tips(tipsStr2)
                // this.openContract(3, this.isMobile)
              })
            }, 7000)
            this.closeMask(this.isMobile)
          })
        }
      },
      requestData (url, sendData, val, callback) {
        fetchApiData(this, url, sendData, (res) => {
          this.$store.commit('SET_INFO', {[val]: res})
          if (callback) {
            callback()
          }
        }, '', () => {
          this.$store.commit('SET_INFO', {[val]: ''})
        })
      },
      pageInit () {
        // var url = 'showMiner'
        var url = 'showProduct'
        fetchApiData(this, url, {token: 0}, (res) => {
          this.data = res
          this.paramsData = res.product_info.has_product_miner_base
          this.content = res.content + '<hr>' + res.content1
          this.totalHash = (this.number * this.data.hash).toFixed(2)
          this.totalPrice = this.number * this.data.one_amount_value
          // this.content = res.content
        })
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        isMobile: state => state.isMobile,
        balance: state => state.info.balance
      })
    },
    mounted () {
      var p = api.getStorge('suanli')
      this.number = p.number || 1
      this.pageInit()
      document.body.style.overflow = 'auto'
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/style.scss';
  .activity_box{
    .activity_pc{
      min-height:700px;
      background: #170E2D;
      color:$white;
      .bg_box{
        @include bg(1920,730px,#22154A)
      }
      .activity_form{
        position: relative;
        height:460px;
        @include bg(1213,424px,transparent)
        .buy_title,.buy_desc,.buy_input{
          position: absolute;
          left:50%;
          top:110px;
        }
        .buy_title{
          margin-left:-500px;
          top:15px;
          color:#f8b551;
          font-size: 16px;
          b{
            font-size: 28px;
            font-weight: normal;
          }
          .title_key{
            margin-left:100px;
            color:#fff
          }
        }
        .buy_desc{
          margin-left:-75px;
          .item{
            &:not(:last-child){
              margin-bottom:30px
            }
            .item_num{
              color:#fede00;
              line-height: 1.2;
            }
            b{
              font-size: 36px;
              margin-right:10px;
            }
          }
        }
        .buy_input{
          width:280px;
          margin-left:200px;
          .input_box{
            background: #fff;
            line-height: 2.4;
            border-radius:5px;
            overflow:hidden;
            margin:10px 0;
            @include flex(space-between)
            span{
              width:10%;
              text-align: center;
              background: $border;
              font-size: 18px;
              font-weight: bold;
              color: #c5c5c5;
              cursor: pointer;
              user-select:none;
              &:last-child{
                color: $orange;
              }
            }
            input{
              width:75%
            }
          }
          p{
            line-height: 2;
            span{
              color:#ff9f00;
            }
          }
          button{
            width:280px;
            height:45px;
            line-height: 45px;
            border:0;
            color:$white;
            background: linear-gradient(to right, #ffaf01 20%, #f9580d);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffaf01', endColorstr='#f9580d',GradientType=1 );
            margin:10px 0;
          }
        }
      }
      .activity_info{
        color:#fff;
        background: url('~assets/images/activity.jpg');
        h4{
          text-align:center;
          font-size: 28px;
          color:#ff9f00;
          font-weight: 800;
        }
        .activity_img{
          @include main
          padding-top:65px;
          .activity_advantage{
            padding:25px 0;
          }
          .activity_content{
            margin-top: 40px;
            margin-bottom: 87px;
            background: url('~assets/images/3.png') no-repeat;
            background-size: 100% 100%;
            overflow: hidden;
            .activity_left{
              width: 50%;
              float: left;
              text-align: center;
              img{
                width: 347px;
                margin-top: 120px;
              }
              h6{
                font-size: 28px;
                color:#f8b551;
                margin-top: 65px;
              }
            }
            .activity_right{
              width: 50%;
              float: left;
              margin-bottom: 40px;
              .activity_one{
                margin-top: 36px;
                height: 20px;
                padding-right: 36px;
                font-size: 16px;
                .one_left{
                  float: left;
                }
                .one_right{
                  float: right;
                }
              }
            }
          }
        }
        .activity_vs{
          @include main
          padding:65px 0;
          padding-top:20px;
          h4{
            position: relative;
            img{
              position: absolute;
              width: 70px;
              height: 32px;
              top: 7px;
            }
            :nth-child(1){
              left: 201px;
            }
            :nth-child(2){
              right: 201px;
            }
          }
          .activity_ul{
            margin-top: 55px;
            .activity_li{
              height: 100px;
              margin-bottom: 1px;
              position: relative;
              .left,.right{
                width: 49.8%;
                height: 100%;
                float: left;
                line-height: 100px;
                text-align: center;
                padding:0 52px;
                word-break: break-all;
              }
              .left{
                background: #2c1963;
                border:4px solid #966cff;
                margin-right: 1px;
              }
              .unit{
                position: absolute;
                width: 82px;
                height: 82px;
                border-radius: 100%;
                border:10px solid #240f30;
                background: #ff9b01;
                line-height: 82px;
                text-align: center;
                line-height: 66px;
                text-align: center;
                left: 545px;
                top: 10px;
              }
              .right{
                background: #917cce;
                border: 4px solid #cbbaff;
              }
            }
            :nth-child(1),:nth-child(4) {
              .right{
                line-height: 24px;
                text-align: left;
                padding-top:23px;
              }
            }
          }
          .bottom{
            color: #917cce;
            font-size: 16px;
            text-align: center;
            margin-top: 114px;
          }
        }
      }
    }
    .activity_mobile{
      color:$white;
      .mobile_bg_box{
        h1 {
          width: 100%;
          font-size: 0.36rem;
          text-align: center;
          margin-bottom: 0.5rem;
          position: absolute;
          top: 4.7rem;
        }
      }
      .mobile_activity_form{
        background: #240f30;
        padding-top: 0.3rem;
        .activity_data_box {
          margin: 0 0.2rem;
          background: linear-gradient(45deg, #7524ED 10%, #DA1FE0);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7524ED', endColorstr='#DA1FE0',GradientType=1 );
          padding: 0.3rem;
          border-radius: 10px;
          color: #FBF5FD;
          .activity_data1{
            @include flex(space-between)
            padding-top: 0.2rem;
            border-bottom: 1px dashed #FBF5FD;
            padding-bottom: 0.3rem;
            .item{
              text-align: center;
              font-size: 0.28rem;
              .price{
                color: #fede00;
                em{
                  font-style: normal;
                  font-size: 0.32rem;
                  font-weight: 800;
                }
              }
              .title{
                padding-top: 0.1rem;
              }
            }
          }
          .activity_data2{
            padding: 0.4rem 0.2rem 0;
            font-size: 0.3rem;
            .item{
              @include flex(space-between)
              margin-bottom: 0.2rem;
              .price{
                color: #fede00;
              }
              .mobile_input{
                border-radius:0.08rem;
                overflow:hidden;
                @include flex(space-between)
                .number,.minus,.plus{
                  text-align: center;
                  height: 0.6rem;
                  line-height: 0.6rem;
                }
                .minus,.plus{
                  width: 0.5rem;
                  color:#666666;
                  background: #e5e5e5;
                  font-weight: 800;
                  font-size: 0.28rem;
                }
                .number{
                  width: 1.5rem;
                  background: white;
                }
              }
              &:first-child {
                margin-bottom: 0.4rem;
              }
            }
          }
        }
        .mobile_btn{
          width: 94%;
          height: 0.8rem;
          background: linear-gradient(to right, #ffaf01 10%, #f9580d);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffaf01', endColorstr='#f9580d',GradientType=1 );
          margin-top: 0.3rem;
          margin-left: 3%;
          border:0;
          color:#fff
        }
      }
      .mobile_activity_info{
        background: #240f30;
        .item{
          width: 94%;
          margin-left: 3%;
          padding-top: 0.3rem;
          overflow: hidden;
          font-size: 0.3rem;
          .item_data_box {
            background: url('~assets/images/3.png');
            background-size: 100% 100%;
            padding: 0.2rem 0.3rem;
            .item_data{
              height: 0.7rem;
              line-height: 0.7rem;
              color: #bfbebf;
              .one_left{
                color: #fcfcfd;
                float: left;
              }
              .one_right{
                color: #bfbebf;
                float: right;
              }
              &:not(:last-child){
                border-bottom:1px solid #602ba3;
              }
            }
          }
          h5{
            color:#f8b551;
            font-size: 0.36rem;
            text-align: center;
            margin-bottom: 0.3rem;
          }
        }
        .logo{
          text-align: center;
          margin-top:20px;
          .logo_img{
            display: inline-block;
            width:140px;
            height:29px;
            background: url('~assets/images/css_sprites.png') -10px -364px;
          }
        }
        .tel{
          text-align: center;
          margin-top: 0.3rem;
          padding-bottom: 0.4rem;
        }
      }
    }
    .activity_pc .activity_form .buy_input,.activity_mobile .mobile_activity_form{
      label{
        display: block;
        width:360px;
        span:nth-child(2){
          display: inline-block;
          vertical-align: middle;
          margin-left:5px;
          font-size: 12px;
          a{
            color:#fff
          }
        }
        color:#fff;
        input{
          @include checkbox(18,2px)
          background: #fff;
          &:checked{
            background: #fff;
            border-color: #fff;
            &:before{
              border-color: $text;
            }
          }
        }
        @media screen and (max-width: $mobile) {
          width:100%;
          padding:0.3rem;
          input{
            width: 14px;
            height: 14px;
          }
          span:nth-child(2){
            margin-left:0.1rem;
            font-size: 0.28rem;
            width: calc(100% - 20px);
          }
        }
      }
    }
    .popup.pay_type_select{
      &:not(.mobile_popup) .popup_con{
        border-radius:10px;
        .select_pay_type{
          border-bottom:1px solid $border;
          .pay_text{
            @include pay_type
          }
        }
        .popup_title{
          border-radius:10px;
          text-align: left;
          background: #fff;
          margin-bottom:15px;
          margin-top:10px;
          .pay_type_title{
            display: inline-block;
            padding:0 20px;
            background: $blue;
            color:#fff;
            font-size: 16px;
            line-height: 2;
            margin-left:-10px;
          }
          .pay_type_desc{
            font-size: 12px;
            color:$light_black;
            margin-left:20px;
          }
          .icon_close{
            top: 0;
          }
        }
        .form{
          padding: 20px 200px;
          .form_field .input{
            margin-bottom:0;
            & > span:nth-child(1),& > span:nth-child(2){
              display: none
            }
            & > span:last-child{
              top:13px;
              left:110%
            }
            input{
              padding-left:15px;
              height:42px;
            }
          }
          .count_btn {
            top: 0;
            right: 0;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            height: 42px;
            line-height: 42px;
          }
          button{
            background: $orange;
            border-color:$orange;
          }
        }
      }
      &.mobile_popup .popup_con{
        .mobile_pay_type{
          @include mobile_pay_type
          padding-bottom:0
        }
        .form{
          padding: 0.3rem;
        }
      }
    }
  }
</style>
