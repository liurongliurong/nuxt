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
        option: {'title': '请选择BDC'},
        form: bdc
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        fetchApiData(this, 'depositMessage', Object.assign(data, {token: this.token}), (res) => {
          api.tips('提交成功，稍后工作人员会与您联系', () => {
            window.location.reload()
          })
        }, form.btn)
      }
    },
    mounted () {
      util.post('bdcinfoList', {token: 0}, (res) => {
        let data = res.msg
        let options = []
        for (let i = 0, len = data.length; i < len; i++) {
          options[i] = {id: data[i].id, item: data[i].bdc_name}
        }
        this.form[3].option = options
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