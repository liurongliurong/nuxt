<template>
  <div class="cloud_product">
    <div class="form_title">
      <span v-for="item in formTitle">{{item}}</span>
    </div>
    <div class="form_none"></div>
    <div class="form_content"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <section v-for="item in formData" class="form_item">
        <span class="name">{{item.product_name}}</span>
        <span class="count">{{item.buy_amount}}台</span>
        <span class="count_suanli">{{item.total_hash}}T</span>
      </section>
    </div>
    <p v-if="loading" class="load_more">加载中······</p>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)

  export default {
    name: 'cloudProduct',
    data () {
      return {
        formTitle: ['产品名称', '数量', '算力'],
        page: 1,
        totalNumber: 0,
        formData: [],
        length: 0,
        loading: false
      }
    },
    methods: {
      getData() {
        util.post('fundOrder', {sign: api.serialize({token: this.token, type: 0, status: 1, page: this.page})}).then(
          res => {
            this.length = res.total_num
            for (let i = 0, len = res.list.length; i < len; i ++) {
              this.formData.push(res.list[i])
            }
            this.totalNumber = res.total_num
        })
      },
      loadMore() {
        if (this.formData.length < this.length ) {
          this.loading = true
          this.page ++
          this.getData()
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
        }
      }
    },
    mounted () {
      this.getData()
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
    .load_more{
      height: 1.3rem;
      text-align: center;
      line-height: 1.3rem;
    }
  }
</style>
