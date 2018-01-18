<template>
  <div class="bank_card">
    <div class="none"></div>
    <div class="card">
      <span class="bank_name">{{info.name}}</span>
      <p class="number">**** **** **** 4545</p>
      <p class="end_number">4545</p>
    </div>
    <!-- <router-link class="button" >修改</router-link> -->
    <a class="button" >修改</a>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'

  export default {
    data() {
      return {
        info: {
          name: '工商银行',
          card: ''
        }
      }
    },
    mounted() {
      this.$store.commit('SET_TITLE', '邮寄地址')
      this.getBankCard()
    },
    methods: {
      getBankCard() {
        util.post('show_bankcard', api.serialize({token: 0})).then(
          res => {
            console.log(res)
          }
        )
      }
    }
  }
</script>

<style type="text/css" lang="scss">
@import '~assets/css/style.scss';
.bank_card {
  width: 100%;
  font-size: 0.32rem;
  padding: 1.08rem 0.3rem 0;
  background: #f4f4f4;

  .card {
    width: 100%;
    height: 2.7rem;
    padding-top: 0.49rem;
    color: #fff;
    background: url('../../assets/images/mobile/bank_card.png') no-repeat;
    background-size: 100%;
    .bank_name {
      margin-left: 0.42rem;
    }
    .number {
      width: 100%;
      text-align: center;
      font-size: 0.48rem;
      font-weight: bold;
      position: relative;
      top: 0.15rem;
    }
    .end_number {
      font-size: 0.9rem;
      font-weight: bold;
      text-align: right;
      opacity: 0.15;
      font-style: italic;
      width: 95%;
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
