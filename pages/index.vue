<template>
  <article class="home" v-if="isMobile===0">
    <Swiper :pagination-visible="true" :loop="true" :autoPlay="5000"></Swiper>
    <MyData></MyData>
    <div class="home_text">
      <div class="main">
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
    <div class="home_title">
      <div class="main">
        <h1 class="home_item_title">{{ad.title}}</h1>
        <p class="home_item_desc">{{ad.desc}}</p>
        <div class="list">
          <div class="item" v-for="s,k in suanLi">
            <div class="iconfont"></div>
            <div class="item_title">{{s.title}}</div>
            <div class="item_desc">{{s.desc}}</div>
          </div><div class="item"></div>
        </div>
      </div>
    </div>
    <WebInfo></WebInfo>
    <div class="my_map">
      <div class="main">
        <h1 class="home_item_title">持续扩张的数据中心让跨域体验更流畅</h1>
        <p class="home_item_desc">全面拓展国际、国内区块链云计算市场，担当行业领头羊角色。胸有成“数”，自当志在四方。</p>
        <div class="home_map_data">
          <div class="item" v-for="m,k in mapData">
            <span class="item_name">{{m.title}}</span>
            <span class="item_value">{{computeData[m.name]+' '+m.unit}}</span>
          </div>
        </div>
        <DataMap class="data_chart"></DataMap>
      </div>
    </div>
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
    <div class="wq">
      <img :src="wqImg" alt="" class="pre">
      <div class="text">
        <img src="~assets/images/server.png" style="width:800px;display:block;margin:0 auto;"/>
        <router-link to="/minerShop/list">即刻体验</router-link>
      </div>
    </div>
    <SideBar></SideBar>
  </article>
  <article class="mobile_home" v-else-if="isMobile===1">
    <Swiper :pagination-visible="true" :loop="false" :autoPlay="5000" :data="data"></Swiper>
    <div class="nav_box">
      <div class="item" v-for="n,k in nav" :key="k" @click="goPage(n.url, k)">
        <img class="item_img" :src="require('@/assets/images/mobile/nav'+(k+1)+'.png')" alt="">
        <h3 class="item_text">{{n.title}}</h3>
      </div>
    </div>
    <MyData></MyData>
    <div class="home_compute_news">
      <h3 class="home_title">算力资讯</h3>
      <div class="compute_items">
        <router-link to="/quickNews">
          <div class="item" v-for="n,k in newsNav">
            <div class="text">
              <p>{{n.title}}</p>
              <p>{{n.desc}}</p>
            </div>
            <div class="item_img">
              <img :src="require('@/assets/images/mobile/news'+(k+1)+'.png')" alt="">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="home_compute_loan">
      <h3 class="home_title">算力分期</h3>
      <div class="loan_img">
        <img :src="require('@/assets/images/mobile/loan.png')" alt="">
      </div>
    </div>
    <a class="home_service" href="tel:0571-28031736">
      <div class="service_img">
        <img :src="require('@/assets/images/mobile/service.png')" alt="">
      </div>
      <div class="service_text">
        <h1>售前咨询在线客服</h1>
        <p>我们认真听取您的每一条建议</p>
      </div>
    </a>
  </article>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import MyData from '@/components/home/dataList'
  import Swiper from '@/components/common/Swipe'
  import WebInfo from '@/components/home/WebInfo'
  import SideBar from '@/components/home/SideBar'
  import DataMap from '@/components/home/DataMap'
  import { mapState } from 'vuex'
  export default {
    components: {
      Swiper, MyData, WebInfo, SideBar, DataMap
    },
    data () {
      return {
        nav: [{title: '矿机商城', desc: '无忧购买矿机', url: '/minerShop/miner/1'}, {title: 'BDC托管', desc: '多个BDC中心', url: '/bdc'}, {title: '产业资讯', desc: '掌握产业动态', url: '/quickNews'}, {title: '算力转让', desc: '掌握产业动态', url: '/mobile/information'}],
        data: [1, 1, 1],
        newsNav: [{title: '热点快讯·不止于此', desc: '开启算力新篇章'}, {title: '实时交易信息', desc: '前往了解更多'}, {title: '挖矿币种资料', desc: '前往了解更多'}],
        ad: {title: '算力驱动未来，信任链接天下', desc: '全球算力产业链资源整合，基于区块链的分布式算力输出平台', items: [{title: '项目合规', desc: '所有项目出具法律意见书<br>并公开法律意见书'}, {title: '用电合规', desc: '项目为政府招商引资项目<br>全部国网供电，电力稳定持久'}, {title: '透明收益', desc: '全流程产业链对接，信息透明<br>避免踩坑'}, {title: '全程存证', desc: '对接保全网区块链电子凭证技术<br>实现全部在线协议的合规有效'}, {title: '算力管家', desc: '为用户投资的每一份算力<br>提供贴心的远程管家服务'}]},
        wqImg: require('@/assets/images/img.jpg'),
        suanLi: [{title: 'SHA256比特币算力', desc: 'Bitcoin数字货币算力', icon: 'ELbobeicesuan'}, {title: '卷积神经算法算力', desc: '为CNN卷积神经网络提供分布式加速服务', icon: 'guanlianxitongwenbenqueren'}, {title: 'EquiHash零币算力', desc: 'ZeroCASH提供隐私保护及零知识证明的基础算力', icon: 'wodegongzuo-liebiao'}, {title: '智能合约算力', desc: '全球贸易智能合约服务的分布式基础算力', icon: 'dianzihetongshenqing'}, {title: 'Curecoin算力', desc: '蛋白质折叠计算，生化反应模型，用于发现新药', icon: 'hebaoshenpi'}, {title: 'Scrypt莱特币算力', desc: 'Litecoin数字货币算力', icon: 'xinxichaxun'}, {title: '游戏币兑换算力', desc: '全球游戏产业虚拟货币通用兑换算力', icon: 'jiedongzhiquzhihang'}, {title: 'Ethash以太算力', desc: '以太坊网络，ETCETH算力', icon: 'yewuchaxun'}, {title: '公证算力', desc: '提供区块链公证服务，存证保全的基础算力', icon: 'shouqushenqingchaxun'}],
        mapData: [{title: '全网算力', name: 'hashrate', unit: 'PH/s'}, {title: '当前全网困难度', name: 'difficulty', unit: 'T'}],
        computeData: {}
      }
    },
    methods: {
      goMobile () {
        if (api.checkEquipment()) {
          this.$store.commit('SET_EQUIPMENT', 1)
        } else {
          this.$store.commit('SET_EQUIPMENT', 0)
        }
      },
      goPage (url, k) {
        if (k !== 3) {
          this.$router.push({path: url})
        } else {
          api.tips('即将开放，敬请期待', 1)
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.goMobile, false)
      var self = this
      util.post('showDifficulty', {sign: 'token=0'}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.computeData = res
        })
      })
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .home{
    .swiper{
      .swiper_wrap{
        .swiper_one{
          position: relative;
          height: 420px;
          &:nth-child(2),&:nth-child(4){
            @include bg(1920, 420)
            background: linear-gradient(to right, #FE5337 10%, #FF9D02);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FE5337', endColorstr='#FF9D02',GradientType=1 );
          }
          &:nth-child(1),&:nth-child(3){
            @include bg(1920, 420)
            background: linear-gradient(to right, #1077F0 10%, #00E0D8);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1077F0', endColorstr='#00E0D8',GradientType=1 );
          }
          // img{
          //   position: absolute;
          //   transition: all .2s;
          //   transform-style: preserve-3d;
          //   backface-visibility: hidden;
          //   &:first-child{
          //     left:calc(50% - 590px);
          //   }
          //   &:nth-child(2){
          //     right:calc(50% - 590px);
          //   }
          //   @media screen and (max-width: 1178px) and (min-width: 340px){
          //     object-fit:contain
          //   }
          // }
          a.btn{
            position: absolute;
            width:200px;
            height:50px;
            line-height: 50px;
            text-align: center;
            left:calc(50% - 590px);
            top:250px;
            color:#fff;
            border:1px solid #fff;
            border-radius:5px;
            font-size: 18px;
            &:hover{
              background: #fff;
              color:#1e396c
            }
          }
          // img:first-child,a.btn{
          //   @media screen and (max-width: 1178px) and (min-width: 340px){
          //     left:0;
          //   }
          // }
          // img:nth-child(2){
          //   @media screen and (max-width: 1178px) and (min-width: 340px){
          //     right:0;
          //   }
          // }
          // &:nth-child(6),&:nth-child(2){
          //   img{
          //     top:0;
          //     left:calc(50% - 590px);
          //     width:1180px;
          //     height:100%;
          //     object-fit:cover;
          //     @media screen and (max-width: 1178px) and (min-width: 340px){
          //       width:100%;
          //     }
          //   }
          //   a.btn{
          //     left:calc(50% - 590px);
          //     @include button($blue)
          //   }
          // }
          // &:nth-child(3) img:first-child{
          //   width:563px;
          //   top:calc(50% - 45px);
          //   height:90px;
          // }
          // &:nth-child(3) img:nth-child(2){
          //   top:calc(50% - 139.5px);
          //   width:532px;
          //   height:279px;
          // }
          // &:nth-child(4){
          //   img:first-child{
          //     width:626px;
          //     top:calc(50% - 44px);
          //     height:88px;
          //   }
          // }
          // &:nth-child(4){
          //   img:nth-child(2){
          //     top:calc(50% - 137.5px);
          //     width:404px;
          //     height:275px;
          //   }
          // }
          // &:nth-child(5),&:nth-child(1){
          //   img:first-child{
          //     width:493px;
          //     top:calc(50% - 44.5px);
          //     height:99px;
          //   }
          // }
          // &:nth-child(5),&:nth-child(1){
          //   img:nth-child(2){
          //     top:calc(50% - 143.5px);
          //     width:564px;
          //     height:287px;
          //   }
          // }
        }
      }
    }
    h1.home_item_title,p.home_item_desc{
      text-align: center;
      color:#01215C;
    }
    h1.home_item_title{
      font-size: 28px;
      line-height: 1.8;
      margin-top:20px;
    }
    p.home_item_desc{
      font-size: 18px;
      margin-bottom:25px;
    }
    .home_title{
      .main{
        @include main
        .list{
          @include row(5,0)
          margin-top:20px;
          border-bottom: 1px solid $border;
          border-right: 1px solid $border;
          .item{
            text-align: center;
            border-top: 1px solid $border;
            border-left: 1px solid $border;
            padding:15px;
            height:146px;
            .item_title{
              font-size: 18px;
              margin-bottom:10px
            }
            .item_desc{
              text-align: left;
              color:$light_black;
            }
            &:nth-child(1),&:nth-child(6),&:nth-child(8){
              .item_desc{
                text-align: center
              }
            }
            & .iconfont{
              font-size: 36px;
              color:#538fee;
              line-height: 1;
            }
            &:nth-child(1) .iconfont:before{
              content:'\e6ca'
            }
            &:nth-child(2) .iconfont:before{
              content:'\e6cd'
            }
            &:nth-child(3) .iconfont:before{
              content:'\e6d8'
            }
            &:nth-child(4) .iconfont:before{
              content:'\e6cb'
            }
            &:nth-child(5) .iconfont:before{
              content:'\e6ce'
            }
            &:nth-child(6) .iconfont:before{
              content:'\e6dd'
            }
            &:nth-child(7) .iconfont:before{
              content:'\e6d0'
            }
            &:nth-child(8) .iconfont:before{
              content:'\e6dc'
            }
            &:nth-child(9) .iconfont:before{
              content:'\e6da'
            }
            &:not(:last-child):hover{
              background: $blue;
              &,.iconfont,.item_desc{
                color:$white
              }
            }
            &:nth-child(10){
              position: relative;
              display: inline-block;
              vertical-align:middle;
              &:before,&:after{
                position: absolute;
                content: "";
                background: #999;
              }
              &:before{
                left: calc(50% - 15px);
                top: calc(50% - .5px);
                width: 30px;
                height: 1px;
              }
              &:after{
                top: calc(50% - 15px);
                left: calc(50% - .5px);
                height: 30px;
                width: 1px;
              }
            }
          }
        }
      }
    }
    .home_text{
      background:#f7f8fa;
      border-bottom:1px solid $border;
      .main{
        @include main
        line-height: 2;
        .list{
          @include flex
          border:1px solid $border;
          border-top:0;
          border-bottom:0;
          .item{
            position: relative;
            height: 170px;
            width:20%;
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
      overflow: hidden;
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
        margin-top:85px;
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
    .my_map{
      background: #F6F7FB;
      padding-top:30px;
      .main{
        @include main
        .home_map_data{
          width:700px;
          margin:0 auto;
          @include flex
          .item{
            position: relative;
            width:50%;
            span.item_name{
              font-size: 16px;
              margin-right:10px;
            }
            span.item_value{
              font-size: 18px;
              font-style: italic;
              color:$blue;
              font-weight: bold;
            }
            &:first-child:after{
              content:'|';
              position: absolute;
              right:0;
              top:5px;
              color:$border;
            }
            &:last-child{
              text-align: right;
            }
          }
        }
        h1.home_item_title{
          margin-top:0
        }
        .data_title{
          @include flex(center);
          .item{
            margin:0 20px;
            padding-bottom:10px;
            cursor: pointer;
            color:#999;
            border-bottom: 2px solid transparent;
            &.active,&:hover{
              color:#32b4ff;
              border-color:#32b4ff;
            }
          }
        }
        .data_chart{
          padding:30px 0
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
            line-height: 80px;
            text-align: center;
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
              display: inline-block;
            }
            .img1,.img_hover1{
              height: 49px;
              width: 150px;
            }
            .img1{
              background: url('~assets/images/partner.png') -10px -216px;
            }
            .img_hover1{
              background: url('~assets/images/partner.png') -180px -216px;
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
              background: url('~assets/images/partner.png') -180px -10px;
            }
            .img_hover3{
              background: url('~assets/images/partner.png') -180px -79px;
            }
            .img4,.img_hover4{
              height: 46px;
              width: 150px;
            }
            .img4{
              background: url('~assets/images/partner.png') -10px -150px;
            }
            .img_hover4{
              background: url('~assets/images/partner.png') -180px -150px;
            }
            .img5,.img_hover5{
              height: 32px;
              width: 150px;
            }
            .img5{
              background: url('~assets/images/partner.png') -10px -281px;
            }
            .img_hover5{
              background: url('~assets/images/partner.png') -180px -281px;
            }
            .img6,.img_hover6{
              height: 50px;
              width: 150px;
            }
            .img6{
              background: url('~assets/images/partner.png') -10px -10px;
            }
            .img_hover6{
              background: url('~assets/images/partner.png') -10px -80px;
            }
            .img7,.img_hover7{
              height: 20px;
              width: 150px;
            }
            .img7{
              background: url('~assets/images/partner.png') -350px -10px;
            }
            .img_hover7{
              background: url('~assets/images/partner.png') -350px -50px;
            }
          }
        }
      }
    }
  }
  .mobile_home{
    background: #f4f4f4;
    .swiper{
      .swiper_wrap{
        .swiper_one{
          height:48vw;
          & > a > img{
            width:100vw
          }
        }
      }
    }
    .nav_box{
      padding:15px;
      background:white;
      margin-bottom:0.5rem;
      @include row(4,5%)
      .item{
        text-align: center;
        .item_img{
          width:2rem;
        }
        h3.item_text{
          font-size:0.6rem;
          margin-top:0.5rem
        }
      }
    }
    .home_title{
      font-size: 0.55rem;
      text-align: center;
      font-weight: bold;
      padding:15px 0;
      &:before{
        content:'一 '
      }
      &:after{
        content:' 一'
      }
    }
    .home_compute_news{
      background: #fff;
      margin:15px 0;
      .compute_items{
        overflow:hidden;
        border-top:1px solid $border;
        .item{
          float: left;
          width:50%;
          text-align: center;
          .text{
            color:$light_text;
            font-size: 0.5rem;
            p:first-child{
              font-size: 0.6rem;
              font-weight: bold;
              color:$text
            }
          }
          .item_img{
            margin:0 auto;
          }
          &:first-child{
            .text{
              padding:15px 0;
            }
            .item_img{
              width:3.6rem;
            }
          }
          &:nth-child(2),&:nth-child(3){
            @include flex
            border-left:1px solid $border;
            padding:15px;
            .item_img{
              width:1.5rem
            }
          }
          &:nth-child(3){
            border-top:1px solid $border;
          }
        }
      }
    }
    .home_compute_loan{
      background: #fff;
      margin-bottom:15px;
      .loan_img{
        padding:0 15px 20px 15px
      }
    }
    .home_service{
      background: #fff;
      margin-bottom:15px;
      @include flex(space-between)
      padding:15px 30px;
      .service_img{
        width:3.6rem
      }
      .service_text{
        color:$light-text;
        h1{
          font-size: 0.8rem;
          font-weight: bold
        }
        p{
          color:$light_black
        }
      }
    }
  }
</style>
