<template>
  <section class="bdcform">
    <div class="bodyform">
      <form class="form" action="" @submit.prevent="submit" novalidate>
        <FormField :form="form"></FormField>
        <button class="btn" name="btn">提交申请</button>
      </form>
    </div>
    <div class="link">
      <img src="../../assets/images/BDC-2.png"/>
      客服热线： 0571-28221076 &nbsp;&nbsp;&nbsp;工作日 （9:00~18:00）
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      FormField
    },
    data () {
      return {
        option: {'title': '请选择BDC'},
        form: [{name: 'dep_name', type: 'text', title: '申请人', placeholder: '请输入您的姓名', isChange: true}, {name: 'dep_tel', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'}, {name: 'code', type: 'text', title: '手机验证码', placeholder: '手机验证码', addon: 2, pattern: 'telCode'}, {name: 'dep_bdc', type: 'select', title: '选择BDC', option: ['内蒙古BDC'], isChange: true}, {name: 'dep_type', type: 'text', title: '服务器类型', placeholder: '请输入算力服务器类型', isChange: true}, {name: 'dep_number', type: 'text', title: '服务器数量', placeholder: '输入托管算力服务器数量', pattern: 'int', maxlength: 5}]
      }
    },
    methods: {
      submit () {
        let self = this
        var form = document.querySelector('.form')
        var data = api.checkFrom(form)
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        util.post('depositMessage', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('提交成功，稍后工作人员会与您联系', () => {
              self.$router.push({name: 'home'})
            })
          }, form.btn)
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

<style lang="scss">
  @import '../../assets/css/style.scss';
  .bdcform{
    width: 100%;
    height: 100vh;
    background: #f5f5f9;
    .bodyform{
      padding:15px;
      .form{
        @include form(v)
        .input{
          background: #fff;
        }
      }
    }
    .link{
      width: 100%;
      height: 2rem;
      position: fixed;
      bottom:0;
      border-top:1px solid #bfbfbf;
      padding:0 .5rem;
      line-height:2rem;
      box-sizing: border-box;
      font-size:0.45rem;
      color: #bdbdbe;
      img{
        width:.7rem;
        height:.7rem; 
        position: relative;
        top:-.65rem;
        margin-right: .5rem;
      }
    }
  }
</style>