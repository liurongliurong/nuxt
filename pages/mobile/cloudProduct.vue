<template>
  <div class="cloud_product">
    <div class="form_title">
      <span v-for="item in formTitle">{{item}}</span>
    </div>
    <div class="form_none"></div>
    <div class="form_content">
      <section v-for="item in formData" class="form_item">
        <span class="name">{{item.name}}</span>
        <span class="count">{{item.count}}</span>
        <span class="count_suanli">{{item.suanLi}}</span>
      </section>
    </div>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'cloudProduct',
    data () {
      return {
        formTitle: ['产品名称', '数量', '算力'],
        formData: [
          {name: '元旦乐1号', count: '1台', suanLi: '1T'},
          {name: '元旦乐1号', count: '1台', suanLi: '1T'},
          {name: '元旦乐1号', count: '1台', suanLi: '1T'}
        ]
      }
    },
    methods: {
    },
    mounted () {
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .cloud_product {
    width: 100%;
    font-size: 0.3rem;
    padding: 0.88rem 0.3rem 0;
    .form_title {
      @include flex(space-start, center);
      color: #666;
      height: 0.75rem;
      span:nth-child(1) {
        width: 50%;
      }
      span:nth-child(2) {
        width: 35%;
      }
      span:nth-child(3) {
        width: 15%;
      }
    }
    .form_none {
      height: 0.2rem;
      margin: 0 -0.3rem;
      background: #f5f5f9;
    }
    .form_content {
      .form_item {
        @include flex(space-start, center);
        height: 1rem;
        border-bottom: solid 1px #e5e5e5;
        .name {
          width: 50%;
          font-weight: bold;
          color: #333;
        }
        .count, .count_suanli {
          width: 35%;
          color: #999;
        }
        .count_suanli {
          width: 15%;
        }
      }
    }
  }
</style>
