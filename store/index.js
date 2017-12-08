import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  info: {
    user_id: '',
    mobile: '',
    token: 0,
    true_name: '',
    bank_card: '',
    risk: {user_risk_score: -1},
    address: [],
    trade_password: 0,
    scode: 0,
    unread_num: 0,
    last_login_time: ''
  },
  hashType: [],
  num: '',
  callUrl: '',
  isMobile: false,
  addressData: {}
}

const getters = {
  menu: state => {
    var arr = [
      {opr: '已认证', status: 1, setting: false},
      {opr: '认证', status: 0, setting: true},
      {opr: '绑定', status: 0, setting: true},
      {opr: '添加地址', status: 0, setting: true},
      {opr: '修改', status: 1, setting: true},
      {opr: '设置', status: 0, setting: true}
    ]
    var tipInfo = ['正在审核', '认证成功']
    var tipInfo2 = ['正在审核', '重新绑卡']
    if (state.info.true_name) {
      arr[1].status = state.info.true_name.status === 1
      arr[1].opr = state.info.true_name.status > 1 ? tipInfo[state.info.true_name.status] + ' 请重新认证' : tipInfo[state.info.true_name.status]
      arr[1].setting = 0
    }
    if (state.info.bank_card) {
      arr[2].status = state.info.bank_card.status
      arr[2].opr = tipInfo2[state.info.bank_card.status]
      arr[2].setting = state.info.bank_card.status
    }
    if (state.info.address.length) {
      arr[3].status = 1
    }
    if (state.info.trade_password) {
      arr[5].status = 1
      arr[5].opr = '重新设置'
    }
    return arr
  }
}

export default () => new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
