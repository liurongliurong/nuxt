<template>
  <section class="order_detail">
    <div class="pc_box" v-if="isMobile===0&&!show">
      <h2>订单详情</h2>
      <h3>订单状态</h3>
      <div class="detail_box">
        <div class="process" v-if="orderType !== 1">
          <div :class="['item', {active: k===processStatus}]" v-for="p,k in processText[orderType]">
            <i><template v-if="k>=processStatus">{{k+1}}</template></i>
            <span>{{p}}</span>
            <div class="line" v-if="k<3"></div>
          </div>
        </div>
      </div>
      <template v-if="orderType === 3">
        <h3>地址信息</h3>
        <div class="detail_box address_box">
          <p>{{data.post_addr+'('+data.post_user+' '+data.post_mobile+")"}}</p>
        </div>
      </template>
      <h3>基本信息</h3>
      <div class="detail_box">
        <div class="detail_table">
          <div class="item" v-for="d,k in type[orderType]">
            <div class="item_title">{{d[0]}}</div>
            <div class="item_value" v-if="k === 'hash_type'">{{data[k]||'BTC'}}</div>
            <div class="item_value" v-else>{{data[k]}}{{d[1]}}</div>
          </div>
          <div class="item" v-if="orderType === 3">
            <div class="item_title">总算力</div>
            <div class="item_value">{{data.hash*data.buy_amount}}T</div>
          </div>
        </div>
      </div>
      <h3>补充说明</h3>
      <div class="agreement_content" v-html="(orderType !== 3?data.machine_agreement:data.prProtocolSpeciaification)||'暂无'"></div>
      <div class="detail_btn">
        <button @click="getContract">查看协议</button>
        <button @click="getBaoquan">查看保全</button>
      </div>
    </div>
    <div class="mobile_box" v-if="isMobile===1&&!show">
      <div class="detail_box" v-if="orderType !== 1">
        <div class="process">
          <div :class="['item', {active: k===processStatus}]" v-for="p,k in processText[orderType]">
            <div class="spot"></div>
            <div>{{p}}</div>
          </div>
        </div>
      </div>
      <div class="detail_box" v-if="orderType !== 3">
        <div class="data_item miner_name">
          <div>算力服务器名称</div>
          <div class="profit">{{data.miner_name}}</div>
        </div>
        <div class="data_item" v-for="i,k in info[orderType]">
          <div>{{i}}</div>
          <div class="profit"><span>{{data[k]||'0.00000000'}}</span>Btc</div>
        </div>
      </div>
      <div class="detail_box" v-if="orderType === 3">
        <p>{{'收货人地址'+'：'+data.post_user+' '+data.post_mobile}}</p>
        <p>{{data.post_addr}}</p>
      </div>
      <div class="detail_box">
        <div class="data_item" v-for="d,k in type[orderType]">
          <div class="item_title">{{d[0]}}</div>
          <div class="item_value" v-if="k === 'hash_type'">{{data[k]||'BTC'}}</div>
          <div class="item_value" v-else>{{data[k]}}{{d[1]}}</div>
        </div>
        <div class="data_item" v-if="orderType === 3">
          <div class="item_title">总算力</div>
          <div class="item_value">{{data.hash*data.buy_amount}}T</div>
        </div>
        <div class="data_item get_contract" @click="getContract">
          <div class="item_title">查看协议</div>
          <div class="item_value"></div>
        </div>
      </div>
      <div class="detail_btn">
        <button @click="getBaoquan">查看保全</button>
      </div>
      <!-- <div class="detail_box">
        <div class="agreement_content" v-html="(orderType !== 3?data.machine_agreement:data.prProtocolSpeciaification)||'暂无'"></div>
      </div> -->
    </div>
    <div v-if="show" class="agreement_text">
      <template v-if="orderType!==3">
        <div class="" v-html="contract.hash_res&&contract.hash_res.content"></div>
        <div class="" v-html="contract.host_res&&contract.host_res.content"></div>
      </template>
      <div v-else v-html="contract.miner_res&&contract.miner_res.content"></div>
      <div class="btn_box">
        <button @click="show=false">返回</button>
      </div>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        processText: {3: ['订单完成', '算力服务器发货'], 0: ['订单完成', '机器上架', '机器运行', '收益计算']},
        processStatus: 1,
        info: {0: {realized_income_value: '累计已获得收益', today_income: '今日收益', total_realized_power_fee_value: '今日支付运维费'}, 1: {realized_income_value: '累计已获得收益', today_income_value: '今日收益', today_power_fee_value: '今日支付运维费'}},
        data: {},
        type: {0: {hash_type: ['算力类型', ''], buy_amount: ['购买数量', '台'], create_time: ['购买日期', ''], pay_value: ['购买金额', '元'], income_type: ['收益方式', ''], total_hash: ['总算力', 'T'], product_name: ['算力服务器型号', ''], bdc_name: ['所在BDC', '']}, 1: {type_name: ['代币类型', ''], buy_amount: ['购买数量', 'T'], create_time: ['购买日期', ''], pay_value: ['购买金额', '元'], manner: ['发币方式', '']}, 3: {name: ['算力服务器型号', ''], buy_amount: ['购买数量', '台'], created_time: ['购买日期', ''], pay_value: ['购买金额', '元'], hash_type: ['算力类型', '']}},
        requestUrl: {0: 'showOrderDetail', 3: 'showMinerDetail'},
        show: false,
        contract: '',
        orderId: 0,
        orderType: 0
      }
    },
    methods: {
      getContract () {
        var requestUrl = ''
        var data = {}
        if (this.orderType === 0) {
          requestUrl = 'hash_contract'
          data = {token: this.token, order_id: this.orderId}
        }
        if (this.orderType === 1) {
          requestUrl = 'rent_contract'
          data = {token: this.token, transfer_id: this.orderId}
        }
        if (this.orderType === 3) {
          requestUrl = 'miner_contract'
          data = {token: this.token, order_id: this.orderId}
        }
        fetchApiData(this, requestUrl, data, (res) => {
          if (res === '暂无协议') {
            api.tips(res)
          } else {
            this.show = true
            this.contract = res
          }
        })
      },
      getBaoquan () {
        var data = {token: this.token, order_id: this.orderId, security_hash_type: this.orderType}
        // var newTab = window.open('about:blank')
        // var a = document.createElement('a')
        // document.body.appendChild(a)
        // a.target = '_blank'
        fetchApiData(this, 'getBaoquan', data, (res) => {
          // newTab.location.href = 'https://www.baoquan.com/attestations/' + res
          // a.click()
          // document.body.removeChild(a)
          if (this.isMobile) {
            location.href = 'https://www.baoquan.com/mobile/attestations/' + res
          } else {
            location.href = 'https://www.baoquan.com/attestations/' + res
          }
        })
      },
      getData () {
        if (this.token !== 0 && this.orderId) {
          var requestUrl = this.requestUrl[this.orderType]
          var data = this.orderType !== 1 ? {token: this.token, order_id: this.orderId} : {token: this.token, orderid: this.orderId}
          fetchApiData(this, requestUrl, data, (res) => {
            this.data = res
            this.processStatus = res.status === 8 ? 3 : 1
            if (res.miner) {
              this.data = Object.assign(this.data, res.miner)
            }
            if (res.user_addr) {
              this.data = Object.assign(this.data, res.user_addr)
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
      var p = localStorage.getItem('info')
      if (p) {
        p = JSON.parse(p)
        this.orderId = +p.orderId
        this.orderType = +p.orderType
        this.getData()
      } else {
        this.$router.push({path: '/order/0'})
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .order_detail{
    padding-bottom:61px;
    .pc_box{
      padding:15px;
      h2{
        margin-bottom:15px;
        padding-left:15px
      }
      .detail_box{
        .process{
          @include process
        }
        .detail_table{
          @include detail
        }
        &.address_box{
          padding:15px;
          font-size: 16px;
        }
      }
      .agreement_content{
        padding:15px;
      }
      .detail_btn{
        // display: none;
        margin:30px 15px;
        text-align: right;
        button{
          @include button($blue)
          padding:5px 15px;
          & + button{
            margin-left:10px
          }
        }
      }
    }
    .mobile_box{
      background: #f4f4f4;
      min-height: calc(100vh - 0.88rem);
      padding-bottom: 57px;
      .detail_box{
        background: #fff;
        color:$light_text;
        padding:0.3rem;
        margin-bottom:0.2rem;
        .data_item{
          @include flex(space-between)
          line-height: 2;
          &.get_contract{
            color:#000;
            .item_value{
              @include block(8)
              @include arrow(right,#000,1)
            }
          }
          &.miner_name{
            color:#000;
            font-size: 0.34rem;
            margin-bottom:0.2rem
          }
        }
        .process{
          @include flex
          .item{
            position: relative;
            flex:1;
            text-align: center;
            .spot{
              @include block(16,50%)
              border:1px solid #1BACFF;
              &:after{
                position: relative;
                content: '';
                display: block;
                width:6px;
                height:6px;
                margin-left:calc(50% - 3px);
                margin-top:calc(50% - 3px);
                background: #1BACFF;
                border-radius:50%;
              }
            }
            &:not(:first-child){
              .spot:before{
                content:'';
                position: absolute;
                top:7px;
                width:calc(100% - 16px);
                right:calc(50% + 8px);
                height:1px;
                background: #1BACFF;
                z-index: 1;
              }
            }
            &.active{
              color:#1BACFF;
              & ~ .item{
                .spot{
                  border-color:#ccc;
                  &:after{
                    background: #ccc;
                  }
                  &:before{
                    background: #ccc;
                  }
                }
              }
            }
          }
        }
      }
      .detail_btn{
        @include mobile_footer_btn
        button {
          background-color: $blue;
        }
      }
    }
    .agreement_text{
      padding:15px;
      .btn_box{
        text-align: center;
        button{
          line-height: 2;
          width:120px;
          margin:30px auto;
          @include button($blue)
        }
      }
    }
    @media screen and (max-width: 768px) {
      padding-bottom: 0;
    }
  }
</style>
