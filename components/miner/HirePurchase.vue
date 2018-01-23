<template>
  <div class="hire_purchase">
    <h3 class="title">分期购买计划</h3>
    <div class="order_detail">
      <table border="0">
        <thead>
          <tr>
            <th v-for="n in thead">{{n}}</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{active: rate===3}">
            <td><input type="radio" class="teradio" name="qi" @click="setValue(3)" checked/></td>
            <td>{{totalPrice}}</td>
            <td>3期</td>
            <td>2%</td>
            <td>{{(totalPrice/3 + (totalPrice*0.02)).toFixed(2)}}（含每期手续费）</td>
            <td>{{(totalPrice*0.02).toFixed(2)}}</td>
          </tr>
          <tr :class="{active: rate===6}">
            <td><input type="radio" name="qi" class="teradio" @click="setValue(6)"/></td>
            <td>{{totalPrice}}</td>
            <td>6期</td>
            <td>3%</td>
            <td>{{(totalPrice/6 + (totalPrice*0.03)).toFixed(2)}}（含每期手续费）</td>
            <td>{{(totalPrice*0.03).toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      totalPrice: {
        type: Number
      },
      rate: {
        type: Number
      }
    },
    data () {
      return {
        thead: ['选择', '分期金额（元）', '分期期数', '手续费率', '每期应还（元）', '每期手续费（元）']
      }
    },
    methods: {
      setValue (k) {
        this.emit('setRate', k)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .hire_purchase{
    h3.title{
      background:#01bfb5;
      color:white;
    }
    .order_detail{
      width: 100%;
      table{
        width: 900px;
        thead {
          height: 40px !important;
          line-height: 40px;
          border:1px solid #e5e5e5;
          background:#f5f5f5;
          width: 900px;
          box-sizing: border-box;
        }
        tbody{
          tr{
            line-height: 56px;
            border-bottom: 1px solid #e5e5e5;
            td{
              color: #121212;
              font-size: 14px;
              text-align: center;
              input{
                @include checkbox(18);
                border:1px solid #d2d2d2;
                width: 12px;
                border-radius: 0;
                height: 12px;
                background:white;
              }
            }
            &:hover{
              background:#edffff;
            }
            &.active{
              background:#edffff;
            }
          }
        }
      }
    }
  }
</style>
