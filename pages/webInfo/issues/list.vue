<template>
  <section class="issues">
    <div class="issues_box">
      <div class="issues_lists">
        <div class="item" v-for="n,k in nav" @click="fetchData(n.help_class_id,k)">{{n.name}}</div>
      </div>
      <div class="issues_list">
        <div class="item" v-for="l,k in list" :key="list.id" @click="goDetail(l.id)">{{l.title}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import { mapState } from 'vuex'
  export default {
    name: 'Issues',
    data () {
      return {
        nav: [],
        list: [],
        allid: []
      }
    },
    head () {
      return {
        title: '比特币问题—如何比特币收益-算力网',
        allid: '',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币问题' },
          { hid: 'description', name: 'description', content: '比特币问题大全，最细致的问题详情，最全面的问题解答，所有比特币爱好者的答疑天堂。' }
        ]
      }
    },
    methods: {
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/webInfo/issues/detail/'})
      },
      fetchData (id, k) {
        var eles = document.querySelector('.issues_lists').children
        for (var key = 0; key < eles.length; key++) {
          eles[key].className = 'item'
        }
        this.list = []
        util.post('getHelp', {token: this.token, help_class_id: id}).then((res) => {
          this.list = res.msg
          for (var i = 0; i<res.msg.length; i++) {
            this.allid.push({id: res.msg[i].id, title: res.msg[i].title})
          }
          localStorage.setItem('all_id', JSON.stringify(this.allid))
        })
        setTimeout(() => {
          this.$store.commit('SET_NUM', k)
          eles[k].className = 'item active'
        }, 0)
      }
    },
    mounted () {
      util.post('getHelpClass', {token: this.token}).then((res) => {
        this.nav = res.msg
        this.fetchData(res.msg[this.num || 0].help_class_id, this.num || 0)
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        num: state => state.num
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .issues{
    .issues_box{
      background: #fff;
      min-height:calc(100vh - 536px);
      @include flex(space-between,stretch)
      padding:40px;
      .issues_lists{
        width:20%;
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
      .issues_list{
        width:79%;
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
      }
    }
  }
</style>
