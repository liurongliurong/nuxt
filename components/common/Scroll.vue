<template lang="html">
  <div class="scroll" :class="{down:state===0,up:state==1,refresh:state===2,touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull_refresh">
        <slot name="pull_refresh">
           <span class="down_tip">下拉更新</span>
           <span class="up_tip">松开更新</span>
           <span class="refresh_tip">更新中</span>
        </slot>
      </header>
      <slot></slot>
      <footer class="load_more">
        <slot name="load_more">
          <span>加载中……</span>
        </slot>
      </footer>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      offset: {
        type: Number,
        default: 40
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      }
    },
    data() {
      return {
        top: 0,
        state: 0,
        startY: 0,
        touching: false,
        infiniteLoading: false
      }
    },
    methods: {
      touchStart(e) {
        this.startY = e.targetTouches[0].pageY
        this.startScroll = this.$el.scrollTop || 0
        this.touching = true
      },
      touchMove(e) {
        if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
          return
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if (diff > 0) e.preventDefault()
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
        if (this.state === 2) {
          return
        }
        if (this.top >= this.offset) {
          this.state = 1
        } else {
          this.state = 0
        }
      },
      touchEnd(e) {
        if (!this.enableRefresh) return
        this.touching = false
        if (this.state === 2) {
          this.state = 2
          this.top = this.offset
          return
        }
        if (this.top >= this.offset) {
          this.refresh()
        } else {
          this.state = 0
          this.top = 0
        }
      },
      refresh() {
        this.state = 2
        this.top = this.offset
        this.onRefresh(this.refreshDone)
      },
      refreshDone() {
        this.state = 0
        this.top = 0
      },
      infinite() {
        this.infiniteLoading = true
        this.onInfinite(this.infiniteDone)
      },
      infiniteDone() {
        this.infiniteLoading = false
      },
      onScroll(e) {
        if (!this.enableInfinite || this.infiniteLoading) {
          return
        }
        let outerHeight = this.$el.clientHeight
        let innerHeight = this.$el.querySelector('.inner').clientHeight
        let scrollTop = this.$el.scrollTop
        let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull_refresh').clientHeight : 0
        let infiniteHeight = this.$el.querySelector('.load_more').clientHeight
        let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
        if (bottom < infiniteHeight) this.infinite()
      }
    }
  }
</script>

<style lang="scss">
  .scroll {
    position: absolute;
    top: 2.5rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #ddd;
    .inner {
      position: absolute;
      top: -2rem;
      width: 100%;
      transition-duration: 300ms;
      .pull_refresh {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .down_tip, .refresh_tip, .up_tip {
          display: none;
        }
      }
      .load_more {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &.touch .inner {
      transition-duration: 0ms;
    }
    &.down .inner {
      transition-duration: 0ms;
      .down_tip {
        display: block;
      }
    }
    &.up .up_tip {
      display: block;
    }
    &.refresh .refresh_tip {
      display: block;
    }
  }
</style>