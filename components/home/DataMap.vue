<template>
  <div class="data_map">
    <img :src="img"/>
    <div class="point-area" style="top: 96px; left: 720px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>哈萨克斯坦算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
    <div class="point-area" style="top: 197px; right: 230px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>云南算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
    <div class="point-area" style="top: 147px; right: 210px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>山西算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
    <div class="point-area" style="top: 137px; right: 280px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>新疆算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
    <div class="point-area" style="top: 47px; right: 220px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>俄罗斯算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
    <div class="point-area" style="top: 130px;left: 166px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>美国算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
    <div class="point-area" style="top:79px; left: 130px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">
      <a class="point point-dot"></a>
      <div class="split">
        <h1>加拿大算力中心节点</h1>
        <p>1624.46 PH/s</p>
      </div>
      <div class="point point-10"></div>
      <div class="point point-40"></div>
      <div class="point point-shadow point-80"></div>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'chart',
    data () {
      return {
        img: require('@/assets/images/world.png')
      }
    },
    methods: {
      test () {
        console.log(11)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .data_map{
    position: relative;
    .point-area {
            text-align: center;
            position: relative;
            width: 150px;
            height: 150px;
            -webkit-transition: opacity .5s ease-out;
            -ms-transition: opacity .5s ease-out;
            transition: opacity .5s ease-out;
            &:hover .split{
              display:block;
            }
        }
        .split{
          min-width: 305px;
          height: 96px;
          margin-left: 58px;
          margin-top: 58px;
          position: relative;
          display: none;
          background-image: url('../../assets/images/one.jpg');
          h1{
            position: absolute;
            left: 106px;
            top: 26px;
            font-size: 16px;
            padding-right: 20px;
            width: 100%;
            text-align: left;
          }
          p{
            position: absolute;
            left: 106px;
            top: 56px;
            font-size: 16px;
          }
        }
        a{color: #349ee8;}

        .point-area .point {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 10px;
             height: 10px; 
            margin: auto;
            -webkit-border-radius: 50%;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 50%;
            -moz-background-clip: padding;
            border-radius: 50%;
            background-clip: padding-box;
            background: transparent;
        }
        .point-area .point-dot {
            z-index: 1;
            background-color: #349ee8;
            border: 1px solid #349ee8;
        }
        .point-area .point-10:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 225ms infinite;
            -ms-animation: ripple 4.5s ease-out 225ms infinite;
            animation: ripple 4.5s ease-out 225ms infinite;
        }
        .point-area .point-40:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out .9s infinite;
            -ms-animation: ripple 4.5s ease-out .9s infinite;
            animation: ripple 4.5s ease-out .9s infinite;
        }
        .point-area .point-80:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 1.8s infinite;
            -ms-animation: ripple 4.5s ease-out 1.8s infinite;
            animation: ripple 4.5s ease-out 1.8s infinite;
        }
        .point-area .point-shadow:after {
            box-shadow: inset 0 0 5em rgba(0,205,236,.16);
        }
        .point-area .point-10 {
            width: 100%;
            height: 100%
        }



        .point-area .point-20 {
            width: 100%;
            height: 100%
        }


        .point-area .point-30 {
            width: 100%;
            height: 100%
        }
        .point-area .point-30:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 675ms infinite;
            -ms-animation: ripple 4.5s ease-out 675ms infinite;
            animation: ripple 4.5s ease-out 675ms infinite
        }

        .point-area .point-40 {
            width: 100%;
            height: 100%
        }

        .point-area .point-50 {
            width: 100%;
            height: 100%
        }

        .point-area .point-50:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 1125ms infinite;
            -ms-animation: ripple 4.5s ease-out 1125ms infinite;
            animation: ripple 4.5s ease-out 1125ms infinite
        }

        .point-area .point-60 {
            width: 100%;
            height: 100%
        }

        .point-area .point-60:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 1.35s infinite;
            -ms-animation: ripple 4.5s ease-out 1.35s infinite;
            animation: ripple 4.5s ease-out 1.35s infinite
        }

        .point-area .point-70 {
            width: 100%;
            height: 100%
        }

        .point-area .point-70:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 1575ms infinite;
            -ms-animation: ripple 4.5s ease-out 1575ms infinite;
            animation: ripple 4.5s ease-out 1575ms infinite
        }

        .point-area .point-80 {
            width: 100%;
            height: 100%
        }

        .point-area .point-80:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 1.8s infinite;
            -ms-animation: ripple 4.5s ease-out 1.8s infinite;
            animation: ripple 4.5s ease-out 1.8s infinite
        }

        .point-area .point-90 {
            width: 100%;
            height: 100%
        }

        .point-area .point-90:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 2025ms infinite;
            -ms-animation: ripple 4.5s ease-out 2025ms infinite;
            animation: ripple 4.5s ease-out 2025ms infinite
        }

        .point-area .point-100 {
            width: 100%;
            height: 100%
        }

        .point-area .point-100:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #349ee8;
            opacity: 0;
            -webkit-animation: ripple 4.5s ease-out 2.25s infinite;
            -ms-animation: ripple 4.5s ease-out 2.25s infinite;
            animation: ripple 4.5s ease-out 2.25s infinite
        }


        /*帧动画start*/
        @-webkit-keyframes ripple {
            0% {
                opacity: 0;
                -webkit-transform: scale(.1);
            }

            5% {
                opacity: 1
            }

            to {
                opacity: 0;
                -webkit-transform: scale(1);
            }
        }

        @-ms-keyframes ripple {
            0% {
                opacity: 0;
                -ms-transform: scale(.1)
            }

            5% {
                opacity: 1
            }

            to {
                opacity: 0;
                -ms-transform: scale(1)
            }
        }

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