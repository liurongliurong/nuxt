<template>
  <section class="product">
    <template v-if="!isMobile">
      <div class="top_nav">
        <div class="box">
          <router-link to="/minerShop/list">矿机商城</router-link>
          <span>></span>
          <router-link to="/minerShop/miner/1" v-if="$parent.proType==='1'">矿机</router-link>
          <router-link to="/minerShop/miner/2" v-else>云矿机</router-link>
          <span>></span>
          <em>{{$parent.detail.name}}</em>
        </div>
        <div class="items miner" v-if="$parent.proType==='1'">
          <div class="miner_type">
            <div class="iconfont">&#xe603;</div>
            <span>矿机</span>
          </div>
          <div class="miner_left">
            <img :src="$parent.detail.minerPicture" alt="">
          </div>
          <div class="miner_right">
            <h4>
              <span :class="statusObj[$parent.detail.status]&&statusObj[$parent.detail.status].color">{{statusObj[$parent.detail.status]&&statusObj[$parent.detail.status].title}}</span>
              {{$parent.detail.name}}
            </h4>
            <p class="time">{{$parent.detail.DeliveryTime}}</p>
            <p class="suan_price"><span class="left_miner" style="position:relative;top:-5px;">矿 机 价</span><span class="right_miner">¥ <em>{{$parent.detail.one_amount_value}}</em></span></p>
            <p class="address"><span class="left_miner">总 算 力</span><span class="right_miner"><em>{{$parent.totalHash|format}}</em>T</span></p>
            <p class="address"><span class="left_miner">物&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;流</span><span class="right_miner">订单委托第三方物流公司发货，物流费用到付</span></p>
            <div class="miner_input">
              <span class="left_miner">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
              <div class="input_box right_miner">
                <span @click="$parent.changeNum(+$parent.number-1)" style="cursor:pointer;">-</span>
                <input type="text" v-model="$parent.number" :placeholder="(parseInt($parent.detail.single_limit_amount)||1)+'台起售'" @blur="$parent.changeNum($parent.number)">
                <span @click="$parent.changeNum(+$parent.number+1)"  style="cursor:pointer;">+</span>
              </div>
              <p class="miner_number">库存{{$parent.leftNum}}台</p>
            </div>
            <button :class="['btn buy_btn', {error: $parent.buyStatus===1}, {over: $parent.buyStatus===2}]" v-if="$parent.detail.status===1" @click="checkPay">立即支付</button>
            <button class="btn" disabled v-else-if="$parent.detail.status===2" style="background:#c3bbba;">已售罄</button>
            <button class="btn" disabled v-else-if="$parent.detail.status===3">产品撤销</button>
          </div>
        </div>
        <div class="items cloud_miner" v-if="$parent.proType!=='1'">
          <div class="miner_type" style="background:#327fff;">
            <div class="iconfont">&#xe610;</div>
            <span>云矿机</span>
          </div>
          <div class="cloud_miner_left">
            <h4>
              {{$parent.detail.product_name}}
              <span>{{$parent.str[$parent.detail.status]}}</span>
            </h4>
            <p class="white" v-if="$parent.proType==='2'">可使用算力白条</p>
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
              </template>
            </div>
            <div class="progress_info press" style="overflow:hidden;">
              <div class="progress_box">
                <div class="box" :style="{margin:0,width:(parseInt($parent.detail.buyed_amount)/parseInt($parent.detail.amount)*100)+'%'}"></div>
              </div>
            </div>
            <div class="progress_price">
              <span class="one">当前进度 {{((parseInt($parent.detail.buyed_amount)/parseInt($parent.detail.amount))*100).toFixed(2)}}%</span>
              <span class="two">剩余可售 {{$parent.leftNum}}台</span>
            </div>
          </div>
          <div class="cloud_miner_right">
            <div class="price_text">我要购买</div>
            <div class="input_box">
              <input type="text" v-model="$parent.number" :placeholder="(parseInt($parent.detail.single_limit_amount)||1)+'台起售'" @blur="$parent.changeNum($parent.number)">
              <span>台</span>
            </div>
            <div class="price_text1">总算力：<span class="money">{{$parent.totalHash|format}}T</span></div>
            <div class="price_text1">需支付：<span class="money">{{$parent.totalPrice|format}}元</span></div>
            <button class="btn" disabled v-if="$parent.leftStatus" style="background:#c3bbba;">已售罄</button>
            <button :class="['btn buy_btn', {error: $parent.buyStatus===1}, {over: $parent.buyStatus===2}]" v-else @click="checkPay($event, false)">立即支付</button>
            <button class="btn loan_btn" @click="checkPay($event, true)" v-if="$parent.proType==='2'&&!$parent.leftStatus">分期购买</button>
          </div>
        </div>
      </div>
      <div class="product_info">
        <template v-if="$parent.proType!=='1'">
          <div class="info_ul">
            <div :class="['info_li',{'active': contentShow===k}]" v-for="n,k in infolists" @click="tabs(k)">{{n.title}}</div>
          </div>
          <div class="content_items">
            <template v-for="n,k in infolists">
              <div class="content_item" v-html="$parent.detail[n.name]" v-if="k!==3&&contentShow===k"></div>
              <div class="content_item" v-if="k===3&&contentShow===3">
                <img :src="$parent.detail[n.name]" alt="">
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="info_ul">
            <div :class="['info_li',{'active': contentShow===m}]" v-for="d,m in infolist" @click="tabs(m,d.name)">{{d.title}}</div>
          </div>
          <div class="content_items">
            <div class="product_img">
              <div class="pro_name">{{$parent.detail.name}}</div>
              <div class="pro_slogan">{{$parent.detail.miner_list&&$parent.detail.miner_list.slogan}}</div>
              <div class="pro_resume">{{$parent.detail.miner_list&&$parent.detail.miner_list.resume}}</div>
              <img class="pro_img" :src="require('@/assets/images/miner_shop/miner_img.jpg')" alt="">
              <img class="params_img" :src="$parent.detail.ActivityPicture" alt="">
            </div>
            <div class="content_item" :id="d.name" v-for="d,m in infolist">
              <h2 v-if="m!==0">{{d.title}}</h2>
              <div class="content_con" v-html="$parent.detail[d.name]" v-if="d.name!=='MinerAdvantage'"></div>
              <div class="params_table" v-else>
                <table border="1" cellspacing="0">
                  <tbody>
                    <tr v-for="p,k in params">
                      <td>{{p}}</td>
                      <td>{{($parent.detail.miner_list&&$parent.detail.miner_list[k])||$parent.detail[k]}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
    <div class="mobile_box" v-else>
      <div class="img">
        <img :src="$parent.detail.product_img||$parent.detail.minerPicture" alt="">
      </div>
      <div class="first_box">
        <h4>
          <span class="status_box">{{(statusObj[$parent.detail.status]&&statusObj[$parent.detail.status].title)||$parent.str[$parent.detail.status]}}</span>
          <span class="name_box">{{$parent.detail.name}}</span>
        </h4>
        <div class="mobile_price">
          <div class="type_name">{{$parent.proType==='1'?'矿机':'云矿机'}}</div>
          <div>算力价：<span class="price">￥{{$parent.detail.one_amount_value}}</span></div>
        </div>
        <div class="buy_tips" v-if="$parent.proType==='1'">{{$parent.detail.DeliveryTime}}</div>
        <div class="progress_info">
          <div class="progress_box">
            <div class="box" :style="{width:((1-$parent.leftNum/$parent.detail.amount)*100).toFixed(1)+'%'}"></div>
          </div>
          <div class="progress_text">剩余{{$parent.leftNum}}台</div>
        </div>
        <div class="base_info">
          <template v-for="n,k in $parent.proType==='1'?mobileNav1:mobileNav2">
            <div class="item">
              <div class="item_data">{{$parent.detail[k]}}{{n.unit}}</div>
              <div class="item_text">{{n.title}}</div>
            </div>
            <div class="line"></div>
          </template>
        </div>
      </div>
      <template v-if="$parent.proType!=='1'">
        <div class="mobile_product_info">
          <div class="info_ulmobile">
            <div :class="['info_limobile',{'active': contentShow===k}]" v-for="n,k in infolists" @click="tabs(k)">{{n.title}}</div>
          </div>
          <div class="content_itemsmobile">
            <template v-for="n,k in infolists">
              <div class="content_itemmobile" v-html="$parent.detail[n.name]" v-if="k!==3&&contentShow===k"></div>
              <div class="content_itemmobile" v-if="k===3&&contentShow===3">
                <img :src="$parent.detail[n.name]" alt="">
              </div>
            </template>
          </div>
        </div>
        <div class="mobile_btn">
          <mt-button type="default" size="large" disabled v-if="$parent.leftStatus">已售罄</mt-button>
          <mt-button type="primary" size="large" @click="openMask" v-else>立即支付</mt-button>
        </div>
      </template>
      <template v-else>
        <div class="mobile_product_info">
          <div class="info_ulmobile">
            <div :class="['info_limobile',{'active': contentShow===m}]" v-for="d,m in infolist" @click="tabs(m,d.name)">{{d.title}}</div>
          </div>
          <div class="content_itemsmobile">
            <div class="product_img">
              <div class="pro_name">{{$parent.detail.name}}</div>
              <div class="pro_slogan">{{$parent.detail.miner_list&&$parent.detail.miner_list.slogan}}</div>
              <div class="pro_resume">{{$parent.detail.miner_list&&$parent.detail.miner_list.resume}}</div>
              <img class="pro_img" :src="require('@/assets/images/miner_shop/miner_img.jpg')" alt="">
              <!-- <img class="params_img" :src="$parent.detail.ActivityPicture" alt=""> -->
            </div>
            <div class="content_itemmobile" :id="d.name" v-for="d,m in infolist">
              <h2 v-if="m!==0">{{d.title}}</h2>
              <div class="content_conmobile" v-html="$parent.detail[d.name]" v-if="d.name!=='MinerAdvantage'"></div>
              <div class="params_tablemobile" v-else>
                <table border="1" cellspacing="0">
                  <tbody>
                    <tr v-for="p,k in $parent.params">
                      <td>{{p}}</td>
                      <td>{{($parent.detail.miner_list&&$parent.detail.miner_list[k])||$parent.detail[k]}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="mobile_btn">
          <mt-button type="primary" size="large" @click="openMask" v-if="$parent.detail.status===1">立即支付</mt-button>
          <mt-button type="default" size="large" disabled v-else-if="$parent.detail.status===2">已售罄</mt-button>
          <mt-button type="default" size="large" disabled v-else-if="$parent.detail.status===3">已售罄</mt-button>
        </div>
      </template>
      <mt-popup position="bottom" v-model="sheetVisible">
        <div class="buy_box">
          <div class="img_text">
            <div class="img">
              <img :src="$parent.detail.product_img||$parent.detail.minerPicture" alt="">
            </div>
            <div class="text">
              <div class="price">￥{{$parent.detail.one_amount_value}}</div>
              <div class="name">{{$parent.detail.name}}</div>
              <div class="left">剩余可售{{$parent.leftNum}}台</div>
            </div>
          </div>
          <div class="buy_num">
            <div>购买数量<span class="buy_tips">({{parseInt($parent.detail.single_limit_amount)||1}}台起售)</span></div>
            <div class="input_box">
              <span @click="$parent.changeNum(+$parent.number-1)">-</span>
              <input type="text" v-model="$parent.number" placeholder="购买数量" @blur="$parent.changeNum($parent.number)">
              <span @click="$parent.changeNum(+$parent.number+1)">+</span>
            </div>
          </div>
          <div class="buy_text">
            <div class="item">购买算力</div>
            <div class="item">{{$parent.totalHash|format}}T</div>
          </div>
          <div class="buy_text last">
            <div class="item">支付金额</div>
            <div class="item">{{$parent.totalPrice|format}}元</div>
          </div>
          <div class="mobile_btn">
            <mt-button type="default" size="large" disabled v-if="$parent.leftStatus">已售罄</mt-button>
            <mt-button type="primary" size="large" @click="checkPay($event, false)" v-else>立即支付</mt-button>
          </div>
        </div>
      </mt-popup>
    </div>
  </section>
</template>

<script>
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    props: {
      page: {
        type: String
      }
    },
    data () {
      return {
        proData: {one_amount_value: {title: '每台服务器价格', unit: '元'}, hash: {title: '每台服务器算力', unit: 'T'}, amount: {title: '服务器总台数', unit: '台'}},
        proText: {hashType: '算力类型', status: '购买类型', incomeType: '结算方式'},
        infolists: [{name: 'machine_intro', title: '产品参数'}, {name: 'machine_advantage', title: '产品优势'}, {name: 'machine_agreement', title: '协议说明'}, {name: 'product_photos', title: '矿场相册'}],
        infolist: [{name: 'MInerBrief', title: '产品介绍'}, {name: 'MinerAdvantage', title: '产品参数'}, {name: 'prProtocolSpeciaification', title: '补充说明'}],
        params: {ChipsNumber: '芯片数量', hash: '额定算力', voltage: '额定电压', minerSize: '矿机尺寸', minerOuterSize: '外箱尺寸', Cooling: '冷却', temperature: '工作温度', humidity: '工作湿度', network: '网络连接', weight: '净重', wallPower: '墙上功耗'},
        mobileNav1: {hash: {title: '服务器算力', unit: 'T'}, weight: {title: '服务器重量', unit: 'kg'}, single_limit_amount: {title: '最少购买数量', unit: ''}},
        mobileNav2: {hashType: {title: '算力类型', unit: ''}, amount: {title: '服务器总数', unit: '台'}, incomeType: {title: '结算方式', unit: ''}},
        statusObj: {1: {title: '热销中', color: 'red'}, 2: {title: '已售罄', color: 'gray'}, 3: {title: '产品撤销', color: 'gray'}},
        sheetVisible: false,
        contentShow: 0,
        active: 0,
        detail: {}
      }
    },
    methods: {
      checkPay (e, sh) {
        var startTime = this.$parent.detail.sell_start_time
        var now = Date.parse(new Date()) / 1000
        if (this.$parent.detail.status === 4) {
          api.tips('暂不能购买')
          return false
        }
        if (now < startTime) {
          api.tips('还未到开售时间，开售时间为：' + api.date(new Date(startTime * 1000)))
          return false
        }
        if (this.token === 0) {
          this.$router.push({name: 'login'})
          return false
        }
        if (!(this.true_name && this.true_name.status === 1)) {
          api.tips('请先实名认证', () => {
            if (this.isMobile) {
              this.$router.push({name: 'madministration'})
            } else {
              this.$router.push({name: 'account'})
            }
          })
          return false
        }
        this.$parent.goPay(e, sh)
      },
      openMask () {
        this.sheetVisible = true
      },
      tabs (k, name) {
        this.contentShow = k
        // location.href = '#' + name
        scrollTo(0, 600 * k)
      }
    },
    mounted () {
      this.tabs(0)
      console.log(document.getElementsByClassName('product')[0].style.height)
    },
    filters: {
      format: api.decimal
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .product{
    background: #f7f8fa;
    padding-bottom: 50px;
    .top_nav{
      background-image: url('../../assets/images/miner.png');
      width: 100%;
      height: 352px;
      background-size: 100% 100%;
      .box{
        @include main
        padding-top: 12px;
        color: white;
        font-size: 12px;
        a{
          color: white;
        }
        span{
          padding:0 24px;
        }
        em{
          font-style: normal;
          color: #bfbfbf;
        }
      }
    }
    .items{
      @include main
      margin-bottom:30px;
      background: white;
      height: 370px;
      box-shadow: #dfe0e1 0 5px 5px -3px;
      position: relative;
      margin-top:10px;
      .miner_type{
        position: absolute;
        left: -10px;
        top:11px;
        width: 82px;
        height: 78px;
        background: #fe5039;
        text-align: center;
        color:white;
        .iconfont{
          font-size: 24px;
          padding-top:10px
        }
      }
    }
    .miner{
      .miner_left{
        width: 500px;
        border:1px solid #dcdcdc;
        height:324px;
        margin-top: 12px;
        margin-left: 12px;
        text-align: center;
        float: left;
        margin-right: 20px;
        img{
          width: 100%;
          height: auto;
        }
      }
      .miner_right{
        padding-top: 20px;
        width: 550px;
        float: left;
        h4{
          color: #666666;
          font-weight: 800;
          font-size: 14px;
          line-height: 0;
          margin-top: 10px;
          .red{
            display:inline-block;
            background: #327fff;
            padding:10px 15px;
            border-radius: 10px;
            font-size: 12px;
            font-weight:100;
            color:white;
            margin-right: 10px;
          }
          .gray{
            display:inline-block;
            background: rgb(195, 187, 186);
            padding:10px 15px;
            border-radius: 10px;
            font-size: 12px;
            font-weight:100;
            color:white;
            margin-right: 10px;
          }
        }
        .time{
          color: #fe5039;
          font-size: 12px;
          margin:15px 0;
        }
        .suan_price{
          width: 550px;
          height: 50px;
          background:#f3f3f3;
          line-height: 50px;
          margin-bottom: 20px;
          .right_miner{
            color: #ea2c2c;
            font-weight: 800;
            font-size: 14px;
            em{
              font-size: 24px;
            }
          }
        }
        .left_miner{
          color: #999999;
          font-size: 12px;
          width: 80px;
          display:inline-block;
          text-align: left;
          padding-left: 12px;
          box-sizing: border-box;
        }
        .right_miner{
          color: #121212;
          font-size: 12px;
          em{
            font-style: normal;
            font-size: 14px;
          }
        }
        .address{
          margin-bottom: 15px;
        }
        .miner_input{
          height: 34px;
          .left_miner{
            float: left;
            line-height: 34px;
          }
          .input_box{
            display:inline-block;
            width: 142px;
            height: 34px;
            border:1px solid #e5e5e5;
            border-radius: 3px;
            box-sizing: border-box;
            float: left;
            margin-right: 28px;
            span{
              width: 22px;
              height: 100%;
              display:inline-block;
              background:#e5e5e5;
              float: left;
              font-size: 16px;
              text-align: center;
              line-height: 30px;
            }
            input{
              width: 96px;
              height: 100%;
              float: left;
              text-align: center;
            }
            :nth-child(1){
              border-top-left-radius: 3px;
              border-bottom-left-radius: 3px;
              color: #c5c5c5;
            }
            :nth-child(3){
              border-top-right-radius: 3px;
              border-bottom-right-radius: 3px;
              color: #333333;
            }
          }
          .miner_number{
            float: left;
            line-height: 28px;
            color:#666666;
            span{
              color: #fe5039;
            }
          }
        }
        .btn{
          position: relative;
          width: 242px;
          height: 44px;
          border:0;
          margin-top: 26px;
          background: $orange;
          color: white;
          font-size: 18px;
          margin-left: 79px;
          &:before{
            @include position(-20)
            color:$orange;
            font-size: 12px;
          }
          &.error:before{
            content:'请输入矿机台数';
          }
          &.over:before{
            content:'您输入的数量已超出库存';
          }
        }
      }
    }
    .cloud_miner{
      .cloud_miner_left{
        width: 722px;
        height: 100%;
        padding-top: 56px;
        padding-left: 98px;
        box-sizing: border-box;
        float: left;
        background: #f3f8ff;
        h4{
          font-size: 27px;
          color: #333333;
          font-weight: 800;
          span{
            width: 56px;
            height: 16px;
            display:inline-block;
            border-radius: 16px;
            border:1px solid #fe5039;
            text-align: center;
            margin-left: 20px;
            line-height: 15px;
            font-size: 12px;
            color: #fe5039;
            font-weight: 100;
          }
        }
        .white{
          color: #327fff;
          border:1px solid #327fff;
          width: 115px;
          height: 25px;
          text-align: center;
          margin-top: 12px;
          font-size: 12px;
          line-height: 22px;
        }
        .product_data{
          width: 550px;
          height: 60px;
          margin-top: 30px;
          .item{
            width: 33.3%;
            text-align: center;
            float: left;
            height: 100%;
            .item_word{
              text-align: left;
              .num{
                color: #333;
                font-size: 30px;
              }
            }
            p{
              text-align: left;
            }
            .tips{
              color:#666666; 
            }
          }
          :nth-child(1) .item_word .num{
            color: red;
            font-weight: 800;
          }
          :nth-child(1) .item_word .unit{
            color: red;
          }
          :nth-child(3) .tips{
            text-align: right;
          }
          :nth-child(3) .item_word{
             padding-left: 100px;
          }
          :nth-child(2) .tips{
            padding-left: 60px;
          }
          :nth-child(2) .item_word{
            padding-left: 60px;
          }
        }
        .press{
            width: 550px;
            height: 16px;
            background: #e3e3e3;
            margin-top: 44px;
            margin-bottom:15px;
            border-radius: 16px;
            .progress_box{
              position: relative;
              overflow:hidden;
              height:100%;
              .box{
                @include position;
                background: linear-gradient(to right, #337eff 20%, #c72abc);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#337eff', endColorstr='#c72abc',GradientType=1 );
                border-top-left-radius: 16px;
                border-bottom-left-radius: 16px;
              }
            }
        }
        .progress_price{
          width: 550px;
          height: auto;
          .one{
            color:#327fff;
            font-weight: 800;
            float: left;
          }
          .two{
            float:right;
          }
        }
      }
      .cloud_miner_right{
        width: 456px;
        overflow: hidden;
        background: white;
        padding-bottom: 20px;
        float: left;
        padding-top: 40px;
        padding-left: 44px;
        box-sizing: border-box;
        .price_text{
          font-size: 18px;
          color:#121212;
          .buy_tips{
            color: #fe5039;
            font-size: 14px;
            margin-left: 20px;
          }
        }
        .input_box{
          border:1px solid #d2d2d2;
          margin-top: 20px;
          width: 288px;
          height: 50px;
          line-height: 50px;
          box-sizing: border-box;
          border-radius: 5px;
          display: block;
          margin-bottom: 20px;
          input{
            width: 90%;
            float: left;
            padding-left: 22px;
            line-height: 50px;
          }
        }
        .price_text1{
          text-align: left;
          color: #666666;
          font-size: 14px;
          margin-top: 10px;
          .money{
            color: #fe5039;
            font-size: 14px;
          }
        }
        .btn{
          width: 242px;
          height: 44px;
          border:0;
          margin-top: 20px;
          background: #fe5039;
          color: white;
          font-size: 18px;
          &.buy_btn{
            position: relative;
            &:before{
              @include position(-20)
              color:$orange;
              font-size: 12px;
            }
            &.error:before{
              content:'请输入矿机台数';
            }
            &.over:before{
              content:'您输入的数量已超出库存';
            }
          }
          &.loan_btn{
            background: #01bfb5;
            margin-top: 12px;
          }
        }
            
      }
    }
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
        .info_li{
          cursor:pointer;
          float: left;
          width: 75px;
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
      }
      .content_items{
        position: relative;
        margin:15px 0 40px 0;
        padding-bottom:40px;
        background: #DDDFEB;
        .content_item{
          padding-top:20px;
          h2{
            font-weight: bold;
            margin-bottom:20px;
            padding:0 20px;
          }
          .params_table{
            margin:0 20px;
            margin-bottom:20px;
            // box-shadow: #9a9a9a -4px 0 5px -3px;
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
            padding-left: 30px;
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
              @include position(480,auto,auto,50)
              width:40%;
              right:30px !important;
            }
          }
        }
      }
    }
    .mobile_box{
      .img{
        width: 100%;
        height: 8.5rem;
        padding:0.5rem;
        text-align: center;
        padding-top: 1.5rem;
        background: white;
        img{
          width: 80%;
        }
      }
      .first_box,.product_desc,.mobile_btn{
        background: #fff;
        padding: 15px;
      }
      .first_box{
        margin-top:-15px;
        h4{
          margin:10px 0;
          .status_box{
            border: 1px solid $blue;
            color:$blue;
            padding:2px 7px;
            border-radius:3px;
          }
          .name_box{
            font-size: 0.7rem;
          }
        }
        .mobile_price{
          @include flex(space-between)
          color:$light_text;
          .type_name{
            background: $orange;
            color:#fff;
            padding:2px 5px;
            font-size: 0.4rem;
            border-radius:3px;
          }
          .price{
            color:$orange;
            font-weight: bold;
            font-size: 0.6rem;
          }
        }
        .buy_tips{
          color:$orange;
          padding-top:15px;
        }
        .base_info{
          @include flex(space-between)
          background: #F5F5F5;
          padding:15px 10px;
          .item{
            .item_data{
              text-align: center;
              font-size: 0.5rem;
            }
            .item_text{
              color:$light_black
            }
          }
          .line{
            height:30px;
            width:1px;
            background: #BFBFBF;
            &:last-child{
              display: none;
            }
          }
        }
        .progress_info{
          position: relative;
          padding:30px 0;
          .progress_box{
            position: relative;
            overflow:hidden;
            border-radius:8px;
            height:15px;
            background: $border;
            .box{
              @include position
              @include process_color
            }
          }
          .progress_text{
            position: absolute;
            right:0;
            top:16px;
            color:$text;
            padding:6px 18px;
            border:4px solid $purple;
            border-radius:30px;
            background: #fff;
          }
        }
      }
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
            img{
              &.pro_img{

              }
              // &.params_img{
              //   @include position(480,auto,auto,50)
              //   width:40%;
              //   right:30px !important;
              // }
            }
          }
        }
      }
      .mobile_btn{
        text-align: center;
        // border-top:1px solid $border;
        .mint-button--primary {
          background-color: $orange;
        }
      }
      .mint-popup{
        .buy_box{
          width:100vw;
          padding:0 15px;
          .img_text,.buy_num{
            padding: 15px 0;
          }
          .img_text{
            @include flex
            .img{
              width:130px;
              margin-right:15px;
              height:90px;
              img{
                height:90px;
                width: 130px;
                object-fit:cover
              }
            }
            .text{
              .price{
                color:$orange;
                font-size: 0.55rem;
              }
              .name{
                font-weight: bold;
              }
            }
          }
          .buy_num{
            border-top:1px solid $border;
            border-bottom:1px solid $border;
            @include flex(space-between)
            .input_box{
              line-height: 30px;
              border:1px solid $border;
              @include number_box
              span{
                width:18%;
                color:$text !important
              }
              input{
                width:58%
              }
            }
            .buy_tips{
              font-size: 0.4rem;
              color:$orange
            }
          }
          .buy_text{
            @include flex(space-between)
            padding-top:15px;
            &.last{
              padding-bottom:20px;
            }
          }
        }
      }
    }
  }
  @media  screen and (max-width: 600px) {
    .product{
       padding-bottom:0;
    }
  }
</style>
