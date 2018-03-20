<template>
  <div class="opr_select">
    <p>{{text[no]}}</p>
    <div class="btn_box">
      <div class="btn" @click="goPage">{{btn[no]}}</div>
      <div class="btn" @click="closeMask">取消</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'oprSelect',
    props: {
      no: {
        type: Number
      }
    },
    data () {
      return {
        text: ['当前帐户尚未完成实名认证，请先完成个人认证，再次进行操作。', '当前帐户尚未绑定银行卡，暂时无法操作，请先绑定银行卡。', '当前帐户尚未绑定算力地址，无法进行提币操作，请先绑定算力地址。'],
        btn: ['去实名认证', '去绑定', '去绑定']
      }
    },
    methods: {
      goPage () {
        document.body.style.overflow = 'auto'
        if (this.isMobile) {
          this.$store.commit('SET_URL', this.$route.path)
          if (this.no === 0) {
            this.$router.push({name: 'mobile-idVerfication'})
          } else if (this.no === 1) {
            this.$router.push({name: 'mobile-bankCard'})
          } else {
            this.$router.push({name: 'mobile-assetsAddress'})
          }
        } else {
          this.$router.push({name: 'user-account'})
        }
      },
      closeMask () {
        this.$emit('closeMask')
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .opr_select {
    p {
      padding: 40px 0.4rem;
      text-align: center;
    }
    .btn_box {
      @include flex(center)
      padding-bottom: 30px;
      .btn{
        width:120px;
        @include button
        line-height: 2.2;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        & + .btn {
          margin-left:15px;
          background: $border;
          border-color: #e5e5e5;
          color: $light_text;
        }
      }
    }
    @media screen and (max-width: $mobile) {
      p{
        text-align: left;
      }
      .btn_box {
        display: block;
        padding-bottom: 0;
        border: 1px solid #e5e5e5;
        .btn{
          width: 100%;
          line-height: 3;
          &:nth-child(1) {
            color: $blue;
          }
          &:nth-child(1), &:nth-child(2) {
            background: #fff;
            border-color: #fff;
          }
          & + .btn {
            margin-left:0;
            border-top: 1px solid #e5e5e5;
          }
        }
      }
    }
  }
</style>