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
        <span>还没有账号？</span>
        <router-link to="/auth/regist">免费注册</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import FormField from '@/components/common/FormField'
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
        var data = api.checkFrom(form)
        if (!data) return false
        var self = this
        form.btn.setAttribute('disabled', true)
        util.post('login', Object.assign(data, {token: 0})).then(res => {
          api.checkAjax(self, res, () => {
            self.$store.commit('SET_TOKEN', Object.assign(res, {mobile: data.mobile}))
            util.post('getAll', res).then(function (data) {
              self.$store.commit('SET_INFO', data)
            })
            api.tips('欢迎来到算力网！', () => {
              self.$router.push({path: '/'})
            })
          }, form.btn)
        })
      }
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
    }
    .form{
      color:$light_text;
      background:$white;
      padding:35px;
      @include form(v)
      h3{
        @include flex(space-between,flex-end)
        span{
          font-size: 24px;
        }
        margin-bottom:35px
      }
      .go_regist{
        border-top:1px dashed $border;
        padding-top:15px;
        text-align: center;
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
  }
</style>
