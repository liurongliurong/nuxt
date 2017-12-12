<template>
  <PcHeader v-if="!isMobile"></PcHeader>
  <MobileHeader v-else></MobileHeader>
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
