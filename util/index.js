require('es6-promise').polyfill()
import axios from 'axios'
import qs from 'qs'
import util from './function'

let api = axios.create({
  // baseURL: 'http://www.suanli.local/background/api',  
  // baseURL: 'https://www.suanli.com/background/api',
  // baseURL: 'http://192.168.3.206:8080/background/api/',
  // baseURL: 'http://192.168.3.45/background/api/',
  baseURL: 'http://suanli.baoquan.com/background/api',  
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  responseType: 'json'
})

api.defaults.transformResponse = (res) => {
  if (typeof res === 'string') {
    res = JSON.parse(res)
  }
  return res
}

api.interceptors.response.use(res => {
  if (res.status >= 200 && res.status < 300) {
    return res.data
  }
  return Promise.reject(res)
}, error => {
  return Promise.reject({message: '网络异常，请刷新重试', err: error})
})

api.interceptors.request.use(config => {
  if (config.data) {
    let data = util.serialize(config.data)
    config.data = qs.stringify({sign: util.btoa(data)})
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default api

function callbackLogin (obj) {
  obj.$router.push({name: 'auth-login'})
  obj.$store.commit('LOGOUT')
}

export function fetchApiData (obj, url, data, callback, btn, failback) {
  api.post(url, data).then((res) => {
    if (res.code === '1000') {
      callback(res.msg)
    } else if (res.code === '600001') {
      util.tips('您的账号在别处登录', () => {
        callbackLogin(obj)
      })
    } else if (res.code === '100001') {
      util.tips('账户登录超时，请重新登录', () => {
        callbackLogin(obj)
      })
    } else {
      util.tips(res.msg, () => {
        if (btn) {
          btn.removeAttribute('disabled')
        }
        if (failback) {
          failback()
        }
      })
    }
  })
}
