<template>
  <section class="order_manage">
    <div class="pc_box" v-if="isMobile===0">
      <div class="order_title">
        <div class="order_type_select">
          <span class="text_title">订单管理</span>
          <div class="title_content">
            <span class="title_now" v-if="scode">{{title2[nowEdit]}}</span>
            <span class="title_now" v-else>{{title[nowEdit]}}</span>
            <div class="title_list">
              <template v-if="scode">
                <router-link :to="'/user/order/'+k" v-for="n,k in title2" :key="k">{{n}}</router-link>
              </template>
              <template v-else>
                <router-link :to="'/user/order/'+k" v-for="n,k in title" :key="k">{{n}}</router-link>
              </template>
            </div>
          </div>
        </div>
        <nav>
          <a :class="{active: status==k}" href="javascript:;" @click="fetchData(k)" v-for="n,k in nav[nowEdit]">{{n}}</a>
        </nav>
      </div>
      <div class="order_box">
        <table>
          <thead>
            <tr>
             <th>算力服务器</th>
              <th>总算力</th>
              <template v-if="status==2||status==3">
                <th>出售数量</th>
                <th>出售金额</th>
                <th>出售时间</th>
              </template>
              <template v-else>
                <th>购买数量</th>
                <th>购买金额</th>
                <th>购买时间</th>
              </template>
              <th v-if="nowEdit===0&&status==1">剩余可出售</th>
              <th v-if="status!=3">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d,k in data">
              <template v-if="nowEdit===3">
                <td>{{d.miner&&d.miner.name}}</i></td>
                <td>{{((d.miner&&(+d.miner.hash))*+d.buy_amount)|format}}T</td>
              </template>
              <template v-else>
                <td>{{d.product_name}}<i :class="'icon_currency '+d.hash_type_name"></i></td>
                <td>{{d.total_hash|format}}T</td>
              </template>
              <template v-if="status==2||status==3">
                <td>{{d.selling_amount}}台</td>
                <td>{{d.total_price}}元</td>
              </template>
              <template v-else>
                <td>{{d.buy_amount}}台</td>
                <td v-if="nowEdit===3">{{d.pay_value}}元</td>
                <td v-else>{{d.total_price}}元</td>
              </template>
              <td>{{d.create_time||d.created_time}}</td>
              <td v-if="nowEdit===0&&status==1">{{d.remain_miner}}台</td>
              <td v-if="status!=3">
                <button class="sold" @click="openMask(d.id)" v-if="nowEdit===0&&status==1&&!d.is_loan&&d.remain_miner&&d.status===8">出售云算力</button>
                <button @click="quit('sold', d.id)" v-if="status==2">撤销出售</button>
                <a href="javascript:;" @click="goDetail(nowEdit,d.id)">查看详情</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="nodata" v-if="!data.length">
          <div class="nodata_img"></div>
          <p>暂无列表信息</p>
        </div>
        <Pager :len="len" :now="now" @setPage="setPage"></Pager>
      </div>
    </div>
    <div class="mobile_box" v-if="isMobile===1">
      <div class="mobile_order_box" v-if="!edit">
        <div class="type_nav_box">
          <div class="type_list" @click="typeList=!typeList">
            <span>{{scode?title2[nowEdit]:title[nowEdit]}}</span>
            <span class="active"></span>
          </div>
          <a :class="{active: status==k}" href="javascript:;" @click="fetchData(k)" v-for="n,k in nav[nowEdit]">{{n}}</a>
          <div class="nav_list" v-show="typeList" @click="closePopup">
            <router-link class="item" :to="'/mobile/order/'+k" v-for="n,k in scode?title2:title" :key="k">
              <span>{{n}}</span>
              <span class="yes">√</span>
            </router-link>
          </div>
        </div>
        <div class="order_data">
          <div class="item" v-for="d,k in data">
            <p class="order_product_name">
              <span>{{nowEdit==3?'矿机':'云算力'}}</span>
              <em>{{nowEdit==3?d.created_time:d.create_time}}</em>
            </p>
            <div class="order_product_value" v-if="status==2||status==3">
              <div class="order_value">
                <div class="order_text_img">
                  <div class="order_text">
                    <div class="order_name">{{d.product_name}}</div>
                    <div>{{d.total_hash}}T算力</div>
                  </div>
                </div>
                <div class="order_value_price">
                  <div class="price"><em>￥</em>{{d.total_price}}</div>
                  <div>&times;{{d.selling_amount}}</div>
                </div>
              </div>
              <div class="order_btn" v-if="status==2">
                <span @click="quit('sold', d.id)">撤销出售</span>
              </div>
            </div>
            <div class="order_product_value" v-else>
              <div class="order_value" @click="goDetail(nowEdit,d.id)">
                <div class="order_text_img">
                  <div class="order_img">
                    <img :src="d.picture||(d.miner&&d.miner.minerPicture)" alt="">
                  </div>
                  <div class="order_text">
                    <div class="order_name">{{nowEdit==3?(d.miner&&d.miner.name):d.product_name}}</div>
                    <div>{{d.hash||(d.miner&&(+d.miner.hash))}}T算力</div>
                  </div>
                </div>
                <div class="order_value_price">
                  <div class="price"><em>￥</em>{{d.one_amount_value||(d.miner&&(+d.miner.one_amount_value))}}</div>
                  <div>&times;{{parseInt(d.buy_amount)}}</div>
                </div>
              </div>
              <div class="order_price">
                <span>实付金额</span>
                <span class="price"><em>￥</em>{{nowEdit!=3?d.total_price:d.pay_value}}</span>
              </div>
              <div class="order_btn">
                <span @click="openMask(d.id)" v-if="nowEdit===0&&status==1&&!d.is_loan&&d.remain_miner&&d.status===8">出售云算力</span>
              </div>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="!data.length">
          <div class="nodata_img"></div>
          <p>暂无列表信息</p>
        </div>
      </div>
      <form class="form" @submit.prevent="submit" novalidate v-else>
        <form-field :form="sold" @onChange="onChange"></form-field>
        <p class="fee">手续费：{{(totalPrice * fee).toFixed(2) + '元(' + (fee * 100) + '%)'}}</p>
        <button name="btn">确认提交</button>
        <div class="btn" @click="closeMask">取消</div>
      </form>
    </div>
    <MyMask :form="sold" title="出售云算力" v-if="!isMobile&&edit" @submit="submit" @closeMask="closeMask" @onChange="onChange"></MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { sold } from '@/util/form'
  import MyMask from '@/components/common/Mask'
  import FormField from '@/components/common/FormField'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      MyMask, Pager, FormField
    },
    data () {
      return {
        title: {0: '云算力', 3: '矿机'},
        title2: {0: '云算力', 2: '基金', 3: '矿机'},
        nav: {
          0: {1: '已购买', 2: '出售中', 3: '已出售', 4: '已结束'},
          2: {1: '持有', 4: '已结束'},
          3: {1: '已购买'}
        },
        sold: sold,
        data: [],
        nowEdit: 0,
        status: 1,
        edit: false,
        amount: 0,
        inputPrice: 0,
        inputAmount: 0,
        totalPrice: 0,
        order_id: '',
        len: 0,
        now: 1,
        fee: 0,
        typeList: false
      }
    },
    asyncData ({ params }) {
      return {nowEdit: +params.status}
    },
    methods: {
      fetchData (sort) {
        this.status = parseInt(sort) || 1
        this.nowEdit = +this.$route.params.status
        this.getData()
      },
      getData () {
        if (this.token !== 0) {
          var self = this
          this.data = []
          this.typeList = false
          if (this.nowEdit === 3) {
            this.status = 1
          }
          util.post('fundOrder', {sign: api.serialize({token: this.token, type: this.nowEdit, status: this.status, page: this.now})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.data = (res && res.list) || []
              if (self.now > 1) return false
              self.len = Math.ceil(res.total_num / 15)
            })
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      openMask (id) {
        this.inputAmount = 0
        this.inputPrice = 0
        this.order_id = id
        util.post('showSellMiner', {sign: api.serialize({token: this.token, order_id: id})}).then((res) => {
          api.checkAjax(this, res, () => {
            this.sold[0].value2 = res.show_miner
            this.sold[1].value2 = res.one_amount_value
            this.fee = res.sell_miner_fee
            window.scroll(0, 0)
            this.edit = true
          })
        })
      },
      quit (str, id) {
        var requestUrl = 'backOutSellMiner'
        util.post(requestUrl, {sign: api.serialize({token: this.token, order_id: id})}).then((res) => {
          api.checkAjax(this, res, () => {
            api.tips('操作成功', () => {
              this.fetchData()
            })
          })
        })
      },
      closeMask () {
        this.edit = false
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        var url = 'saveSellMiner'
        var sendData = {token: this.token, order_id: this.order_id}
        var tipsStr = '出售成功'
        if (!data) return false
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then((res) => {
          api.checkAjax(this, res, () => {
            this.closeMask()
            api.tips(tipsStr, () => {
              this.fetchData()
            })
          })
        })
      },
      onChange (obj) {
        var value = obj.e.target.value
        var name = obj.name
        this.totalPrice = 0
        var amount = this.sold[0].value2
        if (name === 'amount') {
          obj.e.target.value = (+value > amount) ? amount : value
          this.inputAmount = obj.e.target.value
        } else {
          this.inputPrice = obj.e.target.value
        }
        this.totalPrice = api.decimal(this.inputAmount * this.inputPrice)
        this.totalPrice = isNaN(this.totalPrice) ? 0 : this.totalPrice
        document.getElementsByName('total_price')[0].value = this.totalPrice
      },
      goDetail (type, id) {
        var info = JSON.parse(localStorage.getItem('info'))
        var data = {orderType: type, orderId: id}
        localStorage.setItem('info', JSON.stringify(Object.assign(info, data)))
        // this.$router.push({path: '/user/orderDetail/'})
        if (this.isMobile) {
          location.href = '/mobile/orderDetail/'
        } else {
          location.href = '/user/orderDetail/'
        }
      },
      setPage (n) {
        this.now = n
        this.fetchData()
      },
      closePopup (e) {
        var ele = document.querySelector('.nav_list')
        if (e.target === ele) {
          this.typeList = false
        }
      },
      scrollFunc (e) {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 5) {
          this.typeList = false
        }
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        mobile: state => state.info.mobile,
        scode: state => state.info.scode,
        isMobile: state => state.isMobile
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      this.fetchData()
      window.addEventListener('scroll', this.scrollFunc, false)
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .order_manage{
    .pc_box{
      .order_title{
        padding: 0 25px;
        padding-top:15px;
        .order_type_select{
          @include select_list
          margin-bottom:30px;
        }
        @include user_tab
      }
      .order_box{
        padding:20px 25px;
        @include data_table
        table tbody tr td{
          i.icon_currency{
            vertical-align: sub;
            margin-left:5px
          }
          a:hover {
            background: $blue;
            color:#fff;
          }
        }
      }
    }
    .mobile_box{
      background: #f4f4f4;
      .mobile_order_box {
        .type_nav_box{
          position: relative;
          height: 45px;
          line-height: 45px;
          background: $white;
          @include flex(space-between)
          padding:0 0.3rem;
          .type_list{
            width: 20%;
            text-align:center;
            .active{
              @include triangle(bottom)
              border-top: 7px solid #327fff;
              margin-left:5px;
              position: relative;
              top:-2px;
            }
          }
          .nav_list{
            position: absolute;
            left:0;
            top: 45px;
            width: 100%;
            height: calc(100vh - 45px - 0.88rem);
            background:rgba(0,0,0,.3);
            .item{
              @include flex(space-between)
              background: white;
              padding:0 0.3rem;
              line-height: 40px;
              .yes{
                display:none;
              }
              &.nuxt-link-active{
                color: #327fff;
                .yes{
                  display:block;
                }
              }
            }
          }
          a.active{
            color: #327fff;
          }
        }
        .order_data{
          .item{
            background:#fff;
            margin-top: 0.2rem;
            .order_product_name{
              @include flex(space-between)
              padding: 0.2rem 0.3rem;
              span{
                color:#121212;
                font-size: 0.36rem;
              }
              em{
                color:#999;
                font-style: normal;
                font-size: 0.28rem;
              }
            }
            .order_product_value{
              .order_value {
                @include flex(space-between,flex-start)
                background: #fafaff;
                color: $light_black;
                .order_text_img {
                  @include flex(flex-start,flex-start)
                  .order_img {
                    width: 90px;
                    height: 70px;
                    text-align: center;
                    border: 1px solid $border;
                    margin-right: 0.3rem;
                    background: #fff;
                    img{
                      width:60px;
                      height: 50px;
                      margin-top: 10px;
                      object-fit: contain;
                    }
                  }
                  .order_text {
                    .order_name {
                      color: $text;
                      font-size: 0.32rem;
                    }
                  }
                }
                .order_value_price {
                  text-align: right;
                  .price {
                    em {
                      font-size: 12px;
                    }
                  }
                }
              }
              .order_value,.order_price {
                padding:0.2rem 0.3rem;
              }
              .order_price {
                text-align: right;
                color: $light_black;
                .price {
                  font-size: 0.4rem;
                  color: $text;
                  em {
                    font-size: 12px;
                  }
                }
              }
              .order_btn {
                border-top: 1px solid $border;
                margin:0 0.3rem;
                padding:0.2rem 0;
                text-align: right;
                font-size: 12px;
                span {
                  display: inline-block;
                  padding: 0.1rem 0.3rem;
                  color: $orange;
                  border: 1px solid $orange;
                }
                &:empty {
                  display: none;
                }
              }
            }
          } 
          .pager{
            padding-top: 20px;
            padding-bottom: 20px;
            box-sizing: border-box;
            .pager_box{
              border-top: 1px solid #ddd !important;
            }
          }
        }
        @include nodata
        .nodata{
          background: #fff;
          margin-top:0;
          padding-top:100px;
        }
      }
      .form {
        background: #fff;
        min-height: 100vh;
        @include form(v)
        .fee {
          padding: 0.3rem;
        }
      }
    }
  }
</style>
