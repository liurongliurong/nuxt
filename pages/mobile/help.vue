<template>
  <section class="issues">
    <div class="issues_boxleft" v-show="show">
      <div class="issues_listsoneone">
        <div :class="['item', {open:num===k}]" v-for="n,k in nav">
          <p class="titleall" @click="fetchData(n.help_class_id,k,$event)">{{n.name}}<em></em></p>
          <div class="issues_listoneone" v-if="num===k">
            <a href="javascript:;" class="item" v-for="l,k in list" @click="detailcontent(l.id)">
              <span>{{l.title}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="issues_content" v-show="!show">
      <div v-html="nowItem.content"></div>
      <button @click="back()"  v-show="!show">返回</button>
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
        nowItem: [],
        show: true
      }
    },
    methods: {
      fetchData (id, k, e) {
        if (k === this.num) {
          this.$store.commit('SET_NUM', -1)
          return false
        }
        this.list = []
        util.post('getHelp', {token: this.token, help_class_id: id}).then((res) => {
          this.list = res.msg
        })
        setTimeout(() => {
          this.$store.commit('SET_NUM', k)
        }, 0)
      },
      detailcontent (id) {
        var helpid = id
        this.show = false
        util.post('getHelpContent', {token: this.token, help_id: helpid}).then((res) => {
          this.nowItem = res.msg
        })
      },
      back () {
        this.show = true
      }
    },
    mounted () {
      util.post('getHelpClass', {token: this.token}).then((res) => {
        this.nav = res.msg
        this.fetchData(res.msg[this.num || 0] && res.msg[this.num || 0].help_class_id, this.num || 0)
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
  @import '~assets/css/style.scss';
  .issues{
    button{
      width: 1.5rem;
      height: 0.6rem;
      background: #327fff;
      border:0;
      color: white;
      float: right;
      margin-top: 20px;
    }
    .issues_content{
      width: 100%;
      overflow: hidden;
      height: 100%;
      padding:0.5rem;
      background:white;
      margin-bottom:40px;
      box-sizing: border-box;
      text-indent:0rem !important;
      img{
        width: 100%;
      }
      span{
        text-indent:0rem !important;
      }
    }
   .issues_boxleft{
      background: #f5f5f9;
      width: 100%;
      .issues_listsoneone{
        width:100%;
        padding:0;
        overflow: hidden;
        .item{
          cursor: pointer;
          width: 100%;
          text-align: left;
          color:#121212;
          line-height: 0.87rem;
          .titleall{
            height: 0.87rem;
            padding:0 .5rem;
            line-height: 0.87rem;
            box-sizing: border-box;
            background: white;
            font-size:0.26rem;
            border-bottom:1px solid #ddd;
            em{
              @include block(8)
              @include arrow(down)
              margin-top:0.34rem;
              float:right;
            }
          }
          &:hover{
            color:#327fff;
          }
          &.open{
            color:#327fff;
            em{
              transform: rotate(135deg);
            }
          }
        }
      }
      .issues_listoneone{
        width:100%;
        line-height: 0.87rem;
        .item{
          border-top:1px solid #ddd;
          overflow: hidden;
          line-height: 0.87rem;
          cursor: pointer;
          width: 100%;
          display: block;
          span{
            width: 100%;
            display:flex;
            justify-content: space-between;
            height: 0.87rem;
            padding:0 0.3rem;
            font-size:0.3rem;
          }
          &:hover{
            color:#327fff;
          }
        }
      }
    }
  }
</style>
