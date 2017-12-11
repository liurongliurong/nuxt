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
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
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
