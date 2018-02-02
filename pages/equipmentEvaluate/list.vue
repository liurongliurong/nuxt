<template>
  <pageFrame>
    <div class="right_content equipment_right" v-if="isMobile === 0">
      <h1>算力服务器测评<span class="icon iconfont icon-jiantou"></span></h1>
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
      <div class="nodata" v-if="!list.length">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
      <Pager :len="len" :now="now" @setPage="setPage"></Pager>
    </div>
    <scroll-list :content="content" :loading="loading" :noData="!list.length" :showContent="showContent" @loadMore="loadMore" @back="showContent=false" v-else-if="isMobile === 1">
      <div class="evaluate_item" v-for="item, k in list" :key="k" @click="getContent(item.id)">
        <h4>{{ item.title}}</h4>
        <p>{{item.resume}}</p>
        <div class="opacity">
          <img :src="item.image"/>
          <span>BitCoin</span>
        </div>
      </div>
    </scroll-list>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import { mapState } from 'vuex'
  import { getMobileList, loadMore, setPage, getContent } from '@/service/article'
  import pageFrame from '@/components/common/PageFrame'
  import Pager from '@/components/common/Pager'
  import ScrollList from '@/components/common/ScrollList'
  export default {
    components: {
      Pager, pageFrame, ScrollList
    },
    data () {
      return {
        len: 0,
        now: 1,
        list: [],
        loading: false,
        showContent: false,
        content: {},
        allid: []
      }
    },
    head () {
      return {
        title: '比特币算力服务器-型号-算力服务器测评-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '性能测试,能力测评,算力服务器配置,算力服务器教程,算力服务器组装史' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）针对各类型算力服务器进行能力测评，为您选择算力服务器，算力服务器配置，算力服务器组装等提供参考资料。等' }
        ]
      }
    },
    methods: {
      getList (more) {
        util.post('NewsReviewList', {token: 0, page: this.now}).then((res) => {
          getMobileList(this, more, res.msg, 5)
        })
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/equipmentEvaluate/detail/'})
      },
      setPage,
      loadMore,
      getContent
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
  @import '~assets/css/style.scss';
  .equipment_right{
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
    @include nodata
    .nodata {
      margin-top: 200px;
    }
  }
  .scroll_list .list_box {
    .evaluate_item{
      border-bottom: 1px solid #bfbfbf;
      width: 100%;
      overflow: hidden;
      padding: 0.3rem 0;
      h4{
        font-size: 0.3rem;
        font-weight: 800;
        padding-bottom: 0.23rem;
      }
      p{
        color: #999;
        height: 0.55rem;
        font-size: 0.5rem;
        padding:0;
        margin:0;
        overflow: hidden;
        margin-bottom: 0.23rem;
      }
      .opacity{
        width: 100%;
        position: relative;
        height: 2.3rem;
        img{
          width: 100%;
          position: absolute;
          left: 0;
          height: auto;
          top:0;
          height: 100%;
          object-fit: contain;
        }
        span{
          position: absolute;
          left: 0;
          top:0;
          display: block;
          width: 0.97rem;
          height: 0.37rem;
          background: #01beb5;
          color:white;
          font-size: 0.3rem;
          text-align: center;
          line-height: 0.37rem;
        }
      }
    }
  }
</style>
