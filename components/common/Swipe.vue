<template>
  <section class="swiper" :class="[{'dragging':dragging}]" @touchstart="onTouchStart" ref="swiper-wrap">
    <div class="swiper_wrap" :style="{'transform':'translate('+translateX+'px,0px','transition-duration':transitionDuration+'ms', width: (oneWidth||width)*slideEls.length+'px'}">
      <template v-if="!data">
        <div class="swiper_one" v-for="n,k in slideEls" @mousemove="onMouseover" :style="{width: width+'px'}">
          <div class="swiper_box" :style="{width: width+'px'}">
            <template v-if="currentPage===k">
              <template v-for="b in n">
                <img :src="require('@/assets/images/swiper/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-if="b===1">
                <img :src="require('@/assets/images/swiper/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-else :style="[{transform: 'translate('+offsetX+'px, '+offsetY+'px)'}]">
              </template>
            </template>
            <template v-else>
              <img :src="require('@/assets/images/swiper/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-for="b in n">
            </template>
            <router-link to="/minerShop/list" class="btn" v-if="k===5||k===1">即刻开始</router-link>
            <router-link to="/bdc" class="btn" v-else-if="k===2">查看详情</router-link>
            <router-link to="/user/computeProperty" class="btn" v-else-if="k===3">查看详情</router-link>
            <router-link to="/minerShop/activity" class="btn" v-else="k===0||k===4">立即抢购</router-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="swiper_one"  :style="{width:oneWidth+'px'}" v-for="n,k in slideEls">
          <template v-if="n.name">
            <div class="left">
              <img :src="require('@/assets/images/header.png')" class="header"/>
              <img :src="require('@/assets/images/color.png')" class="index"/> 
              <h5>{{n.name}}</h5>
              <p>{{n.time}}</p>
            </div>
            <div class="right">{{n.content}}</div>
          </template>
          <template v-else>
            <router-link to="/minerShop/activity" v-if="k<=1">
              <img :src="require('@/assets/images/swiper/mobile1.jpg')" alt="">
            </router-link>
            <router-link to="/bdc" v-else-if="k>=3">
              <img :src="require('@/assets/images/swiper/mobile3.jpg')" alt="">
            </router-link>
            <router-link to="/mobile/personcenter" v-else>
              <img :src="require('@/assets/images/swiper/mobile2.jpg')" alt="">
            </router-link>
          </template>
        </div>
      </template>
    </div>
    <div class="swiper-pagination" v-show="paginationVisiable">
      <span class="swiper-pagination-bullet" :class="{'active':k+1===currentPage}" v-for="(slide,k) in (data||banners)" @click="setPage(k+1)"></span>
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
        banners: [1, 2, 2, 2],
        bannersMobile: 5,
        slideEls: [],
        currentPage: 1,
        delta: 0,
        dragging: false,
        transitioning: false,
        startPos: null,
        startTranslate: 0,
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
        if (this.transitioning) return false
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
      onTouchStart (e) {
        this.startPos = this.getTouchPos(e)
        this.delta = 0
        this.startTranslate = this.currentPage * -this.offset
        this.startTime = new Date().getTime()
        this.dragging = true
        this.transitionDuration = 0
        document.addEventListener('touchmove', this.onTouchMove, false)
        document.addEventListener('touchend', this.onTouchEnd, false)
        clearInterval(this.t)
        this.t = ''
      },
      onResize () {
        this.currentPage = 1
        this.onInit()
      },
      onTransitionEnd () {
        this.transitioning = false
        this.transitionDuration = 0
        this.delta = 0
        if (this.currentPage <= 0) {
          this.currentPage = this.data ? this.data.length : this.banners.length
        }
        if (this.currentPage >= (this.data ? (this.data.length + 1) : (this.banners.length + 1))) {
          this.currentPage = 1
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
      onTouchMove (e) {
        e.preventDefault()
        this.delta = this.getTouchPos(e) - this.startPos
        this.setTranslate(this.startTranslate + this.delta)
      },
      onTouchEnd (e) {
        document.removeEventListener('touchmove', this.onTouchMove)
        document.removeEventListener('touchend', this.onTouchEnd)
        if (this.delta === 0) return false
        this.dragging = false
        this.transitionDuration = this.speed
        var isQuickAction = new Date().getTime() - this.startTime < 1000
        if (this.delta < -100 || (isQuickAction && this.delta < 50)) {
          this.next()
        } else if (this.delta > 100 || (isQuickAction && this.delta > 50)) {
          this.prev()
        } else {
          this.setPage(this.currentPage)
        }
      },
      setPage (page, e) {
        this.currentPage = page
        this.setTranslate()
        this.transitioning = false
        this.transitionDuration = this.speed
      },
      next () {
        var page = this.currentPage
        if ((page < (this.data ? this.data.length : this.banners.length)) || this.loop) {
          this.setPage((page + 1) > 5 ? 5 : (page + 1))
        } else {
          this.setPage(this.currentPage)
        }
      },
      prev () {
        var page = this.currentPage
        if (page > 1 || this.loop) {
          this.setPage(page - 1)
        } else {
          this.setPage(this.currentPage)
        }
      },
      setTranslate (value) {
        if (!value) {
          value = this.currentPage * -this.offset
        }
        this.translateX = value
        setTimeout(this.onTransitionEnd, this.speed + 500)
      },
      getTouchPos (e) {
        return e.changedTouches ? e.changedTouches[0]['pageX'] : e['pageX']
      },
      onInit () {
        this.width = document.body.clientWidth || document.documentElement.clientWidth
        clearInterval(this.t)
        this.offset = this.oneWidth || this.$refs['swiper-wrap']['offsetWidth']
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        var arr = this.data || this.banners
        this.slideEls = [arr[arr.length - 1], ...arr, arr[0]]
        if (this.loop) {
          this.setTranslate()
        }
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
