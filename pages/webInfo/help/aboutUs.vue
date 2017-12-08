<template>
  <section class="about_us">
    <div class="summarize">
        <h3>关于我们</h3>
        <p>算力网（www.suanLi.com）是由浙江数秦科技有限公司开发的云算力租赁及云矿机托管一站式电商服务平台，公司成立于2017年，由浙江数秦科技有限公司及多家上市公司、独立基金共同打造，并由浙江数秦科技有限公司独立运营，目前算力网以矿机托管，云矿机出售，云算力租赁为主营业务。</p>
        <p>算力网支持各大主流比特币矿机，例如A7，S9，E9等，连接全球最大比特币矿机生产商、矿池等资源，让用户通过网络即可实现远程挖矿，体验科技的同时享受算力产生的比特币。</p>
    </div>
    <div class="site">
      <h3>公司地址</h3>
      <baidu-map class="mapImg" :center="center" :zoom="zoom" :scroll-wheel-zoom="false">
        <bm-marker :position="center"  :markerStyle="{width:'20px'}" :dragging="false">
           <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
           <bm-label content="<h4>杭州总部</h4><h5>地址 ： 浙江省杭州市学院路77号黄龙国际中心G座-907</h5> <h6>咨询电话 ： 0571-28221076</h6><h1><span></span></h1>" :labelStyle="{border:'0px', color: '#666666',whiteSpace:'normal', fontSize : '12px',padding: '0px',boxSizing:'border-box',width:'250px',wordBreak:'break-all !important',lineHeight:'24px'}" :offset="{width: -498, height: -130}"/>
        </bm-marker>
      </baidu-map>
    </div>
    <div class="site">
      <h3>客服电话</h3>
      <p>如果您在使用suanLi.com平台的过程中有任何疑问请您与客服人员联系。</p>
      <div class="site_con">
        <p>
          客服电话：
          <span>0571-28221076</span>
        </p>
        <p>
          工作时间：9:00 — 18:00
        </p>
      </div>
    </div>
    <div class="site" v-for="data in datas">
      <h3>{{data.title}}</h3>
      <p v-html="data.text"></p>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import BaiduMap from 'vue-baidu-map'
  Vue.use(BaiduMap, {
    ak: 'GKTGV62UVGc1FZb4wUBdWG8w'
  })
  export default {
    name: 'aboutUs',
    data () {
      return {
        datas: [{title: '媒体采访', text: '如果有媒体采访需求，请将您的媒体名称、采访提纲、联系方式电话告知我们的工作人员 ： <span>0571-28221076</span> ，我们会尽快与您联系。'}, {title: '商务合作', text: '如果贵公司希望与我们建立商务合作关系，形成优势互补，请将合作意向进行简要描述并发送邮件至：<span> BD@suanLi.com</span> ，我们会尽快与您联系。'}],
        distribute: [{name: '杭州总部', address: '浙江省杭州市学院路77号黄龙国际中心G座-907', telNumber: '0571-28221076'}, {name: '北京分部', address: '北京市学院路77号黄龙国际中心G座', telNumber: '011-28221076'}],
        center: {lng: 120.13255, lat: 30.281902},
        zoom: 16
      }
    },
    head: {
      title: '关于我们'
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .about_us{
    background: #fff;
    .summarize{
      height: 300px;
      margin-bottom: 30px;
      // background: url(~assets/images/aboutBg.png);
      color: #ffffff;
      padding: 40px 65px;
      h3{
        font-size: 24px;
      }
      p{
        font-weight: normal;
        margin-top: 40px;
        font-size: 14px;
      }
    }
    .site{
      padding: 40px;
      h3{
        font-size: 24px;
        font-weight: 400;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 20px;
      }
      p{
        margin: 0 110px 20px 0;
        span{
          color:#1687ee;
        }
      }
      .site_con{
        @include flex(flex-start,stretch);
        p{
          span{
            color: #1687ee;
          }
        }
      }
      .mapImg{
        width:100%;
        height:470px;
        // background: url(../../assets/images/address.png);
        .anchorBL{
          display: none;
        }
        h4{
          width:100%;
          height:40px;
          background: #3d81f2;
          color:white;
          font-size:18px;
          line-height:40px;
          box-sizing: border-box;
          padding-left:27px;
          position: relative;
        }
        h5{
           padding:30px 27px;
           box-sizing:border-box;
           font-size: 14px;
        }
        h6{
          padding-left:27px;
          font-size: 14px;
          padding-top:0;
          box-sizing:border-box;
          line-height:0;
          padding-bottom: 50px;
        }
        h4:after{
          content:'>';
          font-size:18px;
          color:white;
          font-family: "宋体";
          font-weight:800;
          width:18px;
          height:18px;
          position: absolute;
          transform:rotate(90deg);
          margin-left:118px;
          margin-top:15px;
        }
        h1{
          width:25px;
          height:25px;
          border-radius:100%;
          border:1px solid #218cff;
          text-align:center;
          margin-left: 496px;
          margin-top:-50px;
          line-height:40px;
          span{
            width:10px;
            height:10px;
            margin:0 auto;
            margin-top:6px;
            display:block;
            border-radius:100%;
            background:#218cff;
          }
        }
      }
    }
  }
</style>
