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
    motheds: {
      
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
</style>