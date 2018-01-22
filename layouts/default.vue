<template>
  <article id="app">
    <MyHead></MyHead>
    <nuxt class="body"/>
    <MyFoot v-if="$route.name!=='auth-login'&&$route.name!=='auth-regist'&&$route.name!=='auth-passwordRetrieval'"></MyFoot>
    <div class="toast"></div>
  </article>
</template>

<script>
  import util from '../util'
  import api from '../util/function'
  import { mapState } from 'vuex'
  import MyHead from '../components/common/Header'
  import MyFoot from '../components/common/Footer'
  export default {
    scrollToTop: true,
    components: {
      MyHead,
      MyFoot
    },
    head () {
      return {
        title: '算力网-比特币收益算力托管服务一站式平台',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力网,比特币,算力收益,算力服务器托管,比特币收益' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）是比特币收益一站式服务平台，拥有专业的收益及运营团队，目前拥有算力服务器托管，矿场投资，算力出售，算力转让等业务，切实为比特币收益爱好者提供一站式贴心服务。' }
        ],
        script:[
          {
            type: 'text/javascript',
            src: 'https://api.map.baidu.com/api?v=2.0&ak=GKTGV62UVGc1FZb4wUBdWG8w'
          }
        ]
      }
    },
    mounted () {
      // 7.5 = 750 / 100
      var width = document.documentElement.clientWidth
      document.documentElement.style.fontSize = (width / 7.5) + 'px'
      window.addEventListener('orientationchange', function () {
        document.documentElement.style.fontSize = (width / 7.5) + 'px'
      })
      window.addEventListener('resize', function () {
        document.documentElement.style.fontSize = (width / 7.5) + 'px'
      })
      if (api.checkEquipment()) {
        this.$store.commit('SET_EQUIPMENT', 1)
      } else {
        this.$store.commit('SET_EQUIPMENT', 0)
      }
      if (this.token === 0) {
        this.$store.dispatch('getInfo')
      }
      var self = this
      util.post('getAll', {sign: api.serialize({token: this.token})}).then(function (res) {
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
        isMobile: state => state.isMobile
      })
    }
  }
</script>
