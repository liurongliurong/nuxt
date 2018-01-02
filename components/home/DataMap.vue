<template>
  <div class="data_map">
    <img :src="img"/>
    <div class="point_area" :style="{top: d.top+'px', [d.left?'left':'right']: (d.left||d.right)+'px'}" v-for="d,k in bdcDots">
      <a class="point point_dot"></a>
      <div class="split">{{d.title}}</div>
      <!-- <div class="point point_10"></div>
      <div class="point point_40"></div>
      <div class="point point_shadow point_80"></div> -->
    </div>
    <div class="btc_point" :style="{top: d.top+'px', [d.left?'left':'right']: (d.left||d.right)+'px'}" v-for="d,k in btcDots"></div>
    <div class="map_legend">
      <div class="item">
        <span class="item_img"></span>
        <span>算力网BDC中心分布</span>
      </div>
      <div class="item">
        <span class="item_img"></span>
        <span>比特币全球节点分布</span>
      </div>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'chart',
    data () {
      return {
        img: require('@/assets/images/world.png'),
        bdcDots: [{title: '哈萨克斯坦', top: 96, left: 720}, {title: '内蒙古', top: 127, right: 200}, {title: '四川', top: 177, right: 230}, {title: '云南', top: 213, right: 220}, {title: '山西', top: 164, right: 200}, {title: '新疆', top: 137, right: 290}, {title: '俄罗斯', top: 90, right: 193}, {title: '美国', top: 183, left: 200}, {title: '加拿大', top: 120, left: 176}, {title: '欧洲', top: 156, left: 610}, {title: '西藏', top: 195, right: 275}, {title: '贵州', top: 195, right: 206}, {title: '辽宁', top: 130, right: 123}],
        btcDots: [{title: '', top: 108, left: 190}, {title: '', top: 160, left: 216}, {title: '', top: 220, left: 237}, {title: '', top: 230, left: 252}, {title: '', top: 210, left: 220}, {title: '', top: 420, left: 350}, {title: '', top: 168, left: 610}, {title: '', top: 125, left: 610}, {title: '', top: 135, left: 600}, {title: '', top: 140, left: 620}, {title: '', top: 140, left: 720}, {title: '', top: 210, right: 230}, {title: '', top: 220, right:230}, {title: '', top: 230, right: 374}, {title: '', top: 172, right: 390}, {title: '', top: 200, right: 345}, {title: '', top: 220, right:350}, {title: '', top: 180, right: 225}, {title: '', top: 227, right: 245}]
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .data_map{
    position: relative;
    .point_area {
      position: absolute;
      width: 150px;
      height: 40px;
      text-align: center;
      transition: opacity .5s ease-out;
      .split{
        position: relative;
        display: inline-block;
        font-size: 12px;
        background: #fff;
        padding:0 5px;
        border-radius:5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        z-index: 2;
      }
      .point {
        &.point_dot {
          display: inline-block;
          width: 22px;
          height: 32px;
          background: url('~assets/images/home.png') -122px -129px;
          margin-right:5px;
          animation-duration: 5s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-name: bounce;
          transform-origin: center bottom;
        }
        // &:nth-child(2n){
        //   animation-delay: .5s;
        // }
        &:after{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
        }
        // &.point_shadow:after {
        //   box-shadow: inset 0 0 5em rgba(0,205,236,.16);
        // }
        // &.point_10,&.point_40,&.point_80{
        //   width: 100%;
        //   height: 100%;
        //   &:after{
        //     content: "";
        //     display: block;
        //     border: 2px solid #349ee8;
        //     opacity: 0;
        //   }
        // }
        // &.point_10:after {
        //   animation: ripple 4.5s ease-out 225ms infinite;
        // }
        // &.point_40:after {
        //   animation: ripple 4.5s ease-out .9s infinite;
        // }
        // &.point_80:after {
        //   animation: ripple 4.5s ease-out 1.8s infinite
        // }
      }
    }
    .btc_point{
      position: absolute;
      display: inline-block;
      width: 17px;
      height: 15px;
      background: url('~assets/images/home.png') -186px -10px;
      animation-duration: 3s;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-name: flash;
      // &:nth-child(2n){
      //   animation-delay: 1s;
      // }
    }
    .map_legend{
      position: absolute;
      left:0;
      bottom:50px;
      .item{
        .item_img{
          display: inline-block;
          vertical-align: middle;
          margin-right:5px;
        }
        &:nth-child(1){
          .item_img{
            width: 22px;
            height: 32px;
            background: url('~assets/images/home.png') -122px -129px;
          }
        }
        &:nth-child(2){
          .item_img{
            width: 17px;
            height: 15px;
            background: url('~assets/images/home.png') -186px -10px;
          }
        }
        & + .item{
          margin-top:15px;
        }
      }
    }
    /*帧动画start*/
    @keyframes ripple {
      0% {
        opacity: 0;
        transform: scale(.1)
      }
      5% {
        opacity: 1
      }
      to {
        opacity: 0;
        transform: scale(1)
      }
    }[not-existing] {
      zoom: 1
    }
    @keyframes bounce {
      from, 20%, 53%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0,0,0);
      }

      40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -10px, 0);
      }

      70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -5px, 0);
      }

      90% {
        transform: translate3d(0,-2px,0);
      }
    }
    @keyframes flash {
      from, 50%, to {
        opacity: 0.7;
      }
      25%, 75% {
        opacity: 0.2;
      }
    }
  }
</style>