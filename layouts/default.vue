<template>
  <article id="app">
    <MyHead></MyHead>
    <nuxt class="body"/>
    <MyFoot v-if="$route.name!=='auth-login'&&$route.name!=='auth-regist'&&$route.name!=='auth-passwordRetrieval'"></MyFoot>
    <div class="toast"></div>
  </article>
</template>

<script>
  import util, { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MyHead from '@/components/common/Header'
  import MyFoot from '@/components/common/Footer'
  export default {
    scrollToTop: true,
    components: {
      MyHead,
      MyFoot
    },
    head () {
      return {
        title: '算力网-比特币收益、算力服务器托管服务一站式平台',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力网,比特币,算力收益,算力服务器托管,比特币收益' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）是比特币收益一站式服务平台，拥有专业的技术及运营团队，目前拥有算力服务器托管，BDC中心投资，算力出售，算力转让等业务，切实为比特币爱好者提供一站式贴心服务。' }
        ],
        script:[
          {
            type: 'text/javascript',
            src: 'https://api.map.baidu.com/api?v=2.0&ak=GKTGV62UVGc1FZb4wUBdWG8w'
          },
          {
            type: 'text/javascript',
            src: 'https://hm.baidu.com/hm.js?ca5ac0aa0de68de8aa013b447048408b'
          }
        ]
      }
    },
    methods: {
      pageInit() {
        if (this.token !== 0) {
          fetchApiData(this, 'getAll', {token: this.token}, (res) => {
            this.$store.commit('SET_INFO', res)
          })
        } else {
          setTimeout(() => {
            this.pageInit()
          }, 5)
        }
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
      this.pageInit()
      util.post('getCurrencys', {token: 0}).then( (res) => {
        this.$store.commit('SET_HASH_TYPE', res.msg)
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
