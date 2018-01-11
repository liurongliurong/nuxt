<template>
  <div class="opr_select">
    <p>{{text[no]}}</p>
    <div class="btn_box">
      <button class="btn" @click="goPage">{{btn[no]}}</button>
      <button class="btn" @click="closeMask">取消</button>
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
        btn: ['去认证', '去绑定', '去绑定']
      }
    },
    methods: {
      goPage () {
        if (this.isMobile) {
          this.$router.push({name: 'mobile-administration'})
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
  .opr_select{
    p{
      text-align: center;
      padding: 40px 30px;
    }
    .btn_box{
      @include flex(center)
      padding-bottom: 30px;
      .btn{
        width:100px;
        @include button
        line-height: 2.2;
        & + .btn {
          margin-left:15px;
          background: $border;
          border-color: $border;
          color: $light_text;
        }
      }
    }
  }
</style>