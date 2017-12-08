<template>
  <section class="order">
    <div class="order_title">
      <div class="text">
        <span class="text_title">订单管理</span>
        <div class="title_content">
          <span class="title_now" v-if="scode">{{title2[nowEdit]}}</span>
          <span class="title_now" v-else>{{title[nowEdit]}}</span>
          <div class="title_list">
            <template v-if="scode">
              <nuxt-link :to="'/user/order/'+k" v-for="n,k in title2" :key="k">{{n}}</nuxt-link>
            </template>
            <template v-else>
              <nuxt-link :to="'/user/order/'+k" v-for="n,k in title" :key="k">{{n}}</nuxt-link>
            </template>
          </div>
        </div>
      </div>
      <nav class="nav_link">
        <a href="javascript:;" :class="{active: k==0}" @click="fetchData(+k+1)" v-for="n,k in nav[nowEdit]">{{n}}</a>
      </nav>
    </div>
    <div class="order_box">
      <table>
        <thead>
          <tr>
            <th>算力服务器</th>
            <template v-if="nowEdit==0&&(status==2||status==3)">
              <th>总算力</th>
              <th>出售数量</th>
              <th>出售金额</th>
              <th>出售时间</th>
            </template>
            <template v-if="nowEdit!=0&&(status==2||status==3)">
              <th>转让金额</th>
              <th>转让数量</th>
              <th>转让单价</th>
              <th>转让时间</th>
            </template>
            <template v-if="status!=2&&status!=3">
              <th>总算力</th>
              <th v-if="nowEdit!=1">购买数量</th>
              <th>购买金额</th>
              <th>购买时间</th>
            </template>
            <template v-if="nowEdit==0&&(status==1||status==4)">
              <th>剩余可出售</th>
              <th>剩余可出租</th>
            </template>
            <template v-if="nowEdit==2&&status==1">
              <th>剩余可出租</th>
            </template>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d,k in data" :class="{active: nowEdit==0&&status==1}">
            <td>{{d.product_name}}<i :class="'icon_currency '+d.hash_type_name"></i></td>
            <template v-if="nowEdit==0&&(status==2||status==3)">
              <td>{{d.total_hash|format}}T</td>
              <td>{{d.selling_amount}}台</td>
              <td>{{d.total_price}}元</td>
            </template>
            <template v-else-if="(nowEdit==1||nowEdit==2)&&(status==2||status==3)">
              <td>{{d.total_price}}元</td>
              <td>{{d.transfer_amount|format}}T</td>
              <td>{{d.transfer_price}}元</td>
            </template>
            <template v-else>
              <td>{{d.total_hash|format}}T</td>
              <td v-if="nowEdit!=1">{{d.buy_amount}}台</td>
              <td>{{d.total_price}}元</td>
            </template>
            <td v-if="nowEdit==1&&(status==2||status==3)">{{d.transfer_time}}天</td>
            <td v-else>{{d.create_time}}</td>
            <template v-if="nowEdit==0&&(status==1||status==4)">
              <td>{{d.remain_miner}}台</td>
              <td>{{d.remain_hash|format}}T</td>
            </template>
            <template v-if="nowEdit==2&&status==1">
              <td>{{d.remain_hash|format}}T</td>
            </template>
            <td>
              <template v-if="nowEdit==0&&status==1">
                <button class="sold" @click="openMask('sold', '出售云矿机', d.id)" :disabled="!d.remain_miner">出售云矿机</button>
                <button @click="openMask('rent', '出租算力', d.id)" :disabled="!d.remain_hash">出租算力</button>
              </template>
              <template v-if="nowEdit==0&&status==2">
                <button @click="quit('sold', d.id)">撤销出售</button>
              </template>
              <template v-if="nowEdit==1&&status==1">
                <button @click="openMask('againRent', '转租算力', d.id)" :disabled="!d.remain_hash">转租算力</button>
              </template>
              <template v-if="(nowEdit==1||nowEdit==2)&&status==2">
                <button @click="quit('rent', d.id)">撤销出租</button>
              </template>
              <template v-if="nowEdit==2&&status==1">
                <button @click="openMask('rent', '出租算力', d.id)" :disabled="!d.remain_hash">出租算力</button>
              </template>
              <router-link :to="'/user/orderDetail/'+nowEdit+'&'+d.id"  v-if="nowEdit!=2&&status!=2&&status!=3">查看详情</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="nodata" v-if="showImg">
        <!-- <img :src="img" alt=""> -->
        <p>暂无列表信息</p>
      </div>
      <Pager :len="len"></Pager>
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
        title: ['云矿机', '算力'],
        title2: ['云矿机', '算力', '基金'],
        nav: [{'0': '已购买', '1': '出售中', '2': '已出售', '3': '已结束'}, {'0': '已租赁', '1': '出租中', '2': '已出租', '3': '已结束'}, {'0': '持有', '1': '出租中', '2': '已出租', '3': '已结束'}],
        data: [],
        nowEdit: 0,
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
        // img: require('@/assets/images/no_data.jpg'),
        showImg: false
      }
    },
    methods: {
      fetchData (str) {
        var self = this
        this.data = []
        this.nowEdit = this.$route.params.status
        if (typeof(str) === 'number') {
          this.status = str
        }
        var eles = document.querySelector('.nav_link').childNodes
        for (var key = 0; key < eles.length; key++) {
          eles[key].classList.remove('active')
        }
        eles[this.status-1].classList.add('active')
        this.show = false
        util.post('fundOrder', {token: this.token, user_id: this.user_id, type: this.nowEdit, status: this.status, page: this.now}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.data = res.list
            self.showImg = !res.list.length
            if (self.now > 1) return false
            self.len = Math.ceil(res.total_num / 15)
          })
        })
      },
      getList () {
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
        util.post(requestUrl, Object.assign({token: this.token, user_id: this.user_id}, data)).then(function (res) {
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
      },
      quit (str, id) {
        var requestUrl = ''
        if (str === 'rent') {
          requestUrl = 'backOutRentHash'
        } else {
          requestUrl = 'backOutSellMiner'
        }
        var self = this
        util.post(requestUrl, {token: this.token, user_id: this.user_id, order_id: id}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('操作成功', () => {
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
        util.post(url, Object.assign(data, sendData)).then(function (res) {
          api.checkAjax(self, res, () => {
            self.closeEdit()
            api.tips(tipsStr, () => {
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
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        scode: state => state.info.scode
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
  .order{
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
        thead{
          tr{
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
            // line-height: 55px;
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
  }
</style>
