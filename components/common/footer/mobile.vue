<template>
  <footer class="footer mobile_tabbar" v-if="!showRouter.includes($route.path)" :disabled="$route.name==='notFound'">
    <div class="mobile_tab_item" v-for="item in footList">
      <nuxt-link :to="{name: item.linkName}" class="item" :class="{active: $route.name === item.linkName}">
        <i :class="['iconfont',$route.name === item.linkName ? item.activeIcon : item.icon]"></i><br>
        <span class="name">{{item.name}}</span>
      </nuxt-link>
    </div>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        footList: [
          {name: '首页', icon: 'icon-shouye', activeIcon: 'icon-shouyetianchong', linkName: 'index'},
          {name: '算力资产', icon: 'icon-qingdan', activeIcon: 'icon-qingdantianchong', linkName: 'mobile-property'},
          {name: '个人中心', icon: 'icon-yonghu', activeIcon: 'icon-yonghutianchong', linkName: 'mobile-personcenter'}
        ],
        showRouter: ['/auth', '/bdc']
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .footer.mobile_tabbar{
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    background:white;
    border-top:1px solid $border;
    padding: 5px 0;
    @include flex
    .mobile_tab_item{
      width:33.33%;
      text-align: center;
      .item{
        height: 50px;
        .name{
          color: #666;
          font-size: 11px;
        }
        .iconfont{
          font-size: 20px;
          position: relative;
          top: 7px;
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
</style>
