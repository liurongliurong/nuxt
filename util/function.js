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
  if (tel) {
    return tel.replace(/(\w{3})\w{4,}(\w{4})/, '$1****$2')
  }
}
api.cardReadable = (tel) => {
  if (tel) {
    console.log(tel)
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
api.countDown = () => {
  var t = 60
  var ele = document.querySelector('.count_btn') || document.getElementsByClassName('count_btn')[0]
  window.tt = setInterval(() => {
    if (t === 0) {
      ele.innerHTML = '重新获取'
      clearInterval(window.tt)
      ele.setAttribute('disabled', false)
    } else {
      ele.innerHTML = t + 's'
      t--
    }
  }, 1000)
}
api.checkFrom = (form, obj, ismobile) => {
  var result = api.validityForm(form, obj, ismobile)
  if (!result.status) {
    return result
  }
}
api.validityForm = (form, obj, ismobile) => {
  var data = {}
  var icon = 0
  var n = ''
  for (var i = 0; i <= form.length - 2; i++) {
    var ele = form[i]
    if (ele.value) {
      if (api.checkFiled(ele, form)) {
        if (ele.getAttribute('isChange')) {
          data[ele.name] = encodeURIComponent(ele.value)
        } else {
          data[ele.name] = ele.value
        }
      } else {
        api.errorTip(ele, ele.title, ismobile, obj)
        icon = 1
        n = i
        break
      }
    } else {
      api.errorTip(ele, ele.placeholder, ismobile, obj)
      api.setTips(ele, 'null')
      icon = 2
      n = i
      break
    }
  }
  if (!icon) {
    return data
  } else {
    return {status: icon, n: n}
  }
}
api.clearForm = (form) => {
  for (var i = 0; i <= form.length - 2; i++) {
    if (!form.disabled) {
      form[i].value = ''
    }
  }
  var ele = document.querySelector('.count_btn') || document.getElementsByClassName('count_btn')[0]
  if (window.tt) {
    ele.innerHTML = '获取验证码'
    clearInterval(window.tt)
    ele.setAttribute('disabled', false)
  }
}
api.errorTip = (ele, str, ismobile, obj) => {
  ele.focus()
  if (ismobile) {
    obj.myToast(str)
  }
}
api.checkFiled = (ele, form) => {
  if (!(ele.checkValidity ? ele.checkValidity() : api.check(ele.pattern || ele.getAttribute('pattern'), ele.value))) {
    api.setTips(ele, 'invalid')
    return false
  } else if ((ele.name === 'imgCode' && ele.value && (ele.value.toLowerCase() !== localStorage.getItem('code').toLowerCase())) || (ele.name === 'password1' && ele.value !== form.password.value) || (ele.name === 'trade_password1' && ele.value !== form.trade_password.value)) {
    console.log(111)
    api.setTips(ele, 'error')
    return false
  } else {
    api.setTips(ele, 'valid')
    return true
  }
}
api.checkCode = (ele) => {
  if (ele.value) {
    if (!api.checkFiled(ele)) {
      api.setTips(ele, 'invalid')
      return 2
    }
  } else {
    api.setTips(ele, 'null')
    return 1
  }
}
api.setTips = (ele, str) => {
  ele.setAttribute('data-status', str)
  setTimeout(() => {
    ele.setAttribute('data-status', '')
  }, 2000)
}
api.tips = (str, callback) => {
  var ele = document.querySelector('.web_tips') || document.getElementsByClassName('web_tips')[0]
  ele.innerHTML = str
  ele.style.height = '50px'
  ele.style.opacity = 1
  setTimeout(() => {
    ele.style.opacity = 0
    ele.style.height = 0
    if (callback) {
      callback()
    }
  }, 3000)
}
api.checkAjax = (obj, res, callback, btn, failback) => {
  if (res === 'repeatLogin') {
    api.tips('您的账号在别处登录', () => {
      obj.$router.push({name: 'login'})
      obj.$store.commit('LOGOUT')
    })
    return false
  }
  if (res === 'overtime') {
    api.tips('账户登录超时，请重新登录', () => {
      obj.$router.push({name: 'login'})
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
api.btoa = (input) => {
  var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var output = ''
  var chr1 = ''
  var chr2 = ''
  var chr3 = ''
  var enc1 = ''
  var enc2 = ''
  var enc3 = ''
  var enc4 = ''
  var i = 0
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
  }
  return output
}
api.checkEquipment = () => {
  var sUserAgent = navigator.userAgent.toLowerCase()
  var bIsIpad = sUserAgent.match(/ipad/i)
  var bIsIphoneOs = sUserAgent.match(/iphone os/i)
  var bIsMidp = sUserAgent.match(/midp/i)
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)
  var bIsUc = sUserAgent.match(/ucweb/i)
  var bIsAndroid = sUserAgent.match(/android/i)
  var bIsCE = sUserAgent.match(/windows ce/i)
  var bIsWM = sUserAgent.match(/windows mobile/i)
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true
  }
}
api.checkWechat = () => {
  var sUserAgent = navigator.userAgent.toLowerCase()
  return sUserAgent.match(/MicroMessenger/i)
}
api.check = (pattern, value) => {
  var re = new RegExp(pattern)
  if (pattern && !re.test(value)) {
    return false
  } else {
    return true
  }
}
api.randomData = () => {
  var now = +new Date(2010, 9, 3)
  var oneDay = 24 * 3600 * 1000
  var value = Math.random() * 1000
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}
api.getData = () => {
  var data = []
  for (var i = 0; i < 1000; i++) {
    data.push(api.randomData())
  }
  return data
}
export default api
