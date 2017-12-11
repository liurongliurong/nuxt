<template>
  <div class="password_found_block">
    <form class="password form" action="" @submit.prevent="submit(1)" novalidate v-if="!next">
      <h2>找回密码</h2>
      <FormField :form="form"></FormField>
      <button>下一步</button>
    </form>
    <form class="next_form form" action="" @submit.prevent="submit" novalidate v-else>
      <h2>找回密码</h2>
      <div class="input" v-for="f in nextForm">
        <span>{{f.title}}</span>
        <span>*</span>
        <input :class="f.name" :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="password.code" data-status="">
        <span :title="password.tips" :tips="f.placeholder" :error="f.error"></span>
      </div>
      <button name="btn">提交</button>
    </form>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  export default {
    name: 'regist',
    components: {
      FormField
    },
    data () {
      return {
        form: [{name: 'mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号', pattern: 'tel'}, {name: 'imgCode', type: 'text', title: '图形验证', placeholder: '请输入图形验证码', addon: 1, pattern: 'imgCode'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
        nextForm: [{name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码'}, {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', error: '两次密码不一致'}],
        next: false,
        code_id: '',
        valid_code: '',
        mobile: '',
        password: {code: '^[0-9a-zA-Z_]{6,16}$', tips: '密码应在6-16位之间的字母数字和下划线'}
      }
    },
    methods: {
      submit (n) {
        var form = document.querySelector('.form')
        var data = api.checkFrom(form, this, api.checkEquipment())
        if (!data) return false
        var self = this
        if (n === 1) {
          util.post('valid_code', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then(res => {
            api.checkAjax(self, res, () => {
              self.mobile = data.mobile
              self.code_id = res.id
              self.valid_code = res.valid_code
              self.next = true
            })
          })
        } else {
          form.btn.setAttribute('disabled', true)
          util.post('forgitPwd', {sign: api.serialize(Object.assign(data, {token: this.token, valid_code: this.valid_code, code_id: this.code_id, mobile: this.mobile}))}).then(res => {
            api.checkAjax(self, res, () => {
              api.tips('重置密码成功', () => {
                self.$router.push({name: 'login'})
              })
            }, form.btn)
          })
        }
      },
      test (e) {
        var ele = e.target
        var form = document.querySelector('.form')
        api.checkFiled(ele, form)
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
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .password_found_block{
    width:420px;
    margin:0 auto;
    padding-top:35px;
    form.password,form.next_form{
      @include form
      h2{
        margin-top:0;
        @include mobile_hide
      }
    }
    @media screen and (max-width: $mobile) {
      width:100%;
      padding:30px 15px;
      background: #fff;
    }
  }
</style>
