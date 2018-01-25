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
      <div class="address_box" v-if="!show">
        <div class="item" v-for="a,k in data">
          <div class="address_desc" @click="selectAddress(k)">
            <div class="address_title">
              <span>{{a.post_user}}</span>
              <span>{{a.post_mobile}}</span>
            </div>
            <p class="address_content">{{a.province_name+a.city_name+a.area_name+a.area_details}}</p>
          </div>
          <div class="address_opr">
            <!-- <div class="default_address" v-if="a.is_default">默认地址</div> -->
            <div class="set_default" @click="setDefault(a.id)"><i :class="['check_box', {check_acitve: a.is_default}]"></i>设为默认</div>
            <aside class="right">
              <span class="opr" @click="openMask(k)"><i class="edit"></i>编辑</span>
              <span class="opr" @click="deleteAddress(a.id,k)"><i class="delete"></i>删除</span>
            </aside>
          </div>
        </div>
        <div class="address_btn" @click="openMask">添加新地址</div>
      </div>
      <form class="form" @submit.prevent="submit" novalidate v-else>
        <address-input :form="address" :val="addressData"></address-input>
        <button name="btn">确认提交</button>
        <div class="btn" @click="closeMask">取消</div>
      </form>
    </div>
    <my-mask :form="address" :val="addressData" :title="addressData.id?'编辑地址':'新增地址'" v-if="!isMobile&&show" @submit="submit" @closeMask="closeMask"></my-mask>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import { post_address } from '@/util/form'
  import MyMask from '@/components/common/Mask'
  import AddressInput from '@/components/common/AddressInput'
  export default {
    components: {
      MyMask, AddressInput
    },
    data () {
      return {
        address: post_address,
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
        if (this.isMobile) {
          document.body.style.overflow = 'auto'
        }
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
        this.show = true
        if (this.data[k]) {
          this.addressData = this.data[k]
        }
        if (this.isMobile) {
          window.scroll(0, 0)
          document.body.style.overflow = 'hidden'
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
      font-size: 0.3rem;
      padding: 0.3rem 0;
      background: #f4f4f4;
      height: calc(100vh - 0.88rem);
      .address_box{
        .item{
          margin-bottom: 0.2rem;
          background: #fff;
          padding: 0 0.3rem;
          border-bottom: solid 1px #eee;
          @include flex(space-between, center, column);
          .address_desc{
            @include flex(flex-start, flex-start, column);
            width: 100%;
            height: 1.8rem;
            font-size: 0.32rem;
            color: #333;
            border-bottom: solid 1px #e5e5e5;
            .address_title{
              padding-top: 0.4rem;
              width: 100%;
              line-height: 0.6rem;
              @include flex(space-between, center);
              color: #333;
              font-size: 0.34rem;
            }
            p{
              line-height: 0.5rem;
              word-break: break-all;
              color: #999;
              font-size: 0.26rem;
            }
          }
          .address_opr{
            height: 0.9rem;
            width: 100%;
            @include flex(space-between, center);
            font-size: 0.28rem;
            color: #666;
            .set_default{
              .check_box {
                display: inline-block;
                margin-right: 0.12rem;
                @include checkbox(14)
                width: 0.28rem;
                height: 0.28rem;
                position: relative;
                top: -1px;
              }
              .check_acitve {
                background: #327fff;
              }
            }
            .right {
              .opr{
                i {
                  width: 0.28rem;
                  height: 0.28rem;
                  margin-right: 0.1rem;
                  position: relative;
                  top: 1px;
                  display: inline-block;
                }
                .edit {
                  background: url('../../assets/images/mobile/edit.png') no-repeat;
                  background-size: 0.28rem;
                }
                .delete {
                  background: url('../../assets/images/mobile/delete.png') no-repeat;
                  background-size: 0.28rem;
                }
                &:first-child {
                  margin-right: 0.45rem;
                }
              }
            }
          }
          &:not(:last-child){
            border-bottom: 1px solid $border;
          }
        }
        .address_btn{
          width: calc(100% - 0.6rem);
          height: 0.8rem;
          @include flex(center, center);
          margin: 0.8rem auto 0;
          background: #327fff;
          color: #fff;
          font-size: 0.32rem;
          border-radius: 5px;
        }
      }
      .form {
        background: #fff;
        min-height: calc(100vh - 1.1rem);
        @include form(v)
      }
    }
  }
</style>
