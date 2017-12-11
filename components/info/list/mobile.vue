<template>
  <div class="mobilelist">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists" v-if="!showcontent">
      <div v-for="item, k in museum" :key="k" @click="clickcontent(item.id)" class="list_list">
        <div class="list_left">
          <h3>{{item.title}}</h3>
          <p>{{item.resume?item.resume: '暂无简介'}}</p>
          <div><span></span>{{item.source?item.source: '算力网'}}</div>
        </div>
        <div class="list_right">
          <img :src="item.image"/>
          <div class="time">
            <p><span class="icon iconfont icon-shijian2"></span>{{item.dateline.split(" ")[0].split("-")[1]}}月{{item.dateline.split(" ")[0].split("-")[2]}}日</p>
            <p><span class="icon iconfont icon-yuedu1"></span>{{item.view_count?item.view_count : '0'}}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-if="loading && !showcontent" class="loadmore">加载更多······</p>
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
            util.post('suanliMessage', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
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
  .mobilelist{
    width: 100%;
    overflow: hidden;
    background: white;
    .list_lists{
      width: 100%;
    //   border-top: 1px solid #dcdcdc;
      padding:0 0.5rem;
      box-sizing: border-box;
      .list_list{
        width: 100%;
        height: 5.5rem;
        border-bottom: 1px solid #dcdcdc;
        display:flex;
        justify-content: space-between;
        padding:0.5rem 0;
        .list_left{
            width: 55%;
            padding-right: .5rem;
            h3{
                font-size: 0.5rem;
                font-weight: 800;
                height: 1.5rem;
                overflow: hidden;
            }
            p{
                font-size: 0.4rem;
                margin-top: 0.3rem;
                color: #989898;
                height: 1.5rem;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            div{
                color: #adadad;
                font-size: 0.4rem;
                span{
                    width: 0.3rem;
                    height: 0.3rem;
                    background: #666666;
                    display:inline-block;
                    margin-right: 0.3rem;
                }
            }
        }
        .list_right{
            width: 45%;
            img{
                width: 100%;
            }
            .time{
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-top: 0.35rem;
                p{
                    font-size: 0.4rem;
                    color: #999999;
                    span{
                        font-size: 0.55rem;
                        margin-right: 0.2rem;
                    }
                }
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
  }
</style>
