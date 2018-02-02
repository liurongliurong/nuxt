<template>
  <section class="product">
    <template v-if="isMobile===0">
      <div class="top_nav">
        <div class="top_nav_box">
          <router-link to="/minerShop/list">算力服务器商城</router-link>
          <span>></span>
          <router-link to="/minerShop/miner" v-if="params2==='1'">算力服务器</router-link>
          <router-link to="/minerShop/cloudCompute" v-else>云算力</router-link>
          <span>></span>
          <em>{{detail.name}}</em>
        </div>
        <BaseInfo :params2="params2" :detail="detail" :number="number" @changeNum="changeNum" @checkPay="checkPay"></BaseInfo>
      </div>
      <ProductInfo :params2="params2" :detail="detail" :cloudInfo="cloudInfo" :minerInfo="minerInfo" :params="params"></ProductInfo>
    </template>
    <div class="mobile_box" v-else-if="isMobile===1">
      <MobileBaseInfo :params2="params2" :detail="detail"></MobileBaseInfo>
      <MobileProductInfo :params2="params2" :detail="detail" :cloudInfo="cloudInfo" :minerInfo="minerInfo" :params="params"></MobileProductInfo>
      <div class="mobile_btn">
        <button disabled v-if="detail.status===7||detail.status===2">立即购买</button>
        <button disabled v-else-if="detail.status===3">产品撤销</button>
        <button disabled v-else-if="detail.status===4">立即购买</button>
        <button @click="checkPay" v-else>立即购买</button>
      </div>
      <my-mask title="选择购买数量" @closeMask="closeMask" :maskClose="true" position="bottom" v-if="sheetVisible">
        <template slot="buy_box">
          <div class="buy_text">
            <div>单价</div>
            <div>{{detail.one_amount_value}}元/台</div>
          </div>
          <div class="buy_text">
            <div>数量</div>
            <div class="input_box">
              <span :class="{active:number>detail.single_limit_amount}" @click="changeNum(+number-1)">-</span>
              <input type="text" id="number" :value="number" :placeholder="detail.single_limit_amount+'台起售'" @blur="changeNum($event.target.value)">
              <span :class="{active:number!==detail.leftNum}" @click="changeNum(+number+1)">+</span>
            </div>
          </div>
          <div class="buy_text last">
            <div class="item">总价</div>
            <div class="item">{{(detail.one_amount_value*number)|format}}元</div>
          </div>
          <div class="mobile_btn">
            <button @click="goPay(false)">确认购买</button>
          </div>
        </template>
      </my-mask>
    </div>
    <my-mask title="立即认证" :position="maskPosition" @closeMask="closeMask" v-if="mask">
      <opr-select slot="select_opr" :no="0" @closeMask="closeMask"></opr-select>
    </my-mask>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import ProductInfo from '@/components/miner/ProductInfo'
  import MobileProductInfo from '@/components/miner/MobileProductInfo'
  import BaseInfo from '@/components/miner/BaseInfo'
  import MobileBaseInfo from '@/components/miner/MobileBaseInfo'
  import MyMask from '@/components/common/Mask'
  import OprSelect from '@/components/common/OprSelect'
  export default {
    components: {
      ProductInfo, MobileProductInfo, MobileBaseInfo, BaseInfo, MyMask, OprSelect
    },
    data () {
      return {
        detail: {incomeType: '每日结算，隔日发放', fee: '', product_name: '', name: '', status: 0},
        cloudInfo: [{name: 'machine_advantage', title: '产品优势'}, {name: 'machine_intro', title: '产品参数'}, {name: 'machine_agreement', title: '协议说明'}, {name: 'product_photos', title: 'BDC中心相册'}],
        minerInfo: [{name: 'MInerBrief', title: '产品介绍'}, {name: 'MinerAdvantage', title: '产品参数'}, {name: 'prProtocolSpeciaification', title: '补充说明'}],
        params: {chips_num: '芯片数量', hash: '额定算力', voltage: '额定电压', minerSize: '服务器尺寸', minerOuterSize: '外箱尺寸', cooling: '冷却', temperature: '工作温度', humidity: '工作湿度', network: '网络连接', weight: '净重', wallPower: '墙上功耗'},
        status: {1: '热销', 2: '已售罄', 3: '产品撤销', 4: '预热'},
        str: {4: '预热', 5: '可售', 7: '已售馨', 10: '活动'},
        number: 1,
        buyStatus: 0,
        params1: '',
        params2: '',
        sheetVisible: false,
        mask: false,
        maskPosition: ''
      }
    },
    methods: {
      checkPay (isLoan) {
        if (!this.detail.amount) {
          api.tips('抱歉，库存不足')
          return false
        }
        var startTime = this.detail.sell_start_time
        var now = Date.parse(new Date()) / 1000
        if (now < startTime) {
          api.tips('暂未开售，开售时间为：' + api.date(new Date(startTime * 1000)))
          return false
        }
        if (!this.token) {
          this.$store.commit('SET_URL', this.$route.path)
          this.$router.push({name: 'auth-login'})
          this.$store.commit('LOGOUT')
          return false
        }
        if (!(this.true_name && this.true_name.status === 1)) {
          this.mask = true
          this.maskPosition = 'middle'
          return false
        }
        if (this.isMobile) {
          this.openMask()
        } else {
          this.goPay(isLoan)
        }
      },
      openMask () {
        if (this.detail.status !== 1 && this.detail.status !== 5 && this.detail.status !== 10) {
          return false
        }
        document.body.style.overflow = 'hidden'
        window.scroll(0, 0)
        this.sheetVisible = true
      },
      closeMask (e) {
        document.body.style.overflow = 'auto'
        this.sheetVisible = false
        this.mask = false
      },
      goPay (isLoan) {
        if (this.number < 1) {
          api.tips('请输入或添加至少1台算力服务器')
          return false
        }
        if (this.buyStatus !== 0) {
          return false
        }
        var data = {name: this.detail.name ? this.detail.name : this.detail.product_name, one_amount_value: this.detail.one_amount_value || '', number: this.number || '', hash: this.detail.hash || '', hashType: this.detail.hashType || '', incomeType: this.detail.incomeType || '', output: this.detail.output || '', total_electric_fee: this.detail.total_electric_fee || '', batch_area: this.detail.batch_area || '', isLoan: isLoan, img: this.detail.product_img||this.detail.minerPicture, bdc_id: this.detail.bdc_message_id}
        api.setStorge('info', data)
        this.$router.push({name: 'minerShop-pay'})
      },
      changeNum (n) {
        n = +n
        if (isNaN(n)) {
          this.buyStatus = 2
          api.tips('抱歉，输入有误', () => {
            this.buyStatus = 0
          })
        } else {
          if (this.detail.leftNum === 0) return false
          var minNum = +this.detail.single_limit_amount
          var isOver = n > this.detail.leftNum
          if (isOver) {
            this.buyStatus = 1
            api.tips('抱歉，您输入的数量超出库存', () => {
              this.buyStatus = 0
            })
          }
          this.number = n < minNum ? minNum : isOver ? this.detail.leftNum : n
        }
        document.querySelector('#number').value = this.number
      },
      getData () {
        if (this.params1) {
          var url = ''
          var data = {token: this.token}
          if (this.params2 === '1') {
            url = 'miner_detail'
            data = Object.assign({miner_id: this.params1}, data)
          } else {
            url = 'productDetail'
            data = Object.assign({product_id: this.params1}, data)
          }
          fetchApiData(this, url, data, (res) => {
            this.detail.leftNum = res.amount - res.buyed_amount
            this.detail = Object.assign(this.detail, res)
            this.detail.single_limit_amount = parseInt(this.detail.single_limit_amount) || 1
            this.detail.sellProgress = ((+this.detail.buyed_amount)/this.detail.amount*100).toFixed(0)+'%'
            this.number = this.detail.single_limit_amount
            if (this.params2 !== '1') {
              this.detail = Object.assign(this.detail, res.has_product_miner_base)
              this.detail.name = res.product_name
              this.detail.hashType = (res.hashtype && res.hashtype.name) || ''
              this.detail.statusStr = this.str[res.status]
            } else {
              this.detail.name = res.name
              this.detail = Object.assign(this.detail, res.miner_list)
              this.detail.weight = (res.miner_list && res.miner_list.weight) || ''
              this.detail.statusStr = this.status[res.status]
            }
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    mounted () {
      var p = api.getStorge('suanli')
      if (p && p.proId) {
        this.params1 = p.proId
        this.params2 = p.proType
        this.getData()
      } else {
        this.$router.push({path: '/minerShop/miner/1'})
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
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
      min-height: calc(100vh - 0.88rem);
      padding-bottom: 57px;
      .popup{
        .buy_box{
          font-size: 16px;
          .buy_text{
            @include flex(space-between)
            border-bottom: 1px solid $border;
            margin: 0 15px;
            padding: 10px 0;
            .input_box{
              width:160px;
              line-height: 30px;
              border:1px solid $border;
              @include flex
              span{
                width:30%;
                font-size: 22px;
                text-align: center;
                color: #c5c5c5;
                &.active {
                  color:$light_text;
                }
              }
              input{
                width:40%;
                border-left: 1px solid $border;
                border-right: 1px solid $border;
                line-height: 30px;
                text-align: center;
              }
            }
            &.last{
              .item:last-child{
                color: $orange;
              }
            }
          }
          .mobile_btn{
            position: relative;
            border: 0;
            padding: 15px;
            button{
              background: transparent;
              color: $blue;
              border: 1px solid $blue;
            }
          }
        }
      }
      .mobile_btn{
        @include mobile_footer_btn
      }
    }
    .detail_limit_text{
      font-size: 12px;
      color:$light_black;
    }
  }
</style>