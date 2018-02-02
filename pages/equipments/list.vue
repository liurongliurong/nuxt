<template>
  <pageFrame>
    <div class="right_content museum_right">
      <h1>算力服务器博物馆<span class="icon iconfont icon-jiantou"></span></h1>
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
  import Pager from '@/components/common/Pager'
  import { mapState } from 'vuex'
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
        allid: []
      }
    },
    head () {
      return {
        title: '比特币算力服务器-设备博物馆-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '比特币算力服务器,算力服务器设备,算力服务器历史' },
          { hid: 'description', name: 'description', content: '算力网（www.suanli.com）历代算力服务器展示，介绍最早算力服务器公司生产出的比特币算力服务器，如蝴蝶算力服务器，蚂蚁算力服务器，阿瓦隆算力服务器，烤猫算力服务器等' }
        ]
      }
    },
    methods: {
      getList () {
        util.post('NewsMuseumList', {token: 0, page: this.now}).then((res) => {
          this.museum = res.msg.list
          this.allid = res.msg.id_list
          localStorage.setItem('all_id', JSON.stringify(this.allid))
          this.showImg = !res.msg.total
          if (this.now > 1) return false
          this.len = Math.ceil(res.msg.total / 5)
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
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
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