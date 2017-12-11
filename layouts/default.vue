<template>
  <article id="app">
    <MyHead></MyHead>
    <nuxt class="body"/>
    <MyFoot></MyFoot>
    <div class="web_tips"></div>
  </article>
</template>

<script>
  import util from '../util'
  import api from '../util/function'
  import { mapState } from 'vuex'
  import MyHead from '../components/common/Header'
  import MyFoot from '../components/common/Footer'
  export default {
    data () {
      return {
        partner: []
      }
    },
    components: {
      MyHead,
      MyFoot
    },
    head () {
      return {
        title: '算力网-比特币挖矿算力托管服务一站式平台',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力网,比特币,算力挖矿,矿机托管,比特币挖矿' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）是比特币挖矿一站式服务平台，拥有专业的挖矿及运营团队，目前拥有矿机托管，矿场投资，算力出售，算力转让等业务，切实为比特币挖矿爱好者提供一站式贴心服务。' }
        ]
      }
    },
    mounted () {
      var width = document.documentElement.clientWidth
      document.documentElement.style.fontSize = 23.4 * (width / 320) + 'px'
      window.addEventListener('orientationchange', function () {
        var width = document.documentElement.clientWidth
        document.documentElement.style.fontSize = 23.4 * (width / 320) + 'px'
      })
      window.addEventListener('resize', function () {
        var width = document.documentElement.clientWidth
        document.documentElement.style.fontSize = 23.4 * (width / 320) + 'px'
      })
      if (api.checkEquipment()) {
        this.$store.commit('SET_EQUIPMENT', true)
      }
      if (this.token === 0) {
        this.$store.dispatch('getInfo')
      }
      var self = this
      util.post('getAll', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.$store.commit('SET_INFO', res)
        })
      })
      util.post('getCurrencys', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.$store.commit('SET_HASH_TYPE', res)
        })
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../assets/css/public.scss';
  @import '../assets/fonts/iconfont.css';
</style>