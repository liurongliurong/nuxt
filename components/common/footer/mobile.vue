<template>
  <footer class="footer" v-if="!showRouter.includes($route.path)" :disabled="$route.name==='notFound'">
    <div class="mobile_box">
      <mt-tabbar :fixed="true" selected="1">
        <div v-for="item in footList" class="mint-tab-item">
          <nuxt-link :to="{name: item.linkName}" class="item" :class="{active: $route.name === item.linkName}">
            <i :class="['iconfont',$route.name === item.linkName ? item.activeIcon : item.icon]"></i>
            <span class="name">{{item.name}}</span>
          </nuxt-link>
        </div>
      </mt-tabbar>
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
  .footer{
    .mobile_box{
      width:100%;
      .mint-tab-item{
        padding: 0 !important;

        .item {
          @include flex(center, center, column);
          height: 50px;

          .name {
            color: #666;
            font-size: 11px;
          }

          .iconfont {
            font-size: 20px;
            position: relative;
            top: 7px;
          }
        }

        .active {
          color: #327fff;

          .name {
            color: #327fff;
          }
        }
      }
      .mint-tabbar{
        background:white;
        border-top:1px solid $border
      }
    }
  }
</style>
