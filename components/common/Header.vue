<template>
  <header :class="[{frame_header: !$route.path.includes('user')&&!$route.path.includes('/detail')&&!$route.path.includes('account')&&!$route.path.includes('webInfo')&&!$route.path.includes('article/agreement')}, {border_box: $route.path.includes('bdc')||$route.path.includes('login')}, {auth_box:$route.path.includes('auth')&&!$route.path.includes('login')}, {user_box:$route.path.includes('user')||$route.path.includes('account')||$route.path.includes('/detail')||$route.path.includes('webInfo')||$route.path.includes('article/agreement')}, {web_box:$route.path.includes('webInfo')}]" :disabled="$route.name==='notFound'">
    <section class="box">
      <router-link class="logo" to="/"></router-link>
      <nav>
        <span v-if="$route.path.includes('regist')">用户注册</span>
        <span v-else-if="$route.path.includes('passwordRetrieval')">找回密码</span>
        <div :class="['item',{active:i === 0}]" v-for="(i,k) in nav" v-else>
          <router-link :to="i">{{ k }}</router-link>
        </div>
      </nav>
      <div class="side_nav">
        <template v-if="$route.path.includes('auth')">
          <router-link to="/" v-if="$route.path.includes('login')">返回首页</router-link>
          <div class="text" v-else>
            <span>已经拥有账号,</span>
            <router-link to="/auth/login">直接登录</router-link>
          </div>
        </template>
        <template v-else>
          <router-link to="/webInfo/help/issues">帮助</router-link>
          <router-link to="/webInfo/help/aboutUs">关于</router-link>
          <template v-if="token===0">
            <router-link to="/auth/login">登录</router-link>
            <router-link class="btn" to="/auth/regist">注册</router-link>
          </template>
          <template v-else>
            <router-link class="tel" to="/user/computeProperty"><span class="iconfont">&#xe63f; </span>{{mobile|format}}</router-link>
            <a href="javascript:;" @click="logout">退出</a>
          </template>
        </template>
      </div>
    </section>
  </header>
</template>

<script>
  import api from '../../util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'header',
    data () {
      return {
        nav: {'算力商城': '/computeShop/list/1', '算力转让': '/computeTransfer/list/1', '算力托管': '/bdc', '算力资讯': '/webInfo/list/news'}
      }
    },
    mounted () {
      window.addEventListener('scroll', this.test, false)
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile
      })
    },
    methods: {
      logout () {
        this.$router.push({path: '/'})
        this.$store.commit('LOGOUT')
      },
      test (e) {
        var ele = document.querySelector('.frame_header')
        if (!ele) return false
        if (e.target.scrollingElement.scrollTop > 0 || this.showNav) {
          ele.classList.add('bg_opacity')
          this.scroll = true
        } else {
          ele.classList.remove('bg_opacity')
          this.scroll = false
        }
      }
    },
    filters: {
      format: api.telReadable
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  @import '../../assets/fonts/iconfont.css';
  .logo{
    display: block;
    width: 130px;
    height: 38px;
  }
  .frame_header{
    @include position(0,0,auto,0)
    position: fixed;
    z-index: 5;
    &.bg_opacity{
      background: rgba(0,0,0,.8);
    }
    .box .logo{
      background: url('../../assets/images/css_sprites.png') -10px -110px;
    }
    a{
      color:$white
    }
    .tel{
      color:$white
    }
  }
  .border_box{
    border-bottom:1px solid $light_text;
  }
  .auth_box{
    position: relative;
    z-index: 2;
    box-shadow:0px 4px 7px 0px rgba(138, 126, 126, 0.21);
    &.bg_opacity{
      background: transparent
    }
  }
  .auth_box,.user_box{
    .box{
      .logo{
        background: url('../../assets/images/css_sprites.png') -210px -10px;
      }
      nav .item a{
        color:$text;
        &.nuxt-link-active::after{
              content: "●";
              display: block;
              color: balck;
              position: relative;
              font-size: 12px;
        }
      }
      nav .item:hover a::after{
        content: "●";
        display: block;
        color: black;
        position: relative;
        font-size: 12px;
      }
      .side_nav{
        a{
          color:$text;
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
        }
      }
    }
  }
  .web_box{
    background: #242528;
    .box .logo{
      background: url('../../assets/images/css_sprites.png') -10px -110px;
    }
    .box nav .item a,.box .side_nav a,.box .side_nav a.tel{
      color:#fff
    }
  }
  header{
    .box{
      @include main
      @include flex
      height:80px;
      nav{
        flex:1;
        @include flex
        margin-left:60px;
        .item{
          text-align:center;
          width:100px;
          height:25px;
          a{
            font-size: 16px;
            &.nuxt-link-active::after{
              content: "●";
              display: block;
              color: white;
              position: relative;
              font-size: 12px;
            }
          }
          &:hover a::after{
              content: "●";
              display: block;
              color: white;
              position: relative;
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
      .side_nav{
        a{
          @include gap(10,h)
          &.btn{
            line-height: 1.8;
            @include gap(0,h)
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
  }
</style>
