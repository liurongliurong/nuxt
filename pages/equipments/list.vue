<template>
  <div class="compute_news">
    <div class="compute_news_nav">
      <div class="compute_news_box">
        <router-link :to="n.path" v-for="n, k in computationallist" :class="{'active': k === 1}" :key="k">{{n.title}}</router-link>
      </div>
    </div>
    <div class="computational_content">
      <div class="currency_header">suanLi&nbsp;之家 <span>全面聚合算力产业信息</span></div>
      <div class="currency_content">
        <div class="leftnav">
          <div :class="['leftnav_ol', {'active': k === 4}]" v-for="n, k in leftnav" :key="k">
            <router-link :to="n.path">
              <span :class="['icon', 'iconfont', n.big]"></span>
              <i>{{n.title}}</i>
            </router-link>
          </div>
        </div>
        <div class="currency_right">
          <div class="museum_right" style="padding:0 !important;">
            <h1 style="position:relative;">矿机博物馆<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
            <div class="museum_lists" v-for="n, k in museum" :key="k">
              <img :src="n.image"/>
              <div class="museum_content">
                <h6>{{n.title}}</h6>
                <p>{{n.resume}}</p>
                <div @click="goDetail(n.id)" class="button" style="margin-top:0 !important;">查看详情</div>
              </div>
            </div>
            <Pager :len="len"  style="padding-top:0;"></Pager>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        active: '',
        len: 0,
        now: 1,
        museum: [],
        computationallist: [{title: '算力资讯', path: '/industryInformation'}, {title: '设备之家', path: '/equipments/list'}, {title: '交易信息', path: '/transaction'}, {title: '挖矿币种', path: '/currency'}],
        leftnav: [{big: 'icon-zixun', title: '资讯', path: '/computeNews/list'}, {big: 'icon-zixun1', title: '快报', path: '/quickNews'}, {big: 'icon-zhizaohangye', title: '厂商', path: '/manufacturer/list'}, {big: 'icon-kuangji', title: '测评', path: '/equipmentEvaluate/list'}, {big: 'icon-bowuguan', title: '博物馆', path: '/equipments/list'}, {big: 'icon-bitebi', title: '历史曲线', path: '/computeChart'}],
      }
    },
    head () {
      return {
        title: '比特币矿机-设备博物馆-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币矿机,矿机设备,矿机历史' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）历代矿机展示，介绍最早矿机公司生产出的比特币矿机，如蝴蝶矿机，蚂蚁矿机，阿瓦隆矿机，烤猫矿机等' }
        ]
      }
    },
    methods: {
      getList () {
        var self = this
        util.post('NewsMuseumList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.museum = res.list
            if (self.now > 1) return false
            self.len = Math.ceil(res.total / 5)
          })
        }).catch(res => {
          console.log(res)
        })
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/equipments/detail/'})
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>

<style lang="scss">
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
              .museum_right{
    float: left;
    width: 1002px;;
    background: white;
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
      width: 100%;
      height: 172px;
      background: white;
      box-shadow: 0 0 10px #c2c2c2;
      margin-top: 20px;
      border-radius: 8px;
      img{
        width:132px;
        margin-top: 40px;
        height: 100px;
        float: left;
        object-fit: cover;
        margin-left: 48px;
      }
      .museum_content{
        width: 79%;
        float: left;
        padding-left: 58px;
        padding-top: 34px;
        h6{
          color: #333333;
          font-size: 22px;
          margin-bottom: 12px;
        }
        p{
          line-height: 22px;
          color: #666666;
          height: 42px;
          overflow: hidden;
          padding-right: 45px;
        }
        .button{
          width: 172px;
          height: 38px;
          border:1px solid #bfbfbf;
          background:white;
          color: #a9a9a9;
          float: right;
          margin-right: 37px;
          border-radius: 5px;
          line-height: 38px;
          text-align: center;
          cursor: pointer;
          &:hover{
            background:#fe5039;
            color: white;
            border:0;
          }
        }
      }
    }
  }
          }
        }
    }
  }
</style>