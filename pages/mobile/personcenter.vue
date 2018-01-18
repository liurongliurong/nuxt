<template>
  <div class="person_center">
    <div class="person_header">
      <div class="left">
        <div class="img"><img src="../../assets/images/jie-blue.png"/></div>
        <div class="cen">
          <h4>{{mobile|format}}</h4>
          <p>欢迎来到算力网 !</p>
        </div>
      </div>
      <em></em>
    </div>
    <div class="all_list">
      <router-link :to="n.link" class="route" v-for="n,k in nav" :key="k">
        <div class="left">
          <span :class="['icon', 'iconfont', n.icon]"></span>
          <span class="name">{{n.name}}</span>
        </div>
        <em></em>
      </router-link>
    </div>
    <button @click="logout" class="back">退出</button>
    <MyMask :form="edit===3?[]:Withdrawals" :title="title" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange">
      <p slot="fee">手续费：{{total_price * fee|decimal}}元<span class="fee">({{fee*100+'%'}})</span></p>
      <opr-select slot="select_opr" :no="maskNo" @closeMask="closeMask"></opr-select>
    </MyMask>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  import MyMask from '@/components/common/Mask'
  import OprSelect from '@/components/common/OprSelect'
  export default {
    components: {
      FormField, MyMask, OprSelect
    },
    data () {
      return {
        nav: [
          {name: '我的订单', link: '/mobile/order/0', icon: 'icon-31shoucangxuanzhong'},
          {name: '消息中心', link: '/mobile/message', icon: 'icon-31wangwangxuanzhong'},
          {name: '账户流水', link: '/mobile/moneyFlow', icon: 'icon-wodezichan'},
          {name: '个人认证', link: '/mobile/moneyFlow', icon: 'icon-wodezichan'},
          {name: '银行卡管理', link: '/mobile/bankCard', icon: 'icon-wodezichan'},
          {name: '收益地址管理', link: '/mobile/assetsAddress', icon: 'icon-pinpaizhuanxiang'},
          {name: '账户设置', link: '/mobile/administration', icon: 'icon-pinpaizhuanxiang'}
        ],
        withdrawals: [
          {name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7, tipsInfo: '余额', tipsUnit: '元', value2: 0},
          {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
          {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
        ],
        balance_account: '',
        edit: 0,
        fee: 0,
        total_price: 0,
        feedetail: '',
        product_hash_type: '',
        title: '',
        maskNo: 0
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile,
        mobile: state => state.info.mobile,
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
          this.goAuth ('立即认证', 0)
          return false
        }
        if (k === 1) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'mobile-recharge'})
          return false
        }
        if (k === 2) {
          if (!(this.bank_card && this.bank_card.status === 1)) {
            this.goAuth ('立即绑定', 1)
            return false
          }
          if (+this.balance_account <= 0) {
            api.tips('您的账户余额不足，不能提现')
            return false
          }
          this.title = '提现'
          var requestUrl = 'showWithdraw'
          var data = {token: this.token}
          var self = this
          util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.feedetail = res
              self.fee = res.withdraw_fee
              self.withdrawals[0].value2 = parseInt(res.balance_account)
            })
          })
        }
      },
      closeMask () {
        this.edit = 0
        document.body.style.overflow = 'auto'
      },
      submit () {
        var form = document.querySelector('.form')
        var data = api.checkForm(form, this.isMobile)
        var url = 'withdraw'
        var sendData = {token: this.token}
        var tipsStr = '提现成功'
        if (!data) return false
        form.btn.setAttribute('disabled', true)
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeEdit()
            api.tips(tipsStr)
          }, form.btn)
        })
      },
      onChange (obj) {
        var amount = this.withdrawals[0].value2
        if (parseFloat(obj.e.target.value) > parseFloat(amount)) {
          obj.e.target.value = amount
        }
        this.total_price = obj.e.target.value
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          util.post('myAccount', {sign: api.serialize({token: this.token})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.balance_account = res.balance_account
            })
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      goAuth (str, n) {
        this.title = str
        this.maskNo = n
        this.edit = 3
      }
    },
    mounted () {
      this.$store.commit('SET_TITLE', '个人中心')
      this.getData()
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .person_center{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    padding-top: 0;
    padding-bottom: 1rem;

    .person_header{
      width: 100%;
      background:#327fff;
      padding: 0.88rem 0.3rem 0 0.7rem;
      @include flex(space-between, center);

      .left{
        display: flex;
        padding: 0.3rem 0;
        .img{
          width: 0.86rem;
          height: 0.86rem;
          background: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 0.6rem;
          img{
            width: 0.58rem;
            height: 0.32rem;
          }
        }
        .cen{
          padding-left: 0.3rem;
          h4{
            color: #fff;
            font-size: 0.32rem;
          }
          p{
            color: #fff;
          }
        }
      }
    }
    .all_list{
      width: 100%;
      margin: .2rem 0;
      background: #fff;
      .route{
        height: 1rem;
        @include flex(space-between, center);
        margin-left: 1.05rem;
        padding:0 .3rem 0 0;
        border-bottom:1px solid #ddd;
        .left{
          @include flex(flex-start, center);
          .icon{
            font-size: 0.33rem;
            position: absolute;
            left: 0.36rem;
          }
          .name {
            color: #333;
            fongt-size: 0.32rem;
          }
        }
        em{
          @include block(8);
          @include arrow(right, #c7c7c9);
          width: 0.17rem;
          height:0.17rem;
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
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .back{
      width: 100%;
      line-height: 0.9rem;
      background: #fff;
      color: #999;
      border: 0;
      font-size: 0.27rem;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
  .icon-dingwei:before, .icon-pinpaizhuanxiang:before, .icon-wodezichan:before, .icon-31shoucangxuanzhong:before, .icon-yiwen:before, .icon-31wangwangxuanzhong:before, .icon-xiai:before{
    position: relative;
    top: 0.05rem;
  }
</style>
