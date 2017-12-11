<template>
  <section class="password">
    <h2>密码管理</h2>
    <Setting :nav="nav" type="password"></Setting>
    <MyMask :form="form[edit]" :title="title" v-if="edit"></MyMask>
  </section>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  import Setting from '@/components/common/Setting'
  import md5 from 'js-md5'
  export default {
    components: {
      MyMask, Setting
    },
    data () {
      return {
        nav: [
          {title: '登录密码', desc: '登录算力网的重要凭证', text: '登录密码', name: 'login'},
          {title: '交易密码', desc: '通过余额进行交易需要验证交易密码', text: '交易密码', name: 'trade'}
        ],
        form: {
          login: [{name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}, {name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'password'}, {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', pattern: 'password', error: '两次密码不一致'}],
          trade: [{name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}, {name: 'trade_password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'telCode'}, {name: 'trade_password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', pattern: 'telCode', error: '两次密码不一致'}]
        },
        edit: false,
        title: ''
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.form_content')
        var data = api.checkFrom(form)
        var url = ''
        var sendData = {token: this.token, user_id: this.user_id}
        var tipStr = ''
        var icon = false
        switch (this.edit) {
          case 'login':
            url = 'changeLoginPassword'
            tipStr = '修改成功'
            break
          case 'trade':
            url = 'tradePassword'
            data.trade_password = md5(data.trade_password)
            data.trade_password1 = md5(data.trade_password1)
            tipStr = '设置成功'
            icon = true
            break
        }
        if (!data) return false
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeEdit()
            if (icon) {
              self.$store.commit('SET_INFO', {trade_password: 1})
            } else {
              api.tips(tipStr, () => {
                self.$router.push({name: 'auth-login'})
                self.$store.commit('LOGOUT')
              })
            }
          })
        })
      },
      closeEdit () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile
      })
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .password{
    .mask{
      @include mask
      .form_box{
        .form_content{
          padding:40px 130px;
          @include form(v)
          width:450px
        }
      }
    }
  }
</style>
