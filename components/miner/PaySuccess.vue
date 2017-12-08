<template>
  <div class="pay_success">
    <div class="success_top">
      <h5>
        <span class="spanone"><img src="../../assets/images/true.png"/></span>
        <h2 class="spantwo">订单支付成功 ！ 我们将尽快安排为您发货 ！</h2>
      </h5>
      <p class="address"><span class="te">寄送至 ： </span>{{addressData.province_name+addressData.city_name+addressData.area_name+addressData.area_details}}(<span class="te">{{addressData.post_user}}</span> 收) <span class="te">{{addressData.post_mobile}}</span></p>
      <p class="router">您现在可以 ： <router-link to="/minerShop/list">浏览购买其他产品</router-link> 或去 <router-link to="/user/computeProperty">个人中心</router-link> 查看交易记录</p>
    </div>
    <div class="success_bottom">
      <h5>其他热门矿机推荐</h5>
      <MinerList></MinerList>
    </div>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MinerList from '@/components/miner/MinerList'
  export default {
    components: {
      MinerList
    },
    mounted () {
      this.addressData = this.$parent.addressData[this.$parent.addressNo]
      var self = this
      util.post('showTopMiner', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.minerData = res
        })
      }).catch(res => {
        console.log(res)
      })
    },
    data () {
      return {
        minerData: [],
        addressData: {}
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style lang="scss">
  .pay_success{
    width: 1180px;
    overflow: hidden;
    margin:0 auto;
    margin-top: 29px;
    .success_top{
        width: 100%;
        height: 286px;
        background: #edfde3;
        box-sizing: border-box;
        padding-top: 55px;
        border-top: 7px solid #a6db8b;
        h5{
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
        .millsList{
            background: white;
        }
    }
  }
</style>

