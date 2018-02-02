<template>
  <article class="bdc" v-if="isMobile===0">
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
        <div class="form_header">提交托管算力服务器申请</div>
        <form class="form data_form" action="" @submit.prevent="submit" novalidate v-if="!success">
          <form-field :form="form" :mode="1"></form-field>
          <div class="tips">{{tips}}</div>
          <button name="btn">提交申请</button>
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
            <img class="float_left" :src="item.bdc_img_arr[0]" alt="">
            <div class="float_left tip">
              <div class="line"v-for="params,k in bcdParamsLists">
                <span>{{params}}</span>
                {{item[k]}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
  <div class="mobile_bdc" v-else-if="isMobile===1">
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
        <img :src="item.bdc_img_arr[0]">
        <div v-for="params,k in bcdParamsLists" class="line">
          <span class="name">{{params}}</span>
          <span class="value">{{item[k]}}</span>
        </div>
      </div>
      <button class="apply">
        <a href="javascript:;" @click="goApply">点击申请算力服务器托管</a>
      </button>
      <span class="tips">算力网全国BDC即将陆续开放...</span>
    </div>
  </div>
</template>

<script>
  import util, { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { bdc } from '@/util/form'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      FormField
    },
    data () {
      return {
        form: bdc,
        bcdParamsLists: {
          bdc_electric_type: '供电类型',
          bdc_radiating_type: '散热方式',
          bdc_Mills_type: '支持服务器',
          bdc_scope: '机房规模',
          bdc_address: '所在区域'
        },
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
        title: '比特币算力服务器托管-国电输出,持久稳定,电力便宜-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力服务器托管,比特币算力服务器托管' },
          { hid: 'description', name: 'description', content: '算力网算力服务器托管服务，承接各种比特币算力服务器托管业务，20万千瓦国家电网，持久稳定，专业技术24小时维护，保障用户收益' }
        ]
      }
    },
    methods: {
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, 1)
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        fetchApiData(this, 'depositMessage', Object.assign(data, {token: this.token}), (res) => {
          this.success = true
          setTimeout(function () {
            window.location.reload()
          }, 3000)
        }, form.btn)
      },
      goApply () {
        if (this.list.length) {
          this.$router.push({path: '/mobile/bdcForm'})
        } else {
          api.tips('暂无BDC，敬请期待！')
        }
      }
    },
    mounted () {
      util.post('bdcinfoList', {token: 0}).then((data) => {
        this.list = data.msg
        let options = []
        for (let i = 0, len = this.list.length; i < len; i++) {
          options[i] = {id: this.list[i].id, item: this.list[i].bdc_name}
        }
        this.form[3].option = options
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
      @include main
      margin-top:-558px;
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
          @include form(v)
          .input{
            position: relative;
            height: 40px;
            border-radius: 5px;
            background-color: #fff;
            font-size: 16px;
            line-height: 40px;
            &:not(:last-child) {
              margin-bottom: 12px;
            }
            &:last-child {
              margin-bottom: 0;
            }
            span.form_title{
              width: 105px;
              height: 20px;
              line-height: 20px;
              border-right: 1px solid #ccc;
              color: #666;
              top: 10px;
            }
            .form_icon{
              display: none;
            }
            input,.sel{
              padding-left: 136px;
              border: none;
              line-height: 20px;
              height: 40px;
            }
            .count_btn{
              width: 70px;
              border-radius: 3px;
              font-size: 12px;
              height: 26px;
              line-height: 26px;
            }
          }
          .tips{
            height:30px;
            line-height:30px;
            text-align: center;
            color:white;
            font-size: 12px;
          }
          button{
            margin-top: 0;
            font-size: 14px;
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
    padding-top: 0;
    .introduce {
      width: 100%;
      position: relative;
      .content {
        padding: 0 15px;
        position: absolute;
        bottom: 0;
        top: 5.38rem;
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
      padding: 100px 15px 0 15px;
      background: #13141f;
      .card {
        @include flex(center, center, column);
        margin-bottom: 20px;
        margin-top: 20px;
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
