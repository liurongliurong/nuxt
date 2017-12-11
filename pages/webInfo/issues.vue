<template>
  <section class="issues">
    <div class="issues_box">
      <div class="issues_lists">
        <div class="item" v-for="n,k in nav" @click="fetchData(n.help_class_id,k)">{{n.name}}</div>
      </div>
      <div class="issues_list">
        <router-link class="item" v-for="l,k in list" :to="'/webInfo/issuesDetail/'+l.id" :key="list.id">{{l.title}}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import { mapState } from 'vuex'
  export default {
    name: 'Issues',
    data () {
      return {
        nav: [],
        list: []
      }
    },
    methods: {
      fetchData (id, k) {
        var eles = document.querySelector('.issues_lists').children
        for (var key = 0; key < eles.length; key++) {
          eles[key].className = 'item'
        }
        this.list = []
        var self = this
        util.post('getHelp', {sign: api.serialize({token: this.token, help_class_id: id})}).then(function (res) {
          self.list = res
        })
        setTimeout(() => {
          this.$store.commit('SET_NUM', k)
          eles[k].className = 'item active'
        }, 0)
      }
    },
    mounted () {
      console.log(this.num)
      var self = this
      util.post('getHelpClass', {sign: api.serialize({token: this.token})}).then(function (res) {
        self.nav = res
        self.fetchData(res[self.num || 0].help_class_id, self.num || 0)
      })
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        num: state => state.num
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .issues{
    .issues_box{
      background: #fff;
      min-height:calc(100vh - 536px);
      @include flex(space-between,stretch)
      padding:40px;
      .issues_lists{
        width:20%;
        border-right:1px solid $border;
        padding:15px;
        .item{
          cursor: pointer;
          width:100px;
          background: $border;
          text-align: center;
          color:$text;
          line-height: 2.4;
          & + .item{
            margin-top:15px
          }
          &:hover{
              background:#f5f8ff;
              color:#327fff;
          }
          &.active{
             background:#f5f8ff;
              color:#327fff;
          }
        }
      }
      .issues_list{
        width:79%;
        padding:15px 30px;
        line-height: 2;
        .item{
          cursor: pointer;
          width: 100%;
          display:block;
          &:hover{
            color:#327fff;
          }
        }
      }
    }
  }
</style>
