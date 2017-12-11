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
    head () {
      return {
        title: '比特币矿机公司-矿机品牌-算力网网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '矿机公司,比特大陆,翼比特,嘉楠耘智' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）合作主流矿机生产商，与市面上主流矿机如蚂蚁矿机，阿瓦隆矿机，翼比特矿机等生产商建立友好合作关系。' }
        ]
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>
