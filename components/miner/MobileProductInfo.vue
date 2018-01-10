<template>
  <div class="mobile_product_info">
    <div class="pro_title">产品介绍</div>
    <div class="pro_content">
      <div class="pro_img">
        <div class="pro_img_name">{{detail.name}}</div>
        <div class="pro_img_slogan">{{detail.slogan}}</div>
        <div class="pro_img_resume">{{detail.resume}}</div>
        <img :src="require('@/assets/images/miner_shop/miner_img.jpg')" alt="">
      </div>
      <div class="pro_data" v-for="d,m in params2!=='1'?cloudInfo:minerInfo">
        <h2 v-if="m!==0">{{d.title}}</h2>
        <div class="pro_data_text" v-if="d.name==='product_photos'">
           <img :src="detail.product_photos[k]" alt="" v-for="n,k in detail.product_photos">
        </div>
        <div class="pro_data_params" v-else-if="d.name==='machine_intro'||d.name==='MinerAdvantage'">
          <table border="1" cellspacing="0">
            <tbody>
              <tr v-for="p,k in params">
                <td>{{p}}</td>
                <td>{{detail[k]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pro_data_text" v-html="detail[d.name]" v-else></div>
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
    .pro_title {
      border-bottom: 1px solid #e5e5e5;
      padding: 0.3rem;
      color: $text;
      font-size: 0.36rem;
      font-weight: bold;
    }
    .pro_content {
      margin:15px 0.3rem 0;
      padding-bottom:40px;
      .pro_img {
        position: relative;
        .pro_img_name,.pro_img_slogan,.pro_img_resume{
          @include position(40)
          bottom:auto;
          text-align: center;
          color:#fff
        }
        .pro_img_name{
          font-size: 0.36rem;
          top:0.3rem;
        }
        .pro_img_slogan{
          top:1rem;
          font-size: 0.4rem;
        }
        .pro_img_resume{
          top:2.5rem;
          padding: 0 0.2rem;
          font-size: 0.32px;
          color: #BFBFBF;
        }
      }
      .pro_data {
        background: #f7f8fa;
        margin-top: 0.2rem;
        padding:0.3rem 0.2rem;
        h2{
          font-weight: bold;
          padding-bottom:0.3rem;
          text-align: center;
          font-size: 0.36rem;
        }
        .pro_data_params{
          table{
            width:100%;
            border: 1px solid $light_black;
            tr{
              td{
                font-size: 0.28rem;
                padding:0.1rem 0.15rem;
                &:nth-child(2){
                  width:70%;
                  text-align: right;
                }
              }
            }
          }
        }
        .pro_data_text{
          background: #f7f8fa;
          strong span{
            font-size: 0.8rem !important;
          }
        }
      }
    }
  }
</style>
