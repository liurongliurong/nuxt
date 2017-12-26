<template>
  <section class="order">
    <div class="order_title1">
      <div class="text1">
        <span class="text_title">托管信息</span>
      </div>
    </div>
    <div class="order_box">
      <table style="margin-top:0;">
        <thead>
          <tr>
            <th v-for="n,k in th">
              {{n.title}} {{n.unit}}
            </th>
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
          this.item = []
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
        token: state => state.info.token,
        user_id: state => state.info.user_id
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .order{
    .order_title1{
      @include gap(25,h)
      padding-top:15px;
      .text1{
        @include select_list
      }
    }
    .order_box{
      padding:20px 25px;
      table{
        width: 100%;
        text-align: center;
        thead{
          tr{
            border-bottom:1px solid $border;
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
        }
        tbody{
          tr{
            border-bottom:1px solid $border;
            td{
              line-height:54px;
              i.icon_currency{
                vertical-align: sub;
                margin-left:5px
              }
              .nuxt-link-active{
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
                  display: block;
                  margin: 0 auto;
                  width: 88px;
                  height: 36px !important;
                  padding:0;
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
      }
      @include nodata
    }
  }
</style>
