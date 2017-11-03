<template>
  <section class="message">
    <h2>消息中心</h2>
    <h3>通知消息<span class="read" v-if="unread_num" @click="setRead()">全部标为已读</span></h3>
    <div class="data">
      <router-link :to="'/user/messageDetail/'+d.id" :class="['item', {isread: d.is_read}]" v-for="d,k in data" :key="k">
        <div class="title">{{d.title}}</div>
        <div class="text">{{d.dealtContent}}</div>
        <div class="time">{{d.created_at}}</div>
      </router-link>
      <Pager :len="len"></Pager>
    </div>
    <div class="nodata" v-if="show">
      <img :src="img" alt="">
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
        img: require('@/assets/images/no_data.jpg'),
        show: false
      }
    },
    methods: {
      setRead (i) {
        var self = this
        util.post('isRead', {token: this.token, user_id: this.user_id, is_read: 0}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.$router.push({name: 'message'})
            self.fetchData()
          })
        })
      },
      fetchData () {
        var self = this
        util.post('MessageList', {token: this.token, user_id: this.user_id, page: this.now}).then(function (res) {
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
        unread_num: state => state.info.unread_num
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
    @include nodata
  }
</style>
