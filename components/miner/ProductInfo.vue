<template>
  <div class="product_info">
    <div :class="['info_ul', {fix_top:isFixTop}]">
      <div class="info_box">
        <div :class="['info_li',{'active': contentShow===m}]" v-for="d,m in params2!=='1'?cloudInfo:minerInfo" @click="tabs(m,d.name)">{{d.title}}</div>
      </div>
    </div>
    <div class="content_items">
      <div class="product_img">
        <div class="pro_name">{{detail.name}}</div>
        <div class="pro_slogan">{{detail.slogan}}</div>
        <div class="pro_resume">{{detail.resume}}</div>
        <img class="pro_img" :src="require('@/assets/images/miner_shop/miner_img.jpg')" alt="">
        <img class="params_img" :src="params2!=='1'?detail.product_img:detail.ActivityPicture" alt="">
      </div>
      <div class="content_item" :id="d.name" v-for="d,m in params2!=='1'?cloudInfo:minerInfo">
        <h2 v-if="m!==0">{{d.title}}</h2>
        <div class="content_con" v-if="d.name==='product_photos'">
           <img :src="n" alt="" v-for="n,k in detail.product_photos">
        </div>
        <div class="params_table" v-else-if="d.name==='machine_intro'||d.name==='MinerAdvantage'">
          <table border="1" cellspacing="0">
            <tbody>
              <tr v-for="p,k in params">
                <td>{{p}}</td>
                <td>{{detail[k]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="content_con" v-html="detail[d.name]" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detail: {
        type: Object
      },
      params2: {
        type: String
      },
      cloudInfo: {
        type: Array
      },
      minerInfo: {
        type: Array
      },
      params: {
        type: Object
      }
    },
    data () {
      return {
        contentShow: 0,
        isFixTop: false
      }
    },
    methods: {
      tabs (k, name) {
        this.contentShow = k
        if (k === 0) {
          scrollTo(0, 500)
        } else if (k === 1) {
          scrollTo(0, 1200)
        } else if (k === 2) {
          scrollTo(0, 1600)
        } else if (k === 3) {
          scrollTo(0, 2000)
        }
      },
      fixTop () {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 500) {
          this.isFixTop = true
        } else {
          this.isFixTop = false
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.fixTop, false)
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .product_info{
    position: relative;
    @include main
    margin-top:90px;
    background: white;
    overflow: hidden;
    padding:0 98px;
    box-sizing: border-box;
    box-shadow: #dfe0e1 0 5px 5px -3px;
    .info_ul{
      border-bottom:1px solid #e5e5e5;
      width: 100%;
      overflow: hidden;
      transition: all .3s;
      .info_li{
        cursor:pointer;
        float: left;
        color:#333333;
        margin-right: 50px;
        font-size: 18px;
        height: 50px;
        padding-top: 12px;
        padding-bottom: 12px;
        box-sizing: border-box;
        &.active{
          color: #327fff;
          border-bottom: 2px solid #327fff;
          box-sizing: border-box;
        }
        &:hover{
          color: #327fff;
          border-bottom: 2px solid #327fff;
          box-sizing: border-box;
        }
      }
      &.fix_top{
        position: fixed;
        left:0;
        top:0;
        z-index: 10;
        background: #fff;
        .info_box{
          @include main
          padding:0 98px;
        }
      }
    }
    .content_items{
      position: relative;
      margin:15px 0 40px 0;
      padding-bottom:40px;
      background: #DDDFEB;
      .content_item{
        padding-top:20px;
        min-height:300px;
        h2{
          font-weight: bold;
          margin-bottom:20px;
          padding:0 20px;
        }
        .params_table{
          margin:0 20px;
          margin-bottom:20px;
          table{
            width:70%;
            border: 1px solid $light_black;
            box-shadow: 0 0 10px #9a9a9a;
            tr{
              td{
                padding:5px 15px;
                &:nth-child(2){
                  width:70%;
                  text-align: right;
                }
              }
            }
          }
        }
        .content_con{
          margin-bottom:30px;
          width: 52%;
          overflow: hidden;
          padding-left: 25px;
          padding-top: 10px;
        }
      }
      .product_img{
        position: relative;
        .pro_name,.pro_slogan,.pro_resume{
          @include position(40)
          bottom:auto;
          text-align: center;
          color:#fff
        }
        .pro_name{
          font-size: 36px;
        }
        .pro_slogan{
          top:24%;
          font-size: 50px;
        }
        .pro_resume{
          top:80%;
          left:20%;
          width:60%;
          right:auto;
          font-size: 18px;
        }
        img{
          &.pro_img{

          }
          &.params_img{
            display: none;
            @include position(480,auto,auto,50)
            width:40%;
            height:300px;
            right:30px !important;
          }
        }
      }
    }
  }
</style>
