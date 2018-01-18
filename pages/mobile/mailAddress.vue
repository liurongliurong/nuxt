<template>
  <div class="assets_address">
    <div class="none"></div>
    <div class="address_list">
      <section v-for="item in formData" class="item">
        <div class="name">
          <aside>
            <span>{{item.name}}</span>
            <span>{{item.phone}}</span>
          </aside>
          <span class="address">{{item.address}}</span>
        </div>
        <div class="operation">
          <span><i class="check_box"></i>设为默认</span>
          <aside class="right">
            <span @click="editAddress()"><i class="edit"></i>修改</span>
            <span @click="deleteAddress()"><i class="delete"></i>删除</span>
          </aside>
        </div>
      </section>
    </div>
    <!-- <router-link class="button" >添加新地址</router-link> -->
    <a class="button" >添加新地址</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: [
          {name: '张老头', phone: '18285858585', address: '浙江杭州西湖区学院路77号黄龙国际中心G座' },
          {name: '张老头', phone: '18285858585', address: '浙江杭州西湖区学院路77号黄龙国际中心G座' }
        ]
      }
    },
    mounted() {
      this.$store.commit('SET_TITLE', '邮寄地址')
    },
    methods: {
      editAddress() {
        console.log('edit')
      },
      deleteAddress() {
        console.log('delete')
      }
    }
  }
</script>

<style type="text/css" lang="scss">
@import '~assets/css/style.scss';
.assets_address {
  width: 100%;
  font-size: 0.3rem;
  padding: 0;
  background: #f4f4f4;

  .none {
    width: 100%;
    height: 0.2rem;
    background: #f5f5f9;
  }

  .address_list {
    .item {
      margin-bottom: 0.2rem;
      background: #fff;
      padding: 0 0.3rem;
      border-bottom: solid 1px #eee;
      @include flex(space-between, center, column);
      .name {
        @include flex(flex-start, flex-start, column);
        width: 100%;
        height: 1.8rem;
        font-size: 0.32rem;
        color: #333;
        border-bottom: solid 1px #e5e5e5;

        aside {
          padding-top: 0.4rem;
          width: 100%;
          line-height: 0.6rem;
          @include flex(space-between, center);
          color: #333;
          font-size: 0.34rem;
        }
        .address {
          line-height: 0.5rem;
          word-break: break-all;
          color: #999;
          font-size: 0.26rem;
        }
      }
      .operation{
        height: 0.9rem;
        width: 100%;
        @include flex(space-between, center);
        font-size: 0.28rem;
        color: #666;
        .check_box {
          display: inline-block;
          margin-right: 0.12rem;
          @include checkbox(14)
          width: 0.28rem;
          height: 0.28rem;
          position: relative;
          top: -1px;
        }
        .right {
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
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .button {
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
</style>
