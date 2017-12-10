import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _a6dcd232 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _e5d7c14c = () => import('..\\pages\\index\\pc.vue' /* webpackChunkName: "pages\\index\\pc" */).then(m => m.default || m)
const _0e00f309 = () => import('..\\pages\\index\\mobile.vue' /* webpackChunkName: "pages\\index\\mobile" */).then(m => m.default || m)
const _2d8a108c = () => import('..\\pages\\currency.vue' /* webpackChunkName: "pages\\currency" */).then(m => m.default || m)
const _6b8adee8 = () => import('..\\pages\\compute.vue' /* webpackChunkName: "pages\\compute" */).then(m => m.default || m)
const _2558f4f7 = () => import('..\\pages\\webInfo.vue' /* webpackChunkName: "pages\\webInfo" */).then(m => m.default || m)
const _0b992ed5 = () => import('..\\pages\\webInfo\\list.vue' /* webpackChunkName: "pages\\webInfo\\list" */).then(m => m.default || m)
const _5a3adfd4 = () => import('..\\pages\\webInfo\\list\\_type.vue' /* webpackChunkName: "pages\\webInfo\\list\\_type" */).then(m => m.default || m)
const _e75d7810 = () => import('..\\pages\\webInfo\\help.vue' /* webpackChunkName: "pages\\webInfo\\help" */).then(m => m.default || m)
const _a865d59c = () => import('..\\pages\\webInfo\\help\\issues.vue' /* webpackChunkName: "pages\\webInfo\\help\\issues" */).then(m => m.default || m)
const _f295197a = () => import('..\\pages\\webInfo\\help\\aboutUs.vue' /* webpackChunkName: "pages\\webInfo\\help\\aboutUs" */).then(m => m.default || m)
const _4f24c322 = () => import('..\\pages\\webInfo\\detail\\_id.vue' /* webpackChunkName: "pages\\webInfo\\detail\\_id" */).then(m => m.default || m)
const _1fb28636 = () => import('..\\pages\\bdc.vue' /* webpackChunkName: "pages\\bdc" */).then(m => m.default || m)
const _e6d93f48 = () => import('..\\pages\\equipmentEvaluate.vue' /* webpackChunkName: "pages\\equipmentEvaluate" */).then(m => m.default || m)
const _c90bb362 = () => import('..\\pages\\equipmentEvaluate\\pc.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\pc" */).then(m => m.default || m)
const _8e268b0c = () => import('..\\pages\\equipmentEvaluate\\list.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\list" */).then(m => m.default || m)
const _1c168fad = () => import('..\\pages\\equipmentEvaluate\\detail.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\detail" */).then(m => m.default || m)
const _491f1104 = () => import('..\\pages\\equipmentEvaluate\\mobile.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\mobile" */).then(m => m.default || m)
const _e16e7802 = () => import('..\\pages\\computeNews.vue' /* webpackChunkName: "pages\\computeNews" */).then(m => m.default || m)
const _121a0423 = () => import('..\\pages\\auth.vue' /* webpackChunkName: "pages\\auth" */).then(m => m.default || m)
const _5dc47119 = () => import('..\\pages\\auth\\regist.vue' /* webpackChunkName: "pages\\auth\\regist" */).then(m => m.default || m)
const _7dc6d3d4 = () => import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages\\auth\\login" */).then(m => m.default || m)
const _398a2206 = () => import('..\\pages\\auth\\passwordRetrieval.vue' /* webpackChunkName: "pages\\auth\\passwordRetrieval" */).then(m => m.default || m)
const _d014747a = () => import('..\\pages\\industryInformation.vue' /* webpackChunkName: "pages\\industryInformation" */).then(m => m.default || m)
const _a64d6e74 = () => import('..\\pages\\user.vue' /* webpackChunkName: "pages\\user" */).then(m => m.default || m)
const _4ceba0df = () => import('..\\pages\\user\\incomeChart.vue' /* webpackChunkName: "pages\\user\\incomeChart" */).then(m => m.default || m)
const _3f2dc434 = () => import('..\\pages\\user\\virtualCurrencyFlow.vue' /* webpackChunkName: "pages\\user\\virtualCurrencyFlow" */).then(m => m.default || m)
const _34f39190 = () => import('..\\pages\\user\\moneyFlow.vue' /* webpackChunkName: "pages\\user\\moneyFlow" */).then(m => m.default || m)
const _2975a057 = () => import('..\\pages\\user\\account.vue' /* webpackChunkName: "pages\\user\\account" */).then(m => m.default || m)
const _2ec4b03e = () => import('..\\pages\\user\\password.vue' /* webpackChunkName: "pages\\user\\password" */).then(m => m.default || m)
const _316e2054 = () => import('..\\pages\\user\\computeProperty.vue' /* webpackChunkName: "pages\\user\\computeProperty" */).then(m => m.default || m)
const _06ed7d90 = () => import('..\\pages\\user\\accountEvaluate.vue' /* webpackChunkName: "pages\\user\\accountEvaluate" */).then(m => m.default || m)
const _3435bd82 = () => import('..\\pages\\user\\lpCenter.vue' /* webpackChunkName: "pages\\user\\lpCenter" */).then(m => m.default || m)
const _7c6acd9e = () => import('..\\pages\\user\\message.vue' /* webpackChunkName: "pages\\user\\message" */).then(m => m.default || m)
const _46ad85ed = () => import('..\\pages\\user\\recharge.vue' /* webpackChunkName: "pages\\user\\recharge" */).then(m => m.default || m)
const _08ce28dc = () => import('..\\pages\\user\\repaymentDetail\\_id.vue' /* webpackChunkName: "pages\\user\\repaymentDetail\\_id" */).then(m => m.default || m)
const _62eb928c = () => import('..\\pages\\user\\repayment\\_type.vue' /* webpackChunkName: "pages\\user\\repayment\\_type" */).then(m => m.default || m)
const _2d7940c9 = () => import('..\\pages\\user\\order\\_status.vue' /* webpackChunkName: "pages\\user\\order\\_status" */).then(m => m.default || m)
const _f5b55370 = () => import('..\\pages\\user\\messageDetail\\_id.vue' /* webpackChunkName: "pages\\user\\messageDetail\\_id" */).then(m => m.default || m)
const _e3af68be = () => import('..\\pages\\user\\orderDetail\\_id.vue' /* webpackChunkName: "pages\\user\\orderDetail\\_id" */).then(m => m.default || m)
const _045489ea = () => import('..\\pages\\notFound.vue' /* webpackChunkName: "pages\\notFound" */).then(m => m.default || m)
const _4adeec2a = () => import('..\\pages\\minerShop.vue' /* webpackChunkName: "pages\\minerShop" */).then(m => m.default || m)
const _02e8940c = () => import('..\\pages\\minerShop\\mining.vue' /* webpackChunkName: "pages\\minerShop\\mining" */).then(m => m.default || m)
const _33309870 = () => import('..\\pages\\minerShop\\list.vue' /* webpackChunkName: "pages\\minerShop\\list" */).then(m => m.default || m)
const _ea5b868e = () => import('..\\pages\\minerShop\\activity.vue' /* webpackChunkName: "pages\\minerShop\\activity" */).then(m => m.default || m)
const _067756cf = () => import('..\\pages\\minerShop\\detail\\_id.vue' /* webpackChunkName: "pages\\minerShop\\detail\\_id" */).then(m => m.default || m)
const _2bd92c64 = () => import('..\\pages\\minerShop\\miner\\_type.vue' /* webpackChunkName: "pages\\minerShop\\miner\\_type" */).then(m => m.default || m)
const _2be45216 = () => import('..\\pages\\quickNews.vue' /* webpackChunkName: "pages\\quickNews" */).then(m => m.default || m)
const _a7816d9a = () => import('..\\pages\\transaction.vue' /* webpackChunkName: "pages\\transaction" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _a6dcd232,
			name: "index",
			children: [
				{
					path: "pc",
					component: _e5d7c14c,
					name: "index-pc"
				},
				{
					path: "mobile",
					component: _0e00f309,
					name: "index-mobile"
				}
			]
		},
		{
			path: "/currency",
			component: _2d8a108c,
			name: "currency"
		},
		{
			path: "/compute",
			component: _6b8adee8,
			name: "compute"
		},
		{
			path: "/webInfo",
			component: _2558f4f7,
			name: "webInfo",
			children: [
				{
					path: "list",
					component: _0b992ed5,
					name: "webInfo-list",
					children: [
						{
							path: ":type?",
							component: _5a3adfd4,
							name: "webInfo-list-type"
						}
					]
				},
				{
					path: "help",
					component: _e75d7810,
					name: "webInfo-help",
					children: [
						{
							path: "issues",
							component: _a865d59c,
							name: "webInfo-help-issues"
						},
						{
							path: "aboutUs",
							component: _f295197a,
							name: "webInfo-help-aboutUs"
						}
					]
				},
				{
					path: "detail/:id?",
					component: _4f24c322,
					name: "webInfo-detail-id"
				}
			]
		},
		{
			path: "/bdc",
			component: _1fb28636,
			name: "bdc"
		},
		{
			path: "/equipmentEvaluate",
			component: _e6d93f48,
			name: "equipmentEvaluate",
			children: [
				{
					path: "pc",
					component: _c90bb362,
					name: "equipmentEvaluate-pc"
				},
				{
					path: "list",
					component: _8e268b0c,
					name: "equipmentEvaluate-list"
				},
				{
					path: "detail",
					component: _1c168fad,
					name: "equipmentEvaluate-detail"
				},
				{
					path: "mobile",
					component: _491f1104,
					name: "equipmentEvaluate-mobile"
				}
			]
		},
		{
			path: "/computeNews",
			component: _e16e7802,
			name: "computeNews"
		},
		{
			path: "/auth",
			component: _121a0423,
			name: "auth",
			children: [
				{
					path: "regist",
					component: _5dc47119,
					name: "auth-regist"
				},
				{
					path: "login",
					component: _7dc6d3d4,
					name: "auth-login"
				},
				{
					path: "passwordRetrieval",
					component: _398a2206,
					name: "auth-passwordRetrieval"
				}
			]
		},
		{
			path: "/industryInformation",
			component: _d014747a,
			name: "industryInformation"
		},
		{
			path: "/user",
			component: _a64d6e74,
			name: "user",
			children: [
				{
					path: "incomeChart",
					component: _4ceba0df,
					name: "user-incomeChart"
				},
				{
					path: "virtualCurrencyFlow",
					component: _3f2dc434,
					name: "user-virtualCurrencyFlow"
				},
				{
					path: "moneyFlow",
					component: _34f39190,
					name: "user-moneyFlow"
				},
				{
					path: "account",
					component: _2975a057,
					name: "user-account"
				},
				{
					path: "password",
					component: _2ec4b03e,
					name: "user-password"
				},
				{
					path: "computeProperty",
					component: _316e2054,
					name: "user-computeProperty"
				},
				{
					path: "accountEvaluate",
					component: _06ed7d90,
					name: "user-accountEvaluate"
				},
				{
					path: "lpCenter",
					component: _3435bd82,
					name: "user-lpCenter"
				},
				{
					path: "message",
					component: _7c6acd9e,
					name: "user-message"
				},
				{
					path: "recharge",
					component: _46ad85ed,
					name: "user-recharge"
				},
				{
					path: "repaymentDetail/:id?",
					component: _08ce28dc,
					name: "user-repaymentDetail-id"
				},
				{
					path: "repayment/:type?",
					component: _62eb928c,
					name: "user-repayment-type"
				},
				{
					path: "order/:status?",
					component: _2d7940c9,
					name: "user-order-status"
				},
				{
					path: "messageDetail/:id?",
					component: _f5b55370,
					name: "user-messageDetail-id"
				},
				{
					path: "orderDetail/:id?",
					component: _e3af68be,
					name: "user-orderDetail-id"
				}
			]
		},
		{
			path: "/notFound",
			component: _045489ea,
			name: "notFound"
		},
		{
			path: "/minerShop",
			component: _4adeec2a,
			name: "minerShop",
			children: [
				{
					path: "mining",
					component: _02e8940c,
					name: "minerShop-mining"
				},
				{
					path: "list",
					component: _33309870,
					name: "minerShop-list"
				},
				{
					path: "activity",
					component: _ea5b868e,
					name: "minerShop-activity"
				},
				{
					path: "detail/:id?",
					component: _067756cf,
					name: "minerShop-detail-id"
				},
				{
					path: "miner/:type?",
					component: _2bd92c64,
					name: "minerShop-miner-type"
				}
			]
		},
		{
			path: "/quickNews",
			component: _2be45216,
			name: "quickNews"
		},
		{
			path: "/transaction",
			component: _a7816d9a,
			name: "transaction"
		}
    ],
    fallback: false
  })
}
