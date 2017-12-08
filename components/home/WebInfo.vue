<template>
  <div class="web_info_box">
    <div class="main">
      <div class="box">
        <h3>
          <span class="icon"></span>
          <span class="text">网站动态</span>
          <router-link to="/webInfo/list/website">查看更多 ></router-link>
        </h3>
        <div class="list">
          <router-link :to="'/webInfo/detail/'+a.id" class="item" v-for="a,k in activity" :key="k">
            <span class="icon"></span>
            <span class="line"></span>
            <span class="text" style="width:72%;">{{a.title}}</span>
            <span class="date">{{a.dateline}}</span>
          </router-link>
        </div>
      </div><div class="box">
        <h3>
          <span class="icon"></span>
          <span class="text">产品公告</span>
          <router-link to="/webInfo/list/product">查看更多 ></router-link>
        </h3>
        <div class="list">
          <router-link :to="'/webInfo/detail/'+a.id" class="item" v-for="a,k in notice" :key="k">
            <span class="icon"></span>
            <span class="line"></span>
            <span class="text" style="width:72%;">{{a.title}}</span>
            <span class="date">{{a.dateline}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../util'
  export default {
    name: 'chart',
    data () {
      return {
        activity: [],
        notice: []
      }
    },
    mounted () {
      var self = this
      util.post('/homeDynamic', {sign: 'token=0'}).then(function (data) {
        console.log(data)
        self.activity = data
      }).catch(res => {
        console.log(res)
      })
      util.post('/homeAnnouncoment', {sign: 'token=0'}).then(function (data) {
        self.notice = data
      }).catch(res => {
        console.log(res)
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .web_info_box{
    border-top:1px solid $border;
    border-bottom:1px solid $border;
    margin-bottom:60px;
    .main{
      @include flex(space-between,stretch)
      @include main
      .box{
        width:50%;
        padding-bottom:5px;
        &:first-child{
          padding-right:60px;
          border-right: 1px solid $border;
        }
        &:last-child{
          padding-left:60px;
        }
        h3{
          @include flex(space-between,center)
          padding-top:25px;
          margin-bottom:20px;
          .icon{
            width:3px;
            height:20px;
            background: $blue;
          }
          .text{
            flex:1;
            font-size: 24px;
            padding-left:20px;
          }
          a{
            color:#999;
            font-size: 14px;
            &:hover{
              color:$blue
            }
          }
        }
        .list{
          .item{
            position: relative;
            color:$light_text;
            padding-bottom:25px;
            @include flex(space-between)
            .icon{
              @include block(10,50%)
              border:1px solid #e8e8e8;
              background:#f2f2f2
            }
            .line{
              @include position(15,5,-6,auto)
              width:1px;
              background:#eaeaea;
              z-index: -1;
            }
            .text{
              width:75%;
              padding-left:14px;
            }
            .date{
              color:#999
            }
            &:hover{
              .icon{
                border-color:$orange;
                background:$white
              }
              .text{
                color:$orange
              }
              .date{
                color:$orange
              }
            }
          }
        }
      }
    }
  }
</style>