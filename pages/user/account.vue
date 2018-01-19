<template>
  <section class="account">
    <div class="pc_box" v-if="isMobile===0">
      <h2>账户管理</h2>
      <Setting :nav="nav" type="account" @setEdit="setEdit"></Setting>
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
  import cardList from '@/util/card'
  import { auth, address, login, card } from '@/util/form'
  import { mapState, mapGetters } from 'vuex'
  import md5 from 'js-md5'
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
          {title: '登录密码', desc: '登录算力网的重要凭证', text: '登录密码', name: 'login'},
          {title: '实名认证', desc: '完成实名认证，认证后可以获得更多权限。', text: '身份证号', name: 'auth'},
          {title: '绑定银行卡', desc: '绑定银行卡之后才能进行充值、购买和提现等操作。', text: '', name: 'card'},
          {title: '算力收益地址', desc: '请选择算力类型并设置算力地址。', text: '', name: 'address'}
        ],
        form: { auth, address, login, card },
        edit: '',
        title: '',
        card_type: '中国大陆身份证'
      }
    },
    methods: {
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        if (!data) return false
        var url = ''
        var callbackUrl = ''
        var val = ''
        var sendData = {token: this.token}
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
            data.password = md5(data.password)
            data.password1 = md5(data.password1)
            break
        }
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips(tipsStr)
            if (self.edit === 'auth' || self.edit === 'card') {
              self.$store.commit('SET_INFO', {[val]: {status: 0}})
              setTimeout(() => {
                self.requestData(callbackUrl, sendData, val, () => {
                  api.tips(tipsStr2)
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
          for (var i = 0; i < cardList.length; i++) {
            if (val1 === cardList[i].id || val2 === cardList[i].id) {
              document.getElementsByName('open_bank')[0].value = cardList[i].name
            }
          }
        }
      },
      setInfo (i, k, s, n) {
        this.title = this.nav[i].title
        if (k === 'tel' || (k === 'auth' && s)) return false
        this.edit = k
        if (k === 'address') {
          this.initHashSelect(n)
        }
      },
      setEdit (obj) {
        this.edit = obj.str
        this.title = obj.title
        if (obj.str === 'address') {
          this.initHashSelect(obj.n)
        }
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
      },
      initHashSelect (k) {
        if (k) {
          this.form[this.edit][0].type = 'text'
          this.form[this.edit][0].edit = 'address'
          this.form[this.edit][0].value = k
        } else {
          this.form[this.edit][0].type = 'select'
          this.form[this.edit][0].edit = 0
          this.form[this.edit][0].value = ''
        }
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
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
    .pc_box {
      h2 {
        padding: 0 28px !important;
      }
    }
    .mobile_box {
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
