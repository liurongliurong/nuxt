<template>
  <div class="administration">
    <div class="form_list">
      <a href="javascript:;" class="form_item" @click="passwordReset">
        <span class="name">密码重置</span>
        <em></em>
      </a>
      <router-link v-for="item,k in formData" :to="item.link" :key="k" class="form_item">
        <span class="name">{{item.name}}</span>
        <em></em>
      </router-link>
    </div>
    <my-mask :form="login" title="密码重置" @submit="submit" @closeMask="closeMask" v-if="edit"></my-mask>
  </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import md5 from 'js-md5'
  import { mapState } from 'vuex'
  import MyMask from '@/components/common/Mask'
  export default {
    components: {
      MyMask
    },
    data() {
      return {
        formData: [
          {name: '邮寄地址', link: '/mobile/address'},
          {name: '常见问题', link: '/mobile/help'},
          {name: '意见反馈', link: '/mobile/advice'}
        ],
        login: [{name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'}, {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}, {name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'password'}, {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', pattern: 'password', error: '两次密码不一致'}],
        edit: false
      }
    },
    methods: {
      passwordReset () {
        this.edit = true
      },
      closeMask () {
        this.edit = false
      },
      submit (e) {
        var form = e.target
        var data = api.checkForm(form, 1)
        if (!data) return false
        data.password = md5(data.password)
        data.password1 = md5(data.password1)
        util.post('changeLoginPassword', {sign: api.serialize(Object.assign(data, {token: this.token}))}).then((res) => {
          api.checkAjax(self, res, () => {
            api.tips('修改成功')
            this.closeMask()
          })
        })
      }
    },
    mounted () {
      this.$store.commit('SET_TITLE', '账户设置')
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
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
