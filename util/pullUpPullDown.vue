<template>
  <div class="plugin_pull" 
  @touchstart="touchStart($event)" 
  @touchmove="touchMove($event)" 
  @touchend="touchEnd()" 
  @scroll="onScroll($event)"
  :style="{transform:'translate3d(0, '+pullHeight+'rem, 0)'}"
  :class="{'rollback': rollback}"
  >
    <div class="refresh">
      <div v-show='pull_down'><span>下拉刷新</span></div>
      <div v-show='release'><span>释放刷新</span></div>
      <div v-show='refresh'><span>正在刷新</span></div>
    </div>
    <slot></slot>
    <div class="pullup" v-show="show_loading">加载中</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show_loading: false,
        pull_down: false,
        release: false,
        refresh: false,
        startY: 0,
        pullHeight: -1,
        rollback: false
      }
    },
    props: {
      loadMore: {},
      refreshPage: {}
    },
    methods: {
      onScroll(e) {
        if(this.show_loading) {
          return false
        }
        let scrollHeight = e.target.scrollHeight - 100, 
          clientHeight = e.target.clientHeight,
          scrollTop = e.target.scrollTop
        if (scrollHeight <= clientHeight + scrollTop) {
          this.show_loading = true
          this.loadMore(this.loadMoreEnd)
        }
      },
      loadMoreEnd() {
        console.log("end")
        // this.show_loading = false
      },
      touchStart($event) {
        this.startY = $event.targetTouches[0].pageY
        this.pull_down=true //初始化
        this.refresh=false
        this.release=false
        
      },
      touchMove($event) {
         let diff = $event.targetTouches[0].pageY - this.startY
        if(this.$el.scrollTop == 0 && diff >= 0){
           this.pullHeight = diff/100
        }
        if(this.pullHeight>2){
          this.pull_down=false
          this.release=true
        }
        
      },
      touchEnd() {
        if(this.pullHeight > 2){
          this.rollback = true
          this.pullHeight = 0
          this.$el.addEventListener('transitionend', this.touchEndListener)
        } else{
           this.refreshEnd()
        }  
      },
      touchEndListener(){
        this.release=false
        this.refresh=true
        this.refreshPage(this.refreshEnd)//传回的函数
        this.$el.removeEventListener('transitionend', this.touchEndListener)
      },
      refreshEnd(){//刷新结束后
        this.$el.addEventListener('transitionend', this.refreshEndListener)
        this.pullHeight = -1
      },
      refreshEndListener(){
        this.rollback = false
        this.$el.removeEventListener('transitionend', this.refreshEndListener)
      },
    }
  }
</script>
<style>
  .plugin_pull {
    width: 100%;
    height: 100%;
    overflow: auto;
    height: calc(100% + 1rem);
    font-size: 0.3rem
  }
  .plugin_pull.rollback {
    transition: transform .5s;
  }
  .plugin_pull .refresh {
    height: 1rem;
    position: relative;
    overflow: hidden;
    /* margin-top: -1rem; */
  }
  .plugin_pull .refresh div {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .plugin_pull .refresh span{
    margin: 0 auto;
  }
</style>
