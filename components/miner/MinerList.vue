<template>
  <div class="millsList">
    <slot></slot>
    <div class="mill" v-if="!isMobile">
      <div v-for="n,k in $parent.minerData" class="listmill">
        <router-link :to="'/minerShop/detail/'+ n.id +'&1'">
          <span class="status" v-if="n.status===1">热销中</span>
          <span class="gray" v-if="n.status===3">已下架</span>
          <span class="gray" v-if="n.status===2">已售罄</span>
          <span class="gray" v-if="n.status===4" style="background: #ff721f;">预热</span>
          <div class="img1">
            <img :src="n.minerPicture"/>
          </div>
          <h6>{{n.name}}</h6>
          <p class="address"><span class="left">{{n.unit?n.unit: 'BitCoin'}}</span><span class="right">{{n.MinerAddress?n.MinerAddress: '未定'}}</span></p>
          <div class="progress_info press">
            <div class="progress_box">
              <div class="box" :style="{width:(n.buyed_amount/n.amount * 100)+'%'}"></div>
            </div>
          </div>
          <div class="items">
            <div class="item" v-for="item,d in items">
              <p class="price">{{n[d]}}{{item.unit}}</p>
              <p class="title">{{item.title}}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="nodata" v-if="$parent.show">
        <div class="nodata_img"></div>
        <p>即将上线，敬请期待</p>
      </div>
    </div>
    <div class="mobileminer" v-else>
      <div class="millsList_mobile" v-for="n,k in $parent.minerData">
        <router-link :to="'/minerShop/detail/'+ n.id +'&1'">
          <div class="null">
            <img :src="n.minerPicture"/>
          </div>
          <h6>{{n.name}}</h6>
          <mt-progress :value="(n.buyed_amount/n.amount * 100)" :bar-height="5"></mt-progress>
          <p>算力价： <b>¥{{n.one_amount_value}}</b> <span>{{n.hash}}T</span></p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        items: {'one_amount_value': {title: '服务器单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'buyed_amount': {title: '出售总数', unit: '台'}}
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
      padding-bottom: 0;
  }
  .millsList{
    width: 100%;
    overflow: hidden;
    margin:0 auto;
    background: #f6f7f9;
    margin-top: 20px;
    h2{
      @include data_title
    }
    .mill{
      width: 1198px;
      overflow: hidden;
      margin:0 auto;
      .listmill{
        padding:0;
        margin:0;
        width: 280px;
        height: 320px;
        background: white;
        float: left;
        text-align: center;
        margin-bottom: 24px;
        margin-left: 8px;
        margin-right: 11px;
        position: relative;
        .img1{
          width: 100%;
          height: 180px;
          position: relative;
          img{
            width: 126px;
            height: 81px;
            left: 50%;
            margin-left: -63px;
            object-fit: cover;
            top:64px;
            position: absolute;
          }
        }
        .status{
          width: 70px;
          height: 25px;
          display: block;
          text-align: center;
          line-height: 25px;
          background: #ff6458;
          color:white;
          font-size: 12px;
          position: absolute;
          left: 0;
          left:0;
        }
        .gray{
          background: #bfbfbf;
          width: 70px;
          height: 25px;
          display: block;
          text-align: center;
          line-height: 25px;
          color:white;
          font-size: 12px;
          position: absolute;
          left: 0;
          top:0;
        }
        h6{
            font-size: 16px;
            color:#121212;
            padding-left: 20px;
            padding-right: 20px;
            box-sizing: border-box;
            text-align: left;
        }
        .address{
            width: 100%;
            padding:0 20px;
            box-sizing: border-box;
            padding-top: 9px;
            overflow: hidden;
            .left{
                color: #327fff;
                float: left;
                font-size: 12px;
            }
            .right{
                float: right;
                color: #a9a9a9;
                font-size: 12px;
            }
        }
        .press{
            width: 240px;
            height: 5px;
            background: #e3e3e3;
            margin: 0 auto;
            margin-top: 20px;
            .progress_box{
              position: relative;
              overflow:hidden;
              height:100%;
              .box{
                @include position
                background: #32cf99;
              }
            }
        }
        .items{
            width: 100%;
            padding: 0 20px;
            padding-top: 18px;
            .item{
                width: 33.3%;
                float: left;
                text-align: center;
                p{
                    margin:0;
                    padding:0;
                }
                .price{
                  height: 20px;
                  font-size: 14px;
                  color: #666666;
                  text-align: left;
                }
                .title{
                    color: #a9a9a9;
                    font-size: 12px;
                    text-align: left;
                }
            }
            :nth-child(1){
                width: 80px;
                height: 30px;      
            }
            :nth-child(2){
                padding-left:35px;
                // margin-right:5px;
            }
            :nth-child(3){
              padding-left: 30px;
            }
        }
        &:hover{
           box-shadow:#dfe0e1 0 0 30px;
        }
      }
      .nodata{
        background: #fff;
        min-height:500px;
        padding-top:100px;
        text-align: center;
        .nodata_img{
          display: inline-block;
          width: 305px;
          height: 234px;
          background: url('../../assets/images/css_sprites.png') -10px -10px;
        }
        p{
          color:$light_black;
          margin-top:15px
        }
      }
    }
    .mobileminer{
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding:0 .5rem;
      background: white;
      padding-top: .5rem;
      .millsList_mobile{
        display: block;
        width: 48%;
        height: 7.5rem;
        overflow: hidden;
        a{
          .null{
            width: 100%;
            height: 4.3rem;
            background: #efefef;
            border-radius: .3rem;
            text-align: center;
            img{
              width: 4rem;
              height: 2.4rem;
              margin-top: 0.9rem;
            }
          }
          h6{
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: normal;
            font-size: .6rem;
            padding-top: .2rem;
          }
          .mt-progress{
            height:5px;
            margin-bottom: 0.5rem;
          }
          .mt-progress-content{
           border-radius: 5px;
           overflow: hidden;
           height: 5px;
           margin-top: .3rem;
          }
          .mt-progress-runway{
            border-radius: 5px;
           overflow: hidden;
          }
          .mt-progress-progress{
            background: linear-gradient(to right, #337eff 20%, #c72abc);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#337eff', endColorstr='#c72abc',GradientType=1 );
          }
          p{
            font-size: 0.4rem;
            b{
              color:#fe5039;
            }
            span{
              float: right;
            }
          }
        }
      }
    }
  }
  @media  screen and (max-width: 600px) {
    .millsList{
      margin-top:0;
    }
  }
</style>
