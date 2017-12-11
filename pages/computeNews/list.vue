<template>
  <pageFrame isComponent="true">
    <WebInfoList class="currency_right"></WebInfoList>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import pageFrame from '@/components/computeNews/pageFrame'
  import WebInfoList from '@/components/info/list'
  export default {
    components: {
      pageFrame, WebInfoList
    },
    data () {
      return {
        len: 0,
        now: 1,
        showImg: false,
        list: []
      }
    },
    head () {
      return {
        title: '算力新闻_比特币资讯－算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力新闻,比特币资讯,比特币新闻' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com)产业新闻栏目，为你提供各种算力产业资讯，比特币新闻，行业动态，关注算力网，开启你的挖矿之旅' }
        ]
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
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style lang="scss">
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
