<template>
  <div class="coin_returns">
    <div class="form_title">
      <span v-for="item in formTitle" @click="getCoinReturns(item)" :class="{ item_active: active===item.active }">
        {{item.name}}
      </span>
    </div>
    <div class="form_content">
      <section v-for="item in formData" class="form_item">
        <aside class="content_left">
          <span class="name">{{item.product_name}}</span>
          <span class="time">{{item.paid_time}}</span>
        </aside>
        <span class="content_right">+{{item.paid_amount}}</span>
      </section>
    </div>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'coinReturns',
    data () {
      return {
        active: 'btc',
        formTitle: [
          {name: 'BTC收益明细', active: 'btc'}
        ],
        formData: [
        ]
      }
    },
    methods: {
      getCoinReturns(item) {
        this.active = item.active
      },
      fetchData (sort) {
        let coinType = sort || 0
        this.formData = []
        let data = {token: this.token, product_hash_type: coinType, page: 1, sort: ''}
        util.post('userCoinList', {sign: api.serialize(data)}).then(
          res => {
            api.checkAjax(this, res, () => {
              this.formData = res.value_list
              // this.showImg = !res.value_list.length
              // if (this.now > 1) return false
              // this.len = Math.ceil(res.total_num / 15)
            })
        })
      }
      // getData () {
      //   if (this.token !== 0) {
      //     util.post('userCoin', {sign: api.serialize({token: this.token, product_hash_type: '1'})}).then(
      //       res => {
      //         api.checkAjax(this, res, () => {
      //           this.data = res
      //         })
      //       })
      //   } else {
      //     setTimeout(() => {
      //       this.getData()
      //     }, 5)
      //   }
      // }
    },
    mounted () {
      // this.getData()
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
  }
</style>
