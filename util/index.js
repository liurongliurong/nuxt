require('es6-promise').polyfill()
import axios from 'axios'
import qs from 'qs'
import util from './function'

let api = axios.create({
  // baseURL: 'http://www.suanli.local/background/api',
  baseURL: 'http://192.168.3.45/background/api/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  responseType: 'json'
})
// 修改返回数据格式
api.defaults.transformResponse = (res) => {
  if (typeof res === 'string') {
    res = JSON.parse(res)
  }
  if (res.code === '1000') {
    return res.msg
  } else if (res.code === '600001') {
    return 'repeatLogin'
  } else if (res.code === '100001') {
    return 'overtime'
  } else {
    return res
  }
}

api.defaults.validateStatus = (status) => {
  return true
  // return status >= 200 && status < 300
}

api.interceptors.response.use(res => {
  // console.log(res)
  // if (res.status) {
  //   return res.data
  // }
  // return res
  // console.log(res)
  if (res.status >= 200 && res.status < 300) {
    return res.data
  }
  return Promise.reject(res)
}, error => {
  return Promise.reject({message: '网络异常，请刷新重试', err: error})
})

api.interceptors.request.use(config => {
  if (config.data) {
    if (config.data['sign']) {
      if (window.btoa) {
        config.data['sign'] = window.btoa(config.data['sign'])
      } else {
        config.data['sign'] = util.btoa(config.data['sign'])
      }
    }
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default api
