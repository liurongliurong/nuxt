<template>
  <section class="miner_shop">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <div class="miner_pics">
      <div class="miner_pic pic1">
        <img :src="require('@/assets/images/miner_shop/bdc.jpg')" alt="">
        <div class="btn">
          <router-link to="/bdc">前往申请</router-link>
          <router-link to="/minerShop/mining">了解挖矿</router-link>
        </div>
      </div>
      <div class="miner_pic pic2">
        <img :src="p.image" alt="" v-for="p,k in pics" :style="{'opacity':picShow===k?1:0}">
        <!-- <router-link to="/minerShop/activity" class="btn">立即抢购</router-link> -->
        <div class="swipe_pager">
          <div :class="['item', {active: picShow===k}]" v-for="p,k in pics" @mouseover="changePic(k)" @mouseout="swipe"></div>
        </div>
      </div>
      <div class="miner_pic pic3">
        <img :src="require('@/assets/images/miner_shop/miner.jpg')" alt="">
        <div class="text">
          <span>矿机</span>
          <span>品牌矿机，质量保证</span>
        </div>
        <router-link to="/minerShop/miner/1" class="btn">即刻前往>></router-link>
      </div>
      <div class="miner_pic pic4">
        <img :src="require('@/assets/images/miner_shop/cloud_miner.jpg')" alt="">
        <div class="text">
          <span>云矿机</span>
          <span>专人维护，无忧挖矿</span>
        </div>
        <router-link to="/minerShop/miner/2" class="btn">即刻前往>></router-link>
      </div>
    </div>
    <MinerList>
      <h2>
        <div>
          <span>矿机推荐</span>
          <span>保全网提供全流程区块链存证、保全服务</span>
        </div>
        <router-link to="/minerShop/miner/1">更多矿机 ></router-link>
      </h2>
    </MinerList>
    <CloudMinerList page="minerShop">
      <h2>
        <div>
          <span>云矿机推荐</span>
          <span>国家电网 算力保证 无忧挖矿</span>
        </div>
        <router-link to="/minerShop/miner/2">更多云矿机 ></router-link>
      </h2>
    </CloudMinerList>
    <div class="miner_loan">
      <div class="loan_center">
        <h1>算力分期</h1>
        <p><span>快</span>先挖矿,随心分期，行业创新典范</p>
        <p><span>惠</span>最长享有180天的分期付款</p>
      </div>
    </div>
    <SideBar></SideBar>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import CloudMinerList from '@/components/miner/CloudMinerList'
  import MinerList from '@/components/miner/MinerList'
  import SideBar from '@/components/home/SideBar'
  export default {
    components: {
      CloudMinerList, SideBar, MinerList
    },
    data () {
      return {
        cloudMinerDate: [],
        minerData: [],
        picShow: 0,
        pics: [],
        timer: ''
      }
    },
    head () {
      return {
        title: '比特币云矿机-价格最低云矿机产品大全－算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币矿机,二手矿机,矿机期货' },
          { hid: 'description', name: 'description', content: '算力网云矿机商城，汇集目前主流比特币云矿机产品，包括阿瓦隆7云矿机，S9云矿机以及E9矿机云算力产品，为比特币挖矿爱好者提供比特币云矿机购买服务' }
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
            self.cloudMinerDate = res.data
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
        token: state => state.info.token,
        user_id: state => state.info.user_id
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .miner_shop{
    .bg_box{
      @include bg(1920,650px,#070a0f)
      .bg{
        background:url(~assets/images/miner_shop/miner_list.jpg) no-repeat;
      }
      @include mobile_hide
    }
    .miner_pics{
      @include position(130)
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
          height:594px;
          .btn{
            text-align: center;
            a{
              padding:0 20px;
              color:#eee;
              &:first-child{
                padding-right:0;
                &:after{
                  color:#999;
                  margin-left:30px;
                  content:'/'
                }
              }
            }
          }
        }
        &.pic2{
          position: relative;
          width:710px;
          height:298px;
          .swipe_pager{
            @include position(auto,auto,15,30)
            .item{
              @include block(16)
              border:1px solid $orange;
              border-radius:50%;
              cursor: pointer;
              &:hover,&.active{
                background: $orange;
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
          width:350px;
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
      background:url('../../assets/images/miner_shop/loan.jpg');
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
      padding-top: 80px;
      @include mobile_hide
    }
    .product_list{
      .box h2{
        @include mobile_hide
      }
    }
  }
</style>
