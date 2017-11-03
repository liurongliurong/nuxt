<template>
  <aside class="pager" v-if="len>1">
    <div class="pager_box">
      <span :class="{disabled:$parent.now<=1}" @click="getData($parent.now-1)">上一页</span>
      <template v-if="len<=7">
        <span v-for="i in len" :class="['pager_item', {active:i===$parent.now}]" @click="getData(i)">{{ i }}</span>
      </template>
      <template v-else>
        <span v-for="i in 3" :class="['pager_item', {active:i===$parent.now}]" @click="getData(i)">{{ i }}</span>
        <span v-if="$parent.leftSibling>4">...</span>
        <template v-if="$parent.now>3&&$parent.now<len-1">
          <span :class="['pager_item', {active:$parent.leftSibling===$parent.now}]" @click="getData($parent.leftSibling)">{{ $parent.leftSibling }}</span>
          <span :class="['pager_item', {active:$parent.rightSibling===$parent.now}]" @click="getData($parent.rightSibling)">{{ $parent.rightSibling }}</span>
        </template>
        <span v-if="$parent.rightSibling<len-2">...</span>
        <span :class="['pager_item', {active:len-1===$parent.now}]" @click="getData(len-1)">{{ len-1 }}</span>
        <span :class="['pager_item', {active:len===$parent.now}]" @click="getData(len)">{{ len }}</span>
      </template>
      <span :class="{disabled:$parent.now>=len}" @click="getData($parent.now+1,1)">下一页</span>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'pager',
    props: {
      len: {
        type: Number
      }
    },
    methods: {
      getData (p, type) {
        if (p <= 0 || p > this.len) return false
        this.$parent.now = p
        this.$parent.getList()
        if (type) {
          if (this.$parent.now >= this.len - 2) return false
          this.$parent.leftSibling = p
          this.$parent.rightSibling = this.$parent.leftSibling + 1
        } else {
          if (this.$parent.now <= 4) return false
          this.$parent.rightSibling = p
          this.$parent.leftSibling = this.$parent.rightSibling - 1
        }
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
