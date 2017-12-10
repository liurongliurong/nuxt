<template>
  <div class="mobileequipment">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="equipment_lists" v-if="!showcontent">
      <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)" class="equipment_list">
        <h4>{{ item.title}}</h4>
        <p>{{item.resume}}</p>
        <div class="opacity">
          <img :src="item.image"/>
          <span>BitCoin</span>
        </div>
      </div>
    </div>
    <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
    <p v-if="showno" class="showno">暂无数据······</p>
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
        total: -1,
        loading: false,
        museum: [],
        showcontent: false,
        content: '',
        showno: false
      }
    },
    methods: {
      loadMore () {
        var self = this
        this.loading = true
        if (this.total === 0) {
          this.loading = false
          this.showno = true
          return
        }
        if (this.total > this.museum.length || this.museum.length === 0) {
          let time = this.museum.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('NewsReviewList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
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
  .mobileequipment{
    width: 100%;
    overflow: hidden;
    background: white;
    .equipment_lists{
      width: 100%;
      padding:0 0.5rem;
      box-sizing: border-box;
      padding-bottom: 0.5rem;
      .equipment_list{
        border-bottom: 1px solid #bfbfbf;
        width: 100%;
        overflow: hidden;
        padding: 0.5rem 0;
        h4{
          font-size: 0.6rem;
          font-weight: 800;
          padding-bottom: 0.3rem;
        }
        p{
          color: #999;
          height: 1.5rem;
          font-size: 0.5rem;
          line-height:0.75rem;
          padding:0;
          margin:0;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .opacity{
          width: 100%;
          position: relative;
          height: 3.5rem;
          img{
            width: 100%;
            position: absolute;
            left: 0;
            height: auto;
            top:0;
            height: 100%;
          }
          span{
            position: absolute;
            left: 0;
            top:0;
            display: block;
            width: 2.5rem;
            height: 1rem;
            background: #01beb5;
            color:white;
            font-size: 0.4rem;
            text-align: center;
            line-height: 1rem;
          }
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
    .showno{
      text-align: center;
      padding-top: 3rem;
      color:#666666;
    }
  }
</style>
