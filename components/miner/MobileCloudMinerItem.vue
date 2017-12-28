<template>
  <div class="mobile_cloud_miner_item item" :disabled="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)" @click="$parent.goPay(d.id, d.sell_type)">
    <h3>
      <span>{{d.name}}</span>
      <span :class="'icon_currency '+d.hashtype&&d.hashtype.name" v-if="d.hashtype"></span>
      <span :class="['sell_type', {active: d.sell_type===2}]" v-if="d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]}}</span>
      <span class="sell_type gray" v-if="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">已售罄</span>
    </h3>
    <div class="mobile_info_box">
      <div class="mobile_info">
        <h4>每台单价1<span><b>{{d.one_amount_value}}</b>元</span></h4>
        <div class="mobile_text">
          <div class="mobile_text_item">每台算力<b>{{d.hash}}T</b></div>
          <div class="mobile_text_item">剩余可售<b>{{d.amount-d.buyed_amount}}台</b></div>
        </div>
      </div>
      <!-- <div class="circle sell_progress" v-if="d.buyed_amount === '0.00'" style="background:#e5e5e5;">
        <template v-if="(((d.buyed_amount)/d.amount*100).toFixed(0))<=180">
            <div class="pie_left" style="clip: rect(0,-360px,auto,0);"><div class="left"></div></div>
          <div class="pie_right" style="clip: rect(0,auto,auto,360px);"><div class="right"  :style="{transform:'rotate(-'+(((d.buyed_amount)/d.amount*100).toFixed(0) * 3.6)+'deg)'}"></div></div>
        </template>
        <template v-else>
            <div class="pie_left"  style="clip: rect(0,-360px,auto,0);"><div class="left" :style="{transform:'rotate(-'+((((d.buyed_amount)/d.amount*100).toFixed(0) - 180) * 3.6)+'deg)'}"></div></div>
            <div class="pie_right" style="clip: rect(0,auto,auto,360px);"><div class="right" :style="{transform:'rotate('+180+'deg)'}"></div></div>
        </template>
        <div class="mask"><span>{{((d.buyed_amount)/d.amount*100).toFixed(0)}}</span>%</div>
      </div>
      <div class="circle sell_progress" v-else>
        <template v-if="(((d.buyed_amount)/d.amount*100).toFixed(0))<=180">
            <div class="pie_left"><div class="left"></div></div>
          <div class="pie_right"><div class="right"  :style="{transform:'rotate(-'+(((d.buyed_amount)/d.amount*100).toFixed(0) * 3.6)+'deg)'}"></div></div>
        </template>
        <template v-else>
            <div class="pie_left"><div class="left" :style="{transform:'rotate(-'+((((d.buyed_amount)/d.amount*100).toFixed(0) - 180) * 3.6)+'deg)'}"></div></div>
            <div class="pie_right"><div class="right" :style="{transform:'rotate('+180+'deg)'}"></div></div>
        </template>
        <div class="mask"  v-if="d.buyed_amount === '0.00'"  style="color:#e5e5e5;"><span style="color:#e5e5e5;">{{((d.buyed_amount)/d.amount*100).toFixed(0)}}</span>%</div>
        <div class="mask" v-else><span>{{(}}</span>%</div>
      </div> -->
      <el-progress type="circle" :percentage="((d.buyed_amount)/d.amount*100).toFixed(0)" style="    height: 76px !important;
    width: 76px !important;"></el-progress>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  Vue.use(ElementUI)
  export default {
    props: {
      d: {
        type: Object
      }
    },
    data () {
      return {
        str: {4: '预热', 5: '热销'}
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mobile_cloud_miner_item{
    background: $white;
    padding:15px;
    border-top:1px solid $border;
    border-bottom:1px solid $border;
    .mobile_info_box{
      color:$light_black;
      line-height: 2;
      @include flex
      .mobile_info{
        width:75%;
        h4{
          span{
            margin-left:10px;
            color:#ffb386;
            b{
              font-weight: normal;
              font-size: 24px;
              color:$orange;
            }
          }
        }
        .mobile_text{
          @include flex(space-between)
          .mobile_text_item{
            b{
              font-weight: normal;
              color:$text;
              margin:0 4px;
            }
          }
        }
      }
      .circle {
        width: 70px;
        height: 70px;
        line-height: 70px;
        position: absolute;
        border-radius: 50%;
        background: #e5e5e5;
        text-align:  center;
        right: 0.5rem;
        color:$orange;
        overflow: hidden;
        .pie_left, .pie_right {
          width:70px;
          height:70px;
          position: absolute;
          top: 0;left: 0;
        }
        .left, .right {
          width:70px;
          height:70px;
          background:#ffb386;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
        }
        .pie_right, .right {
          clip:rect(0,auto,auto,35px);
        }
        .pie_left, .left {
          clip:rect(0,35px,auto,0);
        }
        .mask {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          background: #FFF;
          position: absolute;
          text-align: center;
          left:2px;
          top:2px;
          line-height: 70px;
          font-size: 0.7rem;
          margin: 0 auto;
          color: #ffb386;
          box-sizing: border-box;
        }
      }
    }
  }
  .el-progress-circle{
    width: 76px !important;
    height:  76px !important;
    position: relative;
    top: -1rem;
  }
  .el-progress__text{
    position: relative !important;
    top: -60px !important;
  }
  .el-progress-circle__path{
    stroke:#ffb386 !important;
  }
</style>
