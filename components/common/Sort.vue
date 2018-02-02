<template>
  <div class="sort">
    <div class="box" v-if="isMobile===0">
      <div class="sort_title">
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
      <div class="sort_items">
        <span class="sort_items_title">排序方式</span>
        <div :class="['item', 'next', {active1: !sort[edit]}]" @click="setSort()">综合排序</div>
        <div :class="['item', {active: (s.option.indexOf(sortText)>-1)&&edit==k}, {up: (s.option.indexOf(sortText)>-1)&&edit==k&&no==1}]" @click="setSort(k)" v-for="s,k in sort">
          <span>{{s.title}}</span>
          <span class="iconfont">&#xe611;</span>
        </div>
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
      sortNav: {
        type: Array
      },
      status: {
        type: Number
      }
    },
    data () {
      return {
        sort: [
          {title: '价格', option: ['price_asc', 'price_desc']},
          {title: '算力', option: ['base_asc','base_desc']},
          {title: '剩余总数', option: ['num_asc', 'num_desc']}
        ],
        edit: -1,
        no: -1,
        sortText: ''
      }
    },
    methods: {
      setSort (n) {
        if (this.edit === n) {
          if (this.no === 1) {
            this.no = 0
          } else {
            this.no = 1
          }
        } else {
          this.no = 0
        }
        this.edit = (n >= 0) ? n : -1
        let param = this.sort[n] ? this.sort[n].option[this.no] : ''
        this.sortText = param
        this.$emit('fetchData', param)
      },
      setStatus (n) {
        this.sortText = ''
        this.edit = -1
        this.no = -1
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
      .sort_items{
        @include flex
        background: #F5F5F5;
        padding:0 20px;
        .sort_items_title{
          color:$light_black;
          margin-right:30px;
        }
        .item{
          position: relative;
          cursor: pointer;
          line-height: 20px;
          color:#999;
          width: 120px;
          margin: 10px 0;
          border: solid #ddd;
          border-width: 0 0 0 1px;
          text-align: center;
          .iconfont{
            position: absolute;
            top: 2px;
            font-size: 26px;
            line-height: 32px;
            height: 14px;
            transition: all .3s;
            transform:rotate(0deg);
          }
          &.active{
            color:$blue;
          }
          &.up .iconfont{
            transform:rotate(180deg);
          }
          &:last-child{
            border-width: 0 1px 0 1px;
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
        @include flex(space-between)
        padding:0 0.2rem;
        border-bottom:1px solid $border;
        .item{
          padding:0 0.2rem;
          font-size: 0.26rem;
          line-height: 1rem;
          border-bottom:2px solid transparent;
          &.active{
            color:#FE5039;
            border-color:#FE5039
          }
        }
      }
    }
  }
</style>
