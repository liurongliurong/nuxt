<template>
  <pageFrame isComponent="true">
    <div class="right_content museum_right">
      <h1>矿机博物馆<span class="icon iconfont icon-jiantou"></span></h1>
      <div class="museum_lists" v-for="n, k in museum" :key="k">
        <img :src="n.image"/>
        <div class="museum_content">
          <h6>{{n.title}}</h6>
          <p>{{n.resume}}</p>
          <div @click="goDetail(n.id)" class="button">查看详情</div>
        </div>
      </div>
      <Pager :len="len" :now="now" @setPage="setPage"></Pager>
    </div>
  </pageFrame>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import Pager from '@/components/common/Pager'
  import pageFrame from '@/components/common/PageFrame'
  export default {
    components: {
      Pager, pageFrame
    },
    data () {
      return {
        active: '',
        len: 0,
        now: 1,
        museum: [],
        allid: [],
        computationallist: [{title: '算力资讯', path: '/industryInformation'}, {title: '设备之家', path: '/equipments/list'}, {title: '交易信息', path: '/transaction'}, {title: '挖矿币种', path: '/currency'}],
        leftnav: [{big: 'icon-zixun', title: '资讯', path: '/computeNews/list'}, {big: 'icon-zixun1', title: '快报', path: '/quickNews'}, {big: 'icon-zhizaohangye', title: '厂商', path: '/manufacturer/list'}, {big: 'icon-kuangji', title: '测评', path: '/equipmentEvaluate/list'}, {big: 'icon-bowuguan', title: '博物馆', path: '/equipments/list'}, {big: 'icon-bitebi', title: '历史曲线', path: '/computeChart'}],
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
            self.allid = res.id_list
            localStorage.setItem('all_id', JSON.stringify(self.allid))
            self.showImg = !res.total
            if (self.now > 1) return false
            self.len = Math.ceil(res.total / 5)
          })
        }).catch(res => {
          console.log(res)
        })
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/equipments/detail/'})
      },
      setPage (n) {
        this.now = n
        if (!this.isMobile) {
          this.getList()
        }
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>

<style lang="scss">
  .museum_right{
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
        height: 100px;
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
        .button{
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
          cursor: pointer;
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