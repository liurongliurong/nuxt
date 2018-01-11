import { SET_TOKEN, LOGOUT, SET_INFO, SET_HASH_TYPE, SET_NUM, SET_URL, SET_EQUIPMENT, SET_ADDRESS } from './mutation-types'

export default {
  [SET_TOKEN] (state, res) {
    state.info = Object.assign(state.info, res)
    localStorage.setItem('info', JSON.stringify(res))
  },
  [LOGOUT] (state) {
    state.info = {
      user_id: '',
      mobile: '',
      token: 0
    }
    localStorage.removeItem('info')
  },
  [SET_INFO] (state, payload) {
    state.info = Object.assign(state.info, payload)
  },
  [SET_HASH_TYPE] (state, payload) {
    state.hashType = payload
  },
  [SET_NUM] (state, payload) {
    state.num = payload
  },
  [SET_URL] (state, payload) {
    state.callUrl = payload
  },
  [SET_EQUIPMENT] (state, payload) {
    state.isMobile = payload
  },
  [SET_ADDRESS] (state, payload) {
    state.addressData = payload
  }
}
