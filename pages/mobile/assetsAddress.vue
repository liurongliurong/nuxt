<template>
  <div class="assets_address">
    <div class="address_list">
      <section v-for="item in formData" class="item">
        <div class="name">
          <aside class="left">
            <i :class="'icon_currency '+ item.name"></i>
            <span>{{item.name}}算力收益地址</span>
          </aside>
          <aside class="right">
            <span>修改</span>
            <span>删除</span>
          </aside>
        </div>
        <span class="address">0x5a38727aef3b06F87279F50A8727900d6c6a727a</span>
      </section>
    </div>
    <!-- <router-link class="button" >新增算力收益地址</router-link> -->
    <a class="button" >新增算力收益地址</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: [
          {name: 'BTC', link: '1BTC'},
          {name: 'ETH', link: '1BTC'}
        ]
      }
    }
  }
</script>

<style type="text/css" lang="scss">
@import '~assets/css/style.scss';
.assets_address {
  width: 100%;
  font-size: 0.3rem;
  padding: 0.88rem 0.3rem 0;
  background: #f4f4f4;

  .address_list {
    .item {
      margin-top: 0.2rem;
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
          font-size: 0.28rem;
          color: #999;
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
    height: 0.8rem;
    @include flex(center, center);
    margin-top: 1rem;
    background: #327fff;
    color: #fff;
    font-size: 0.32rem;
    border-radius: 5px;
  }
}
</style>
