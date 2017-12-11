<template>
  <section class="bdcform">
    <div class="message">
      <textarea placeholder="欢迎您向我们反馈使用过程中的任何意见和建议！" id="textarea" maxlength="150" minlength="0"></textarea>
      <p>0/150</p>
    </div>
    <p style="display:none;" id="block">请输入意见!</p>
    <button @click="content" id="button">提交</button>
  </section>
</template>
<script>
import { Toast } from 'mint-ui'
import util from '@/util'
import api from '@/util/function'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      option: {'title': '请选择BDC'}
    }
  },
  methods: {
    content () {
      var self = this
      var contenthtml = document.getElementById('textarea').value
      if (!contenthtml) {
        document.getElementById('block').style = 'display:block'
        return false
      } else {
        document.getElementById('block').style = 'display:none'
        util.post('collectAdvice', {sign: api.serialize({token: this.token, user_id: this.user_id, content: encodeURIComponent(contenthtml)})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.myToast('提交成功 ！')
            setTimeout(() => {
              self.$router.push({name: 'mpersoncenter'})
            }, 3000)
          })
        })
      }
    },
    myToast (str) {
      Toast({
        message: str,
        position: 'middle',
        duration: 2000
      })
    }
  },
  computed: {
    ...mapState({
      token: state => state.info.token,
      user_id: state => state.info.user_id
    })
  }
}
</script>
<style scoped lang="scss">
  #block{
    color:red;
    padding:0.5rem;
    padding-bottom:0;
  }
  .bdcform{
    width: 100%;
    height: 100vh;
    background: #f5f5f9;
    button{
      background:#327fff;
      height: 2rem;
      border:0;
      color: white;
      font-size:  0.7rem;
      width: 94%;
      margin-top: 20px;
      margin-left: 3%;
      border-radius: 3px;
    }
    .bodyform{
      width: 100%;
      padding:0;
      margin:0;
      padding:0 .5rem;
      .mint-cell{
        margin-top:.5rem;
        border:1px solid #bfbfbf;
        border-radius:5px;
        span{
          width: 4.5rem;
          display:inline-block;
          height: 34px;
          text-align:center;
          color: #498aff;
          margin-top:6px;
          line-height: 34px;
          border-left:1px solid #dddddd;
        }
      }
    }
    .message{
      width: 100%;
      height: 6rem;
      background: white;
      padding:.5rem;
      textarea::-webkit-input-placeholder{
        color: #e6e6e6;
      }
      textarea{
        width: 100%;
        height: 4.5rem;
        display: block;
      }
      p{
        text-align: right;
        color: #5a5a5a;
      }
    }
  }
</style>