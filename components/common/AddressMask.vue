<template>
  <section class="mask_con">
    <div class="form_box">
      <div class="close" @click="$parent.closeMask()">
        <span class="icon"></span>
      </div>
      <h2>{{title}}</h2>
      <form class="form form_content" @submit.prevent="$parent.submit" novalidate v-if="!contract">
        <AddressInput :form="form" :val="val"></AddressInput>
        <button name="btn">确认提交</button>
      </form>
      <div class="contract" v-html="contract" v-else></div>
    </div>
  </section>
</template>

<script>
  import AddressInput from '@/components/common/AddressInput'
  export default {
    components: {
      AddressInput
    },
    props: {
      form: {
        type: Array
      },
      val: {
        type: Object
      },
      title: {
        type: String
      },
      contract: {
        type: String
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mask_con{
    @include mask
    .form_box{
      .form_content{
        padding:40px 130px;
        @include form(v)
      }
    }
    .contract{
      padding:30px;
      height:680px;
      overflow:auto;
      p, p > *{
        white-space:wrap !important;
      }
    }
  }
</style>
