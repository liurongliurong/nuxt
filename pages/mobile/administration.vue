<template>
  <div class="administration">
    <div class="form_list" v-if="!edit">
      <a href="javascript:;" class="form_item" @click="passwordReset">
        <span class="name">密码重置</span>
        <em></em>
      </a>
      <router-link v-for="item,k in formData" :to="item.link" :key="k" class="form_item">
        <span class="name">{{item.name}}</span>
        <em></em>
      </router-link>
    </div>
    <form class="form" @submit.prevent="submit" novalidate v-else>
      <form-field :form="login"></form-field>
      <button name="btn">确认提交</button>
      <div class="btn" @click="closeMask">取消</div>
    </form>
  </div>
</template>

<script>
  import { fetchApiData } from '@/util'
  import util from '@/util'
  import { login } from '@/util/form'
  import md5 from 'js-md5'
  import { mapState } from 'vuex'
  import FormField from '@/components/common/FormField'
  export default {
    components: {
      FormField
    },
    data() {
      return {
        formData: [
          {name: '邮寄地址', link: '/mobile/address'},
          {name: '常见问题', link: '/mobile/help'},
          {name: '意见反馈', link: '/mobile/advice'}
        ],
        login: login,
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
        fetchApiData(this, 'changeLoginPassword', Object.assign(data, {token: this.token}), (res) => {
          api.tips('修改成功', () => {
            this.$store.commit('LOGOUT')
            this.$router.push({path: '/auth/login'})
          })
          this.closeMask()
        })
      }
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
    font-size: 0.3rem;
    background: #f4f4f4;
    padding: 0.3rem 0;
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
    .form {
      background: #fff;
      min-height: calc(100vh - 1.1rem);
      @include form(v)
    }
  }
</style>
