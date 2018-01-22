<template>
  <section class="deposit">
    <h2>托管项目</h2>
     <div class="deposit_list">
      <div class="detail_table">
        <div class="item" v-for="d,k in nav">
          <div class="item_title">{{d.title}}</div>
          <div class="item_value" v-if="d.name==='time'">{{content.deposit_start_time+"~"+content.deposit_end_time}}</div>
          <div class="item_value" v-else-if="d.name==='wallet_address'">{{content[d.name]|address}}</div>
          <a class="item_value" target="_blank" v-else-if="d.name==='contract_copy_picture'" :href="content[d.name]">查看合同</a>
          <div class="item_value" v-else>{{content[d.name]+d.unit}}</div>
        </div>
      </div>
    </div> 
  </section>
</template>
<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        content: {},
        nav: [{name: 'dep_name', title: '托管人姓名', unit: ''}, {name: 'dep_tel', title: '联系方式', unit: ''}, {name: 'dep_type', title: '算力服务器型号', unit: ''}, {name: 'dep_number', title: '托管数量', unit: '台'}, {name: 'computing_power', title: '算力', unit: 'T/台'}, {name: 'power', title: '功率', unit: 'w/台'}, {name: 'electric_charge', title: '电费', unit: '元/度'}, {name: 'deposit_fee', title: '托管费', unit: '元/台'}, {name: 'process_fee', title: '手续费', unit: '%'}, {name: 'mine_pool', title: '云存储类别', unit: ''}, {name: 'wallet_address', title: '钱包地址', unit: ''}, {name: 'bdc_name', title: 'BDC', unit: ''}, {name: 'storage_location', title: '库位', unit: ''}, {name: 'run_time', title: '运行时间', unit: ''}, {name: 'time',title: '托管时间', unit: ''}, {name: 'deposit_money', title: '押金', unit: '万元'}, {name: 'status', title: '状态', unit: ''}, {name: 'contract_copy_picture', title: '合同', unit: ''}],
        status: {1: '未处理', 2: '已联系', 3: '已签署', 4: '已发货', 5: '已运行', 6: '提交中', 7: '审核成功', 8: '审核失败'}
      }
    },
    methods: {
      items (params) {
        var self = this
        if (this.token !== 0) {
          util.post('getBdcMessage', {sign: api.serialize({token: this.token})}).then((res) => {
            api.checkAjax(this, res, () => {
              var obj = res.filter((v) => {
                return params === v.id
              })[0]
              this.content = obj
            })
          })
        } else {
          setTimeout(() => {
            this.items()
          }, 5)
        }
      }
    },
    mounted () {
      var p = localStorage.getItem('icon_id')
      if (p) {
        p = JSON.parse(p)
        this.items(p[0])
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    },
    filters: {
      format: api.decimal,
      address: api.telReadable
    }
  }
</script>
<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .deposit{
    padding:0 15px;
    .detail_table{
      @include detail
      .item{
        a{
          color:$blue
        }
      }
    }
    @include nodata
  }
</style>
