<template>
  <section class="order_manage">
    <div v-if="show" class="agreement_text">
      <div class="" v-html="contract"></div>
      <div class="btn_box">
        <button @click="back">返回</button>
      </div>
    </div>
    <div class="pc_box" v-else>
      <div class="order_title">
        <div class="text">
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
          <a :class="{active: status===(+k+1)}" href="javascript:;" @click="getList(+k+1)" v-for="n,k in nav[nowEdit]">{{n}}</a>
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
              <template v-if="nowEdit!==0&&(status==2||status==3)">
                <th>转让金额</th>
                <th>转让数量</th>
                <th>转让单价</th>
                <th>转让时间</th>
              </template>
              <template v-if="status==1||status==4">
                <th v-if="nowEdit!==1">购买数量</th>
                <th>购买金额</th>
                <th>购买时间</th>
              </template>
              <template v-if="nowEdit===0&&status==1">
                <th>剩余可出售</th>
              </template>
              <template v-if="nowEdit===2&&status==1&&!(nowEdit===2&&status==1)">
                <th>剩余可出租</th>
              </template>
              <th v-if="status!=3&&!(nowEdit===2&&status==1)">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d,k in data" :class="{active: nowEdit===0&&status==1}">
              <td v-if="nowEdit===3">{{d.miner&&d.miner.name}}</i></td>
              <td v-else>{{d.product_name}}<i :class="'icon_currency '+d.hash_type_name"></i></td>
              <td v-if="nowEdit!==3&&(nowEdit===0||status==1||status==4)">{{d.total_hash|format}}T</td>
              <td v-if="nowEdit===3">{{((d.miner&&(+d.miner.hash))*+d.buy_amount)|format}}T</td>
              <template v-if="nowEdit===0&&(status==2||status==3)">
                <td>{{d.selling_amount}}台</td>
                <td>{{d.total_price}}元</td>
              </template>
              <template v-if="(nowEdit!==0)&&(status==2||status==3)">
                <td>{{d.total_price}}元</td>
                <td>{{d.transfer_amount|format}}T</td>
                <td>{{d.transfer_price}}元</td>
              </template>
              <template v-if="status==1||status==4">
                <td v-if="nowEdit!==1">{{d.buy_amount}}台</td>
                <td v-if="nowEdit!==3">{{d.total_price}}元</td>
                <td v-else>{{d.pay_value}}元</td>
              </template>
              <td v-if="nowEdit===1&&(status==2||status==3)">{{d.transfer_time}}天</td>
              <td v-else>{{d.create_time||d.created_time}}</td>
              <template v-if="nowEdit===0&&status==1">
                <td>{{d.remain_miner}}台</td>
              </template>
              <template v-if="nowEdit===2&&status==1&&!(nowEdit===2&&status==1)">
                <td>{{d.remain_hash|format}}T</td>
              </template>
              <td v-if="status!=3&&!(nowEdit===2&&status==1)">
                <template v-if="nowEdit===0&&status==1&&!d.is_loan">
                  <button class="sold" @click="openMask('sold', '出售云算力', d.id)" v-if="d.remain_miner&&d.status===8">出售云算力</button>
                </template>
                <template v-if="nowEdit===0&&status==2">
                  <button @click="quit('sold', d.id)">撤销出售</button>
                </template>
                <template v-if="nowEdit===1&&status==1">
                  <button @click="openMask('againRent', '转租算力', d.id)" :disabled="!d.remain_hash">转租算力</button>
                </template>
                <template v-if="(nowEdit===1||nowEdit==2)&&status==2">
                  <button @click="quit('rent', d.id)">撤销出租</button>
                </template>
                <template v-if="nowEdit===2&&status==0">
                  <button @click="openMask('rent', '出租算力', d.id)" :disabled="!d.remain_hash">出租算力</button>
                </template>
                <a href="javascript:;" @click="goDetail(nowEdit,d.id)"  v-if="nowEdit!==3&&nowEdit!==2&&status!=2&&status!=3">查看详情</a>
                <template v-if="nowEdit===3">
                  <button class="sold" @click="getContract(d.id)">查看协议</button>
                  <button class="sold" @click="getBaoquan(d.id)">查看保全</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="nodata" v-if="showImg">
          <div class="nodata_img"></div>
          <p>暂无列表信息</p>
        </div>
        <Pager :len="len"></Pager>
      </div>
    </div>
    <div class="mobile_box" v-if="!show">
      <div class="typeclass">
        <div class="one">
          <div class="hash active" @click="hashcli" v-if="scode">{{title2[nowEdit]}}<span class="active"></span></div>
          <div class="hash active" @click="hashcli" v-else>{{title[nowEdit]}}<span class="active"></span></div>
          <div class="other_hash" v-show="showtype">
            <div class="hash_center" v-if="scode">
              <router-link class="item" :to="'/mobile/order/'+k" v-for="n,k in title2" :key="k"><span>{{n}}</span><span class="yes">√</span></router-link>
            </div>
            <div class="hash_center" v-else>
              <router-link class="item" :to="'/mobile/order/'+k" v-for="n,k in title" :key="k"><span>{{n}}</span><span class="yes">√</span></router-link>
            </div>
          </div>
        </div>
        <a :class="['one', {active: status===(+k+1)}]" href="javascript:;" @click="getList(+k+1)" v-for="n,k in nav[nowEdit]">{{n}}</a>
      </div>
      <div class="listall">
        <div class="item" v-for="d,k in data">
          <p class="top" v-if="nowEdit==3"><span>{{d.miner&&d.miner.name}}</span><em>{{d.created_time}}</em></p>
          <p class="top" v-else><span>{{d.product_name}}</span><em>{{d.create_time}}</em></p>
          <div class="listlist">
            <div class="listone">
              <h4 style="color:#ff721f;" v-if="nowEdit!=3">{{d.total_price}}<em> 元</em></h4>
              <h4 style="color:#ff721f;" v-else>{{d.pay_value}}<em> 元</em></h4>
              <p>购买金额</p>
            </div>
            <div class="listone" style="border-left:1px solid #ddd;border-right:1px solid #ddd;">
              <h4 v-if="nowEdit!=3&&(nowEdit==0||status==1||status==4)">{{d.total_hash|format}}<em> T</em></h4>
              <h4 v-if="nowEdit==3"><em>{{+d.buy_amount * (d.miner&&(+d.miner.hash))}} T</em></h4>
              <p>总算力</p>
            </div>
            <div class="listone">
              <h4>{{d.buy_amount}}<em> 台</em></h4>
              <p>购买数量</p>
            </div>
          </div>
          <div class="orderbutton" v-if="nowEdit==3">
            <button class="left" @click="getContract(d.id)">查看协议</button>
            <button class="right" @click="getBaoquan(d.id)">查看保全</button>
          </div>
        </div>
        <Pager :len="len"></Pager>
      </div>
      <div class="mnodata" v-if="showImg">
        <div class="nodata_img"></div>
        <p style="text-align:center;">暂无列表信息</p>
      </div>
    </div>
    <MyMask :form="form[edit]" :title="editText" v-if="edit"></MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  import Pager from '@/components/common/Pager'
  import md5 from 'js-md5'
  export default {
    components: {
      MyMask, Pager
    },
    data () {
      return {
        title: {0: '云算力', 3: '矿机'},
        title2: {0: '云算力', 2: '基金', 3: '矿机'},
        nav: [{'0': '已购买', '1': '出售中', '2': '已出售', '3': '已结束'}, {'0': '已租赁', '1': '出租中', '2': '已出租', '3': '已结束'}, {'0': '持有', '3': '已结束'}, {'0': '已购买'}],
        data: [],
        status: 1,
        edit: '',
        form: {
          sold: [{name: 'amount', type: 'text', title: '出售数量', placeholder: '请输入出售数量', changeEvent: true, tipsInfo: '最大可出售数量', tipsUnit: '台', pattern: 'int'}, {name: 'one_amount_value', type: 'text', title: '出售单价', placeholder: '请输入出售单价', changeEvent: true, tipsInfo: '购入价格', tipsUnit: '元', pattern: 'float'}, {name: 'total_price', type: 'text', title: '出售总价', edit: 'price', tipsInfo: 'show', tipsUnit: '元'}, {name: 'trade_password', type: 'password', title: '交易密码', placeholder: '请输入交易密码', pattern: 'telCode'}],
          rent: [{name: 'amount', type: 'text', title: '出租数量', placeholder: '请输入出租数量', changeEvent: true, tipsInfo: '最大可出租数量', tipsUnit: 'T', pattern: 'float'}, {name: 'transfer_time', type: 'select', title: '出租时长', option: ['30', '90', '180', '360'], unit: '天'}, {name: 'transfer_price', type: 'text', title: '出租单价', placeholder: '请输入出租单价', changeEvent: true, tipsInfo: 'show', tipsUnit: '元', pattern: 'float'}, {name: 'total_price', type: 'text', title: '出租总价', edit: 'price', tipsInfo: 'show', tipsUnit: '元'}, {name: 'trade_password', type: 'password', title: '交易密码', placeholder: '请输入交易密码', pattern: 'telCode'}],
          againRent: [{name: 'amount', type: 'text', title: '转租数量', placeholder: '请输入出租数量', edit: 'price', tipsInfo: 'show', tipsUnit: 'T', pattern: 'float'}, {name: 'transfer_time', type: 'text', title: '转租时长', edit: 'price', tipsInfo: '已使用时长', tipsUnit: '天', showUse: true}, {name: 'transfer_price', type: 'text', title: '转租单价', placeholder: '请输入出租单价', edit: 'price', tipsInfo: 'show', tipsUnit: '元'}, {name: 'total_price', type: 'text', title: '转租总价', placeholder: '请输入转租总价', changeEvent: true, tipsInfo: 'show', tipsUnit: '元', pattern: 'float'}, {name: 'trade_password', type: 'password', title: '交易密码', placeholder: '请输入交易密码', pattern: 'telCode'}]
        },
        editText: '',
        amount: 0,
        inputPrice: 0,
        inputAmount: 0,
        transfer_price: 0,
        one_amount_value: 0,
        total_price: 0,
        transfer_time: 0,
        have_use_time: 0,
        order_id: '',
        len: 0,
        now: 1,
        fee: 0,
        showImg: false,
        show: false,
        showtype: false,
        nowEdit: 0
      }
    },
    asyncData ({ params }) {
      return {nowEdit: +params.status}
    },
    methods: {
      fetchData () {
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
          util.post('fundOrder', {sign: api.serialize({token: this.token, user_id: this.user_id, type: this.nowEdit, status: this.status, page: this.now})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.data = res.list
              self.showImg = !res.total_num
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
      getList (sort) {
        this.status = sort || 1
        this.fetchData()
      },
      openMask (str, title, id) {
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
        if (this.token !== 0) {
          util.post(requestUrl, {sign: api.serialize(Object.assign({token: this.token, user_id: this.user_id}, data))}).then(function (res) {
            api.checkAjax(self, res, () => {
              window.scroll(0, 0)
              document.body.style.overflow = 'hidden'
              self.editText = title
              self.edit = str
              if (str === 'sold') {
                self.one_amount_value = res.one_amount_value
                self.amount = res.show_miner
                self.fee = res.sell_miner_fee
              } else if (str === 'againRent') {
                self.amount = res.show_hash
                self.transfer_time = res.rent_time - res.have_use_time
                self.fee = res.rent_fee
                self.have_use_time = res.have_use_time
              } else {
                self.amount = res.show_hash
                self.fee = res.rent_fee
              }
            })
          })
        } else {
          setTimeout(() => {
            util.post(requestUrl, {sign: api.serialize(Object.assign({token: this.token, user_id: this.user_id}, data))}).then(function (res) {
              api.checkAjax(self, res, () => {
                window.scroll(0, 0)
                document.body.style.overflow = 'hidden'
                self.editText = title
                self.edit = str
                if (str === 'sold') {
                  self.one_amount_value = res.one_amount_value
                  self.amount = res.show_miner
                  self.fee = res.sell_miner_fee
                } else if (str === 'againRent') {
                  self.amount = res.show_hash
                  self.transfer_time = res.rent_time - res.have_use_time
                  self.fee = res.rent_fee
                  self.have_use_time = res.have_use_time
                } else {
                  self.amount = res.show_hash
                  self.fee = res.rent_fee
                }
              })
            })
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
        util.post(requestUrl, {sign: api.serialize({token: this.token, user_id: this.user_id, order_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('操作成功', self.isMobile, () => {
              self.fetchData()
            })
          })
        })
      },
      closeEdit () {
        this.edit = ''
        document.body.style.overflow = 'auto'
      },
      submit () {
        var form = document.querySelector('.form_content')
        var data = api.checkFrom(form)
        var url = ''
        var sendData = {token: this.token, user_id: this.user_id, order_id: this.order_id}
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
            sendData = {token: this.token, user_id: this.user_id, transfer_record_id: this.order_id}
            break
        }
        if (!data) return false
        data.trade_password = md5(data.trade_password)
        var self = this
        console.log(data)
        util.post(url, {sign: api.serialize(Object.assign(data, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeEdit()
            api.tips(tipsStr, self.isMobile, () => {
              self.fetchData()
            })
          })
        })
      },
      onChange (e, i, unit) {
        if (i === 'total_price') {
          this.total_price = e.target.value
          this.total_price = isNaN(this.total_price) ? 0 : this.total_price
          this.transfer_price = api.decimal(this.total_price / this.amount)
          this.transfer_price = isNaN(this.transfer_price) ? 0 : this.transfer_price
        } else {
          if (i === 'amount') {
            if (unit === '台') {
              e.target.value = (+e.target.value > this.amount) ? this.amount : e.target.value
            } else {
              e.target.value = (+e.target.value > this.amount) ? api.decimal(this.amount, 2) : e.target.value
            }
            this.inputAmount = e.target.value
          } else {
            this.inputPrice = e.target.value
          }
          this.total_price = api.decimal(this.inputAmount * this.inputPrice)
          this.total_price = isNaN(this.total_price) ? 0 : this.total_price
        }
      },
      getContract (id) {
        var self = this
        var data = {token: this.token, user_id: this.user_id, order_id: id}
        util.post('miner_contract', {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            if (!res.miner_res) {
              api.tips('暂无协议', self.isMobile)
            } else {
              self.show = true
              self.contract = res.miner_res.content
            }
          })
        })
      },
      getBaoquan (id) {
        if (api.checkWechat()) {
          api.tips('请在浏览器里打开', 1)
        }
        var data = {token: this.token, order_id: id, security_hash_type: 3, user_id: this.user_id}
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
      hashcli () {
        this.showtype = !this.showtype
      },
      goDetail (type, id) {
        var info = JSON.parse(localStorage.getItem('info'))
        var data = {orderType: type, orderId: id}
        localStorage.setItem('info', JSON.stringify(Object.assign(info, data)))
        this.$router.push({path: '/user/orderDetail/'})
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
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
    .agreement_text{
      padding:15px;
      overflow: hidden;
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
    .pc_box{
      .order_title{
        @include gap(25,h)
        padding-top:15px;
        border-bottom: 1px solid $border;
        .text{
          @include select_list
          margin-bottom:30px;
        }
        nav{
          a{
            @include gap(10,h)
            display: inline-block;
            padding-bottom:10px;
            border-bottom: 3px solid transparent;
            color:#6b7d90;
            & + a{
              margin-left:30px
            }
            &:hover,&.active{
              border-color:#7e92a8
            }
          }
        }
      }
      .order_box{
        padding:20px 25px;
        table{
          width: 100%;
          text-align: center;
          margin:0;
          thead{
            tr{
              border-bottom:1px solid $border;
              background: #f7f8fa;
              color: $light_text;
              border-top:1px solid $border;
              border-bottom:0;
              th{
                font-size: 12px;
                font-weight: normal;
                line-height: 50px;
              }
            }
          }
          tbody{
            tr{
              border-bottom:1px solid $border;
              td{
                line-height:56px;
                i.icon_currency{
                  vertical-align: sub;
                  margin-left:5px
                }
                &:last-child{
                  width:180px;
                  button,a{
                    font-size: 12px;
                    line-height: 28px;
                    @include gap(8,h)
                  }
                  button{
                    @include button($blue)
                    margin-right:5px;
                    &:disabled{
                      background: #759fe4;
                      border-color:#759fe4;
                      cursor: no-drop;
                    }
                  }
                  a{
                    display: inline-block;
                    @include button($blue,border)
                    border-radius: 5px;
                    .btn:not(:disabled){
                      @include button($orange)
                      cursor: pointer;
                    }
                  }
                }
              }
              &:hover{
                background: #f7f8fa;
              }
              &.active{
                td:last-child{
                  width:245px;
                }
              }
            }
          }
        }
        @include nodata
      }
      @include mobile_hide
    }
    .mobile_box{
      @include mobile_show
      width: 100%;
      background: #f4f4f4;
      .typeclass{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        background: white;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #ddd;
        .one{
          width: 20%;
          text-align:center;
          .hash{
            span{
              @include triangle(bottom)
              border-top: 7px solid black;
              margin-left:10px;
              position: relative;
              top:-2px;
              &.active{
                border-top: 7px solid #327fff;
              }
            }
          }
          .other_hash{
            width: 100%;
            height: 100vh;
            position: absolute;
            top:2rem;
            z-index:999;
            background:rgba(0,0,0,.3);
            .hash_center{
              width: 100%;
              overflow: hidden;
              background: white;
              text-align: left;
              padding-left:0.5rem;
              line-height: 1.5rem;
              .item{
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding-right: 0.5rem;
                .yes{
                  display:none;
                }
                &.router-link-active{
                  color: #327fff;
                  .yes{
                    display:block;
                  }
                }
              }
            }
          }
          .active{
            color: #327fff;
          }
        }
        a.one.router-link-active{
          color:#327fff
        }
      }
      .mnodata{
        width: 100%;
        text-align: center;
        height: 100%;
        background:white;
        top:0;
        .nodata_img{
          display: inline-block;
          width: 234px;
          height: 215px;
          margin-top: 100px;
          background: url('~assets/images/css_sprites.png') -335px -10px;
        }
        img{
          width: 130px;
          display: block;
          margin:0 auto;
          margin-top: 140px;
          margin-bottom: 20px;
        }
        p{
          text-align: center !important;
          width: 40% !important;
          margin-left:30%;
        }
      }
      .listall{
        width:100%;
        overflow: hidden;
        .item{
          width: 100%;
          overflow: hidden;
          background:white;
          padding:0 .5rem;
          box-sizing: border-box;
          margin-bottom: 0.5rem;
          .top{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding:.4rem 0;
            border-bottom: 1px solid #ddd;
            span{
              color:#121212;
              font-size: 0.7rem;
            }
            em{
              color:#999;
              font-style: normal;
              font-size: 0.5rem;
            }
          }
          .listlist{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding:0.8rem 0;
            .listone{
              width: 33.3%;
              text-align: center;
              h4{
                font-size:0.9rem;
                em{
                  font-style: normal;
                  font-size: 0.5rem;
                }
              }
              p{
                color: #999;
              }
            }
          }
          .orderbutton{
            width: 100%;
            text-align:right;
            padding:0.5rem 0;
            button{
              background: #327fff;
              color: #fff;
              padding: .2rem .5rem;
            }
            .left{
              margin-right:.5rem;
            }
          }
        }
        .pager 
        .pager{
          padding-top: 20px;
          padding-bottom: 20px;
          box-sizing: border-box;
          .pager_box{
            border-top: 1px solid #ddd !important;
          }
        }
      }
    }
  }
</style>
