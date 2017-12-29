<template>
  <section class="product">
    <template v-if="isMobile===0">
      <div class="top_nav">
        <div class="top_nav_box">
          <router-link to="/minerShop/list">矿机商城</router-link>
          <span>></span>
          <router-link to="/minerShop/miner/1" v-if="params2==='1'">矿机</router-link>
          <router-link to="/minerShop/miner/2" v-else>云算力</router-link>
          <span>></span>
          <em>{{detail.name}}</em>
        </div>
        <BaseInfo :params2="params2" :detail="detail"></BaseInfo>
      </div>
      <ProductInfo :params2="params2" :detail="detail"></ProductInfo>
    </template>
    <div class="mobile_box" v-else-if="isMobile===1">
      <MobileBaseInfo :params2="params2" :detail="detail"></MobileBaseInfo>
      <MobileProductInfo :params2="params2" :detail="detail"></MobileProductInfo>
      <div class="mobile_btn">
        <button disabled v-if="detail.status===7||detail.status===2">已售罄</button>
        <button disabled v-else-if="detail.status===3">产品撤销</button>
        <button disabled v-else-if="detail.status===4">立即购买</button>
        <button @click="openMask" v-else>立即购买</button>
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
  import BaseInfo from '@/components/miner/BaseInfo'
  import MobileBaseInfo from '@/components/miner/MobileBaseInfo'
  export default {
    components: {
      ProductInfo, MobileProductInfo, MobileBaseInfo, BaseInfo
    },
    data () {
      return {
        detail: {incomeType: '每日结算，次日发放', fee: '', product_name: '', name: '', status: 0},
        infolists: [{name: 'machine_advantage', title: '产品优势'}, {name: 'machine_intro', title: '产品参数'}, {name: 'machine_agreement', title: '协议说明'}, {name: 'product_photos', title: '矿场相册'}],
        infolist: [{name: 'MInerBrief', title: '产品介绍'}, {name: 'MinerAdvantage', title: '产品参数'}, {name: 'prProtocolSpeciaification', title: '补充说明'}],
        params: {chips_num: '芯片数量', hash: '额定算力', voltage: '额定电压', minerSize: '矿机尺寸', minerOuterSize: '外箱尺寸', cooling: '冷却', temperature: '工作温度', humidity: '工作湿度', network: '网络连接', weight: '净重', wallPower: '墙上功耗'},
        statusObj: {1: {title: '热销中', color: 'red'}, 2: {title: '已售罄', color: 'gray'}, 3: {title: '产品撤销', color: 'gray'}, 4: {title: '预热中', color: 'red'}},
        str: {4: '预热中', 5: '可售', 7: '已售馨'},
        totalPrice: 0,
        totalHash: 0,
        number: '',
        leftNum: 0,
        balance: 0,
        buyStatus: 0,
        content: '',
        content1: '',
        isLoan: '',
        params1: '',
        params2: '',
        sheetVisible: false,
        isFixTop: false
      }
    },
    methods: {
      checkPay (e, isLoan) {
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
        this.goPay(e, isLoan)
      },
      openMask () {
        if (this.detail.status !== 1 && this.detail.status !== 5) {
          return false
        }
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
      goPay (e, isLoan) {
        this.isLoan = isLoan
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
        var data = {name: this.detail.name ? this.detail.name : this.detail.product_name, one_amount_value: this.detail.one_amount_value || '', number: this.number || '', hash: this.detail.hash || '', hashType: this.detail.hashType || '', incomeType: this.detail.incomeType || '', output: this.detail.output || '', total_electric_fee: this.detail.total_electric_fee || '', batch_area: this.detail.batch_area || '', isLoan: this.isLoan}
        localStorage.setItem('buy_info', JSON.stringify(data))
        this.$router.push({name: 'minerShop-pay'})
      },
      changeNum (n) {
        if (this.leftNum === 0) return false
        var minNum = this.detail.single_limit_amount || 1
        var isOver = n > this.leftNum
        if (isOver) {
          this.buyStatus = 2
          setTimeout(() => {
            this.buyStatus = 0
          }, 2000)
        }
        this.number = +n < minNum || isNaN(+n) || typeof +n !== 'number' ? minNum : isOver ? this.leftNum : n
        this.number = parseInt(this.number)
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
              self.leftNum = res.amount - res.buyed_amount
              self.detail = Object.assign(self.detail, res)
              self.detail.sellProgress = ((+self.detail.buyed_amount)/self.detail.amount*100).toFixed(0)+'%'
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
      .top_nav_box{
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
    .mobile_box{
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
