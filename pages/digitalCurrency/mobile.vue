<template>
  <div class="mobiledigital">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="digital_lists" v-if="!showcontent">
      <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)">
        <div class="left">
          <img :src="item.icon"/>
          <p>{{item.coin_name}}</p>
        </div>
        <p class="right">市值: 暂无</p>
      </div>
    </div>
    <p v-if="loading && !showcontent" class="loadmore">加载中······</p>
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
            util.post('showCoinlist_h5', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
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
        util.post('showCoinInfoDetail', {sign: 'token=0&coin_id=' + id}).then(function (res) {
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
  .mobiledigital{
    width: 100%;
    overflow: hidden;
    background: white;
    .digital_lists{
      width: 100%;
      padding:0 0.5rem;
      box-sizing: border-box;
      div{
        width: 100%;
        height: 2rem;
        display:flex;
        justify-content: space-between;
        border-bottom: 1px solid #bfbfbf;
        .left{
          float: left;
          width: 50%;
          img{
            width: 0.7rem;
            height: 0.7rem;
            position: relative;
            top:0.6rem;
          }
          p{
            font-weight: 800;
            margin-left: .5rem;
            width: 90%;
            white-space: normal;
            text-overflow: hidden;
            overflow: hidden;
            font-size: 0.5rem;
            line-height: 2rem;
          }
        }
        .right{
          float:right;
          width: 50%;
          font-size: 0.5rem;
          color: #747474;
          text-align: right;
          line-height:2rem;
        }
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
