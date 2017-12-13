<template>
  <section class="detail">
    <template v-if="!show">
      <h2>订单详情</h2>
      <h3>运行状况</h3>
      <div class="detail_box">
        <div class="process" v-if="orderType != '1'">
          <div :class="['item', {active: k===processStatus}]" v-for="p,k in processText">
            <i><template v-if="k>=processStatus">{{k+1}}</template></i>
            <span>{{p}}</span>
            <div class="line" v-if="k<3"></div>
          </div>
        </div>
        <div class="detailinfo">
          <template v-for="i,k in info3">
            <div class="item">
              <p>{{i}}</p>
              <div class="profit"><span>{{data[k]||'0.00000000'}}</span>Btc</div>
            </div>
            <div class="line"></div>
          </template>
        </div>
      </div>
      <h3>基本信息</h3>
      <div class="detail_box">
        <div class="detail_table">
          <div class="item" v-for="d,k in nav">
            <div class="item_title">{{d[0]}}</div>
            <div class="item_value">{{data[k]}}{{d[1]}}</div>
          </div>
          <div class="item" v-if="Object.keys(nav).length%2">
            <div class="item_title"></div>
            <div class="item_value"></div>
          </div>
        </div>
        <div class="detail_btn">
          <button @click="getContract">查看协议</button>
          <button @click="getBaoquan">查看保全</button>
        </div>
      </div>
    </template>
    <div v-if="show" class="agreement_text">
      <div class="" v-html="contract.hash_res&&contract.hash_res.content"></div>
      <div class="" v-html="contract.host_res&&contract.host_res.content"></div>
      <div class="btn_box">
        <button @click="back">返回</button>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        processText: ['订单下达', '矿场确认', '矿机上架', '回报计算'],
        processStatus: 1,
        info: {realized_income_value: '累计已获得收益', today_income: '今日收益', total_realized_power_fee_value: '今日支付运维费'},
        info2: {realized_income_value: '累计已获得收益', today_income_value: '今日收益', today_power_fee_value: '今日支付运维费'},
        data: {},
        type: {hash_type: ['算力类型', ''], product_name: ['矿机名称', ''], buy_amount: ['购买数量', '台'], create_time: ['购买日期', ''], pay_value: ['购买金额', '元'], income_type: ['收益方式', ''], total_hash: ['总算力', 'T']},
        computeType: {type_name: ['代币类型', ''], buy_amount: ['购买数量', 'T'], create_time: ['购买日期', ''], pay_value: ['购买金额', '元'], manner: ['发币方式', '']},
        nav: {},
        info3: {},
        show: false,
        contract: ''
      }
    },
    methods: {
      getContract () {
        var requestUrl = ''
        var data = {}
        var self = this
        if (this.orderType === '0') {
          requestUrl = 'hash_contract'
          data = {token: this.token, order_id: this.orderId}
        }
        if (this.orderType === '1') {
          requestUrl = 'rent_contract'
          data = {token: this.token, transfer_id: this.orderId}
        }
        util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            if (res === '暂无协议') {
              api.tips(res, self.isMobile)
            } else {
              self.show = true
              self.contract = res
            }
          })
        })
      },
      getBaoquan (id) {
        var data = {token: this.token, order_id: this.orderId, security_hash_type: this.orderType, user_id: this.user_id}
        var self = this
        var newTab = window.open('about:blank')
        util.post('getBaoquan', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            newTab.location.href = 'https://www.baoquan.com/attestations/' + res
          })
        })
      },
      back () {
        this.show = false
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          this.nav = this.orderType !== '1' ? this.type : this.computeType
          this.info3 = this.orderType !== '1' ? this.info : this.info2
          var requestUrl = this.orderType !== '1' ? 'showOrderDetail' : 'getTransferRecord'
          var data = this.orderType !== '1' ? {token: this.token, order_id: this.orderId} : {token: this.token, orderid: this.orderId}
          util.post(requestUrl, {sign: api.serialize(data)}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.data = res
            })
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      }
    },
    asyncData ({ params }) {
      return {orderType: params.id.split('&')[0], orderId: params.id.split('&')[1]}
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .detail{
    padding:15px;
    h2{
      margin-bottom:15px;
      padding-left:15px
    }
    .detail_box{
      .process{
        @include process
      }
      .detailinfo{
        padding:25px 30px;
        @include flex(space-between)
        .item{
          &:first-child .profit{
            span{
              color:$orange
            }
          }
          p{
            margin-bottom:10px
          }
          .profit{
            span{
              font-size: 24px;
              color:#000;
              margin-right:15px
            }
          }
        }
        .line:not(:last-child){
          width:1px;
          height:40px;
          background: $border;
        }
      }
      .detail_table{
        @include detail
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
  }
</style>
