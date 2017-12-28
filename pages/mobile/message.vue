<template>
  <section class="message">
    <template v-if="!isMobile">
      <h2>消息中心</h2>
      <h3>通知消息<span class="read" v-if="unread_num" @click="setRead()">全部标为已读</span></h3>
      <div class="data">
        <a href="javascript:;" @click="goDetail(d.id)" :class="['item', {isread: d.is_read}]" v-for="d,k in data">
          <div class="title">{{d.title}}</div>
          <div class="text">{{d.dealtContent.split(" ")[0]}}</div>
          <div class="time">{{d.created_at}}</div>
        </a>
        <Pager :len="len"></Pager>
      </div>
      <div class="nodata" v-if="show">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
    </template>
    <div class="mobile_box" v-else>
      <div v-show="contentshow" class="mobile_boxUL">
        <div class="list_one" @click="setRead()" v-if="unread_num"><span></span>全部标为已读</div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists" v-if="!showcontent">
          <div v-for="d,k in cloudMinerDate" :key="k" @click="goDetail(d.id)" :class="['itemlist', {isread: d.is_read}]">
            <span>{{d.title}}</span>
            <i>{{d.created_at.split(" ")[0]}}</i>
          </div>
        </div>
        <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
        <p v-if="showno" class="showno loadmore">暂无数据······</p>
      </div>
      <div class="message_content" v-show="!contentshow">
        <h3>{{content.title}}</h3>
        <p style="color:#999;">{{content.created_at}}</p>
        <p v-html="content.msg"></p>
        <button @click="back()">返回</button>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    components: {
      Pager
    },
    data () {
      return {
        data: [],
        leftSibling: 0,
        rightSibling: 0,
        show: false,
        content: '',
        contentshow: true,
        loading: false,
        showcontent: false,
        cloudMinerDate: [],
        showno: false,
        len: 0,
        now: 1,
        total: -1
      }
    },
    methods: {
      loadMore () {
        var self = this
        this.loading = true
        if (this.total === 0) {
          this.loading = false
          this.showno = true
          return
        }
        var self = this
        if (this.total > this.cloudMinerDate.length || this.cloudMinerDate.length === 0) {
          let time = this.cloudMinerDate.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('MessageList', {sign: api.serialize({token: this.token, user_id: this.user_id, page: this.now})}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.total_num
                for (let i = 0, len = res.list.length; i < len; i++) {
                  self.cloudMinerDate.push(res.list[i])
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
      setRead (i) {
        var self = this
        util.post('isRead', {sign: api.serialize({token: this.token, user_id: this.user_id, is_read: 0})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.$router.push({name: 'user-message'})
            self.fetchData()
          })
        })
      },
      fetchData () {
        if (this.token !== 0) {
          var self = this
          util.post('MessageList', {sign: api.serialize({token: this.token, user_id: this.user_id, page: this.now})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.$store.commit('SET_INFO', {unread_num: res.unread_num})
              self.data = res.list
              self.show = !res.list.length
              if (self.now > 1) return false
              self.len = Math.ceil(res.total_num / 15)
            })
          })
        } else {
          setTimeout(() => {
            this.fetchData()
          }, 5)
        }
      },
      getList () {
        this.fetchData()
      },
      goDetail (id) {
        if (this.isMobile) {
          var self = this
          var messageid = id
          this.contentshow = false
          util.post('Messagecontent', {sign: api.serialize({token: this.token, user_id: this.user_id, message_id: messageid})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.content = res
            })
          })
        } else {
          var info = JSON.parse(localStorage.getItem('info'))
          var data = {messageId: id}
          localStorage.setItem('info', JSON.stringify(Object.assign(info, data)))
          this.$router.push({path: '/user/messageDetail/'})
        }
      },
      back () {
        window.location.reload()
        this.contentshow = false
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      this.fetchData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        unread_num: state => state.info.unread_num,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .message{
    padding:0 15px;
    h2{
      padding:0 15px !important;
    }
    h3{
      .read{
        float: right;
        color: $blue;
        cursor: pointer;
        font-size: 14px;
      }
    }
    .data{
      .item{
        line-height: 50px;
        border-bottom:1px solid $border;
        @include flex(space-between)
        @include gap(15,h)
        cursor: pointer;
        color: $text;
        .title,.time{
          font-weight: bold
        }
        .time{
          width:160px;
        }
        .title{
          width:320px;
          @include ellipsis
        }
        .time{
          text-align: right;
        }
        .text{
          width:leave(480);
          @include ellipsis
          color:#bfbfbf
        }
        &.isread{
          .title,.time{
            color:$light_text;
            font-weight: normal;
          }
          .text{
            color: $light_black;
          }
        }
      }
    }
    h2,h3,.data{
      @include mobile_hide
    }
    .mobile_box{
      .mobile_boxUL{
        width: 100%;
        overflow: hidden;
        padding-bottom: 2rem;
        .loadmore{
          text-align: center;
          width: 100%;
          height: 4rem;
          line-height: 4rem;
        }
        .list_one{
          font-weight: 800;
          color: #327fff;
          text-align: right;
          span{
            width: 50%;
            display:inline-block;
          }
        }
        .list_lists{
          width: 100%;
          overflow: hidden;
          background:white;
          .itemlist{
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #999;
             span{
              width: 50%;
              color: #121212;
              font-weight: 800;
            }
            i{
              color: #a9a9a9;
              font-size: 0.45rem;
              font-weight: 800;
            }
          }
          .isread{
            span{
              font-weight: 100;
              color: #121212;
            }
            i{
              font-weight: 100;
              color: #121212;
            } 
          }
        }
      }
      .message_content{
        width: 100%;
        height: 100%;
        background:white;
        padding:1rem .5rem;
        button{
          width: 3rem;
          height: 1.2rem;
          font-size: 0.6rem;
          color:white;
          background: #26a2ff;
          border:0;
          float: right;
          margin-top: 20px;
        }
        h3{
          color:#121212;
          font-size: 0.7rem;
          display: block;
        }
      }
      @include mobile_show
    }
    @include nodata
  }
</style>
