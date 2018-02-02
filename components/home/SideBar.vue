<template>
  <div ref="bar" class="side_bar">
    <div class="item1" v-for="n,k in nav">
      <div :class="'iconfont icon_'+k" @click="openPopup(n)"></div>
      <div class="popup1" v-if="n==='qq'">
        <!-- <span>QQ群</span>
        <span>3567894561</span> -->
        <!-- <img border="0" :src="img" alt="算力网官方用户群" title="算力网官方用户群"> -->
        <a class="qq" title="点击或扫描加入群" href="http://qm.qq.com/cgi-bin/qm/qr?k=WS2QITBH5tuDJbC5FmpEz1wx9Qi-nskJ"></a>
      </div>
      <div class="popup1 tel" v-if="n==='tel'">
        <span>0571-</span>
        <span>28031736</span>
      </div>
      <div class="popup1" v-if="n==='wechat'">
        <div class="wechat"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chart',
    data () {
      return {
        nav: ['qq', 'tel', 'wechat', 'gotop'],
        show: '',
        isTop: true,
        timer: null
      }
    },
    mounted () {
      if (this.$route.name === 'index') {
        window.addEventListener('scroll', this.test, false)
      }
    },
    destroyed () {
      if (this.$route.name === 'index') {
        window.removeEventListener('scroll', this.test)
      }
    },
    methods: {
      openPopup (n) {
        if (n !== 'gotop') {
          this.show = n
        } else {
          this.timer = setInterval(() => {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            var ispeed = 0
            ispeed = Math.floor(-scrollTop / 2)
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed
            if (scrollTop === 0) {
              clearInterval(this.timer)
            }
            this.isTop = false
          }, 50)
        }
      },
      test (e) {
        if (this.$route.name !== 'index') return false
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 0) {
          document.getElementsByClassName('side_bar')[0].style.display = 'block'
        } else {
          document.getElementsByClassName('side_bar')[0].style.display = 'none'
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .side_bar{
    position: fixed;
    top:calc(50vh - 120px);
    right:20px;
    width:60px;
    height:240px;
    border:1px solid $border;
    border-radius:5px;
    z-index: 3;
    background: #fff;
    box-shadow:0px 0px 6px 0px #bbb;
    display: none;
    .item1{
      position: relative;
      cursor: pointer;
      &:not(:last-child){
        border-bottom:1px solid #e5e5e5
      }
      .iconfont{
        height:60px;
        line-height: 60px;
        text-align: center;
        font-size: 30px;
        &:not(:last-child):before{
          color:#bdbdbd
        }
        &:last-child:before{
          color:#999
        }
        &.icon_0:before{
          content:'\e68e'
        }
        &.icon_1:before{
          content:'\e697'
        }
        &.icon_2:before{
          content:'\e61f'
        }
        &.icon_3:before{
          content:'\e621'
        }
      }
      .popup1{
        position: absolute;
        top:3px;
        right:100%;
        background: #fff;
        padding:5px;
        box-shadow:0px 0px 4px 0px #bbb;
        border-radius:3px;
        display: none;
        span{
          color:$blue;
          &:last-child{
            font-weight: bold;
          }
        }
        .qq,.wechat{
          width: 80px;
          height: 80px;
        }
        .qq{
          display: block;
          background: url('~assets/images/css_sprites.png') -110px -264px;
        }
        .wechat{
          background: url('~assets/images/css_sprites.png') -10px -264px;
        }
      }
      &:hover{
        .popup1{
          display: block;
        }
        .iconfont:before{
          color:$blue
        }
      }
    }
  }
</style>