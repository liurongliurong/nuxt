<template>
  <section class="message">
    <template v-if="isMobile===0">
      <h2>消息中心</h2>
      <h3>通知消息<span class="read" v-if="unread_num" @click="setRead()">全部标为已读</span></h3>
      <div class="data">
        <a href="javascript:;" @click="goDetail(d.id)" :class="['item', {isread: d.is_read}]" v-for="d,k in data">
          <div class="title">{{d.title}}</div>
          <div class="text">{{d.dealtContent.split(" ")[0]}}</div>
          <div class="time">{{d.created_at}}</div>
        </a>
        <Pager :len="len" :now="now" @setPage="setPage"></Pager>
      </div>
      <div class="nodata" v-if="!data.length">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
    </template>
    <div class="mobile_box" v-else-if="isMobile===1">
      <div v-show="contentShow" class="message_box">
        <div class="read_num" @click="setRead()" v-if="unread_num"><span></span>全部标为已读</div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="message_list">
          <div v-for="d,k in data" :key="k" @click="goDetail(d.id)" :class="['itemlist', {isread: d.is_read}]">
            <span>{{d.title}}</span>
            <i>{{d.created_at.split(" ")[0]}}</i>
          </div>
        </div>
        <p v-if="loading" class="load_more">加载中······</p>
        <div class="nodata" v-if="!data.length">
          <div class="nodata_img"></div>
          <p>暂无列表信息</p>
        </div>
      </div>
      <div class="message_content" v-show="!contentShow">
        <h3>{{content.title}}</h3>
        <p style="color:#999;">{{content.created_at}}</p>
        <p v-html="content.msg"></p>
        <button @click="back()">返回</button>
      </div>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
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
        show: false,
        content: '',
        contentShow: true,
        loading: false,
        len: 0,
        now: 1
      }
    },
    methods: {
      loadMore () {
        if (this.now <= this.len ) {
          this.loading = true
          this.now++
          this.fetchData(1)
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
        }
      },
      setRead (i) {
        fetchApiData(this, 'isRead', {token: this.token, is_read: 0}, (res) => {
          this.$router.push({name: 'user-message'})
          this.fetchData()
        })
      },
      fetchData (more) {
        if (this.token !== 0) {
          fetchApiData(this, 'MessageList', {token: this.token, page: this.now}, (res) => {
            this.$store.commit('SET_INFO', {unread_num: res.unread_num})
            if (more) {
              for (let i = 0, len = res.list.length; i < len; i++) {
                this.data.push(res.list[i])
              }
            } else {
              this.data = res.list
            }
            if (this.now > 1) return false
            this.len = Math.ceil(res.total_num / 15)
          })
        } else {
          setTimeout(() => {
            this.fetchData()
          }, 5)
        }
      },
      goDetail (id) {
        if (this.isMobile) {
          var messageid = id
          this.contentShow = false
          fetchApiData(this, 'Messagecontent', {token: this.token, message_id: messageid}, (res) => {
            this.content = res
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
        this.contentShow = false
      },
      setPage (n) {
        this.now = n
        this.fetchData()
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
        padding: 0 15px;
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
          width:calc(100% - 480px);
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
    .mobile_box{
      .message_box{
        width: 100%;
        overflow: hidden;
        padding-bottom: 2rem;
        .read_num{
          font-weight: 800;
          color: #327fff;
          text-align: right;
          span{
            width: 50%;
            display:inline-block;
          }
        }
        .message_list{
          width: 100%;
          overflow: hidden;
          background:white;
          .itemlist{
            width: 100%;
            height: 0.89rem;
            line-height: 0.89rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #999;
             span{
              width: 70%;
              color: #121212;
              font-weight: 800;
              @include ellipsis
            }
            i{
              color: #a9a9a9;
              font-size: 0.26rem;
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
        .load_more{
          text-align: center;
          width: 100%;
          height: 0.89rem;
          line-height: 0.89rem;
        }
        @include nodata
      }
      .message_content{
        width: 100%;
        height: 100%;
        background:white;
        padding:0.3rem;
        button{
          width: 1.5rem;
          height: 0.6rem;
          font-size: 0.3rem;
          color:white;
          background: #26a2ff;
          border:0;
          float: right;
          margin-top: 20px;
        }
        h3{
          color:#121212;
          font-size: 0.4rem;
          display: block;
        }
      }
    }
    @media screen and (max-width: $mobile) {
      padding-top: 0.3rem;
    }
    @include nodata
  }
</style>
