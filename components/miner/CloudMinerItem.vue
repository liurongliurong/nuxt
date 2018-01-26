<template>
  <div :class="['cloud_miner_item item', {'disabled': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]" @click="goDetail(d.id||d.product_id, '2')">
    <h3>
      <span>{{d.name}}</span>
      <span :class="'icon_currency '+((d.hashtype&&d.hashtype.name)||d.type_name)" v-if="d.hashtype"></span>
      <span :class="['sell_type', {active: d.sell_type===2&&d.status!==7}, {gray: d.status===7}]">{{(d.sell_type===2&&d.status!==7&&'转售')||str[d.status]}}</span>
    </h3>
    <div class="info_box">
      <template v-for="n,i in dataNav">
        <div class="info" v-if="i==='amount'">
          <div class="text">
            <span class="num">{{+d.amount}}</span>
            <span>{{n.unit}}</span>
          </div>
          <p>{{n.title}}</p>
        </div>
        <div class="info" v-else-if="i==='leftNum'">
          <div class="text">
            <span class="num">{{(d.amount-(d.buyed_amount||d.sell_amount))<0?0:(d.amount-(d.buyed_amount||d.sell_amount))}}</span>
            <span>{{n.unit}}</span>
          </div>
          <p>{{n.title}}</p>
        </div>
        <div class="info" v-else>
          <div class="text">
            <span class="num" v-if="i==='hashtype'">{{(d[i]&&d[i].name)||d.type_name}}</span>
            <span class="num" v-else>{{d[i]}}</span>
            <span>{{n.unit}}</span>
          </div>
          <p>{{n.title}}</p>
        </div>
        <div class="line"></div>
      </template>
      <button class="btn" v-if="d.amount-(d.buyed_amount||d.sell_amount)>0">立即购买</button>
      <button class="btn disabled" v-else>已售罄</button>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  export default {
    props: {
      d: {
        type: Object
      }
    },
    data () {
      return {
        dataNav: {'amount': {title: '出售总数', unit: '台'}, 'one_amount_value': {title: '每台单价', unit: '元'}, 'hash': {title: '每台算力', unit: 'T'}, 'power': {title: '功耗', unit: 'W/台'}, 'hashtype': {title: '算力类型', unit: ''}, 'leftNum': {title: '剩余数量', unit: '台'}},
        str: {4: '预热', 5: '热销', 7: '已售馨', 10: '活动'}
      }
    },
    methods: {
      goDetail (id, type) {
        api.goPage(id, type, this)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .cloud_miner_item{
    background: $white;
    padding:30px 50px;
    cursor: pointer;
    .info_box{
      @include flex(space-between)
      .info{
        width:14%;
        padding-left: 18px;
        .text .num{
          font-size: 24px;
        }
        &:first-child{
          .text{
            color: $orange
          }
        }
        p{
          color: $light_black;
        }
      }
      .line{
        width:1px;
        height: 35px;
        margin-top: 12px;
        background: $border
      }
      .btn{
        border:0;
        width:145px;
        color: $orange;
        text-align: center;
        line-height: 48px;
        border-radius:5px;
        background: transparent;
        &.disabled{
          color: #999;
        }
        &:disabled{
          color:$light_black
        }
      }
    }
    &:not(.disabled):hover{
      background: #ecf3ff;
      .btn:not(:disabled){
        @include button($orange)
        cursor: pointer;
      }
      .btn.disabled{
        background: none;
        border:0;
        color: #999;
      }
    }
    &.disabled{
      color:$light_black;
      h3{
        color:$light_black;
        .icon_currency{
          display: none;
        }
      }
      .info_box .info:first-child .text{
        color:$light_black;
      }
    }
  }
</style>
