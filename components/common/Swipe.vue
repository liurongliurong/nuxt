<template>
  <section class="swiper" :class="[direction?'horizontal':'vertical',{'dragging':dragging}]" @touchstart="onTouchStart" ref="swiper-wrap">
    <div class="swiper-wrap" :style="{'transform':'translate3d('+translateX+'px,'+translateY+'px,0','transition-duration':transitionDuration+'ms', width: width*4+'px'}" @transitionend="onTransitionEnd">
      <div class="swiper_one" v-for="n,k in slideEls" @mousemove="onMouseover" :style="{width: width+'px'}">
        <div class="swiper_box" v-if="currentPage===k" :style="{width: width+'px'}">
          <template v-for="b in n">
            <img :src="require('@/assets/images/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-if="b===1">
            <img :src="require('@/assets/images/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-else :style="[{transform: 'translate3d('+offsetX+'px, '+offsetY+'px, 0px)'}]">
          </template>
          <router-link to="/cloudCompute/list/1/all" class="btn" v-if="k===5||k===1">即刻开始</router-link>
          <router-link to="/bdc" class="btn" v-else-if="k===2">查看详情</router-link>
          <router-link to="/user/computeProperty" class="btn" v-else-if="k===3">查看详情</router-link>
          <router-link to="/cloudCompute/list/1/all" class="btn" v-else-if="k===0||k===4">查看详情</router-link>
        </div>
        <div class="swiper_box" v-else :style="{width: width+'px'}">
          <img :src="require('@/assets/images/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-for="b in n">
        </div>
      </div>
    </div>
    <div class="swiper-pagination" v-show="paginationVisiable">
      <span class="swiper-pagination-bullet" :class="{'active':k+1===currentPage}" v-for="(slide,k) in banners" @click="paginationClickable && setPage(k+1)"></span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      direction: {
        type: Number,
        default: 1,
        validator: (value) => {
          return [1, 0].indexOf(value) > -1
        }
      },
      paginationVisiable: {
        type: Boolean,
        default: true
      },
      paginationClickable: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
      },
      speed: {
        type: Number,
        default: 500
      },
      autoPlay: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        banners: [1, 2, 2, 2],
        slideEls: [],
        currentPage: 1,
        lastPage: 1,
        delta: 0,
        dragging: false,
        transitioning: false,
        startPos: null,
        startTranslate: 0,
        translateX: 0,
        translateY: 0,
        transitionDuration: 0,
        offset: 0,
        t: '',
        initY: 50,
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
        document.addEventListener('mousemove', this.onTouchMove, false)
        document.addEventListener('touchend', this.onTouchEnd, false)
        document.addEventListener('mouseup', this.onTouchEnd, false)
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
          this.currentPage = this.banners.length
        }
        if (this.currentPage >= this.banners.length + 1) {
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
        document.removeEventListener('mousemove', this.onTouchMove)
        document.removeEventListener('mouseup', this.onTouchEnd)
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
        this.lastPage = this.currentPage
        this.currentPage = page
        this.setTranslate()
        this.transitioning = false
        this.transitionDuration = this.speed
      },
      next () {
        var page = this.currentPage
        if (page < this.banners.length || this.loop) {
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
        var translateName = this.direction ? 'translateX' : 'translateY'
        this[translateName] = value
      },
      getTouchPos (e) {
        var key = this.direction ? 'pageX' : 'pageY'
        return e.changedTouches ? e.changedTouches[0][key] : e[key]
      },
      onInit () {
        this.width = document.body.clientWidth || document.documentElement.clientWidth
        clearInterval(this.t)
        this.offset = this.$refs['swiper-wrap'][this.direction ? 'offsetWidth' : 'offsetHeight']
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        var arr = this.banners
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
  .swiper {
    position: relative;
    height: 520px;
    overflow: hidden;
    .swiper-wrap {
      display: flex;
      height: 100%;
      transition: all 0ms ease;
      .swiper_one{
        height: 100%;
        text-align: center;
        .swiper_box{
          position: relative;
          height: 100%;
          background: #0c1235 url('../../assets/images/banner.jpg');
          img{
            position: absolute;
            transition: all .2s;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            &:first-child{
              left:calc(50% - 590px);
            }
            &:nth-child(2){
              right:calc(50% - 590px);
            }
            @media screen and (max-width: 1178px) and (min-width: 340px){
              object-fit:contain
            }
          }
          a.btn{
            position: absolute;
            width:200px;
            height:50px;
            line-height: 50px;
            text-align: center;
            left:calc(50% - 590px);
            top:330px;
            color:#fff;
            border:1px solid #fff;
            border-radius:5px;
            font-size: 18px;
            &:hover{
              background: #fff;
              color:#1e396c
            }
          }
          img:first-child,a.btn{
            @media screen and (max-width: 1178px) and (min-width: 340px){
              left:0;
            }
          }
          img:nth-child(2){
            @media screen and (max-width: 1178px) and (min-width: 340px){
              right:0;
            }
          }
        }
        &:nth-child(6),&:nth-child(2){
          img{
            top:0;
            width:1180px;
            height:100%;
            @media screen and (max-width: 1178px) and (min-width: 340px){
              width:100%;
            }
          }
          a.btn{
            border-color:#327fff;
            background: #327fff;
            color:#fff;
            &:hover{
              border-color:#327fff;
              background: #327fff;
              color:#fff
            }
          }
        }
        &:nth-child(3) img:first-child{
          width:563px;
          top:calc(50% - 45px);
          height:90px;
        }
        &:nth-child(3) img:nth-child(2){
          top:calc(50% - 139.5px);
          width:532px;
          height:279px;
        }
        &:nth-child(4){
          img:first-child{
            width:626px;
            top:calc(50% - 44px);
            height:88px;
          }
        }
        &:nth-child(4){
          img:nth-child(2){
            top:calc(50% - 137.5px);
            width:404px;
            height:275px;
          }
        }
        &:nth-child(5),&:nth-child(1){
          img:first-child{
            width:493px;
            top:calc(50% - 54.5px);
            height:99px;
          }
        }
        &:nth-child(5),&:nth-child(1){
          img:nth-child(2){
            top:calc(50% - 143.5px);
            width:564px;
            height:287px;
          }
        }
      }
    }
    &.horizontal {
      flex-direction: row;
      .swiper-pagination .swiper-pagination-bullet{
        margin: 0 3px;
      }
    }
    &.vertical {
      flex-direction: column;
      .swiper-pagination {
        right: 10px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        .swiper-pagination-bullet{
          margin: 6px 0;
        }
      }
    }
    &.vertical,&.horizontal{
      .swiper-pagination {
        bottom: 20px;
        width: 100%;
        text-align: center;
      }
    }
    .swiper-pagination {
      position: absolute;
      .swiper-pagination-bullet {
        display: inline-block;
        width: 80px;
        border-bottom: 2px solid #000000;
        border-top:3px solid transparent;
        opacity: .2;
        transition: all 4s ease;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid #fff;
          opacity: 1;
        }
      }
    }
  }
</style>
