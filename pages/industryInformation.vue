<template>
  <div class="cominfor">
    <info-nav></info-nav>
    <div class="cominfor_header">
      <div class="cominfor_headercon">
        <div class="cominfo_headerleft">
          <router-link to="/computeNews/list" class="red">
            <h1>算力资讯</h1>
            <p>随时获取最新行业讯息</p>
          </router-link>
          <div class="olbottom">
            <div v-for="n, k in headerlist" class="ollist" :key="k">
              <router-link :to="n.link" class="oltitle">{{n.title}}</router-link>
              <div class="rou">
                <router-link :to="d.path" v-for="d, m in n.route" :key="m">{{d.name}}</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="cominfo_headerright">
           <div class="bigtop">
            <div class="bigimg">
              <img :src="n.image" v-for="n, k in bigimglist" class="teimg"/>
            </div>
          </div> 
           <div class="bigbottom">
            <div class="numbig" v-for="n, m in miners" :key="m">
              <img :src="n.big"/>
              <h4>{{n.title}}</h4>
              <router-link :to="n.path">{{n.route}}</router-link>
            </div>
          </div> 
        </div>
      </div>
    </div>
    <div class="cominfor_news">
      <router-link to="/quickNews">
        <img :src="require('@/assets/images/information7.png')"/>
      </router-link>
      <div class="scroll">
        <router-link to="/computeChart">【全网算力】<b>{{qwsl.hashrate}} PH/s</b>&nbsp;&nbsp;&nbsp;&nbsp;【全网困难度】<b>{{qwsl.difficulty}} T</b></router-link>
        <router-link :to="'/quickNews'" v-for="s, m in scroll" :key="m"> /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="icon iconfont icon-new1"></span> {{s.title}}</router-link>
      </div>
    </div>
    <div class="cominfor_info">
      <h4>
        <p class="title">交易信息</p>
        <p class="text">提供实时二手平台信息</p>
        <router-link to="/transaction">了解更多 ></router-link>
      </h4>
      <div class="cominfor_infoleft">
        <router-link to="/transaction">
          <p v-for="n,k in infoleft" class="infoleft_p">
            <span class="status">【出售】</span>
            <span class="title">{{n.title}}</span>
            <span class="time">{{n.created_time}}</span>
          </p>
        </router-link>
      </div>
      <div class="cominfor_inforight">
        <router-link to="/transaction">
          <p v-for="n,k in inforight" class="inforight_p">
            <span class="status">【求购】</span>
            <span class="title">{{n.title}}</span>
            <span class="time">{{n.created_time}}</span>
          </p>
        </router-link>
      </div>
    </div>
    <div class="cominfor_she">
      <h4>
        <p class="title">设备之家</p>
        <p class="text">为您提供更全面的设备信息</p>
        <router-link to="/equipments/list">了解更多 ></router-link>
      </h4>
      <div class="cominfor_shebottom">
        <div class="shebottomleft">
          <h6>【主流厂商】</h6>
          <div style="height:313px;">
              <div class="she_ol" style="padding-top:1px;">
                <div  @click="goDetail(n.id, 3)" class="border" v-for="n, k in sheol1" :key="k"><span></span>{{n.title}}</div>
              </div>
          </div>
          <router-link to="/manufacturer/list">全部厂商介绍 ></router-link>
        </div>
        <div class="shebottomcen">
          <h6>【算力服务器测评】</h6>
          <div class="she_ol">
            <div class="imgshe" v-for="n, k in sheol2" @click="goDetail(n.id, 2)">
              <h2>BitCoin</h2>
              <div class="imgshe1">
                <img :src="n.image"/>
              </div>
              <p class="title">{{n.title}}</p>
              <p class="time">{{n.dateline}}</p>
            </div>
          </div>
          <router-link to="/equipmentEvaluate/list">全部测评 ></router-link>
        </div>
        <div class="shebottomright">
          <h6>【算力服务器博物馆】</h6>
          <div class="all_ol">
            <div @click="goDetail(n.id, 1)" class="she_ol" v-for="n, k in sheol3" :key="k">
              <img :src="n.image"/>
              <p class="title">{{n.title}}</p>
            </div>
          </div>
          <router-link to="/equipments/list">全部算力服务器介绍 ></router-link>
        </div>
      </div>
    </div>
    <currency-list></currency-list>
    <div class="cominfor_auto">
      <h4>
        <p class="title">BDC中心相册</p>
        <p class="text">让您进一步了解我们的BDC机房</p>
        <!-- <router-link to="#">了解更多 ></router-link> -->
      </h4>
      <div class="cominfor_autool">
        <div class="autool" v-for="n, k in autool">
          <h3>{{n.title}}</h3>
          <p>{{n.text}}</p>
          <router-link to="#">{{n.button}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import { mapState } from 'vuex'
  import CurrencyList from '@/components/common/CurrencyList'
  import InfoNav from '@/components/common/InfoNav'
  export default {
    components: {
      CurrencyList, InfoNav
    },
    data () {
      return {
        scroll: [],
        autool: [
          {title: '内蒙机房', text: '国家电网合规用电', button: '即将开放'},
          {title: '山西机房', text: '国家电网合规用电', button: '即将开放'},
          {title: '辽宁机房', text: '国家电网合规用电', button: '即将开放'}
        ],
        sheol1: [],
        sheol2: [],
        sheol3: [],
        headerlist: [{
          title: '设备之家',
          link: '/equipments/list',
          route: [{
            name: '测评 >',
            path: '/equipmentEvaluate/list'
          }, {
            name: '博物馆 >',
            path: '/equipments/list'
          }]
        }, {
          title: '数字货币',
          link: '/currency/list',
          route: [{
            name: '主流币种 >',
            path: '/currency/list'
          }, {
            name: '数字货币 >',
            path: '/currency/list'
          }]
        }, {
          title: '二手资讯',
          link: '/transaction'
        }],
        bigimglist: '',
        show: 0,
        infoleft: [],
        inforight: [],
        active: 0,
        qwsl: '',
        miners: [
          {big: require('@/assets/images/information5.jpg'), title: '算力服务器-设备之家', route: '前往了解 >', path: '/equipments/list'},
          {big: require('@/assets/images/information2.jpg'), title: '算力服务器-数字货币', route: '前往了解 >', path: '/currency/list'},
          {big: require('@/assets/images/information3.jpg'), title: '平台交易最新资讯', route: '前往了解 >', path: '/transaction'}
        ]
      }
    },
    head () {
      return {
        title: '比特币新闻-最新行业动态-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币新闻,算力新闻,比特币行情' },
          { hid: 'description', name: 'description', content: '算力网产业资讯版块，聚集了最新的比特币新闻，实时为您提供行业动态，资讯快报，二手算力服务器交易信息，算力服务器测评等行业发展各类资讯。' }
        ]
      }
    },
    methods: {
      goDetail (id, type) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        if (type === 1){
          this.$router.push({path: '/equipments/detail/'})
        } else if (type === 2) {
          this.$router.push({path: '/equipmentEvaluate/detail/'})
        } else if (type === 3) {
          this.$router.push({path: '/manufacturer/detail/'})
        }
      }
    },
    mounted () {
      util.post('showDifficulty', {token: 0}).then((res) => {
        this.qwsl = res.msg
      })

      util.post('NewsManfacturer', {token: 0}).then((res) => {
        this.sheol1 = res.msg
      })

      util.post('NewsReview', {token: 0}).then((res) => {
        this.sheol2 = res.msg
      })

      util.post('NewsMuseum', {token: 0}).then((res) => {
        this.sheol3 = res.msg
      })

      util.post('NewsBrief', {token: 0}).then((res) => {
        this.scroll = res.msg
      })

      util.post('showSecondHandTradeTopList', {token: 0}).then((res) => {
        this.inforight = res.msg.buy_info
        this.infoleft = res.msg.transfer_info
      })

      util.post('showBannerNews', {token: 0}).then((res) => {
        this.bigimglist = res.msg
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/style.scss';
  .cominfor{
    width: 100%;
    height: 100%;
    background:#eceff8;
    .cominfor_header{
      width: 100%;
      height: 490px;
      background-image: url('~assets/images/information.png');
      overflow: hidden;
      background-size: 100% 100%;
      object-fit: cover;
      padding-top: 27px;
      .cominfor_headercon{
        width: 1180px;
        margin:0 auto;
        .cominfo_headerleft{
          width: 300px;
          height: 400px;
          float: left;
          background-image: url('~assets/images/information1.jpg');
          margin-right: 4px;
          position: relative;
          .red{
            position: absolute;
            width: 296px;
            height: 170px;
            background-image: url('~assets/images/red.jpg');
            background-size: 100% 100%;
            left: -15px;
            top:-13px;
            text-align: center;
            h1{
                color: white;
                font-weight: 800;
                font-size: 40px;
                margin-top: 35px;
            }
            p{
                margin-top: 10px;
                color: white;
                letter-spacing:2px;
                font-size: 13px;
                &:after{
                    content:'';
                    @include triangle(right,white)
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                    border-left: 5px solid white;
                    margin-left: 12px;
                }
                &:before{
                    content:'';
                    @include triangle(right,white)
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                    border-left: 5px solid white;
                    margin-left: 12px;
                    transform:rotate(180deg);
                    margin-right: 12px;
                }
            }
          }
          .olbottom{
              padding:0;
              margin:0;
              padding-top: 190px;
              margin-left: 56px;
              .ollist{
                  width: 200px;
                  height: 74px;
                  border-left: 1px solid #535464;
                  margin:0;
                  padding:0;
                  .oltitle{
                      color: #327fff;
                      font-size: 14px;
                      padding-left: 11px;
                      &:before{
                          content: '';
                          width: 6px;
                          height: 6px;
                          background: #bfbfbf;
                          position: absolute;
                          left:54px;
                          border-radius: 100%;
                          margin-top:7px;
                      }
                  }
                  .rou{
                      margin-top: 12px;
                      margin-left: 14px;
                      a{
                        color: white;
                        margin-right: 10px;
                        width: 75px;
                        display: inline-block;
                        &:hover{
                          color: #327fff;
                        }
                      }
                  }
                  &:last-child{
                      height: 60px;
                  }
              }
          }
        }
        .cominfo_headerright{
          width: 876px;
          height: 400px;
          float: left;
          position: relative;
          .bigtop{
            width: 100%;
            height: 276px;
            .bigimg{
              width: 100%;
              height: 100%;
              position: relative;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0;
                position: absolute;
                top:0;
                left:0;
                transition: 2s;
                &:first-child{
                    opacity: 1;
                }
              }
            }
            .bigtab{
                width: 182px;
                height: 276px;
                position: absolute;
                right: 0;
                background: rgba(105, 105, 105, 0.66);
                top:0;
                .bighover{
                    width: 100%;
                    height: 92px;
                    padding:0 10px;
                    box-sizing: border-box;
                    h5{
                        color: white;
                        font-size: 14px;
                        line-height: 92px;
                        text-align: center;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    p{
                        font-size: 12px;
                        color: #bcb2b3;
                    }
                    &:hover{
                        background: white;
                        border-right: 4px solid #327fff;
                        h5{
                           color: #7d7d7d;
                        }
                        p{
                           color: #c6c6c6;
                        }
                    }
                    &.active{
                        background: white;
                        border-right: 4px solid #327fff;
                        h5{
                           color: #7d7d7d;
                        }
                        p{
                           color: #c6c6c6;
                        }
                    }
                }
            }
          }
          .bigbottom{
            width: 100%;
            height: 120px;
            margin-top: 5px;
            .numbig{
              width: 290px;
              height: 120px;
              float: left;
              position: relative;
              img{
                width: 100%;
                height: 100%;
                position: absolute;
                top:0;
                left:0;
              }
              h4{
                  position: absolute;
                  top:34px;
                  color:white;
                  text-align: center;
                  width: 100%;
                  font-weight: 800;
                  font-size: 18px;
              }
              a{
                  display: block;
                  width: 84px;
                  height: 24px;
                  border:1px solid white;
                  position: absolute;
                  text-align: center;
                  line-height: 22px;
                  font-size: 12px;
                  color:white;
                  margin-top: 66px;
                  margin-left: 102px;
              }
              &:nth-child(2){
                margin:0 3px;
              }
            }
          }
        }
      }
    }
    .cominfor_news{
      width: 1180px;
      height: 30px;
      margin:0 auto;
      margin-top: 30px;
      img{
          width: 116px;
          height: 25px;
          float: left;
      }
      .scroll{
          width: 940px;
          float: left;
          margin-left:30px;
          height: 30px;
          line-height: 30px;
          color:#121212;
          font-size: 15px;
          a{
            display:inline-block;
            float: left;
          }
          :nth-child(1){
            color:#327fff;
            display:inline-block;
            margin-right: 30px;
            b{
              font-weight: 800;
              color:#121212;
            }
          }
          :nth-child(2){
            width: 40%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #121212;
            span{
              color: #f84a35;
              margin-right:10px;
            }
          }
      }
    }
    .cominfor_info{
        width: 1180px;
        overflow: hidden;
        margin: 0 auto;
        background: white;
        margin-top: 24px;
        box-shadow: #d2d4db 0 0 20px;
        padding:30px 44px 30px 44px;
        margin-bottom: 25px;
        h4{
            width: 100%;
            overflow: hidden;
            padding-bottom: 18px;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 20px;
            .title{
                font-size: 24px;
                color: #333333;
                font-weight: 800;
                display: inline;
            }
            .text{
                font-size: 12px;
                color: #808080;
                margin-left: 22px;
                display: inline;
            }
            a{
                float: right;
                color:#327fff;
                font-size: 16px;
                img{
                    width:16px;
                    height: 16px;
                    margin-right: 10px;
                    position: relative;
                    top: -3px;
                }
            }
        }
        .cominfor_infoleft{
            width: 50%;
            overflow: hidden;
            border-right: 1px solid #e5e5e5;
            padding-right: 18px;
            float: left;
            .infoleft_p{
                width: 100%;
                height: 16px;
                margin-bottom: 24px;
                .status{
                    color: #fe5039;
                    font-size: 16px;
                    margin-right: 10px;
                    line-height: 16px;
                    position: relative;
                    top:-3px;
                }
                .title{
                    color: #5d5d5d;
                    font-size: 16px;
                    margin-right: 50px;
                    width: 226px;
                    display:inline-block;
                    line-height: 16px;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow:hidden;
                }
                .time{
                    color:#a9a9a9;
                    font-size: 15px;
                }
                &:hover{
                    .status{
                       color: #327fff;
                    }
                    .title{
                        color: #327fff;
                    }
                    .time{
                        color: #327fff;
                    }
                }
            }
        }
        .cominfor_inforight{
            width: 50%;
            overflow: hidden;
            padding-left: 48px;
            float: left;
            .inforight_p{
                width: 100%;
                height: 16px;
                margin-bottom: 24px;
                .status{
                    color: #327fff;
                    font-size: 16px;
                    margin-right: 10px;
                    line-height: 16px;
                    position: relative;
                    top:-3px;
                }
                .title{
                    color: #5d5d5d;
                    font-size: 16px;
                    margin-right: 50px;
                    width: 226px;
                    display:inline-block;
                    line-height: 16px;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow:hidden;
                }
                .time{
                    color:#a9a9a9;
                    font-size: 15px;
                }
                &:hover{
                    .status{
                       color: #327fff;
                    }
                    .title{
                        color: #327fff;
                    }
                    .time{
                        color: #327fff;
                    }
                }
            }
        }
    }
    .cominfor_she{
        width: 1180px;
        overflow: hidden;
        margin: 0 auto;
        background: white;
        box-shadow: #d2d4db 0 0 20px;
        padding:30px 44px 0px 44px;
        margin-bottom: 25px;
        background-image: url('~assets/images/tabletop.jpg');
        background-size: 100% 100%;
        h4{
            width: 100%;
            overflow: hidden;
            padding-bottom: 18px;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 20px;
            .title{
                font-size: 24px;
                color: #333333;
                font-weight: 800;
                display: inline;
            }
            .text{
                font-size: 12px;
                color: #808080;
                margin-left: 22px;
                display: inline;
            }
            a{
                float: right;
                color:#327fff;
                font-size: 16px;
            }
        }
        .cominfor_shebottom{
            width: 100%;
            overflow: hidden;
            padding-bottom: 54px;
            .shebottomleft{
                width: 360px;
                overflow: hidden;
                float: left;
                h6{
                    font-size: 16px;
                    color:black;
                    font-weight: 800;
                    margin-bottom: 10px;
                    span{
                        color:#666666;
                        font-size: 16px;
                        font-weight: 100;
                    }
                }
                .she_ol{
                    margin-bottom: 60px;
                }
                .she_ol .border{
                    width: 100%;
                    margin-top: 24px;
                    color: #333333;
                    font-size: 17px;
                    display:block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    span{
                        border-radius: 100%;
                        background: #333333;
                        width: 16px;
                        height: 16px;
                        margin-right: 15px;
                        display:inline-block;
                        position: relative;
                        top: 2px;
                    }
                    &:hover{
                        color: #327fff;
                        span{
                            background: #327fff;
                        }
                    }
                }
                a{
                    color: #333;
                    font-size: 16px;
                }
            }
            .shebottomcen{
                width: 360px;
                overflow: hidden;
                float: left;
                h6{
                    font-size: 16px;
                    color:black;
                    font-weight: 800;
                    margin-bottom: 10px;
                    span{
                        color:#666666;
                        font-size: 16px;
                        font-weight: 100;
                    }
                }
                .she_ol{
                    margin: 18px 0;
                    overflow: hidden;
                    .imgshe{
                        width: 160px;
                        height: 268px;
                        box-shadow: #d2d4db 0 0 20px;
                        background: white;
                        border-radius: 10px;
                        float: left;
                        position: relative;
                        margin-top: 10px;
                        margin-bottom: 10px;
                        &:nth-child(1){
                          margin-left: 10px;
                          margin-right: 15px;
                        }
                        h2{
                            width: 70px;
                            height: 24px;
                            background: #01beb5;
                            color: white;
                            font-size: 13px;
                            text-align: center;
                            line-height: 24px;
                            position: absolute;
                            left:0;
                            top:6px;
                        }
                        .imgshe1{
                            width: 100%;
                            position: absolute;
                            top:0;
                            left: 0;
                            height: 200px;
                            text-align: center;
                            vertical-align: middle;
                            img{
                                width: 117px;
                                height: 74px;
                                margin-top: 70px;
                                margin-bottom: 50px;
                                object-fit: cover;
                            }
                        }
                        .title{
                            font-size: 14px;
                            color: #59493f;
                            width: 100%;
                            padding-left: 13px;
                            padding-top: 200px;
                        }
                        .time{
                            color: #666666;
                            font-size: 12px;
                            margin-top: 5px;
                            padding-left: 13px;
                        }
                    }
                }
                a{
                    color: #333;
                    font-size: 16px;
                }
            }
            .shebottomright{
                width: 275px;
                overflow: hidden;
                float: left;
                margin-left: 95px;
                h6{
                    font-size: 16px;
                    color:black;
                    font-weight: 800;
                    margin-bottom: 20px;
                    span{
                        color:#666666;
                        font-size: 16px;
                        font-weight: 100;
                    }
                }
                .all_ol{
                    height: 287px;
                    overflow: hidden;
                    margin-bottom: 18px;
                }
                .she_ol{
                    width: 126px;
                    height: 130px;
                    box-shadow: #d2d4db 0 0 20px;
                    background: white;
                    border-radius: 5px;
                    float: left;
                    margin: 5px;
                    display:block;
                    margin-bottom:8px;
                    text-align: center;
                    img{
                        width:76px;
                        height: 44px;
                        margin-top: 26px;
                        margin-bottom: 26px;
                    }
                    .title{
                        font-size: 14px;
                        color:#5d5d5d;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                a{
                    color: #333;
                    font-size: 16px;
                }
            }
        }
    }
    .cominfor_auto{
        width: 1180px;
        overflow: hidden;
        margin: 0 auto;
        background: white;
        box-shadow: #d2d4db 0 0 20px;
        padding:30px 44px 0px 44px;
        margin-bottom: 25px;
        padding-bottom: 58px;
        h4{
            width: 100%;
            overflow: hidden;
            padding-bottom: 18px;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 20px;
            .title{
                font-size: 24px;
                color: #333333;
                font-weight: 800;
                display: inline;
            }
            .text{
                font-size: 12px;
                color: #808080;
                margin-left: 22px;
                display: inline;
            }
            a{
                float: right;
                color:#327fff;
                font-size: 16px;
            }
        }
        .cominfor_autool{
            width: 100%;
            height: 40px;
            .autool{
                width: 350px;
                height: 202px;
                float: left;
                background-image: url('~assets/images/tablebottom.jpg');
                background-size: 100% 100%;
                text-align: center;
                color: white;
                &:nth-child(2){
                    margin: 0 21px;
                }
                h3{
                    font-size: 34px;
                    margin-top: 50px;
                    font-weight: 800;
                }
                p{
                    margin-top: 8px;
                }
                a{
                    width: 130px;
                    height: 38px;
                    display: block;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    line-height: 38px;
                    margin-top: 15px;
                    border-radius: 5px;
                    margin-left: 110px;
                }
            }
        }
    }
  }
</style>
