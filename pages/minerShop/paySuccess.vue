<template>
  <div class="pay_success">
    <div class="pay_success_box">
      <div class="success_top">
        <div class="success_text">
          <span class="spanone"><img src="../../assets/images/true.png"/></span>
          <h2 class="spantwo">订单支付成功 ！{{typeList[type-1].text}}</h2>
        </div>
        <p class="address" v-if="addressData.id"><span class="te">寄送至 ： </span>{{addressData.province_name+addressData.city_name+addressData.area_name+addressData.area_details}}(<span class="te">{{addressData.post_user}}</span> 收) <span class="te">{{addressData.post_mobile}}</span></p>
        <p class="router">您现在可以 ： <router-link to="/minerShop/list">浏览购买其他产品</router-link> 或去 <router-link to="/user/computeProperty">个人中心</router-link> 查看交易记录</p>
      </div>
      <div class="success_bottom">
        <h5>其他热门{{typeList[type-1].title}}推荐</h5>
        <div class="box">
          <CloudMinerItem v-for="d,k in data" :d="d" :key="k" v-if="type==='2'"></CloudMinerItem>
          <MinerItem v-for="n,k in data" :n="n" :key="k" v-if="type==='1'"></MinerItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import MinerItem from '@/components/miner/MinerItem'
  import CloudMinerItem from '@/components/miner/CloudMinerItem'
  export default {
    components: {
      MinerItem, CloudMinerItem
    },
    data () {
      return {
        data: [],
        addressData: {},
        typeList: [{url: 'showTopMiner', title: '矿机', text: '我们将尽快安排为您发货 ！'}, {url: 'product_top_list', title: '云算力', text: ''}],
        type: '1'
      }
    },
    methods: {
      goPay (id) {
        console.log(id)
        localStorage.setItem('params', JSON.stringify([ id, this.type]))
        this.$router.push({path: '/minerShop/detail/'})
      }
    },
    mounted () {
      var p = localStorage.getItem('info')
      p = JSON.parse(p)
      if (p.payType) {
        this.type = p.payType
        this.addressData = p.addressData || {}
      } else {
        this.$router.push({path: '/minerShop/list'})
      }
      console.log(this.type)
      util.post(this.typeList[this.type - 1].url, {sign: 'token=0'}).then(res => {
        api.checkAjax(this, res, () => {
          this.data = res
        })
      })
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/style.scss';
  .pay_success{
    background: #f7f8fa;
    .pay_success_box{
      @include main
      overflow: hidden;
      margin-top: 29px;
      .success_top{
        width: 100%;
        height: 286px;
        background: #edfde3;
        box-sizing: border-box;
        padding-top: 55px;
        border-top: 7px solid #a6db8b;
        .success_text{
          width: 100%;
          height: 52px;
          padding-left: 170px;
          .spanone{
            width: 52px;
            height: 52px;
            background: #5bb93d;
            display:inline-block;
            border-radius: 100%;
            text-align: center;
            line-height: 42px;
            float: left;
            margin-right: 24px;
            img{
              width: 30px;
              height: auto;
            }
          }
          .spantwo{
            width: 400px;
            color:#5ab83c;
            font-size: 20px;
            font-weight: 800;
            float: left;
            padding-top: 10px;
          }
        }
        .address{
          padding-left: 248px;
          margin-top: 20px;
          color: #7f807a;
          span{
            color: #33342f;
          }
        }
        .router{
          padding-left: 248px;
          color: #7f807a;
          margin-top: 28px;
          a{
            color: #1b8dfd;
          }
        }
      }
      .success_bottom{
        margin-top: 45px;
        margin-bottom: 200px;
        width: 100%;
        overflow: hidden;
        h5{
          color: #333333;
          font-size: 23px;
          margin-bottom: 20px;
        }
        .box{
          .item{
            @include cloud_miner_box
          }
        }
      }
    }
  }
</style>
