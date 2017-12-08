<template>
  <div class="activity_box">
    <div class="bg_box">
      <img :src="require('@/assets/images/swiper/5_1.jpg')"/>
    </div>
    <div class="mobile_bg_box">
      <img :src="require('@/assets/images/swiper/mobile4.jpg')" alt="">
    </div>
    <div class="buy_form">
      <div class="form_bg">
        <img :src="require('@/assets/images/buy_bg.png')" alt="">
        <div class="buy_title">
          <b>{{data.name}}</b>
        </div>
        <div class="buy_desc">
          <div class="item" v-for="t,k in text">
            <div class="item_num">
              <b>{{data[k]}}</b>
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
            <span @click="openContract(1)">阅读并接受<a href="javascript:;"  style="color:blue;">《矿机销售协议》</a></span>
            <span class="select_accept">{{tips}}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="mobile_form">
      <h1>{{data.name}}</h1>
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
        <span @click="openContract(1, 1)">阅读并接受<a href="javascript:;" style="color:blue;">《矿机销售协议》</a></span>
        <span class="select_accept">{{tips}}</span>
      </label>
      <div class="imagesall">
        <h5>翼比特矿机E9+ 官方参数</h5>
        <div class="imagesbig">
          <div class="activity_one"><span class="one_left">算   力</span><span class="one_right">9TH/S (-5%~+10%)</span></div>
          <div class="activity_one"><span class="one_left">墙上功耗比</span><span class="one_right">145W/T（AC/DC 93%的效率）</span></div>
          <div class="activity_one"><span class="one_left">额定电压</span><span class="one_right">11.8V～13.0V</span></div>
          <div class="activity_one"><span class="one_left">电源接口</span><span class="one_right">9个6PIN接口</span></div>
          <div class="activity_one"><span class="one_left">芯片数量</span><span class="one_right">DW1227 132颗（14nm LPP工艺）</span></div>
          <div class="activity_one"><span class="one_left">几何尺寸</span><span class="one_right">290mm*126mm*155mm</span></div>
          <div class="activity_one"><span class="one_left">重   量</span><span class="one_right">4.7KG</span></div>
          <div class="activity_one"><span class="one_left">网络连接</span><span class="one_right">以太网</span></div>
          <div class="activity_one"><span class="one_left">工作温度</span><span class="one_right">-10℃～40℃</span></div>
          <div class="activity_one"><span class="one_left">工作湿度</span><span class="one_right">5%RH～95%RH 非凝露</span></div>
        </div>
      </div>
      <div class="logo">
        <div class="logo_img"></div>
      </div>
      <p class="tel">咨询电话： 0571-28031736</p>
    </div>
    <div class="activity_img">
      <h4>产品简介</h4>
      <p>翼比特E9+矿机采用亿绑最新自助研发的14nm芯片，算力均值可达9TH/S，能耗比145W/T。低功耗、高算力，采用独立散热片，散热更好。散热片采用最新粘合技术，外壳材质更坚固，为您的矿机提供更好的保护，为全球的矿工带来高效益。</p>
      <h4>官方参数</h4>
      <div class="activity_content">
        <div class="activity_left">
          <img :src="require('@/assets/images/kuan.png')"/>
          <h6>翼比特矿机E9+</h6>
        </div>
        <div class="activity_right">
          <div class="activity_one"><span class="one_left">算   力</span><span class="one_right">9TH/S (-5%~+10%)</span></div>
          <div class="activity_one"><span class="one_left">墙上功耗比</span><span class="one_right">145W/T（AC/DC 93%的效率，25℃工作温度）</span></div>
          <div class="activity_one"><span class="one_left">额定电压</span><span class="one_right">11.8V～13.0V</span></div>
          <div class="activity_one"><span class="one_left">电源接口</span><span class="one_right">9个6PIN接口</span></div>
          <div class="activity_one"><span class="one_left">芯片数量</span><span class="one_right">DW1227 132颗（14nm LPP工艺）</span></div>
          <div class="activity_one"><span class="one_left">几何尺寸</span><span class="one_right">290mm*126mm*155mm</span></div>
          <div class="activity_one"><span class="one_left">重   量</span><span class="one_right">4.7KG</span></div>
          <div class="activity_one"><span class="one_left">网络连接</span><span class="one_right">以太网</span></div>
          <div class="activity_one"><span class="one_left">工作温度</span><span class="one_right">-10℃～40℃</span></div>
          <div class="activity_one"><span class="one_left">工作湿度</span><span class="one_right">5%RH～95%RH 非凝露</span></div>
        </div>
      </div>
    </div>
    <MyMask :form="form[nowForm]" :title="title" :contract="contract" v-if="edit"></MyMask>
    <mt-popup position="bottom" v-model="mobileEdit" :closeOnClickModal="false">
      <div class="close" @click="closeEdit(1)">
        <span class="icon"></span>
      </div>
      <div class="agreement" v-if="contract" v-html="contract"></div>
      <form class="form" @submit.prevent="submit" novalidate v-else>
        <FormField :form="form[nowForm]"></FormField>
        <button name="btn">提交</button>
      </form>
    </mt-popup>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
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
        text: {one_amount_value: {unit: '元/台', title: '算力服务器价格'}, hash: {unit: 'T/台', title: '服务器算力'}, left_amount: {unit: '台', title: '剩余数量'}},
        data: {},
        form: {auth: [{name: 'truename', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'card_type', type: 'text', title: '证件类型', edit: 'card_type', isChange: true}, {name: 'idcard', type: 'text', title: '证件号码', placeholder: '请输入您的证件号码', pattern: 'idCard'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}], address: [{name: 'post_user', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'post_mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'}, {name: 'address', type: 'select', title: '地址', isChange: true}, {name: 'area_details', type: 'text', title: '详细地址', placeholder: '请输入详细地址', isChange: true}]},
        mobileData: [{title: '算力服务器价格', unit: '元/台'}, {title: '服务器算力', unit: 'T'}, {title: '剩余总量', unit: '台'}],
        totalHash: '0.00',
        totalPrice: '0.00',
        number: '',
        tips: '',
        accept: false,
        edit: 0,
        mobileEdit: false,
        title: '',
        contract: '',
        content: '',
        card_type: '中国大陆身份证',
        nowForm: 'auth',
        addressData: '',
        isMobile: false
      }
    },
    methods: {
      changeNum (n) {
        // var maxNum = +this.data.amount - (+this.data.sell_amount)
        // if (this.data.num < 1) {
        //   api.tips('您已超过购买限制')
        //   return false
        // }
        // this.number = n < 1 ? 1 : n > this.data.num ? this.data.num : n > maxNum ? maxNum : n
        this.number = n < 1 ? 1 : n > 11 ? 11 : n
        this.totalHash = this.number * this.data.hash
        this.totalPrice = this.number * this.data.one_amount_value
      },
      openContract (n, mobile) {
        this.isMobile = mobile
        this.openMask(mobile, n)
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
      gobuy (mobile) {
        this.isMobile = mobile
        // if (this.data.num < 1) {
        //   api.tips('您已超过购买限制')
        //   return false
        // }
        if (!this.token) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'login'})
          this.$store.commit('LOGOUT')
          return false
        }
        if (!this.true_name) {
          this.openContract(2, mobile)
          return false
        }
        if (!this.addressData) {
          this.openContract(3, mobile)
          return false
        }
        var ele = document.querySelector('#accept')
        if (!this.number) {
          this.check(ele, '请填写数量', mobile)
          return false
        }
        if (!(ele.checked || this.accept)) {
          this.check(ele, '请同意服务条款', mobile)
          return false
        }
        var callbackUrl = location.protocol + '//' + location.host + '/'
        var data = {miner_id: this.data.miner_id, number: this.number, mode: '2', token: this.token, user_id: this.user_id, amount: this.totalPrice, url: callbackUrl}
        var self = this
        util.post('saveMiner', {sign: api.serialize(Object.assign(this.addressData, data))}).then(function (res) {
          api.checkAjax(self, res, () => {
            res.subject = encodeURIComponent(res.subject)
            if (mobile) {
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
      closeEdit (mobile) {
        document.body.style.overflow = 'auto'
        if (mobile) {
          this.mobileEdit = false
        } else {
          this.edit = ''
        }
      },
      check (ele, str) {
        // if (this.data.num < 1) {
        //   api.tips('您已超过购买限制')
        //   return false
        // }
        if (this.isMobile) {
          this.myToast(str)
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
        var data = api.checkFrom(form, this, this.isMobile)
        if (!data) return false
        var sendData = {token: this.token, user_id: this.user_id}
        if (this.nowForm === 'address') {
          this.addressData = data
          this.prompt('收货地址已提交，点击“立即支付”完成购买')
          this.closeEdit(this.isMobile)
        } else {
          var val = 'true_name'
          var tipsStr = '实名认证已提交，请您耐心等待几秒即可看到认证结果'
          var tipsStr2 = '恭喜您实名认证成功，请填写收货地址'
          var self = this
          util.post('user_truename', {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.prompt(tipsStr)
              self.$store.commit('SET_INFO', {[val]: {status: 0}})
              setTimeout(() => {
                self.requestData('show_user_truename', sendData, val, () => {
                  self.prompt(tipsStr2)
                  self.openContract(3, self.isMobile)
                })
              }, 7000)
              self.closeEdit(self.isMobile)
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
      prompt (str) {
        if (this.isMobile) {
          this.myToast(str)
        } else {
          api.tips(str)
        }
      },
      openMask (mobile, n) {
        window.scroll(0, 0)
        if (mobile) {
          this.mobileEdit = true
        } else {
          this.edit = n
        }
      },
      myToast (str) {
        Toast({
          message: str,
          position: 'middle',
          duration: 3000
        })
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
        true_name: state => state.info.true_name
      })
    },
    mounted () {
      if (api.checkWechat()) {
        this.myToast('请在浏览器里打开')
      }
      var self = this
      util.post('showMiner', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.data = res
          // self.content = res.content + '<hr>' + res.content1
          self.content = res.content
        }, '', () => {
          self.$router.push({name: 'home'})
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
    background: #151136;
    .bg_box{
      @include bg(1920,520px,#110d30)
      @include mobile_hide
    }
    .mobile_bg_box{
      @include mobile_show
    }
    .buy_form{
      height:530px;
      padding-top:40px;
      background: #151136;
      color:$white;
      background: linear-gradient(to bottom, #151136 20%, #2f006d);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#151136', endColorstr='#2f006d',GradientType=0 );
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
      @include mobile_hide
    }
    .mobile_form{
      @include mobile_show
      background: #151136;
      h1{
        width: 100%;
        color: white;
        font-size: 0.7rem;
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
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
        }
        @include accept_label
        &, & a{
          color:#fff;
        }
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
      @include mobile_hide
      @include main
      padding:65px 0;
      h4{
        width:100%;
        text-align:center;
        font-size: 28px;
        color:#f8b551;
      }
      p{
        color:white;
        line-height: 33px;
        font-size: 18px;
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
            height: 212px;
            margin-top: 136px;
          }
          h6{
            font-size: 28px;
            color:#f8b551;
            margin-top: 65px;
            margin-bottom: 129px;
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
    .mint-popup{
      @include popup
    }
  }
  hr{
    display:none;
  }
</style>
