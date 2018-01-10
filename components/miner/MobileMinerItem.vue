<template>
  <div class="mobile_miner_item item" @click="goDetail(n.id, '1')">
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
  import api from '@/util/function'
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
  .mobile_miner_item{
    display: block;
    width: 48%;
    height: 7.5rem;
    overflow: hidden;
    .null{
      width: 100%;
      height: 4.3rem;
      background: #efefef;
      border-radius: .3rem;
      text-align: center;
      position: relative;
      .mobile_minerfixed{
        position: absolute;
        left: 0;
        top:0;
        p{
          width: 2rem;
          height: 1rem;
          color: white;
          font-size: 0.5rem;
          text-align: center;
          line-height: 1rem;
        }
        .status1{
          background: #fe5039;
        }
        .gray1{
          background: #c5c4c4;
        }
      }
      img{
        width: 4rem;
        height: 2.4rem;
        margin-top: 0.9rem;
      }
    }
    h6{
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: normal;
      font-size: .6rem;
      padding-top: .2rem;
    }
    @include progress(1, 5, #337eff, #c72abc)
    p{
      font-size: 0.4rem;
      b{
        color:#fe5039;
      }
      span{
        float: right;
      }
    }
  }
</style>
