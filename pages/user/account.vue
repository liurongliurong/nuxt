<template>
  <section class="account">
    <h2>账户管理</h2>
    <Setting :nav="nav" type="account"></Setting>
    <MyMask :form="form[edit]" :title="title" v-if="edit"></MyMask>
  </section>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  import Setting from '@/components/common/Setting'
  export default {
    components: {
      MyMask, Setting
    },
    data () {
      return {
        nav: [
          {title: '手机认证', desc: '手机号码是在算力网进行操作的重要凭证。', text: '手机号码', name: 'tel'},
          {title: '实名认证', desc: '完成实名认证，认证后可以获得更多权限。', text: '身份证号', name: 'auth'},
          {title: '绑定银行卡', desc: '绑定银行卡之后才能进行充值、购买和提现等操作。', text: '', name: 'card'},
          {title: '算力收益地址', desc: '请选择算力类型并设置算力地址。', text: '', name: 'address'}
        ],
        form: {
          auth: [{name: 'truename', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'card_type', type: 'text', title: '证件类型', edit: 'card_type', isChange: true}, {name: 'idcard', type: 'text', title: '证件号码', placeholder: '请输入您的证件号码', pattern: 'idCard'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'disabled'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
          card: [{name: 'card_no', type: 'text', title: '银行卡号', placeholder: '请输入银行卡号', pattern: 'bankCard'}, {name: 'open_bank', type: 'text', title: '开户银行', placeholder: '请输入开户银行名称', isChange: true}, {name: 'bank_branch', type: 'text', title: '开户支行', placeholder: '请输入开户支行名称', isChange: true}, {name: 'bank', type: 'select', title: '开户行地址', isChange: true}, {name: 'mobile', type: 'text', title: '银行预留手机号', placeholder: '请输入银行预留手机号', pattern: 'tel'}, {name: 'code', type: 'text', title: '手机验证码', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
          address: [{name: 'product_hash_type', type: 'select', title: '算力类型', option: []}, {name: 'address', type: 'text', title: '算力地址', placeholder: '请输入对应算力地址', pattern: 'computeAddress'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'disabled'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}]
        },
        edit: '',
        title: '',
        product_hash_type: '',
        card_type: '中国大陆身份证'
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.form_content')
        var data = api.checkFrom(form)
        var url = ''
        var callbackUrl = ''
        var no = -1
        var val = ''
        var sendData = {token: this.token, user_id: this.user_id}
        var tipsStr = ''
        var tipsStr2 = ''
        switch (this.edit) {
          case 'tel':
            break
          case 'auth':
            url = 'user_truename'
            callbackUrl = 'show_user_truename'
            no = 1
            val = 'true_name'
            tipsStr = '实名认证已提交，请您耐心等待几秒即可看到认证结果'
            tipsStr2 = '恭喜您实名认证成功，温馨提示：在您进行购买矿机和算力之前，请先绑定银行卡'
            break
          case 'card':
            url = 'BankCard'
            callbackUrl = 'show_bankcard'
            no = 2
            val = 'bank_card'
            tipsStr = '银行卡绑定已提交，请您耐心等待几秒即可看到认证结果'
            tipsStr2 = '恭喜您银行卡绑定成功'
            break
          case 'address':
            url = 'bindAddress'
            callbackUrl = 'show_Address'
            no = 3
            val = 'address'
            tipsStr = '设置成功'
            break
        }
        if (!data) return false
        var self = this
        util.post(url, Object.assign(data, sendData)).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips(tipsStr)
            if (self.edit !== 'address') {
              self.$store.commit('SET_INFO', {[val]: {status: 0}})
              setTimeout(() => {
                self.requestData(callbackUrl, sendData, no, val, () => {
                  api.tips(tipsStr2)
                })
              }, 7000)
            } else {
              self.requestData(callbackUrl, sendData, no, val)
            }
            self.closeEdit()
          })
        })
      },
      closeEdit () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      requestData (url, sendData, no, val, callback) {
        var self = this
        util.post(url, sendData).then(function (res) {
          api.checkAjax(self, res, () => {
            self.$store.commit('SET_INFO', {[val]: res})
            if (callback) {
              callback()
            }
          }, '', () => {
            self.$store.commit('SET_INFO', {[val]: ''})
          })
        })
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id
      })
    }
  }
</script>
