<template>
  <div class="millsList">
    <h2>
      热门矿机推荐
      <span>保全网提供全流程区块链存证、保全业务</span>
      <router-link class="get_more" to="/minerShop/miner/1">更多矿机热门 ></router-link>
    </h2>
    <div class="mill">
      <div v-for="n,k in minerData" class="listmill">
        <a href="javascript:;" @click="goPay(n.id)">
          <span class="status" v-if="n.status===1">热销中</span>
          <span class="gray" v-if="n.status===3">已下架</span>
          <span class="gray" v-if="n.status===2">已售罄 </span>
          <span class="gray" v-if="n.status===4" style="background: #32cf99;">预热</span>
          <div class="img1">
            <img :src="n.minerPicture"/>
          </div>
          <h6>{{n.name}}</h6>
          <p class="address"><span class="left">{{n.unit?n.unit: 'BitCoin'}}</span><span class="right">{{n.MinerAddress?n.MinerAddress: '未定'}}</span></p>
          <div class="progress_info press">
            <div class="progress_box">
              <div class="box" :style="{width:(n.buyed_amount/n.amount * 100)+'%'}"></div>
            </div>
          </div>
          <div class="items">
            <div class="item" v-for="item,d in items">
              <p class="price" v-if="d==='buyed_amount'">{{n.amount-n.buyed_amount}}{{item.unit}}</p>
              <p class="price" v-else>{{n[d]}}{{item.unit}}</p>
              <p class="title">{{item.title}}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
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
    data () {
      return {
        items: {'one_amount_value': {title: '矿机单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'buyed_amount': {title: '剩余数量', unit: '台'}},
        nav: {'name': {title: '矿机名称', unit: ''}, 'amount': {title: '总数量', unit: '台'}, 'one_amount_value': {title: '单价', unit: '元'}, 'hash': {title: '算力', unit: 'T'}, 'left_num': {title: '剩余数量', unit: '台'}},
        list: [],
        minerData: []
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
          self.minerData = res
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
        token: state => state.info.token
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .cloud_list{
    overflow: hidden;
    background: #F6F7FB;
    .btn{
      border:0;
      width:145px;
      color: $orange;
      text-align: center;
      line-height: 48px;
      border-radius:5px;
      background: transparent;
      &:disabled{
        cursor: no-drop;
        color:$light_black
      }
    }
    .box{
      table{
        @include table;
        @include main;
        background: #fff;
        margin:0 auto;
        th{
          font-size: 18px;
          line-height: 65px;
          border-bottom: 1px solid $border;
          font-weight: bold;
        }
        td{
          font-size: 16px;
          color:$light_text;
          line-height: 75px;
          border-bottom: 1px solid $border;
          .iconfont{
            color:$orange;
            font-size: 24px
          }
        }
        tbody{
          tr{
            cursor: pointer;
            &:hover{
              background: #ecf3ff;
            }
            td:nth-child(3),a{
              color:$orange
            }
            td:last-child{
              a{
                width:130px;
                padding:5px 25px;
                border-radius:5px
              }
            }
            &:hover a{
              background:$orange;
              color:$white
            }
          }
        }
      }
      .get_more{
        text-align: center;
        margin:37px 0;
        display: block;
        color:$light_black;
      }
    }
  }
  .millsList{
    width: 100%;
    overflow: hidden;
    margin:0 auto;
    background: #f6f7fb;
    margin-top: 0 !important;
    h2{
      width: 1180px;
      margin:0 auto;
      margin-bottom: 20px;
      color: #002059;
      text-align: left;
      span{
        font-size: 18px !important;
        color: #002059;
        margin-left: 50px !important;
      }
      a{
        float: right;
        font-size: 18px;
        color: #327fff;
      }
    }
    .mill{
      width: 1198px;
      // overflow: hidden;
      margin:0 auto;
      .listmill{
        padding:0;
        margin:0;
        width: 280px;
        height: 320px;
        background: white;
        float: left;
        text-align: center;
        margin-bottom: 24px;
        margin-left: 8px;
        margin-right: 11px;
        position: relative;
        .img1{
          width: 100%;
          height: 180px;
          position: relative;
          img{
            width: 126px;
            height: 81px;
            left: 50%;
            margin-left: -63px;
            object-fit: cover;
            top:64px;
            position: absolute;
          }
        }
        .status{
          width: 70px;
          height: 25px;
          display: block;
          text-align: center;
          line-height: 25px;
          background: #ff6458;
          color:white;
          font-size: 12px;
          position: absolute;
          left: 0;
          left:0;
        }
        .gray{
          background: #bfbfbf;
          width: 70px;
          height: 25px;
          display: block;
          text-align: center;
          line-height: 25px;
          color:white;
          font-size: 12px;
          position: absolute;
          left: 0;
          top:0;
        }
        h6{
            font-size: 16px;
            color:#121212;
            padding-left: 20px;
            padding-right: 20px;
            box-sizing: border-box;
            text-align: left;
        }
        .address{
            width: 100%;
            padding:0 20px;
            box-sizing: border-box;
            padding-top: 9px;
            overflow: hidden;
            .left{
                color: #327fff;
                float: left;
                font-size: 12px;
            }
            .right{
                float: right;
                color: #a9a9a9;
                font-size: 12px;
            }
        }
        .press{
            width: 240px;
            height: 5px;
            background: #e3e3e3;
            margin: 0 auto;
            margin-top: 20px;
            .progress_box{
              position: relative;
              // overflow:hidden;
              height:100%;
              .box{
                @include position
                background: #32cf99;
              }
            }
        }
        .items{
            width: 100%;
            padding: 0 20px;
            padding-top: 18px;
            .item{
                width: 33.3%;
                float: left;
                text-align: center;
                p{
                    margin:0;
                    padding:0;
                }
                .price{
                  height: 20px;
                  font-size: 14px;
                  color: #666666;
                  text-align: left;
                }
                .title{
                    color: #a9a9a9;
                    font-size: 12px;
                    text-align: left;
                }
            }
            :nth-child(1){
                width: 80px;
                height: 30px;      
            }
            :nth-child(2){
                padding-left:35px;
                // margin-right:5px;
            }
            :nth-child(3){
              padding-left: 30px;
            }
        }
        &:hover{
           box-shadow:#dfe0e1 0 0 30px;
           z-index: 999;
           img{
             transform: scale(1.1);
           }
        }
      }
      .nodata{
        background: #fff;
        min-height:500px;
        padding-top:100px;
        text-align: center;
        .nodata_img{
          display: inline-block;
          width: 305px;
          height: 234px;
          background: url('../../../assets/images/css_sprites.png') -10px -10px;
        }
        p{
          color:$light_black;
          margin-top:15px
        }
      }
    }
    .mobileminer{
      width: 100%;
      overflow: hidden;
      padding:0 .5rem;
      background: white;
      padding-top: .5rem;
      min-height: 100vh;
      .list_lists{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .millsList_mobile{
        display: block;
        width: 48%;
        height: 7.5rem;
        overflow: hidden;
        a{
          .null{
            width: 100%;
            height: 4.3rem;
            background: #efefef;
            border-radius: .3rem;
            text-align: center;
            img{
              width: 4rem;
              height: 2.4rem;
              margin-top: 0.9rem;
            }
          }
          h6{
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: normal;
            font-size: .6rem;
            padding-top: .2rem;
          }
          .progress_info1{
            position: relative;
            padding:6px 0;
            .progress_box1{
              position: relative;
              overflow:hidden;
              border-radius:5px;
              height:5px;
              background: $border;
              .box1{
                @include position
                @include process_color
              }
            }
          }
          p{
            font-size: 0.4rem;
            b{
              color:#fe5039;
            }
            span{
              float: right;
            }
          }
        }
      }
    }
  }
</style>