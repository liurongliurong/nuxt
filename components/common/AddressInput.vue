<template>
  <div class="form_field">
    <template v-for="f in form">
      <div class="input" v-if="f.type!=='radio'">
        <span class="form_title">{{f.title}}</span>
        <span class="form_icon">*</span>
        <input :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern&&check.code" :isChange="f.isChange" :title="f.pattern&&check.tips" v-if="f.type!=='select'" :value="val&&val[f.name]">
        <select-city :val="val" v-else></select-city>
        <span class="tips" :title="f.pattern&&check.tips" :tips="f.placeholder"></span>
      </div>
      <label class="checkbox" v-else>
        <input type="checkbox" :name="f.name" :checked="val&&val[f.name]">
        <span>{{f.title}}</span>
      </label>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import api from '@/util/function'
  import SelectCity from '@/components/common/SelectCity'
  export default {
    components: {
      SelectCity
    },
    data () {
      return {
        check: {code: '^1[34578][0-9]{9}$', tips: '请输入11位手机号'}
      }
    },
    props: {
      form: {
        type: Array
      },
      val: {
        type: Object
      }
    },
    methods: {
      test (e) {
        this.val[e.target.name] = e.target.value
        var ele = e.target
        api.checkFiled(ele, this.isMobile)
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>
