<template>
  <section class="cloud_miner">
    <div :class="['item', {'disabled': d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)}]">
      <h3>
        <span>{{page==='compute'?d.product_name:d.name}}</span>
        <span :class="'icon_currency '+d.hashtype&&d.hashtype.name" v-if="d.hashtype"></span>
        <span :class="['sell_type', {active: d.sell_type===2}]" v-if="page==='minerShop'&&d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]}}</span>
        <span class="sell_type gray" v-if="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">已售罄</span>
      </h3>
      <div class="info_box">
        <template v-for="n,i in dataNav">
          <div class="info" v-if="i==='leftNum'">
            <div class="text">
              <span class="num">{{d.amount-d.buyed_amount}}</span>
              <span>{{n.unit}}</span>
            </div>
            <p>{{n.title}}</p>
          </div>
          <div class="info" v-else>
            <div class="text">
              <span class="num" v-if="i==='buyed_amount'">{{d.buyed_amount - 0.00}}</span>
              <span class="num" v-else-if="i==='hashtype'">{{d[i].name}}</span>
              <span class="num" v-else>{{d[i]}}</span>
              <span>{{n.unit}}</span>
            </div>
            <p>{{n.title}}</p>
          </div>
          <div class="line"></div>
        </template>
        <template v-if="page==='compute'">
          <button class="btn" v-if="d.status===1">立即购买</button>
          <button class="btn" disabled v-else-if="d.status===2">已转让</button>
          <button class="btn" disabled v-else-if="d.status===3">产品撤销</button>
        </template>
        <template v-else>
          <button class="btn" v-if="d.amount-d.buyed_amount>0">立即购买</button>
          <button class="btn disabled" v-else>已售罄</button>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      d: {
        type: Object
      }
    },
    data () {
      return {
        dataNav: {'amount': {title: '出售总数', unit: '台'}, 'one_amount_value': {title: '每台单价', unit: '元'}, 'hash': {title: '每台算力', unit: 'T'}, 'power': {title: '功耗', unit: 'T'}, 'hashtype': {title: '算力类型', unit: ''}, 'leftNum': {title: '剩余数量', unit: '台'}},
        str: {4: '预热', 5: '热销'}
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .cloud_miner{
    .item{
      padding:30px 50px;
      background: $white;
      cursor: pointer;
      h3{
        font-size: 18px;
        margin-bottom:10px;
        .icon_currency{
          margin-left:5px;
        }
        .sell_type{
          font-size: 12px;
          margin-left:8px;
          width:58px;
          height: 18px;
          text-align: center;
          border-radius:18px;
          line-height:15px;
          color:#ff721f;
          display: inline-block;
          border:1px solid #ff721f;
          position: relative;
          top: -4px;
          &.gray{
            border:1px solid #999;
            color: #999;
            background: none;
          }
          &.active{
            border-color:$blue;
            color:$blue;
          }
        }
      }
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
      &:not(:last-child){
        margin-bottom:10px;
      }
      &:hover{
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
        color:#999;
        .info_box .info p{
          color: #c3bebe
        }
      }
    }
  }
</style>
