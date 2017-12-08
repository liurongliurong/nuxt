<template>
  <article class="bdc">
    <div class="bg-box">
      <div class="bg"></div>
    </div>
    <div class="top-box-row">
      <div class="top-box">
        <div class="float-left bdc-box">
          <div><span class="big-title">BDC</span><span class="subtitle">（Blockchain   Data   Center）</span></div>
          <div class="bdc-detail">BDC是平台整合优质品牌商与分销商，通过平台的优势及服务以吸引广大消费者的一种形式，算力网通过自身的优势整合筛选出行业内优质合规的BDC机房，算力服务器生产商，为算力爱好者提供算力服务器托管，算力服务器采购，算力服务器租赁等服务，打通算力及衍生商品产业链的完整交易，做到平台，供应商，消费者三方互惠互利。</div>
          <div><span class="service">客服：</span><span class="tel">0571- 28221076</span><span class="time">工作日（9:00~18:00）</span></div>
        </div>
        <div class="float-right form-box">
          <div class="form-header">提交托管矿机申请</div>
          <form class="data_form" @submit.prevent="submit" novalidate v-if="!success">
            <div class="form-line"><span class="label">申请人</span><input type="text" v-model.trim="depName" placeholder="请输入您的姓名" @blur="test"></div>
            <div class="form-line"><span class="label">手机号码</span><input type="text" name="depTel" v-model.trim="depTel" pattern="^1[3578][0-9]{9}$" placeholder="请输入手机号码" @blur="test" title="请输入11位手机号"></div>
            <div class="form-line"><span class="label">手机验证码</span><input type="text" v-model.trim="code" pattern="^[0-9]{6}$" placeholder="手机验证码" @blur="test" title="请输入6位数字" class="yan"><div  ref="count_btn" class="form_btn" @click="getCode">{{str}}</div></div>
            <div class="form-line"><span class="label">选择BDC</span>
              <select v-model="depBdc">
                <option v-for="(item, index) in list" :key="item.bdc_name" :value="item.bdc_name">{{item.bdc_name}}</option>
              </select>
            </div>
            <div class="form-line"><span class="label">服务器类型</span><input type="text" v-model.trim="depType" placeholder="请输入算力服务器类型" @blur="test"></div>
            <div class="form-line"><span class="label">服务器数量</span><input type="text" v-model.trim="depNumber" placeholder="输入托管算力服务器数量" @blur="test" pattern="^\d+$" title="请输入整数" maxlength="5"></div>
            <div class="tips">{{tips}}</div>
            <button class="btn">提交申请</button>
          </form>
          <div class="success" v-else>
            <div>
              <div class="icon"></div>
              <p>提交成功，稍后工作人员会与您联系</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-box-row">
      <div class="item-box" v-for="(item, index) in list" :key="item.bdc_name">
        <div class="header">{{item.bdc_name}}</div>
        <div class="overflow">
          <img class="float-left" :src="item.bdc_img" alt="">
          <div class="float-left tip">
            <div class="line"><span>算力机房规模</span>{{item.bdc_scope}}</div>
            <div class="line"><span>供电类型</span>{{item.bdc_electric_type}}</div>
            <div class="line"><span>散热方式</span>{{item.bdc_radiating_type}}</div>
            <div class="line"><span>支持服务器</span>{{item.bdc_Mills_type}}</div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        list: [],
        depName: '',
        depTel: '',
        depBdc: '',
        depType: '',
        depNumber: '',
        tips: '',
        success: false,
        code: '',
        str: '验证码'
      }
    },
    methods: {
      submit () {
        let self = this
        var ff = document.querySelector('.data_form')
        var data = api.checkOne(ff, this)
        if (data.status === 'null') {
          this.tips = ff[data.n].placeholder
          ff[data.n].focus()
          return false
        } else if (data.status === 'invalid') {
          this.tips = ff[data.n].title
          ff[data.n].focus()
          return false
        }
        util.post('depositMessage', {token: this.token, dep_name: encodeURIComponent(this.depName), dep_tel: this.depTel, dep_bdc: encodeURIComponent(this.depBdc), dep_type: encodeURIComponent(this.depType), dep_number: this.depNumber, code: this.code}).then(function (res) {
          if (!res.code) {
            self.success = true
          }
        })
      },
      test (e) {
        var ele = e.target
        this.check(ele)
      },
      check (ele) {
        if (!ele.checkValidity()) {
          this.tips = ele.title
        } else {
          this.tips = ''
          return true
        }
      },
      getCode () {
        var self = this
        var form = document.querySelector('.data_form')
        if (form.depTel.value) {
          if (!api.checkFiled(form.depTel)) {
            this.tips = form.depTel.title
            return false
          }
        } else {
          this.tips = form.depTel.placeholder
          return false
        }
        if (self.$refs['count_btn'].getAttribute('disabled') === 'true') return false
        util.post('send_code', {token: this.token, mobile: form.depTel.value}).then(res => {
          this.tips = '短信验证码发送成功'
          self.conntDown()
          self.$refs['count_btn'].setAttribute('disabled', true)
        })
      },
      conntDown () {
        var self = this
        var t = 60
        var tt = setInterval(() => {
          if (t === 0) {
            self.str = '重新获取'
            clearInterval(tt)
            self.$refs['count_btn'].setAttribute('disabled', false)
          } else {
            self.str = t + 's'
            t--
          }
        }, 1000)
      }
    },
    mounted () {
      let self = this
      util.post('bdcinfoList', {token: '0'}).then(function (data) {
        self.list = data
        self.depBdc = data[0].bdc_name
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../assets/css/style.scss';
  .bdc{
    padding-top:80px;
    font-size: 18px;
    color: #fff;
  }
  .bg-box{
    width: 100%;
    height: 558px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background: #15121c;
    z-index: -1;
    & .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
  }
  .bg{
    background: url('../assets/images/bdc_bg.jpg') no-repeat;
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -960px;
  }
  .overflow{
    overflow: hidden;
  }
  .float-left{
    float: left;
  }
  .float-right{
    float: right;
  }
  .big-title{
    font-size: 48px;
    font-weight: bold;
  }
  .top-box{
    margin: 0 auto;
    width: 1180px;
    // background-color: ;
    // height: 500px;
    overflow: hidden;
    padding: 20px 0; 
  }
  .subtitle{
    font-size: 18px;
    margin-left: 20px;
  }
  .service{
    font-size: 14px;
    color: #fff;
  }
  .tel{
    font-weight: bold;
    margin-right: 10px;
  }
  .time{
    font-size: 12px;
    color: #666;
  }
  .bdc-box{
    width: 670px;
    margin-top: 85px;
  }
  .bdc-detail{
    margin: 30px 0;
    font-size: 16px;
  }
  .form-box{
    background-color: #15121c;
    width: 410px;
    height: 438px;
    padding: 10px 45px;
    .tips{
      height:30px;
      line-height:30px;
      text-align: center;
      color:$red;
      font-size: 12px;
    }
    .btn{
      color: #fff;
      width:100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #327fff;
      border-radius: 5px;
      cursor: pointer;
      border:0
    }
    .success{
      height:calc(100% - 52px);
      @include flex(center)
      .icon{
        position: relative;
        width:50px;
        height:50px;
        margin:0 auto 20px auto;
        border-radius:50%;
        background:$white;
        &:before{
          content:'';
          @include right(22,12,#15121c)
          border-width: 0 0 3px 3px;
        }
      }
    }
  }
  .form-header{
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: #fff;
  }
  .form-line{
    position: relative;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    font-size: 16px;
    line-height: 40px;
    &:not(:nth-child(6)){
      margin-bottom: 12px;
    }
    & .tip{
      position: absolute;
    }
    & .label{
      font-size: 16px;
      width: 105px;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      border-right: 1px solid #ccc;
      margin-left: 12px;
      color: #666;
    }
    & input{
      display: inline-block;
      width: 200px;
      padding-left: 20px;
      font-size: 16px;
    }
    & select{
      border: none;
      font-size: 16px;
      outline: none;
      width: 190px;
      padding-left: 20px;
      height: 40px;
    }
    .yan{
      width:113px;
      height:20px;
      border-right:1px solid #ccc;
    }
    div{
          display: inline-block;
    color: white;
    width: 70px;
    text-align: center;
    background: #327fff;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    top: -2px;
    }
  }
  .item-box-row{
    background-color: #15121c;
    padding-bottom: 35px;
  }
  .item-box{
    width: 1180px;
    margin: 0 auto;
    padding-top: 55px;
    border-bottom: 1px solid #000;
    padding-bottom: 45px;
    background-color: #15121c;
    &:last-child{
      border: none;
    }
    & img{
      width: 590px;
      height: 460px;
    }
    & .line{
      margin-bottom: 40px;
    }
    .tip{
      padding-top: 80px;
    }
    .working{
      width: 260px;
      height: 40px;
      line-height: 40px;
      background-color: #15121c;
      margin-top: 120px;
      margin-left: 170px;
      text-align: center;
    }
    & .overflow{
      background-color: #25212f;
      & span{
        font-weight: bold;
        display: inline-block;
        width: 145px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin-right: 50px;
        margin-left: 65px;
        background-color: #15121c;
      }
    }
  }
  .header{
    font-size: 24px;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    background-color: transparent;
    margin-bottom: 40px;
    &:before{
      content: '';
      display: inline-block;
      background: url('../assets/images/css_sprites.png') -10px -168px;
      width: 122px;
      height: 36px;
      vertical-align: middle;
      margin-right: 80px;
    }
    &:after{
      content: '';
      display: inline-block;
      background: url('../assets/images/css_sprites.png') -210px -68px;
      width: 122px;
      height: 37px;
      vertical-align: middle;
      margin-left: 80px;
    }
  }
</style>