<template>
  <article class="web_info">
    <div class="web_info_nav">
      <div class="box" style="display:block;">
        <router-link class="tab" :to="n.path" v-for="n in nav" :key="n.id">{{n.title}}</router-link>
      </div>
    </div>
    <div class="web_info_content">
      <nuxt-child class="swip_content" />
    </div>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        nav: [{name: 'product', title: '产品公告', path: '/webInfo/list/product'}, {name: 'website', title: '网站动态', path: '/webInfo/list/website'}, {name: 'aboutUs', title: '关于我们', path: '/webInfo/aboutUs'}, {name: 'Issues', title: '常见问题', path: '/webInfo/issues/list'}],
        no: 0
      }
    },
    mounted () {
      this.judge()
    },
    watch: {
      $route () {
        this.judge()
      }
    },
    methods: {
      judge () {
        if (!this.$route.path.includes('issues')) {
          this.$store.commit('SET_NUM', '')
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .web_info{
    width: 100%;
    background: #f7f8fa;
    padding-bottom: 60px;
    .web_info_nav{
      height: 60px;
      line-height: 60px;
      background: #fff;
      .box{
        @include main
        .tab{
          font-size: 16px;
          color: #666;
          margin-right: 36px;
          font-weight: 100;
        }
        .nuxt-link-active{
          color:#327fff;
        }
      }
    }
    .web_info_content{
      @include main
      .swip_content{
        margin-top: 30px;
      }
    }
  }
</style>

