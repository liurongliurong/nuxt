<template>
  <div>
    <section v-if="!isMobile">
      <PcHeader></PcHeader>
    </section>
    <section v-else>
      <MobileHeader></MobileHeader>
    </section>
  </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  import MobileHeader from './header/mobile'
  import PcHeader from './header/pc'

  export default {
    name: 'header',
    data () {
      return {
        // nav: [{name: 'minerShop', text: '矿机商城', link: '/minerShop/list/1'}, {name: 'compute', text: '算力转让', link: '/compute/list/1'}, {name: 'bdc', text: 'BDC托管', link: '/bdc'}, {name: 'news', text: '产业资讯', link: '/webInfo/list/news'}, {name: 'dataTrade', text: '数据交易', link: ''}, {name: 'computeTrade', text: '算法交易', link: ''}],'/industryInformation'
        nav: [{name: 'minerShop', text: '矿机商城', link: '/minerShop/list'}, {name: 'bdc', text: 'BDC托管', link: '/bdc'}, {name: 'news', text: '产业资讯', link: '/industryInformation'}],
        path: {frame_header: ['regist', 'passwordRetrieval', 'user', 'account', '/detail', '/currency', 'webInfo', 'article/agreement', 'minerShop/miner', '/industryInformation', 'computeNews', 'transaction', 'quickNews', 'digitalCurrency', 'equipments', 'equipmentEvaluate', 'manufacturer', 'computeChart'], border: ['login', 'bdc'], shadow: ['regist', 'passwordRetrieval'], web_box: ['webInfo', 'minerShop/miner']},
        headerClass: ''
      }
    },
    mounted () {
      this.updateClass()
      window.addEventListener('scroll', this.test, false)
      if (this.token === 0) {
        this.$store.dispatch('getInfo')
      }
      var self = this
      util.post('getAll', {sign: api.serialize({token: this.token, user_id: this.user_id})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.$store.commit('SET_INFO', res)
        })
      }).catch(res => {
        console.log(res)
      })
      util.post('getCurrencys', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.$store.commit('SET_HASH_TYPE', res)
        })
      }).catch(res => {
        console.log(res)
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        isMobile: state => state.isMobile
      })
    },
    methods: {
      logout () {
        this.$router.push({name: 'home'})
        this.$store.commit('LOGOUT')
      },
      test (e) {
        var ele = document.querySelector('.fixed_header')
        if (!ele) return false
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 0 || this.showNav) {
          ele.className = 'fixed_header bg_opacity'
          this.scroll = true
        } else {
          ele.className = 'fixed_header'
          this.scroll = false
        }
      },
      updateClass () {
        var path = this.$route.path
        this.headerClass = ''
        for (var i in this.path) {
          for (var j = 0; j < this.path[i].length; j++) {
            if (path.includes(this.path[i][j])) {
              this.headerClass += i + ' '
              break
            }
          }
        }
        if (!this.headerClass.includes('frame_header')) {
          this.headerClass += 'fixed_header' + ' '
        }
      }
    },
    filters: {
      format: api.telReadable
    },
    watch: {
      '$route': 'updateClass'
    },
    components: {
      MobileHeader,
      PcHeader
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  // @import '~assets/fonts/iconfont.css';
</style>
