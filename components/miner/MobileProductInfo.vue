<template>
  <div class="mobile_product_info">
    <div class="info_ulmobile">
      <div class="info_limobile">产品介绍</div>
    </div>
    <div class="content_itemsmobile">
      <div class="product_img">
        <div class="pro_name">{{detail.name}}</div>
        <div class="pro_slogan">{{detail.slogan}}</div>
        <div class="pro_resume">{{detail.resume}}</div>
        <img class="pro_img" :src="require('@/assets/images/miner_shop/miner_img.jpg')" alt="">
      </div>
      <div class="content_itemmobile" v-for="d,m in params2!=='1'?$parent.infolists:$parent.infolist">
        <h2 v-if="m!==0">{{d.title}}</h2>
        <div class="content_conmobile" v-if="d.name==='product_photos'">
           <img :src="detail.product_photos[k]" alt="" v-for="n,k in detail.product_photos">
        </div>
        <div class="params_tablemobile" v-else-if="d.name==='machine_intro'||d.name==='MinerAdvantage'">
          <table border="1" cellspacing="0">
            <tbody>
              <tr v-for="p,k in $parent.params">
                <td>{{p}}</td>
                <td>{{detail[k]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="content_conmobile" v-html="detail[d.name]" v-else></div>
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
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_product_info{
    position: relative;
    @include main
    margin-top:15px;
    background: white;
    overflow: hidden;
    .info_ulmobile{
      border-bottom:1px solid #e5e5e5;
      width: 100%;
      overflow: hidden;
      height: 2rem;
      display: flex;
      justify-content: space-between;
      padding:0 0.5rem;
      box-sizing: border-box;
      .info_limobile{
        cursor:pointer;
        color:#333333;
        line-height: 2rem;
        font-size: 0.65rem;
        box-sizing: border-box;
        &.active{
          color: #ff721f;
          border-bottom: 2px solid #ff721f;
          box-sizing: border-box;
        }
        &:hover{
          color: #ff721f;
          border-bottom: 2px solid #ff721f;
          box-sizing: border-box;
        }
      }
    }
    .content_itemsmobile{
      position: relative;
      margin:0 0.5rem;
      margin-top:15px;
      box-sizing: border-box;
      padding-bottom:40px;
      .content_itemmobile{
        background: #f7f8fa;
        margin-top: 0.3rem;
        padding-bottom: 0.5rem;
        h2{
          font-weight: bold;
          margin-bottom:10px;
          padding:0 20px;
          text-align: center;
          font-size: 0.7rem;
          padding-top: 0.5rem;
        }
        .params_tablemobile{
          table{
            width:100%;
            border: 1px solid $light_black;
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
        .content_conmobile{
          width: 100%;
          overflow: hidden;
          padding:0 .3rem;
          padding-top: 10px;
          background: #f7f8fa;
          margin-bottom: 0.2px;
          strong span{
            font-size: 0.8rem !important;
          }
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
          font-size: 0.6rem;
          top:0.5rem;
        }
        .pro_slogan{
          top:1.3rem;
          font-size: 0.9rem;
        }
        .pro_resume{
          top:4rem;
          right:auto;
          padding: 0 0.2rem;
          font-size: 0.5px;
        }
      }
    }
  }
</style>
