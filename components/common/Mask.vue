<template>
  <section class="mask_con">
    <div class="form_box">
      <div class="close" @click="$parent.closeEdit()">
        <span class="icon"></span>
      </div>
      <h2>{{title}}</h2>
      <form :class="['form form_content', {card_form: $parent.edit==='card'}]" @submit.prevent="$parent.submit" novalidate v-if="!contract">
        <FormField :form="form"></FormField>
        <p v-if="$parent.fee&&$parent.edit!=='GetIncome'">手续费：{{$parent.total_price * $parent.fee|format}}元<span class="fee">({{$parent.fee*100+'%'}})</span></p>
        <p v-if="$parent.fee&&$parent.edit==='GetIncome'">手续费：0.0002btc</p>
        <button name="btn">确认提交</button>
      </form>
      <div class="contract" v-html="contract" v-else></div>
    </div>
  </section>
</template>

<script>
  import FormField from '@/components/common/FormField'
  import api from '@/util/function'
  export default {
    components: {
      FormField
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
      }
    },
    filters: {
      format: api.decimal
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
        &.card_form .input{
          span{
            &:first-child {
              width: 120px;
              text-align: right;
            }
            &:nth-child(2) {
              left: 135px
            }
          }
          input,.sel,.select{
            padding-left:185px
          }
        }
        .fee{
          font-size: 12px;
          color: $light_black;
          margin-left:5px
        }
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
