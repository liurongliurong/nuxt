<template>
  <div class="administration">
    <div class="form_list">
      <section v-for="item in formData" class="form_item">
        <span class="name">{{item.name}}</span>
        <em></em>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: [
          {name: '邮寄地址', link: '1BTC'},
          {name: '算力收益地址', link: '1BTC'},
          {name: '密码重置', link: '1BTC'},
          {name: '常见问题', link: '1BTC'},
          {name: '意见反馈', link: '1天'}
        ]
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .administration {
    width: 100%;
    font-size: 0.3rem;
    background: #f4f4f4;
    padding-top: 1.1rem;
    .form_list {
      padding-left: 0.3rem;
      background: #fff;

      .form_item {
        padding-right: 0.3rem;
        border-bottom: solid 1px #eee;
        @include flex(space-between, center);
        height: 1rem;
        border-bottom: solid 1px #e5e5e5;
        .name {
          font-size: 0.32rem;
          color: #333;
        }
        em{
          @include block(5);
          @include arrow(right, #c7c7c9);
          width: 0.1rem;
          height:0.1rem;
          border-width: 1px;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
