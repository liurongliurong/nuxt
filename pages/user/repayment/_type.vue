<template>
  <section class="order">
    <div class="order_title">
      <div class="text">
        <span class="text_title">还款管理</span>
      </div>
      <nav>
        <router-link :to="'/user/repayment/'+(+k+1)" v-for="n,k in nav[0]" :key="k">{{n}}</router-link>
      </nav>
    </div>
    <div class="order_box">
      <table>
        <tr>
          <th>算力服务器</th>
          <template v-if="$route.params.type==='1'">
            <th>分期金额</th>
            <th>手续费率</th>
            <th>分期期限</th>
            <th>已还期数</th>
            <th>分期时间</th>
          </template>
          <template v-else>
            <th>分期时间</th>
          </template>
          <th>操作</th>
        </tr>
        <tr v-for="d,k in data">
          <td>{{d.product}}<i :class="'icon_currency '+d.hash_type_name"></i></td>
          <template v-if="$route.params.type==='1'">
            <td>{{d.fen}}</td>
            <td>{{d.shou}}</td>
            <td>{{d.xian}}</td>
            <td>{{d.yi}}</td>
            <td>{{d.time}}</td>
          </template>
          <template v-else>
            <td>{{d.time}}</td>
          </template>
          <td>
            <router-link :to="'/user/repaymentDetail/'+d.id" class="blue">查看详情</router-link>
          </td>
        </tr>
      </table>
      <div class="nodata" v-if="showImg">
        <img :src="img" alt="">
        <p>暂无列表信息</p>
      </div>
      <Pager :len="len"></Pager>
    </div>
  </section>
</template>

<script>
  // import util from '@/util'
  // import api from '@/util/function'
  // import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  // import md5 from 'js-md5'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        nav: [{'0': '进行中', '1': '已结束'}],
        data: [{product: '阿瓦隆001', fen: '10000元', shou: '15%', xian: '12个月', yi: '1/12期', time: '2017-09-21', id: '0', hash_type_name: 'BTC'}],
        img: require('@/assets/images/no_data.jpg'),
        showImg: false,
        status: 1,
        len: 0
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .order{
    .order_title{
      @include gap(25,h)
      padding-top:15px;
      border-bottom: 1px solid $border;
      .text{
        @include select_list
        margin-bottom:30px;
      }
      nav{
        a{
          @include gap(10,h)
          display: inline-block;
          padding-bottom:10px;
          border-bottom: 3px solid transparent;
          color:#6b7d90;
          & + a{
            margin-left:30px
          }
          &:hover,&.router-link-active{
            border-color:#7e92a8
          }
        }
      }
    }
    .order_box{
      padding:20px 25px;
      table{
        width: 100%;
        text-align: center;
        tr{
          // line-height: 55px;
          border-bottom:1px solid $border;
          &:first-child{
            background: #f7f8fa;
            color: $light_text;
            border-top:1px solid $border;
            border-bottom:0;
            th{
              font-size: 12px;
              font-weight: normal;
              line-height: 50px;
            }
          }
          td{
            line-height:54px;
            i.icon_currency{
              vertical-align: sub;
              margin-left:5px
            }
            .router-link-active{
              background: #327fff;
              color:white;
            }
            &:last-child{
              width:186px;
              button,a{
                line-height: 34px;
                @include gap(15,h)
              }
              button{
                @include button($blue)
                margin-right:5px;
                &.sold{
                  margin-bottom:8px
                }
                &:disabled{
                  background: #759fe4;
                  border-color:#759fe4;
                  cursor: no-drop;
                }
              }
              a{
                display: inline-block;
                @include button($blue,border)
                border-radius: 5px;
                .btn:not(:disabled){
                  @include button($orange)
                  cursor: pointer;
                }
              }
            }
          }
          &:hover{
            background: #f7f8fa;
          }
          &:hover .blue{
            background: #327fff;
            color:white;
          }
        }
      }
      @include nodata
    }
  }
</style>
