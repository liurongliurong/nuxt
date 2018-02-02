<template>
  <section class="swiper" ref="swiper-wrap">
    <div :class="'swiper_wrap '+effect" :style="boxStyle">
      <div :class="['swiper_one', {active: k===currentPage}]" v-for="n,k in data" @mousemove="onMouseover">
        <img :src="n.img" alt="">
        <router-link class="btn" :to="n.link"><span class="swiper_arrow"></span>{{n.text}}</router-link>
      </div>
    </div>
    <div class="swiper-pagination" v-if="paginationVisiable">
      <span class="swiper-pagination-bullet" :class="{'active':k===currentPage}" v-for="slide,k in data" @click="setPage(k)"></span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      data: {
        type: Array
      },
      paginationVisiable: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: false
      },
      speed: {
        type: Number,
        default: 1000
      },
      autoPlay: {
        type: Number,
        default: 3000
      },
      effect: {
        type: String,
        default: 'fade'
      }
    },
    data () {
      return {
        currentPage: 0,
        translate: 0,
        transitionDuration: 0,
        offset: 0,
        t: '',
        offsetX: 0,
        offsetY: 0,
        width: 0,
        boxStyle: {},
        itemStyle: {}
      }
    },
    mounted () {
      this.onInit()
      window.addEventListener('resize', this.onResize, false)
    },
    destroyed () {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      onMouseover (e) {
        clearInterval(this.t)
        this.t = ''
        var w = window.innerWidth
        var h = window.innerHeight
        // this.offsetX = e.clientX / w * 40
        // this.offsetY = e.clientY / h * 20
        setTimeout(() => {
          if (this.t === '' && this.autoPlay) {
            this.t = setInterval(() => {
              this.next()
            }, this.autoPlay)
          }
        }, 3000)
      },
      onResize () {
        this.currentPage = 1
        this.onInit()
      },
      onTransitionEnd () {
        this.transitionDuration = 0
        if (this.currentPage <= 0) {
          this.currentPage = this.data.length
        }
        if (this.currentPage >= (this.data.length + 1)) {
          this.currentPage = 0
        }
        if (this.autoPlay) {
          setTimeout(() => {
            this.setTranslate()
          }, 1000)
        }
        if (this.t === '' && this.autoPlay) {
          this.t = setInterval(() => {
            this.next()
          }, this.autoPlay)
        }
      },
      setPage (page, e) {
        this.currentPage = page
        this.setTranslate()
        this.transitionDuration = this.speed
      },
      next () {
        var page = this.currentPage
        var total = this.data.length
        total = this.loop ? (total + 1) : total
        if (!this.loop) {
          page = (page + 1) >= total ? 0 : (page + 1)
        } else {
          page = (page + 1) > total ? total : (page + 1)
        }
        this.setPage(page)
      },
      prev () {
        var page = this.currentPage
        if (page > 1 || this.loop) {
          this.setPage(page - 1)
        } else {
          this.setPage(page)
        }
      },
      setTranslate () {
        this.translate = this.currentPage * -this.offset
        if (this.effect === 'translate') {
          this.boxStyle = Object.assign(this.boxStyle, {'transform':'translate('+this.translate+'px,0px)'})
        }
        if (this.loop) {
          setTimeout(this.onTransitionEnd, this.speed + 500)
        }
      },
      onInit () {
        this.width = document.body.clientWidth || document.documentElement.clientWidth
        if (this.effect === 'fade') {
          this.boxStyle = {'transition-duration':this.speed+'ms', width: this.width+'px'}
        } else if (this.effect === 'translate') {
          this.boxStyle = {'transition-duration':this.speed+'ms', width: this.width*this.data.length+'px'}
        }
        clearInterval(this.t)
        this.offset = this.$refs['swiper-wrap']['offsetWidth']
        if (this.autoPlay) {
          this.t = setInterval(() => {
            this.next()
          }, this.autoPlay)
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .swiper {
    position: relative;
    overflow: hidden;
    .swiper_wrap {
      overflow: hidden;
      transition: all 0ms ease;
      height:420px;
      .swiper_one{
        float: left;
        width:100vw;
      }
      &.fade{
        .swiper_one{
          @include position
          transition: all 1s ease;
          float: none;
          opacity: 0;
          &.active{
            opacity:1;
          }
        }
      }
    }
    .swiper-pagination {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      .swiper-pagination-bullet {
        display: inline-block;
        width: 80px;
        border-bottom: 2px solid #000000;
        border-top:3px solid transparent;
        opacity: .2;
        transition: all 2s ease;
        cursor: pointer;
        margin: 0 3px;
        &.active {
          border-bottom: 2px solid #fff;
          opacity: 1;
        }
      }
      @media screen and (max-width: $mobile) {
        bottom: 2px;
        .swiper-pagination-bullet{
          width: 10px;
          border-bottom: 10px solid #000000;
          border-top:0;
          border-radius:50%;
          &.active {
            border-bottom: 10px solid #fff;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
