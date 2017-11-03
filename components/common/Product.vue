<template>
  <section class="product">
    <div class="items">
      <div class="text">
        <div class="product_title">
          <div>
            <span class="product_name">{{$parent.detail.product_name}}</span>
            <span :class="'icon_currency '+$parent.detail.hashType"></span>
          </div>
          <div v-if="$parent.detail.batch_area">
            <span class="tips">批次所在区域：</span>
            <span>{{$parent.detail.batch_area}}</span>
          </div>
        </div>
        <div class="product_con">
          <div class="product_img">
            <img :src="$parent.detail.product_img" alt="">
          </div>
          <div class="product_text">
            <div class="product_data">
              <template v-for="d,k in proData" v-if="k!=='product_name'">
                <div class="item">
                  <div class="item_word">
                    <span class="num" v-if="k==='price'">{{$parent.detail[k]|format}}</span>
                    <span class="num" v-else>{{$parent.detail[k]}}</span>
                    <span class="unit">{{d.unit}}</span>
                  </div>
                  <p class="tips">{{d.title}}</p>
                </div>
                <div class="line"></div>
              </template>
            </div>
            <div class="product_word">
              <div class="item" v-for="t,k in proText">
                <span class="tips">{{t}}:</span>
                <span v-if="k==='status'">{{$parent.str[$parent.detail[k]]}}</span>
                <span v-else>{{$parent.detail[k]}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="price" v-if="page==='computeShop'">
        <div class="price_title">
          <span class="tips">剩余可售服务器：</span>
          <span class="num">{{$parent.leftNum}}</span>
          <span>台</span>
        </div>
        <div class="price_input">
          <div class="price_text">购买数量（台）</div>
          <div class="input_box">
            <span @click="$parent.changeNum(+$parent.number-1)">-</span>
            <input type="text" v-model="$parent.number" placeholder="请输入购买数量，1台起售" @blur="$parent.changeNum($parent.number)">
            <span @click="$parent.changeNum(+$parent.number+1)">+</span>
          </div>
          <div class="price_text">需支付：<span class="money">{{$parent.totalPrice|format}}元</span></div>
          <div class="price_text">总算力：<span class="money">{{$parent.totalHash|format}}T</span></div>
         <button class="btn" disabled v-if="$parent.leftStatus">已售罄</button>
         <button :class="['btn', {over: $parent.overStatus}]" :disabled="$parent.overStatus" v-else @click="checkPay">立即支付</button>
        </div>
      </div>
      <div class="price transfer" v-else>
        <div class="price_title tips">转让算力服务器</div>
        <div class="price_input">
          <div class="price_text">需支付：<span class="money">{{$parent.detail.total_price|format}}元</span></div>
          <div class="price_text">总算力：<span class="money">{{$parent.detail.transfer_amount|format}}T</span></div>
          <button class="btn" v-if="$parent.detail.status===1" @click="checkPay">立即支付</button>
          <button class="btn" disabled v-else-if="$parent.detail.status===2">已转让</button>
          <button class="btn" disabled v-else-if="$parent.detail.status===3">产品撤销</button>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="info_item">
        <h3>产品介绍</h3>
        <div class="box" v-html="$parent.detail.machine_intro"></div>
      </div>
      <div class="info_item">
        <h3>产品优势</h3>
        <div class="box" v-html="$parent.detail.machine_advantage"></div>
      </div>
      <div class="info_item">
        <h3>协议说明</h3>
        <div class="box" v-html="$parent.detail.machine_agreement"></div>
      </div>
      <div class="info_item">
        <h3>矿场相册</h3>
        <div class="box">
          <div class="item" v-for="i,k in $parent.detail.product_photos">
            <img :src="i" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import api from '../../util/function'
  import { mapState } from 'vuex'
  export default {
    props: {
      page: {
        type: String
      },
      proData: {
        type: Object
      },
      proText: {
        type: Object
      },
      text: {
        type: Object
      }
    },
    methods: {
      checkPay (e) {
        if (this.token === 0) {
          this.$router.push({name: 'auth-login'})
          return false
        }
        if (!(this.true_name && this.true_name.status === 1)) {
          api.tips('请先实名认证', () => {
            this.$router.push({name: 'user-account'})
          })
          return false
        }
        if (!(this.bank_card && this.bank_card.status === 1)) {
          api.tips('请先绑定银行卡', () => {
            this.$router.push({name: 'user-account'})
          })
          return false
        }
        this.$parent.goPay(e)
      }
    },
    filters: {
      format: api.decimal
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .product{
    h3,.product_name{
      font-size: 18px;
      font-weight: bold;
    }
    .items{
      margin-bottom:30px;
      @include flex(flex-start,strech)
      .text{
        flex:1;
        .product_title{
          @include flex(space-between)
          padding-bottom:10px;
          border-bottom: 1px solid $border;
          margin-bottom:20px;
        }
        .product_con{
          @include flex(flex-start,strech)
          margin-bottom:25px;
          .product_img{
            width:230px;
            margin-right:20px;
            img{
              height:210px;
              object-fit:cover
            }
          }
          .product_text{
            flex:1;
            .product_data{
              @include flex(space-between)
              background: #fff9f3;
              padding:25px;
              .item{
                .item_word{
                  .num{
                    font-size: 24px;
                  }
                }
                &:first-child{
                  .item_word{
                    color:$orange
                  }
                }
              }
              .line{
                width:1px;
                height:50px;
                background: $border;
                &:last-child{
                  display: none;
                }
              }
            }
            .product_word{
              @include flex(space-between)
              margin-top:10px;
              padding:15px;
              border:1px solid $border
            }
            h4{
              margin-top:20px;
              color: $light_text;
            }
          }
        }
      }
      .price{
        background:$white;
        width:330px;
        margin-left:30px;
        .price_title{
          padding:15px 30px;
          border-bottom:1px solid $border
        }
        .price_input{
          padding:15px 30px;
          .price_text{
            color: $light_text;
            margin-bottom:10px;
            .money{
              color: $orange
            }
          }
          .input_box{
            line-height: 40px;
            border:1px solid $border;
            margin-bottom:30px;
            @include flex
            span{
              width:25px;
              text-align: center;
              background: $border;
              font-size: 18px;
              font-weight: bold;
              color: #c5c5c5;
              cursor: pointer;
              user-select:none;
              &:last-child{
                color: $orange;
              }
            }
            input{
              flex:1;
              padding:0 10px
            }
          }
          .btn{
            width:100%;
            @include button($orange)
            line-height: 3;
            margin-top:30px;
            position: relative;
            &.error:before{
              @include position(-40)
              content:'请输入或添加至少1台矿机';
              color: $orange;
            }
            &.over:before{
              @include position(-40)
              content:'剩余可售量不足您所需求的量';
              color: $orange;
            }
            &:disabled{
              background: #f5b48f;
              border-color: #f5b48f;
            }
          }
        }
        &.transfer{
          .price_title{
            margin-bottom:20px;
          }
          .price_input{
            .price_text{
              .money{
                font-size: 24px;
                margin-right:3px
              }
              &:first-child{
                margin-bottom:20px
              }
              &:nth-child(2){
                margin-bottom:25px
              }
            }
          }
        }
      }
      .tips{
        color: $light_black;
      }
    }
    .info{
      .info_item{
        h3{
          padding-bottom:10px;
          border-bottom:1px solid $border
        }
        .box{
          padding:30px 0;
          font-size: 16px
        }
        &:last-child{
          .box{
            @include row(2)
            .item img{
              height:290px;
              object-fit:cover
            }
          }
        }
      }
    }
    .items .text,.info{
      padding:15px 30px;
      background:$white;
    }
  }
</style>
