<template>
  <section class="web_info_detail">
    <h3>{{content.title}}<a class="button" to="#" onclick="window.history.go(-1)">< 返回</a></h3>
    <div class="info_detail" v-html="content.content" style="padding:0 50px;"></div>
    <div class="next_prev">
      <button @click="clickcontent(-1)">上一篇：<span>{{prevTitle}}</span></button>
      <button @click="clickcontent(1)"> 下一篇：<span>{{nextTitle}}</span></button>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
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
        var self = this
        var url = ''
        if (this.$route.name === 'digitalCurrency') {
          url = 'showCoinInfoDetail'
          util.post(url, {sign: 'token=0&coin_id=' + this.params1}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.content = res
            })
          })
        } else {
          url = 'content'
          util.post(url, {sign: 'token=0&news_id=' + this.params1}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.content = res
            })
          })
        }
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
      }
    },
    mounted () {
      var p = localStorage.getItem('icon_id')
      var id_lists = JSON.parse(localStorage.getItem('all_id'))
      console.log(id_lists)
      if (p) {
        p = JSON.parse(p)
        this.params1 = p[0]
      }
      for (var i = 0; i < id_lists.length; i++) {
        if (this.params1 === id_lists[i].id) {
          this.nextTitle = id_lists[i + 1] ? id_lists[i + 1].title : '没有下一篇了'
          this.prevTitle = id_lists[i - 1] ? id_lists[i - 1].title : '没有上一篇了'
        }
      }
      this.contentDetail()
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
    .info_detail{
      img{
        width:auto;
        max-width:100%
      }
    }
    .next_prev{
      width: 100%;
      height: 30px;
      margin-bottom: 30px;
      margin-top: 30px;
      button{
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
      :nth-child(2){
        float: right;
        text-align: right;
      }
    }
  }
</style>
