<template>
  <section class="vcurrency_flow">
    <div class="vcurrency_title">
      <span class="text_title">币流水</span>
      <div class="title_content">
        <span class="title_now">{{hashType[nowEdit]&&hashType[nowEdit].name}}</span>
        <div class="title_list">
          <a href="javascript:;" @click="fetchData(k)" v-for="n,k in hashType">{{n.name}}</a>
        </div>
      </div>
    </div>
    <h3>流水详情</h3>
    <div class="detail_box">
      <div class="data">
        <template v-for="d,k in dataNav">
          <div class="item">
            <p>{{d}}</p>
            <div>
              <span class="currency">{{data[k].toFixed(8)}}</span>
              <span class="">{{hashType[nowEdit]&&hashType[nowEdit].name&&hashType[nowEdit].name.toLowerCase()}}</span>
            </div>
          </div>
          <div class="line" v-if="k!==1"></div>
        </template>
      </div>
    </div>
    <div class="detail_table">
      <table>
        <thead>
          <tr>
            <th v-for="n in nav">{{n}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in list">
            <td v-for="v,k in nav">{{l[k]}}</td>
          </tr>
        </tbody>
      </table>
      <Pager :len="len" :now="now" @setPage="setPage"></Pager>
      <div class="nodata" v-if="showImg">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
    </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        nowEdit: 0,
        dataNav: {total_income: '累积已获得收益', total_electric_fee: '累计支付电费'},
        data: {total_income: 0, total_electric_fee: 0},
        nav: {product_name: '算力服务器', payable_time: '收益时间', paid_time: '派发时间', hold_amount: '总算力', paid_amount: '获得收益', electric_fee: '支付电费', status: '状态'},
        list: [],
        len: 0,
        now: 1,
        sort: [{title: '时间', option: 'desc'}],
        showImg: false
      }
    },
    methods: {
      fetchData (sort) {
        this.nowEdit = sort || 0
        this.list = []
        var nowHash = this.hashType[this.nowEdit]
        var data = {token: this.token, product_hash_type: nowHash.id, page: this.now, sort: ''}
        fetchApiData(this, 'userCoinList', data, (res) => {
          this.list = res.value_list
          this.showImg = !res.value_list.length
          if (this.now > 1) return false
          this.len = Math.ceil(res.total_num / 15)
        })
        fetchApiData(this, 'userCoin', {token: this.token, product_hash_type: nowHash.id}, (res) => {
          this.data = res
        })
      },
      getData () {
        if (this.token !== 0 && this.hashType.length) {
          this.fetchData()
        } else {
          setTimeout(() => {
            this.getData()
          }, 5)
        }
      },
      setPage (n) {
        this.now = n
        this.fetchData()
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        hashType: state => state.hashType
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .vcurrency_flow{
    padding:0 15px;
    .vcurrency_title{
      padding:15px;
      @include select_list
      border-bottom:1px solid $border
    }
    .detail_box{
      padding: 25px;
      margin-bottom:10px;
      .data{
        width:70%;
        @include detail_data
        .item{
          width:48%;
        }
        .item:first-child{
          span.currency{
            color:$blue
          }
        }
      }
    }
    .detail_table{
      @include data_table
    }
  }
</style>
