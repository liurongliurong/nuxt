<template>
  <pageFrame isComponent="true">
    <pdigital-currency v-if="!isMobile"></pdigital-currency>
    <mdigital-currency v-else></mdigital-currency>
  </pageFrame>
</template>
<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import PdigitalCurrency from './pc'
  import MdigitalCurrency from './mobile'
  import pageFrame from '@/components/computeNews/pageFrame'
  export default {
    components: {
      PdigitalCurrency, MdigitalCurrency, pageFrame
    },
    data () {
      return {
        toplists: [{unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}, {unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}],
        bottomlists: [{unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}, {unit: require('@/assets/images/BDC-2.png'), name: '比特币(Bitcoin)'}]
      }
    },
    methods: {
      getList () {
        var self = this
        util.post('showCoinInfo', {sign: api.serialize({token: this.token})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.toplists = res.main_coin
            self.bottomlists = res.other_coin
          })
        }).catch(res => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.getList()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    }
  }
</script>
