<template>
  <div class="personcenter">
    <div class="person_header">
      <img src="../../assets/images/person.png" class="bg"/> 
      <div class="left">
        <div class="img"><img src="../../assets/images/jie.png"/></div>
        <div class="cen">
          <h4>{{mobile|format}}</h4>
          <p>欢迎来到算力网 !</p>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <div class="price">
      <div class="left">
        <p>账户余额 (元)</p>
        <h4>{{balance_account|decimal}}</h4>
      </div>
      <div class="right">
        <button style="background:#26a2ff;"  @click="openMask(1)">充 值</button>
        <button @click="openMask(2)">提 现</button>
      </div>
    </div>
    <div class="alllist">
      <router-link :to="n.link" class="route" v-for="n,k in nav" :key="k">
        <div class="left">
          <span :class="['icon', 'iconfont', n.icon]"></span>
          <span>{{n.name}}</span>
        </div>
        <em></em>
      </router-link>
    </div>
    <button @click="logout">退出登录</button>
    <div class="null"></div>
    <div class="popup" v-if="showModal">
      <div class="popup_con">
        <div class="popup_title">
          <span>提现</span>
          <span class="icon_close" @click="closeEdit"></span>
        </div>
        <form class="form" @submit.prevent="submit" novalidate>
          <FormField :form="Withdrawals"></FormField>
          <p>手续费：{{total_price * fee|decimal}}元<span class="fee">({{fee*100+'%'}})</span></p>
          <button name="btn">提交</button>
        </form>
      </div>
    </div>
  </div>
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
        nav: [{name: '账户管理', link: '/mobile/administration', icon: 'icon-pinpaizhuanxiang'}, {name: '地址管理', link: '/mobile/address', icon: 'icon-dingwei'}, {name: '资金流水', link: '/mobile/moneyFlow', icon: 'icon-wodezichan'}, {name: '订单管理', link: '/mobile/order/0', icon: 'icon-31shoucangxuanzhong'}, {name: '常见问题', link: '/mobile/help', icon: 'icon-yiwen'}, {name: '消息中心', link: '/mobile/message', icon: 'icon-31wangwangxuanzhong'}, {name: '意见反馈', link: '/mobile/advice', icon: 'icon-xiai'}],
        Withdrawals: [{name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7, tipsInfo: '余额', tipsUnit: '元'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}],
        balance_account: '',
        edit: 0,
        showModal: false,
        fee: 0,
        total_price: 0,
        feedetail: '',
        amount: 0,
        product_hash_type: ''
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        user_id: state => state.info.user_id,
        token: state => state.info.token,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card
      })
    },
    filters: {
      format: api.telReadable,
      decimal: api.decimal
    },
    methods: {
      logout () {
        this.$router.push({name: 'index'})
        this.$store.commit('LOGOUT')
      },
      openMask (k) {
        this.total_price = 0
        if (!(this.true_name && this.true_name.status === 1)) {
          api.tips('请先实名认证', 1, () => {
            this.$router.push({name: 'mobile-administration'})
          })
          return false
        }
        if (k === 1) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'mobile-recharge'})
          return false
        }
        if (k === 2) {
          if (!(this.bank_card && this.bank_card.status === 1)) {
            api.tips('请先绑定银行卡', 1, () => {
              this.$router.push({name: 'mobile-administration'})
            })
            return false
          }
          if (+this.balance_account <= 0) {
            api.tips('您的账户余额不足，不能提现', 1)
            return false
          }
          this.showModal = true
          var requestUrl = 'showWithdraw'
          var data = {token: this.token, user_id: this.user_id}
          var self = this
          util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.feedetail = res
              self.fee = res.withdraw_fee
              self.amount = parseInt(res.balance_account)
            })
          })
        }
      },
      closeEdit () {
        this.showModal = false
        document.body.style.overflow = 'auto'
      },
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkFrom(form, 1)
        var url = 'withdraw'
        var sendData = {token: this.token, user_id: this.user_id}
        var tipsStr = '提现成功'
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeEdit()
            api.tips(tipsStr, 1)
          }, form.btn)
        })
      },
      onChange (e) {
        if (parseFloat(e.target.value) > parseFloat(this.amount)) {
          e.target.value = this.amount
        }
        this.total_price = e.target.value
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          util.post('myAccount', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.balance_account = res.balance_account
            })
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .personcenter{
    width:100%;
    height:100vh;
    background:#f4f4f4;
    .person_header{
      width: 100%;
      height: 5rem;
      background:#373d41;
      position: relative;
      .bg{
        width: 100%;
        position: absolute;
        bottom:0;
        left:0;
      }
      .left{
        width: 100%;
        display: flex;
        justify-content: space-between;
        z-index:88;
        position: absolute;
        top:0;
        .img{
          width: 1.8rem;
          height: 1.8rem;
          background: white;
          border-radius: 100%;
          text-align: center;
          line-height: 1.2rem;
          margin-left: 1.5rem;
          margin-top: 1.5rem;
          img{
            width: 1.2rem;
            height: auto;
          }
        }
        .cen{
          margin-top: 1.5rem;
          position: relative;
          left:-2.2rem;
          h4{
            color: white;
            font-size: 0.7rem;
          }
          p{
            color:white;
          }
        }
        .right{
          color:white;
          font-family: "宋体";
          line-height: 5rem;
          margin-right: 0.5rem;
        }
      }
    }
    .price{
      width: 100%;
      height: 3rem;
      background:white;
      // border-bottom: 1px solid #ddd;
      font-size: 0.6rem;
      display: flex;
      justify-content: space-between;
      .left{
        padding:0.5rem;
      }
      p{
        color: #999;
      }
      h4{
        color: #ff721f;
        font-size: .9rem;
        font-weight: 900;
      }
      .right{
        width:50%;
        display: flex;
        justify-content: space-between;
        padding:0.5rem;
        padding-left:0;
        padding-top:0.2rem;
        button{
          display:inline-block;
          width:3rem;
          height:1.5rem;
          line-height: 1.5rem;
          background:$orange;
          color:white;
          font-size:0.6rem;
        }
      }
    }
    .alllist{
      width: 100%;
      margin-top: .5rem;
      .route{
        width: 100%;
        height: 2rem;
        background:white;
        display: flex;
        justify-content: space-between;
        padding:0 .5rem;
        box-sizing: border-box;
        line-height: 2rem;
        .left{
          width: 90%;
          font-size: 0.6rem;
          .icon{
            font-size:0.7rem;
            margin-right: 0.5rem;
          }
        }
        em{
          @include block(8)
          @include arrow
          margin-top:0.8rem
        }
        &:nth-child(2) .left .icon{
          font-size: 0.8rem;
          position:relative;
          top:.1rem;
          left: -.1rem;
          margin-right: 0.35rem;
        }
        &:not(:last-child){
          border-bottom:1px solid #ddd;
        }
        &:nth-child(1) .left .icon,&:nth-child(5) .left .icon{
          color:#327FFF
        }
        &:nth-child(2) .left .icon,&:nth-child(6) .left .icon{
          color:#EC6351
        }
        &:nth-child(3) .left .icon,&:nth-child(7) .left .icon{
          color:#FFAB1F
        }
        &:nth-child(4) .left .icon{
          color:#51C9C0
        }
      }
    }
    button{
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      background:white;
      color:#999;
      border:0;
      box-sizing: border-box;
      margin-top: 0.5rem;
      font-size: 0.7rem;
    }
    .null{
      width: 100%;
      height: 1rem;
      background:#f4f4f4;
      margin-bottom: 35px;
    }
  }
  .icon-dingwei:before, .icon-pinpaizhuanxiang:before, .icon-wodezichan:before, .icon-31shoucangxuanzhong:before, .icon-yiwen:before, .icon-31wangwangxuanzhong:before, .icon-xiai:before{
    position: relative;
    top: 0.05rem;
  }
</style>
