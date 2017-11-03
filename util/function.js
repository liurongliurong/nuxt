let api = {}
api.f = (num) => {
  num = num < 10 ? '0' + num : num
  return num
}
api.date = (d, t) => {
  var year = d.getFullYear()
  var month = api.f(d.getMonth() + 1)
  var day = api.f(d.getDate())
  var hour = api.f(d.getHours())
  var minutes = api.f(d.getMinutes())
  var seconds = api.f(d.getSeconds())
  switch (t) {
    case 'date':
      return year + '-' + month + '-' + day
    case 'time':
      return hour + ':' + minutes + ':' + seconds
    case 'sTime':
      return hour + ':' + minutes
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
}
api.serialize = data => {
  var str = []
  for (let [k, v] of Object.entries(data)) {
    str.push(k + '=' + v)
  }
  str = str.join('&')
  return str
}
api.decimal = (f, n) => {
  n = n || 2
  return (+f).toFixed(n)
}
api.readable = (num) => {
  var result = ''
  num = (num || 0).toString()
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}
api.telReadable = (tel) => {
  return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
api.cardReadable = (tel) => {
  if (tel) {
    return tel.replace(/(\d{4})\d{8,13}(\d{4})/, '$1****$2')
  }
}
api.currency = (num, n, i) => {
  if (i) {
    var sign = (num + '').includes('-')
    num = sign ? num.slice(1) : num
  }
  var result = ''
  num = api.decimal(num, n)
  result = api.readable(num.slice(0, num.length - 3)) + num.slice(-3)
  if (i) {
    result = sign ? '-' + result : '+' + result
  }
  return result
}
api.createCode = (mycanvas) => {
  var str = api.rand()
  var cxt = mycanvas.getContext('2d')
  cxt.fillStyle = '#eee'
  cxt.fillRect(0, 0, 90, 40)
  for (var j = 0; j < 20; j++) {
    cxt.strokeStyle = '#609cff'
    cxt.beginPath()
    cxt.moveTo(api.line().x, api.line().y)
    cxt.lineTo(api.line().x, api.line().y)
    cxt.lineWidth = 0.5
    cxt.closePath()
    cxt.stroke()
  }
  cxt.fillStyle = '#387c91'
  cxt.font = 'bold 24px Arial'
  cxt.fillText(str, 20, 30)
  return str
}
api.rand = () => {
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var arr = str.split('')
  var validate = ''
  var ranNum
  for (var i = 0; i < 4; i++) {
    ranNum = Math.floor(Math.random() * 62)
    validate += arr[ranNum]
  }
  return validate
}
api.line = () => {
  var line = {x: 0, y: 0}
  line.x = Math.floor(Math.random() * 90)
  line.y = Math.floor(Math.random() * 40)
  return line
}
api.checkFrom = (form) => {
  var data = {}
  var c = true
  for (var i = 0; i <= form.length - 2; i++) {
    if (form[i].value) {
      if (api.checkFiled(form[i], form)) {
        if (form[i].getAttribute('isChange')) {
          data[form[i].name] = encodeURIComponent(form[i].value)
        } else {
          data[form[i].name] = form[i].value
        }
      } else {
        c = false
      }
    } else {
      api.setTips(form[i], 'null')
      c = false
    }
  }
  if (!c) {
    return false
  } else {
    return data
  }
}
api.checkOne = (form, obj) => {
  var data = {}
  for (var i = 0; i <= form.length - 2; i++) {
    if (form[i].value) {
      if (obj.check(form[i])) {
        data[form[i].name] = form[i].value
      } else {
        return {status: 'invalid', n: i}
      }
    } else {
      return {status: 'null', n: i}
    }
  }
  return data
}
api.checkFiled = (ele, form) => {
  if (!ele.checkValidity()) {
    api.setTips(ele, 'invalid')
  } else if ((ele.name === 'imgCode' && ele.value.toLowerCase() !== localStorage.getItem('code').toLowerCase()) || (ele.name === 'password1' && ele.value !== form.password.value) || (ele.name === 'trade_password1' && ele.value !== form.trade_password.value)) {
    api.setTips(ele, 'error')
  } else {
    api.setTips(ele, 'valid')
    return true
  }
}
api.checkCode = (form) => {
  var c = true
  var i = 0
  while (form[i].name !== 'code') {
    if (form[i].value) {
      if (!api.checkFiled(form[i])) {
        c = false
      }
    } else {
      api.setTips(form[i], 'null')
      c = false
    }
    i++
  }
  return c
}
api.setTips = (ele, str) => {
  ele.setAttribute('data-status', str)
  setTimeout(() => {
    ele.setAttribute('data-status', '')
  }, 2000)
}
api.tips = (str, callback) => {
  var ele = document.querySelector('.web_tips')
  ele.innerHTML = str
  ele.style.height = '50px'
  ele.style.opacity = 1
  setTimeout(() => {
    ele.style.opacity = 0
    ele.style.height = 0
    if (callback) {
      callback()
    }
  }, 2000)
}
api.checkAjax = (obj, res, callback, btn, failback) => {
  if (res === 'repeatLogin') {
    api.tips('您的账号在别处登录', () => {
      obj.$router.push({path: '/'})
      obj.$store.commit('LOGOUT')
    })
    return false
  }
  if (res === 'overtime') {
    api.tips('账户登录超时，请重新登录', () => {
      obj.$router.push({name: 'auth-login'})
      obj.$store.commit('LOGOUT')
    })
    return false
  }
  if (res && res.code) {
    api.tips(res.msg, () => {
      if (btn) {
        btn.removeAttribute('disabled')
      }
      if (failback) {
        failback()
      }
    })
  } else {
    callback()
  }
}
export default api
