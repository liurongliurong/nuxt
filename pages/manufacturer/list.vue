<template>
  <pageFrame isComponent="true">
    <template v-if="isMobile === 0">
      <div class="museum_right1" style="padding-bottom: 60px !important;min-height:900px;">
        <h1 style="position:relative;">矿机制造商<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
        <div class="museum_lists1" v-for="n, k in museum" :key="k">
          <div class="museuming1"><img :src="n.image"/></div>
          <div class="museum_content1">
            <h6>{{n.title}}</h6>
            <p>{{n.resume}}</p>
            <div @click="goDetail(n.id)">查看详情</div>
          </div>
        </div>
        <Pager :len="len" style="padding-top:0;"></Pager>
      </div>
    </template>
    <template v-else-if="isMobile === 1">
      <div class="mobilequicknews">
        <h1 v-if="!showcontent">主流矿机制造商</h1>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="quicknews_lists" v-if="!showcontent">
          <div v-for="item, k in museum1" :key="k" @click="clickcontent(item.id)">
            <img :src="item.image"/>
            <p>{{ item.title}}</p>
          </div>
        </div>
        <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
        <div class="quicknews_content"  v-if="showcontent">
          <div class="title">
            <span>{{content.title}}</span>
            <a class="button" onclick="window.location.reload()">< 返回列表</a>
          </div>
          <div class="info_quick" v-html="content.content"></div>
        </div>
      </div>
    </template>
  </pageFrame>

</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  import pageFrame from '@/components/computeNews/pageFrame'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      Pager, pageFrame
    },
    data () {
      return {
        len: 0,
        now: 1,
        museum: [],
        total: 0,
        loading: false,
        museum1: [],
        showcontent: false,
        content: ''
      }
    },
    head () {
      return {
        title: '比特币矿机公司-矿机品牌-算力网网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '矿机公司,比特大陆,翼比特,嘉楠耘智' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）合作主流矿机生产商，与市面上主流矿机如蚂蚁矿机，阿瓦隆矿机，翼比特矿机等生产商建立友好合作关系。' }
        ]
      }
    },
    methods: {
      getList () {
        var self = this
        util.post('NewsManfacturerList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.museum = res.list
            if (self.now > 1) return false
            self.len = Math.ceil(res.total / 5)
          })
        }).catch(res => {
          console.log(res)
        })
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/manufacturer/detail/'})
      },
      loadMore () {
        var self = this
        this.loading = true
        if (this.total > this.museum1.length || this.museum1.length === 0) {
          let time = this.museum1.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('NewsManfacturerList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.total
                for (let i = 0, len = res.list.length; i < len; i++) {
                  self.museum1.push(res.list[i])
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
      },
      clickcontent (id) {
        this.showcontent = true
        var self = this
        util.post('content', {sign: 'token=0&news_id=' + id}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
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
  .museum_right1{
    float: left;
    width: 1110px;
    background: white;
    padding:32px 62px 0 62px;
    box-sizing: border-box;
    h1{
      color: #121212;
      font-size: 24px;
      font-weight: 800;
      span{
        font-size: 20px;
        margin-left: 13px;
      }
    }
    .museum_lists1{
      width: 100%;
      height: 232px;
      background: #fff;
      box-shadow: 0 0 10px #c2c2c2;
      margin-top: 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .museuming1{
        width: 254px;
        height: 170px;
        border-right: 1px solid #999999;
        text-align: center;
        float: left;
        img{
          width: 191px;
          vertical-align: middle;
          margin-top: 49px;
        }
      }
      .museum_content1{
        width: 70%;
        float: left;
        padding-left: 58px;
        h6{
          color: #333333;
          font-size: 22px;
          margin-bottom: 12px;
        }
        p{
          line-height: 22px;
          color: #666666;
          height: 42px;
          overflow: hidden;
          padding-right: 45px;
        }
        div{
          width: 172px;
          height: 38px;
          border:1px solid #bfbfbf;
          background:white;
          color: #a9a9a9;
          margin-top: 27px;
          float: right;
          margin-right: 37px;
          text-align: center;
          line-height: 38px;
          border-radius: 5px;
          &:hover{
            background:#fe5039;
            color: white;
            border:0;
          }
        }
      }
    }
  }
  .mobilequicknews{
    width: 100%;
    overflow: hidden;
    background: white;
    h1{
      width: 100%;
      padding-left: 1rem;
      font-size: 0.7rem;
      color:#333333;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .quicknews_lists{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-top: 1px solid #dcdcdc;
      padding-bottom: 0.5rem;
      div{
        display: block;
        width: 50%;
        border-bottom: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        box-sizing: border-box;
        padding:0 1.5rem;
        height: 5.5rem;
        text-align: center;
        img{
          width: 100%;
          height: 1.5rem;
          margin-top: 1.5rem;
        }
        p{
          color:#666666;
          font-weight: 800;
          widows: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: 0.5rem;
        }
      }
      :nth-of-type(even){
        border-right: 0;
      }
    }
        .loadmore{
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
    }
    .quicknews_content{
      width: 100%;
      padding-bottom: 50px;
      background: white;
      .title{
        padding: 0.5rem;
      }
      span{
        font-weight: 800;
        font-size: 0.7rem;
      }
      a{
        float: right;
        color:#327fff;
        font-size: 0.5rem;
      }
      .info_quick{
        width: 100%;
        padding:0 0.5rem;
      }
    }
  }
</style>
