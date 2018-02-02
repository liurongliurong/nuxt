<template>
  <footer class="footer">
    <div class="pc_box" v-if="isMobile === 0">
      <div class="box">
        <div class="box_foot">
          <aside>
            <h4>联系我们</h4>
            <h3>
              <a to="#" v-for="item,k in items" :class="{'active':show===k}">{{item.title}}</a>
            </h3>
            <p>咨询电话：<span class="active">0571-28031736</span>工作日（9:00~18:00）</p>
            <p>客服邮箱：V@suanLi.com</p>
            <p>公司地址：浙江省杭州市学院路77号黄龙国际中心G座-907</p>
          </aside>
          <aside>
            <div class="help_support">
              <router-link :to="l" v-for="l,k in link" :key="k">{{k}}</router-link>
            </div>
            <div class="service">
              <h4>产品及服务</h4>
              <router-link :to="s" v-for="s,k in service" :key="k">{{k}}</router-link>
            </div>
            <div class="copyright">
              <div class="copyright_img"></div>
              <div class="copyright_text">
                <span>Copyright © 2013-2017 www.suanli.com All Rights Reserved. 算力网 版权所有 </span>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008747" target="_blank"><br><span class="copyright_icon"></span> 浙公网安备 33010602008747号</a>
              </div>
            </div>
          </aside>
          <div class="follow">
            <h4>关注我们</h4>
            <router-link :to="i" v-for="i,k in info" :key="k">{{k}}</router-link>
            <div class="outside">
              <div class="qrcode"></div>
            </div>
            <!-- <div class="active">最新区块链资讯</div> -->
          </div>
        </div>
        <div class="partner" v-if="$route.name === 'index'">
          <span>友情<br>链接</span>
          <div>
            <a :href="p.FriendlyLink_address" target="_blank" v-for="p,k in partner" :key="k">{{p.FriendlyLink_name}}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mobile_tabbar" v-if="isMobile === 1&&$route.name!=='minerShop-detail'&&$route.name!=='mobile-orderDetail'&&$route.name!=='mobileIndex'&&$route.name!=='bdc'">
      <div class="mobile_tab_item" v-for="item in footList">
        <a href="javascript:;" @click="goPage(item.linkName)" class="item" :class="{active: $route.name === item.linkName}">
          <i :class="['iconfont',$route.name === item.linkName ? item.activeIcon : item.icon]"></i>
          <span class="name">{{item.name}}</span>
        </a>
      </div>
    </div> -->
  </footer>
</template>

<script>
  import util from '@/util'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        link: {'关于我们': '/webInfo/aboutUs', '常见问题': '/webInfo/issues/list'},
        service: {'算力服务器': '/minerShop/miner', '云算力': '/minerShop/cloudCompute', 'BDC托管': '/bdc', '产业资讯': '/industryInformation'},
        partner: [],
        info: {'网站动态': '/webInfo/list/website', '产品公告': '/webInfo/list/product'},
        items: [
          {title: '杭州总部', show: false},
          {title: '北京', show: false},
          {title: '山西', show: false},
          {title: '广东', show: false},
          {title: '广西', show: false}
        ],
        footList: [
          {name: '首页', icon: 'icon-shouye', activeIcon: 'icon-shouyetianchong', linkName: 'mobileIndex'},
          {name: '算力资产', icon: 'icon-qingdan', activeIcon: 'icon-qingdantianchong', linkName: 'mobile-property'},
          {name: '个人中心', icon: 'icon-yonghu', activeIcon: 'icon-yonghutianchong', linkName: 'mobile-personcenter'}
        ],
        showRouter: ['/auth', '/bdc'],
        show: 0
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile,
        token: state => state.info.token
      })
    },
    mounted () {
      this.getFriendLinks()
    },
    methods: {
      getFriendLinks () {
        util.post('friendlinkList', {token: 0}).then( (res) => {
          this.partner = res.msg
        })
      },
      goPage (link) {
        if (this.token || link === 'mobileIndex') {
          this.$router.push({name: link})
        } else {
          this.$router.push({name: 'auth-login'})
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .footer{
    .pc_box{
      background: #F2F6F9;
      color: $light_text;
      padding-bottom:40px;
      .box{
        .box_foot{
          @include flex(space-between,flex-start)
          padding: 25px 0;
          margin-bottom:10px;
          @include main
          line-height: 2.4;
          & > *{
            vertical-align:top;
          }
          aside{
            .copyright{
              @include flex
              .copyright_img{
                width: 92px;
                height: 35px;
                border-radius:5px;
                background: url('~assets/images/css_sprites.png') -10px -413px;
              }
              .copyright_text{
                width: 360px;
                margin-left:20px;
                font-size: 12px;
                line-height: 1.6;
                .copyright_icon{
                  display: inline-block;
                  width:20px;
                  height:20px;
                  background: url('~assets/images/css_sprites.png') -534px -264px;
                  vertical-align: bottom;
                }
              }
            }
            .help_support{
              margin-bottom:5px;
              a{
                color:#01215c;
                padding: 0 20px;
                border-left:1px solid $light_text;
                &:first-child{
                  padding-left:0;
                  border-left:0
                }
              }
            }
            .service{
              margin-bottom:20px;
              a{
                padding: 0 30px;
                &:nth-child(2){
                  padding-left:0
                }
              }
            }
          }
          .follow{
            h4,a{
              text-align: center;
            }
            .outside{
              width:86px;
              background: #fff;
              margin-top:10px;
              padding:3px;
              margin-left: auto;
              margin-right: auto;
              .qrcode{
                width: 80px;
                height: 80px;
                background: url('~assets/images/css_sprites.png') -10px -264px;
              }
            }
            .active{
              font-size: 12px
            }
            a{
              display: block;
              line-height: 2;
            }
          }
          h3{
            font-size: 15px;
            a{
              padding:0px 12px;
              text-align:center;
              margin-right:10px;
              line-height:25px;
              display:inline-block;
              box-sizing: border-box;
              font-size:14px;
              cursor: pointer;
              &:hover{
                color:$blue;
                font-size:14px;
              }
              &.active:nth-of-type(1){
                line-height:25px;
                text-align:center;
                color:white;
                font-size:14px;
                border-radius:5px;
                background: #327fff;
                box-sizing: border-box;
              }
            }
          }
          span.active{
            font-weight: bold;
            margin-right:10px
          }
        }
        .partner{
          @include main
          @include flex
          padding:10px;
          border:1px dashed $border;
          line-height: 1.2;
          span{
            padding-right:10px;
            border-right:1px solid $light_text;
            color:#01215c;
          }
          div{
            padding: 0 30px;
            @include flex
            a{
              width:100px;
              text-align: center;
            }
          }
        }
      }
      h4{
        color:#01215c;
      }
      h3,a,p,span,.copyright_text{
        color:$light_text;
      }
      a:hover,.active{
        color:$blue
      }
      &[disabled]{
        display: none;
      }
    }
    .mobile_tabbar{
      position: fixed;
      left: 0;
      right:0;
      width:100%;
      bottom:0;
      height: 1.13rem;
      z-index: 999999;
      background:white;
      border-top:1px solid $border;
      padding: 0.21px 0;
      .mobile_tab_item{
        width:33.33%;
        text-align: center;
        float: left;
        .item{
          .name{
            color: #666;
            font-size: 0.2rem;
          }
          .iconfont{
            font-size: 0.33rem;
            display: block;
            margin-top: 0.21rem;
            height: 0.33rem;
          }
          &.active{
            color: #327fff;
            .name{
              color: #327fff;
            }
          }
        }
      }
    }
  }
</style>
