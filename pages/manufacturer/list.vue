<template>
  <pageFrame>
    <div class="right_content manufacture_right" v-if="isMobile === 0">
      <h1>算力服务器制造商<span class="icon iconfont icon-jiantou"></span></h1>
      <div class="manufacture_item" v-for="n, k in museum" :key="k">
        <div class="manufacture_img"><img :src="n.image"/></div>
        <div class="manufacture_content">
          <h6>{{n.title}}</h6>
          <p>{{n.resume}}</p>
          <div class="go_detail" @click="goDetail(n.id)">查看详情</div>
        </div>
      </div>
      <Pager :len="len" :now="now" @setPage="setPage"></Pager>
    </div>
    <div class="mobile_manufacture" v-else-if="isMobile === 1">
      <h1 v-if="!showcontent">主流算力服务器制造商</h1>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="quicknews_lists" v-if="!showcontent">
        <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)">
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
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  import pageFrame from '@/components/common/PageFrame'
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
        showcontent: false,
        content: '',
        allid: []
      }
    },
    head () {
      return {
        title: '比特币算力服务器公司-算力服务器品牌-算力网网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力服务器公司,比特大陆,翼比特,嘉楠耘智' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）合作主流算力服务器生产商，与市面上主流算力服务器如蚂蚁算力服务器，阿瓦隆算力服务器，翼比特算力服务器等生产商建立友好合作关系。' }
        ]
      }
    },
    methods: {
      getList (more) {
        var self = this
        util.post('NewsManfacturerList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
          api.checkAjax(self, res, () => {
            if (more) {
              for (let i = 0, len = res.list.length; i < len; i++) {
                self.museum.push(res.list[i])
              }
            } else {
              self.museum = res.list
              self.allid = res.id_list
              localStorage.setItem('all_id', JSON.stringify(self.allid))
            }
            if (self.now > 1) return false
            self.len = Math.ceil(res.total_num / 6)
          })
        }).catch(res => {
          console.log(res)
        })
      },
      setPage (n) {
        this.now = n
        if (!this.isMobile) {
          this.getList()
        }
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/manufacturer/detail/'})
      },
      setPage (n) {
        this.now = n
        if (!this.isMobile) {
          this.getList()
        }
      },
      loadMore () {
        if (this.now <= this.len ) {
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
  @import '~assets/css/style.scss';
  .manufacture_right{
    .manufacture_item{
      height: 232px;
      box-shadow: 0 0 10px #c2c2c2;
      margin-top: 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      .manufacture_img{
        width: 30%;
        height: 170px;
        border-right: 1px solid #999999;
        text-align: center;
        float: left;
        img{
          width: 191px;
          margin-top: 8%;
          height: 80%;
          object-fit: contain;
        }
      }
      .manufacture_content{
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
          padding-right: 45px;
          @include ellipsis(2)
        }
        .go_detail{
          width: 172px;
          height: 38px;
          border:1px solid #bfbfbf;
          background:#fff;
          color: #a9a9a9;
          margin-top: 27px;
          float: right;
          margin-right: 37px;
          text-align: center;
          line-height: 38px;
          border-radius: 5px;
          cursor: pointer;
          &:hover{
            background:#fe5039;
            color: #fff;
            border:0;
          }
        }
      }
    }
  }
  .mobile_manufacture{
    width: 100%;
    overflow: hidden;
    background: white;
    h1{
      width: 100%;
      font-size: 0.3rem;
      color:#333333;
      padding: 0.3rem;
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
        height: 2.36rem;
        text-align: center;
        padding: 0 0.5rem;
        img{
          width: 1.78rem;
          height: 0.48rem;
          object-fit: contain;
          margin-top: 0.56rem;
        }
        p{
          color:#666666;
          font-weight: 800;
          widows: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: 0.42rem;
          font-size: 0.3rem;
        }
      }
      :nth-of-type(even){
        border-right: 0;
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
        padding: 0.3rem;
        padding-bottom: 0;
      }
      span{
        font-weight: 800;
        font-size: 0.3rem;
      }
      a{
        float: right;
        color:#327fff;
        font-size: 0.3rem;
      }
      .info_quick{
        width: 100%;
        padding:0 0.3rem;
      }
    }
  }
</style>
