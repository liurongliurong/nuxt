<template>
  <div class="coin_returns">
    <div class="form_title">
      <span v-for="item in formTitle" @click="getCoinReturns(item)"
      :class="{ item_active: active===item.active }">
        {{item.name}}
      </span>
    </div>
    <div class="form_content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <section v-for="item in formData" class="form_item" v-if="!showTips">
        <aside class="content_left">
          <span class="name">{{item.product_name}}</span>
          <span class="time">{{item.paid_time}}</span>
        </aside>
        <span class="content_right">+{{item.paid_amount}}</span>
      </section>
      <div v-if="showTips" class="none_tips">
        <span>目前没有收益记录</span>
        <nuxt-link class="button" to="/minerShop/cloudCompute">立即购买云算力</nuxt-link>
      </div>
    </div>
    <p v-if="loading" class="load_more">加载中······</p>
  </div>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)

  export default {
    name: 'coinReturns',
    data () {
      return {
        active: 'btc',
        coinType: 1,
        page: 1,
        length: 0,
        formTitle: [
          {name: 'BTC收益明细', active: 'btc', type: 1}
        ],
        formData: [],
        loading: false,
        showTips: false
      }
    },
    methods: {
      getCoinReturns(item) {
        this.active = item.active
        this.coinType = item.type
      },
      fetchData (sort = 1) {
        this.coinType = sort
        let data = {token: this.token, product_hash_type: this.coinType, page: this.page, sort: ''}
        fetchApiData(this, 'userCoinList', (data), res => {
          this.length = res.total_num
          for (let i = 0, len = res.value_list.length; i < len; i ++) {
            this.formData.push(res.value_list[i])
          }
          this.showTips = this.formData.length ? false : true
        })
      },
      loadMore () {
        if (this.formData.length < this.length ) {
          this.loading = true
          this.page ++
          this.fetchData(this.coinType)
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
        }
      }
    },
    mounted () {
      if (this.token !== 0) {
        this.fetchData()
      } else {
        setTimeout(() => {
          this.fetchData()
        }, 5)
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        hashType: state => state.hashType
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .coin_returns {
    width: 100%;
    font-size: 0.3rem;
    .form_title {
      @include flex(flex-start, center);
      color: #666;
      height: 0.8rem;
      padding: 0;
      background: #fefefe;
      border-bottom: solid 1px #e5e5e5;
      overflow: scroll;
      span {
        @include flex(center, center);
        min-width: 30%;
        height: 100%;
      }
      .item_active {
        color: #327fff;
        border-bottom: solid 1px #327fff;
      }
    }
    .form_content {
      height: 4.48rem;
      padding: 0 0.3rem;
      overflow: scroll;
      background: #fefefe;
      .form_item {
        @include flex(space-between, center);
        height: 1.28rem;
        border-bottom: solid 1px #e5e5e5;
        .content_left {
          @include flex(flex-start, flex-start, column);
          .name {
            font-weight: bold;
            color: #333;
          }
          .time {
            color: #999;
            font-size: 0.24rem;
          }
        }
        .content_right {
          color: #ff721f;
        }
      }
    }
    .load_more{
      height: 1.3rem;
      text-align: center;
      line-height: 1.3rem;
    }
    .none_tips {
      height: 100%;
      @include flex(center, center, column);
      span {
        color: #999;
        margin: -0.3rem 0 0.2rem;
      }
      .button {
        display: block;
        text-align: center;
        background: #ff721f;
        color: #fff;
        padding: 0.1rem 0.4rem;
        border-radius: 5px;
      }
    }
  }
</style>
