<template>
  <section class="account_evaluate">
    <h2>风险测评</h2>
    <form class="box_content" @submit.prevent="submit" novalidate>
      <h4>欢迎参加本次调查</h4>
      <aside v-for="d,i in data">
        <div class="question" :ref="'question'+i">{{d.question}}<span>请选择</span></div>
        <div class="answer">
          <label :for="'answer'+i+k" v-for="q,k in d.options">
            <input type="radio" :id="'answer'+i+k" :name="'question'+i" :value="d.answer[k]">
            <span>{{q}}</span>
          </label>
        </div>
      </aside>
      <div class="btn"><button>确认提交</button></div>
    </form>
  </section>
</template>

<script>
  import api from '@/util/function'
  import util from '@/util'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        data: [{question: 'Q1：您的年龄介于', options: ['18-30 岁', '31-50 岁', '51-65 岁', '高于 65 岁'], answer: [6, 8, 3, 1]}, {question: 'Q2：您的学历', options: ['高中及以下', '中专或大专', '本科', '硕士及以上'], answer: [1, 3, 4, 6]}, {question: 'Q3：您的职业为', options: ['无固定职业', '专业技术人员', '一般企事业单位员工', '金融行业一般从业人员'], answer: [1, 3, 4, 6]}, {question: 'Q4：您的家庭可支配年收入为（折合人民币）', options: ['50 万元以下', '50—100 万元', '100—500 万元', '500—1000 万元', '1000 万元以上'], answer: [1, 3, 5, 7, 9]}, {question: 'Q5：、在您每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为', options: ['小于 10%', '10%至 25%', '25%至 50%', '大于 50%'], answer: [1, 3, 5, 7]}, {question: 'Q6：您的投资知识可描述为', options: ['有限：基本没有金融产品方面的知识', '一般：对金融产品及其相关风险具有基本的知识和理解', '丰富：对金融产品及其相关风险具有丰富的知识和理解'], answer: [0, 5, 7]}, {question: 'Q7：您的投资经验可描述为', options: ['除银行储蓄外，基本没有其他投资经验', '购买过债券、保险等理财产品', '参与过股票、基金等产品的交易', '参与过权证、期货、期权等产品的交易'], answer: [1, 3, 6, 8]}, {question: 'Q8：您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验', options: ['没有经验', '少于 2 年', '2 至 5 年', '5 至 10 年', '10 年以上'], answer: [1, 3, 5, 7, 9]}, {question: 'Q9：您计划的投资期限是多久', options: ['1 年以下', '1 至 3 年', '3 至 5 年', '5 年以上'], answer: [2, 4, 6, 8]}, {question: 'Q10：您的投资目的是', options: ['资产保值', '资产稳健增长', '资产迅速增长'], answer: [2, 5, 7]}, {question: 'Q11：以下哪项描述最符合您的投资态度', options: ['厌恶风险，不希望本金损失，希望获得稳定回报', '保守投资，不希望本金损失，愿意承担一定幅度的收益波动', '寻求资金的较高收益和成长性，愿意为此承担有限本金损失', '希望赚取高回报，愿意为此承担较大本金损失'], answer: [0, 3, 6, 8]}, {question: 'Q12：假设有两种投资：投资 A 预期获得 10%的收益，可能承担的损失非常小；投资 B 预期获得 30%的收益，但可能承担较大亏损。您会怎么支配您的投资', options: ['全部投资于收益较小且风险较小的 A', '同时投资于 A 和 B，但大部分资金投资于收益较小且风险较小的 A', '同时投资于 A 和 B，但大部分资金投资于收益较大且风险较大的 B', '全部投资于收益较大且风险较大的 B'], answer: [2, 4, 6, 8]}, {question: 'Q13：您认为自己能承受的最大投资损失是多少', options: ['10%以内', ' 10%-30%', ' 30%-50%', '超过 50%'], answer: [1, 3, 6, 8]}]
      }
    },
    methods: {
      submit () {
        var form = document.querySelector('.box_content')
        var scoreArr = []
        for (var i = 0; i <= 12; i++) {
          var ele = this.$refs['question' + i][0]
          if ((form['question' + i].value) !== '') {
            scoreArr.push(form['question' + i].value)
            ele.className = 'question'
          } else {
            form['question' + i][0].focus()
            ele.className = 'question active'
            setTimeout(() => {
              ele.className = 'question'
            }, 2000)
            return false
          }
        }
        var score = scoreArr.reduce((s, v, k) => {
          return parseInt(s) + parseInt(v)
        })
        var rickType = ''
        if (score < 60) {
          rickType = '保守型'
        } else if (score < 70) {
          rickType = '稳健型'
        } else if (score < 80) {
          rickType = '平衡型'
        } else if (score < 90) {
          rickType = '成长型'
        } else {
          rickType = '进取型'
        }
        var self = this
        var sendData = {token: this.token}
        util.post('risk_score', {sign: api.serialize(Object.assign({user_risk_score: score, risk_type: encodeURIComponent(rickType)}, sendData))}).then(function (res) {
          api.checkAjax(self, res, () => {
            util.post('show_risk_score', {sign: api.serialize(sendData)}).then(function (data) {
              if (data && !data.code) {
                self.$store.commit('SET_INFO', {risk: data})
                api.tips('测评成功', () => {
                  self.$router.push({name: 'user-lpCenter'})
                })
              }
            })
          })
        })
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        isMobile: state => state.isMobile
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .account_evaluate{
    margin: 0 auto;
    padding: 40px 0;
    min-height: 800px;
    h2{
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      border-bottom:1px solid $border
    }
    .box_content{
      padding:40px 90px;
      aside{
        margin-bottom:15px;
        font-size: 16px;
        .question{
          span{
            color: $red;
            font-size: 12px;
            padding-left:10px;
            display: none;
          }
          &.active span{
            display: inline;
          }
        }
        .answer{
          padding-left:10px;
          label{
            display: block;
            margin-top:10px;
            input{
              @include checkbox(22)
              margin-right:5px;
              &:before{
                width: 9px;
                left: calc(50% - 5px);
                border-width: 0 0 2px 2px;
              }
            }
          }
        }
      }
      .btn{
        text-align: center;
        button{
          padding:10px 50px;
          @include button($blue)
          font-size: 16px;
        }
      }
    }
  }
</style>
