<template>
  <div class="rigist_block">
    <form class="form regist" action="" @submit.prevent="regist" novalidate v-show="!show">
      <h2>欢迎注册算力网</h2>
      <FormField :form="form" @onChange="onChange" @onFocus="onFocus"></FormField>
      <label for="accept">
        <input type="checkbox" id="accept" name="accept" checked>
        <span>阅读并接受<a class="accept_link" href="javascript:;" @click="show=true">《用户使用协议》</a></span>
        <!-- <span class="select_accept">请选择</span> -->
      </label>
      <button name="btn">注册</button>
    </form>
    <MyMask title="“算力网”用户使用协议" position="bottom" contract="selfEdit" v-if="show" @closeMask="closeMask">
      <user-agreement class="popup_body" slot="selfEdit"></user-agreement>
    </MyMask>
    <div class="popup regist_popup" v-if="registed">
      <div class="popup_con">
        <div class="popup_title">
          <span>欢迎，您已成功注册算力网！</span>
          <span class="icon_close" @click="quitAuth"></span>
        </div>
        <form class="form" @submit.prevent="submit" novalidate>
          <p class="regist_form_title">为了您的账户安全，请先完成实名认证</p>
          <FormField :form="auth"></FormField>
          <div class="auth_btn_box">
            <button name="btn">立即认证</button>
            <div class="go_skip" @click="quitAuth">暂不认证</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import util, { fetchApiData } from '@/util/index'
  import api from '@/util/function'
  import { auth } from '@/util/form'
  import md5 from 'js-md5'
  import MyMask from '@/components/common/Mask'
  import FormField from '@/components/common/FormField'
  import UserAgreement from '@/components/auth/UserAgreement'
  export default {
    name: 'regist',
    components: {
      MyMask, FormField, UserAgreement
    },
    data () {
      return {
        form: [
          {name: 'mobile', type: 'text', title: '手机号码', error: '该用户已存在', placeholder: '请输入手机号', pattern: 'tel', changeEvent: true},
          {name: 'imgCode', type: 'text', title: '图形验证', placeholder: '请输入图形验证码', addon: 1, pattern: 'imgCode'},
          {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6},
          {name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'password', focusEvent: true},
          {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', pattern: 'password', error: '两次密码不一致'}
        ],
        auth: auth,
        show: false,
        registed: false,
        mobileStatus: true
      }
    },
    methods: {
      regist (e) {
        var form = e.target
        if (!this.mobileStatus) {
          api.setTips(form.mobile, 'error')
          if (this.isMobile) {
            api.tips('该用户已存在')
          }
          return false
        }
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        if (!form.accept.checked) {
          form.accept.setAttribute('data-status', 'invalid')
          return false
        }
        data.password = md5(data.password)
        data.password1 = md5(data.password1)
        form.btn.setAttribute('disabled', true)
        fetchApiData(this, 'register', Object.assign(data, {token: 0}), (res) => {
          api.tips('恭喜您注册成功！', () => {
            if (this.isMobile) {
              this.$router.push({name: 'index'})
            } else {
              this.$store.commit('SET_TOKEN', Object.assign(res, {mobile: data.mobile}))
              util.post('getAll', res).then((data) => {
                this.$store.commit('SET_INFO', data.msg)
              })
              this.registed = true
            }
          })
        }, form.btn)
      },
      closeMask () {
        this.show = false
      },
      onChange (obj) {
        this.checkMobile(obj.e.target)
      },
      checkMobile (ele) {
        var value = ele.value
        var re = new RegExp('^1[34578][0-9]{9}$')
        if (value && re.test(value)) {
          util.post('checkMobile', {token: 0, mobile: value}).then(res => {
            if (res.code === '2000') {
              api.setTips(ele, 'error')
              ele.setAttribute('data-error', 'true')
              this.mobileStatus = false
              if (this.isMobile) {
                api.tips(res.msg)
              }
            } else {
              ele.setAttribute('data-error', 'false')
              this.mobileStatus = true
            }
          })
        }
      },
      checkType (v) {
        var re1 = new RegExp('^(?:[0-9]+|[a-z]+|[A-Z]+)$')
        var re2 = new RegExp('^(?![a-z]+$)(?![0-9]+$)(?![A-Z]+$)[a-zA-Z0-9]+$')
        var re3 = new RegExp('^(?![a-z]+$)(?![0-9]+$)(?![A-Z]+$)(?![a-z0-9]+$)(?![A-Z0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]+$')
        if (re3.test(v)) {
          return 3
        }
        if (re2.test(v)) {
          return 2
        }
        if (re1.test(v)) {
          return 1
        }
      },
      onFocus (e) {
        var ele = e.target
        var value = ele.value
        if (value.length >= 6) {
          var type = this.checkType(value)
          if (type) {
            ele.className = 'level level' + type
          }
        }
      },
      quitAuth () {
        this.$router.push({name: 'index'})
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        var url = 'user_truename'
        var callbackUrl = 'show_user_truename'
        var val = 'true_name'
        var sendData = {token: this.token}
        var tipsStr = '实名认证已提交，请您耐心等待几秒即可看到认证结果'
        var tipsStr2 = '恭喜您实名认证成功'
        if (!data) return false
        fetchApiData(this, url, Object.assign(data, sendData), (res) => {
          api.tips(tipsStr)
          this.$store.commit('SET_INFO', {[val]: {status: 0}})
          setTimeout(() => {
            this.requestData(callbackUrl, sendData, val, () => {
              api.tips(tipsStr2)
            })
          }, 7000)
        })
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
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token,
        mobile: state => state.info.mobile
      })
    },
    mounted() {
      window.scroll(0, 0)
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .rigist_block{
    width:420px;
    margin:0 auto;
    padding:35px 0;
    form.regist{
      @include form;
      h2{
        margin-top:0;
        @include mobile_hide
      }
      .select_accept{
        color:$red;
        font-size: 12px;
      }
      .accept_link{
        color:$blue
      }
      .input {
        input{
          margin-right: 10px;
          & ~ span.select_accept{
            display: none;
          }
          &[data-status='invalid'] ~ span.select_accept{
            display: inline;
          }
        }
        .password_level{
          @include position(9,0,5,auto)
          left:104%;
          @include flex
          display: none;
          .item{
            width:80px;
            height:15px;
            background: $border;
            & + .item{
              margin-left:2px;
            }
          }
          &:before,&:after{
            font-size: 12px;
          }
          &:before{
            content:'密码强度';
            width:52px;
          }
          &:after{
            margin-left:3px;
          }
          @media screen and (max-width: $mobile) {
            display: none !important;
          }
        }
        input.level ~ .password_level{
          display: flex
        }
        input.level1 ~ .password_level{
          .item:first-child{
            background: #FF5F2D;
          }
          &:after{
            content:'低'
          }
        }
        input.level2 ~ .password_level{
          .item:first-child,.item:nth-child(2){
            background: #FFA31E;
          }
          &:after{
            content:'中'
          }
        }
        input.level3 ~ .password_level{
          .item{
            background: #8DC420;
          }
          &:after{
            content:'高'
          }
        }
      }
    }
    @media screen and (max-width: $mobile) {
      width:100%;
      padding:30px 15px;
      background: #fff;
    }
    .regist_popup .popup_con{
      width:600px;
      .popup_title{
        background: #3A69D3 url(~assets/images/popup_bg.png) bottom right no-repeat;
        color:#fff;
        height:100px;
        line-height: 100px;
      }
      .form{
        padding: 40px 80px;
        p.regist_form_title{
          text-align: center;
          font-size: 16px;
          margin-bottom:15px
        }
        .auth_btn_box{
          @include flex
          button{
            @include button($blue)
          }
          .go_skip{
            @include button(transparent)
            margin-left:50px;
            border:1px solid $blue;
            color:$blue;
            border-radius:5px;
            text-align: center;
            line-height: 2.6;
            font-size: 18px;
            cursor: pointer;
          }
          button,.go_skip{
            width:50%;
          }
        }
      }
    }
  }
</style>
