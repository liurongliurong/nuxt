<template>
  <pageFrame isComponent="true">
    <template v-if="isMobile === 0">
      <div class="museum_right">
        <h1 style="position:relative;">矿机测评<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
        <div class="museum_lists" v-for="n, k in list" :key="k">
          <div @click="goDetail(n.id)">
            <span class="label">BitCoin</span>
            <img :src="n.image"/>
            <div class="museum_content">
              <p class="resume">{{n.title}}:{{n.resume}}</p>
              <p class="time">{{n.dateline}}</p>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="showImg">
            <div class="nodata_img"></div>
            <p>暂无列表信息</p>
        </div>
        <Pager :len="len" style="padding-top:0;"></Pager>
      </div>
    </template>
    <template v-else-if="isMobile === 1">
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
    <!-- <pequipment-evalute v-if="!isMobile"></pequipment-evalute>
    <mequipment-evalute v-else></mequipment-evalute> -->
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import pageFrame from '@/components/computeNews/pageFrame'
  import Pager from '@/components/common/Pager'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  // import PequipmentEvalute from './pc'
  // import MequipmentEvalute from './mobile'
  export default {
    components: {
      Pager, pageFrame
    },
    data () {
      return {
        len: 0,
        now: 1,
        showImg: false,
        list: [],
        total: -1,
        loading: false,
        museum: [],
        showcontent: false,
        content: '',
        showno: false,
        allid: []
      }
    },
    head () {
      return {
        title: '比特币矿机-型号-矿机测评-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '性能测试,能力测评,矿机配置,矿机教程,矿机组装史' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）针对各类型矿机进行能力测评，为您选择矿机，矿机配置，矿机组装等提供参考资料。等' }
        ]
      }
    },
    methods: {
      getList () {
        var self = this
        if (!this.isMobile) {
          util.post('NewsReviewList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.list = res.list
              self.allid = res.id_list
              localStorage.setItem('all_id', JSON.stringify(self.allid))
              self.showImg = !res.total
              if (self.now > 1) return false
              self.len = Math.ceil(res.total / 5)
            })
          }).catch(res => {
            console.log(res)
          })
        }
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/equipmentEvaluate/detail/'})
      },
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
    mounted () {
      this.getList()
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style lang="scss">
  .nodata{
    width: 234px;
    height: 275px;
    position: absolute;
    left: 50%;
    margin-top: 100px;
    margin-left: -67px;
    p{
      text-align: center;
    }
  }
  .nodata_img{
    display: inline-block;
    width: 234px;
    height: 215px;
    margin:0 auto;
    margin-top: 200px;
    background: url('~assets/images/css_sprites.png') -335px -10px;
  }
  .museum_right{
    float: left;
    width: 1110px;
    height: 1424px;
    background: white;
    padding:32px 62px 0 62px;
    box-sizing: border-box;
    h1{
      color: #121212;
      font-size: 24px;
      font-weight: 800;
      span{
        font-size: 20px;
        margin-left: 13px;
      }
    }
    .museum_lists{
      width: 218px;
      height: 285px;
      background: white;
      box-shadow: 0 0 10px #c2c2c2;
      margin: 20px 38px 20px 0;
      border-radius: 8px;
      padding: 0 15px;
      display: inline-block;
      .label {
        display: inline-block;
        width: 70px;
        line-height: 26px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        background: #01beb5;
        position: relative;
        left: -15px;
        top: 13px;
      }
      img{
        width: 188px;
        height: 156px;
        float: left;
        object-fit: cover;
        margin: 0;
      }
      .museum_content{
        width: 100%;
        float: left;
        .resume {
          color: #59493f;
          line-height: 53px;
          font-size: 16px;
          cursor: pointer;
          
          &:hover {
            color: #327fff;
          }
        }
        .time {
          line-height: 22px;
          color: #666;
          height: 42px;
          font-size: 12px;
          overflow: hidden;
          padding-right: 45px;
        }
        button{
          width: 172px;
          height: 38px;
          border:1px solid #bfbfbf;
          background:white;
          color: #a9a9a9;
          margin-top: 27px;
          float: right;
          margin-right: 37px;
          &:hover{
            background:#fe5039;
            color: white;
            border:0;
          }
        }
      }

      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
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
