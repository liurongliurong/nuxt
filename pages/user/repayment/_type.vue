<template>
  <section class="repayment">
  	<div class="pc_box" v-if="isMobile===0">
  		<div class="order_title">
	      <h2>还款管理</h2>
	      <nav>
	        <nuxt-link :to="'/user/repayment/'+ k" v-for="n,k in nav[0]" :key="k">{{n}}</nuxt-link>
	      </nav>
	    </div>
	    <div class="repayment_box">
	      <table>
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
  	</div>
	  <div class="mobile_box" v-if="isMobile===1">
	  	<!-- <div class="all_repayment">
	  		<div class="repayment_view">
	  			<div class="repayment_data">
	  				<div class="repayment_data_title">本月待还款</div>
	  				<div class="repayment_data_value">2000.02</div>
	  				<div class="repayment_data_money">分期总金额8000元</div>
	  			</div>
	  			<div class="repayment_btn">立即还款</div>
	  		</div>
	  		<div class="repayment_tips">本月最后还款日是6号，预期未还款，将对您的收益进行锁定</div>
	  	</div> -->
	  	<div class="repayment_list">
	  		<div class="repayment_list_nav">
	  			<nuxt-link :to="'/mobile/repayment/'+ k" v-for="n,k in nav[0]" :key="k">{{n}}</nuxt-link>
	  		</div>
	  		<div class="repayment_list_box">
	  			<div class="item" v-for="d,k in item" @click="goDetail(d.id)">
	  				<div class="item_name">{{d.product_name}}</div>
	  				<div class="item_period">第{{d.complete_number+'/'+d.loan_deadline}}期</div>
	  				<div class="item_value">{{d.loan_money}}</div>
	  			</div>
	  			<div class="nodata" v-if="showImg">
	          <div class="nodata_img"></div>
	          <p>暂无列表信息</p>
	        </div>
	  		</div>
	  	</div>
	  </div>
  </section>
</template>

<script>
  import { fetchApiData } from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        nav: [{'0': '待还款', '1': '已还款'}],
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
          this.item = []
          fetchApiData(this, 'getLoanList', {token: this.token, status: this.status, page: this.now}, (res) => {
            this.item = res.list
            this.showImg = !res.total_num
            if (this.now > 1) return false
            this.len = Math.ceil(res.total_num / 15)
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
        if (this.isMobile) {
        	this.$router.push({path: '/mobile/repaymentDetail/'})
        } else {
        	this.$router.push({path: '/user/repaymentDetail/'})
        }
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
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    },
    filters: {
      format: api.decimal
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .repayment{
  	.pc_box {
  		.order_title{
	      padding:0 25px;
	      @include user_tab
	      h2 {
	        padding:0;
	      }
	    }
	    .repayment_box{
	      padding:20px 25px;
	      @include button_table
	    }
  	}
	  .mobile_box {
	  	font-size: 0.3rem;;
	  	background: #f5f5f9;
	  	min-height: calc(100vh -0.88rem);
			.all_repayment {
				padding: 0 0.3rem;
				background: #fff;
				.repayment_view {
					@include flex(space-between)
					padding: 0.2rem 0;
					border-bottom: 1px solid $border;
					.repayment_data {
						.repayment_data_value {
							font-size: 0.6rem;
							color: $orange
						}
						.repayment_data_money {
							font-size: 0.24rem;
						}
					}
					.repayment_btn {
						@include button($orange)
						padding: 0.08rem 0.3rem;
						font-size: 0.24rem;
						border-radius: 3px;
					}
				}
				.repayment_tips {
					color: $light_black;
					font-size: 0.24rem;
					padding: 0.3rem 0;
				}
			}
			.repayment_list {
				// margin-top: 0.2rem;
				background: #fff;
				.repayment_list_nav {
					border-bottom: 1px solid $border;
					a {
						display: inline-block;
						width: 50%;
						text-align: center;
						line-height: 3;
						&.nuxt-link-active {
							color: $blue;
							border-bottom: 1px solid $blue
						}
					}
				}
				.repayment_list_box {
					padding: 0 0.3rem;
					color: $light_text;
					.item {
						@include flex
						text-align: center;
						padding: 0.3rem 0;
						.item_name,.item_period,.item_value {
							width: 33%;
						}
						.item_name {
							color: $text;
							text-align: left;
						}
						.item_value {
							text-align: right;
							&:after {
								content: '';
								@include block(5);
            		@include arrow(right, #c7c7c9);
            		border-width: 1px;
							}
						}
					}
					@include nodata
				}
			}
	  }
  }
</style>
