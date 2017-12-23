<template>
  <section class="product_list">
    <div class="box">
      <slot></slot>
      <div class="data">
        <template v-if="!isMobile">
          <div :class="['item', {'disabled': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]" v-for="d,k in $parent.cloudMinerDate" @click="goPay(d.id, d.sell_type)" :disabled="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">
            <h3 :class="[{'barnum3': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">{{page==='compute'?d.product_name:d.name}}<span :class="'icon_currency '+d.hashtype&&d.hashtype.name" v-if="d.hashtype"></span><span :class="['sell_type', {active: d.sell_type===2}]" v-if="page==='minerShop'&&d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]}}</span><span class="sell_type gray" v-if="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">已售罄</span></h3>
            <div class="info_box">
              <template v-for="n,i in dataNav">
                <div class="info" v-if="i==='leftNum'">
                  <div class="text">
                    <span :class="['num', {'barnum': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">{{d.amount-d.buyed_amount}}</span>
                    <span :class="[{'barnum1': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">{{n.unit}}</span>
                  </div>
                  <p :class="[{'barnum2': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">{{n.title}}</p>
                </div>
                <div class="info" v-else>
                  <div class="text">
                    <span :class="['num', {'barnum': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]" v-if="i==='buyed_amount'">{{d.buyed_amount - 0.00}}</span>
                    <span :class="['num', {'barnum': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]" v-else-if="i==='hashtype'">{{d[i].name}}</span>
                    <span :class="['num', {'barnum': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]" v-else>{{d[i]}}</span>
                    <span :class="[{'barnum1': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">{{n.unit}}</span>
                  </div>
                  <p :class="[{'barnum2': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">{{n.title}}</p>
                </div>
                <div class="line"></div>
              </template>
              <template v-if="page==='compute'">
                <button class="btn" v-if="d.status===1">立即购买</button>
                <button class="btn" disabled v-else-if="d.status===2">已转让</button>
                <button class="btn" disabled v-else-if="d.status===3">产品撤销</button>
              </template>
              <template v-else>
                <button class="btn" v-if="d.amount-d.buyed_amount>0">立即购买</button>
                <button class="btn disabled" v-else>已售罄</button>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="len" class="list_lists" v-if="!showcontent">
            <div class="item" v-for="d,k in cloudMinerDate" @click="goPay(d.id, d.sell_type)" :disabled="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">
              <h3>{{page==='compute'?d.product_name:d.name}}<span :class="'icon_currency '+d.hashtype&&d.hashtype.name" v-if="d.hashtype"></span><span :class="['sell_type', {active: d.sell_type===2}]" v-if="page==='minerShop'&&d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]}}</span><span class="sell_type gray" v-if="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">已售罄</span></h3>
              <div class="mobile_info_box">
                <div class="mobile_info">
                  <h4>每台单价<span><b>{{d.one_amount_value}}</b>元</span></h4>
                  <div class="mobile_text">
                    <div class="mobile_text_item">每台单价<b>{{d.hash}}T</b></div>
                    <div class="mobile_text_item">剩余可售<b>{{d.amount-d.buyed_amount}}台</b></div>
                  </div>
                </div>
                <div class="circle sell_progress">
                  <template v-if="(((d.amount-d.buyed_amount)/d.amount*100).toFixed(1))<=180">
                      <div class="pie_left"><div class="left"></div></div>
                    <div class="pie_right"><div class="right"  :style="{transform:'rotate(-'+(((d.amount-d.buyed_amount)/d.amount*100).toFixed(1) * 3.6)+'deg)'}"></div></div>
                  </template>
                  <template v-else>
                      <div class="pie_left"><div class="left" :style="{transform:'rotate(-'+((((d.amount-d.buyed_amount)/d.amount*100).toFixed(1) - 180) * 3.6)+'deg)'}"></div></div>
                      <div class="pie_right"><div class="right" :style="{transform:'rotate('+180+'deg)'}"></div></div>
                  </template>
                  <div class="mask"><span>{{((d.amount-d.buyed_amount)/d.amount*100).toFixed(1)}}</span>%</div>
                </div>
              </div>
            </div>
          </div>
          <p v-if="loading && !showcontent"  class="loadmore">加载中······</p>
          <p v-if="showno" class="showno loadmore">暂无数据······</p>
        </template>
        <div class="nodata" v-if="$parent.show">
          <div class="nodata_img"></div>
          <p>即将上线，敬请期待</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)
  export default {
    props: {
      page: {
        type: String
      },
      status: {
        type: Number
      }
    },
    data () {
      return {
        sortNav2: [{name: 'status', title: '商品状态', options: [{code: 0, title: '综合推荐'}, {code: 4, title: '预热'}, {code: 5, title: '热销'}, {code: 7, title: '已售罄'}]}],
        dataNav: {'buyed_amount': {title: '出售总数', unit: '台'}, 'one_amount_value': {title: '每台单价', unit: '元'}, 'hash': {title: '每台算力', unit: 'T'}, 'power': {title: '功耗', unit: 'T'}, 'hashtype': {title: '算力类型', unit: ''}, 'leftNum': {title: '剩余数量', unit: '台'}},
        str: {4: '预热', 5: '热销'},
        loading: false,
        showcontent: false,
        cloudMinerDate: [],
        showno: false,
        len: 0,
        now: 1,
        total: -1,
        currentPage: 1
      }
    },
    asyncData ({ params }) {
      return {type: params.type}
    },
    methods: {
      loadMore () {
        let self = this
        let obj = {token: this.token, page: this.currentPage, product_type: '1'}
        this.loading = true
        if (this.total === 0) {
          this.loading = false
          this.showno = true
          return
        } else {
          this.showno = false
        }
        this.type = this.$route.params.type
        if (this.status) {
          obj = Object.assign({status: this.status}, obj)
        }
        if (this.total > this.cloudMinerDate.length || this.cloudMinerDate.length === 0) {
          let time = this.cloudMinerDate.length === 0 ? 0 : 1000
          setTimeout(() => {
            util.post('productList', {sign: api.serialize(obj)}).then(function (res) {
              api.checkAjax(self, res, () => {
                self.total = res.page.count
                for (let i = 0, len = res.data.length; i < len; i++) {
                  self.cloudMinerDate.push(res.data[i])
                }
                self.loading = false
                self.currentPage++
              })
            }).catch(res => {
              console.log(res)
            })
          }, time)
        } else {
          this.loading = false
        }
      },
      goPay (id, selltype) {
        // var info = JSON(localStorage.getItem('info'))
        var data = {}
        if (selltype === 1) {
          // data = {orderType: '2', orderId: id}
          localStorage.setItem('params', JSON.stringify([ id, '2']))
        } else {
          // data = {orderType: '0', orderId: id}
          localStorage.setItem('params', JSON.stringify([ id, '0']))
        }
        // localStorage.setItem('info', JSON.stringify(Object.assign(info, data)))
        this.$router.push({path: '/' + this.page + '/detail/'})
      }
    },
    mounted () {
      this.loadMore()
    },
    watch: {
      'status': function () {
        this.currentPage = 1
        this.cloudMinerDate = []
        this.total = -1
        this.loadMore()
      }
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
  @import '../../assets/css/style.scss';
  .product_list{
    padding-top:20px;
    padding-bottom:30px;
    background: #f6f7f9;
    .box{
      @include main
      h2{
        @include data_title
      }
      .data{
        .item{
          padding:30px 50px;
          background: $white;
          cursor: pointer;
          h3{
            font-size: 18px;
            margin-bottom:10px;
            &.barnum3{
              color: #999;
            }
            .icon_currency{
              margin-left:5px;
            }
            .sell_type{
              font-size: 12px;
              margin-left:8px;
              width:58px;
              height: 18px;
              text-align: center;
              border-radius:18px;
              line-height:15px;
              color:#ff721f;
              display: inline-block;
              border:1px solid #ff721f;
              position: relative;
              top: -4px;
              &.gray{
                border:1px solid #999;
                color: #999;
                background: none;
              }
              &.active{
                border-color:$blue;
                color:$blue;
              }
            }
          }
          .info_box{
            @include flex(space-between)
            .info{
              width:14%;
              padding-left: 18px;
              .text .num{
                font-size: 24px;
              }
              .barnum, .barnum1{
                color: #999 !important;
              }
              .barnum2{
                color: #c3bebe !important;
              }
              &:first-child{
                .text{
                  color: $orange
                }
              }
              p{
                color: $light_black;
              }
            }
            .line{
              width:1px;
              height: 35px;
              margin-top: 12px;
              background: $border
            }
            .btn{
              border:0;
              width:145px;
              color: $orange;
              text-align: center;
              line-height: 48px;
              border-radius:5px;
              background: transparent;
              &.disabled{
                color: #999;
              }
              &:disabled{
                // cursor: no-drop;
                color:$light_black
              }
            }
          }
          .mobile_info_box{
            display: none;
          }
          &:not(:last-child){
            margin-bottom:10px;
          }
          &:hover{
            background: #ecf3ff;
            .btn:not(:disabled){
              @include button($orange)
              cursor: pointer;
            }
            .btn.disabled{
               background: none;
               border:0;
               color: #999;
            }
          }
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
    @media screen and (max-width: $mobile) {
      margin-top:0;
      padding:15px 0;
      .box .data .item{
        @include mobile_data
      }
    }
  }
  .product_list .box .data .item .mobile_info_box .sell_progress{
    border:0;
  }
  .circle {
            width: 70px;
            height: 70px;
            position: absolute;
            border-radius: 50%;
            background: #e5e5e5;
      text-align:  center;
      box-sizing: border-box;
      border:0;
      border: 2px solid #e5e5e5;
      right: 0.5rem;
      box-sizing: border-box;
      overflow: hidden;
      .pie_left, .pie_right {
            width:70px;
            height:70px;
            position: absolute;
            top: 0;left: 0;
        }
        .left, .right {
            width:70px;
            height:70px;
            background:#ffb386;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
        }
        .pie_right, .right {
            clip:rect(0,auto,auto,35px);
        }
        .pie_left, .left {
            clip:rect(0,35px,auto,0);
        }
        .mask {
            width: 66px;
            height: 66px;
            border-radius: 50%;
            background: #FFF;
            position: absolute;
            text-align: center;
      left:2px;
      top:2px;
            line-height: 70px;
            font-size: 0.7rem;
      margin: 0 auto;
            color: #ffb386;
      box-sizing: border-box;
        }
    }
  .loadmore{
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
    }
</style>
