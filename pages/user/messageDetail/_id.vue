<template>
  <section class="message_detail">
    <h2>消息中心</h2>
    <h3>通知消息</h3>
    <div class="data">
      <div class="title">{{data.title}}</div>
      <div class="time">{{data.created_at}}</div>
      <div class="text" v-html="data.msg"></div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        data: {}
      }
    },
    mounted () {
      var self = this
      util.post('Messagecontent', {sign: api.serialize({token: this.token, user_id: this.user_id, message_id: this.$route.params.id})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.data = res
        })
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .message_detail{
    padding:0 15px;
    h2{
      padding:0 15px !important;
    }
    .data{
      padding:20px;
      .title{
        font-size: 18px;
        font-weight: bold;
        margin: 15px 0;
      }
      .time{
        color:$light_text;
        margin-bottom:15px;
        font-size: 12px;
      }
      .text{
        font-size: 16px;
      }
    }
  }
</style>
