<template>
  <section class="swiper" ref="swiper-wrap">
    <div class="swiper_wrap" :style="{'transform':'translate('+translateX+'px,0px','transition-duration':transitionDuration+'ms', width: (oneWidth||width)*data.length+'px'}">
      <div class="swiper_one"  :style="{width:width+'px'}" v-for="n,k in data" @mousemove="onMouseover">
        <img :src="n.img" alt="">
        <router-link class="btn" :to="n.link"><span class="swiper_arrow"></span>{{n.text}}</router-link>
      </div>
    </div>
    <div class="swiper-pagination" v-if="paginationVisiable">
      <span class="swiper-pagination-bullet" :class="{'active':k===currentPage}" v-for="slide,k in data" @click="setPage(k)"></span>
    </div>
    <template v-if="button">
      <div class="prev" @click="prev"><</div>
      <div class="next" @click="next">></div>
    </template>
  </section>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      button: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array
      },
      oneWidth: {
        type: String
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
      }
    },
    data () {
      return {
        currentPage: 0,
        translateX: 0,
        transitionDuration: 0,
        offset: 0,
        t: '',
        offsetX: 0,
        offsetY: 0,
        width: 0
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
        this.offsetX = e.clientX / w * 40
        this.offsetY = e.clientY / h * 20
        var self = this
        setTimeout(() => {
          if (this.t === '' && this.autoPlay) {
            self.t = setInterval(() => {
              self.next()
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
        this.translateX = this.currentPage * -this.offset
        if (this.loop) {
          setTimeout(this.onTransitionEnd, this.speed + 500)
        }
      },
      onInit () {
        this.width = document.body.clientWidth || document.documentElement.clientWidth
        clearInterval(this.t)
        this.offset = this.oneWidth || this.$refs['swiper-wrap']['offsetWidth']
        // var arr = this.data
        // if (this.loop) {
        //   this.setTranslate()
        //   this.slideEls = [arr[arr.length - 1], ...arr, arr[0]]
        // } else {
        //   this.currentPage = 0
        //   this.slideEls = arr
        // }
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
      .swiper_one{
        float: left;
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
        transition: all 4s ease;
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
