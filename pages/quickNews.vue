<template>
  <pageFrame>
    <div class="quick_news right_content" v-if="isMobile===0">
      <h2><span>算力快报</span></h2>
      <div class="scroll_news">
        <div class="news_lists" v-for="n, k in newslists">
          <span class="icon iconfont icon-yinhao"></span>
          <h4>【{{n.title}}】<span>{{n.dateline}}</span></h4>
          <p v-html="n.content"></p>
        </div>
      </div>
    </div>
    <div class="mobile_quick_news" v-else-if="isMobile===1">
      <div class="quick_news_lists" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="total" v-for="item, k in museum" :key="k">
          <h4> {{item.title}} </h4>
          <p v-html="item.content"></p>
          <div class="time"><span class="icon iconfont icon-shijian2"></span>{{times[k]}}</div>
        </div>
      </div>
      <p v-if="loading" class="loadmore">加载中······</p>
    </div>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import pageFrame from '@/components/common/PageFrame'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      pageFrame
    },
    data () {
      return {
        newslists: [],
        len: 0,
        now: 1,
        total: 0,
        loading: false,
        museum: [],
        content: '',
        times: []
      }
    },
    head () {
      return {
        title: '比特币新闻-资讯快报-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '币圈资讯' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）资讯栏目，为您提供及时的算力新闻，比特币资讯快报，比特币行情，掌握一手比特币透明资讯。' }
        ]
      }
    },
    methods: {
      getList () {
        var self = this
        if (!this.isMobile) {
          util.post('NewsBriefList', {sign: api.serialize({token: 0})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.newslists = res
            })
          }).catch(res => {
            console.log(res)
          })
        }
      },
      loadMore () {
        var self = this
        this.loading = true
        if (this.total > this.museum.length || this.museum.length === 0) {
          let time = this.museum.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('showBrief_h5', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.total
                for (var a = 0; a < res.list.length; a++) {
                  self.times.push(api.pastTime(res.list[a].dateline))
                }
                for (let i = 0, len = res.list.length; i < len; i++) {
                  self.museum.push(res.list[i])
                }
                self.loading = false
                self.now++
              })
            }).catch(res => {
              console.log(res)
            })
          }, time)
        } else {
          this.loading = false
        }
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
  .quick_news{
    h2{
      height: 53px;
      border-bottom: 1px solid #fe5039;
      margin-bottom: 28px;
      span{
        width: 183px;
        background: #fe5039;
        text-align: center;
        display: inline-block;
        line-height: 53px;
        color: #fff;
        font-weight: 800;
      }
    }
    .scroll_news{
      width: 100%;
      height: 1272px;
      overflow: auto;
      margin-bottom: 40px;
      .news_lists{
        width: 95%;
        height: 140px;
        border-bottom: 1px solid #dcdcdc;
        margin-bottom: 10px;
        cursor: pointer;
        span{
          display: block;
          font-size: 16px;
          color: #fe5039;
        }
        h4{
          width: 100%;
          font-size: 14px;
          color: #333333;
          margin-bottom: 10px;
          span{
            float: right;
            color: #a9a9a9;
            font-size: 12px;
            padding-right: 10px;
          }
        }
        p{
          color: #a9a9a9;
          height: 64px;
          overflow: hidden;
          line-height: 22px;
        }
        &:hover{
          height: auto;
          min-height: 140px;
          p{
            height: auto;
            min-height: 64px;
          }
        }
      }
        &::-webkit-scrollbar {/*滚动条整体样式*/
            width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
            background-color:transparent;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
            max-height: 100px !important;
            background: #fe5039;
        }
    }
  }
  .mobile_quick_news{
    width: 100%;
    overflow: hidden;
    background: white;
    padding:0 0.3rem;
    box-sizing: border-box;
    .quick_news_lists{
      width: 100%;
      .total{
        border-bottom: 1px solid #bfbfbf;
        width: 100%;
        overflow: hidden;
        padding: 0.2rem 0;
        h4{
          font-size: 0.3rem;
          font-weight: 800;
          padding:0.1rem 0;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        p{
          box-sizing: border-box;
          font-size: 0.22rem;
        }
        .time{
          padding-top: 0.1rem;
          font-size: 0.3rem;
          span{
            color: #999;
            margin-right: .2rem;
            font-size: 0.3rem;
          }
        }
      }
    }
    .loadmore{
      width: 100%;
      height: 1.06rem;
      text-align: center;
      line-height: 1.06rem;
    }
  }
</style>
