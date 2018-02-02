<template>
  <div :class="[headerClass, {bg_opacity:scroll}]" :disabled="$route.name==='notFound'" :title="($route.name==='auth-login'||$route.name==='bdc')&&'border'">
    <section class="box">
      <div class="nav_left1">
        <router-link class="logo" to="/"></router-link>
        <nav>
          <span v-if="$route.path.includes('regist')">用户注册</span>
          <span v-else-if="$route.path.includes('passwordRetrieval')">找回密码</span>
          <div :class="['item',{active:$route.path.includes(i.name)}]" v-for="(i,k) in nav" v-else>
            <router-link :to="i.link">{{ i.text }}</router-link>
          </div>
        </nav>
      </div>
      <div class="side_nav">
        <template v-if="$route.path.includes('auth')">
          <router-link to="/" v-if="$route.path.includes('login')">返回首页</router-link>
          <div class="text" v-else>
            <span>已经拥有账号,</span>
            <router-link to="/auth/login">直接登录</router-link>
          </div>
        </template>
        <template v-else>
          <router-link to="/webInfo/issues/list">帮助</router-link>
          <router-link to="/webInfo/aboutUs">关于</router-link>
          <template v-if="token===0">
            <router-link to="/auth/login">登录</router-link>
            <router-link class="btn" to="/auth/regist">注册</router-link>
          </template>
          <template v-else>
            <router-link class="tel" to="/user/computeProperty"><span class="iconfont">&#xe63f; </span>{{mobile|format}}<i v-if="unread_num"></i></router-link>
            <a href="javascript:;" @click="logout">退出</a>
          </template>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'header',
    data () {
      return {
        nav: [
          {name: 'minerShop/miner', text: '算力服务器', link: '/minerShop/miner'},
          {name: 'minerShop/cloudCompute', text: '云算力', link: '/minerShop/cloudCompute'},
          {name: 'bdc', text: 'BDC托管', link: '/bdc'},
          {name: 'industryInformation', text: '产业资讯', link: '/industryInformation'}
        ],
        path: {
          frame_header: ['regist', 'passwordRetrieval', '/minerShop/activity', '/minerShop/list', 'user', 'account', '/detail', '/pay', 'webInfo', 'article/agreement', 'minerShop/miner', 'minerShop/cloudCompute', '/industryInformation', 'computeNews', 'transaction', 'quickNews', 'currency', 'equipments', 'equipmentEvaluate', 'manufacturer', 'computeChart'],
          border: ['login', 'bdc'],
          shadow: ['regist', 'passwordRetrieval'], web_box: ['webInfo', 'minerShop/miner', 'minerShop/cloudCompute']
        },
        headerClass: '',
        scroll: false
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        unread_num: state => state.info.unread_num
      })
    },
    methods: {
      logout () {
        this.$router.push({path: '/'})
        this.$store.commit('LOGOUT')
      },
      test (e) {
        if (this.headerClass.indexOf('frame_header') > -1) return false
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 0) {
          this.scroll = true
        } else {
          this.scroll = false
        }
      },
      updateClass () {
        var path = this.$route.path
        this.headerClass = ''
        for (var i in this.path) {
          for (var j = 0; j < this.path[i].length; j++) {
            if (path.includes(this.path[i][j])) {
              this.headerClass += i + ' '
              break
            }
          }
        }
        if (!this.headerClass.includes('frame_header')) {
          this.headerClass += 'fixed_header' + ' '
        }
        if (this.$route.name === 'index') {
          this.headerClass = 'frame_header'
        }
      }
    },
    mounted () {
      this.updateClass()
      window.addEventListener('scroll', this.test, false)
    },
    filters: {
      format: api.telReadable
    },
    watch: {
      '$route': 'updateClass'
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .pc_header{
    .box{
      @include main
      @include flex(space-between)
      height:80px;
      line-height: 80px;
      .nav_left1{
        width:74%;
        @include flex
        .logo{
          display: inline-block;
          width:178px;
          height:37px;
          margin-right:60px;
        }
        nav{
          @include flex
          .item{
            height:80px;
            line-height: 80px;
            text-align:center;
            width:100px;
            a{
              position: relative;
              font-size: 16px;
            }
            &.active a,&:hover a{
              color: #327fff;
            }
            .router-link-active{
              color: #327fff;
            }
            &.active a::after,&:hover a::after{
              position: absolute;
              top:10px;
              left:-12px;
              content: "";
              width: 4.5px;
              height: 4.5px;
              background: #327fff;
              font-size: 12px;
            }
          }
          span{
            color:$light_text;
            margin-left:-45px;
            padding-left:15px;
            border-left:1px solid $border
          }
        }
      }
      .side_nav{
        a{
          padding: 0 10px;
          &.btn{
            line-height: 1.8;
            display: inline-block;
            width:70px;
            text-align: center;
            margin-left:10px;
            border-radius:3px;
            background:$blue;
            color:$white
          }
        }
      }
    }
    &[disabled]{
      display: none;
    }
    &.fixed_header{
      @include position(0,0,auto,0)
      position: fixed;
      z-index: 5;
      &.bg_opacity{
        background: rgba(0,0,0,.8);
      }
      .box .logo{
        background: url('~assets/images/mobile/logo3.png');
      }
      a{
        color:$white
      }
      .tel{
        color:$white
      }
    }
    &.frame_header{
      .box{
        .logo{
          background: url('~assets/images/mobile/logo2.png');
        }
        nav .item{
          a{
            color:#7988A7;
          }
          &.active a::after,&:hover a::after{
            color: balck;
          }
        }
        .side_nav{
          a{
            color:#7988A7;
          }
          .text{
            color:$light_text;
            a{
              color:$blue
            }
          }
          .tel{
            color: $blue;
            font-weight: bold;
            position: relative;
            i {
              position: absolute;
              right: 0;
              top:0;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #ff0000;
            }
          }
          .btn{
            color:$white
          }
        }
      }
    }
    &.web_box{
      background: #242528;
      .box .logo{
        background: url('~assets/images/mobile/logo3.png');
      }
      .box nav .item a,.box .side_nav a,.box .side_nav a.tel{
        color:#fff
      }
      nav .item{
        &.active a::after,&:hover a::after{
          color:#fff
        }
      }
    }
    &[title='border']{
      border-bottom:1px solid $light_text;
    }
    &.shadow{
      position: relative;
      z-index: 2;
      box-shadow:0px 4px 7px 0px rgba(138, 126, 126, 0.21);
      &.bg_opacity{
        background: transparent
      }
      nav span{
        line-height: 1.5;
      }
    }
  }
</style>
