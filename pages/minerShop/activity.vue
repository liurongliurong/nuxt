<template>
  <div class="activity_box">
    <div class="bg_box" v-if="!isMobile">
        <img src="../../assets/images/swiper/5_1.jpg"/>  
    </div>
    <div class="mobile_bg_box" v-else>
      <img :src="require('@/assets/images/swiper/mobile4.jpg')" alt="">
      <h1>{{data.name}}</h1>
    </div>
    <div class="buy_form"  v-if="!isMobile">
      <div class="form_bg">
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
          <p>总算力：<span>{{totalHash}}T</span></p>
          <p>需支付：<span>{{totalPrice}}元</span></p>
          <button @click="gobuy()">立即支付</button>
          <label for="accept">
            <input type="checkbox" :value="accept" id="accept" name="accept">
            <span @click="openContract(1)">阅读并接受<a href="javascript:;">{{activityType[activity].agreement}}</a></span>
            <span class="select_accept">{{tips}}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="body_activity"  v-if="!isMobile">
      <div class="activity_img">
        <h4>产品简介</h4>
        <p style="padding-bottom:0;">AvalonMiner 740采用88 x A3212 16纳米芯片，是最新的迦南AvalonMiner，具有7.3可靠的每秒散列速率（RTHS）。</p>
        <p style="padding-top:28px;">通过将我们的AvalonMiner控制器（另售）连接到单个AUC3（AvalonMiner USB转换器3），您可以连接五个AvalonMiner。为了最大限度地利用，您可以将AvalonMiner控制器连接到4个AUC3设备，每个AUC3设备可以连接到5个AvalonMiners，以同时管理20个AvalonMiner 741达到146 TH / s（RTHS）。</p>
        <h4>官方参数</h4>
        <div class="activity_content">
          <div class="activity_left">
            <img :src="require('@/assets/images/kuan.jpg')"/>
            <h6>翼比特矿机E9+</h6>
          </div>
          <div class="activity_right">
            <div class="activity_one" v-for="n, k in activityOne">
              <span class="one_left">{{n.title}}</span>
              <!-- <span class="one_right">{{k}}</span> -->
               <span class="one_right" v-if="k === 'hash'">{{data[k]}}</span> 
               <span class="one_right" v-else-if="k === 'chips_num'">{{data.product_info ? data.product_info[k] : ''}}</span>  
               <span class="one_right" v-else>{{hashcontent[k]}}</span>   
            </div>
          </div>
        </div>
      </div>
      <div class="activity_vs">
        <h4>云算力VS自己挖坑</h4>
        <div class="activity_ul">
          <div class="activity_li" v-for="n, k in activityUl">
            <p class="left">{{n.left}}</p>
            <p class="unit">{{n.unit}}</p>
            <p class="right">{{n.right}}</p>
          </div>
        </div>
        <p class="bottom">本次活动最终解释权归算力网所有</p>
      </div>
    </div>
    <div class="mobile_form" v-else>
      <div class="sideone">
        <div class="flexone">
          <div v-for="t,k in text" class="flextwo">
            <p class="price"><em>{{data[k]}}</em> {{t.unit}}</p>
            <p class="title">{{t.title}}</p>
          </div>
        </div>
        <div class="bottom">
          <div class="one" style="margin-bottom:1rem;">
            <span class="title">购买数量</span>
            <span class="flex">
              <span class="aes" @click="changeNum(+number-1)">-</span>
              <input type="number" v-model="number" name="number" placeholder="购买数量" class="number" @blur="changeNum(number)"/>
              <span class="desc" @click="changeNum(+number+1)">+</span>
            </span>
          </div>
          <div class="one">
            <span class="title">购买算力</span>
            <span class="price">{{totalHash}}T</span>
          </div>
          <div class="one">
            <span class="title">支付金额</span>
            <span class="price">{{totalPrice}}元</span>
          </div>
        </div>
      </div>
      <button class="submit" @click="gobuy(1)">立即支付</button>
      <label for="accept">
        <input type="checkbox" :value="accept" id="accept" name="accept" @click="setAssept">
        <span @click="openContract(1)">阅读并接受<a href="javascript:;">{{activityType[activity].agreement}}</a></span>
        <span class="select_accept">{{tips}}</span>
      </label>
      <div class="imagesall">
        <h5>翼比特矿机E9+ 官方参数</h5>
        <div class="imagesbig">
          <div class="activity_one" v-for="n, k in activityOne">
            <span class="one_left">{{n.title}}</span>
            <span class="one_right" v-if="k === 'hash'">{{data[k]}}</span> 
            <span class="one_right" v-else-if="k === 'chips_num'">{{data.product_info ? data.product_info[k] : ''}}</span>  
            <span class="one_right" v-else>{{hashcontent[k]}}</span>
          </div>
        </div>
      </div>
      <div class="logo">
        <div class="logo_img"></div>
      </div>
      <p class="tel">咨询电话： 0571-28031736</p>
    </div>
    <MyMask :form="form[nowForm]" :title="title" :contract="contract" v-if="edit"></MyMask>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import MyMask from '@/components/common/Mask'
  import FormField from '@/components/common/FormField'
  import { mapState } from 'vuex'
  export default {
    components: {
      MyMask, FormField
    },
    data () {
      return {
        activityOne: {hash: {title: '算   力', value: '9TH/S (-5%~+10%)'}, wallPower: {title: '墙上功耗比', value: '145W/T（AC/DC 93%的效率）'}, voltage: {title: '额定电压', value: '11.8V～13.0V'}, minerOuterSize: {title: '外箱尺寸', value: '9个6PIN接口'}, chips_num: {title: '芯片数量', value: 'DW1227 132颗（14nm LPP工艺）'}, minerSize: {title: '矿机尺寸', value: '290mm*126mm*155mm'}, weight: {title: '重量', value: '4.7KG'}, network: {title: '网络连接', value: '以太网'}, temperature: {title: '工作温度', value: '-10℃～40℃'}, humidity: {title: '工作湿度', value: '5%RH～95%RH 非凝露'}},
        activityUl: [{left: '规模化部署，专业的散热设备，远离运行噪音，使用低价合规电。', unit: '运行', right: '在家运行占空间，又会产生大量的噪音和热量，家用电的成本也是不小的开支。'}, {left: '基础设施全方位提供服务。', unit: '配套', right: '需要自己购买专用电源、控制组件和矿机支架等。'}, {left: 'IT专业人员进行配置、维护。', unit: '软件', right: '组装矿机后需要专业的软件支持，对于新人需要付出一定的学习成本。'}, {left: '出现问题平台负责解决，并安排专业人员进行维修。', unit: '维修', right: '一旦矿机出现问题，需要自行解决维修问题，挖矿停止，将会造成一定的损失。'}],
        text: {one_amount_value: {unit: '元/台', title: '算力服务器价格'}, hash: {unit: 'T/台', title: '服务器算力'}, left_amount: {unit: '台', title: '剩余数量'}},
        data: {},
        form: {auth: [{name: 'truename', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'card_type', type: 'text', title: '证件类型', edit: 'card_type', isChange: true}, {name: 'idcard', type: 'text', title: '证件号码', placeholder: '请输入您的证件号码', pattern: 'idCard'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}], address: [{name: 'post_user', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'post_mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'}, {name: 'address', type: 'select', title: '地址', isChange: true}, {name: 'area_details', type: 'text', title: '详细地址', placeholder: '请输入详细地址', isChange: true}]},
        mobileData: [{title: '算力服务器价格', unit: '元/台'}, {title: '服务器算力', unit: 'T'}, {title: '剩余总量', unit: '台'}],
        activityType: {1: {dataRequest: 'showMiner', dataCommit: 'saveMiner', agreement: '《矿机销售协议》'}, 2: {dataRequest: 'showProduct', dataCommit: 'productMall', agreement: '《云算力购买协议协议》和《矿机托管协议》'}},
        totalHash: '0.00',
        totalPrice: '0.00',
        number: '',
        tips: '',
        accept: false,
        edit: 0,
        title: '',
        contract: '',
        content: '',
        card_type: '中国大陆身份证',
        nowForm: 'auth',
        addressData: '',
        activity: 2,
        hashcontent: ''
      }
    },
    methods: {
      changeNum (n) {
        // var maxNum = +this.data.amount - (+this.data.sell_amount)
        // if (this.data.num < 1) {
        //   api.tips('您已超过购买限制', this.isMobile)
        //   return false
        // }
        // this.number = n < 1 ? 1 : n > this.data.num ? this.data.num : n > maxNum ? maxNum : n
        this.number = n < 1 ? 1 : n > 11 ? 11 : n
        this.totalHash = this.number * this.data.hash
        this.totalPrice = this.number * this.data.one_amount_value
      },
      openContract (n) {
        this.openMask(n)
        document.body.style.overflow = 'hidden'
        if (n === 1) {
          this.contract = this.content
          this.title = '协议详情'
          this.accept = true
        } else if (n === 2) {
          this.contract = ''
          this.title = '实名认证'
        } else if (n === 3) {
          this.nowForm = 'address'
          this.contract = ''
          this.title = '收货地址'
        }
      },
      gobuy () {
        // if (this.data.num < 1) {
        //   api.tips('您已超过购买限制', this.isMobile)
        //   return false
        // }
        if (!this.token) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'auth-login'})
          this.$store.commit('LOGOUT')
          return false
        }
        if (!this.true_name) {
          this.openContract(2)
          return false
        }
        var url = 'productMall'
        // var url = 'saveMiner'
        // if (!this.addressData) {
        //   this.openContract(3)
        //   return false
        // }
        var ele = document.querySelector('#accept')
        if (!this.number) {
          this.check(ele, '请填写数量')
          return false
        }
        if (!(ele.checked || this.accept)) {
          this.check(ele, '请同意服务条款')
          return false
        }
        var callbackUrl = location.protocol + '//' + location.host + '/'
        // var data = {miner_id: this.data.miner_id, number: this.number, mode: '2', token: this.token, user_id: this.user_id, amount: this.totalPrice, url: callbackUrl}
        var data = {product_id: this.data.product_id, num: this.number, mode: '1', token: this.token, user_id: this.user_id, amount: this.totalPrice, url: callbackUrl}
        var self = this
        util.post(url, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            res.subject = encodeURIComponent(res.subject)
            if (self.isMobile) {
              res = Object.assign(res, {is_mobile: 1})
            } else {
              res = Object.assign(res, {is_mobile: 0})
            }
            util.post('alipay_wap', {sign: api.serialize(Object.assign({token: self.token}, res))}).then((resData) => {
              api.checkAjax(self, data, () => {
                location.href = resData.url
              })
            })
          })
        })
      },
      closeMask () {
        document.body.style.overflow = 'auto'
        this.edit = ''
      },
      check (ele, str) {
        // if (this.data.num < 1) {
        //   api.tips('您已超过购买限制', this.isMobile)
        //   return false
        // }
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
      submit () {
        var form = document.querySelector('.form_content') || document.querySelector('.form')
        var data = api.checkFrom(form, this.isMobile)
        if (!data) return false
        var sendData = {token: this.token, user_id: this.user_id}
        if (this.nowForm === 'address') {
          this.addressData = data
          api.tips('收货地址已提交，点击“立即支付”完成购买', this.isMobile)
          this.closeMask(this.isMobile)
        } else {
          var val = 'true_name'
          var tipsStr = '实名认证已提交，请您耐心等待几秒即可看到认证结果'
          var tipsStr2 = '恭喜您实名认证成功，请填写收货地址'
          var self = this
          util.post('user_truename', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
            api.checkAjax(self, res, () => {
              api.tips(tipsStr, self.isMobile)
              self.$store.commit('SET_INFO', {[val]: {status: 0}})
              setTimeout(() => {
                self.requestData('show_user_truename', sendData, val, () => {
                  api.tips(tipsStr2, self.isMobile)
                  self.openContract(3, self.isMobile)
                })
              }, 7000)
              self.closeMask(self.isMobile)
            })
          })
        }
      },
      requestData (url, sendData, val, callback) {
        var self = this
        util.post(url, {sign: api.serialize(sendData)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.$store.commit('SET_INFO', {[val]: res})
            if (callback) {
              callback()
            }
          }, '', () => {
            self.$store.commit('SET_INFO', {[val]: ''})
          })
        })
      },
      openMask (n) {
        window.scroll(0, 0)
        this.edit = n
      },
      setAssept (e) {
        this.accept = e.target.checked
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        isMobile: state => state.isMobile
      })
    },
    mounted () {
      if (api.checkWechat()) {
        api.tips('请在浏览器里打开', 1)
      }
      var self = this
      // var url = 'showMiner'
      var url = 'showProduct'
      util.post(url, {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.data = res
          self.hashcontent = res.product_info.has_product_miner_base
          self.content = res.content + '<hr>' + res.content1
          // self.content = res.content
        }, '', () => {
          // self.$router.push({name: 'index'})
        })
      })
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/style.scss';
  .activity_box{
    width: 100%;
    min-height:700px;
    overflow: hidden;
    // background: url('../../assets/images/activity1.jpg');
    background-size: 100% 100%;
    background: #240f30;
    .bg_box{
      @include bg(1920,730px,none)
    }
    .body_activity{
      width: 100%;
      height: auto;
      background: url('../../assets/images/activity.jpg');
      // background-color: 
      .activity_vs{
        @include main
        padding:65px 0;
        padding-top:20px;
        h4{
          width:100%;
          text-align:center;
          font-size: 28px;
          color:#ff9f00;
          font-weight: 800;
          padding-bottom: 10px;
        }
        .activity_ul{
          width: 100%;
          overflow: hidden;
          margin-top: 55px;
          .activity_li{
            width: 100%;
            height: 100px;
            margin-bottom: 1px;
            position: relative;
            .left{
              width: 49.9%;
              height: 100%;
              box-sizing: border-box;
              border:4px solid #966cff;
              margin-right: 1px;
              float: left;
              background: #2c1963;
              line-height: 100px;
              text-align: left;
              font-size: 14px;
              color: white;
              text-align: center;
              padding:0 52px;
              box-sizing: border-box;
              word-break: break-all;
            }
            .unit{
              position: absolute;
              width: 82px;
              height: 82px;
              border-radius: 100%;
              border:10px solid #240f30;
              background: #ff9b01;
              color: white;
              font-size: 14px;
              line-height: 82px;
              text-align: center;
              line-height: 66px;
              text-align: center;
              left: 545px;
              top: 10px;
            }
            .right{
              width: 49.9%;
              height: 100%;
              box-sizing: border-box;
              border:4px solid #cbbaff;
              margin-right: 1px;
              float: left;
              background: #917cce;
              line-height: 100px;
              font-size: 14px;
              text-align: center;
              color: white;
              padding:0 70px;
              box-sizing: border-box;
              word-break: break-all;
            }
          }
          :nth-child(1) {
            .right{
              line-height: 24px;
              text-align: left;
              padding-top:23px;
            }
          }
          :nth-child(4) {
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
          width:100%;
          margin-top: 114px;
        }
      }
    }
    .buy_form{
      height:470px;
      color:$white;
      background: #1f1135;
      .form_bg{
        @include bg(1213,424px,transparent)
      }
      .buy_title,.buy_desc,.buy_input{
        position: absolute;
        left:50%;
        top:110px;
      }
      .buy_title{
        margin-left:-500px;
        top:0;
        b{
          color:#f8b551;
          font-size: 28px;
          font-weight: normal;
        }
        .title_key{
          margin-left:100px;
          font-size: 16px;
        }
        .title_val{
          color:#f8b551;
          font-size: 16px;
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
          @include number_box
          border-radius:5px;
          overflow:hidden;
          margin:10px 0;
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
        label{
          width:360px;
        }
      }
    }
    .mobile_bg_box{
      h1{
        width: 100%;
        color: white;
        font-size: 0.7rem;
        text-align: center;
        margin-bottom: 0.5rem;
        position: absolute;
        top: 7rem;
      }
    }
    .mobile_form{
      background: #240f30;
      margin-top: 1rem;
      .sideone{
        width: 96%;
        margin-left: 2%;
        overflow: hidden;
        background: linear-gradient(45deg, #7524ED 10%, #DA1FE0);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7524ED', endColorstr='#DA1FE0',GradientType=1 );
        padding:0 .3rem;
        border-radius:10px;
        box-sizing: border-box;
        padding-bottom: 0.5rem;
        .flexone{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-bottom: 1px dashed white;
          padding-bottom: 0.7rem;
          .flextwo{
            width:  33.3%;
            text-align: center;
            .price{
              color: #fede00;
              font-size: 0.5rem;
              em{
                font-style: normal;
                font-size: 0.7rem;
                font-weight: 800;
              }
            }
            .title{
              font-size: 0.5rem;
              color: white;
              padding-top: 0.1rem;
            }
          }
        }
       .bottom{
          padding-top: 1rem;
          .one{
            width: 100%;
            padding: 0 0.5rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: .5rem;
            .title{
              font-size: 0.6rem;
            }
            .price{
              color: #fede00;
              font-size: 0.6rem;
            }
            span{
              color:white;
              &.flex{
                display: flex;
                justify-content: space-between;
                .number{
                  width: 3rem;
                  height: 1rem;
                  background: white;
                  text-align: center;
                  line-height: 1rem;
                  border-radius:0
                }
                .aes{
                  width: 1.2rem;
                  height: 1rem;
                  border-top-left-radius: .1rem;
                  border-bottom-left-radius: .1rem;
                  text-align: center;
                  color:#666666;
                  background: #e5e5e5;
                  font-weight: 800;
                  font-size: 0.8rem;
                  line-height: 1rem;
                }
                .desc{
                  width: 1.2rem;
                  height: 1rem;
                  border-top-right-radius: .1rem;
                  border-bottom-right-radius: .1rem;
                  text-align: center;
                  color:#666666;
                  background: #e5e5e5;
                  font-weight: 800;
                  font-size: 0.8rem;
                  line-height: 1rem;
                }
              }
            }
          }
        }
      }
      .submit{
        width: 94%;
        height: 1.8rem;
        background: linear-gradient(to right, #ffaf01 10%, #f9580d);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffaf01', endColorstr='#f9580d',GradientType=1 );
        margin-top: 1rem;
        margin-left: 3%;
        color:white;
        border:0;
      }
      .radio{
        color: white;
        font-size: 0.5rem;
        width: 100%;
        text-align: center;
        margin-top: 0.5rem;
        input{
          width: 0.6rem;
          background: white;
          height: 0.6rem;
          border-radius: .1rem;
          margin-right: .2rem;
          position: relative;
          top: .1rem;
        }
      }
      .imagesall{
        width: 94%;
        margin-left: 3%;
        margin-top: 1rem;
        overflow: hidden;
        .imagesbig{
          background: url('../../assets/images/3.png');
          background-size: 100% 100%;
          padding:0 .5rem;
          box-sizing: border-box;
        }
        h5{
          color:#f8b551;
          font-size: 0.7rem;
          text-align: center;
          width: 100%;
          margin-bottom: 1rem;
        }
        .activity_one{
          width: 100%;
          height: 1.3rem;
          line-height: 1.3rem;
          color: #bfbebf;
          font-size: 0.5rem;
          border-bottom:1px solid #602ba3;
          .one_left{
            color: #fcfcfd;
            float: left;
          }
          .one_right{
            color: #bfbebf;
            float: right;
          }
        }
      }
      .logo{
        text-align: center;
        margin-top:20px;
        .logo_img{
          display: inline-block;
          width:140px;
          height:29px;
          background: url('../../assets/images/css_sprites.png') -10px -364px;
        }
      }
      .tel{
        width: 100%;
        color: white;
        text-align: center;
        margin-top: 0.5rem;
        padding-bottom: 1rem;
      }
      label{
        width:100%;
        padding:15px;
      }
    }
    .buy_form .buy_input,.mobile_form{
      label{
        display: block;
        span:nth-child(2){
          display: inline-block;
          vertical-align: middle;
          margin-left:5px;
          font-size: 12px;
          a{
            color:#fff
          }
        }
        @include accept_label
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
          font-size: 0.5rem;
        }
      }
    }
    .activity_img{
      @include main
      padding:65px 0;
      padding-bottom:0;
      padding-top:0;
      h4{
        width:100%;
        text-align:center;
        font-size: 28px;
        color:#ff9f00;
        font-weight: 800;
        padding-bottom: 10px;
      }
      p{
        color:white;
        line-height: 27px;
        font-size: 14px;
        padding-top: 33px;
        padding-bottom:65px;
      }
      .activity_content{
        margin-top: 40px;
        width: 100%;
        margin-bottom: 87px;
        background: url('../../assets/images/3.png') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        text-align: center;
        .activity_left{
          width: 50%;
          float: left;
          overflow: hidden;
          img{
            width: 347px;
            height: auto;
            margin-top: 120px;
          }
          h6{
            font-size: 28px;
            color:#f8b551;
            margin-top: 65px;
            margin-bottom: 86px;
          }
        }
        .activity_right{
          width: 50%;
          text-align: left;
          float: left;
          margin-bottom: 40px;
          .activity_one{
            margin-top: 36px;
            color:white;
            display: block;
            height: 20px;
            padding-right: 36px;
            box-sizing: border-box;
            width: 100%;
            font-size: 17px;
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
    .mask_con{
      h2{
        line-height: 52px;
        padding:0 28px;
        border-bottom: 1px solid $border;
      }
    }
  }
</style>
