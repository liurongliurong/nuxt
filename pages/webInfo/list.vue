<template>
  <div class="webinfo_list">
    <div class="box">
      <div class="content_box">
        <nuxt-link class="tab" :to="n.path" v-for="n in nav" :key="n.id">{{n.title}}</nuxt-link>
      </div>
    </div>
    <div class="content_box">
      <nuxt-child class="content"/>
    </div>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  export default {
    data () {
      return {
        str: {website: '网站动态', product: '产品公告', news: '算力资讯'},
        nav: [{name: 'product', title: '产品公告', path: '/webInfo/list/product'}, {name: 'website', title: '网站动态', path: '/webInfo/list/website'}, {name: 'news', title: '算力资讯', path: '/webInfo/list/news'}]
      }
    },
    methods: {
      judge () {
        document.querySelector('title').innerHTML = this.str[this.$route.params.type]
      }
    },
    mounted () {
      this.judge()
    },
    watch: {
      $route () {
        this.judge()
      }
    }
  }
</script>
