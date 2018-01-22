<template>
  <div class="serverall">
    <div class="server_lists">
      <h3>我们为您提供丰富可靠的算力服务</h3>
      <p>整合全球算力产业链资源， 基于算力平台对外进行输出各类算力服务</p>
      <div class="server">
        <div class="server_list" v-for="n, k in serverlist" :key="k">
          <i></i>
          <h2>{{n.title}}</h2>
          <span></span>
          <p class="titleserver">{{n.name}}</p>
          <p class="contentserver">{{n.content}}</p>
          <nuxt-link :to="n.path">查看更多</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chart',
    data () {
      return {
        serverlist: [{
          title: '算力服务器商城',
          name: 'Miner mall',
          path: '/minerShop/list',
          content: '算力作为区块链分布式网络实现价值传递与信任连接的基础资源，算力网依托自身行业优势，已整合了全球算力产业链资源。着重为客户提供全球顶级厂商的云算力服务器资源，并结合分布在全球的BDC资源推出云算力服务。'
        }, {
          title: '产业资讯',
          name: 'information',
          path: '/industryInformation',
          content: '区块链、云计算产业发展、行业推广、应用基础等重要环节的宏观政策环境已经基本具备，未来5-10年间，区块链分布式共享云计算产业将会有爆发性的增长。算力网重点打造产业资讯板块，专注于提供实时的产业资讯、行业数据和行业小工具等服务。'
        }, {
          title: 'BDC托管',
          name: 'Blockchain Data Center',
          path: '/bdc',
          content: 'BDC是算力产业链中核心的基础资源，算力网通过自身的优势，整合筛选出全球范围内优质合规的BDC机房，为各大算力服务器提供服务器托管的优质服务。算力网秉承合规、透明的经营理念，我们痛斥信息不对称，用电不合规，电场乱涨价等行业弊病。'
        }]
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .serverall{
    width: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    .server_lists{
      width:1200px;
      overflow: hidden;
      margin:0 auto;
      padding:0 10px;
      box-sizing: border-box;
      h3{
        font-size: 28px;
        width: 100%;
        color: #002059;
        text-align: center;
        margin-bottom: 5px;
      }
      p{
        font-size: 19px;
        color: #002059;
        margin-bottom: 48px;
        text-align: center;
      }
      .server{
        .server_list{
          width: 380px;
          height: 516px;
          border-radius: 5px;
          box-shadow: 0 0 10px #d2d4db;
          overflow: hidden;
          float: left;
          position: relative;
          i{
            width: 100%;
            height: 6px;
            display:block;
          }
          h2{
            text-align: center;
            color: #002059;
            font-size: 22px;
            margin-top: 60px;
          }
          span{
            display: block;
            width: 40px;
            height: 2px;
            background: #f8d200;
            margin: 0 auto;
            margin-top: 7px;
          }
          .titleserver{
            color: #002059;
            font-size: 16px;
            margin-top: 12px;
            text-align: center;
            margin-bottom: 58px;
          }
          .contentserver{
            padding:0 44px;
            font-size: 15px;
            color: #8392ac;
            box-sizing: border-box;
            line-height: 24px;
            text-align: left;
          }
          a{
            width: 100%;
            height: 70px;
            color: white;
            font-size: 18px;
            display:block;
            position: absolute;
            bottom: 0;
            text-align: center;
            line-height: 70px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            box-shadow: 0px 10px 5px #d2d4db;
          }
        }
        :nth-child(1){
          i{
            background: linear-gradient(to right, #ff5f30 20%, #ffa730);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff5f30', endColorstr='#ffa730',GradientType=1 );
          }
          a{
            background: linear-gradient(to right, #ff5f30 20%, #ffa730);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff5f30', endColorstr='#ffa730',GradientType=1 );
          }
        }
        :nth-child(2){
          margin:0 16px;
          i{
            background: linear-gradient(to right, #00a8f7 20%, #01d5d2);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a8f7', endColorstr='#01d5d2',GradientType=1 );
          }
          a{
            background: linear-gradient(to right, #00a8f7 20%, #01d5d2);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a8f7', endColorstr='#01d5d2',GradientType=1 );
          }
        }
        :nth-child(3){
          i{
            background: linear-gradient(to right, #2c86ff 20%, #0dbbff);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2c86ff', endColorstr='#0dbbff',GradientType=1 );
          }
          a{
            background: linear-gradient(to right, #2c86ff 20%, #0dbbff);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2c86ff', endColorstr='#0dbbff',GradientType=1 );
          }
        }
      }
    }
  }
</style>
