<template>
  <div class="bank_card">
    <div class="card_box" v-if="!edit">
      <div class="card" v-if="true_name && true_name.status === 1">
        <span class="bank_name">{{true_name&&true_name.truename}}</span>
        <p class="number">{{true_name&&true_name.idcard|format}}</p>
      </div>
      <a class="button" @click="openMask" v-else>去认证</a>
    </div>
    <form class="form" @submit.prevent="submit" novalidate v-else>
      <form-field :form="auth"></form-field>
      <button name="btn">确认提交</button>
      <div class="btn" @click="closeMask">取消</div>
    </form>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { auth } from '@/util/form'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'

  export default {
    components: {
      FormField
    },
    data() {
      return {
        auth: auth,
        edit: false
      }
    },
    methods: {
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, 1)
        if (!data) return false
        util.post('user_truename', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then((res) => {
          api.checkAjax(this, res, () => {
            api.tips('实名认证已提交，请您耐心等待几秒即可看到认证结果', () => {
              setTimeout(() => {
                this.requestData(() => {
                  api.tips('恭喜您实名认证成功', () => {
                    if (this.callUrl) {
                      this.$router.push({path: this.callUrl})
                      this.$store.commit('SET_URL', '')
                    }
                  })
                })
              }, 7000)
            })
            this.closeMask()
          })
        })
      },
      requestData (callback) {
        util.post('show_user_truename', {sign: api.serialize({token: this.token})}).then((res) => {
          api.checkAjax(this, res, () => {
            this.$store.commit('SET_INFO', {true_name: res})
            callback()
          }, '', () => {
            this.$store.commit('SET_INFO', {true_name: ''})
          })
        })
      },
      openMask () {
        this.edit = true
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
      },
      closeMask () {
        this.edit = false
        this.edit = ''
        document.body.style.overflow = 'auto'
      }
    },
    computed: {
      ...mapState({
        callUrl: state => state.callUrl,
        token: state => state.info.token,
        true_name: state => state.info.true_name
      })
    },
    filters: {
      format: api.telReadable
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .bank_card {
    font-size: 0.32rem;
    padding-top: 1.1rem;
    background: #f4f4f4;
    .card_box {
      padding: 0 0.3rem;
      .card {
        width: 100%;
        height: 2.7rem;
        padding-top: 0.49rem;
        color: #fff;
        background: url('~assets/images/mobile/bank_card.png') no-repeat;
        background-size: 100%;
        .bank_name {
          margin-left: 0.42rem;
        }
        .number {
          width: 100%;
          text-align: center;
          font-size: 0.48rem;
          font-weight: bold;
          position: relative;
          top: 0.15rem;
        }
      }
      .button {
        width: 100%;
        line-height: 35px;
        @include flex(center, center);
        margin-top: 1rem;
        background: #327fff;
        color: #fff;
        font-size: 0.34rem;
        border-radius: 5px;
      }
    }
    .form {
      background: #fff;
      min-height: calc(100vh - 1.1rem);
      @include form(v)
    }
  }
</style>
