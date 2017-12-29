<template>
  <div class="mobile_cloud_miner_item item" :disabled="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)" @click="$parent.goPay(d.id, d.sell_type)">
    <h3>
      <span>{{d.name}}</span>
      <span :class="'icon_currency '+d.hashtype&&d.hashtype.name" v-if="d.hashtype"></span>
      <span :class="['sell_type', {active: d.sell_type===2}]" v-if="d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]||(d.status===10&&'活动')}}</span>
      <span class="sell_type gray" v-if="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">已售罄</span>
    </h3>
    <div class="mobile_info_box">
      <div class="mobile_info">
        <h4>每台单价{{percent}}<span><b>{{d.one_amount_value}}</b>元</span></h4>
        <div class="mobile_text">
          <div class="mobile_text_item">每台算力<b>{{d.hash}}T</b></div>
          <div class="mobile_text_item">剩余可售<b>{{d.amount-d.buyed_amount}}台</b></div>
        </div>
      </div>
      <div class="wrap">  
        <template v-if="percent > 100">
          <div class="circle">  
              <div class="percent left11" :style="{'-webkit-transform': 'rotate(' + (18 / 5) * ' + percent + ' + ' deg )'}"></div>  
              <div :class="['percent', 'right11', 'wth0']"></div>  
          </div>  
        </template>
        <template v-else-if="percent > 50">
          <div :class="['circle', 'clip-auto']" >  
              <div class="percent left11" :style="{'-webkit-transform': 'rotate('+ (18 / 5) * percent +'deg)'}"></div>  
              <div class="percent right11"></div>  
          </div>  
        </template>
        <template v-else-if="percent <= 50">
          <div class="circle"> 
              <div class="percent left11" :style="{'-webkit-transform': 'rotate('+ (18 / 5) * percent +'deg)'}"></div>  
              <div class="percent right11 wth0"></div>  
          </div>  
        </template>
        <div class="num"><span>{{percent}}</span>%</div>  
      </div>  
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      d: {
        type: Object
      }
    },
    data () {
      return {
        str: {4: '预热', 5: '热销'},
        percent: ''
      }
    },
    mounted () {
      this.percent = ((this.d.buyed_amount) / this.d.amount*100).toFixed(0)
      if (this.percent > 100) {  
        this.percent = 0
      } else {
        this.percent = this.percent
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .mobile_cloud_miner_item{
    background: $white;
    padding:15px;
    position: relative;
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
    }
  }
    .wrap,.circle,.percent{  
        position: absolute;  
        width: 76px;  
        height: 76px;  
        border-radius: 50%;  
    }  
    .wrap{  
        top:0.5rem;  
        right: 1rem;
        // left:50px;  
        background-color: #ccc;  
    }  
    .circle{  
        box-sizing: border-box;  
        border:20px solid #ccc;  
        clip:rect(0,76px,76px,38px);  
    }  
    .clip-auto{  
        clip:rect(auto, auto, auto, auto);  
    }  
    .percent{  
        box-sizing: border-box;  
        top:-20px;  
        left:-20px;  
    }  
    .left11{  
        transition:transform ease;  
        border:20px solid #ffb386;  
        clip: rect(0,38px,76px,0);  
    }  
    .right11{  
        border:20px solid #ffb386;  
        clip: rect(0,76px,76px,38px);  
    }  
    .wth0{  
        width:0;  
    }  
    .num{  
           position: absolute;
    box-sizing: border-box;
    width: 66px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    font-size: 14px;
    left: 5px;
    top: 5px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 1;
    }  
</style>
