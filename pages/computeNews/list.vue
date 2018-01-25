<template>
  <pageFrame isComponent="true">
    <section class="right_content suanli_news">
      <h1>算力资讯<span class="icon iconfont icon-jiantou"></span></h1>
      <div :class="['item', 'img_text', {active: true}]" @click="goDetail(list.id)" v-for="list in lists" :key="lists.id">
        <img v-if="list.image" :src="list.image"/>
        <img v-else :src="img1"/>
        <div class="right">
          <p class="title">{{list.title}}</p>
          <p class="time" v-if="list.source"><span>{{list.source}}</span>|<span>{{list.dateline}}</span></p>
          <p class="time" v-else><span>《算力网》</span>|<span>{{list.dateline}}</span></p>
          <p class="notice_content" v-if="list.resume">{{list.resume}}......</p>
          <p class="notice_content" v-else>暂无简介</p>
        </div>
      </div>
      <Pager :len="len" :now="now" @setPage="setPage"></Pager>
    </section>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import pageFrame from '@/components/common/PageFrame'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      pageFrame, Pager
    },
    head () {
      return {
        title: '算力新闻_比特币资讯－算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力新闻,比特币资讯,比特币新闻' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com)产业新闻栏目，为你提供各种算力产业资讯，比特币新闻，行业动态，关注算力网，开启你的挖矿之旅' }
        ]
      }
    },
    data () {
      return {
        lists: [],
        img1: require('@/assets/images/zx.jpg'),
        len: 0,
        now: 1,
        allid: []
      }
    },
    methods: {
      getList () {
        var n = this.$route.params.type
        var url = 'suanliMessage'
        var self = this
        util.post(url, {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.lists = res.list
            self.allid = res.id_list
            localStorage.setItem('all_id', JSON.stringify(self.allid))
            if (self.now > 1) return false
            self.len = Math.ceil(res.total / 7)
          })
        })
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/computeNews/detail/'})
      },
      setPage (n) {
        this.now = n
        if (!this.isMobile) {
          this.getList()
        }
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>

<style lang="scss">
  .suanli_news{
    .img_text{
      width: 100%;
      padding-bottom: 27px;
      display: block;
      border-bottom:1px dashed #e5e5e5;
      overflow: hidden;
      margin-bottom: 28px;
      cursor: pointer;
      img{
        width: 200px;
        height: 120px;
        float: left;
        margin-right: 30px;
      }
      .title{
        color: black;
        font-size: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .time{
        font-size: 12px;
        span {
          &:first-child {
            margin-right:10px;
          }
          &:nth-child(2) {
            margin-left:10px;
          }
        }
      }
      .notice_content{
        margin-top: 10px;
        font-size: 12px;
        line-height: 20px;
        height: 57px;
        overflow: hidden;
      }
    }
  }
</style>
