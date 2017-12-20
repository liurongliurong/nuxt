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
    name: 'datalist',
    components: {
      PcDatalist, MDatalist
    },
    data () {
      return {
        nav: {'name': {title: '矿机名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'left_num': {title: '剩余数量', unit: '台'}},
        list: []
      }
    },
    methods: {
      goPay (id) {
        localStorage.setItem('params', JSON.stringify([ id, '1']))
        this.$router.push({path: '/minerShop/detail/'})
      }
    },
    mounted () {
      var self = this
      util.post('showTopMiner', {sign: api.serialize({token: this.token})}).then(function (res) {
        api.checkAjax(self, res, () => {
          self.list = res
          if (self.isMobile) {
            document.getElementsByClassName('mobile_list_box')[0].style.width = (res.length * 6) + (res.length) + 'rem'
          }
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
