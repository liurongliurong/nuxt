<template>
  <div class="bank_card">
    <div class="none"></div>
    <div class="card" v-if="bank_card">
      <span class="bank_name">{{bank_card&&bank_card.open_bank}}</span>
      <p class="number">{{bank_card&&bank_card.card_no|format}}</p>
    </div>
    <a class="button" @click="openMask">{{bank_card?'修改银行卡':'新增银行卡'}}</a>
    <my-mask class="bank_card_popup" :form="card" @submit="submit" @closeMask="closeMask" @onChange="onChange" v-if="edit"></my-mask>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { card } from '@/util/form'
  import cardList from '@/util/card'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'

  export default {
    components: {
      MyMask
    },
    data() {
      return {
        card: card,
        edit: false
      }
    },
    methods: {
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, 1)
        if (!data) return false
        util.post('BankCard', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then((res) => {
          api.checkAjax(this, res, () => {
            api.tips('银行卡绑定已提交，请您耐心等待几秒即可看到认证结果', () => {
              setTimeout(() => {
                this.requestData(() => {
                  api.tips('恭喜您银行卡绑定成功')
                })
              }, 7000)
            })
            this.closeMask()
          })
        })
      },
      requestData (callback) {
        util.post('show_bankcard', {sign: api.serialize({token: this.token})}).then((res) => {
          api.checkAjax(this, res, () => {
            this.$store.commit('SET_INFO', {bank_card: res})
            callback()
          }, '', () => {
            this.$store.commit('SET_INFO', {bank_card: ''})
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
      },
      onChange (obj) {
        var val = obj.e.target.value
        var val1 = val.substr(0, 6)
        var val2 = val.substr(0, 5)
        if (val.length >= 6) {
          for (var i = 0; i < cardList.length; i++) {
            if (val1 === cardList[i].id || val2 === cardList[i].id) {
              document.getElementsByName('open_bank')[0].value = cardList[i].name
            }
          }
        }
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        bank_card: state => state.info.bank_card
      })
    },
    filters: {
      format: api.cardReadable
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .bank_card {
    width: 100%;
    font-size: 0.32rem;
    padding: 1.1rem 0.3rem 0;
    background: #f4f4f4;

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
</style>
