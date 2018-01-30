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
    <scroll-list :content="content" :loading="loading" :showContent="showContent" @loadMore="loadMore" @back="showContent=false" v-else-if="isMobile===1">
      <div class="news_item" v-for="item, k in lists" :key="k" @click="clickcontent(item.id)">
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
    </scroll-list>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import pageFrame from '@/components/common/PageFrame'
  import Pager from '@/components/common/Pager'
  import { mapState } from 'vuex'
  import ScrollList from '@/components/common/ScrollList'
  export default {
    components: {
      pageFrame, Pager, ScrollList
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
        loading: false,
        showContent: false,
        content: {}
      }
    },
    methods: {
      getList (more) {
        util.post('suanliMessage', {sign: api.serialize({token: 0, page: this.now})}).then((res) => {
          api.checkAjax(this, res, () => {
            if (more) {
              for (let i = 0, len = res.list.length; i < len; i++) {
                this.lists.push(res.list[i])
              }
            } else {
              this.lists = res.list
              this.allid = res.id_list
              localStorage.setItem('all_id', JSON.stringify(this.allid))
            }
            if (this.now > 1) return false
            this.len = Math.ceil(res.total / 7)
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
        if (this.now < this.len) {
          this.loading = true
          this.now++
          this.getList(1)
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
        }
      },
      clickcontent (id) {
        this.showContent = true
        util.post('content', {sign: 'token=0&news_id=' + id}).then((res) => {
          api.checkAjax(this, res, () => {
            this.content = res
          })
        })
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
  .scroll_list .list_box{
    .news_item{
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
</style>
