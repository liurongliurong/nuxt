import axios from 'axios'
import qs from 'qs'
import func from './function'

let api = axios.create({
  baseURL: 'http://suanli.baoquan.com/background/api',
  // baseURL: 'http://192.168.3.45/background/api/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  responseType: 'json'
})
// 修改返回数据格式
api.defaults.transformResponse = (res) => {
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
  if (res.status) {
    return res.data
  }
  return res
})

api.interceptors.request.use(config => {
  if (config.data) {
    config.data = qs.stringify({sign: btoa(func.serialize(config.data))})
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default api
