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
  ],
  bdc: [
    {name: 'dep_name', type: 'text', title: '申请人', placeholder: '请输入您的姓名', isChange: true},
    {name: 'dep_tel', type: 'text', title: '手机号码', placeholder: '请输入手机号码', pattern: 'tel'},
    {name: 'code', type: 'text', title: '手机验证码', placeholder: '手机验证码', addon: 2, pattern: 'telCode', len: 6},
    {name: 'dep_bdc_id', type: 'select', title: '选择BDC', option: []},
    {name: 'dep_type', type: 'text', title: '服务器类型', placeholder: '请输入算力服务器类型', isChange: true},
    {name: 'dep_number', type: 'text', title: '服务器数量', placeholder: '输入托管算力服务器数量', pattern: 'int', maxlength: 5}
  ],
  sold: [
    {name: 'amount', type: 'text', title: '出售数量', placeholder: '请输入出售数量', changeEvent: true, tipsInfo: '最大可出售数量', tipsUnit: '台', value: 0, value2: 0, pattern: 'int'},
    {name: 'one_amount_value', type: 'text', title: '出售单价', placeholder: '请输入出售单价', changeEvent: true, tipsInfo: '购入价格', value2: 0, tipsUnit: '元', pattern: 'float'},
    {name: 'total_price', type: 'text', title: '出售总价', edit: 'price', value: 0, tipsInfo: 'show', tipsUnit: '元'},
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ],
  rent: [
    {name: 'amount', type: 'text', title: '出租数量', placeholder: '请输入出租数量', changeEvent: true, tipsInfo: '最大可出租数量', tipsUnit: 'T', value: 0, pattern: 'float'},
    {name: 'transfer_time', type: 'select', title: '出租时长', option: [{id: 0, item: '30'}, {id: 1, item: '90'}, {id: 2, item: '180'}, {id: 3, item: '360'}], unit: '天'},
    {name: 'transfer_price', type: 'text', title: '出租单价', placeholder: '请输入出租单价', changeEvent: true, tipsInfo: 'show', tipsUnit: '元', pattern: 'float'},
    {name: 'total_price', type: 'text', title: '出租总价', edit: 'price', value: 0, tipsInfo: 'show', tipsUnit: '元'}, {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ],
  againRent: [
    {name: 'amount', type: 'text', title: '转租数量', placeholder: '请输入出租数量', edit: 'price', tipsInfo: 'show', tipsUnit: 'T', value: 0, pattern: 'float'},
    {name: 'transfer_time', type: 'text', title: '转租时长', edit: 'price', value: '', tipsInfo: '已使用时长', value2: 0, tipsUnit: '天'},
    {name: 'transfer_price', type: 'text', title: '转租单价', placeholder: '请输入出租单价', edit: 'price', value: 0, tipsInfo: 'show', tipsUnit: '元'},
    {name: 'total_price', type: 'text', title: '转租总价', placeholder: '请输入转租总价', changeEvent: true, tipsInfo: 'show', tipsUnit: '元', pattern: 'float'},
    {name: 'mobile', type: 'text', title: '手机号码', edit: 'mobile'},
    {name: 'code', type: 'text', title: '短信验证', placeholder: '请输入短信验证码', addon: 2, pattern: 'telCode', len: 6}
  ]
}
