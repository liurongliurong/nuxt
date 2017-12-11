<template>
  <pageFrame isComponent="true">
    <pmanu-facturer class="currency_right" v-if="!isMobile"></pmanu-facturer>
    <mmanu-facturer v-else></mmanu-facturer>
  </pageFrame>
</template>

<script>
  import { mapState } from 'vuex'
  import PmanuFacturer from './pc'
  import MmanuFacturer from './mobile'
  import pageFrame from '@/components/computeNews/pageFrame'
  export default {
    components: {
      PmanuFacturer, MmanuFacturer, pageFrame
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>
