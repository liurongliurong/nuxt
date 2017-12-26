
module.exports = {
  build: {
    vendor: ['axios']
  },
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_icon.png' },
      { rel: 'stylesheet', type: 'text/css', href: '/fonts/iconfont.css' }
    ]
  },
  loading: {
    color: 'white',
    height: '2px'
  },
  css: [
    { src: '~assets/css/public.scss', lang: 'scss'}
  ],
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
  },
  plugins: [
    {src:'~plugins/fullpage'}
    // {src:'~plugins/vConsole', ssr:false}
  ]
}
