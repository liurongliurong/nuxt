<template>
  <div class="assets_address">
    <form class="form" @submit.prevent="submit" novalidate v-if="edit||!address.length">
      <form-field :form="assetsAddress"></form-field>
      <button name="btn">确认提交</button>
      <div class="btn" @click="closeMask">取消</div>
    </form>
    <div class="address_box" v-else>
      <div class="address_lists">
        <section v-for="item in address" class="item">
          <div class="name">
            <aside class="left">
              <i :class="'icon_currency '+ item.product_hash_type"></i>
              <span>{{item.name}}算力收益地址</span>
            </aside>
            <aside class="right">
              <span @click="openMask(item.product_hash_type,item.address)"><i class="edit"></i>修改</span>
              <!-- <span @click="deleteAddress()"><i class="delete"></i>删除</span> -->
            </aside>
          </div>
          <span class="address">{{item.address}}</span>
        </section>
      </div>
      <a class="button" @click="openMask">新增算力收益地址</a>
    </div>
  </div>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { address } from '@/util/form'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      FormField
    },
    data() {
      return {
        assetsAddress: address,
        edit: false
      }
    },
    methods: {
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, 1)
        if (!data) return false
        fetchApiData(this, 'bindAddress', Object.assign(data, {token: this.token}), (res) => {
          api.tips('设置成功', () => {
            if (this.callUrl) {
              this.$router.push({path: this.callUrl})
              this.$store.commit('SET_URL', '')
            }
            this.requestData()
          })
          this.closeMask()
        })
      },
      requestData (callback) {
        fetchApiData(this, 'show_Address', {token: this.token}, (res) => {
          this.$store.commit('SET_INFO', {address: res})
        })
      },
      openMask (n,v) {
        if (n && v) {
          this.assetsAddress[0].type = 'text'
          this.assetsAddress[0].edit = 'product_hash_type'
          // this.assetsAddress[1].edit = 'address'
          this.assetsAddress[0].value = n
          // this.assetsAddress[1].value = v
        } else {
          this.assetsAddress[0].type = 'select'
          this.assetsAddress[0].edit = 0
          this.assetsAddress[0].value = ''
          this.assetsAddress[1].value = ''
        }
        this.edit = true
      },
      closeMask () {
        this.edit = false
      }
    },
    computed: {
      ...mapState({
        callUrl: state => state.callUrl,
        token: state => state.info.token,
        address: state => state.info.address
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .assets_address {
    font-size: 0.3rem;
    padding: 0.3rem 0;
    background: #f4f4f4;
    .address_box {
      padding: 0 0.3rem;
      .address_lists {
        .item {
          margin-bottom: 0.2rem;
          background: #fff;
          padding: 0 0.3rem;
          border-bottom: solid 1px #eee;
          @include flex(space-between, center, column);
          .name {
            @include flex(space-between, center);
            width: 100%;
            height: 1rem;
            font-size: 0.32rem;
            color: #333;
            border-bottom: solid 1px #e5e5e5;

            .left {
              @include flex(flex-start, center);
              font-size: 0.3rem;
              color: #333;
              font-weight: bold;
              .icon_currency {
                margin-right: 0.2rem;
              }
            }
            .right {
              @include flex(flex-end, center);
              font-size: 0.28rem;
              color: #999;
              span {
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
                & + span {
                  margin-left: 0.45rem;
                }
              }
            }
          }
          .address{
            padding: 0.2rem 0;
            font-size: 0.28rem;
            color: #999;
            line-height: 0.5rem;
            word-break: break-all;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .button {
        width: 100%;
        line-height: 35px;
        @include flex(center, center);
        margin-top: 1rem;
        background: #327fff;
        color: #fff;
        font-size: 0.34rem;
        border-radius: 5px;
      }
    }
    .form {
      background: #fff;
      min-height: calc(100vh - 1.1rem);
      @include form(v)
    }
  }
</style>
