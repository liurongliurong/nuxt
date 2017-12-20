<template>
  <div class="mobile_data">
    <h2>一 矿机抢购 一 <router-link to="/minerShop/miner/1">更多矿机 ></router-link></h2>
    <div class="mobile_listdata">
      <div class="mobile_list_box">
        <div v-for="d,i in $parent.list" @click="$parent.goPay(d.product_id||d.id)" :key="i" class="mobile_lists">
          <div class="imgposition">
            <img :src="d.minerPicture"/>
          </div>
          <h3>{{d.name}}</h3>
          <h4><b>¥ {{d.one_amount_value}}</b><span class="icon iconfont icon-jinrong"></span></h4>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  .mobile_data{
    width: 100%;
    height: 9.3rem;
    background: white;
    margin-bottom: 0.5rem;
    h2{
      width: 100%;
      position: relative;
      text-align: center;
      font-size: 0.55rem;
      font-weight: 800;
      color: #1b1b1b;
      padding-top: .5rem;
      padding-bottom: 0.5rem;
      a{
        position: absolute;
        right: 0.5rem;
        font-size: 0.4rem;
        color: #999;
        font-weight: 100;
      }
    }
    .mobile_listdata{
      width: 100%;
      overflow: auto;
    }
    .mobile_listdata::-webkit-scrollbar{width:0px}
    .mobile_list_box{
      height: 7rem;
      margin-top: 0.2rem;
      overflow: auto;
      display: flex;
      justify-content:flex-start;
      border-left:1px solid #dddddd;
      .mobile_lists{
        width: 6rem;
        height: 6.8rem;
        border:1px solid #dddddd;
        border-left: 0;
        float: left;
        .imgposition{
          width: 100%;
          height: 3.8rem;
          text-align: center;
          img{
            width: 75%;
            height: 3rem;
            margin-top: 0.5rem;
          }
        }
        h3{
          width: 100%;
          padding:0 .4rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-top: 0.4rem;
          box-sizing: border-box;
          font-size: 0.7rem;
        }
        h4{
          color: #fe5039;
          width: 100%;
          padding:0 .4rem;
          box-sizing: border-box;
          font-size: 0.6rem;
          margin-top: 0.3rem;
          span{
            display:inline-block;
            float: right;
            width: 0.9rem;
            height: 0.9rem;
            background: #fe5039;
            color:white;
            border-radius: .1rem;
            font-size: .7rem;
            line-height: 1rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>