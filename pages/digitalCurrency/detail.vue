<template>
  <div class="teall">
    <section class="web_info_detail tecontent">
        <h3>{{content.title}}<a class="button" to="#" onclick="window.history.go(-1)">< 返回列表</a></h3>
        <!-- <p class="dateline">{{content.dateline}}</p> -->
        <div class="info_detail" v-html="content.content" style="padding:0 50px;"></div>
    </section>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  export default {
    data () {
      return {
        content: {},
        params1: ''
      }
    },
    mounted () {
      var self = this
      var url = ''
      var p = localStorage.getItem('icon_id')
      if (p) {
        p = JSON.parse(p)
        this.params1 = p[0]
      } else {
        this.$router.push({path: '/currency'})
      }
      util.post('showCoinInfoDetail', {sign: 'token=0&coin_id=' + this.params1}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.content = res
        })
      })
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .teall{
      background:#f7f8fa;
      overflow: hidden;
      width:100%;
      padding:20px 0;
  }
  .tecontent{
      width:1160px;
      min-height:700px;
      margin:0 auto;
  }
  .web_info_detail{
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
