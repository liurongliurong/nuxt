<template>
  <section class="issues">
    <div class="issues_box">
      <div class="issues_lists">
        <div :class="['item', {active:k===0}]" v-for="n,k in nav" @click="fetchData(n.help_class_id,$event)">{{n.name}}</div>
      </div>
      <div class="issues_list" v-show="!show">
        <nuxt-link class="item" v-for="l,k in list" :to="'/webInfo/detail/'+l.id" :key="list.id">{{l.title}}</nuxt-link>
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
        // nowItem: {title: '', content: ''},
        show: false
      }
    },
    head: {
      title: '常见问题'
    },
    methods: {
      fetchData (id, ev) {
        if (ev) {
          ev.target.classList.add('active')
          for (var key = 0; key < ev.target.parentNode.childNodes.length; key++) {
            if (ev.target.parentNode.childNodes[key] !== ev.target) {
              ev.target.parentNode.childNodes[key].classList.remove('active')
            }
          }
        }
        this.show = false
        if (id === this.nowClass) return false
        this.nowClass = id
        this.list = []
        var self = this
        util.post('getHelp', {token: this.token, help_class_id: this.nowClass}).then(function (res) {
          self.list = res
        })
      }
    },
    mounted () {
      var self = this
      util.post('getHelpClass', {token: this.token}).then(function (res) {
        self.nav = res
        self.fetchData(res[0].help_class_id)
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
  @import '~assets/css/style.scss';
  .issues{
    .issues_box{
      background: #fff;
      min-height:calc(100vh - 536px);
      @include flex(flex-start,stretch)
      padding:40px;
      .issues_lists{
        width:210px;
        border-right:1px solid $border;
        padding:15px;
        .item{
          cursor: pointer;
          width:100px;
          background: $border;
          text-align: center;
          color:$text;
          line-height: 2.4;
          & + .item{
            margin-top:15px
          }
          &:hover{
              background:#f5f8ff;
              color:#327fff;
          }
          &.active{
             background:#f5f8ff;
              color:#327fff;
          }
        }
      }
      .issues_content,.issues_list{
        flex:1;
        padding:15px 30px;
        line-height: 2;
        .item{
          cursor: pointer;
          width: 100%;
          display:block;
          &:hover{
            color:#327fff;
          }
        }
        h3{
          margin-bottom:30px
        }
        p{
          text-indent: 2em;
        }
        button{
           width:60px;
           height: 30px;
           float: right;
           background:#f5f8ff;
           color:#327fff;
           border:0;
        }
        button:hover{
          background: #327fff;
          color:#f5f8ff;
        }
        .issues_con{
          img{
            width:auto;
            max-width:100%
          }
        }
      }
    }
  }
</style>
