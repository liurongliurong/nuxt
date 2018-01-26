<template>
  <div class="miner_item item" @click="goDetail(n.id, '1')">
    <span :class="['status', {red: n.status===1}, {green: n.status===4}, {gray: n.status===2||n.status===3}]">{{status[n.status]}}</span>
    <div class="img1">
      <img :src="n.minerPicture"/>
    </div>
    <h6>{{n.name}}</h6>
    <p class="address"><span class="left">{{n.unit?n.unit: 'BitCoin'}}</span><span class="right">{{n.MinerAddress?n.MinerAddress: '未定'}}</span></p>
    <div class="progress_info1">
      <div class="progress_box1">
        <template v-if="n.status===2">
          <div class="box1" :style="{width:100 +'%'}"></div>
        </template>
        <template v-else-if="n.status===4">
          <div class="box1" :style="{width:0 +'%'}"></div>
        </template>
        <template v-else>
          <div class="box1" :style="{width:((n.buyed_amount/n.amount)*100).toFixed(1)+'%'}"></div>
        </template>
      </div>
    </div>
    <div class="items">
      <div class="item_one" v-for="item,d in items">
        <p class="price" v-if="d==='buyed_amount'">{{(n.amount-n.buyed_amount)<0?0:(n.amount-n.buyed_amount)}}{{item.unit}}</p>
        <p class="price" v-else>{{n[d]}}{{item.unit}}</p>
        <p class="title">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/util/function'
  export default {
    props: {
      n: {
        type: Object
      }
    },
    data () {
      return {
        items: {
          'one_amount_value': {title: '单价', unit: '元'},
          'hash': {title: '算力', unit: 'T'},
          'buyed_amount': {title: '剩余数量', unit: '台'}
        },
        status: {1: '热销', 2: '已售罄', 3: '产品撤销', 4: '预热'}
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
  .miner_item{
    padding:0;
    margin:0;
    width: 280px;
    height: 320px;
    background: white;
    float: left;
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    cursor: pointer;
    .img1{
      width: 100%;
      height: 180px;
      position: relative;
      img{
        width: 126px;
        height: 81px;
        left: 50%;
        margin-left: -63px;
        object-fit: contain;
        top:64px;
        position: absolute;
      }
    }
    .status{
      width: 70px;
      height: 25px;
      display: block;
      text-align: center;
      line-height: 25px;
      color:white;
      font-size: 12px;
      position: absolute;
      left: 0;
      left:0;
      &.red {
        background: #ff6458;
      }
      &.gray {
        background: #bfbfbf;
      }
      &.green {
        background: #32cf99;
      }
    }
    h6{
      font-size: 16px;
      color:#121212;
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;
      text-align: left;
    }
    .address{
      width: 100%;
      padding:0 20px;
      box-sizing: border-box;
      padding-top: 9px;
      overflow: hidden;
      .left{
        color: #327fff;
        float: left;
        font-size: 12px;
      }
      .right{
        float: right;
        color: #a9a9a9;
        font-size: 12px;
      }
    }
    .progress_info1{
      width: 240px;
      margin:0 auto;
      margin-top: 10px;
    }
    @include progress(1, 5, rgb(50, 207, 153), rgb(50, 207, 153), 240)
    .items{
      width: 100%;
      padding: 0 20px;
      padding-top: 14px;
      overflow:hidden;
      .item_one{
        width: 33.3%;
        float: left;
        text-align: center;
        p{
          margin:0;
          padding:0;
        }
        .price{
          height: 20px;
          font-size: 14px;
          color: #666666;
          text-align: left;
        }
        .title{
          color: #a9a9a9;
          font-size: 12px;
          text-align: left;
        }
      }
      :nth-child(1){
        width: 80px;
        height: 30px;
      }
      :nth-child(2){
        padding-left:35px;
      }
      :nth-child(3){
        padding-left: 30px;
      }
    }
    &:hover{
      box-shadow:#dfe0e1 0 0 30px;
      z-index: 999;
      img{
        transform: scale(1.1);
      }
    }
  }
</style>
