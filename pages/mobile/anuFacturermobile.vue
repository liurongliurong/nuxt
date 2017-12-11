<template>
  <div class="mobile_facture">
    <div class="mobile_facturemobile">
      <router-link :to="n.path" v-for="n, k in navcompute" :key="k" :class="{'active': k === 0}">
        <em>{{n.title}}</em>
        <span>|</span>
      </router-link>
    </div>
    <div class="mobile_listscompute">
    </div>
  </div>
</template>

<script>
// import util from '@/util/index'
// import api from '@/util/function'
export default {
  data () {
    return {
      navcompute: [{title: '快讯', path: '/industryInformation'}, {title: '资讯', path: ''}, {title: '测评', path: '/industryInformation'}, {title: '币种', path: '/industryInformation'}, {title: '厂商', path: '/manufacturer/list'}]
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile_facture{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    .mobile_facturemobile{
      width: 100%;
      height: 2rem;
      background: white;
      display: flex;
      justify-content: space-between;
      border:1px solid #bfbfbf;
      box-sizing: border-box;
      border-left:0;
      border-right:0;
      margin-bottom: .5rem;
      :last-child span{
        display:none;
      }
      a{
        width: 20%;
        height: 2rem;
        display:inline-block;
        line-height: 2rem;
        text-align: center;
        span{
            float: right;
            font-size: 0.6rem;
            color:#1b1b1b;
        }
        em{
            font-style:normal;
            font-size: 0.6rem;
            color:#1b1b1b;
        }
        &:hover{
            em{
                display:inline-block;
                border-bottom:2px solid #fe5039;
                box-sizing: border-box;
                width: 1.9rem;
                height: 1.95rem;
                color:#fe5039;
            }
        }
        &.active{
            em{
                display:inline-block;
                border-bottom:2px solid #fe5039;
                box-sizing: border-box;
                width: 1.9rem;
                height: 1.95rem;
                color:#fe5039;
            }
        }
      }
    }
    .mobile_listscompute{
      width: 100%;
      overflow: hidden;
      background: white;
    }
  }
</style>
