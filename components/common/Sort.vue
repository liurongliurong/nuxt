<template>
  <div class="sort">
    <div class="box" v-if="isMobile===0">
      <div class="sort_title" v-if="!page">
        <h1>项目列表</h1>
        <!-- <div class="input_box">
          <input type="text">
          <span class="input_btn iconfont">&#xe63e;</span>
        </div> -->
      </div>
      <div class="sort_body" v-if="sortNav">
        <div class="item" v-for="s,i in sortNav" v-if="sortNav">
          <span>{{s.title}}</span>
          <a href="javascript:;" :class="{active:status==n.code}" v-for="n,k in s.options" @click="setStatus(n.code)">{{n.title}}</a>
        </div>
      </div>
      <div class="sort_allitems">
        <span class="sort_allitems_title">排序方式</span>
        <div :class="['item', 'next', {active1: !sort[edit]}]" @click="setSort()">综合排序</div>
        <div :class="['item', {active: edit==k}, {up: edit!=k},{active1: sort[edit]}]" v-for="s,k in sort" @click="setSort(k)">{{s.title}}<span class="iconfont">&#xe611;</span></div>
      </div>
    </div>
    <div class="mobile_sort" v-else-if="isMobile===1">
      <div class="mobile_sort_items" v-for="s,i in sortNav" v-if="sortNav">
        <a class="item" href="javascript:;" :class="{active:status==n.code}" v-for="n,k in s.options" @click="setStatus(n.code)">{{n.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      sort: {
        type: Array
      },
      sortNav: {
        type: Array
      },
      status: {
        type: Number
      }
    },
    data () {
      return {
        edit: -1
      }
    },
    methods: {
      setSort (n) {
        if (this.edit === n) {
          this.edit = -1
        } else {
          this.edit = (n >= 0) ? n : -1
        }
        n = (this.edit !== -1) ? n : ''
        this.$emit('fetchData', n)
      },
      setStatus (n) {
        this.$emit('setStatus', n)
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .sort{
    padding-bottom:10px;
    padding-top:25px;
    color:$light_text;
    @include main
    .box{
      background: $white;
      box-shadow:0px 0px 15px 0px rgba(63, 71, 84, 0.37);
      .sort_title{
        padding:15px 20px;
        border-bottom: 1px dashed #eee;
        @include flex(space-between)
        h1:before{
          font-family:"iconfont" !important;
          content:'\e648';
          margin-right:5px;
          color:#999;
        }
        .input_box{
          position: relative;
          input{
            border:1px solid $border;
            line-height: 2;
            height:30px;
            padding-left:10px;
            padding-right:40px;
          }
          .input_btn{
            @include position(0,auto,auto,5)
            font-size: 20px;
            border-left:1px solid $border;
            padding-left:5px;
            cursor: pointer;
          }
        }
      }
      .sort_body{
        padding:15px 20px;
        .item{
          span{
            color:$light_black;
            margin-right:30px;
          }
          a{
            display: inline-block;
            padding:0 5px;
            border-radius:5px;
            line-height: 1.8;
            border:1px solid transparent;
            &.router-link-active,&.active{
              @include button($blue)
            }
          }
          & + .item{
            margin-top:15px;
          }
        }
      }
      .sort_allitems{
        @include flex
        background: #F5F5F5;
        padding:0 20px;
        .sort_allitems_title{
          color:$light_black;
          margin-right:30px;
        }
        .item{
          cursor: pointer;
          padding-left:20px;
          line-height: 40px;
          color:#999;
          &:before{
            content:'|';
            color:#ddd;
            margin-right:20px
          }
          &:last-child:after{
            content:'|';
            color:#ddd;
            margin-left:15px
          }
          &:nth-child(2){
            padding-left:0
          }
        }
        .next{
          &.active1{
            color:$blue;
          }
        }
      }
    }
    .mobile_sort{
      margin-top:-25px;
      .type_img{
        @include row(2,3%)
        padding:0 5px;
        .item{
          height:120px;
          line-height: 120px;
          text-align: center;
          color:#fff;
          background-size: 100% 100%;
          font-size: 0.6rem;
        }
      }
      .mobile_sort_items{
        background: #fff;
        // margin-top:15px;
        @include flex(space-between)
        padding:0 20px;
        border-bottom:1px solid $border;
        .item{
          padding:0 5px;
          font-size: 0.5rem;
          line-height: 1.6rem;
          border-bottom:2px solid transparent;
          &.active{
            color:#FE5039;
            border-color:#FE5039
          }
        }
      }
    }
    .box .item,.sort_items .item{
      .iconfont{
        @include block(24)
        height:16px;
        line-height: 40px;
        text-align: center;
        vertical-align: text-bottom;
        font-size: 26px;
        transition: all .3s;
        transform:rotate(180deg);
        position: relative;
        top: -9px;
      }
      &.active{
        color:$blue;
        .iconfont{
          position: relative;
          top: 10px;
        }
      }
      &.up{
        .iconfont{
          transform:rotate(0deg);
        }
      }
    }
  }
</style>
