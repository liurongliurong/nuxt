<template>
  <div class="currency_detail">
    <WebInfoDetail></WebInfoDetail>
  </div>
</template>

<script>
  import WebInfoDetail from '@/components/common/Detail'
  export default {
    components: {
      WebInfoDetail
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .currency_detail{
    background:#f7f8fa;
    overflow: hidden;
    width:100%;
    padding:20px 0;
    .web_info_detail{
      width:1160px;
      min-height:700px;
      margin:0 auto;
    }
  }
</style>
