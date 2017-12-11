<template>
  <section class="web_info_detail">
    <h3>{{content.title}}<a class="button" to="#" onclick="window.history.go(-1)">< 返回列表</a></h3>
    <!-- <p class="dateline">{{content.dateline}}</p> -->
    <div class="info_detail" v-html="content.content" style="padding:0 50px;"></div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  export default {
    data () {
      return {
        content: {}
      }
    },
    mounted () {
      var self = this
      var url = ''
      if (this.$route.path.includes('digitalCurrency')) {
        url = 'showCoinInfoDetail'
        util.post(url, {sign: 'token=0&coin_id=' + this.$route.params.id}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      } else {
        url = 'content'
        util.post(url, {sign: 'token=0&news_id=' + this.$route.params.id}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      }
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .web_info_detail{
    min-height:500px;
    background: #fff;
    padding:15px 15px 45px 15px;
    line-height: 2;
    h3{
      text-align:left;
      font-size: 20px;
      line-height: 2;
      font-weight: bold;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      a{
        text-align: center;
        float: right;
        display:inline-block;
        border: 0;
        font-size: 14px;
        font-weight: 100;
        line-height: 38px;
        color:#327fff;
        cursor: pointer;
      }
    }
    .dateline{
      text-align: center;
      color:$light_black;
      margin-bottom:10px;
    }
    .info_detail{
      img{
        width:auto;
        max-width:100%
      }
    }
  }
</style>
