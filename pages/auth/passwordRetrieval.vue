<template>
  <div class="password_found_block">
    <form class="password form" action="" @submit.prevent="submit(1,$event)" novalidate v-if="!next">
      <h2>找回密码</h2>
      <FormField :form="form"></FormField>
      <button>下一步</button>
    </form>
    <form class="next_form form" action="" @submit.prevent="submit(0,$event)" novalidate v-else>
      <h2>找回密码</h2>
      <FormField :form="nextForm"></FormField>
      <button name="btn">提交</button>
    </form>
  </div>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import md5 from 'js-md5'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  export default {
    name: 'regist',
    components: {
      FormField
    },
    data () {
      return {
        form: [
          {name: 'mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号', pattern: 'tel'},
          {name: 'imgCode', type: 'text', title: '图形验证', placeholder: '请输入图形验证码', addon: 1, pattern: 'imgCode'},
          {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}
        ],
        nextForm: [
          {name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'password'},
          {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', error: '两次密码不一致', pattern: 'password'}
        ],
        next: false,
        code_id: '',
        valid_code: '',
        mobile: ''
      }
    },
    methods: {
      submit (n,e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        if (n === 1) {
          fetchApiData(this, 'valid_code', Object.assign(data, {token: this.token}), (res) => {
            this.mobile = data.mobile
            this.code_id = res.id
            this.valid_code = res.valid_code
            this.next = true
            api.clearForm(form)
          })
        } else {
          form.btn.setAttribute('disabled', true)
          data.password = md5(data.password)
          data.password1 = md5(data.password1)
          let sendData = Object.assign(data, {token: this.token, valid_code: this.valid_code, code_id: this.code_id, mobile: this.mobile})
          fetchApiData(this, 'forgitPwd', sendData, (res) => {
            api.tips('重置密码成功', () => {
              this.$router.push({name: 'auth-login'})
            })
          }, form.btn)
        }
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token
      })
    },
    mounted() {
      window.scroll(0, 0)
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .password_found_block{
    width:420px;
    margin:0 auto;
    padding:35px 0;
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
