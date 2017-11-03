<template>
  <div class="help">
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
  export default {
    data () {
      return {
        nav: [{name: 'aboutUs', title: '关于我们', path: '/webInfo/help/aboutUs'}, {name: 'issues', title: '常见问题', path: '/webInfo/help/issues'}]
      }
    }
  }
</script>

