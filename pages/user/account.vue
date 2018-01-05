<template>
  <section class="account">
    <div class="pc_box" v-if="isMobile===0">
      <h2>账户管理</h2>
      <Setting :nav="nav" type="account"></Setting>
    </div>
    <div class="mobile_box" v-if="isMobile===1">
      <div class="list">
        <div class="item" v-for="k in 4" @click="setInfo(k-1,nav[k-1].name,menu[k-1].status)">
          <span>{{nav[k-1]&&nav[k-1].title}}</span>
          <i v-if="k===1">{{mobile|format}}</i>
          <i v-else-if="nav[k-1].name==='login'">修改<em></em></i>
          <i v-else-if="nav[k-1].name==='auth'">{{!menu[k-1].status?'去认证':true_name.truename+'：'+true_name.idcard|format}}</i>
          <i v-else-if="nav[k-1].name==='card'&&bank_card&&bank_card.open_bank">{{bank_card&&bank_card.card_no|format}}</i>
          <i v-else>设置<em></em></i>
        </div>
        <div class="compute_address item">
          <div class="compute_address_title" @click="setInfo(4,nav[4].name,menu[4].setting)">
            <span>{{nav[4]&&nav[4].title}}</span>
            <i>设置<em></em></i>
          </div>
          <div class="compute_address_box" v-for="a in address" @click="setInfo(4,(nav[4]&&nav[4].name),menu[4].setting,a.product_hash_type)">
            <div class="val">{{a.product_hash_type+'地址: '+a.address|format}}</div>
            <div class="opr">修改</div>
          </div>
        </div>
      </div>
    </div>
    <MyMask :class="{bank_card_popup:edit==='card'}" :form="form[edit]" :title="title" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange"></MyMask>
  </section>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import card from '@/util/card'
  import { mapState, mapGetters } from 'vuex'
  import md5 from 'js-md5'
  import MyMask from '@/components/common/Mask'
  import Setting from '@/components/common/Setting'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      MyMask, Setting, FormField
    },
    data () {
      return {
        nav: [
          {title: '手机认证', desc: '手机号码是在算力网进行操作的重要凭证。', text: '手机号码', name: 'tel'},
          {title: '登录密码', desc: '登录算力网的重要凭证', text: '登录密码', name: 'login'},
          {title: '实名认证', desc: '完成实名认证，认证后可以获得更多权限。', text: '身份证号', name: 'auth'},
          {title: '绑定银行卡', desc: '绑定银行卡之后才能进行充值、购买和提现等操作。', text: '', name: 'card'},
          {title: '算力收益地址', desc: '请选择算力类型并设置算力地址。', text: '', name: 'address'}
        ],
        form: {
          auth: [{name: 'truename', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'card_type', type: 'text', title: '证件类型', edit: 'card_type', isChange: true}, {name: 'idcard', type: 'text', title: '证件号码', placeholder: '请输入您的证件号码', pattern: 'idCard'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
          card: [{name: 'card_no', type: 'text', title: '银行卡号', placeholder: '请输入银行卡号', pattern: 'bankCard', changeEvent: true}, {name: 'open_bank', type: 'text', title: '开户银行', placeholder: '自动识别或手动输入开户银行', isChange: true}, {name: 'bank_branch', type: 'text', title: '开户支行', placeholder: '请输入开户支行名称', isChange: true}, {name: 'bank', type: 'select', title: '开户行地址', isChange: true}, {name: 'mobile', type: 'text', title: '银行预留手机号', placeholder: '请输入银行预留手机号', pattern: 'tel'}, {name: 'code', type: 'text', title: '手机验证码', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
          address: [{name: 'product_hash_type', type: 'select', title: '算力类型', option: []}, {name: 'address', type: 'text', title: '算力地址', placeholder: '请输入对应算力地址', pattern: 'computeAddress'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
          login: [{name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}, {name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'password'}, {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', pattern: 'password', error: '两次密码不一致'}]
        },
        edit: '',
        title: '',
        product_hash_type: '',
        card_type: '中国大陆身份证'
      }
    },
    methods: {
      submit (e) {
        var form = e.target
        var data = api.checkFrom(form, this.isMobile)
        var url = ''
        var callbackUrl = ''
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
            val = 'true_name'
            tipsStr = '实名认证已提交，请您耐心等待几秒即可看到认证结果'
            tipsStr2 = '恭喜您实名认证成功'
            break
          case 'card':
            url = 'BankCard'
            callbackUrl = 'show_bankcard'
            val = 'bank_card'
            tipsStr = '银行卡绑定已提交，请您耐心等待几秒即可看到认证结果'
            tipsStr2 = '恭喜您银行卡绑定成功'
            break
          case 'address':
            url = 'bindAddress'
            callbackUrl = 'show_Address'
            val = 'address'
            tipsStr = '设置成功'
            break
          case 'login':
            url = 'changeLoginPassword'
            tipsStr = '修改成功'
            break
        }
        if (!data) return false
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips(tipsStr, self.isMobile)
            if (self.edit === 'auth' || self.edit === 'card') {
              self.$store.commit('SET_INFO', {[val]: {status: 0}})
              setTimeout(() => {
                self.requestData(callbackUrl, sendData, val, () => {
                  api.tips(tipsStr2, self.isMobile)
                })
              }, 7000)
            } else if (self.edit === 'address') {
              self.requestData(callbackUrl, sendData, val)
            }
            self.closeMask()
          })
        })
      },
      closeMask () {
        var form = document.querySelector('.form')
        api.clearForm(form)
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      requestData (url, sendData, val, callback) {
        var self = this
        util.post(url, {sign: api.serialize(sendData)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.$store.commit('SET_INFO', {[val]: res})
            if (callback) {
              callback()
            }
          }, '', () => {
            self.$store.commit('SET_INFO', {[val]: ''})
          })
        })
      },
      onChange (obj) {
        var val = obj.e.target.value
        var val1 = val.substr(0, 6)
        var val2 = val.substr(0, 5)
        if (val.length >= 6) {
          for (var i = 0; i < card.length; i++) {
            if (val1 === card[i].id || val2 === card[i].id) {
              document.getElementsByName('open_bank')[0].value = card[i].name
            }
          }
        }
      },
      setInfo (i, k, s, n) {
        this.title = this.nav[i].title
        if (k === 'tel' || (k === 'auth' && s)) return false
        this.edit = k
        if (k === 'address') {
          if (n) {
            this.product_hash_type = n
            this.form[this.edit][0].type = 'text'
            this.form[this.edit][0].edit = 'address'
          } else {
            this.product_hash_type = ''
            this.form[this.edit][0].type = 'select'
            this.form[this.edit][0].edit = 0
          }
        }
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        isMobile: state => state.isMobile,
        address: state => state.info.address
      }),
      ...mapGetters([
        'menu'
      ])
    },
    filters: {
      format: api.telReadable
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/style.scss';
  .account{
    .mobile_box{
      width: 100%;
      height: 100%;
      background: #f5f5f9;
      .list{
        width: 100%;
        overflow: hidden;
        background: white;
        padding:0 .2rem;
        box-sizing: border-box;
        .item{
          width: 100%;
          line-height: 0.85rem;
          font-size: 0.28rem;
          color: #121212;
          &:not(.compute_address),.compute_address_title{
            @include flex(space-between)
            i{
              color: #999999;
              em{
                @include block(8)
                @include arrow
                margin-left:0.17rem;
              }
            }
          }
          &:not(:last-child){
            border-bottom:1px solid #ddd;
          }
          &.compute_address{
            .compute_address_title{
              border-bottom:1px solid $border;
            }
            .compute_address_box{
              margin:0 10px;
              line-height: 0.85rem;
              font-size: 0.28rem;
              color:$light_text;
              @include flex(space-between)
              &:not(:last-child){
                border-bottom:1px solid $border;
              }
            }
          }
        }
        & + .list{
          margin-top: .5rem;
        }
      }
    }
  }
</style>
