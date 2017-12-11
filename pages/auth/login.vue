<template>
  <div class="login">
    <div class="info">
      <h1>开启您的挖矿之旅!</h1>
      <h3>非常简单-您的挖矿设备已经设置并运行了</h3>
      <h3>登录账号-您即可开始使用我们的运算力挖矿服务开始挖矿</h3>
    </div>
    <form class="form" action="" @submit.prevent="login" novalidate>
      <h3>
        <span>账户登录</span>
        <router-link to="/auth/passwordRetrieval">忘记密码</router-link>
      </h3>
      <FormField :form="form"></FormField>
      <button name="btn">登录</button>
      <div class="go_regist">
        <router-link class="link_btn" to="/auth/passwordRetrieval">忘记密码</router-link>
        <div class="regist_link">
          <span>还没有账号？</span>
          <router-link to="/auth/regist">免费注册</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import util from '@/util/index'
  import api from '@/util/function'
  import FormField from '@/components/common/FormField'
  import { mapState } from 'vuex'
  export default {
    name: 'login',
    components: {
      FormField
    },
    data () {
      return {
        form: [{name: 'mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号', pattern: 'tel'}, {name: 'password', type: 'password', title: '登录密码', placeholder: '请输入您的登录密码', pattern: 'password'}]
      }
    },
    methods: {
      login () {
        var form = document.querySelector('.form')
        var data = api.checkFrom(form, this, api.checkEquipment())
        if (!data) return false
        var self = this
        form.btn.setAttribute('disabled', true)
        util.post('login', {sign: api.serialize(Object.assign(data, {token: 0}))}).then(res => {
          api.checkAjax(self, res, () => {
            self.$store.commit('SET_TOKEN', Object.assign(res, {mobile: data.mobile}))
            util.post('getAll', {sign: api.serialize(res)}).then(function (data) {
              self.$store.commit('SET_INFO', data)
            })
            api.tips('欢迎来到算力网！', () => {
              if (self.callUrl) {
                location.href = self.callUrl
                self.$store.commit('SET_URL', '')
              } else {
                self.$router.push({path: '/'})
              }
            })
          }, form.btn)
        }).catch(res => {
          api.tips('您的网络情况不太好，请稍后再尝试')
        })
      },
      myToast (str) {
        Toast({
          message: str,
          position: 'middle',
          duration: 3000
        })
      }
    },
    computed: {
      ...mapState({
        callUrl: state => state.callUrl
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .login{
    width:100%;
    @include flex(space-between)
    color:$white;
    .info{
      width:58%;
      line-height:2;
      h1{
        font-size: 46px;
        font-weight: bold;
        margin-bottom:20px;
        letter-spacing: 3px;
      }
      h3{
        font-size: 18px;
      }
      @include mobile_hide
    }
    .form{
      color:$light_text;
      background:$white;
      padding:35px;
      @include form(v)
      h3{
        overflow:hidden;
        span{
          font-size: 24px;
        }
        a{
          margin-top:8px;
          float: right;
        }
        margin-bottom:35px;
        @include mobile_hide
      }
      .go_regist{
        border-top:1px dashed $border;
        padding-top:15px;
        .link_btn{
          @include mobile_show
        }
        .regist_link{
          text-align: center;
        }
        a{
          color:$blue
        }
        &,a{
          font-size: 16px;
        }
      }
      .input{
        input{
          padding-left:134px;
        }
        span:nth-child(2){
          @include gap(10,h)
          top:15px;
          bottom:15px
        }
      }
      button{
        margin-top:0
      }
    }
    @media screen and (max-width: $mobile) {
      .form .go_regist{
        border-top:0;
        padding-top:0;
        @include flex(space-between)
        &,a{
          font-size: 14px;
        }
      }
      .form .input input{
        padding-left:15px;
      }
    }
  }
  .auth.login_block .copyright{
    color:#999;
  }
</style>
