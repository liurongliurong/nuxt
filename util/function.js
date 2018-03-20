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
api.pastTime = (time) => {
  var arr = [24 * 3600 * 1000, 3600 * 1000, 60 * 1000, 1000]
  var now = new Date()
  var allTime = now.getTime() - new Date(time.replace(/-/g, '/')).getTime()
  var days = Math.floor(allTime / arr[0])
  if (days > 0) {
    if (days >= 28) {
      return time
    } else {
      return days + '天前'
    }
  }
  var leaveDays = allTime % arr[0]
  var hours = Math.floor(leaveDays / arr[1])
  if (hours > 0) {
    return hours + '小时前'
  }
  var leaveHours = leaveDays % arr[1]
  var minutes = Math.floor(leaveHours / arr[2])
  if (minutes > 0) {
    return minutes + '分钟前'
  }
  var leaveMinutes = leaveHours % arr[2]
  var seconds = Math.floor(leaveMinutes / arr[3])
  return seconds + '秒前'
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
    return tel.replace(/(\d{12,})(\d{4})/, '**** **** **** $2')
  }
}
api.currency = (num, n, i) => {
  var sign = num.toString().indexOf('-') > -1
  if (i || sign) {
    num = sign ? num.toString().slice(1) : num
  }
  num = api.decimal(num, n)
  var result = api.readable(num.slice(0, num.length - 3)) + num.slice(-3)
  if (i || sign) {
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
api.countDown = (e) => {
  var t = 60
  var ele = e.target || e
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
api.checkForm = (form, isMobile) => {
  var result = api.validityForm(form, isMobile)
  if (!result.status) {
    return result
  }
}
api.validityForm = (form, isMobile) => {
  var data = {}
  var icon = 0
  var n = ''
  for (var i = 0; i <= form.length - 2; i++) {
    var ele = form[i]
    if (ele.value) {
      var result = false
      if (ele.name === 'password1') {
        result = api.checkFiled(ele, isMobile, form.password)
      } else {
        result = api.checkFiled(ele, isMobile)
      }
      if (result) {
        if (ele.getAttribute('isChange')) {
          data[ele.name] = encodeURIComponent(ele.value)
        } else {
          data[ele.name] = ele.value
        }
      } else {
        icon = 1
        n = i
        break
      }
    } else {
      api.setTips(ele, 'null', isMobile, ele.placeholder)
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
api.checkFiled = (ele, isMobile, password) => {
  if (api.checkEle(ele)) {
    api.setTips(ele, 'invalid', isMobile, ele.title)
    return false
  }
  if (ele.name === 'imgCode' && (ele.value.toLowerCase() !== api.getStorge('suanli').imgCode.toLowerCase())) {
    api.setTips(ele, 'error', isMobile, '图形验证码错误')
    return false
  } else if (ele.name === 'password1' && password.value && ele.value !== password.value) {
    api.setTips(ele, 'error', isMobile, '两次密码不一致')
    return false
  }
  return true
}
api.checkEle = (ele) => {
  if (ele.checkValidity ? ele.checkValidity() : api.check(ele.pattern || ele.getAttribute('pattern'), ele.value)) {
    return false
  } else {
    return true
  }
}
api.checkOne = (ele, isMobile) => {
  if (ele.value) {
    if (!api.checkFiled(ele, isMobile)) {
      return 2
    }
  } else {
    api.setTips(ele, 'null', isMobile, ele.placeholder)
    return 1
  }
}
api.setTips = (ele, str, isMobile, text) => {
  // ele.focus()
  if (isMobile) {
    api.tips(text)
  } else {
    ele.setAttribute('data-status', str)
    setTimeout(() => {
      ele.setAttribute('data-status', '')
    }, 3000)
  }
}
api.tips = (str, callback) => {
  var ele = document.querySelector('.toast') || document.getElementsByClassName('toast')[0]
  ele.innerHTML = str
  ele.style.opacity = 1
  setTimeout(() => {
    ele.style.opacity = 0
    ele.innerHTML = ''
    if (callback) {
      callback()
    }
  }, 2000)
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
api.setStorge = (name, value) => {
  var storge = localStorage.getItem(name) || '{}'
  var data = JSON.parse(storge)
  localStorage.setItem(name, JSON.stringify(Object.assign(data, value)))
}
api.getStorge = (name) => {
  var storge = localStorage.getItem(name) || '{}'
  return JSON.parse(storge)
}
api.goPage = (id, type, obj) => {
  api.setStorge('suanli', {proId: id, proType: type})
  obj.$router.push({path: '/minerShop/detail/'})
}
export default api
