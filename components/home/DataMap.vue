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
        bdcDots: [{title: '哈萨克斯坦', top: 96, left: 720}, {title: '内蒙古', top: 127, right: 200}, {title: '四川', top: 187, right: 330}, {title: '云南', top: 207, right: 230}, {title: '山西', top: 164, right: 210}, {title: '新疆', top: 137, right: 290}, {title: '俄罗斯', top: 47, right: 220}, {title: '美国', top: 130, left: 166}, {title: '加拿大', top: 79, left: 130}, {title: '欧洲', top: 116, left: 610}],
        btcDots: [{title: '', top: 66, left: 120}, {title: '', top: 102, left: 140}, {title: '', top: 137, left: 136}, {title: '', top: 145, left: 142}, {title: '', top: 210, left: 210}]
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
        display: inline-block;
        background: #fff;
        padding:5px 15px;
        border-radius:5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      }
      .point {
        &.point_dot {
          display: inline-block;
          width: 22px;
          height: 32px;
          background: url('~assets/images/home.png') -122px -129px;
          margin-right:5px;
        }
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
  }
</style>