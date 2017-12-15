<template>
  <section class="about_us">
    <div class="summarize">
        <h3>关于我们</h3>
        <p>区块链，这项被誉为最具潜力触发第五轮开创性革命浪潮的技术的出现，一场以技术驱动的“金融互联网”为核心的全新商业模式悄然拉开了帷幕。人类已经步入以数字化为驱动的第三次文明浪潮，算力将成为未来的生产力三要素之一。</p>
        <p>算力网诞生在被称为“中国硅谷”--杭州，是由国内资深区块链产业团队联合多家上市公司及产业基金共同建立运营的区块链分布式网络基础设施产业服务平台，在国内多个区域拥有算力产业最核心基础设施---区块链分布式共享云计算产业园，并承担产业园的运营。</p>
        <p>算力作为区块链分布式网络实现价值传递与信任连接的基础资源，当前已支撑起了万亿市值的产业。算力网从产业形成初期即参与发展，并已深耕于区块链全产业链条。</p>
        <p>区块链分布式网络云计算作为云计算的下一个发展阶段，将发挥共享经济优势，加快推动数字经济发展。</p>
        <p>此外，作为全球算力产业链服务的重要一环，算力网秉承合规、透明的经营理念，提供算力托管、算力商城、算力转让三大主营业务，并整合全球算力产业链资源，基于算力平台对外进行输出各类算力服务，囊括了SHA256比特币算力、卷积神经算法算力、EQuiHash零币算力、智能合约算力等。展望未来，算力网将全面拓展国际、国内区块链云计算市场，担当行业领头羊角色。</p>
    </div>
    <div class="site">
      <h3>公司地址</h3>
      <!-- <baidu-map class="mapImg" :center="center" :zoom="zoom" :scroll-wheel-zoom="false">
        <bm-marker :position="center"  :markerStyle="{width:'20px'}" :dragging="false">
           <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
           <bm-label content="<h4>杭州总部</h4><h5>地址 ： 浙江省杭州市学院路77号黄龙国际中心G座-907</h5> <h6>咨询电话 ： 0571-28031736</h6><h1><span></span></h1>" :labelStyle="{border:'0px', color: '#666666',whiteSpace:'normal', fontSize : '12px',padding: '0px',boxSizing:'border-box',width:'250px',wordBreak:'break-all !important',lineHeight:'24px'}" :offset="{width: -498, height: -130}"/>
        </bm-marker>
      </baidu-map> -->
      <div class="baidu_map">
        <div class="map_img"></div>
        <div class="map_marker">
          <h4>杭州总部</h4>
          <h5>地址 ： 浙江省杭州市学院路77号黄龙国际中心G座-907</h5>
          <h6>咨询电话 ： 0571-28031736</h6>
        </div>
      </div>
    </div>
    <div class="site">
      <h3>客服电话</h3>
      <p>如果您在使用suanLi.com平台的过程中有任何疑问请您与客服人员联系。</p>
      <div class="site_con">
        <p>
          客服电话：
          <span>0571-28031736</span>
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
  export default {
    name: 'aboutUs',
    data () {
      return {
        datas: [{title: '媒体采访', text: '如果有媒体采访需求，请将您的媒体名称、采访提纲、联系方式电话告知我们的工作人员 ： <span>0571-28031736</span> ，我们会尽快与您联系。'}, {title: '商务合作', text: '如果贵公司希望与我们建立商务合作关系，形成优势互补，请将合作意向进行简要描述并发送邮件至：<span> BD@suanLi.com</span> ，我们会尽快与您联系。'}],
        distribute: [{name: '杭州总部', address: '浙江省杭州市学院路77号黄龙国际中心G座-907', telNumber: '0571-28031736'}, {name: '北京分部', address: '北京市学院路77号黄龙国际中心G座', telNumber: '011-28221076'}],
        center: {lng: 120.13255, lat: 30.281902},
        zoom: 16
      }
    },
    head () {
      return {
        title: '关于我们-算力网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '算力新闻,比特币资讯,比特币新闻' },
          { hid: 'description', name: 'description', content: '算力网（www.suanLi.com）是由浙江数秦科技有限公司开发的云算力租赁及云算力托管一站式服务平台，公司成立于2017年，由浙江数秦科技有限公司及多家上市公司、独立基金共同打造，并由浙江数秦科技有限公司独立运营，目前算力网以矿机托管，云算力出售，云算力租赁为主营业务。算力网支持各大主流比特币矿机，例如A7，S9，E9等，连接全球最大比特币矿机生产商、矿池等资源，让用户通过网络即可实现远程挖矿，体验科技的同时享受算力产生的比特币。' }
        ]
      }
    },
    mounted () {
      var map = new BMap.Map(document.querySelector('.map_img'))
      map.centerAndZoom(new BMap.Point(120.13255, 30.281902), 17)
      var myIcon = new BMap.Icon('/marker.png',new BMap.Size(30, 30), {
        anchor: new BMap.Size(10, 25)
      })
      map.addOverlay(new BMap.Marker(new BMap.Point(120.13255, 30.281902), {icon: myIcon}))
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .about_us{
    background: #fff;
    .summarize{
      margin-bottom: 30px;
      background: url(../../assets/images/aboutBg.jpg);
      color: #ffffff;
      padding: 40px 65px;
      h3{
        font-size: 24px;
      }
      p{
        margin-top: 15px;
        line-height:30px;
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
      .baidu_map{
        position: relative;
        .map_img{
          width:100%;
          height:470px;
          .anchorBL{
            display: none;
          }
        }
        .map_marker{
          position: absolute;
          top:60px;
          left:30px;
          width:250px;
          background: #fff;
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
            font-family: "宋体" !important;
            font-weight:800;
            width:18px;
            height:18px;
            position: absolute;
            transform:rotate(90deg);
            margin-left:118px;
            margin-top:15px;
          }
        }
      }
    }
  }
  .about_us .site .mapImg h4:after{
    font-family: "宋体" !important;
  }
</style>
