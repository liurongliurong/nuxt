<template>
  <div class="assets_address">
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
    <my-mask :form="assetsAddress" @submit="submit" @closeMask="closeMask" v-if="edit"></my-mask>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { address } from '@/util/form'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  export default {
    components: {
      MyMask
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
        util.post('bindAddress', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then((res) => {
          api.checkAjax(this, res, () => {
            api.tips('设置成功', () => {
              this.requestData()
            })
            this.closeMask()
          })
        })
      },
      requestData (callback) {
        util.post('show_Address', {sign: api.serialize({token: this.token})}).then((res) => {
          api.checkAjax(this, res, () => {
            this.$store.commit('SET_INFO', {address: res})
          })
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
        window.scroll(0, 0)
        document.body.style.overflow = 'hidden'
      },
      closeMask () {
        this.edit = false
        this.edit = ''
        document.body.style.overflow = 'auto'
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        address: state => state.info.address
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .assets_address {
    width: 100%;
    font-size: 0.3rem;
    padding: 1.1rem 0.3rem 0;
    background: #f4f4f4;

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
              &:first-child {
                margin-right: 0.45rem;
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
</style>
