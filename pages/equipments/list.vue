<template>
  <pageFrame isComponent="true">
    <div class="museum_right currency_right">
      <h1 style="position:relative;">矿机博物馆<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
      <div class="museum_lists" v-for="n, k in museum" :key="k">
        <img :src="n.image"/>
        <div class="museum_content">
          <h6>{{n.title}}</h6>
          <p>{{n.resume}}</p>
          <router-link :to="'/equipments/detail/' + n.id">查看详情</router-link>
        </div>
      </div>
      <Pager :len="len"  style="padding-top:0;"></Pager>
    </div>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import pageFrame from '@/components/computeNews/pageFrame'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager, pageFrame
    },
    data () {
      return {
        len: 0,
        now: 1,
        museum: []
      }
    },
    head () {
      return {
        title: '比特币矿机-设备博物馆-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币矿机,矿机设备,矿机历史' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）历代矿机展示，介绍最早矿机公司生产出的比特币矿机，如蝴蝶矿机，蚂蚁矿机，阿瓦隆矿机，烤猫矿机等' }
        ]
      }
    },
    methods: {
      getList () {
        var self = this
        util.post('NewsMuseumList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.museum = res.list
            if (self.now > 1) return false
            self.len = Math.ceil(res.total / 5)
          })
        }).catch(res => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.getList()
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style lang="scss" scoped>
  .museum_right{
    float: left;
    width: 1002px;;
    background: white;
    padding:32px 62px 0 62px;
    box-sizing: border-box;
    h1{
      color: #121212;
      font-size: 24px;
      font-weight: 800;
      span{
        font-size: 20px;
        margin-left: 13px;
      }
    }
    .museum_lists{
      width: 100%;
      height: 172px;
      background: white;
      box-shadow: 0 0 10px #c2c2c2;
      margin-top: 20px;
      border-radius: 8px;
      img{
        width:132px;
        margin-top: 40px;
        float: left;
        object-fit: cover;
        margin-left: 48px;
      }
      .museum_content{
        width: 79%;
        float: left;
        padding-left: 58px;
        padding-top: 34px;
        h6{
          color: #333333;
          font-size: 22px;
          margin-bottom: 12px;
        }
        p{
          line-height: 22px;
          color: #666666;
          height: 42px;
          overflow: hidden;
          padding-right: 45px;
        }
        a{
          width: 172px;
          height: 38px;
          border:1px solid #bfbfbf;
          background:white;
          color: #a9a9a9;
          float: right;
          margin-right: 37px;
          border-radius: 5px;
          line-height: 38px;
          text-align: center;
          &:hover{
            background:#fe5039;
            color: white;
            border:0;
          }
        }
      }
    }
  }
</style>

