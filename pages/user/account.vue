<template>
  <section class="account">
    <div class="pc_box">
      <h2>账户管理</h2>
      <div class="setting">
        <div :class="['item', {fail: !menu[k].status}, {success: menu[k].status}, {address_item: n.name==='address'}]" v-for="n,k in nav">
          <template v-if="n.name!=='address'">
            <div class="icon"></div>
            <div class="con_title">{{n.title}}</div>
            <div class="desc">{{n.desc}}</div>
            <div class="val">
              <template v-if="menu[k].status&&n.name==='tel'">{{n.text}}：<span>{{mobile|format}}</span></template>
              <template v-if="menu[k].status&&n.name==='auth'">{{true_name.truename}}：<span>{{true_name.idcard|format}}</span></template>
              <template v-if="menu[k].status&&n.name==='card'&&bank_card.open_bank">{{bank_card.open_bank}}：<span>{{bank_card.card_no|cardformat}}</span></template>
            </div>
            <div class="opr" @click="setEdit(n.name,n.title,menu[k].setting)">{{menu[k].opr}}</div>
          </template>
          <template v-else>
            <div class="item">
              <div class="icon"></div>
              <div class="con_title">{{n.title}}</div>
              <div class="desc">{{n.desc}}</div>
              <div class="val"></div>
              <div class="opr" @click="setEdit(n.name,n.title,menu[k].setting)">{{menu[k].opr}}</div>
            </div>
            <div class="item" v-for="a in address">
              <div class="val">{{a.product_hash_type+'地址: '+a.address}}</div>
              <div class="opr" @click="setEdit(n.name,n.title,menu[k].setting,a.product_hash_type)">修改</div>
            </div>
          </template>
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
  export default {
    components: {
      MyMask
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
      setEdit (str, title, setting, n) {
        if (str === 'card' || str === 'address' || str === 'trade') {
          if (!(this.true_name && this.true_name.status === 1)) {
            api.tips('请先实名认证')
            return false
          }
        }
        if (!setting) return false
        if (str === 'address') {
          this.initHashSelect(n)
        }
        this.edit = str
        this.title = title
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
      },
      initHashSelect (k) {
        if (k) {
          this.form.address[0].type = 'text'
          this.form.address[0].edit = 'address'
          this.form.address[0].value = k
        } else {
          this.form.address[0].type = 'select'
          this.form.address[0].edit = 0
          this.form.address[0].value = ''
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
      format: api.telReadable,
      cardformat: api.cardReadable
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
      .setting{
        padding:25px 30px;
        .item{
          &:not(.address_item){
            @include flex(space-between)
            padding:15px;
            border:1px solid #e5e5e5;
          }
          &.success{
            .icon{
              position: relative;
              background: $green;
              &:before{
                content:'';
                @include right
              }
            }
            .con_title{
              color: $green;
            }
          }
          &.fail{
            .icon{
              text-align: center;
              background: $fail;
              color: $white;
              &:before{
                content:'!'
              }
            }
            .con_title{
              color: $fail;
            }
          }
          &:not(:last-child){
            margin-bottom:25px;
          }
          &.address_item{
            .item:not(:last-child){
              margin-bottom: 0;
              border-bottom:0
            }
            .item:not(:first-child){
              .val{
                text-align: left;
                padding-left:19%;
                width:80%
              }
            }
          }
          .icon{
            @include block(18,50%)
          }
          .con_title{
            width: 13%;
            font-size: 16px;
            font-weight: bold;
          }
          .desc{
            width:38%;
          }
          .val{
            width: 24%;
            color: $light_text;
            text-align: center;
            span{
              color: $text;
            }
          }
          .opr{
            width: 17%;
            text-align: right;
            color: $blue;
            cursor: pointer;
          }
        }
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
