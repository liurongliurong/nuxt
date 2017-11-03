<template>
  <footer class="footer" v-if="!$route.path.includes('auth')" :disabled="$route.name==='notFound'">
    <div class="box">
      <div class="box_foot">
        <aside>
          <h4>联系我们</h4>
          <h3>
            <a to="#" v-for="item,k in items" :class="{'active':show===k}">{{item.title}}</a>
            <!-- <router-link to="#">北京</router-link>
            <router-link to="#">山西</router-link>
            <router-link to="#">广东</router-link>
            <router-link to="#">广西</router-link> -->
          </h3>
          <p>咨询电话：<span class="active">0571-28221076</span>工作日（9:00~18:00）</p>
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
            <p class="copyright_text">Copyright © 2013-2017 Zhejiang Shuqin Technology Co., Ltd. All Rights Reserved. <router-link to="#">算力网</router-link> 版权所有</p>
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
      <div class="partner">
        <span>友情<br>链接</span>
        <div>
          <a :href="p.FriendlyLink_address" target="_blank" v-for="p,k in $parent.partner" :key="k">{{p.FriendlyLink_name}}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import util from '../../util'
  export default {
    data () {
      return {
        // link: {'关于我们': '/webInfo/aboutUs', '安全保障': '/webInfo/safeGuarantee', '法律声明': '/webInfo/lawyer', '常见问题': '/webInfo/issues'},
        link: {'关于我们': '/webInfo/help/aboutUs', '常见问题': '/webInfo/help/issues'},
        service: {'算力商城': '/computeShop/list/1', '算力转让': '/computeTransfer/list/1', '算力托管': '/bdc', '算力资讯': '/webInfo/list/news'},
        info: {'网站动态': '/webInfo/list/website', '产品公告': '/webInfo/list/product'},
        items: [
          {title: '杭州总部', show: false},
          {title: '北京', show: false},
          {title: '山西', show: false},
          {title: '广东', show: false},
          {title: '广西', show: false}
        ],
        show: 0
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .footer{
    background: $black;
    color: $light_text;
    padding-bottom:40px;
    .box{
      .box_foot{
        @include flex(space-between,flex-start)
        @include gap(25,v)
        margin-bottom:10px;
        @include main
        line-height: 2.4;
        aside{
          .copyright{
            @include flex
            .copyright_img{
              width: 92px;
              height: 35px;
              border-radius:5px;
              background: url('../../assets/images/css_sprites.png') -152px -168px;
            }
            .copyright_text{
              width:400px;
              margin-left:20px;
              font-size: 12px;
              line-height: 1.6;
            }
          }
          .help_support{
            margin-bottom:5px;
            a{
              @include gap(20,h)
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
              @include gap(30,h)
              &:nth-child(2){
                padding-left:0
              }
            }
          }
        }
        .follow{
          text-align: center;
          .outside{
            background: #fff;
            margin-top:10px;
            padding:3px;
            .qrcode{
              width: 80px;
              height: 80px;
              background: url('../../assets/images/css_sprites.png') -10px -10px;
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
            // width:82px;
            // height:25px;
            padding:0px 12px;
            text-align:center;
            margin-right:10px;
            line-height:25px;
            display:inline-block;
            box-sizing: border-box;
            font-size:14px;
            cursor: pointer;
            &:hover{
              color:white;
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
        border:1px dashed $light_text;
        line-height: 1.2;
        span{
          padding-right:10px;
          border-right:1px solid $light_text
        }
        div{
          flex:1;
          @include gap(30,h)
          @include flex
          a{
            width:100px;
            text-align: center;
          }
        }
      }
    }
    h4{
      color:#f5f8fb;
    }
    h3,a,p,span{
      color:#adaeb1;
    }
    a:hover,.active{
      color:$white
    }
    &[disabled]{
      display: none;
    }
  }
</style>
