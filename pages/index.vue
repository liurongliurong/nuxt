<template>
  <MobileHome v-if="isMobile"></MobileHome>
  <PcHome v-else></PcHome>
</template>

<script>
  import api from '@/util/function'
  import MobileHome from './index/mobile'
  import PcHome from './index/pc'
  import { mapState } from 'vuex'
  export default {
    components: {
      MobileHome, PcHome
    },
    methods: {
      goMobile () {
        if (api.checkEquipment()) {
          this.$store.commit('SET_EQUIPMENT', true)
        } else {
          this.$store.commit('SET_EQUIPMENT', false)
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.goMobile, false)
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .home{
    &:not(.mobile_page){
      .swiper{
        .swiper_wrap{
          .swiper_one{
            position: relative;
            height: 520px;
            background: linear-gradient(to bottom, #0D1B36 10%, #264683);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0D1B36', endColorstr='#264683',GradientType=0 );
            img{
              position: absolute;
              transition: all .2s;
              transform-style: preserve-3d;
              backface-visibility: hidden;
              &:first-child{
                left:calc(50% - 590px);
              }
              &:nth-child(2){
                right:calc(50% - 590px);
              }
              @media screen and (max-width: 1178px) and (min-width: 340px){
                object-fit:contain
              }
            }
            a.btn{
              position: absolute;
              width:200px;
              height:50px;
              line-height: 50px;
              text-align: center;
              left:calc(50% - 590px);
              top:330px;
              color:#fff;
              border:1px solid #fff;
              border-radius:5px;
              font-size: 18px;
              &:hover{
                background: #fff;
                color:#1e396c
              }
            }
            img:first-child,a.btn{
              @media screen and (max-width: 1178px) and (min-width: 340px){
                left:0;
              }
            }
            img:nth-child(2){
              @media screen and (max-width: 1178px) and (min-width: 340px){
                right:0;
              }
            }
            &:nth-child(6),&:nth-child(2){
              img{
                top:0;
                left:calc(50% - 590px);
                width:1180px;
                height:100%;
                object-fit:cover;
                @media screen and (max-width: 1178px) and (min-width: 340px){
                  width:100%;
                }
              }
              a.btn{
                left:calc(50% - 590px);
                @include button($blue)
              }
            }
            &:nth-child(3) img:first-child{
              width:563px;
              top:calc(50% - 45px);
              height:90px;
            }
            &:nth-child(3) img:nth-child(2){
              top:calc(50% - 139.5px);
              width:532px;
              height:279px;
            }
            &:nth-child(4){
              img:first-child{
                width:626px;
                top:calc(50% - 44px);
                height:88px;
              }
            }
            &:nth-child(4){
              img:nth-child(2){
                top:calc(50% - 137.5px);
                width:404px;
                height:275px;
              }
            }
            &:nth-child(5),&:nth-child(1){
              img:first-child{
                width:493px;
                top:calc(50% - 44.5px);
                height:99px;
              }
            }
            &:nth-child(5),&:nth-child(1){
              img:nth-child(2){
                top:calc(50% - 143.5px);
                width:564px;
                height:287px;
              }
            }
          }
        }
      }
    }
  }
</style>
