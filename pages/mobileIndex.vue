<template>
  <div class="home">
    <div class="fullpage-wp" v-fullpage="opts">
      <div class="page-1 page-common">
        <img class="logo" src="../assets/images/mobile/index/logo.png"/>
        <p class="main-slogen">算力驱动未来&nbsp;&nbsp;&nbsp;信任链接天下</p>
        <p class="title">全球算力产业综合服务平台</p>
        <div class="main">
          <div class="page-number">
            <hr/>
            <p class="number">
              <i class="current-page">01</i>
              <i class="slash">/</i>
              <i class="total-page">03</i>
            </p>
          </div>
          <img class="gif" src="../assets/images/mobile/index/1.gif"/>
        </div>
        <div class="article">
          <p class="content slogen">算力是未来可计量的生产力</p>
        </div>
        <div class="footer">
          <a class="button" @click="jump(3)">跳过</a>
          <p class="introduce">Clould mining<i>|</i>Miner<i>|</i>Escrow</p>
        </div>
      </div>
      <div class="page-2 page-common">
        <img class="logo" src="~/assets/images/mobile/index/logo.png"/>
        <div class="main">
          <div class="page-number">
            <hr>
            <span class="number">
              <i class="current-page">02</i>
              <i class="slash">/</i>
              <i class="total-page">03</i>
            </span>
          </div>
          <img class="gif" src="~/assets/images/mobile/index/2.gif"/>
        </div>
        <div class="article">
          <div class="item" v-for="item in page2Text">
            <p>
              <span class="title">{{item.title}}&nbsp;&nbsp;</span>
              <span class="content">{{item.content}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="page-3 page-common">
        <img class="logo" src="../assets/images/mobile/index/logo.png"/>
        <div class="main">
          <div class="page-number">
            <hr>
            <span class="number">
              <i class="current-page">03</i>
              <i class="slash">/</i>
              <i class="total-page">03</i>
            </span>
          </div>
          <img class="gif" src="../assets/images/mobile/index/3.gif"/>
        </div>
        <div class="article">
          <div class="item" v-for="item in page3Text">
            <p class="title">{{item}}</p>
          </div>
          <p class="title">算力网&nbsp;suanLi.com&nbsp;&nbsp;&nbsp;每秒都为你产生利润</p>
        </div>
        <div class="footer">
          <a class="button" @click="jump(3)">体验数字货币带来的乐趣</a>
          <p class="introduce">Clould mining<i>|</i>Miner<i>|</i>Escrow</p>
        </div>
      </div>
      <div class="page-4 page-common">
        <!-- <header>
          <span> </span>
          <div class="login" v-if="token === 0">
            <a @click="goToPage('/auth/regist', 3)">注册</a>
            <span>|</span>
            <a @click="goToPage('/auth/login', 3)">登录</a>
          </div>
          <div class="login" v-else>
            <a @click="goToPage('/mobile/personcenter', 3)">个人中心</a>
          </div>
        </header>
        <div class="swiper" @click="goToPage('/minerShop/activity', 3)">
          <img src="../assets/images/swiper/mobile4.jpg"/>
        </div> -->
        <header>
          <img class="logo" src="../assets/images/mobile/index/logo.png" />
          <div class="login" v-if="token === 0">
            <a @click="goToPage('/auth/regist', 3)">注册</a>
            <span>|</span>
            <a @click="goToPage('/auth/login', 3)">登录</a>
          </div>
          <div class="login" v-else>
            <a @click="goToPage('/mobile/personcenter', 3)">个人中心</a>
          </div>
        </header>
        <div class="introduce">
          <p class="title">我们为您提供丰富可靠的算力服务。</p>
          <p class="content">整合全球算力产业链资源</p>
          <p class="content">基于算力平台对外进行输出各类算力服务</p>
        </div>
        <div class="link-list">
          <div v-for="item,k in page4Text" class="item" @click="goToPage(item.link, 3)" :key="k">
            <div class="word">
              <p class="title">{{item.title}}</p>
              <p class="sub">{{item.sub}}</p>
            </div>
            <i class="arrow"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      opts: {
        start: 0,
        dir: 'v',
        loop: false,
        duration: 300,
        der: 0.04,
        beforeChange: (prev, next) => {
        },
        afterChange: (prev, next) => {
        }
      },
      page2Text: [
        {title: '云算力', content: '我们一站式帮你购买品牌矿机，对接合规BDC托管服务，配置专人全天维护，快速部署，算力稳定收益透明，让你真正实现无忧挖矿。'},
        {title: '矿机销售', content: '聚合全球顶级厂商新货、二手矿机及配件资源，精心筛选质量保证，线上交易全流程存证，安全有保障。'},
        {title: 'BDC托管', content: '提供标准化的BDC机房，专业的矿机托管服务，专业运维工程师7*24小时维护，电力合规价格低廉。'}
      ],
      page3Text: ['用电合规电力稳定', '专业团队安全可靠', '信息透明收益透明', '全程存证合法有效'],
      page4Text: [
        {title: '云算力', sub: 'CLOUD MINING', link: '/minerShop/miner/2'},
        {title: '品牌矿机', sub: 'MINER', link: '/minerShop/miner/1'},
        {title: 'BDC托管', sub: 'BDC ESCROW', link: '/bdc'}
      ]
    }
  },
  mounted () {
    let page = sessionStorage.getItem('mobileIndex')
    if (page) {
      this.jump(page)
    }
  },
  methods: {
    jump (number) {
      if (number > 0) {
        this.opts = Object.assign({}, this.opts, {start: number})
      }
    },
    goToPage (url, page) {
      sessionStorage.setItem('mobileIndex', page);
      this.$router.push({path: url})
    }
  },
  computed: {
    ...mapState({
      token: state => state.info.token
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.home {
  width: 100%;
  height: 100vh;
  background: #243461;

  .page-common {
    width: 100% !important;
    height: 100vh !important;
    padding-top: 0.34rem;
    .logo {
      margin-left: 0.42rem;
      width: 2.38rem;
      display: block;
    }
    .main {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      margin-top: 0.6rem;

      .page-number {
        position: absolute;
        left: -98px;
        top: 5rem;
        transform: rotate(90deg);
        display: flex;
        align-items: center;
        justify-content: center;
        hr {
          width: 128px;
          margin-right: 0.5rem;
          border: solid 1px #7888a5;
          border-width: 0 0 1px;
        }
        .number {
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-style: normal;
            font-size: 0.26rem;
          }
          .slash {
            margin: 0 15px;
            color: #fff;
          }
          .current-page {
            color: #7888a5;
          }
          .total-page {
            color: #fff;
          }
        }
      }

      .gif {
        width: 43.7%;
        margin: 0 auto;
      }
    }

    .footer {
      position: absolute;
      bottom: 0.72rem;
      right: 0.6rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .button {
        padding: 0.12rem 0.54rem;
        margin-bottom: 0.36rem;
        color: #608ad8;
        font-size: 0.3rem;
        border: solid 0.02rem #608ad8;
        border-radius: 0.4rem;
      }
      .introduce {
        color: #fff;
        font-weight: normal;
        font-size: 0.2rem;
        i {
          font-style: normal;
          margin: 0 0.1rem;
          color: #999;
        }
      }
    }
  }
  .page-1 {
    .logo {
      margin: 0 auto;
    }
    .main-slogen {
      font-size: 0.26rem;
      color: #fff;
      margin: 0.8rem auto 0;
      text-align: center;
      letter-spacing: 0.02rem;
    }
    .title {
      font-size: 0.36rem;
      font-weight: bold;
      color: #fff;
      margin: 0 auto;
      text-align: center;
      letter-spacing: 0.06rem;
      padding: 0.24rem 0;
    }
    .main {
      margin-top: 8vh;
    }
    .article {
      margin-top: 1.08rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .slogen {
        letter-spacing: 0.02rem;
        margin-bottom: 0.3rem;
        color: #b0ccff;
        font-size: 0.3rem;
      }
    }
  }
  .page-2 {
    .main {
      margin-top: 0;
      .gif {
        width: 100%;
      }
    }
    .article {
      margin-top: 0;
      padding: 0 0.4rem 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .item {
        margin-bottom: 0.3rem;
        .title {
          font-size: 0.3rem;
          color: #b0ccff;
          font-weight: bold;
        }
        .content {
          font-size: 0.26rem;
          line-height: 0.4rem;
          color: #b0ccff;
        }
      }
    }
  }
  .page-3 {
    .main {
      margin-top: 0;
      .gif {
        width: 66%;
      }
    }
    .article {
      margin-top: 0;
      padding: 0 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        font-size: 0.3rem;
        color: #b0ccff;
        margin-bottom: 0.18rem;
      }
    }

    .footer {
      width: 80%;
      display: flex;
      align-items: center;
      right: 10%;

      .button {
        width: 80%;
        padding: 0.12rem 0.54rem;
        margin-bottom: 0.36rem;
        color: #fff;
        font-size: 0.32rem;
        font-weight: bold;
        text-align: center;
        background: #01beb5;
        border: solid 0.02rem #01beb5;
        border-radius: 0.3rem;
      }
    }
  }
  .page-4 {
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 10;
      .login {
        width: auto;
        color: #fff;
        margin-right: 0.42rem;
        a {
          color: #fff;
          font-size: 0.3rem;
        }
        span {
          margin: 0 5px;
        }
      }
    }
    .introduce {
      display: flex;
      flex-direction: column;
      padding-left: 0.3rem;
      margin: 0.8rem 0 0 0.44rem;
      border-left: solid 0.08rem #1fbfa7;

      .title {
        font-size: 0.34rem;
        color: #fff;
        margin-bottom: 0.42rem;
      }
      .content {
        font-size: 0.24rem;
        color: #a9adbb;

        :nth-child(1) {
          margin-bottom: 0.1rem;
        }
      }
    }
    .swiper {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    .link-list {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      .item {
        width: 100%;
        height: 22.5vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .word {
          width: 3.4rem;
          position: relative;
          left: 2rem;
          .title {
            font-size: 0.34rem;
            color: #fff;
            margin-bottom: 0.2rem;
          }
          .sub {
            font-size: 0.24rem;
            color: rgba(255,255,255,0.5);
          }
        }
        .arrow {
          position: absolute;
          right: 0.34rem;
          width: 0.24rem;
          height: 0.24rem;
          transform: rotate(45deg);
          border: solid 1px #fff;
          border-width: 1px 1px 0 0;
        }
        &:nth-child(1) {
          background: url('~/assets/images/mobile/index/cloud.png') no-repeat;
          background-size: cover;
        }
        &:nth-child(2) {
          background: url('~/assets/images/mobile/index/miner.png') no-repeat;
          background-size: cover;
        }
        &:nth-child(3) {
          background: url('~/assets/images/mobile/index/bdc.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
}

</style>
