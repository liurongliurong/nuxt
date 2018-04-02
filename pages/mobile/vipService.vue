<template>
  <section class="mobile_vip_service">
    <div class="service_item" v-for="l in list['BTC']">
      <div class="service_info">
        <div class="info_left">
          <div class="type">BTC</div>
          <div class="date">{{l.date}}</div>
        </div>
        <a class="service_btn" :href="'https://www.baoquan.com/mobile'+l.baoquan" target="_brank">查看保全</a>
      </div>
      <div class="service_data">
        <div class="item">
          <div class="item_title">数量</div>
          <div>{{l.num}}</div>
        </div>
        <div class="item">
          <div class="item_title">单价</div>
          <div>￥{{l.price}}</div>
        </div>
        <div class="item">
          <div class="item_title">总价</div>
          <div>￥{{l.total}}</div>
        </div>
      </div>
    </div>
    <div class="service_item">
      <div class="service_info">
        <div class="info_left">BTC合计</div>
      </div>
      <div class="service_data">
        <div class="item">
          <div class="item_title">数量</div>
          <div>{{list.BTCNum}}</div>
        </div>
        <div class="item">
          <div class="item_title">总价</div>
          <div>￥{{list.BTCTotal}}</div>
        </div>
      </div>
    </div>
    <div class="service_item" v-for="l in list['ETH']">
      <div class="service_info">
        <div class="info_left">
          <div class="type">ETH</div>
          <div class="date">{{l.date}}</div>
        </div>
        <a class="service_btn" :href="'https://www.baoquan.com/mobile'+l.baoquan" target="_brank">查看保全</a>
      </div>
      <div class="service_data">
        <div class="item">
          <div class="item_title">数量</div>
          <div>{{l.num}}</div>
        </div>
        <div class="item">
          <div class="item_title">单价</div>
          <div>￥{{l.price}}</div>
        </div>
        <div class="item">
          <div class="item_title">总价</div>
          <div>￥{{l.total}}</div>
        </div>
      </div>
    </div>
    <div class="service_item">
      <div class="service_info">
        <div class="info_left">ETH合计</div>
      </div>
      <div class="service_data">
        <div class="item">
          <div class="item_title">数量</div>
          <div>{{list.ETHNum}}</div>
        </div>
        <div class="item">
          <div class="item_title">总价</div>
          <div>￥{{list.ETHTotal}}</div>
        </div>
      </div>
    </div>
    <div class="service_item">
      <div class="service_info">
        <div class="info_left">总计购买</div>
        <div>￥{{list.total}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  import data from '@/service/vipData'
  export default {
    data () {
      return {
        nav: {num: '数量', price: '单价', total: '总价'},
        list: data,
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .mobile_vip_service{
    padding:15px;
    background: #F6F6F6;
    .service_item {
      background: #fff;
      padding: 10px 15px;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 #D8D8D8;
      border-left: 4px solid #197FFF;
      .service_info {
        @include flex(space-between)
        border-bottom: 1px solid $border;
        padding-bottom: 8px;
        .info_left {
          .type {
            color: $blue;
          }
          .date {
            font-size: 12px;
            color: $light_text;
          }
        }
        .service_btn {
          color: $blue;
          &:after {
            content: '';
            @include block(10)
            @include arrow(right, $blue, 1)
          }
        }
      }
      .service_data {
        @include flex(space-between)
        padding-top: 8px;
        .item .item_title {
          font-size: 12px;
          margin-bottom: 4px;
          color: $light_black;
          text-align: center;
        }
      }
      & + .service_item {
        margin-top: 10px;
      }
      &:last-child .service_info {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
</style>
