<template>
  <section class="product">
    <template v-if="isMobile===0">
      <div class="top_nav">
        <div class="box">
          <router-link to="/minerShop/list">矿机商城</router-link>
          <span>></span>
          <router-link to="/minerShop/miner/1" v-if="params2==='1'">矿机</router-link>
          <router-link to="/minerShop/miner/2" v-else>云算力</router-link>
          <span>></span>
          <em>{{detail.name}}</em>
        </div>
        <div class="items miner" v-if="params2==='1'">
          <div class="miner_type">
            <div class="iconfont">&#xe603;</div>
            <span>矿机</span>
          </div>
          <div class="miner_left">
            <img :src="detail.minerPicture" alt="">
          </div>
          <div class="miner_right">
            <h4>
              <span :class="statusObj[detail.status]&&statusObj[detail.status].color">{{statusObj[detail.status]&&statusObj[detail.status].title}}</span>
              <span>{{detail.name}}</span>
            </h4>
            <p class="time">{{detail.DeliveryTime}}</p>
            <p class="suan_price">
              <span class="left_miner" style="position:relative;top:-5px;">矿 机 价</span>
              <span class="right_miner">¥ <em>{{detail.one_amount_value}}</em></span>
            </p>
            <p class="address">
              <span class="left_miner">总 算 力</span>
              <span class="right_miner"><em>{{totalHash|format}}</em>T</span>
            </p>
            <p class="address">
              <span class="left_miner">物&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;流</span>
              <span class="right_miner">订单委托第三方物流公司发货，物流费用到付</span>
            </p>
            <div class="miner_input">
              <span class="left_miner">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
              <div class="input_box right_miner">
                <span @click="changeNum(+number-1)" style="cursor:pointer;">-</span>
                <input type="text" v-model="number" :placeholder="(parseInt(detail.single_limit_amount)||1)+'台起售'" @blur="changeNum(number)">
                <span @click="changeNum(+number+1)"  style="cursor:pointer;">+</span>
              </div>
              <p class="miner_number">库存{{leftNum}}台</p>
            </div>
            <button class="btn" disabled v-if="detail.status===2">已售罄</button>
            <button class="btn" disabled v-else-if="detail.status===3">产品撤销</button>
            <button :class="['btn buy_btn', {error: buyStatus===1}, {over: buyStatus===2}]" @click="checkPay" :disabled="detail.status===4" v-if>立即购买</button>
          </div>
        </div>
        <div class="items cloud_miner" v-if="params2!=='1'">
          <div class="miner_type" style="background:#327fff;">
            <div class="iconfont">&#xe610;</div>
            <span>云算力</span>
          </div>
          <div class="cloud_miner_left">
            <h4>
              {{detail.product_name}}
              <span>{{str[detail.status]}}</span>
            </h4>
            <div class="product_data">
              <div class="item" v-for="d,k in proData">
                <div class="item_word">
                  <span class="num" v-if="k==='price'">{{detail[k]|format}}</span>
                  <span class="num" v-else>{{detail[k]}}</span>
                  <span class="unit">{{d.unit}}</span>
                </div>
                <p class="tips">{{d.title}}</p>
              </div>
            </div>
            <div class="progress_info press" style="overflow:hidden;">
              <div class="progress_box">
                <div class="box" :style="{margin:0,width:((+detail.buyed_amount)/detail.amount*100).toFixed(0)+'%'}"></div>
              </div>
            </div>
            <div class="progress_price">
              <span class="one">当前进度 {{((+detail.buyed_amount)/detail.amount*100).toFixed(0)}}%</span>
              <span class="two">剩余可售 {{leftNum}}台</span>
            </div>
          </div>
          <div class="cloud_miner_right">
            <div class="price_text">我要购买</div>
            <div class="input_box">
              <input type="text" v-model="number" :placeholder="(parseInt(detail.single_limit_amount)||1)+'台起售'" @blur="changeNum(number)">
              <span>台</span>
            </div>
            <div class="price_text1">总算力：<span class="money">{{totalHash|format}}T</span></div>
            <div class="price_text1">需支付：<span class="money">{{totalPrice|format}}元</span></div>
            <button class="btn" disabled v-if="detail.status===7">已售罄</button>
            <button :class="['btn buy_btn', {error: buyStatus===1}, {over: buyStatus===2}]" @click="checkPay($event, false)" v-else :disabled="detail.status===4">立即购买</button>
            <button class="btn loan_btn" @click="checkPay($event, true)" v-if="detail.status!==4&&params2==='2'&&detail.is_loan===1">分期购买</button>
          </div>
        </div>
      </div>
      <ProductInfo :params2="params2" :detail="detail"></ProductInfo>
    </template>
    <div class="mobile_box" v-else-if="isMobile===1">
      <div class="img">
        <img :src="detail.product_img||detail.minerPicture" alt="" style="height:6.5rem;">
      </div>
      <div class="first_box">
        <h4>
          <span class="status_box">{{(statusObj[detail.status]&&statusObj[detail.status].title)||str[detail.status]}}</span>
          <span class="name_box">{{detail.name}}</span>
        </h4>
        <div class="mobile_price">
          <div class="type_name">{{params2==='1'?'矿机':'云算力'}}</div>
          <div>算力价：<span class="price">￥{{detail.one_amount_value}}</span></div>
        </div>
        <div class="buy_tips" v-if="params2==='1'">{{detail.DeliveryTime}}</div>
        <div class="progress_info">
          <div class="progress_box">
            <div class="box" :style="{width:((1-leftNum/detail.amount)*100).toFixed(1)+'%'}"></div>
          </div>
          <div class="progress_text">剩余{{leftNum}}台</div>
        </div>
        <div class="base_info">
          <template v-for="n,k in params2==='1'?mobileNav1:mobileNav2">
            <div class="item">
              <div class="item_data">{{detail[k]}}{{n.unit}}</div>
              <div class="item_text">{{n.title}}</div>
            </div>
            <div class="line"></div>
          </template>
        </div>
      </div>
      <MobileProductInfo :params2="params2" :detail="detail"></MobileProductInfo>
      <div class="mobile_btn" v-if="params2!=='1'">
        <button disabled v-if="detail.status===7">已售罄</button>
        <button @click="openMask" :disabled="detail.status===4" v-else>立即购买</button>
      </div>
      <div class="mobile_btn" v-else>
        <button disabled v-if="detail.status===2">已售罄</button>
        <button disabled v-else-if="detail.status===3">产品撤销</button>
        <button @click="openMask" :disabled="detail.status===4" v-else>立即购买</button>
      </div>
      <div class="popup" v-if="sheetVisible" @click="closeMask">
        <div class="popup_con buy_box">
          <div class="img_text">
            <div class="popup_img">
              <img :src="detail.product_img||detail.minerPicture" alt="">
            </div>
            <div class="popup_text">
              <div class="price">￥{{detail.one_amount_value}}</div>
              <div class="name">{{detail.name}}</div>
              <div class="left">剩余可售{{leftNum}}台</div>
            </div>
          </div>
          <div class="buy_num">
            <div>购买数量<span class="buy_tips">({{parseInt(detail.single_limit_amount)||1}}台起售)</span></div>
            <div class="input_box">
              <span @click="changeNum(+number-1)">-</span>
              <input type="text" v-model="number" placeholder="购买数量" @blur="changeNum(number)">
              <span @click="changeNum(+number+1)">+</span>
            </div>
          </div>
          <div class="buy_text">
            <div class="item">购买算力</div>
            <div class="item">{{totalHash|format}}T</div>
          </div>
          <div class="buy_text last">
            <div class="item">支付金额</div>
            <div class="item">{{totalPrice|format}}元</div>
          </div>
          <div class="mobile_btn" style="z-index:9999999;">
            <button @click="checkPay($event, false)">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import ProductInfo from '@/components/miner/ProductInfo'
  import MobileProductInfo from '@/components/miner/MobileProductInfo'
  export default {
    components: {
      ProductInfo, MobileProductInfo
    },
    data () {
      return {
        detail: {incomeType: '每日结算，次日发放', fee: '', product_name: '', name: ''},
        totalPrice: 0,
        totalHash: 0,
        number: '',
        initNum: 0,
        leftNum: 0,
        balance: 0,
        buyStatus: 0,
        content: '',
        content1: '',
        show: '',
        params1: '',
        params2: '',
        proData: {one_amount_value: {title: '每台价格', unit: '元'}, hash: {title: '每台算力', unit: 'T'}, amount: {title: '出售总数', unit: '台'}},
        proText: {hashType: '算力类型', status: '购买类型', incomeType: '结算方式'},
        infolists: [{name: 'machine_advantage', title: '产品优势'}, {name: 'machine_intro', title: '产品参数'}, {name: 'machine_agreement', title: '协议说明'}, {name: 'product_photos', title: '矿场相册'}],
        infolist: [{name: 'MInerBrief', title: '产品介绍'}, {name: 'MinerAdvantage', title: '产品参数'}, {name: 'prProtocolSpeciaification', title: '补充说明'}],
        params: {chips_num: '芯片数量', hash: '额定算力', voltage: '额定电压', minerSize: '矿机尺寸', minerOuterSize: '外箱尺寸', cooling: '冷却', temperature: '工作温度', humidity: '工作湿度', network: '网络连接', weight: '净重', wallPower: '墙上功耗'},
        mobileNav1: {hash: {title: '服务器算力', unit: 'T'}, weight: {title: '服务器重量', unit: 'kg'}, single_limit_amount: {title: '最少购买数量', unit: ''}},
        mobileNav2: {hashType: {title: '算力类型', unit: ''}, amount: {title: '服务器总数', unit: '台'}, incomeType: {title: '结算方式', unit: ''}},
        statusObj: {1: {title: '热销中', color: 'red'}, 2: {title: '已售罄', color: 'gray'}, 3: {title: '产品撤销', color: 'gray'}, 4: {title: '预热中', color: 'red'}},
        str: {4: '预热中', 5: '可售', 7: '已售馨'},
        sheetVisible: false,
        active: 0,
        isFixTop: false
      }
    },
    methods: {
      checkPay (e, sh) {
        var startTime = this.detail.sell_start_time
        var now = Date.parse(new Date()) / 1000
        if (this.detail.status === 4) {
          api.tips('暂不能购买')
          return false
        }
        if (now < startTime) {
          api.tips('还未到开售时间，开售时间为：' + api.date(new Date(startTime * 1000)))
          return false
        }
        if (!this.token) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'auth-login'})
          this.$store.commit('LOGOUT')
          return false
        }
        if (!(this.true_name && this.true_name.status === 1)) {
          api.tips('请先实名认证', this.isMobile, () => {
            if (this.isMobile) {
              this.$router.push({name: 'mobile-administration'})
            } else {
              this.$router.push({name: 'user-account'})
            }
          })
          return false
        }
        this.goPay(e, sh)
      },
      openMask () {
        document.body.style.overflow = 'hidden'
        window.scroll(0, 0)
        this.sheetVisible = true
      },
      closeMask (e) {
        var popup = document.querySelector('.popup')
        if (e.target === popup) {
          document.body.style.overflow = 'auto'
          this.sheetVisible = false
        }
      },
      fixTop () {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 500) {
          this.isFixTop = true
        } else {
          this.isFixTop = false
        }
      },
      goPay (e, show) {
        this.show = show
        if (this.number < 1) {
          if (!this.isMobile) {
            this.buyStatus = 1
            setTimeout(() => {
              this.buyStatus = 0
            }, 2000)
          } else {
            api.tips('请输入或添加至少1台矿机', 1)
          }
          return false
        }
        var data = {name: this.detail.name ? this.detail.name : this.detail.product_name, one_amount_value: this.detail.one_amount_value || '', number: this.number || '', hash: this.detail.hash || '', hashType: this.detail.hashType || '', incomeType: this.detail.incomeType || '', output: this.detail.output || '', total_electric_fee: this.detail.total_electric_fee || '', batch_area: this.detail.batch_area || '', isLoan: this.show}
        localStorage.setItem('buy_info', JSON.stringify(data))
        this.$router.push({name: 'minerShop-pay'})
      },
      changeNum (n) {
        var minNum = this.detail.single_limit_amount || 1
        if (this.leftNum === 0) return false
        var isOver = n > this.initNum
        if (isOver) {
          this.buyStatus = 2
          setTimeout(() => {
            this.buyStatus = 0
          }, 2000)
        }
        this.number = +n < minNum || isNaN(+n) || typeof +n !== 'number' ? minNum : isOver ? this.initNum : n
        this.number = parseInt(this.number)
        if (n > this.initNum) {
          this.buyStatus = 2
          setTimeout(() => {
            this.buyStatus = 0
          }, 2000)
        }
        this.totalPrice = this.detail.one_amount_value * this.number
        this.totalHash = this.detail.hash * this.number
      },
      getData () {
        if (this.params1) {
          var self = this
          var url = ''
          var data = {token: this.token}
          if (this.params2 === '1') {
            url = 'miner_detail'
            data = Object.assign({miner_id: this.params1}, data)
          } else {
            url = 'productDetail'
            data = Object.assign({product_id: this.params1}, data)
          }
          util.post(url, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.initNum = res.amount - res.buyed_amount
              self.leftNum = self.initNum
              self.detail = Object.assign(self.detail, res)
              if (self.params2 !== '1') {
                self.detail = Object.assign(self.detail, res.has_product_miner_base)
                self.detail.name = res.product_name
                self.detail.hashType = (res.hashtype && res.hashtype.name) || ''
              } else {
                self.detail.name = res.name
                self.detail = Object.assign(self.detail, res.miner_list)
                self.detail.weight = (res.miner_list && res.miner_list.weight) || ''
              }
            })
          })
          if (this.addressObj.id) {
            this.number = this.addressObj.num
            this.getBuyInfo()
          }
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    mounted () {
      var p = localStorage.getItem('params')
      if (p) {
        p = JSON.parse(p)
        this.params1 = p[0]
        this.params2 = p[1]
      } else {
        this.$router.push({path: '/minerShop/list'})
      }
      this.getData()
      window.addEventListener('scroll', this.fixTop, false)
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        true_name: state => state.info.true_name,
        isMobile: state => state.isMobile,
        addressObj: state => state.addressData
      })
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .product{
    background: #f7f8fa;
    padding-bottom: 50px;
    .top_nav{
      background-image: url('~assets/images/miner_shop/miner_bg.jpg');
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
          width: 50%;
          // height: 323px;
          margin-top: 78px;
        }
      }
      .miner_right{
        padding-top: 20px;
        width: 550px;
        float: left;
        h4{
          color: #666666;
          font-weight: 800;
          font-size: 22px;
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
            position: relative;
            top: -4px;
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
            font-size: 21px;
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
          font-size: 14px;
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
          &:disabled{
            // opacity: 0.7;
            background: #b5b0af;
          }
        }
      }
    }
    .cloud_miner{
      .cloud_miner_left{
        width: 722px;
        height: 100%;
        padding-top: 53px;
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
          display: flex;
          justify-content: space-between;
          aligns-item: center;

          .item {
            display: flex;
            justify: flex-start;
            flex-direction: column;

            .num {
              color: #333;
              font-size: 30px;
            }
            .unit {
              margin-left: 7px;
            }

            &:nth-of-type(1) {
              .num {
                color: #f00;
                font-weight: 800;
              }
              .unit {
                color: #f00;
              }
            }
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
          &:disabled{
            // opacity: 0.7;
            background: #b5b0af;
          }
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
      .first_box{
        background: #fff;
        padding: 15px;
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
      .popup{
        .buy_box{
          width:100vw;
          padding:0 15px;
          .img_text,.buy_num{
            padding: 15px 0;
          }
          .img_text{
            @include flex
            .popup_img{
              width:130px;
              margin-right:15px;
              height:90px;
              img{
                height:90px;
                width: 130px;
                object-fit:cover
              }
            }
            .popup_text{
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
          .mobile_btn{
            position: relative;
            border:0
          }
        }
      }
      .mobile_btn{
        @include mobile_footer_btn
      }
    }
  }
</style>
