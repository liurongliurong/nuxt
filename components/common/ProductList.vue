<template>
  <section class="product_list">
    <div class="box">
      <Sort :page="page" :sort="sort"></Sort>
      <div class="data">
        <div class="item" v-for="d,k in $parent.computeDate" @click="goPay(d.id)" :disabled="d.status&&(d.status===2||d.status===3)||(d.amount-d.buyed_amount<=0)">
          <h3>{{page==='computeTransfer'?d.product_name:d.name}}<span :class="'icon_currency '+d.hashtype.name"></span><span class="sell_type" v-if="page==='cloudCompute'&&d.status!==7">{{(d.sell_type===2&&'转售')||str[d.status]}}</span></h3>
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
            <template v-if="page==='computeTransfer'">
              <button class="btn" v-if="d.status===1">立即购买</button>
              <button class="btn" disabled v-else-if="d.status===2">已转让</button>
              <button class="btn" disabled v-else-if="d.status===3">产品撤销</button>
            </template>
            <template v-else>
              <button class="btn" v-if="d.amount-d.buyed_amount>0">立即购买</button>
              <button class="btn" disabled v-else>已售罄</button>
            </template>
          </div>
        </div>
        <div class="nodata" v-if="$parent.show">
          <img :src="img" alt="">
          <p>即将上线，敬请期待</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Sort from '@/components/common/Sort'
  export default {
    components: {
      Sort
    },
    props: {
      sort: {
        type: Array
      },
      dataNav: {
        type: Object
      },
      page: {
        type: String
      }
    },
    data () {
      return {
        img: require('@/assets/images/nodata.jpg'),
        str: {4: '预热', 5: '可售'}
      }
    },
    methods: {
      goPay (id, status) {
        this.$router.push({path: '/' + this.page + '/detail/' + id})
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .product_list{
    margin-top:-20px;
    background: #f7f8fa;
    padding-top:50px;
    padding-bottom:30px;
    .box{
      @include main
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
                @include button($orange)
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
        img{
          width:305px
        }
        p{
          color:$light_black;
          margin-top:15px
        }
      }
    }
  }
</style>
