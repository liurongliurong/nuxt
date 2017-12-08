<template>
  <div class="mining">
    <div class="bigbg">
        <video src="../../assets/images/wakuang.mp4" controls="" loop="" muted=""  autoplay="autoplay" poster=""></video>
    </div>
    <div class="side">
      <h1>比特币挖矿的五个时代</h1>
      <p class="enlish">Five Generations of the Bitcoin Mining</p>
      <p class="con">CPU挖矿时代，比特币创始人中本聪用他电脑CPU挖出第一个创世区块。而现在，比特币挖矿已进入ASIC和大规模集群时代</p>
      <ul>
          <li>
              <img src="../../assets/images/wk1.png"/>
              <h4>CPU</h4>
              <p>20MHash/s</p>
          </li>
          <li>
              <img src="../../assets/images/wk2.png"/>
              <h4>CPU</h4>
              <p>400MHash/s</p>
          </li>
          <li>
              <img src="../../assets/images/wk3.png"/>
              <h4>FPGA</h4>
              <p>25GHash/s</p>
          </li>
          <li>
              <img src="../../assets/images/wk4.png"/>
              <h4>ASIC</h4>
              <p>3.5THash/s</p>
          </li>
          <li>
              <img src="../../assets/images/wk5.png"/>
              <h4>大规模集群</h4>
              <p>3.5THash/s*X</p>
          </li>
      </ul>
    </div>
    <div class="blue">
       <div class="big">
           <img src="../../assets/images/wk6.png"/>
            <div class="right">
                <h1>挖矿原理</h1>
                <p class="title p_content">算力就是产出比特币的能力，就是计算机每秒产生hash碰撞的能力。也就是说，我们手里的矿机每秒能做多少次hash碰撞，就是算力。</p>
                <p class="text p_content">在比特币的世界里，大约每10分钟会记录一个数据块。所有的挖矿计算机都在尝试打包这个数据块提交，而最终成功生成这个数据块的人，就可以得到一笔比特币报酬。最初，大约每10分钟就可以产生50个比特币的比特币报酬。但是该报酬每4年减半，现在每10分钟比特币网络就可以产生12.5个比特币。</p>
                <p class="con p_content">而要成功生成数据块，就需要矿工找到那个有效的哈希值，而要得到正确的哈希值，没有捷径可以走，只能靠猜，猜的过程就是计算机随机hash碰撞的过程，猜中了，你就得到了比特币。 </p>
            </div>
       </div>
    </div>
    <div class="blue" style="background:white;">
       <div class="big">
           <div class="right" style="margin-left:0;margin-right:99px;">
                <h1>挖矿设备和流程</h1>
                <p class="title p_content">如果，你开始尝试挖矿，你需要准备一台矿机、一台能联网的电脑、一个AUC、一个树莓派、电源及各种连接线等。各种设备的连接顺序为网线→树莓派→MicroUSB线→AUC→4PIN连接线→矿机和电源。如果需要部署多台矿机，则还需要变压器等设备。</p>
                <p class="text p_content">各种设备的功能:<br/>1. 矿机，在此以嘉楠耘智目前最新的矿机A7为例，A7内有88颗芯片，单台算力在7.3T/s以上。<br/>2. 树莓派（控制器），挖矿只需要做简单高效的数值计算，矿机运作的程序就写在小巧的树莓派里。每个树莓派约可以控制约60台矿机<br/>3. AUC，转换器，而每个AUC也可以串联多台矿机。<br/>4. 电源，通电。</p>
                <p class="con p_content">把所有这些设备连接好，接通电源，修改树莓派IP网段和路由器IP网段一致，并设置矿工，然后连接矿池就可以开始挖矿啦！ </p>
            </div>
           <img src="../../assets/images/wk7.png"/>
       </div>
    </div>
    <div class="opacity">
        <h1>矿场</h1>
        <div class="p_content">
            如今，抱一台矿机回家或者部署一个家庭小作坊挖矿的中小矿工盈利空间非常有限，挖矿行业也正逐渐向有廉价电资源、有专业化部署能力的企业和团队集中。
        </div>
        <div class="p_content">
            影响挖矿的因素有很多，比如矿机的性能和功耗、全网的算力和难度、矿场的部署和运维能力、有没有廉价电的资源、以及币价和政策的导向等等。目前优秀的矿企，他们拥有芯片研发的能力、大量的算力、专业的矿场部署和运营经验等，在未来，资源、算力会越来越向这些矿企集中。
        </div>
    </div>
    <div class="blue">
       <div class="big">
           <img src="../../assets/images/wk10.png"/>
            <div class="right">
                <h1>矿池</h1>
                <p class="title p_content">如今挖矿的必备工具是矿池，矿池的作用是集合大量矿机算力，增大你得到比特币的几率，同时将你未来能得到的比特币提前平均分配到你的账户里。</p>
                <p class="text p_content">现在比特币全网每10分钟产生一个区块，这个区块包含12.5个比特币。假设全球有1W人参与挖矿，那么在这10分钟内，只有1个幸运儿拿走了这12.5个比特币，其它人则颗粒无收。而矿池的原理是大家组队开采，并按约定的分配方式分配，使得矿工的比特币回报趋于稳定，减少矿工的风险。</p>
                <p class="con p_content">在此以最常用的PPS分配方式为例，假设你的算力是10T,而整个矿池的算力是100T，你的算力占矿池算力的1/10，假设矿池一天能产生10个比特币，那你每天就能拿到1个比特币。 </p>
            </div>
       </div>
    </div>
    <div class="blue" style="background:white;">
       <div class="big">
           <div class="right" style="margin-left:0;margin-right:99px;">
                <h1>云算力</h1>
                <p class="title p_content">在现实情况下，挖矿矿机常常供不应求，同时，矿机发货需要很长的等待期。矿机安装、调试、维护等流程非常复杂，需要耗费大量的精力，矿工们还要忍受矿机的噪音和热量。对矿工来说，最大的成本还不是这些，是挖矿所消耗的高昂的电费，中小矿工的盈利空间越来越小甚至为负。</p>
                <p class="con p_content">而云算力服务可以很好地解决中小矿工和一般用户参与挖矿门槛高赚钱难的痛点。现在比特币挖矿已经进入了大规模集群挖矿的时代了，一些商家在电费低廉的地区（如西藏四川内蒙等地）大规模建设矿场，他们拥有更低的机器价格和低廉的电费，还可以通过机房结构的设计和当地的地理及气温优势来实现良好的散热通风，降低机器消耗的能量。而云算力服务平台打通矿场和矿池等基础资源，通过算力租赁的形式在网上向用户远程出租算力，让用户通过网络即可实现远程挖矿，并将算力产生的比特币打入用户的账户中。 </p>
            </div>
           <img src="../../assets/images/wk11.png"/>
       </div>
    </div>
    <div class="blue">
       <div class="big">
           <img src="../../assets/images/wk12.png"/>
            <div class="right">
                <h1>挖矿回报</h1>
                <p class="title p_content">如果你是一枚矿工，挖矿回报可以通过以下公式来计算:<br/>挖矿回报 ＝ 产生的比特币 * 币价 － 矿机成本 － 电费 － 维护费及人工成本 － 矿场折旧费等。</p>
                <p class="text p_content">如果你只是一个小矿工，一般情况只要扣除矿机成本和电费即可。<br/>大家也可以去BTC123或者比特范等网站，通过挖矿回报计算器计算回本周期和挖矿回报。</p>
            </div>
       </div>
    </div>
    <div class="blue" style="background:white;">
       <div class="big">
           <div class="right" style="margin-left:0;margin-right:99px;">
                <h1>挖矿风险</h1>
                <p class="title p_content">1. 比特币产量减半。16年7月，比特币网络将面临比特币减半事件，即每10分钟，每个区块只包含12.5个比特币，意味着相同算力挖出的比特币也会相应减少。但另一方面，币价也有上升可能。</p>
                <p class="text p_content">2. 比特币币价和计算难度不稳定，导致所获BTC也不稳定。</p>
                <p class="con p_content">注：矿工们还需面对断电、机器维护等风险。 </p>
            </div>
           <img src="../../assets/images/wk13.png"/>
       </div>
    </div>
  </div>
</template>

<style lang="scss">
.bigbg{
    background: url(../../assets/images/wk-bn-bk.jpg);
    width: 100%;
    height:650px;
    background-size: 100% 100%;
    video{
        width: 820px;
        height: 548px;
        position: relative;
        top:102px;
        left:50%;
        margin-left:-410px;
    }
}
.web_info .box{
    display:none;
}
.mining{
    width: 100%;
}
.side{
    width: 100%;
    background: #f8f9fb;
    overflow: hidden;
    h1{
        width: 100%;
        text-align: center;
        font-size: 36px;
        line-height: 2;
        text-align: center;
    }
    .enlish{
        font-size: 14px;
        color: #bbb;
        width: 100%;
        text-align: center;
    }
    .con{
        line-height: 2;
        text-align: center;
        width: 560px;
        margin: 0 auto;
        color: #666;
        margin-top: 10px;
    }
    ul{
        width: 1180px;
        margin:0 auto;
        padding:0 70px;
        margin-top: 60px;
        li{
            width: 20%;
            text-align: center;
            float: left;
            display: block;
            padding-bottom: 5px;
            img{
                width: 90px; 
                height: 90px;
                display: block;
                margin:0 auto;
                margin-bottom: 10px;
            }
            h4{
                font-size: 16px;
                color: #121212;
                width: 100%;
                display: block;
                line-height: 40px;
            }
            p{
                color: #666;
                width: 100%;
                margin-top: 5px;
                display: block;
                line-height: 10px;
                padding-bottom: 20px;
            }
        }
    }
}
.blue{
    width: 100%;
    overflow: hidden;
    background: #F5F6F7;
    padding-bottom: 100px;
    .big{
        width: 1100px;
        padding: 0 90px;
        padding-top: 108px;
        margin:0 auto;
        overflow: hidden;
        img{
           float: left;
           width: 368px;
           height: 320px;
           margin-top: 70px;
        }
        .right{
            width: 450px;
            text-align: left;
            float: left;
            margin-left: 99px;
            h1{
                font-size: 36px;
                padding-bottom: 37px;
            }
            .p_content{
                line-height: 30px;
                margin-bottom:20px;
            }
        }
    }
}
.opacity{
    width: 100%;
    background: url(../../assets/images/wk8.png);
    height: 654px;
    background-size: 100% 100%;
    text-align: center;
    h1{
        font-size: 36px;
        color: white;
        padding-top: 209px;
    }
    .p_content{
        width: 680px;
        color: white;
        margin:0 auto;
        line-height: 30px;
        margin-top: 30px;
    }
}
@media screen and (max-width: 1200px){
      .fixed_header{
          display:none;
      }
      .mining{
         .side{
             width: 100%;
             h1{
                 font-size: 0.8rem;
                 padding-top: 0.5rem;
             }
             .con{
                 width: 100%;
                 padding:0 0.5rem;
                 text-align: left;
                 line-height: 1.2rem;
                 box-sizing: border-box;
             }
             ul{
                 width: 100%;
                 overflow: hidden;
                 background:white;
                 margin-top: 1rem;
                 padding:0;
                 padding-bottom: 0.5rem;
                 li{
                     width: 50%;
                     height: 5rem;
                     float: left;
                     padding:0.5rem;
                     box-sizing: border-box;
                     text-align: center;
                     margin-bottom: 1rem;
                     img{
                         width: 3rem;
                         height: 3rem;
                         margin:0 auto;
                         padding:0;
                         margin-bottom: 0.2rem;
                     }
                     h4{
                         line-height: 30px;
                     }
                 }
             }
         }
         .blue{
             width: 100%;
             padding:0 .5rem;
             .big{
                 margin:0;
                 padding:0;
                 width: 100%;
             }
             .big img{
                 width: 100px;
                 height: auto;
                 display:block;
                 margin:0;
                 padding:0;
                 display:none;
             }
             .big .right{
                 width: 100%;
                 overflow: hidden;
                 margin:0;
                 padding:0;
                 h1{
                     font-size: 0.8rem;
                     padding:0;
                     padding-top: 0.5rem;
                 }
                 p{
                     margin-bottom: 0.5rem;
                 }
             }
         }
         .opacity{
             width: 100%;
             height: auto;
             padding-bottom: 1rem;
             h1{
                font-size: 0.8rem;
                padding:0;
                padding-top: 1rem;
             }
             .p_content{
                 width: 100%;
                 padding:0 1rem;
                 margin-top: 0.4rem;
                 text-align: left;
                 box-sizing: border-box;
             }
         }
         .bigbg{
             width: 100%;
             height: 210px;
             background: none;
             padding:0;
             margin:0;
             video{
                 width: 100% !important;
                 height: 210px;
                 left: 0;
                 position: relative;
                 top:0 !important;
                 margin-left:0px;
             }
         }
      }
}
</style>
