<template>
  <section class="web_info_detail">
    <div class="info_detail_title">
      <span>{{content.title}}</span>
      <span class="button" @click="back">< 返回</span>
    </div>
    <div class="info_detail_content" v-html="content.content" style="padding:0 50px;"></div>
    <div class="next_prev" v-if="$route.path !== '/currency/detail'">
      <div class="btn" @click="clickcontent(-1)">上一篇：<span>{{prevTitle}}</span></div>
      <div class="btn" @click="clickcontent(1)"> 下一篇：<span>{{nextTitle}}</span></div>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  export default {
    data () {
      return {
        content: {},
        params1: '',
        all_id: '',
        nextTitle: '',
        prevTitle: ''
      }
    },
    methods: {
      contentDetail () {
        var url = ''
        var data = ''
        if (this.$route.path === '/currency/detail') {
          url = 'showCoinInfoDetail'
          data = {token: 0, coin_id: this.params1}
        } else {
          url = 'content'
          data = {token: 0, news_id: this.params1}
        }
        fetchApiData(this, url, data, (res) => {
          this.content = res
        })
      },
      clickcontent (type) {
        let id_lists = JSON.parse(localStorage.getItem('all_id'))
        console.log(id_lists)
        for (let i = 0; i < id_lists.length; i++) {
          if (this.params1 === id_lists[i].id) {
            if (type === 1) {
              this.params1 = id_lists[i + 1] ? id_lists[i + 1].id : this.params1
              this.prevTitle = id_lists[i] ? id_lists[i].title : '没有上一篇了'
              this.nextTitle = id_lists[i + 2] ? id_lists[i + 2].title : '没有下一篇了'
            } else if (type === -1) {
              this.params1 = id_lists[i - 1] ? id_lists[i - 1].id : this.params1
              this.prevTitle = id_lists[i - 2] ? id_lists[i - 2].title : '没有上一篇了'
              this.nextTitle = id_lists[i] ? id_lists[i].title : '没有下一篇了'
            }
            break
          }
        }
        this.contentDetail()
      },
      back () {
        window.history.back()
      }
    },
    mounted () {
      var p = localStorage.getItem('icon_id')
      var id_lists = JSON.parse(localStorage.getItem('all_id'))
      if (p) {
        p = JSON.parse(p)
        this.params1 = p[0]
      }
      this.contentDetail()
      if (this.$route.path === '/currency/detail') {
        return false
      }
      for (var i = 0; i < id_lists.length; i++) {
        if (this.params1 === id_lists[i].id) {
          this.nextTitle = id_lists[i + 1] ? id_lists[i + 1].title : '没有下一篇了'
          this.prevTitle = id_lists[i - 1] ? id_lists[i - 1].title : '没有上一篇了'
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .web_info_detail {
    min-height:500px;
    background: #fff;
    padding:15px 15px 45px 15px;
    line-height: 2;
    .info_detail_title {
      text-align:left;
      font-size: 20px;
      line-height: 2;
      font-weight: bold;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      .button {
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
    .info_detail_content {
      img {
        width:auto;
        max-width:100%
      }
    }
    .next_prev {
      width: 100%;
      height: 30px;
      margin-bottom: 30px;
      margin-top: 30px;
      .btn {
        width: 40%;
        float: left;
        border:0;
        background: white;
        text-align: left;
        color: #327fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :nth-child(2) {
        float: right;
        text-align: right;
      }
    }
  }
</style>
