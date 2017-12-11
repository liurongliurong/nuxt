<template>
  <section class="message">
    <h2>消息中心</h2>
    <h3>通知消息<span class="read" v-if="unread_num" @click="setRead()">全部标为已读</span></h3>
    <div class="data">
      <router-link :to="'/user/messageDetail/'+d.id" :class="['item', {isread: d.is_read}]" v-for="d,k in data" :key="k">
        <div class="title">{{d.title}}</div>
        <div class="text">{{d.dealtContent.split(" ")[0]}}</div>
        <div class="time">{{d.created_at}}</div>
      </router-link>
      <Pager :len="len"></Pager>
    </div>
    <div class="mobile_box">
      <ul v-show="contentshow">
        <li class="list_one" @click="setRead()" v-if="unread_num"><span></span>全部标为已读</li>
        <li v-for="d,k in data" :key="k" @click="detailcli(d.id)" :class="['itemlist', {isread: d.is_read}]">
          <span>{{d.title}}</span>
          <i>{{d.created_at.split(" ")[0]}}</i>
        </li>
        <Pager :len="len" class="mobilepager"></Pager>
      </ul>
      <div class="message_content" v-show="!contentshow">
        <h3>{{content.title}}</h3>
        <p style="color:#999;">{{content.created_at}}</p>
        <p v-html="content.msg"></p>
        <button @click="back()">返回</button>
      </div>
    </div>
    <div class="nodata" v-if="show">
      <div class="nodata_img"></div>
      <p>暂无列表信息</p>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        data: [],
        now: 1,
        leftSibling: 0,
        rightSibling: 0,
        len: 0,
        show: false,
        content: '',
        contentshow: true
      }
    },
    methods: {
      setRead (i) {
        var self = this
        util.post('isRead', {sign: api.serialize({token: this.token, user_id: this.user_id, is_read: 0})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.$router.push({name: 'message'})
            self.fetchData()
          })
        })
      },
      fetchData () {
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
      },
      getList () {
        this.fetchData()
      },
      detailcli (id) {
        var self = this
        var messageid = id
        this.contentshow = false
        util.post('Messagecontent', {sign: api.serialize({token: this.token, user_id: this.user_id, message_id: messageid})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      },
      back () {
        window.location.reload()
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
  @import '../../assets/css/style.scss';
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
      ul{
        width: 100%;
        overflow: hidden;
        .list_one{
          font-weight: 800;
          color: #327fff;
        }
        li{
          width: 100%;
          border-bottom:1px solid #dddddd;
          display: flex;
          justify-content: space-between;
          height: 2rem;
          line-height: 2rem;
          background:white;
          padding:0 .5rem;
          font-weight: 800;
          &.isread{
            font-weight: 100;
            font-size: #ccc;
          }
          span{
            width: 70%;
            color: #121212;
          }
          i{
            color: #a9a9a9;
            font-size: 0.45rem;
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
