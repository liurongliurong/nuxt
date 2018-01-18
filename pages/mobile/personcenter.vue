<template>
  <div class="person_center">
    <div class="person_header"> 
      <div class="left">
        <div class="img"><img src="../../assets/images/jie-blue.png"/></div>
        <div class="cen">
          <h4>{{mobile|format}}</h4>
          <p>欢迎来到算力网 !</p>
        </div>
      </div>
      <em></em>
    </div>
    <div class="all_list">
      <router-link :to="n.link" class="route" v-for="n,k in nav" :key="k">
        <div class="left">
          <span :class="['icon', 'iconfont', n.icon]"></span>
          <span class="name">{{n.name}}</span>
        </div>
        <em></em>
      </router-link>
    </div>
    <button @click="logout" class="back">退出</button>
  </div>
</template>

<script>
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        nav: [
          {name: '我的订单', link: '/mobile/order/0', icon: 'icon-31shoucangxuanzhong'},
          {name: '消息中心', link: '/mobile/message', icon: 'icon-31wangwangxuanzhong'},
          {name: '账户流水', link: '/mobile/moneyFlow', icon: 'icon-wodezichan'},
          {name: '个人认证', link: '/mobile/moneyFlow', icon: 'icon-wodezichan'},
          {name: '银行卡管理', link: '/mobile/moneyFlow', icon: 'icon-wodezichan'},
          {name: '收益地址管理', link: '/mobile/administration', icon: 'icon-pinpaizhuanxiang'},
          {name: '账户设置', link: '/mobile/administration', icon: 'icon-pinpaizhuanxiang'}
        ]
      }
    },
    computed: {
      ...mapState({
        mobile: state => state.info.mobile
      })
    },
    filters: {
      format: api.telReadable
    },
    methods: {
      logout () {
        this.$router.push({name: 'index'})
        this.$store.commit('LOGOUT')
      }
    },
    mounted () {
      this.$store.commit('SET_TITLE', '个人中心')
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .person_center{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    padding-top: 0;
    padding-bottom: 1rem;
    
    .person_header{
      width: 100%;
      background:#327fff;
      padding: 0.88rem 0.3rem 0 0.7rem;
      @include flex(space-between, center);

      .left{
        display: flex;
        padding: 0.3rem 0;
        .img{
          width: 0.86rem;
          height: 0.86rem;
          background: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 0.6rem;
          img{
            width: 0.58rem;
            height: 0.32rem;
          }
        }
        .cen{
          padding-left: 0.3rem;
          h4{
            color: #fff;
            font-size: 0.32rem;
          }
          p{
            color: #fff;
          }
        }
      }
    }
    .all_list{
      width: 100%;
      margin: .2rem 0;
      background: #fff;
      .route{
        height: 1rem;
        @include flex(space-between, center);
        margin-left: 1.05rem;
        padding:0 .3rem 0 0;
        border-bottom:1px solid #ddd;
        .left{
          @include flex(flex-start, center);
          .icon{
            font-size: 0.33rem;
            position: absolute;
            left: 0.36rem;
          }
          .name {
            color: #333;
            fongt-size: 0.32rem;
          }
        }
        em{
          @include block(5);
          @include arrow(right, #c7c7c9);
          width: 0.1rem;
          height:0.1rem;
          border-width: 1px;
        }
        &:nth-child(1) .left .icon,&:nth-child(5) .left .icon{
          color:#327FFF
        }
        &:nth-child(2) .left .icon,&:nth-child(6) .left .icon{
          color:#EC6351
        }
        &:nth-child(3) .left .icon,&:nth-child(7) .left .icon{
          color:#FFAB1F
        }
        &:nth-child(4) .left .icon{
          color:#51C9C0
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .back{
      width: 100%;
      line-height: 0.9rem;
      background: #fff;
      color: #999;
      border: 0;
      font-size: 0.27rem;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
  .icon-dingwei:before, .icon-pinpaizhuanxiang:before, .icon-wodezichan:before, .icon-31shoucangxuanzhong:before, .icon-yiwen:before, .icon-31wangwangxuanzhong:before, .icon-xiai:before{
    position: relative;
    top: 0.05rem;
  }
</style>
