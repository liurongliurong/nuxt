<template>
  <PcHeader class="pc_header" v-if="isMobile===0"></PcHeader>
  <MobileHeader class="mobile_header" v-else-if="isMobile===1"></MobileHeader>
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
