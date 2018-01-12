<template>
  <div :class="'popup'">
    <div :class="'popup_con '+position">
      <div class="popup_title" v-if="position!=='middle'">
        <span>{{title}}</span>
        <span class="icon_close" @click="closeMask"></span>
      </div>
      <form class="form form_content" @submit.prevent="submit" novalidate v-if="form&&form.length">
        <AddressInput :form="form" :val="val" v-if="val"></AddressInput>
        <template v-else>
          <FormField :form="form" @onChange="onChange"></FormField>
          <slot name="fee"></slot>
        </template>
        <button name="btn">确认提交</button>
      </form>
      <template v-else-if="contract">
        <slot name="selfEdit" v-if="contract==='selfEdit'"></slot>
        <div class="popup_body" v-html="contract" v-else></div>
        <div class="popup_foot">
          <label for="accept1" @click="closeMask">
            <span>同意并继续</span>
          </label>
        </div>
      </template>
      <slot name="pay_type" v-if="title==='选择支付方式'"></slot>
      <slot name="select_opr" v-if="title==='立即认证'||title==='立即绑定'"></slot>
      <solt name="chart" v-if="title==='收益图表'"></solt>
    </div>
  </div>
</template>

<script>
  import FormField from '@/components/common/FormField'
  import AddressInput from '@/components/common/AddressInput'
  import api from '@/util/function'
  export default {
    components: {
      FormField, AddressInput
    },
    props: {
      form: {
        type: Array
      },
      title: {
        type: String
      },
      contract: {
        type: String
      },
      val: {
        type: Object
      },
      position: {
        type: String,
        default: ''
      }
    },
    filters: {
      format: api.decimal
    },
    methods: {
      goOn () {
        this.closeMask()
        var accept = document.querySelector('#accept')
        accept.checked = true
      },
      closeMask () {
        this.$emit('closeMask')
      },
      submit (e) {
        this.$emit('submit', e)
      },
      onChange (obj) {
        this.$emit('onChange', obj)
      }
    }
  }
</script>
