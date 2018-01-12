<template>
  <section class="address">
    <div class="pc_box" v-if="isMobile===0">
      <h2>地址管理<div class="address_btn" @click="openMask">添加新地址</div></h2>
      <div class="address_box">
        <div class="item" v-for="a,k in data">
          <span class="address_item">{{a.province_name+a.city_name+a.area_name+a.area_details+'('+a.post_user+' 收) '+a.post_mobile}}</span>
          <span v-if="a.is_default">默认地址</span>
          <span class="set_default" v-else @click="setDefault(a.id)">设为默认</span>
          <span class="set_default" @click="openMask(k)">编辑</span>
          <span class="set_default" @click="deleteAddress(a.id,k)">删除</span>
        </div>
      </div>
    </div>
    <div class="mobile_box" v-else-if="isMobile===1">
      <div class="address_box">
        <div class="item" v-for="a,k in data">
          <div class="address_desc" @click="selectAddress(k)">
            <div class="address_title">
              <span>{{a.post_user}}</span>
              <span>{{a.post_mobile}}</span>
            </div>
            <p>{{a.province_name+a.city_name+a.area_name+a.area_details}}</p>
          </div>
          <div class="address_opr">
            <div class="default_address" v-if="a.is_default">默认地址</div>
            <div class="set_default" v-else @click="setDefault(a.id)">设为默认</div>
            <span class="opr" @click="openMask(k)">编辑</span>
            <span class="opr" @click="deleteAddress(a.id,k)">删除</span>
          </div>
        </div>
        <div class="address_btn" @click="openMask">添加新地址</div>
      </div>
    </div>
    <div class="nodata" v-if="show">
      <div class="nodata_img"></div>
      <p>暂无列表信息</p>
    </div>
    <MyMask :form="address" :val="addressData" :title="addressData.id?'编辑地址':'新增地址'" v-if="show" @submit="submit" @closeMask="closeMask"></MyMask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import MyMask from '@/components/common/Mask'
  import { mapState } from 'vuex'
  export default {
    components: {
      MyMask
    },
    data () {
      return {
        address: [{name: 'post_user', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true}, {name: 'post_mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'}, {name: 'address', type: 'select', title: '地址', isChange: true}, {name: 'area_details', type: 'text', title: '详细地址', placeholder: '请输入详细地址', isChange: true}, {name: 'is_default', type: 'radio', title: '是否设为默认地址'}],
        data: [],
        addressData: {},
        show: false
      }
    },
    methods: {
      setDefault (id, k) {
        var self = this
        util.post('setDefault', {sign: api.serialize({token: this.token, post_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('设置成功')
            self.fetchData()
          })
        })
      },
      closeMask () {
        this.show = ''
        document.body.style.overflow = 'auto'
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, this.isMobile)
        var url = ''
        var strTips = ''
        if (!data) return false
        data.is_default = 1
        data.token = this.token
        data.is_default = +form.is_default.checked
        if (!this.addressData.id) {
          url = 'addAddress'
          strTips = '添加成功'
        } else {
          url = 'modifyAddress'
          data.post_id = this.addressData.id
          strTips = '编辑成功'
        }
        var self = this
        util.post(url, {sign: api.serialize(data)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.fetchData()
            api.tips(strTips)
            self.closeMask()
          }, form.btn)
        })
      },
      deleteAddress (id, k) {
        if (!confirm('确定删除？')) {
          return false
        }
        var self = this
        util.post('deleteAddress', {sign: api.serialize({token: this.token, post_id: id})}).then(function (res) {
          api.checkAjax(self, res, () => {
            api.tips('删除成功')
            self.fetchData()
          })
        })
      },
      openMask (k) {
        if (this.data.length >= 15) {
          api.tips('您的地址条数已达到上限，请删除后再添加')
          return false
        }
        this.addressData = {}
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
        this.show = true
        if (this.data[k]) {
          this.addressData = this.data[k]
        }
      },
      fetchData () {
        if (this.token !== 0) {
          var self = this
          util.post('showAddress', {sign: api.serialize({token: this.token})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.data = res
            })
          })
        } else {
          setTimeout(() => {
            this.fetchData()
          }, 5)
        }
      },
      getList () {
        this.fetchData()
      },
      selectAddress (k) {
        if (location.href.split('?')[1] === 'select') {
          var obj = Object.assign(this.addressObj, this.data[k])
          this.$store.commit('SET_ADDRESS', obj)
          this.$router.push({path: '/minerShop/pay/'})
        }
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      this.fetchData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile,
        addressObj: state => state.addressData
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .address{
    .pc_box{
      padding:0 15px;
      @include address_data
      h2{
        padding:0 15px !important;
        margin-bottom: 20px !important;
        .address_btn{
          height: 40px;
          line-height: 30px;
          float:right;
          position: relative;
          top: -20px;
        }
      }
      .address_box{
        .item{
          padding:20px 40px;
          background: #f7f8fa;
          margin-bottom: 20px;
          cursor: initial;
          .address_item{
            width:70%;
          }
        }
      }
    }
    .mobile_box{
      .address_box{
        .item{
          padding: 10px 15px;
          @include flex(space-between)
          .address_desc{
            width:70%;
            .address_title{
              font-size: 0.3rem;
              font-weight: bold;
              padding:5px 0;
            }
            p{
              color:$light_text;
              @include ellipsis(2)
            }
          }
          .address_opr{
            .default_address{
              border:1px solid $orange;
              padding:0 5px;
              border-radius:3px;
              color:$orange;
            }
            .set_default{
              color:$orange
            }
            .set_default,.default_address{
              font-size: 12px;
              margin:5px 0;
            }
            .opr{
              font-size: 12px;
              color:$blue;
              & + .opr{
                margin-left:5px
              }
            }
          }
          &:not(:last-child){
            border-bottom:1px solid $border
          }
        }
        .address_btn{
          margin:15px;
          line-height: 2.4;
          text-align: center;
          border-radius:5px;
          @include button($orange)
        }
      }
    }
    @include nodata
  }
</style>
