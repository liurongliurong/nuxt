<template>
  <div class="page_frame" v-if="isMobile===0">
    <info-nav></info-nav>
    <div class="frame_body">
      <div class="frame_header">suanLi&nbsp;之家 <span>全面聚合算力产业信息</span></div>
      <div class="frame_content">
        <div class="left_nav">
          <div class="item" v-for="n, k in leftnav" :key="k">
            <router-link :to="n.path">
              <span :class="['icon', 'iconfont', n.big]"></span>
              <i>{{n.title}}</i>
            </router-link>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
  <div class="mobile_frame" v-else-if="isMobile===1">
    <div class="mobile_nav">
      <router-link :to="n.path" v-for="n, k in navcompute" :key="k">
        <em>{{n.title}}</em>
        <span>|</span>
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import InfoNav from '@/components/common/InfoNav'
  export default {
    components: {
      InfoNav
    },
    data () {
      return {
        active: '',
        leftnav: [{big: 'icon-zixun', title: '资讯', path: '/computeNews/list'}, {big: 'icon-zixun1', title: '快报', path: '/quickNews'}, {big: 'icon-zhizaohangye', title: '厂商', path: '/manufacturer/list'}, {big: 'icon-kuangji', title: '测评', path: '/equipmentEvaluate/list'}, {big: 'icon-bowuguan', title: '博物馆', path: '/equipments/list'}, {big: 'icon-bitebi', title: '历史曲线', path: '/computeChart'}],
        navcompute: [{title: '快讯', path: '/quickNews'}, {title: '资讯', path: '/computeNews/list'}, {title: '测评', path: '/equipmentEvaluate/list'}, {title: '币种', path: '/currency/list'}, {title: '厂商', path: '/manufacturer/list'}]
      }
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
  .page_frame{
    background: #eceff8;
    .frame_body{
      padding-bottom: 50px;
      background: #303849;
      .frame_header{
        @include main
        height: 84px;
        line-height: 84px;
        font-size: 29px;
        color: #fff;
        font-weight: 800;
        span{
          font-size: 15px;
          color: #999999;
          font-weight: 100;
          margin-left: 20px;
        }
      }
      .frame_content{
        @include main
        @include flex(flex-start,flex-start)
        .left_nav{
          width: 70px;
          background: #1c202a;
          .item{
            height: 68px;
            text-align: center;
            a{
              display: block;
              padding-top: 10px;
              width: 100%;
              height: 100%;
              &:hover,&.active,&.nuxt-link-active{
                background: #327fff;
                span,i{
                  color:#fff;
                }
              }
            }
            span{
              font-size:22px;
              height: 22px;
              margin-bottom: 9px;
              color:#999999;
              display:block;
            }
            i{
              font-size: 12px;
              color:#999;
            }
          }
        }
        .right_content{
          width: calc(100% - 70px);
          background: #fff;
          padding:32px 62px;
          min-height:900px;
          h1{
            position:relative;
            color: #121212;
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 10px;
            span{
              font-size: 20px;
              margin-left: 13px;
              transform:rotate(90deg);
              position:absolute;
              top:3px;
            }
          }
          .pager {
            padding-top:0;
          }
        }
      }
    }
  }
  .mobile_frame{
    width: 100%;
    height: 100%;
    .mobile_nav{
      border-bottom:1px solid #bfbfbf;
      :last-child span{
        display:none;
      }
      a{
        width: 20%;
        height: 0.89rem;
        display:inline-block;
        line-height: 0.89rem;
        text-align: center;
        span{
          float: right;
          font-size: 0.28rem;
          color:#1b1b1b;
        }
        em{
          font-style:normal;
          font-size: 0.28rem;
          color:#1b1b1b;
        }
        &:hover,&.active,&.nuxt-link-active{
          em{
            display:inline-block;
            border-bottom:2px solid #fe5039;
            width: 1.14rem;
            height: 0.89rem;
            color:#fe5039;
          }
        }
      }
    }
  }
</style>