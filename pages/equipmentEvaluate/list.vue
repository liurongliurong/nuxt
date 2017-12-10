<template>
  <div class="museum_right">
    <h1 style="position:relative;">矿机测评<span class="icon iconfont icon-jiantou" style="transform:rotate(90deg);position:absolute;top:3px;"></span></h1>
    <div class="museum_lists" v-for="n, k in list" :key="k">
      <router-link :to="'/equipmentEvaluate/detail/' + n.id">
        <span class="label">BitCoin</span>
        <img :src="n.image"/>
        <div class="museum_content">
          <p class="resume">{{n.title}}:{{n.resume}}</p>
          <p class="time">{{n.dateline}}</p>
        </div>
      </router-link>
    </div>
    <div class="nodata" v-if="showImg">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
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
        showImg: false,
        list: []
      }
    },
    methods: {
      getList () {
        var self = this
        util.post('NewsReviewList', {sign: api.serialize({token: 0, page: this.now})}).then(function (res) {
          api.checkAjax(self, res, () => {
            self.list = res.list
            self.showImg = !res.total
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
.nodata{
  width: 234px;
  height: 275px;
  position: absolute;
  left: 50%;
  margin-top: 100px;
  margin-left: -67px;
  p{
    text-align: center;
  }
}
  .nodata_img{
    display: inline-block;
    width: 234px;
    height: 215px;
    margin:0 auto;
    margin-top: 200px;
    background: url('~assets/images/css_sprites.png') -335px -10px;
  }
  .museum_right{
    float: left;
    width: 1110px;
    height: 1424px;
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
      width: 218px;
      height: 285px;
      background: white;
      box-shadow: 0 0 10px #c2c2c2;
      margin: 20px 38px 20px 0;
      border-radius: 8px;
      padding: 0 15px;
      display: inline-block;
      .label {
        display: inline-block;
        width: 70px;
        line-height: 26px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        background: #01beb5;
        position: relative;
        left: -15px;
        top: 13px;
      }
      img{
        width: 188px;
        height: 156px;
        float: left;
        object-fit: cover;
        margin: 0;
      }
      .museum_content{
        width: 100%;
        float: left;
        .resume {
          color: #59493f;
          line-height: 53px;
          font-size: 16px;
          cursor: pointer;
          
          &:hover {
            color: #327fff;
          }
        }
        .time {
          line-height: 22px;
          color: #666;
          height: 42px;
          font-size: 12px;
          overflow: hidden;
          padding-right: 45px;
        }
        button{
          width: 172px;
          height: 38px;
          border:1px solid #bfbfbf;
          background:white;
          color: #a9a9a9;
          margin-top: 27px;
          float: right;
          margin-right: 37px;
          &:hover{
            background:#fe5039;
            color: white;
            border:0;
          }
        }
      }

      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
</style>
