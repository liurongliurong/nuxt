<template>
  <section class="bdcform">
    <div class="bodyform">
      <form class="form" action="" @submit.prevent="submit" novalidate>
        <FormField :form="form"></FormField>
        <button name="btn">提交申请</button>
      </form>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
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
        option: {'title': '请选择BDC'},
        form: bdc
      }
    },
    methods: {
      submit () {
        let self = this
        var form = document.querySelector('.form')
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        util.post('depositMessage', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('提交成功，稍后工作人员会与您联系', () => {
              window.location.reload()
            })
          }, form.btn)
        })
      }
    },
    mounted () {
      let self = this
      util.post('bdcinfoList', {sign: 'token=0'}).then(function (data) {
        var options = []
        for (let i = 0, len = data.length; i < len; i++) {
          options[i] = {id: data[i].id, item: data[i].bdc_name}
        }
        self.form[3].option = options
      })
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token
      })
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/style.scss';
  .bdcform{
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
  }
</style>