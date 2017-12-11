<template>
  <div class="mobilequicknews">
    <h1 v-if="!showcontent">主流矿机制造商</h1>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="quicknews_lists" v-if="!showcontent">
      <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)">
        <img :src="item.image"/>
        <p>{{ item.title}}</p>
      </div>
    </div>
    <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
    <div class="quicknews_content"  v-if="showcontent">
      <div class="title">
        <span>{{content.title}}</span>
        <a class="button" onclick="window.location.reload()">< 返回列表</a>
      </div>
      <div class="info_quick" v-html="content.content"></div>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        len: 0,
        now: 1,
        total: 0,
        loading: false,
        museum: [],
        showcontent: false,
        content: ''
      }
    },
    methods: {
      loadMore () {
        var self = this
        this.loading = true
        if (this.total > this.museum.length || this.museum.length === 0) {
          let time = this.museum.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('NewsManfacturerList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.total
                for (let i = 0, len = res.list.length; i < len; i++) {
                  self.museum.push(res.list[i])
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
      clickcontent (id) {
        this.showcontent = true
        var self = this
        util.post('content', {sign: 'token=0&news_id=' + id}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.content = res
          })
        })
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style lang="scss" scoped>
  .mobilequicknews{
    width: 100%;
    overflow: hidden;
    background: white;
    h1{
      width: 100%;
      padding-left: 1rem;
      font-size: 0.7rem;
      color:#333333;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .quicknews_lists{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-top: 1px solid #dcdcdc;
      padding-bottom: 0.5rem;
      div{
        display: block;
        width: 50%;
        border-bottom: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        box-sizing: border-box;
        padding:0 1.5rem;
        height: 5.5rem;
        text-align: center;
        img{
          width: 100%;
          height: 1.5rem;
          margin-top: 1.5rem;
        }
        p{
          color:#666666;
          font-weight: 800;
          widows: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: 0.5rem;
        }
      }
      :nth-of-type(even){
        border-right: 0;
      }
    }
        .loadmore{
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
    }
    .quicknews_content{
      width: 100%;
      padding-bottom: 50px;
      background: white;
      .title{
        padding: 0.5rem;
      }
      span{
        font-weight: 800;
        font-size: 0.7rem;
      }
      a{
        float: right;
        color:#327fff;
        font-size: 0.5rem;
      }
      .info_quick{
        width: 100%;
        padding:0 0.5rem;
      }
    }
  }
</style>
