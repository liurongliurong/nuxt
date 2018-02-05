<template>
  <article>
    <div class="home" v-if="isMobile===0">
      <Swiper :data="banners" :autoPlay="5000"></Swiper>
      <div class="home_text">
        <div class="main">
          <div class="list">
            <div class="item" v-for="k in 4">
              <img :src="require('@/assets/images/home/feature'+k+'.png')"/>
            </div>
          </div>
        </div>
      </div>
      <MyDataList></MyDataList>
      <WebInfo></WebInfo>
      <div class="home_title">
        <div class="main">
          <h1>算力驱动未来，信任链接天下</h1>
          <p>全球算力产业链资源整合，基于区块链的分布式算力输出平台</p>
          <div class="list">
            <div class="item" v-for="s,k in suanLi">
              <div class="blurborder">
                <span></span>
              </div>
              <div class="item_title">{{s.title}}</div>
              <div class="item_desc">{{s.desc}}</div>
              <div class="item_desc">{{s.bardesc}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="my_map">
        <div class="main">
          <h1 class="home_item_title">持续扩张的数据中心让跨域体验更流畅</h1>
          <p class="home_item_desc">全面拓展国际、国内区块链云计算市场，担当行业领头羊角色。胸有成“数”，自当志在四方。</p>
          <div class="home_map_data">
            <div class="item" v-for="m,k in mapData">
              <span class="item_name">{{m.title}}</span>
              <span class="item_value">{{computeData[m.name] +' '+m.unit}}</span>
            </div>
          </div>
          <DataMap class="data_chart"></DataMap>
        </div>
      </div>
      <div class="partner">
        <div class="box">
          <h3>携手共赢， 与全球合作伙伴共建算力生态</h3>
          <p>精诚合作共享资源， 凝心聚力协调发展， 共筑算力产业</p>
          <div class="list">
              <a :href="k.route" class="item" target="_blank" v-for="k, i in link" style="display:block;" :key="i">
                <div :class="'img img'+(i+1)"></div>
                <div :class="'img_hover img_hover'+(i+1)"></div>
              </a>
          </div>
        </div>
      </div>
      <div class="wq">
        <img :src="require('@/assets/images/home/suanli_bottom_bg.jpg')" alt="" class="pre">
        <div class="text">
          <img src="~assets/images/server.png" style="width:800px;display:block;margin:0 auto;"/>
          <router-link to="/minerShop/list">即刻体验</router-link>
        </div>
      </div>
      <SideBar></SideBar>
    </div>
  </article>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import MyDataList from '@/components/home/DataList'
  import Swiper from '@/components/common/Swipe'
  import WebInfo from '@/components/home/WebInfo'
  import SideBar from '@/components/home/SideBar'
  import DataMap from '@/components/home/DataMap'
  import { mapState } from 'vuex'
  export default {
    components: {
      Swiper, MyDataList, WebInfo, SideBar, DataMap
    },
    head () {
      return {
        script:[
          {
            type: 'text/javascript',
            src: 'http://js.users.51.la/19391187.js'
          }
        ]
      }
    },
    data () {
      return {
        link: [{route: 'http://www.tsinghua-zj.edu.cn/'}, {route: 'http://www.gosun.com/'}, {route: 'http://www.enjoyor.cc/'}, {route: 'https://canaan.io/'}, {route: 'http://www.ebang.com.cn/'}, {route: 'https://www.suanlibao.com/'}],
        suanLi: [{title: 'SHA256比特币算力', desc: 'Bitcoin数字货币算力', bardesc: ''}, {title: '卷积神经算法算力', desc: '为CNN卷积神经', bardesc: '网络提供分布式加速服务'}, {title: 'EquiHash零币算力', desc: 'ZeroCASH提供隐私保护', bardesc: '及零知识证明的基础算力'}, {title: '智能合约算力', desc: '全球贸易智能合约', bardesc: '服务的分布式基础算力'}, {title: 'Curecoin算力', desc: '蛋白质折叠计算，', bardesc: '生化反应模型，用于发现新药'}, {title: '游戏币兑换算力', desc: '全球游戏产业', bardesc: '虚拟货币通用兑换算力'}, {title: 'Ethash以太算力', desc: '以太坊网络', bardesc: 'ETC，ETH算力'}, {title: '公证算力', desc: '提供区块链公证服务', bardesc: '存证保全的基础算力'}],
        mapData: [{title: '全网算力', name: 'hashrate', unit: 'PH/s'}, {title: '全网困难度', name: 'difficulty', unit: 'T'}],
        computeData: {},
        computeRealData: {},
        timer: 0,
        banners: [{img: require('@/assets/images/swiper/3_1.jpg'), link: '/minerShop/activity', text: '查看详情', pos: 'center'}, {img: require('@/assets/images/swiper/2_1.jpg'), link: '/minerShop/list', text: '开启收益之旅'}, {img: require('@/assets/images/swiper/1_1.jpg'), link: '/bdc', text: '前往申请机位', pos: 'center'}]
      }
    },
    methods: {
      goMobile () {
        if (api.checkEquipment()) {
          this.$store.commit('SET_EQUIPMENT', 1)
          this.$router.replace({path: '/mobileIndex'})
        } else {
          this.$store.commit('SET_EQUIPMENT', 0)
        }
      },
      getComputeData () {
        util.post('showDifficulty', {token: 0}).then((res) => {
          this.computeData = res.msg
          this.computeRealData = {hashrate:res.msg.hashrate, difficulty: res.msg.difficulty}
          this.numberAnimate()
        })
      },
      randomNumber (number) {
        number = number.split('').map((v) => {
          if (v !== ',') {
            return Math.floor(Math.random() * 9)
          } else {
            return v
          }
        })
        return number.join('')
      },
      numberAnimate () {
        setTimeout(() => {
          this.timer++
          if (this.timer <= 20) {
            this.computeData.hashrate = this.randomNumber(this.computeData.hashrate)
            this.computeData.difficulty = this.randomNumber(this.computeData.difficulty)
            this.numberAnimate()
          } else {
            this.timer = 0
            this.computeData.hashrate = this.computeRealData.hashrate
            this.computeData.difficulty = this.computeRealData.difficulty
            setTimeout(() => {
              this.numberAnimate()
            }, 10000)
          }
        }, 50)
      }
    },
    mounted () {
      if (api.checkEquipment()) {
        this.$router.replace({path: '/mobileIndex'})
        return false
      }
      if (this.callUrl === 'index') {
        api.tips('欢迎来到算力网！')
        this.$store.commit('SET_URL', '')
      }
      window.addEventListener('resize', this.goMobile, false)
      this.getComputeData()
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        callUrl: state => state.callUrl
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
          @include bg(1920, 420px)
          a.btn{
            position: absolute;
            width:200px;
            height:50px;
            line-height: 50px;
            text-align: center;
            left:calc(50% - 590px);
            top:250px;
            color:#1e396c;
            border:1px solid #fff;
            border-radius:5px;
            font-size: 18px;
            background: #fff;
            z-index: 10;
          }
          &:nth-child(2) a.btn,&:nth-child(3) a.btn{
            .swiper_arrow{
              margin-right:5px;
            }
            .swiper_arrow:before{
              content:'';
              @include triangle
            }
            .swiper_arrow:after{
              content:'';
              @include triangle
              border-left-width:8px;
              border-top-width:5px;
              border-bottom-width:5px;
            }
          }
          &:nth-child(1){
            background: linear-gradient(to bottom, #951E24 10%, #AC1F25);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#951E24', endColorstr='#AC1F25',GradientType=0 );
            a.btn{
              color:#CD141C;
              left:calc(50% - 100px);
              top:290px;
            }
          }
          &:nth-child(2){
            background: linear-gradient(to right, #1077F0 10%, #00E0D8);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1077F0', endColorstr='#00E0D8',GradientType=1 );
            a.btn{
              color:#7EAFFC;
              .swiper_arrow:before{
                border-left-color:#015FFF
              }
              .swiper_arrow:after{
                border-left-color:#7EAFFC
              }
            }
          }
          &:nth-child(3){
            background: linear-gradient(to right, #FE5337 10%, #FF9D02);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FE5337', endColorstr='#FF9D02',GradientType=1 );
            a.btn{
              color:#FC5137;
              .swiper_arrow:before{
                border-left-color:#FC5137
              }
              .swiper_arrow:after{
                border-left-color:#FF9F02
              }
            }
          }
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
        margin: 30px auto;
        h1,p{
          text-align: center;
          color: #002059;
        }
        h1{
          font-size: 28px;
          line-height: 1.8;
        }
        p{
          font-size: 18px
        }
        .list{
          @include row(5,0)
          margin-top:30px;
          .item{
            text-align: center;
            width: 25%;
            height:229px;
            .item_title{
              font-size: 18px;
              margin-bottom:10px
            }
            .blurborder{
              border:3px solid #327fff;
              width: 75px;
              height: 75px;
              box-sizing: border-box;
              margin:0 auto;
              margin-top:32px;
              margin-bottom: 20px;
              span{
                margin:0 auto;
                margin-top: 16px;
                width: 36px;
                height: 36px;
                display:block;
              }
            }
            .item_desc{
              color:$light_black;
            }
            &:hover{
              box-shadow: 0 0 10px #d2d4db;
              .item_title{
                color: #327fff;
              }
            }
          }
          :nth-child(1) .blurborder span{
            background: url('~assets/images/home.png') no-repeat -66px -71px;
          }
          :nth-child(2) .blurborder span{
            width: 42px; height: 41px;
            background: url('~assets/images/home.png') no-repeat -10px -10px;
          }
          :nth-child(3) .blurborder span{
            background: url('~assets/images/home.png') no-repeat -130px -10px;
          }
          :nth-child(4) .blurborder span{
            background: url('~assets/images/home.png') no-repeat -130px -66px;
          }
          :nth-child(5) .blurborder span{
            width: 38px; height: 38px;
            background: url('~assets/images/home.png') no-repeat -72px -10px;
          }
          :nth-child(6) .blurborder span{
            background: url('~assets/images/home.png') no-repeat -10px -129px;
          }
          :nth-child(7) .blurborder span{
            background: url('~assets/images/home.png') no-repeat -66px -129px;
          }
          :nth-child(8) .blurborder span{
            width: 36px; height: 38px;
            background: url('~assets/images/home.png') no-repeat -10px -71px;
          }
        }
      }
    }
    .home_text{
      background: #f6f7fb;
      .main{
        @include main
        line-height: 2;
        .list{
          display: flex;
          justify-content: space-between;
          .item{
            position: relative;
            width: 280px;
            border-radius: 10px;
            margin-top: 20px;
            img{
              width: 100%;
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
        @include main
        margin-top:85px;
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
          border-radius:5px;
          width: 147px;
          height: 37px;
          border:1px solid white;
          color: white;
          margin-top:30px;
          line-height: 37px;
          // &:hover{
          //   border:1px solid #166cfb;
          // }
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
      margin-top: 48px;
      .box{
        @include main
        text-align: center;
        margin-bottom:60px;
        h3{
          font-size: 28px;
          margin-bottom:10px;
          color:#002059;
        }
        p{
          font-size: 17px;
          margin-bottom:43px;
          color:#002059;
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
            .img3,.img_hover3{
              height: 49px;
              width: 150px;
            }
            .img1,.img_hover1{
              width: 150px; height: 32px;
            }
            .img3{
              background: url('~assets/images/partner.png') -180px -216px;
            }
            .img_hover3{
              background: url('~assets/images/partner.png') -10px -216px;
            }
            .img4,.img_hover4{
              height: 49px;
              width: 150px;
            }
            .img4{
              background: url('~assets/images/partner.png') -210px -10px;
            }
            .img_hover4{
              background: url('~assets/images/partner.png') -210px -79px;
            }
            .img2,.img_hover2{
              height: 46px;
              width: 150px;
            }
            .img2{
              background: url('~assets/images/partner.png') -10px -150px;
            }
            .img_hover2{
              background: url('~assets/images/partner.png') -180px -150px;
            }

            .img1{
              background: url('~assets/images/partner.png') -180px -281px;
            }
            .img_hover1{
              background: url('~assets/images/partner.png') -10px -281px;
            }
            .img6,.img_hover6{
              width: 180px; height: 50px;
            }
            .img6{
              background: url('~assets/images/partner.png') -10px -80px;
            }
            .img_hover6{
              background: url('~assets/images/partner.png') -10px -10px;
            }
            .img5,.img_hover5{
              height: 20px;
              width: 150px;
            }
            .img5{
              background: url('~assets/images/partner.png') -10px -333px;
            }
            .img_hover5{
              background: url('~assets/images/partner.png') -180px -333px;
            }
          }
        }
      }
    }
  }
</style>
