<template>
  <article class="home mobile_page">
    <Swiper :pagination-visible="true" :loop="true" :autoPlay="5000" :data="data"></Swiper>
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
        <router-link to="/quickNews/list">
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
      <h3 class="home_title">算力白条</h3>
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
  import { Toast } from 'mint-ui'
  import Swiper from '@/components/common/Swipe'
  import MyData from '@/components/home/dataList'

  export default {
    components: {
      Swiper, MyData
    },
    data () {
      return {
        nav: [{title: '矿机商城', desc: '无忧购买矿机', url: '/minerShop/miner/1'}, {title: 'BDC托管', desc: '多个BDC中心', url: '/bdc'}, {title: '产业资讯', desc: '掌握产业动态', url: '/quickNews/list'}, {title: '算力转让', desc: '掌握产业动态', url: '/mobile/information'}],
        data: [1, 1, 1],
        newsNav: [{title: '热点快讯·不止于此', desc: '开启算力新篇章'}, {title: '实时交易信息', desc: '前往了解更多'}, {title: '挖矿币种资料', desc: '前往了解更多'}]
      }
    },
    methods: {
      goPage (url, k) {
        if (k !== 3) {
          this.$router.push({path: url})
        } else {
          Toast({
            message: '即将开放，敬请期待',
            position: 'middle',
            duration: 3000
          })
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_page{
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
