<template>
  <section class="message_detail">
    <h2>消息详情</h2>
    <div class="data">
      <div class="title">{{data.title}}</div>
      <div class="time">{{data.created_at}}</div>
      <div class="text" v-html="data.msg"></div>
    </div>
    <button @click="back()">返回</button>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        data: {},
        messageId: ''
      }
    },
    methods: {
      getData () {
        if (this.token !== 0 && this.messageId) {
          fetchApiData(this, 'Messagecontent', {token: this.token, message_id: this.messageId}, (res) => {
            this.data = res
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      back () {
        this.$router.push({path: '/user/message'})
      }
    },
    mounted () {
      var p = localStorage.getItem('info')
      if (p) {
        p = JSON.parse(p)
        this.messageId = p.messageId
      } else {
        this.$router.push({path: '/repayment/0'})
      }
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token
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
    button{
      width: 100px;
      height: 30px;
      background: #f5f8ff;
      float: right;
      border:0;
    }
  }
</style>
