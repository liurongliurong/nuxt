<template>
  <section class="deposit">
    <h2>托管信息</h2>
    <div class="deposit_box">
      <table>
        <thead>
          <tr>
            <th v-for="n,k in th">{{n.title}}{{n.unit?'('+n.unit+')':''}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m, k in item" :key="k">
            <td>{{m.dep_name}}</td>
            <td>{{m.dep_type}}</td>
            <td>{{m.dep_number}}</td>
            <td>{{m.computing_power}}</td>
            <td>{{m.power}}</td>
            <td>{{m.bdc_name}}</td>
            <td>
              <a href="javascript:;" @click="goDetail(m.id)" class="blue">查看详情</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="nodata" v-if="showImg">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
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
        th: [{title: '托管人姓名', unit: ''}, {title: '矿机型号', unit: ''}, {title: '托管数量', unit: '台'}, {title: '算力', unit: 'T/台'}, {title: '功耗', unit: 'W/台'}, {title: 'BDC', unit: ''}, {title: '操作', unit: ''}],
        item: [],
        showImg: false
      }
    },
    methods: {
      items () {
        if (this.token !== 0) {
          var self = this
          util.post('getBdcMessage', {sign: api.serialize({token: this.token})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.item = res
              self.showImg = !res.length
            })
          })
        } else {
          setTimeout(() => {
            this.items()
          }, 5)
        }
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
        this.$router.push({path: '/user/deposit/detail'})
      }
    },
    mounted () {
      this.items()
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .deposit{
    padding:0 15px;
    .deposit_box{
      @include button_table
    }
  }
</style>
