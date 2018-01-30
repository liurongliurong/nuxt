<template>
  <div class="scroll_list">
    <slot name="title"></slot>
    <div class="list_box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="!showContent">
      <slot></slot>
    </div>
    <p v-if="loading&&!showContent"  class="loading">加载中······</p>
    <p v-if="noData" class="no_data">暂无数据······</p>
    <div class="show_content"  v-if="showContent">
      <div class="content_title">
        <span class="title">{{content.title}}</span>
        <span class="back" @click="back">< 返回列表</span>
      </div>
      <div class="content_html" v-html="content.content"></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    props: {
      showContent: {
        type: Boolean
      },
      noData: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      content: {
        type: Object
      }
    },
    methods: {
      loadMore () {
        this.$emit('loadMore')
      },
      back () {
        this.$emit('back')
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .scroll_list{
    width: 100%;
    overflow: hidden;
    background: white;
    h1{
      width: 100%;
      font-size: 0.3rem;
      color:#333333;
      padding: 0.3rem;
    }
    .list_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding:0 0.3rem 0.5rem;
    }
    .loading{
      width: 100%;
      height: 1.08rem;
      text-align: center;
      line-height: 1.08rem;
    }
    .show_content{
      width: 100%;
      padding-bottom: 20px;
      background: white;
      .content_title{
        padding: 0.3rem;
        padding-bottom: 0;
        .title{
          font-weight: 800;
          font-size: 0.3rem;
        }
        .back{
          float: right;
          color:#327fff;
          font-size: 0.3rem;
        }
      }
      .content_html{
        width: 100%;
        padding:0 0.3rem;
      }
    }
    .no_data{
      text-align: center;
      padding-top: 3rem;
      color:#666666;
    }
  }
</style>
