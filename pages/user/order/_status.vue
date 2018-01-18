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
          <a :class="{active: status===(+k+1)}" href="javascript:;" @click="fetchData(+k+1)" v-for="n,k in nav[nowEdit]">{{n}}</a>
        </nav>
      </div>
      <div class="order_box">
        <table>
          <thead>
            <tr>
             <th>算力服务器</th>
              <th v-if="nowEdit===0||status==1||status==4">总算力</th>
              <template v-if="nowEdit===0&&(status==2||status==3)">
                <th>出售数量</th>
                <th>出售金额</th>
                <th>出售时间</th>
              </template>
              <template v-if="status==1||status==4">
                <th>购买数量</th>
                <th>购买金额</th>
                <th>购买时间</th>
              </template>
              <template v-if="nowEdit===0&&status==1">
                <th>剩余可出售</th>
              </template>
              <th v-if="status!=3&&!(nowEdit===2&&status==1)">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d,k in data">
              <td v-if="nowEdit===3">{{d.miner&&d.miner.name}}</i></td>
              <td v-else>{{d.product_name}}<i :class="'icon_currency '+d.hash_type_name"></i></td>
              <td v-if="nowEdit!==3&&(nowEdit===0||status==1||status==4)">{{d.total_hash|format}}T</td>
              <td v-if="nowEdit===3">{{((d.miner&&(+d.miner.hash))*+d.buy_amount)|format}}T</td>
              <template v-if="nowEdit===0&&(status==2||status==3)">
                <td>{{d.selling_amount}}台</td>
                <td>{{d.total_price}}元</td>
              </template>
              <template v-if="status==1||status==4">
                <td v-if="nowEdit!==1">{{d.buy_amount}}台</td>
                <td v-if="nowEdit!==3">{{d.total_price}}元</td>
                <td v-else>{{d.pay_value}}元</td>
              </template>
              <td>{{d.create_time||d.created_time}}</td>
              <td v-if="nowEdit===0&&status==1">{{d.remain_miner}}台</td>
              <td v-if="nowEdit===2&&status==1&&!(nowEdit===2&&status==1)">{{d.remain_hash|format}}T</td>
              <td v-if="status!=3&&!(nowEdit===2&&status==1)">
                <button class="sold" @click="openMask('sold', '出售云算力', d.id)" v-if="nowEdit===0&&status==1&&!d.is_loan&&d.remain_miner&&d.status===8">出售云算力</button>
                <button @click="quit('sold', d.id)" v-if="nowEdit===0&&status==2">撤销出售</button>
                <button @click="openMask('rent', '出租算力', d.id)" :disabled="!d.remain_hash" v-if="nowEdit===2&&status==0">出租算力</button>
                <a href="javascript:;" @click="goDetail(nowEdit,d.id)" v-if="nowEdit===3||(nowEdit!==2&&status!=2&&status!=3)">查看详情</a>
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
      <div class="type_nav_box">
        <div class="type_list" @click="showtype=!showtype">
          <span>{{scode?title2[nowEdit]:title[nowEdit]}}</span>
          <span class="active"></span>
        </div>
        <a :class="{active: status===(+k+1)}" href="javascript:;" @click="fetchData(+k+1)" v-for="n,k in nav[nowEdit]">{{n}}</a>
        <div class="nav_list" v-show="showtype">
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
            <div class="value_one">
              <h4>{{d.total_price}}<em> 元</em></h4>
              <p>出售金额</p>
            </div>
            <div class="value_one">
              <h4 v-if="nowEdit!=3&&(nowEdit==0||status==1||status==4)">{{d.total_hash|format}}<em> T</em></h4>
              <h4 v-if="nowEdit==3">{{+d.buy_amount * (d.miner&&(+d.miner.hash))}}<em> T</em></h4>
              <p>总算力</p>
            </div>
            <div class="value_one">
              <h4 class="buy_number">{{d.selling_amount}}<em> 台</em></h4>
              <p>出售数量</p>
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
              <span @click="openMask('sold', '出售云算力', d.id)" v-if="nowEdit===0&&status==1&&!d.is_loan&&d.remain_miner&&d.status===8">出售云算力</span>
              <span @click="quit('sold', d.id)" v-if="nowEdit===0&&status==2">撤销出售</span>
            </div>
            <!-- <div class="value_one">
              <h4 class="buy_number">{{nowEdit!=3?d.total_price:d.pay_value}}<em> 元</em></h4>
              <p>购买金额</p>
            </div>
            <div class="value_one">
              <h4 v-if="nowEdit!=3&&(nowEdit==0||status==1||status==4)">{{d.total_hash|format}}<em> T</em></h4>
              <h4 v-if="nowEdit==3">{{+d.buy_amount * (d.miner&&(+d.miner.hash))}}<em> T</em></h4>
              <p>总算力</p>
            </div>
            <div class="value_one">
              <h4>{{d.buy_amount}}<em> 台</em></h4>
              <p>购买数量</p>
            </div> -->
          </div>
          <!-- <div class="order_button">
            <button class="left" @click="openMask('sold', '出售云算力', d.id)" v-if="nowEdit===0&&status==1&&!d.is_loan&&d.remain_miner&&d.status===8">出售云算力</button>
            <button @click="quit('sold', d.id)" v-if="nowEdit===0&&status==2">撤销出售</button>
            <button class="left" @click="goDetail(nowEdit,d.id)" v-if="nowEdit===3||(nowEdit!==2&&status!=2&&status!=3)">查看详情</button>
          </div> -->
        </div>
      </div>
      <div class="nodata" v-if="!data.length">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
    </div>
    <MyMask :form="form[edit]" :title="editText" v-if="edit" @submit="submit" @closeMask="closeMask" @onChange="onChange"></MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
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
        nav: {0: {'0': '已购买', '1': '出售中', '2': '已出售', '3': '已结束'}, 2: {'0': '持有', '3': '已结束'}, 3: {'0': '已购买'}},
        data: [],
        status: 1,
        edit: '',
        form: {
          sold: [{name: 'amount', type: 'text', title: '出售数量', placeholder: '请输入出售数量', changeEvent: true, tipsInfo: '最大可出售数量', tipsUnit: '台', value: 0, value2: 0, pattern: 'int'}, {name: 'one_amount_value', type: 'text', title: '出售单价', placeholder: '请输入出售单价', changeEvent: true, tipsInfo: '购入价格', value2: 0, tipsUnit: '元', pattern: 'float'}, {name: 'total_price', type: 'text', title: '出售总价', edit: 'price', value: 0, tipsInfo: 'show', tipsUnit: '元'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}],
          rent: [{name: 'amount', type: 'text', title: '出租数量', placeholder: '请输入出租数量', changeEvent: true, tipsInfo: '最大可出租数量', tipsUnit: 'T', value: 0, pattern: 'float'}, {name: 'transfer_time', type: 'select', title: '出租时长', option: [{id: 0, item: '30'}, {id: 1, item: '90'}, {id: 2, item: '180'}, {id: 3, item: '360'}], unit: '天'}, {name: 'transfer_price', type: 'text', title: '出租单价', placeholder: '请输入出租单价', changeEvent: true, tipsInfo: 'show', tipsUnit: '元', pattern: 'float'}, {name: 'total_price', type: 'text', title: '出租总价', edit: 'price', value: 0, tipsInfo: 'show', tipsUnit: '元'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}],
          againRent: [{name: 'amount', type: 'text', title: '转租数量', placeholder: '请输入出租数量', edit: 'price', value: '', tipsInfo: 'show', tipsUnit: 'T', value: 0, pattern: 'float'}, {name: 'transfer_time', type: 'text', title: '转租时长', edit: 'price', value: '', tipsInfo: '已使用时长', value2: 0, tipsUnit: '天'}, {name: 'transfer_price', type: 'text', title: '转租单价', placeholder: '请输入出租单价', edit: 'price', value: 0, tipsInfo: 'show', tipsUnit: '元'}, {name: 'total_price', type: 'text', title: '转租总价', placeholder: '请输入转租总价', changeEvent: true, tipsInfo: 'show', tipsUnit: '元', pattern: 'float'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}]
        },
        editText: '',
        amount: 0,
        inputPrice: 0,
        inputAmount: 0,
        total_price: 0,
        order_id: '',
        len: 0,
        now: 1,
        fee: 0,
        transfer_price: 0,
        showtype: false,
        nowEdit: 0
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
          this.showtype = false
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
      openMask (str, title, id) {
        if (this.token !== 0) {
          this.total_price = 0
          this.inputAmount = 0
          this.inputPrice = 0
          this.order_id = id
          var data = {}
          var requestUrl = ''
          if (str === 'rent') {
            requestUrl = 'showRentHash'
            data = {order_id: id}
          } else if (str === 'againRent') {
            requestUrl = 'showSubletHash'
            data = {transfer_record_id: id}
          } else {
            requestUrl = 'showSellMiner'
            data = {order_id: id}
          }
          var self = this
          util.post(requestUrl, {sign: api.serialize(Object.assign({token: this.token}, data))}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.editText = title
              if (str === 'sold') {
                self.form[str][0].value2 = res.show_miner
                self.form[str][1].value2 = res.one_amount_value
                self.fee = res.sell_miner_fee
              } else if (str === 'againRent') {
                self.form[str][0].value = res.show_hash
                self.form[str][1].value = (res.rent_time - res.have_use_time < 0) && 0
                self.fee = res.rent_fee
                self.form[str][1].value2 = res.have_use_time
              } else {
                self.form[str][0].value = res.show_hash
                self.fee = res.rent_fee
              }
              window.scroll(0, 0)
              document.body.style.overflow = 'hidden'
              self.edit = str
            })
          })
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      quit (str, id) {
        var requestUrl = ''
        if (str === 'rent') {
          requestUrl = 'backOutRentHash'
        } else {
          requestUrl = 'backOutSellMiner'
        }
        var self = this
        util.post(requestUrl, {sign: api.serialize({token: this.token, order_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('操作成功', () => {
              self.fetchData()
            })
          })
        })
      },
      closeMask () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        var url = ''
        var sendData = {token: this.token, order_id: this.order_id}
        var tipsStr = ''
        switch (this.edit) {
          case 'sold':
            url = 'saveSellMiner'
            tipsStr = '出售成功'
            break
          case 'rent':
            url = 'saveRentHash'
            tipsStr = '出租成功'
            break
          case 'againRent':
            url = 'saveSubletHash'
            tipsStr = '转租成功'
            sendData = {token: this.token, transfer_record_id: this.order_id}
            break
        }
        if (!data) return false
        var self = this
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeMask()
            api.tips(tipsStr, () => {
              self.fetchData()
            })
          })
        })
      },
      onChange (obj) {
        var value = obj.e.target.value
        var name = obj.name
        var unit = obj.unit
        var total_price = 0
        var amount_obj = this.form[this.edit][0]
        var amount = amount_obj.value2 || amount_obj.value
        if (name === 'total_price') {
          total_price = value
          var val = api.decimal(value / amount)
          document.getElementsByName('transfer_price')[0].value = (isNaN(val) || !isFinite(val)) ? 0 : val
        } else {
          if (name === 'amount') {
            obj.e.target.value = (+value > amount) ? amount : value
            if (unit !== '台') {
              obj.e.target.value = api.decimal(isNaN(obj.e.target.value)? 0 : obj.e.target.value, 2)
            }
            this.inputAmount = obj.e.target.value
          } else {
            this.inputPrice = obj.e.target.value
          }
          total_price = api.decimal(this.inputAmount * this.inputPrice)
        }
        total_price = isNaN(total_price) ? 0 : total_price
        document.getElementsByName('total_price')[0].value = total_price
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
      .type_nav_box{
        position: fixed;
        top: 0.88rem;
        left: 0;
        width: 100%;
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
          position: fixed;
          left:0;
          top: calc(45px + 0.88rem);
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
        padding-top: 45px;
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
            // .value_one{
            //   text-align: center;
            //   h4{
            //     font-size:0.32rem;
            //     em{
            //       font-style: normal;
            //       font-size: 0.28rem;
            //     }
            //     &.buy_number{
            //       color:#ff721f;
            //     }
            //   }
            //   p{
            //     color: #999;
            //   }
            //   &:nth-child(3){
            //     text-align: center;
            //   }
            //   &:nth-child(1){
            //     text-align: left;
            //   }
            //   &:nth-child(5){
            //     text-align: right;
            //   }
            // }
          }
          // .order_button{
          //   text-align:right;
          //   padding-bottom:0.2rem;
          //   button{
          //     background: #327fff;
          //     color: #fff;
          //     padding: 0.1rem 0.3rem;
          //     & + button{
          //       margin-left:10px;
          //     }
          //   }
          // }
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
  }
</style>
