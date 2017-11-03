<template>
  <section class="web_info_detail">
    <div class="box">
      <div class="content_box">
        <nuxt-link class="tab" :to="n.path" v-for="n in nav" :key="n.id">{{n.title}}</nuxt-link>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <h4>{{content.title}}</h4>
        <div class="info_detail" v-html="content.content"></div>
        <nuxt-link class="button" :to="link">返回</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    asyncData (ctx) {
      var params = ctx.route.params.id.split('&')
      var url = ''
      var sendData = {}
      var nav = []
      var link = ''
      if (params.length > 1) {
        url = 'content'
        sendData = {token: 0, news_id: params[1]}
        nav = [{name: 'product', title: '产品公告', path: '/webInfo/list/product'}, {name: 'website', title: '网站动态', path: '/webInfo/list/website'}, {name: 'news', title: '算力资讯', path: '/webInfo/list/news'}]
        link = '/webInfo/list/'+params[0]
      } else {
        url = 'getHelpContent'
        sendData = {token: 0, help_id: params[0]}
        nav = [{name: 'aboutUs', title: '关于我们', path: '/webInfo/help/aboutUs'}, {name: 'issues', title: '常见问题', path: '/webInfo/help/issues'}]
        link = '/webInfo/help/issues'
      }
      return util.post(url, sendData).then(function (res) {
        // api.checkAjax(self, res, () => {
          return {
            content: res,
            nav,
            link
          }
        // })
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .content{
    min-height:500px;
    background: #fff;
    padding:15px 15px 45px 15px;
    line-height: 2;
    .button{
     width: 60px;
    height: 30px;
    text-align: center;
    float: right;
    background: #f5f8ff;
    color: #327fff;
    border: 0;
    border-radius: 3px;
    }
    h4{
      text-align: center;
      font-size: 18px;
      line-height: 3;
    }
    .info_detail{
      img{
        width:auto;
        max-width:100%
      }
    }
  }
</style>
