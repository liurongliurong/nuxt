<template>
  <div class="museum_right">
    <h1 style="position:relative;">矿机制造商<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
    <div class="museum_lists" v-for="n, k in museum" :key="k">
      <div class="museuming"><img :src="n.image"/></div>
      <div class="museum_content">
        <h6>{{n.title}}</h6>
        <p>{{n.resume}}</p>
        <router-link :to="'/manufacturer/detail/' + n.id">查看详情</router-link>
      </div>
    </div>
    <Pager :len="len" style="padding-top:0;"></Pager>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        len: 0,
        now: 1,
        museum: []
      }
    },
    methods: {
      getList () {
        var self = this
        util.post('NewsManfacturerList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
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
    width: 1002px;
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
      height: 232px;
      background: white;
      box-shadow: 0 0 10px #c2c2c2;
      margin-top: 20px;
      border-radius: 8px;
      .museuming{
        width: 254px;
        height: 170px;
        border-right: 1px solid #999999;
        margin-top: 28px;
        text-align: center;
        float: left;
        img{
          width: 191px;
          vertical-align: middle;
          margin-top: 49px;
        }
      }
      .museum_content{
        width: 70%;
        float: left;
        padding-left: 58px;
        padding-top: 50px;
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
          margin-top: 27px;
          float: right;
          margin-right: 37px;
          text-align: center;
          line-height: 38px;
          border-radius: 5px;
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
