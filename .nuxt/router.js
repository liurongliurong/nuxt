import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2c9d49f4 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _cccfa554 = () => import('..\\pages\\webInfo.vue' /* webpackChunkName: "pages\\webInfo" */).then(m => m.default || m)
const _12fe63f4 = () => import('..\\pages\\webInfo\\list.vue' /* webpackChunkName: "pages\\webInfo\\list" */).then(m => m.default || m)
const _59c479d5 = () => import('..\\pages\\webInfo\\list\\_type.vue' /* webpackChunkName: "pages\\webInfo\\list\\_type" */).then(m => m.default || m)
const _d8930dd2 = () => import('..\\pages\\webInfo\\help.vue' /* webpackChunkName: "pages\\webInfo\\help" */).then(m => m.default || m)
const _c512895e = () => import('..\\pages\\webInfo\\help\\issues.vue' /* webpackChunkName: "pages\\webInfo\\help\\issues" */).then(m => m.default || m)
const _6b7eddf8 = () => import('..\\pages\\webInfo\\help\\aboutUs.vue' /* webpackChunkName: "pages\\webInfo\\help\\aboutUs" */).then(m => m.default || m)
const _4eae5d23 = () => import('..\\pages\\webInfo\\detail\\_id.vue' /* webpackChunkName: "pages\\webInfo\\detail\\_id" */).then(m => m.default || m)
const _17fc5d6b = () => import('..\\pages\\notFound.vue' /* webpackChunkName: "pages\\notFound" */).then(m => m.default || m)
const _add83714 = () => import('..\\pages\\computeTransfer.vue' /* webpackChunkName: "pages\\computeTransfer" */).then(m => m.default || m)
const _510356b5 = () => import('..\\pages\\computeTransfer\\list\\_type.vue' /* webpackChunkName: "pages\\computeTransfer\\list\\_type" */).then(m => m.default || m)
const _45ed3a03 = () => import('..\\pages\\computeTransfer\\detail\\_id.vue' /* webpackChunkName: "pages\\computeTransfer\\detail\\_id" */).then(m => m.default || m)
const _b03a73d6 = () => import('..\\pages\\bdc.vue' /* webpackChunkName: "pages\\bdc" */).then(m => m.default || m)
const _e01c7fb8 = () => import('..\\pages\\auth.vue' /* webpackChunkName: "pages\\auth" */).then(m => m.default || m)
const _2b36c7cc = () => import('..\\pages\\auth\\regist.vue' /* webpackChunkName: "pages\\auth\\regist" */).then(m => m.default || m)
const _183a86f5 = () => import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages\\auth\\login" */).then(m => m.default || m)
const _6762bc65 = () => import('..\\pages\\auth\\passwordRetrieval.vue' /* webpackChunkName: "pages\\auth\\passwordRetrieval" */).then(m => m.default || m)
const _2fe5ea7f = () => import('..\\pages\\cloudShop.vue' /* webpackChunkName: "pages\\cloudShop" */).then(m => m.default || m)
const _2ab104c7 = () => import('..\\pages\\user.vue' /* webpackChunkName: "pages\\user" */).then(m => m.default || m)
const _06632e7e = () => import('..\\pages\\user\\incomeChart.vue' /* webpackChunkName: "pages\\user\\incomeChart" */).then(m => m.default || m)
const _594942d3 = () => import('..\\pages\\user\\virtualCurrencyFlow.vue' /* webpackChunkName: "pages\\user\\virtualCurrencyFlow" */).then(m => m.default || m)
const _af1abed2 = () => import('..\\pages\\user\\moneyFlow.vue' /* webpackChunkName: "pages\\user\\moneyFlow" */).then(m => m.default || m)
const _30dad576 = () => import('..\\pages\\user\\account.vue' /* webpackChunkName: "pages\\user\\account" */).then(m => m.default || m)
const _6441d2bc = () => import('..\\pages\\user\\password.vue' /* webpackChunkName: "pages\\user\\password" */).then(m => m.default || m)
const _4e1ad416 = () => import('..\\pages\\user\\computeProperty.vue' /* webpackChunkName: "pages\\user\\computeProperty" */).then(m => m.default || m)
const _0ed1b8a2 = () => import('..\\pages\\user\\accountEvaluate.vue' /* webpackChunkName: "pages\\user\\accountEvaluate" */).then(m => m.default || m)
const _69b2e000 = () => import('..\\pages\\user\\lpCenter.vue' /* webpackChunkName: "pages\\user\\lpCenter" */).then(m => m.default || m)
const _6da06360 = () => import('..\\pages\\user\\message.vue' /* webpackChunkName: "pages\\user\\message" */).then(m => m.default || m)
const _2beef4ae = () => import('..\\pages\\user\\recharge.vue' /* webpackChunkName: "pages\\user\\recharge" */).then(m => m.default || m)
const _32227e1d = () => import('..\\pages\\user\\repaymentDetail\\_id.vue' /* webpackChunkName: "pages\\user\\repaymentDetail\\_id" */).then(m => m.default || m)
const _b3129f66 = () => import('..\\pages\\user\\repayment\\_type.vue' /* webpackChunkName: "pages\\user\\repayment\\_type" */).then(m => m.default || m)
const _2d02daca = () => import('..\\pages\\user\\order\\_status.vue' /* webpackChunkName: "pages\\user\\order\\_status" */).then(m => m.default || m)
const _126007c9 = () => import('..\\pages\\user\\messageDetail\\_id.vue' /* webpackChunkName: "pages\\user\\messageDetail\\_id" */).then(m => m.default || m)
const _5c992d3c = () => import('..\\pages\\user\\orderDetail\\_id.vue' /* webpackChunkName: "pages\\user\\orderDetail\\_id" */).then(m => m.default || m)
const _22c02650 = () => import('..\\pages\\computeShop\\detail\\_id.vue' /* webpackChunkName: "pages\\computeShop\\detail\\_id" */).then(m => m.default || m)
const _0c93ecec = () => import('..\\pages\\computeShop\\list\\_type.vue' /* webpackChunkName: "pages\\computeShop\\list\\_type" */).then(m => m.default || m)



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
			component: _2c9d49f4,
			name: "index"
		},
		{
			path: "/webInfo",
			component: _cccfa554,
			name: "webInfo",
			children: [
				{
					path: "list",
					component: _12fe63f4,
					name: "webInfo-list",
					children: [
						{
							path: ":type?",
							component: _59c479d5,
							name: "webInfo-list-type"
						}
					]
				},
				{
					path: "help",
					component: _d8930dd2,
					name: "webInfo-help",
					children: [
						{
							path: "issues",
							component: _c512895e,
							name: "webInfo-help-issues"
						},
						{
							path: "aboutUs",
							component: _6b7eddf8,
							name: "webInfo-help-aboutUs"
						}
					]
				},
				{
					path: "detail/:id?",
					component: _4eae5d23,
					name: "webInfo-detail-id"
				}
			]
		},
		{
			path: "/notFound",
			component: _17fc5d6b,
			name: "notFound"
		},
		{
			path: "/computeTransfer",
			component: _add83714,
			name: "computeTransfer",
			children: [
				{
					path: "list/:type?",
					component: _510356b5,
					name: "computeTransfer-list-type"
				},
				{
					path: "detail/:id?",
					component: _45ed3a03,
					name: "computeTransfer-detail-id"
				}
			]
		},
		{
			path: "/bdc",
			component: _b03a73d6,
			name: "bdc"
		},
		{
			path: "/auth",
			component: _e01c7fb8,
			name: "auth",
			children: [
				{
					path: "regist",
					component: _2b36c7cc,
					name: "auth-regist"
				},
				{
					path: "login",
					component: _183a86f5,
					name: "auth-login"
				},
				{
					path: "passwordRetrieval",
					component: _6762bc65,
					name: "auth-passwordRetrieval"
				}
			]
		},
		{
			path: "/cloudShop",
			component: _2fe5ea7f,
			name: "cloudShop"
		},
		{
			path: "/user",
			component: _2ab104c7,
			name: "user",
			children: [
				{
					path: "incomeChart",
					component: _06632e7e,
					name: "user-incomeChart"
				},
				{
					path: "virtualCurrencyFlow",
					component: _594942d3,
					name: "user-virtualCurrencyFlow"
				},
				{
					path: "moneyFlow",
					component: _af1abed2,
					name: "user-moneyFlow"
				},
				{
					path: "account",
					component: _30dad576,
					name: "user-account"
				},
				{
					path: "password",
					component: _6441d2bc,
					name: "user-password"
				},
				{
					path: "computeProperty",
					component: _4e1ad416,
					name: "user-computeProperty"
				},
				{
					path: "accountEvaluate",
					component: _0ed1b8a2,
					name: "user-accountEvaluate"
				},
				{
					path: "lpCenter",
					component: _69b2e000,
					name: "user-lpCenter"
				},
				{
					path: "message",
					component: _6da06360,
					name: "user-message"
				},
				{
					path: "recharge",
					component: _2beef4ae,
					name: "user-recharge"
				},
				{
					path: "repaymentDetail/:id?",
					component: _32227e1d,
					name: "user-repaymentDetail-id"
				},
				{
					path: "repayment/:type?",
					component: _b3129f66,
					name: "user-repayment-type"
				},
				{
					path: "order/:status?",
					component: _2d02daca,
					name: "user-order-status"
				},
				{
					path: "messageDetail/:id?",
					component: _126007c9,
					name: "user-messageDetail-id"
				},
				{
					path: "orderDetail/:id?",
					component: _5c992d3c,
					name: "user-orderDetail-id"
				}
			]
		},
		{
			path: "/computeShop/detail/:id?",
			component: _22c02650,
			name: "computeShop-detail-id"
		},
		{
			path: "/computeShop/list/:type?",
			component: _0c93ecec,
			name: "computeShop-list-type"
		}
    ],
    fallback: false
  })
}
