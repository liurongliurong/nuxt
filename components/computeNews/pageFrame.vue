<template>
  <div class="compute_news" v-if="!isMobile">
    <div class="compute_news_nav">
      <div class="compute_news_box">
        <router-link :to="n.path" v-for="n, k in computationallist" :class="{'active': k === 1}" :key="k">{{n.title}}</router-link>
      </div>
    </div>
    <div class="computational_content">
      <div class="currency_header">suanLi&nbsp;之家 <span>全面聚合算力产业信息</span></div>
      <div class="currency_content">
        <div class="leftnav">
          <div :class="['leftnav_ol', {'active': active === k}]" v-for="n, k in leftnav" :key="k">
            <router-link :to="n.path">
              <span :class="['icon', 'iconfont', n.big]"></span>
              <i>{{n.title}}</i>
            </router-link>
          </div>
        </div>
        <router-view class="currency_right" v-if="!isComponent"></router-view>
        <slot class="currency_right" v-else></slot>
      </div>
    </div>
  </div>
  <div class="mobile_computehome" v-else>
    <div class="mobile_navcompute">
      <router-link :to="n.path" v-for="n, k in navcompute" :key="k">
        <em>{{n.title}}</em>
        <span>|</span>
      </router-link>
    </div>
    <slot class="currency_right" v-if="isComponent"></slot>
    <router-view class="currency_right" v-else></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      isComponent: {
        type: String
      }
    },
    data () {
      return {
        active: '',
        computationallist: [{title: '算力资讯', path: '/industryInformation'}, {title: '设备之家', path: '/equipments/list'}, {title: '交易信息', path: '/transaction'}, {title: '挖矿币种', path: '/currency'}],
        leftnav: [{big: 'icon-zixun', title: '资讯', path: '/computeNews/list'}, {big: 'icon-zixun1', title: '快报', path: '/quickNews'}, {big: 'icon-zhizaohangye', title: '厂商', path: '/manufacturer/list'}, {big: 'icon-kuangji', title: '测评', path: '/equipmentEvaluate/list'}, {big: 'icon-bowuguan', title: '博物馆', path: '/equipments/list'}, {big: 'icon-bitebi', title: '历史曲线', path: '/computeChart'}],
        navcompute: [{title: '快讯', path: '/quickNews'}, {title: '资讯', path: '/computeNews/list'}, {title: '测评', path: '/equipmentEvaluate/list'}, {title: '币种', path: '/digitalCurrency/list'}, {title: '厂商', path: '/manufacturer/list'}]
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style lang="scss" scoped>
  .compute_news{
    background: #eceff8;
    width: 100%;
    overflow: hidden;
    .compute_news_nav{
      width: 100%;
      height: 50px;
      background: white;
            border-top: 1px solid #e5e5e5;
      .compute_news_box{
        width: 1180px;
        margin:0 auto;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        a{
          display:inline-block;
          width: 64px;
          height: 50px;
          box-sizing: border-box;
          text-align: center;
          margin-right: 34px;
          color: #666666;
          font-size: 14px;
          border-top: 2px solid white;
          &:hover{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
                    &.active{
                        color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
                    }
          &.router-link-active{
            color:#327fff;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px solid #327fff;
          }
        }
      }
    }
    .computational_content{
      width: 100%;
        padding-bottom: 50px;
        background: #303849;
        .currency_header{
          width: 1180px;
          height: 84px;
          line-height: 84px;
          margin:0 auto;
          font-size: 29px;
          color: white;
          font-weight: 800;
          span{
            font-size: 15px;
            color: #999999;
            font-weight: 100;
            margin-left: 20px;
          }
        }
        .currency_content{
          width: 1180px;
          margin:0 auto;
          overflow: hidden;
        display: flex;
          .leftnav{
                width: 70px;
                background: #1c202a;
                float: left;
                .leftnav_ol{
                  width: 100%;
                  height: 68px;
                  text-align: center;
                  box-sizing: border-box;
                        a{
                            display: block;
                            padding-top: 10px;
                            width: 100%;
                            height: 100%;
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
                  &:hover{
                    background: #327fff;
                    span{
                      color:white;
                    }
                    i{
                      color:white;
                    }
                  }
                        &.active{
                    background: #327fff;
                    span{
                      color:white;
                    }
                    i{
                      color:white;
                    }
                  }
                        .router-link-active{
                            background: #327fff;
                    span{
                      color:white;
                    }
                    i{
                      color:white;
                    }
                        }
                }
              }
          .currency_right{
            float: left;
            width: 1110px;
            background: white;
            padding:32px 62px 0 62px;
            box-sizing: border-box;
          }
        }
    }
  }
  .mobile_computehome{
    width: 100%;
    height: 100%;
    .mobile_navcompute{
      width: 100%;
      height: 2rem;
      background: white;
      display: flex;
      justify-content: space-between;
      border-bottom:1px solid #bfbfbf;
      box-sizing: border-box;
      :last-child span{
        display:none;
      }
      a{
        width: 20%;
        height: 2rem;
        display:inline-block;
        line-height: 2rem;
        text-align: center;
        span{
            float: right;
            font-size: 0.6rem;
            color:#1b1b1b;
        }
        em{
            font-style:normal;
            font-size: 0.6rem;
            color:#1b1b1b;
        }
        &:hover{
            em{
                display:inline-block;
                border-bottom:2px solid #fe5039;
                box-sizing: border-box;
                width: 1.9rem;
                height: 1.95rem;
                color:#fe5039;
            }
        }
        &.active{
            em{
                display:inline-block;
                border-bottom:2px solid #fe5039;
                box-sizing: border-box;
                width: 1.9rem;
                height: 1.95rem;
                color:#fe5039;
          }
        }
        &.router-link-active{
            em{
                display:inline-block;
                border-bottom:2px solid #fe5039;
                box-sizing: border-box;
                width: 1.9rem;
                height: 1.95rem;
                color:#fe5039;
          }
        }
      }
    }
  }
</style>