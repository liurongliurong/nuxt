<template>
  <pageFrame>
    <section class="right_content suanli_news" v-if="isMobile===0">
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
    <div class="mobilelists" v-else-if="isMobile===1">
      <div class="list_lists" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="!showcontent">
        <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)" class="list_list">
          <div class="list_left">
            <h3>{{item.title}}</h3>
            <p>{{item.resume?item.resume: '暂无简介'}}</p>
            <div><span></span>{{item.source?item.source: '算力网'}}</div>
          </div>
          <div class="list_right">
            <img :src="item.image"/>
            <div class="time">
              <p><span class="icon iconfont icon-shijian2"></span>{{item.dateline.split(" ")[0].split("-")[1]}}月{{item.dateline.split(" ")[0].split("-")[2]}}日</p>
              <p><span class="icon iconfont icon-yuedu1"></span>{{item.view_count?item.view_count : '0'}}</p>
            </div>
          </div>
        </div>
      </div>
      <p v-if="loading && !showcontent" class="loadmore">加载中······</p>
      <div class="quicknews_content" v-if="showcontent">
        <div class="title">
          <span>{{content.title}}</span>
          <a class="button" @click="showcontent1(false)">< 返回列表</a>
        </div>
        <div class="info_quick" v-html="content.content"></div>
      </div>
    </div>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import pageFrame from '@/components/common/PageFrame'
  import Pager from '@/components/common/Pager'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      pageFrame, Pager
    },
    head () {
      return {
        title: '算力新闻_比特币资讯－算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力新闻,比特币资讯,比特币新闻' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com)产业新闻栏目，为你提供各种算力产业资讯，比特币新闻，行业动态，关注算力网，开启你的收益之旅' }
        ]
      }
    },
    data () {
      return {
        lists: [],
        img1: require('@/assets/images/zx.jpg'),
        len: 0,
        now: 1,
        allid: [],
        total: 0,
        loading: false,
        museum: [],
        showcontent: false,
        content: ''
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
      },
      loadMore () {
        this.loading = true
        if (this.total > this.museum.length || this.museum.length === 0) {
          let time = this.museum.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('suanliMessage', {sign: api.serialize({token: 0, page: this.now})}).then((res) => {
              api.checkAjax(self, res, () => {
                this.total = res.total
                for (let i = 0, len = res.list.length; i < len; i++) {
                  this.museum.push(res.list[i])
                }
                this.loading = false
                this.now++
              })
            }).catch(res => {
              console.log(res)
            })
          }, time)
        } else {
          this.loading = false
        }
      },
      clickcontent (id) {
        this.showcontent = true
        var self = this
        util.post('content', {sign: 'token=0&news_id=' + id}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      },
      showcontent1 (type) {
        this.showcontent = false
      }
    },
    mounted () {
      this.getList()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
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
  .mobilelists{
    width: 100%;
    overflow: hidden;
    background: white;
    .list_lists{
      width: 100%;
      padding:0 0.3rem;
      box-sizing: border-box;
      .list_list{
        width: 100%;
        height: 3.1rem;
        border-bottom: 1px solid #dcdcdc;
        display:flex;
        justify-content: space-between;
        padding:0.3rem 0;
        .list_left{
          width: 55%;
          padding-right: .46rem;
          h3{
            font-size: 0.3rem;
            font-weight: 800;
            height: 0.82rem;
            overflow: hidden;
          }
          p{
            font-size: 0.22rem;
            margin-top: 0.3rem;
            color: #989898;
            height: 0.8rem;
            overflow: hidden;
            margin-bottom: 0.2rem;
          }
          div{
            color: #adadad;
            font-size: 0.2rem;
            span{
              width: 0.15rem;
              height: 0.15rem;
              background: #666666;
              display:inline-block;
              margin-right: 0.15rem;
              position: relative;
              top: -0.02rem;
            }
          }
        }
        .list_right{
          width: 45%;
          img{
            width: 100%;
            height: 2.06rem;
            object-fit: contain;
          }
          .time{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 0.1rem;
            p{
              font-size: 0.2rem;
              color: #999999;
              span{
                font-size: 0.21rem;
                margin-right: 0.08rem;
              }
            }
          }
        }
      }
    }
    .loadmore{
      width: 100%;
      height: 1.08rem;
      text-align: center;
      line-height: 1.08rem;
    }
    .quicknews_content{
      width: 100%;
      padding-bottom: 20px;
      background: white;
      .title{
        padding:0.3rem 0.3rem 0 0.3rem;
      }
      span{
        font-weight: 800;
        font-size: 0.3rem;
      }
      a{
        float: right;
        color:#327fff;
        font-size: 0.28rem;
      }
      .info_quick{
        width: 100%;
        padding:0 0.3rem;
      }
    }
  }
</style>
