<template>
  <article class="home">
    <Swiper :pagination-visible="true" :loop="true" :paginationClickable="true" :autoPlay="3000"></Swiper>
    <!-- <Chart></Chart> -->
    <div class="ad">
      <div class="main">
        <h1>{{ad.title}}</h1>
        <p>{{ad.desc}}</p>
        <div class="list">
          <div class="item" v-for="a,k in ad.items">
            <span :class="['iconfont', 'icon'+k]"></span>
            <h3>{{a.title}}</h3>
            <div class="line"></div>
            <p v-html="a.desc"></p>
          </div>
        </div>
      </div>
    </div>
    <MyData></MyData>
    <div class="wq">
      <img :src="wqImg" alt="" class="pre">
      <div class="text">
        <img src="../assets/images/server.png" style="width:800px;display:block;margin:0 auto;"/>
        <router-link to="/cloudCompute/list/1/all">即刻体验</router-link>
      </div>
    </div>
    <WebInfo></WebInfo>
    <div class="partner">
      <div class="box">
        <h3>战略合作伙伴</h3>
        <div class="list">
          <div class="item" v-for="i in 7" v-if="i!==2">
            <div :class="'img img'+i"></div>
            <div :class="'img_hover img_hover'+i"></div>
          </div>
        </div>
      </div>
    </div>
    <SideBar></SideBar>
  </article>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Swiper from '@/components/common/Swipe'
  import Chart from '@/components/home/Chart'
  import MyData from '@/components/home/DataList'
  import WebInfo from '@/components/home/WebInfo'
  import SideBar from '@/components/home/SideBar'
  export default {
    components: {
      Swiper, Chart, MyData, WebInfo, SideBar
    },
    data () {
      return {
        ad: {title: '全球首个算力产业链综合服务平台', desc: '算力网是中国信息化推进联盟区块链实验室的推进项目，为区块链算力产业链提供全系列服务', items: [{title: '项目合规', desc: '所有项目出具法律意见书<br>并公开法律意见书'}, {title: '用电合规', desc: '项目为政府招商引资项目<br>全部国网供电，电力稳定持久'}, {title: '透明收益', desc: '全流程产业链对接，信息透明<br>避免踩坑'}, {title: '全程存证', desc: '对接保全网区块链电子凭证技术<br>实现全部在线协议的合规有效'}, {title: '算力管家', desc: '为用户投资的每一份算力<br>提供贴心的远程管家服务'}]},
        wqImg: require('@/assets/images/ad.jpg'),
        dataList: [],
        activity: [],
        notice: []
      }
    },
    mounted () {
      var self = this
      util.post('product_top_list', {token: this.token}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.dataList = res
        })
      })
      util.post('/webDynamic', {token: this.token}).then(function (data) {
        self.activity = data
      })
      util.post('/webAnnouncoment', {token: this.token}).then(function (data) {
        self.notice = data
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
  @import '../assets/css/style.scss';
  @import '../assets/fonts/iconfont.css';
  .ad{
    background:#f7f8fa;
    border-bottom:1px solid $border;
    margin-bottom:45px;
    .main{
      @include gap(20,v)
      @include main
      height:293px;
      line-height: 2;
      h1,p{
        text-align: center
      }
      h1{
        font-size: 30px
      }
      p{
        font-size: 16px
      }
      .list{
        @include flex
        border:1px solid $border;
        border-bottom:0;
        margin-top:30px;
        .item{
          position: relative;
          height: 150px;
          flex:1;
          padding:20px;
          padding-right:18px;
          &:not(:last-child){
            border-right:1px solid $border;
          }
          h3{
            font-size: 20px;
          }
          .line{
            width:45px;
            border-bottom:2px solid $blue;
            margin-top:5px;
            margin-bottom:7px;
          }
          p{
            position: relative;
            text-align: left;
            line-height: 1.5;
            font-size: 14px;
            color:$light_text;
            z-index: 2;
          }
          span{
            position: absolute;
            top:calc(50% - 35px);
            right:20px;
            @include block(70)
            &:before{
              font-size: 70px;
              color:#e6e6e6
            }
          }
          .icon0:before{
            content: "\e60a"
          }
          .icon1:before{
            content: "\e60b"
          }
          .icon2:before{
            content: "\e606"
          }
          .icon3:before{
            content: "\e604"
          }
          .icon4:before{
            content: "\e608"
          }
          &:hover{
            background: $white;
            h3{
              color:$blue
            }
          }
        }
      }
    }
  }
  .wq{
    position: relative;
    height:315px;
    margin-bottom:60px;
    overflow: hidden;
    @include flex(flex-start,center)
    .pre{
      @include position
      height:100%;
      object-fit:cover;
      z-index: -1;
      transition:2s;
    }
    &:hover .pre{
      transform:scale(1.1); 
    }
    .text{
      @include main
      text-align: center;
      h2{
        font-size: 30px;
        margin-bottom:20px;
        color:$white
      }
      p{
        font-size: 16px;
        color:#d7d8d9
      }
      a{
        display: inline-block;
        padding:10px 50px;
        border-radius:5px;
        @include button($blue)
        margin-top:30px;
        &:hover{
          background:#166cfb;
          border:1px solid #166cfb;
        }
      }
    }
  }
  .partner{
    .box{
      @include main
      text-align: center;
      margin-bottom:60px;
      h3{
        font-size: 24px;
        margin-bottom:30px
      }
      .list{
        @include row(6,0)
        border-left:1px solid $border;
        border-top:1px solid $border;
        .item{
          height:80px;
          border-right:1px solid $border;
          border-bottom:1px solid $border;
          @include flex(center)
          &:hover .date{
           color:#ff721f;
          }
          .img,&:hover .img_hover{
            display: none;
          }
          .img_hover,&:hover .img{
            display: block;
          }
          .img1,.img_hover1{
            height: 49px;
            width: 150px;
          }
          .img1{
            background: url('../assets/images/partner.png') -10px -216px;
          }
          .img_hover1{
            background: url('../assets/images/partner.png') -180px -216px;
          }
          // .img2,.img_hover2{
          //   height: 50px;
          //   width: 180px;
          // }
          // .img2{
          //   background: url('../assets/images/partner.png') -360px -117px;
          // }
          // .img_hover2{
          //   background: url('../assets/images/partner.png') -0px -171px;
          // }
          .img3,.img_hover3{
            height: 49px;
            width: 150px;
          }
          .img3{
            background: url('../assets/images/partner.png') -180px -10px;
          }
          .img_hover3{
            background: url('../assets/images/partner.png') -180px -79px;
          }
          .img4,.img_hover4{
            height: 46px;
            width: 150px;
          }
          .img4{
            background: url('../assets/images/partner.png') -10px -150px;
          }
          .img_hover4{
            background: url('../assets/images/partner.png') -180px -150px;
          }
          .img5,.img_hover5{
            height: 32px;
            width: 150px;
          }
          .img5{
            background: url('../assets/images/partner.png') -10px -281px;
          }
          .img_hover5{
            background: url('../assets/images/partner.png') -180px -281px;
          }
          .img6,.img_hover6{
            height: 50px;
            width: 150px;
          }
          .img6{
            background: url('../assets/images/partner.png') -10px -10px;
          }
          .img_hover6{
            background: url('../assets/images/partner.png') -10px -80px;
          }
          .img7,.img_hover7{
            height: 20px;
            width: 150px;
          }
          .img7{
            background: url('../assets/images/partner.png') -350px -10px;
          }
          .img_hover7{
            background: url('../assets/images/partner.png') -350px -50px;
          }
        }
      }
    }
  }
</style>
