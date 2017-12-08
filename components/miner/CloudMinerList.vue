<template>
  <section class="product_list">
    <div class="box">
      <slot></slot>
      <div class="data">
        <div class="item" v-for="d,k in $parent.cloudMinerDate" @click="goPay(d.id, d.sell_type, page==='compute'?d.product_name:d.name)" :disabled="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">
          <h3>{{page==='compute'?d.product_name:d.name}}<span :class="'icon_currency '+d.hashtype&&d.hashtype.name" v-if="d.hashtype"></span><span :class="['sell_type', {active: d.sell_type===2}]" v-if="$parent.active!==0&&page==='minerShop'&&d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]}}</span></h3>
          <div class="info_box">
            <template v-for="n,i in dataNav">
              <div class="info" v-if="i==='leftNum'">
                <div class="text">
                  <span class="num">{{d.amount-d.buyed_amount}}</span>
                  <span>{{n.unit}}</span>
                </div>
                <p>{{n.title}}</p>
              </div>
              <div class="info" v-else>
                <div class="text">
                  <span class="num">{{d[i]}}</span>
                  <span>{{n.unit}}</span>
                </div>
                <p>{{n.title}}</p>
              </div>
              <div class="line"></div>
            </template>
            <template v-if="page==='compute'">
              <button class="btn" v-if="d.status===1">立即购买</button>
              <button class="btn" disabled v-else-if="d.status===2">已转让</button>
              <button class="btn" disabled v-else-if="d.status===3">产品撤销</button>
            </template>
            <template v-else>
              <button class="btn" v-if="d.amount-d.buyed_amount>0">立即购买</button>
              <button class="btn" disabled v-else>已售罄</button>
            </template>
          </div>
          <div class="mobile_info_box">
            <div class="mobile_info">
              <h4>每台服务器价格<span><b>{{d.one_amount_value}}</b>元</span></h4>
              <div class="mobile_text">
                <div class="mobile_text_item">每台服务器价格<b>{{d.hash}}T</b></div>
                <div class="mobile_text_item">剩余可售<b>{{d.amount-d.buyed_amount}}台</b></div>
              </div>
            </div>
            <div class="circle sell_progress">
              <template v-if="(((d.amount-d.buyed_amount)/d.amount*100).toFixed(1))<=180">
                  <div class="pie_left"><div class="left"></div></div> 
                 <div class="pie_right"><div class="right"  :style="{transform:'rotate(-'+(((d.amount-d.buyed_amount)/d.amount*100).toFixed(1) * 3.6)+'deg)'}"></div></div> 
              </template>
              <template v-else>
                  <div class="pie_left"><div class="left" :style="{transform:'rotate(-'+((((d.amount-d.buyed_amount)/d.amount*100).toFixed(1) - 180) * 3.6)+'deg)'}"></div></div>   
                  <div class="pie_right"><div class="right" :style="{transform:'rotate('+180+'deg)'}"></div></div>  
              </template>
              <div class="mask"><span>{{((d.amount-d.buyed_amount)/d.amount*100).toFixed(1)}}</span>%</div>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="$parent.show">
          <div class="nodata_img"></div>
          <p>即将上线，敬请期待</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      page: {
        type: String
      }
    },
    data () {
      return {
        dataNav: {'one_amount_value': {title: '每台服务器价格', unit: '元'}, 'hash': {title: '每台服务器算力', unit: 'T'}, 'buyed_amount': {title: '出售服务器总数', unit: '台'}, 'leftNum': {title: '剩余可售服务器', unit: '台'}},
        str: {4: '预热', 5: '预售'}
      }
    },
    methods: {
      goPay (id, selltype, name) {
        if (selltype === 2) {
          this.$router.push({path: '/' + this.page + '/detail/' + id + '/0'})
        } else if (this.$parent.active === 0) {
          this.$router.push({path: '/' + this.page + '/detail/' + id + '/1'})
        } else {
          this.$router.push({path: '/' + this.page + '/detail/' + id + '/2'})
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .product_list{
    padding-top:20px;
    padding-bottom:30px;
    background: #f6f7f9;
    .box{
      @include main
      h2{
        @include data_title
      }
      .data{
        .item{
          padding:30px 50px;
          background: $white;
          cursor: pointer;
          &[disabled]{
            cursor: no-drop;
          }
          h3{
            font-size: 18px;
            margin-bottom:10px;
            .icon_currency{
              margin-left:5px;
            }
            .sell_type{
              font-size: 12px;
              margin-left:8px;
              width:58px;
              height: 18px;
              text-align: center;
              border-radius:18px;
              line-height:15px;
              color:#ff721f;
              display: inline-block;
              border:1px solid #ff721f;
              &.active{
                border-color:$blue;
                color:$blue;
              }
            }
          }
          .info_box{
            @include flex(space-between)
            .info{
              .text .num{
                font-size: 24px;
              }
              &:first-child{
                .text{
                  color: $orange
                }
              }
              p{
                color: $light_black;
              }
            }
            .line{
              width:1px;
              height: 50px;
              background: $border
            }
            .btn{
              border:0;
              width:145px;
              color: $orange;
              text-align: center;
              line-height: 48px;
              border-radius:5px;
              background: transparent;
              &:disabled{
                cursor: no-drop;
                color:$light_black
              }
            }
          }
          .mobile_info_box{
            display: none;
          }
          &:not(:last-child){
            margin-bottom:10px;
          }
          &:hover{
            background: #ecf3ff;
            .btn:not(:disabled){
              @include button($orange)
              cursor: pointer;
            }
          }
        }
      }
      .nodata{
        background: #fff;
        min-height:500px;
        padding-top:100px;
        text-align: center;
        .nodata_img{
          display: inline-block;
          width: 305px;
          height: 234px;
          background: url('../../assets/images/css_sprites.png') -10px -10px;
        }
        p{
          color:$light_black;
          margin-top:15px
        }
      }
    }
    @media screen and (max-width: $mobile) {
      margin-top:0;
      padding:15px 0;
      .box .data .item{
        @include mobile_data
      }
    }
  }
  .product_list .box .data .item .mobile_info_box .sell_progress{
    border:0;
  }
  .circle {
			width: 70px;
			height: 70px;
			position: absolute;
			border-radius: 50%;
			background: #e5e5e5;
      text-align:  center;
      box-sizing: border-box;
      border:0;
      border: 2px solid #e5e5e5;
      right: 0.5rem;
      box-sizing: border-box;
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
</style>
