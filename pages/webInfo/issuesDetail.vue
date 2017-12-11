<template>
  <section class="issues_detail">
    <div class="issues_content">
      <h3>{{nowItem.title}}</h3>
      <div class="issues_con" v-html="nowItem.content"></div>
      <div class="btn_box">
        <router-link to="/webInfo/issues" class="button">返回</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'Issues',
    data () {
      return {
        nav: [],
        nowClass: -1,
        list: [],
        nowItem: []
      }
    },
    mounted () {
      var self = this
      util.post('getHelpContent', {sign: api.serialize({token: this.token, help_id: this.$route.params.id})}).then(function (res) {
        self.nowItem = res
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .issues_detail{
    .issues_content{
      background: #fff;
      min-height:calc(100vh - 536px);
      padding:40px;
      line-height: 2;
      h3{
        margin-bottom:30px
      }
      p{
        text-indent: 2em;
      }
      .button{
         width:60px;
         height: 30px;
         text-align: center;
         float: right;
         background:#f5f8ff;
         color:#327fff;
         border:0;
         border-radius:3px;
      }
      .button:hover{
        background: #327fff;
        color:#f5f8ff;
      }
      .issues_con{
        img{
          width:auto;
          max-width:100%
        }
      }
      .btn_box{
        overflow:hidden
      }
    }
  }
</style>
