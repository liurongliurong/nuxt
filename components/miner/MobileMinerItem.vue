<template>
  <div class="mobile_miner_item item" @click="$parent.goPay(n.id)">
    <div class="null">
      <div class="mobile_minerfixed">
        <p class="status1" v-if="n.status===1">热销中</p>
        <p class="gray1" v-if="n.status===3">已下架</p>
        <p class="gray1" v-if="n.status===2">已售罄</p>
        <p class="gray1" v-if="n.status===4" style="background: #32cf99;">预热</p>
      </div>
      <img :src="n.minerPicture"/>
    </div>
    <h6>{{n.name}}</h6>
    <div class="progress_info1">
      <div class="progress_box1">
        <div class="box1" :style="{width:((n.buyed_amount/n.amount)*100).toFixed(1)+'%'}"></div>
        </div>
    </div>
    <p>算力价： <b>¥{{n.one_amount_value}}</b> <span>{{n.hash}}T</span></p>
  </div>
</template>

<script>
  export default {
    props: {
      n: {
        type: Object
      }
    },
    data () {
      return {
        loading: false,
        showcontent: false,
        minerData: [],
        showno: false,
        total: -1,
        currentPage: 1,
        items: {'one_amount_value': {title: '矿机单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'buyed_amount': {title: '剩余数量', unit: '台'}}
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mobile_miner_item{
    display: block;
    width: 3.27rem;
    height: 4.2rem;
    overflow: hidden;
    .null{
      width: 100%;
      height: 4.3rem;
      height: 2.6rem;
      background: #efefef;
      border-radius: .3rem;
      text-align: center;
      position: relative;
      .mobile_minerfixed{
        position: absolute;
        left: 0;
        top:0;
        p{
          width: 1.5rem;
          height: 0.6rem;
          color: white;
          font-size: 0.3rem;
          text-align: center;
          line-height: 0.6rem;
        }
        .status1{
          background: #fe5039;
        }
        .gray1{
          background: #c5c4c4;
        }
      }
      img{
        width: 2.68rem;
        height: 1.58rem;
        margin-top: 0.49rem;
        object-fit: contain;
      }
    }
    h6{
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: normal;
      font-size: .26rem;
      padding-top: .2rem;
    }
    .progress_info1{
      position: relative;
      padding:6px 0;
      .progress_box1{
        position: relative;
        overflow:hidden;
        border-radius:5px;
        height:5px;
        background: $border;
        .box1{
          @include position
          @include process_color
        }
      }
    }
    p{
      font-size: 0.22rem;
      b{
        color:#fe5039;
      }
      span{
        float: right;
      }
    }
  }
</style>
