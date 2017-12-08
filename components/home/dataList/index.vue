<template>
    <div class="pc_datalist" v-if="!isMobile">
      <pc-datalist></pc-datalist>
    </div>
    <div class="mobile_datalist" v-else>
      <m-datalist></m-datalist>
    </div>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  import PcDatalist from './pc'
  import MDatalist from './mobile'
  export default {
    name: 'chart',
    components: {
      PcDatalist, MDatalist
    },
    data () {
      return {
        // nav: {'name': {title: '矿机名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'buy_step_amount': {title: '最小购买单位', unit: '台'}, 'hash': {title: '算力', unit: 'T'}, 'type_name': {title: '算力类型', unit: ''}, 'plan': {title: '项目进度', unit: ''}},
        nav: {'name': {title: '矿机名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'left_num': {title: '剩余数量', unit: '台'}},
        list: [],
        index: ''
      }
    },
    methods: {
      goPay (id) {
        this.$router.push({path: '/minerShop/detail/' + id + '/1'})
      }
    },
    mounted () {
      var self = this
      // util.post('product_top_list', {sign: api.serialize({token: this.token})}).then(function (res) {
      //   api.checkAjax(self, res, () => {
      //     self.list = res
      //   })
      // })
      util.post('showTopMiner', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.list = res
        })
      }).catch(res => {
        console.log(res)
      })
    },
    filters: {
      format: api.readable
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        true_name: state => state.info.true_name,
        bank_card: state => state.info.bank_card,
        isMobile: state => state.isMobile
      })
    }
  }
</script>
