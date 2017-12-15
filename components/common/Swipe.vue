<template>
  <section class="swiper" ref="swiper-wrap">
    <div class="swiper_wrap" :style="{'transform':'translate('+translateX+'px,0px','transition-duration':transitionDuration+'ms', width: (oneWidth||width)*slideEls.length+'px'}">
      <template v-if="!data">
        <div class="swiper_one" v-for="n,k in slideEls" @mousemove="onMouseover" :style="{width: width+'px'}">
          <div class="swiper_box" :style="{width: width+'px'}">
            <!-- <template v-if="currentPage===k">
              <template v-for="b in n">
                <img :src="require('@/assets/images/swiper/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-if="b===1">
                <img :src="require('@/assets/images/swiper/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-else :style="[{transform: 'translate('+offsetX+'px, '+offsetY+'px)'}]">
              </template>
            </template>
            <template v-else>
              <img :src="require('@/assets/images/swiper/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" v-for="b in n">
            </template> -->
            <img :src="require('@/assets/images/swiper/'+(k===0?'2':k===3?'1':k)+'_'+b+'.jpg')" v-for="b in n">
            <router-link to="/bdc" class="btn" v-if="k===5||k===1"><span class="swiper_arrow"></span>前往申请机位</router-link>
            <!-- <router-link to="/bdc" class="btn" v-else-if="k===2">查看详情</router-link>
            <router-link to="/user/computeProperty" class="btn" v-else-if="k===3">查看详情</router-link> -->
            <router-link to="/minerShop/list" class="btn" v-else="k===0||k===4"><span class="swiper_arrow"></span>开启挖矿之旅</router-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="swiper_one"  :style="{width:oneWidth+'px'}" v-for="n,k in slideEls">
          <template v-if="n.name">
            <div class="left">
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
        banners: [1, 1],
        slideEls: [],
        currentPage: 1,
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
      setPage (page, e) {
        this.currentPage = page
        this.setTranslate()
        this.transitionDuration = this.speed
      },
      next () {
        var page = this.currentPage
        var total = this.data ? this.data.length : this.banners.length
        total = this.loop ? (total + 1) : total
        page = (page + 1) > total ? total : (page + 1)
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
        setTimeout(this.onTransitionEnd, this.speed + 500)
      },
      onInit () {
        this.width = document.body.clientWidth || document.documentElement.clientWidth
        clearInterval(this.t)
        this.offset = this.oneWidth || this.$refs['swiper-wrap']['offsetWidth']
        var arr = this.data || this.banners
        if (this.loop) {
          this.setTranslate()
          this.slideEls = [arr[arr.length - 1], ...arr, arr[0]]
        } else {
          this.slideEls = arr
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
        .swiper_box .btn{
          .swiper_arrow{
            margin-right:5px;
          }
          .swiper_arrow:before{
            content:'';
            @include triangle
          }
          .swiper_arrow:after{
            content:'';
            @include triangle
            border-left-width:8px;
            border-top-width:5px;
            border-bottom-width:5px;
          }
        }
        &:nth-child(2),&:nth-child(4){
          .swiper_box .btn{
            .swiper_arrow:before{
              border-left-color:#FC5137
            }
            .swiper_arrow:after{
              border-left-color:#FF9F02
            }
          }
        }
        &:nth-child(1),&:nth-child(3){
          .swiper_box .btn{
            .swiper_arrow:before{
              border-left-color:#015FFF
            }
            .swiper_arrow:after{
              border-left-color:#7EAFFC
            }
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
