<template>
  <div :class="['sort',{one_sort:page}]">
    <div class="box" v-if="!page&&!isMobile">
      <div class="sort_title">
        <h1>项目列表</h1>
        <div class="input_box">
          <input type="text">
          <span class="input_btn iconfont">&#xe63e;</span>
        </div>
      </div>
      <div class="sort_body">
        <div class="item">
          <span>商品列表</span>
          <a :class="{active:$route.params.type==='1'}" href="javascript:;" @click="setType(1)">矿机</a>
          <a :class="{active:$route.params.type==='2'}" href="javascript:;" @click="setType(2)">云矿机</a>
        </div>
        <div class="item">
          <span>商品状态</span>
          <template v-if="$route.params.type==='1'">
            <a href="javascript:;" :class="{active:$parent.status==n.code}" v-for="n,k in nav" @click="setStatus(n.code)">{{n.title}}</a>
          </template>
          <template v-if="$route.params.type==='2'">
            <a href="javascript:;" :class="{active:$parent.status==n.code}" v-for="n,k in nav2" @click="setStatus(n.code)">{{n.title}}</a>
          </template>
        </div>
      </div>
      <div class="sort_allitems">
        <span class="sort_allitems_title">排序方式</span>
        <div :class="['item', 'next', {active1: activeOne==true}]" @click="setSort('all')">综合排序</div>
        <div :class="['item', {active: edit==k}, {up: !s.value},{active1: activeOne==false}]" v-for="s,k in sort" @click="setSort(k)">{{s.title}}<span class="iconfont">&#xe611;</span></div>
      </div>
    </div>
    <div class="mobile_sort" v-else-if="!page&&isMobile">
      <!-- <div class="type_img">
        <div class="item" @click="setType(1)">矿机</div>
        <div class="item" @click="setType(2)">云矿机</div>
      </div> -->
      <div class="mobile_sort_items">
        <template v-if="$route.params.type==='1'">
          <a class="item" href="javascript:;" :class="{active:$parent.status==n.code}" v-for="n,k in nav" @click="setStatus(n.code)">{{n.title}}</a>
        </template>
        <template v-if="$route.params.type==='2'">
          <a class="item" href="javascript:;" :class="{active:$parent.status==n.code}" v-for="n,k in nav2" @click="setStatus(n.code)">{{n.title}}</a>
        </template>
      </div>
    </div>
    <div class="sort_items" v-else>
      <div :class="['item', 'next', {active1: activeOne==true}]" @click="setSort('all')">默认</div>
      <div :class="['item', {active: edit==k}, {up: !s.value},{active1: activeOne==false}]" v-for="s,k in sort" @click="setSort(k)">{{s.title}}<span class="iconfont">&#xe611;</span></div>
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
      page: {
        type: String
      }
    },
    data () {
      return {
        nav: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热中'}, {code: 1, title: '热销中'}, {code: 2, title: '已售罄'}],
        nav2: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热中'}, {code: 5, title: '热销中'}, {code: 7, title: '已售罄'}],
        edit: -1,
        activeOne: true
      }
    },
    methods: {
      setSort (n) {
        this.activeOne = false
        this.edit = n
        var obj = this.sort[n]
        var str = ''
        for (let ele of this.sort) {
          if (obj !== ele) {
            ele.value = 0
          }
        }
        if (obj) {
          obj.value = +(!obj.value)
          str = obj.option[obj.value]
        } else {
          this.activeOne = true
        }
        if (this.$parent.getList) {
          this.$parent.getList(n)
        } else {
          this.$parent.$parent.getList(n)
        }
      },
      setStatus (n) {
        this.$parent.status = n
        this.$parent.fetchData()
      },
      setType (k) {
        this.$parent.status = 0
        this.$router.push({path: '/minerShop/miner/' + k})
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
  @import '../../assets/css/style.scss';
  .sort{
    padding-top:10px;
    padding-bottom:10px;
    color:$light_text;
    &:not(.one_sort){
      @include main
      padding-top:25px;
    }
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
            padding:0 15px;
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
        padding:0 15px;
        .item{
          height:120px;
          line-height: 120px;
          text-align: center;
          color:#fff;
          background: url(../../assets/images/mobile/miner.png);
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
          padding:0 15px;
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
        line-height: 20px;
        text-align: center;
        vertical-align: text-bottom;
        transition:all .3s;
        font-size: 26px;
        transform:rotate(180deg);
      }
      &.active{
        color:$blue;
      }
      &.up{
        .iconfont{
          transform:rotate(0deg);
        }
      }
    }
    .sort_items{
      @include flex
      .item{
        cursor: pointer;
        padding:0 30px;
        line-height: 40px;
        color:#999;
        & + .item{
          margin-left:50px
        }
      }
      .next{
        &.active1{
          color:$blue;
        }
      }
    }
  }
</style>
