<template>
	<section class="notice">
	  <h3>{{str[$route.params.type]}}</h3>
	  <div class="display">
	    <div :class="['item',{active: true}]" @click="goDetail(list.id)" v-for="list in lists" :key="lists.id">
	      <span class="title">{{list.title}}</span>
	      <span class="time">{{list.dateline}}</span>
	    </div>
	  </div>
	  <Pager :len="len"></Pager>
	</section>
</template>

<script>
  import util from '@/util'
  import Pager from '@/components/common/Pager'
  export default {
    components: {
      Pager
    },
    data () {
      return {
        lists: [],
        str: {website: '网站动态', product: '产品公告'},
        requestUrl: {website: 'webDynamic', product: 'webAnnouncoment'},
        len: 0,
        now: 1,
        allid: []
      }
    },
    methods: {
      getList () {
        var n = this.$route.params.type
        var url = this.requestUrl[n]
        util.post(url, {token: 0, page: this.now}).then((res) => {
          this.lists = res.msg.list
          this.allid = res.msg.id_list
          localStorage.setItem('all_id', JSON.stringify(this.allid))
          if (this.now > 1) return false
           this.len = Math.ceil(res.msg.total / 10)
        })
      },
      goDetail (id) {
        localStorage.setItem('icon_id', JSON.stringify([id]))
         this.$router.push({path: '/webInfo/detail/'})
      }
    },
    mounted () {
      this.getList()
    },
    watch: {
      $route () {
        this.getList()
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .notice{
    background: #fff;
    padding: 20px 40px;
    min-height:500px;
    h3{
      font-size: 24px;
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      color: #333333;
    }
    .display{
      .item{
        @include flex(space-between);
        margin: 5px 0;
        height: 80px;
        line-height: 80px;
        background: #f6f7fb;
        padding: 0 25px;
        .title{
          font-size: 18px;
        }
        .time{
          font-size: 14px;
        }
      }
      .item:hover{
        color:#327fff;
        background: #f0f7ff ;
      }
      .page{
        display: block;
      }
    }
  }
</style>
