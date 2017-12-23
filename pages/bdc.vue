<template>
  <article class="bdc" v-if="!isMobile">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <div class="top_box">
      <div class="float_left bdc_box">
        <div class="bdc_box_text">
          <span class="big">BDC</span>
          <span class="subtitle">（Blockchain   Data   Center）</span>
        </div>
        <div class="bdc_detail">{{text}}</div>
        <div class="service_box">
          <span class="service">客服：</span>
          <span class="tel">0571-28031736</span>
          <span class="time">工作日（9:00~18:00）</span>
        </div>
        <div class="btn_box">
          <router-link to="/mobile/bdcForm">申请入口</router-link>
        </div>
      </div>
      <div class="float_right form_box">
        <div class="form_header">提交托管矿机申请</div>
        <form class="data_form" @submit.prevent="submit" novalidate v-if="!success">
          <div class="form_line" v-for="f in form">
            <span class="label">{{f.title}}</span><input :class="{yan: f.addon}" type="text" :name="f.name" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern" :title="f.tips" :maxlength="f.maxlength" v-if="f.type==='text'">
            <div class="form_btn count_btn" @click="getCode" v-if="f.addon">{{str}}</div>
            <select :name="f.name" v-if="f.type==='select'">
              <option v-for="(item, index) in list" :key="item.bdc_name" :value="item.id">{{item.bdc_name}}</option>
            </select>
          </div>
          <div class="tips">{{tips}}</div>
          <button class="btn">提交申请</button>
        </form>
        <div class="success" v-else>
          <div>
            <div class="icon"></div>
            <p>提交成功，稍后工作人员会与您联系.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="item_box_row">
      <div class="item_box" v-for="(item, index) in list" :key="item.bdc_name">
        <div class="pc_box">
          <div class="header">{{item.bdc_name}}</div>
          <div class="overflow">
            <img class="float_left" :src="item.bdc_img" alt="">
            <div class="float_left tip">
              <div class="line"v-for="params in item.params">
                <span>{{params.name}}</span>
                {{params.value}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
  <div class="mobile_bdc" v-else>
    <div class="introduce">
      <div class="background">
        <img :src="require('@/assets/images/mobile/bdc.jpg')">
      </div>
      <div class="content">
        <p class="title">{{article.title}}</p>
        <p class="text" v-html="article.text"></p>
      </div>
    </div>
    <div class="bdc-lists">
      <div class="card" v-for="item in list">
        <span class="title">-{{item.bdc_name}}-</span>
        <img :src="item.bdc_img">
        <div v-for="params in item.params" class="line">
          <span class="name">{{params.name}}</span>
          <span class="value">{{params.value}}</span>
        </div>
      </div>
      <button class="apply">
        <router-link to="/mobile/bdcForm">点击申请矿机托管</router-link>
      </button>
      <span class="tips">算力网全国BDC即将陆续开放...</span>
    </div>
  </div>
</template>
<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        form: [
          {name: 'dep_name', type: 'text', title: '申请人', placeholder: '请输入您的姓名'},
          {name: 'dep_tel', type: 'text', title: '手机号码', placeholder: '请输入手机号码', tips: '请输入11位手机号', pattern: '^1[3578][0-9]{9}$'},
          {name: 'code', type: 'text', title: '手机验证码', placeholder: '手机验证码', addon: true, tips: '请输入6位数字', pattern: '^[0-9]{6}$'},
          {name: 'dep_bdc_id', type: 'select', title: '选择BDC'},
          {name: 'dep_type', type: 'text', title: '服务器型号', placeholder: '请输入算力服务器类型'},
          {name: 'dep_number', type: 'text', title: '服务器数量', placeholder: '输入托管算力服务器数量', tips: '请输入整数', pattern: '^[0-9]+$', maxlength: 5}
        ],
        bcdParamsLists: [
          {name: '供电类型', field: 'bdc_electric_type', value: ''},
          {name: '散热方式', field: 'bdc_radiating_type', value: ''},
          {name: '支持服务器', field: 'bdc_Mills_type', value: ''},
          {name: '机房规模', field: 'bdc_scope', value: ''},
          {name: '所在区域', field: 'bdc_address', value: ''}
        ],
        text: 'BDC是平台整合优质品牌商与分销商，通过平台的优势及服务以吸引广大消费者的一种形式，算力网通过自身的优势整合筛选出行业内优质合规的BDC机房，算力服务器生产商，为算力爱好者提供算力服务器托管，算力服务器采购，算力服务器租赁等服务，打通算力及衍生商品产业链的完整交易，做到平台，供应商，消费者三方互惠互利。',
        article: {
          title: 'Blockchain Data Center',
          text: '<i>BDC</i>是平台整合优质品牌商与分销商，通过平台的优势及服务以吸引广大消费者的一种形式，算力网通过自身的优势整合筛选出行业内<i>优质合规的BDC机房</i>，算力服务器生产商，为算力爱好者<i>提供算力服务器托管</i>，算力服务器采购，算力服务器租赁等服务，打通算力及衍生商品产业链的完整交易，做到<i>平台，供应商，消费者三方互惠互利</i>。'
        },
        list: [],
        tips: '',
        success: false,
        str: '验证码'
      }
    },
    head () {
      return {
        title: '比特币矿机托管-国电输出,持久稳定,电力便宜-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '矿机托管,比特币矿机托管' },
          { hid: 'description', name: 'description', content: '算力网矿机托管服务，承接各种比特币矿机托管业务，20万千瓦国家电网，持久稳定，专业挖矿技术24小时维护，保障用户挖矿收益' }
        ]
      }
    },
    methods: {
      submit () {
        let self = this
        var ff = document.querySelector('.data_form')
        var data = api.validityForm(ff, this)
        if (data.status && data.status === 2) {
          this.tips = ff[data.n].placeholder
          return false
        } else if (data.status && data.status === 1) {
          this.tips = ff[data.n].title
          return false
        }
        util.post('depositMessage', {sign: api.serialize({token: this.token, dep_name: encodeURIComponent(ff.dep_name.value), dep_tel: ff.dep_tel.value, dep_bdc_id: ff.dep_bdc_id.value, dep_type: encodeURIComponent(ff.dep_type.value), dep_number: ff.dep_number.value, code: ff.code.value})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.success = true
            setTimeout(function () {
              window.location.reload()
            }, 3000)
          })
        })
      },
      test (e) {
        var ele = e.target
        if (!(ele.checkValidity ? ele.checkValidity() : api.check(ele.pattern || ele.getAttribute('pattern'), ele.value))) {
          this.tips = ele.title
        } else {
          this.tips = ''
          return true
        }
      },
      getCode () {
        var self = this
        var form = document.querySelector('.data_form')
        var ele = document.querySelector('.count_btn')
        var telEle = form.dep_tel
        var isTel = api.checkCode(telEle)
        if (isTel) {
          if (isTel === 1) {
            this.tips = telEle.placeholder
          } else {
            this.tips = telEle.title
          }
          telEle.focus()
          return false
        }
        if (ele.getAttribute('disabled') === 'true') return false
        util.post('send_code', {sign: api.serialize({token: this.token, mobile: form.dep_tel.value})}).then(res => {
          self.tips = '短信验证码发送成功'
          api.countDown()
          ele.setAttribute('disabled', true)
        })
      }
    },
    mounted () {
      let self = this
      util.post('bdcinfoList', {sign: 'token=0'}).then(function (data) {
        self.list = data
        for (let i = 0, len = self.list.length; i < len; i++) {
          self.list[i].params = []
          for (let j = 0, paramsLen = self.bcdParamsLists.length; j < paramsLen; j++) {
            self.list[i].params.push({
              name: self.bcdParamsLists[j]['name'],
              value: data[i][self.bcdParamsLists[j]['field']]
            })
          }
        }
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .bdc{
    font-size: 18px;
    color: #fff;
    .bg_box{
      @include bg(1920,558px,#15121c)
      padding-top:638px;
      .bg{
        background: url('~assets/images/bdc_bg.jpg') no-repeat;
      }
      z-index:-1
    }
    .top_box{
      margin-top:-558px;
      @include main
      overflow: hidden;
      padding: 20px 0;
      .bdc_box{
        width: 670px;
        margin-top: 85px;
        .bdc_detail{
          margin: 30px 0;
          font-size: 16px;
          line-height: 2;
        }
        .bdc_box_text{
          .big{
            font-weight: bold;
            font-size: 48px;
          }
        }
        .service_box{
          font-size: 14px;
          color:$light_black;
          .tel{
            color:$white;
            font-size: 18px;
            font-weight: bold;
          }
          .time{
            font-size: 12px;
            margin-left:10px
          }
          @include mobile_hide
        }
        .btn_box{
          @include mobile_show
        }
      }
      .form_box{
        background-color: #15121c;
        width: 410px;
        height: 438px;
        padding: 10px 45px;
        .form_header{
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
          color: #fff;
        }
        .data_form{
          .form_line{
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
        @include mobile_hide
      }
    }
    .item_box_row{
      background-color: #15121c;
      padding-bottom: 35px;
      .item_box{
        padding:0 15px;
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
            background: url('~assets/images/css_sprites.png') -352px -264px;
            width: 122px;
            height: 36px;
            vertical-align: middle;
            margin-right: 80px;
          }
          &:after{
            content: '';
            display: inline-block;
            background: url('~assets/images/css_sprites.png') -210px -264px;
            width: 122px;
            height: 37px;
            vertical-align: middle;
            margin-left: 80px;
          }
          @media screen and (max-width: $mobile) {
            padding-top: 1rem;
            font-size: 0.7rem;
            &:before,&:after{
              position: absolute;
              transform:scale(.7);
            }
            &:before{
              left: 10px;
            }
            &:after{
              right: 10px;
            }
            // transform:scale(.8)
          }
        }
        .pc_box{
          @include main
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
          @include mobile_hide
        }
        // .mobile_box{
        //   @include mobile_show
        //   .box_text{
        //     margin-top:20px;
        //     font-size: 0.6rem;
        //     line-height: 2.8;
        //     .line{
        //       @include flex(space-between)
        //       span:nth-child(2){
        //         color:$light_black
        //       }
        //       &:not(:last-child){
        //         border-bottom:1px solid #3a3a3a
        //       }
        //     }
        //   }
        // }
      }
    }
    @media screen and (max-width: $mobile) {
      padding-top:0;
      .bg_box{
        width:100%;
        height:400px;
        padding:0;
        .bg{
          position: relative;
          left:0;
          width:100%;
          height:400px;
          background: url('~assets/images/bdc_mobile.jpg') no-repeat 100%;
        }
      }
      .top_box{
        margin-top:-400px;
        padding:15px;
        .bdc_box{
          width:100%;
          margin-top: 0;
          color:#bfbfbf;
          .bdc_detail{
            line-height: 2;
            margin: 0.5rem 0;
            font-size: 0.6rem;
          }
          .bdc_box_text{
            color:#fff;
            text-align: center;
            margin-top:0.5rem;
            .big{
              font-size: .7rem;
              font-weight: normal;
            }
            .subtitle{
              font-size: .7rem;
              font-weight: normal;
            }
          }
          .btn_box{
            text-align: center;
            a{
              display: inline-block;
              @include button($blue)
              width:94%;
              line-height: 2;
              border-radius:5px
            }
          }
        }
      }
    }
  }
  .mobile_bdc{
    .introduce {
      width: 100%;
      position: relative;
      .content {
        padding: 0 15px;
        position: absolute;
        bottom: 0;
        .title {
          text-align: center;
          font-size: 18px;
          line-height: 45px;
          color: #fff;
          font-weight: bold;
        }
        .text {
          padding: 0 10px;
          line-height: 26px;
          color: #bfbfbf;
          i {
            color: #ff9f00;
          }
        }
      }
    }
    .bdc-lists {
      width: 100%;
      height: auto;
      padding: 45px 15px 0 15px;
      background: #13141f;
      margin-bottom: -61px;
      .card {
        @include flex(center, center, column);
        margin-bottom: 20px;
        .title {
          color: #fff;
          font-size: 18px;
          line-height: 45px;
        }
        img {
          margin: 20px 0;
        }
        .line {
          width: 100%;
          line-height: 45px;
          margin-right: -15px;
          padding-right: 15px;
          @include flex(space-between, center);
          font-size: 15px;
          border-bottom: solid 1px #3a3a3a;
          .name {
            color: #fff;
          }
          .value {
            color: #999;
          }
        }
      }
      .apply {
        height: 43px;
        line-height: 43px;
        width: 265px;
        margin: 60px auto;
        display: block;
        background: url('~assets/images/mobile/button.png') no-repeat;
        background-size: 100%;
        a {
          display: inline-block;
          height: 43px;
          width: 100%;
          font-size: 15px;
          font-weight: bold;
          color: #1b1b1b;
        }
      }
      .tips {
        text-align: center;
        padding-bottom: 20px;
        display: block;
        color: #666;
        font-size: 13px;
      }
    }
  }
  .overflow{
    overflow: hidden;
  }
  .float_left{
    float: left;
  }
  .float_right{
    float: right;
  }
</style>
