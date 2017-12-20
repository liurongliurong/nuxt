<template>
  <div class="cloud_list">
    <div class="box">
      <h1 class="home_item_title">全方位为你推荐算力服务器</h1>
      <p class="home_item_desc">全球算力输出服务由保全网提供全流程区块链存证、保全服务</p>
      <table>
        <thead>
          <tr>
            <th v-for="n in $parent.nav">{{n.title}}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l,i in $parent.list" @click="$parent.goPay(l.product_id||l.id)">
            <td v-for="v,k in $parent.nav">
              <template v-if="k==='name'"><i class="iconfont">&#xe605;</i>{{l[k]}}</template>
              <template v-else-if="k==='left_num'">{{l.amount-(l.sell_amount||l.buyed_amount)+v.unit}}</template>
              <template v-else>{{l[k]+[v.unit]}}</template>
            </td>
            <td>
               <a class="btn" v-if="l.status===4">预热</a> 
               <a class="btn" v-else-if="l.amount-(l.sell_amount||l.buyed_amount)>0">立即购买</a> 
              <button class="btn" disabled v-else>已售罄</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="get_more" to="/minerShop/miner/1">查看更多矿机 ></router-link>
    </div>
  </div>
</template>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .cloud_list{
    overflow: hidden;
    background: #F6F7FB;
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
    .box{
      table{
        @include table;
        @include main;
        background: #fff;
        margin:0 auto;
        th{
          font-size: 18px;
          line-height: 65px;
          border-bottom: 1px solid $border;
          font-weight: bold;
        }
        td{
          font-size: 16px;
          color:$light_text;
          line-height: 75px;
          border-bottom: 1px solid $border;
          .iconfont{
            color:$orange;
            font-size: 24px
          }
        }
        tbody{
          tr{
            cursor: pointer;
            &:hover{
              background: #ecf3ff;
            }
            td:nth-child(3),a{
              color:$orange
            }
            td:last-child{
              a{
                width:130px;
                padding:5px 25px;
                border-radius:5px
              }
            }
            &:hover a{
              background:$orange;
              color:$white
            }
          }
        }
      }
      .get_more{
        text-align: center;
        margin:37px 0;
        display: block;
        color:$light_black;
      }
    }
  }
</style>