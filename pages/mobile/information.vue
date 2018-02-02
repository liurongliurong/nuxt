<template>
  <section class="information">
    <div class="list">
      <div class="infor-detail" v-for="n,k in lists" @click="detailcli(n.id)" v-show="status">
        <template v-if="n.image">
          <img :src="n.image"/>
        </template>
        <template v-else>
          <img :src="img1"/>
        </template>
        <div class="right">
          <h4>{{n.resume?n.resume:'暂无简介'}}</h4>
          <p>{{n.dateline}}</p>
        </div>
      </div>
      <div class="detail" v-show="!status">
        <h3>{{content.title}}</h3>
        <h6>{{content.dateline}}</h6>
        <p v-html="content.content"></p>
        <button @click="back()">返回</button>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '../../util'
  export default {
    data () {
      return {
        lists: [],
        img1: require('@/assets/images/zx.jpg'),
        content: '',
        status: true
      }
    },
    methods: {
      judge () {
        util.post('suanliMessage', {token: 0}).then((res) => {
          this.lists = res.msg
        })
      },
      back () {
        window.location.reload()
      },
      detailcli (id) {
        var newsid = id
        this.status = false
        util.post('content', {token: 0, news_id: newsid}).then((res) => {
          this.content = res.msg
        })
      }
    },
    mounted () {
      this.judge()
    }
  }
</script>
<style scoped lang="scss">
 .button{
    width: 60px;
    height: 30px;
    text-align: center;
    float: right;
    background: #f5f8ff;
    color: #327fff;
    border: 0;
    border-radius: 3px;
    margin-bottom: 20px;
    }
  .information{
    width: 100%;
    background: #f5f5f9;
    .list{
      width: 100%;
      overflow: hidden;
      background:white;
      padding:0 .5rem;
    }
    .infor-detail{
      width: 100%;
      display: flex;
      overflow: hidden;
      border-bottom:1px solid #ddd;
      box-sizing: border-box;
      justify-content: space-between;
      padding:0.5rem 0;
      img{
        width: 30% !important;
        height: 3rem;
      }
      .right{
        margin-left:0.8rem;
        width: 63%;
        h4{
          font-size: 0.55rem;
          color: #121212;
          height: 1.67rem;
          width: 100%;
          overflow: hidden;
          text-align: left;
        }
        p{
          padding-top: 0.5rem;
          color: #999999;
          text-align: left;
        }
      }
    }
  }
  .detail{
    margin-bottom: 60px;
    button{
      width: 3rem;
      height: 1.5rem;
      background: rgb(38, 162, 255);
      float: right;
      color:white;
      border:0;
    }
  }
  .detail h3{
    color:#121212;
    font-size: 0.6rem;
    text-align: center;
    padding-top: 0.5rem;
  }
  .detail h6{
    color:#999;
    font-size: 0.5rem;
    text-align: center;
    padding-top: 0.5rem;
  }
</style>
