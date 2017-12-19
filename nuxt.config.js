
module.exports = {
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_icon.png' }
    ]
  },
  loading: {
    color: 'white',
    height: '2px'
  },
  generate: {
    routes: [
      '/minerShop/miner/1',
      '/minerShop/miner/2',
      '/user/order/0',
      '/user/order/2',
      '/user/order/3',
      '/mobile/order/0',
      '/mobile/order/2',
      '/mobile/order/3',
      '/user/repayment/0',
      '/user/repayment/1',
      '/webInfo/list/website',
      '/webInfo/list/product'
    ]
  }
}
