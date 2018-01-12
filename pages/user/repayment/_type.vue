<template>
  <section class="order">
    <div class="order_title">
      <div class="text">
        <span class="text_title">还款管理</span>
      </div>
      <nav>
        <nuxt-link :to="'/user/repayment/'+ k" v-for="n,k in nav[0]" :key="k">{{n}}</nuxt-link>
      </nav>
    </div>
    <div class="order_box">
      <table style="margin-top:0;">
        <thead>
          <tr>
            <th>算力服务器</th>
            <template v-if="$route.params.status==='0'">
              <th>分期金额</th>
              <th>手续费率</th>
              <th>分期期限</th>
              <th>已还期数</th>
              <th>分期时间</th>
            </template>
            <template v-else>
              <th>分期金额</th>
              <th>手续费率</th>
              <th>分期期限</th>
              <th>已还期数</th>
              <th>分期时间</th>
            </template>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d,k in item">
            <template v-if="status===0">
              <td>{{d.product_name}}<i :class="'icon_currency '+d.product_hash_type"></i></td>
              <td>{{d.loan_money}}</td>
              <td>{{d.fee_value * 100}}%</td>
              <td>{{d.loan_deadline}}</td>
              <td>{{d.complete_number}}</td>
              <td>{{d.loan_start_time}}</td>
              <td>
                <a href="javascript:;" @click="goDetail(d.id)" class="blue">查看详情</a>
              </td>
            </template>
            <template v-if="status===1">
              <td>{{d.product_name}}<i :class="'icon_currency '+d.hash_type_name"></i></td>
              <td>{{d.loan_money}}</td>
              <td>{{d.fee_value}}%</td>
              <td>{{d.loan_deadline}}</td>
              <td>{{d.complete_number}}</td>
              <td>{{d.loan_start_time}}</td>
              <td>
                <a href="javascript:;" @click="goDetail(d.id)" class="blue">查看详情</a>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <div class="nodata" v-if="showImg">
        <div class="nodata_img"></div>
        <p>暂无列表信息</p>
      </div>
      <Pager :len="len" :now="now" @setPage="setPage"></Pager>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        nav: [{'0': '进行中', '1': '已结束'}],
        item: '',
        showImg: false,
        status: 0,
        len: 0,
        now: 1
      }
    },
    asyncData ({ params }) {
      return {status: +params.type}
    },
    methods: {
      fetchData () {
        this.status = +this.$route.params.type
        this.items()
      },
      items () {
        if (this.token !== 0) {
          var self = this
          this.item = []
          util.post('getLoanList', {sign: api.serialize({token: this.token, status: this.status, page: this.now})}).then(function (res) {
            api.checkAjax(self, res, () => {
              self.item = res
              self.showImg = !res.length
              if (self.now > 1) return false
              self.len = Math.ceil(res.length / 15)
            })
          })
        } else {
          setTimeout(() => {
            this.items()
          }, 5)
        }
      },
      goDetail (id) {
        var info = JSON.parse(localStorage.getItem('info'))
        var data = {repaymentId: id}
        localStorage.setItem('info', JSON.stringify(Object.assign(info, data)))
        this.$router.push({path: '/user/repaymentDetail/'})
      },
      setPage (n) {
        this.now = n
        this.fetchData()
      }
    },
    mounted () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    computed: {
      ...mapState({
        token: state => state.info.token
      })
    },
    filters: {
      format: api.decimal
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
          &:hover,&.nuxt-link-active{
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
