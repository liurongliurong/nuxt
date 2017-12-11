<template>
  <p-list v-if="!isMobile"></p-list>
  <m-list v-else></m-list>
</template>

<script>
  import { mapState } from 'vuex'
  import PList from './pc'
  import MList from './mobile'
  export default {
    components: {
      PList, MList
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>
