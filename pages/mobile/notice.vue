<template>
  <section class="mask">
    <div class="list" v-show="contentshow">
      <div class="route" v-for="n, k in lists" @click="created(n.id)">
        <span class="left">
          <i>{{n.title}}</i>
          <em>{{n.dateline}}</em>
        </span>
        <span class="right">{{n.resume?n.resume:'暂无简介'}}</span>
      </div>
    </div>
    <div class="content" v-show="!contentshow">
      <h3>{{content.title}}</h3>
      <p style="color:#999;">{{content.dateline}}</p>
      <p v-html="content.content"></p>
    </div>
  </section>
</template>

<script>
  import util from '../../util'
  import api from '../../util/function'
  export default {
    data () {
      return {
        lists: '',
        content: '',
        contentshow: true
      }
    },
    methods: {
      created (id) {
        var self = this
        var newsid = id
        this.contentshow = false
        util.post('content', {sign: 'token=0&news_id=' + newsid}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      }
    },
    mounted () {
      var self = this
      util.post('webAnnouncoment', {sign: 'token=0'}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.lists = res
        })
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  .mask{
    width: 100%;
    height: 100vh;
    background: #f5f5f9 !important;
  }
  .list{
    width: 100%;
    overflow: hidden;
    .route{
      width: 100%;
      height: 3rem;
      display: block;
      background: white;
      border-top:1px solid #dddddd;
      padding:0 .5rem;
      border-bottom:1px solid #dddddd;
      box-sizing: border-box;
      margin-top: 0.5rem;
      .left{
        width: 100%;
        display: flex;
        justify-content:space-between;
        padding-top: 0.5rem;
        i{
          font-size: 0.6rem;
          color: black;
        }
        em{
          font-style: normal;
          color: #b8b8b8;
          font-size: 0.4rem;
        }
      }
      .right{
        display: inline-block;
        width: 100%;
        white-space: nowrap;  
        text-overflow:ellipsis; 
        overflow:hidden;
        color: #666666;
        font-size: 0.5rem;
        padding-top: .35rem;
      }
    }
  }
</style>
