<template>
  <aside class="pager" v-if="len>1">
    <div class="pager_box">
      <span :class="{disabled:now<=1}" @click="getData(now-1)">上一页</span>
      <!-- <template v-if="len<=7"> -->
        <span v-for="i in len" :class="['pager_item', {active:i===now}]" @click="getData(i)">{{ i }}</span>
      <!-- </template> -->
      <!-- <template v-else>
        <span v-for="i in 3" :class="['pager_item', {active:i===now}]" @click="getData(i)">{{ i }}</span>
        <span v-if="leftSibling>4">...</span>
        <template v-if="now>3&&now<len-1">
          <span :class="['pager_item', {active:leftSibling===now}]" @click="getData(leftSibling)">{{ leftSibling }}</span>
          <span :class="['pager_item', {active:rightSibling===now}]" @click="getData(rightSibling)">{{ rightSibling }}</span>
        </template>
        <span v-if="rightSibling<len-2">...</span>
        <span :class="['pager_item', {active:len-1===now}]" @click="getData(len-1)">{{ len-1 }}</span>
        <span :class="['pager_item', {active:len===now}]" @click="getData(len)">{{ len }}</span>
      </template> -->
      <span :class="{disabled:now>=len}" @click="getData(now+1,1)">下一页</span>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'pager',
    props: {
      len: {
        type: Number
      },
      now: {
        type: Number
      }
    },
    methods: {
      getData (p, type) {
        if (p <= 0 || p > this.len) return false
        this.$emit('setPage', p)
        // if (type) {
        //   if (this.now >= this.len - 2) return false
        //   this.leftSibling = p
        //   this.rightSibling = this.leftSibling + 1
        // } else {
        //   if (this.now <= 4) return false
        //   this.rightSibling = p
        //   this.leftSibling = this.rightSibling - 1
        // }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .pager{
    padding-top:80px;
    padding-bottom:50px;
    .pager_box{
      @include pager
    }
  }
</style>
