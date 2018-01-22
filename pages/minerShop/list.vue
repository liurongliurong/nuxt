<template>
  <section class="miner_shop">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <div class="miner_pics">
      <div class="miner_pic pic1">
        <img :src="require('@/assets/images/miner_shop/bdc.jpg')" alt="">
        <div class="small">
          <router-link to="/bdc">前往申请机位</router-link>
          <!-- <router-link to="/minerShop/mining">两分钟带你了解如何挖矿</router-link> -->
        </div>
      </div>
      <div class="miner_pic pic2">
        <img :src="p.image" alt="" v-for="p,k in pics" :style="{'opacity':picShow===k?1:0}">
        <div class="swipe_pager">
          <div :class="['item', {active: picShow===k}]" v-for="p,k in pics" @mouseover="changePic(k)" @mouseout="swipe"></div>
        </div>
      </div>
      <div class="miner_pic pic3">
        <router-link to="/minerShop/miner/1">
          <!-- <img :src="require('@/assets/images/miner_shop/miner.jpg')" alt=""> -->
        </router-link>
      </div>
      <div class="miner_pic pic4">
        <router-link to="/minerShop/miner/2">
          <!-- <img :src="require('@/assets/images/miner_shop/cloud_miner.jpg')" alt=""> -->
        </router-link>
      </div>
    </div>
    <MinerList :minerData="minerData">
      <h2>
        <div>
          <span style="font-size:24px;">算力服务器推荐</span>
          <span>保全网提供全流程区块链存证、保全服务</span>
        </div>
        <router-link to="/minerShop/miner/1">更多算力服务器 ></router-link>
      </h2>
    </MinerList>
    <CloudMinerList :cloudMinerData="cloudMinerData">
      <h2>
        <div>
          <span>云算力推荐</span>
          <span>国家电网 算力保证</span>
        </div>
        <router-link to="/minerShop/miner/2">更多云算力 ></router-link>
      </h2>
    </CloudMinerList>
    <div class="miner_loan">
      <div class="loan_center">
        <h1>算力分期</h1>
        <p><span>快</span>随心分期，行业创新典范</p>
        <p><span>惠</span>最长享有180天的分期付款</p>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import CloudMinerList from '@/components/miner/CloudMinerList'
  import MinerList from '@/components/miner/MinerList'
  export default {
    components: {
      CloudMinerList, MinerList
    },
    data () {
      return {
        cloudMinerData: [],
        minerData: [],
        picShow: 0,
        pics: [],
        timer: ''
      }
    },
    head () {
      return {
        title: '比特币云算力-价格最低云算力产品大全－算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币算力服务器,二手算力服务器,算力服务器期货' },
          { hid: 'description', name: 'description', content: '算力网云算力商城，汇集目前主流比特币云算力产品，包括阿瓦隆7云算力，S9云算力以及E9算力产品，为比特币爱好者提供比特币云算力购买服务' }
        ]
      }
    },
    methods: {
      fetchData () {
        var self = this
        var obj = {token: this.token}
        var url = 'showMinerList'
        var url2 = 'showproductList'
        util.post(url2, {sign: api.serialize(obj)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.cloudMinerData = res.data
          })
        })
        util.post(url, {sign: api.serialize(obj)}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.minerData = res.data
          })
        })
      },
      swipe () {
        this.timer = setInterval(() => {
          this.picShow += 1
          this.picShow = this.picShow >= this.pics.length ? 0 : this.picShow
        }, 3000)
      },
      changePic (k) {
        clearInterval(this.timer)
        this.picShow = k
      }
    },
    mounted () {
      this.fetchData()
      var self = this
      util.post('banner', {sign: 'token=' + this.token}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.pics = res
        })
      })
      this.swipe()
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .miner_shop{
    .bg_box{
      @include bg(1920,466px,#070a0f)
      background:none;
      .bg{
        background:url(../../assets/images/miner_shop/miner_list.jpg) no-repeat;
        height: 498px;
        width:100%;
        background-size: 100% 100% !important;
        left:0;
      }
      @include mobile_hide
    }
    .miner_pics{
      @include position(90)
      left: calc(50% - 590px);
      right: calc(50% - 590px);
      bottom:auto;
      .miner_pic{
        position: relative;
        float:left;
        img{
          position: relative;
          left:auto;
          width:100%;
          height:100%
        }
        .btn,.text{
          @include position
          top:auto;
          left:80px;
          bottom:60px;
          width:290px;
          line-height: 2;
          text-align: center;
          color:#eee;
        }
        .btn{
          display: block;
          cursor: pointer;
        }
        &.pic1{
          height: 475px;
          .small{
            position: absolute;
            top:200px;
            a{
              display:block;
            }
            :nth-child(1){
              width: 242px;
              height: 62px;
              background: linear-gradient(to right, #fb2056 20%, #d80127);
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fb2056', endColorstr='#d80127',GradientType=1 );
              text-align: center;
              color: white;
              line-height: 62px;
              font-size: 18px;
              font-weight: 800;
              top: 110px;
              left: 64px;
              position: relative;
            }
            :nth-child(2){
              color:white;
              position: relative;
              left: 113px;
              top:142px;
            }
          }
        }
        &.pic2{
          position: relative;
          width:804px;
          height:298px;
          .swipe_pager{
            @include position(auto,auto,15,30)
            .item{
              @include block(10)
              border:2px solid white;
              border-radius:50%;
              cursor: pointer;
              &:hover,&.active{
                border:2px solid $orange;
              }
              & + .item{
                margin-left:10px
              }
            }
          }
          .btn{
            left:120px;
            width:200px;
            font-size: 18px;
            font-weight: bold;
            @include button(#FE5038)
            border-radius:20px;
          }
          img{
            @include position
            width:100%;
            height:100%;
            object-fit:cover;
            transition: all 1s;
          }
        }
        &.pic2,&.pic3,&.pic4{
          margin-left:10px;
        }
        &.pic3,&.pic4{
          width:397px;
          margin-top:10px;
          .btn{
            left:75px;
            width:200px;
          }
          .text{
            bottom:100px;
            left:0;
            width:100%;
            font-size: 16px;
            span:first-child{
              color:#B2884E;
              &:before,&:after{
                color:#eee;
              }
              &:before{
                content:'[';
                padding-right:3px
              }
              &:after{
                content:']';
                padding-left:3px
              }
            }
          }
        }
        @include mobile_hide
      }
      @include mobile_hide
    }
    .miner_loan{
      @include mobile_hide
      background:#363A4E url('../../assets/images/miner_shop/loan.jpg');
      background-size:100% 100%;
      width:100%;
      height:350px;
      .loan_center{
        width:1180px;
        height: 100%;
        margin:0 auto;
        padding-left: 24px;
        padding-top: 42px;
        h1{
          color: white;
          font-size: 65px;
          font-weight: 800;
        }
        p{
          font-size: 20px;
          color:white;
          margin-top:30px;
          span{
            width:52px;
            height:52px;
            display:inline-block;
            border-radius: 100%;
            background: #b28750;
            text-align: center;
            line-height: 52px;
            margin-right: 30px;
          }
        }
      }
    }
    .millsList{
      padding-top: 30px;
      @include mobile_hide
      margin-top:0 !important;
    }
    .product_list{
      .box h2{
        @include mobile_hide
      }
    }
  }
</style>
