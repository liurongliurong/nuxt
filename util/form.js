module.exports = {
  auth: [
    {name: 'truename', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true},
    {name: 'card_type', type: 'text', title: '证件类型', edit: 'card_type', isChange: true, value: '中国大陆身份证'},
    {name: 'idcard', type: 'text', title: '证件号码', placeholder: '请输入您的证件号码', pattern: 'idCard'},
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ],
  card: [
    {name: 'card_no', type: 'text', title: '银行卡号', placeholder: '请输入银行卡号', pattern: 'bankCard', changeEvent: true},
    {name: 'open_bank', type: 'text', title: '开户银行', placeholder: '请输入开户银行', isChange: true},
    {name: 'bank_branch', type: 'text', title: '开户支行', placeholder: '请输入开户支行名称', isChange: true},
    {name: 'bank', type: 'select', title: '开户行地址', isChange: true},
    {name: 'mobile', type: 'text', title: '银行预留手机号', placeholder: '请输入银行预留手机号', pattern: 'tel'},
    {name: 'code', type: 'text', title: '手机验证码', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ],
  address: [
    {name: 'product_hash_type', type: 'select', title: '算力类型', option: []},
    {name: 'address', type: 'text', title: '算力地址', placeholder: '请输入对应算力地址', pattern: 'computeAddress'},
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode'}
  ],
  login: [
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6},
    {name: 'password', type: 'password', title: '设置密码', placeholder: '请输入密码', pattern: 'password'},
    {name: 'password1', type: 'password', title: '确认密码', placeholder: '请再次输入密码', pattern: 'password', error: '两次密码不一致'}
  ],
  getIncome: [
    {name: 'product_hash_type', type: 'text', title: '算力类型', edit: 'hashType', value: ''},
    {name: 'amount', type: 'text', title: '提取额度', placeholder: '请输入提取额度', changeEvent: true, pattern: 'coin', tipsInfo: '余额', value2: 0, tipsUnit: ''},
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ],
  withdrawals: [
    {name: 'amount', type: 'text', title: '提现金额', placeholder: '请输入提现金额', changeEvent: true, pattern: 'money', len: 7, tipsInfo: '余额', tipsUnit: '元', value2: 0},
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ],
  recharge: [
    {name: 'amount', type: 'text', title: '充值金额', placeholder: '请输入充值金额', pattern: 'bigMoney', len: 7},
    {name: 'bank_num', type: 'text', title: '充值银行卡', placeholder: '请输入充值银行卡', value: 'bank_num', pattern: 'bankCard'},
    {name: 'request_id', type: 'text', title: '充值流水号', placeholder: '请输入充值流水号', pattern: 'int'}
  ],
  zhifubao: [
    {name: 'amount', type: 'text', title: '充值金额', placeholder: '请输入充值金额', pattern: 'bigMoney', len: 6}
  ],
  post_address: [
    {name: 'post_user', type: 'text', title: '姓名', placeholder: '请输入姓名', isChange: true},
    {name: 'post_mobile', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'},
    {name: 'address', type: 'select', title: '地址', isChange: true},
    {name: 'area_details', type: 'text', title: '详细地址', placeholder: '请输入详细地址', isChange: true},
    {name: 'is_default', type: 'radio', title: '是否设为默认地址'}
  ]
}
