import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2e0797a6 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _6e0da899 = () => import('..\\pages\\index\\pc.vue' /* webpackChunkName: "pages\\index\\pc" */).then(m => m.default || m)
const _5885c4c8 = () => import('..\\pages\\index\\mobile.vue' /* webpackChunkName: "pages\\index\\mobile" */).then(m => m.default || m)
const _2151c1f6 = () => import('..\\pages\\webInfo.vue' /* webpackChunkName: "pages\\webInfo" */).then(m => m.default || m)
const _723295a0 = () => import('..\\pages\\webInfo\\issues.vue' /* webpackChunkName: "pages\\webInfo\\issues" */).then(m => m.default || m)
const _626059f6 = () => import('..\\pages\\webInfo\\aboutUs.vue' /* webpackChunkName: "pages\\webInfo\\aboutUs" */).then(m => m.default || m)
const _49d96935 = () => import('..\\pages\\webInfo\\list\\_type.vue' /* webpackChunkName: "pages\\webInfo\\list\\_type" */).then(m => m.default || m)
const _3ec34c83 = () => import('..\\pages\\webInfo\\detail\\_id.vue' /* webpackChunkName: "pages\\webInfo\\detail\\_id" */).then(m => m.default || m)
const _4623d62e = () => import('..\\pages\\webInfo\\issuesDetail\\_id.vue' /* webpackChunkName: "pages\\webInfo\\issuesDetail\\_id" */).then(m => m.default || m)
const _739944ea = () => import('..\\pages\\compute.vue' /* webpackChunkName: "pages\\compute" */).then(m => m.default || m)
const _4b5e97b2 = () => import('..\\pages\\user.vue' /* webpackChunkName: "pages\\user" */).then(m => m.default || m)
const _73fa7216 = () => import('..\\pages\\user\\account.vue' /* webpackChunkName: "pages\\user\\account" */).then(m => m.default || m)
const _607a211a = () => import('..\\pages\\user\\virtualCurrencyFlow.vue' /* webpackChunkName: "pages\\user\\virtualCurrencyFlow" */).then(m => m.default || m)
const _bbc4d592 = () => import('..\\pages\\user\\moneyFlow.vue' /* webpackChunkName: "pages\\user\\moneyFlow" */).then(m => m.default || m)
const _237b6f46 = () => import('..\\pages\\user\\address.vue' /* webpackChunkName: "pages\\user\\address" */).then(m => m.default || m)
const _41237b1e = () => import('..\\pages\\user\\incomeChart.vue' /* webpackChunkName: "pages\\user\\incomeChart" */).then(m => m.default || m)
const _4cc2ec0e = () => import('..\\pages\\user\\recharge.vue' /* webpackChunkName: "pages\\user\\recharge" */).then(m => m.default || m)
const _0b20204f = () => import('..\\pages\\user\\accountEvaluate.vue' /* webpackChunkName: "pages\\user\\accountEvaluate" */).then(m => m.default || m)
const _2908dad6 = () => import('..\\pages\\user\\computeProperty.vue' /* webpackChunkName: "pages\\user\\computeProperty" */).then(m => m.default || m)
const _0c4f6af0 = () => import('..\\pages\\user\\message.vue' /* webpackChunkName: "pages\\user\\message" */).then(m => m.default || m)
const _280af140 = () => import('..\\pages\\user\\lpCenter.vue' /* webpackChunkName: "pages\\user\\lpCenter" */).then(m => m.default || m)
const _435fdb29 = () => import('..\\pages\\user\\calculator.vue' /* webpackChunkName: "pages\\user\\calculator" */).then(m => m.default || m)
const _2299e3fc = () => import('..\\pages\\user\\password.vue' /* webpackChunkName: "pages\\user\\password" */).then(m => m.default || m)
const _ea433506 = () => import('..\\pages\\user\\repaymentDetail\\_id.vue' /* webpackChunkName: "pages\\user\\repaymentDetail\\_id" */).then(m => m.default || m)
const _35e570a6 = () => import('..\\pages\\user\\repayment\\_type.vue' /* webpackChunkName: "pages\\user\\repayment\\_type" */).then(m => m.default || m)
const _1d17ca2a = () => import('..\\pages\\user\\order\\_status.vue' /* webpackChunkName: "pages\\user\\order\\_status" */).then(m => m.default || m)
const _05ae4729 = () => import('..\\pages\\user\\messageDetail\\_id.vue' /* webpackChunkName: "pages\\user\\messageDetail\\_id" */).then(m => m.default || m)
const _104a00c2 = () => import('..\\pages\\user\\orderDetail\\_id.vue' /* webpackChunkName: "pages\\user\\orderDetail\\_id" */).then(m => m.default || m)
const _34fb7eb2 = () => import('..\\pages\\transaction.vue' /* webpackChunkName: "pages\\transaction" */).then(m => m.default || m)
const _3f916f84 = () => import('..\\pages\\auth.vue' /* webpackChunkName: "pages\\auth" */).then(m => m.default || m)
const _26e2290c = () => import('..\\pages\\auth\\regist.vue' /* webpackChunkName: "pages\\auth\\regist" */).then(m => m.default || m)
const _49d8cb95 = () => import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages\\auth\\login" */).then(m => m.default || m)
const _08c1ddf6 = () => import('..\\pages\\auth\\passwordRetrieval.vue' /* webpackChunkName: "pages\\auth\\passwordRetrieval" */).then(m => m.default || m)
const _69f13f98 = () => import('..\\pages\\quickNews.vue' /* webpackChunkName: "pages\\quickNews" */).then(m => m.default || m)
const _2bd87569 = () => import('..\\pages\\minerShop.vue' /* webpackChunkName: "pages\\minerShop" */).then(m => m.default || m)
const _1a78df8e = () => import('..\\pages\\minerShop\\mining.vue' /* webpackChunkName: "pages\\minerShop\\mining" */).then(m => m.default || m)
const _ba01dc72 = () => import('..\\pages\\minerShop\\list.vue' /* webpackChunkName: "pages\\minerShop\\list" */).then(m => m.default || m)
const _507c8338 = () => import('..\\pages\\minerShop\\activity.vue' /* webpackChunkName: "pages\\minerShop\\activity" */).then(m => m.default || m)
const _eecde820 = () => import('..\\pages\\minerShop\\detail\\_id.vue' /* webpackChunkName: "pages\\minerShop\\detail\\_id" */).then(m => m.default || m)
const _2423c93a = () => import('..\\pages\\minerShop\\miner\\_type.vue' /* webpackChunkName: "pages\\minerShop\\miner\\_type" */).then(m => m.default || m)
const _5da00c42 = () => import('..\\pages\\industryInformation.vue' /* webpackChunkName: "pages\\industryInformation" */).then(m => m.default || m)
const _f115466a = () => import('..\\pages\\notFound.vue' /* webpackChunkName: "pages\\notFound" */).then(m => m.default || m)
const _1040aa96 = () => import('..\\pages\\bdc.vue' /* webpackChunkName: "pages\\bdc" */).then(m => m.default || m)
const _9eaa3926 = () => import('..\\pages\\currency.vue' /* webpackChunkName: "pages\\currency" */).then(m => m.default || m)
const _3788c043 = () => import('..\\pages\\computeChart.vue' /* webpackChunkName: "pages\\computeChart" */).then(m => m.default || m)
const _6cfd155c = () => import('..\\pages\\mobile\\administration.vue' /* webpackChunkName: "pages\\mobile\\administration" */).then(m => m.default || m)
const _7bb6a23f = () => import('..\\pages\\mobile\\help.vue' /* webpackChunkName: "pages\\mobile\\help" */).then(m => m.default || m)
const _99854bc4 = () => import('..\\pages\\mobile\\information.vue' /* webpackChunkName: "pages\\mobile\\information" */).then(m => m.default || m)
const _d6f1e00a = () => import('..\\pages\\digitalCurrency\\list.vue' /* webpackChunkName: "pages\\digitalCurrency\\list" */).then(m => m.default || m)
const _1c31faf6 = () => import('..\\pages\\mobile\\advice.vue' /* webpackChunkName: "pages\\mobile\\advice" */).then(m => m.default || m)
const _6e042fe0 = () => import('..\\pages\\digitalCurrency\\pc.vue' /* webpackChunkName: "pages\\digitalCurrency\\pc" */).then(m => m.default || m)
const _b1baa962 = () => import('..\\pages\\manufacturer\\mobile.vue' /* webpackChunkName: "pages\\manufacturer\\mobile" */).then(m => m.default || m)
const _1ee8a2ea = () => import('..\\pages\\manufacturer\\list.vue' /* webpackChunkName: "pages\\manufacturer\\list" */).then(m => m.default || m)
const _68c91bc8 = () => import('..\\pages\\computeNews\\list.vue' /* webpackChunkName: "pages\\computeNews\\list" */).then(m => m.default || m)
const _ccd58fdc = () => import('..\\pages\\mobile\\anuFacturermobile.vue' /* webpackChunkName: "pages\\mobile\\anuFacturermobile" */).then(m => m.default || m)
const _7b01a979 = () => import('..\\pages\\equipmentEvaluate\\list.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\list" */).then(m => m.default || m)
const _86eac142 = () => import('..\\pages\\equipments\\list.vue' /* webpackChunkName: "pages\\equipments\\list" */).then(m => m.default || m)
const _308e2ac0 = () => import('..\\pages\\manufacturer\\pc.vue' /* webpackChunkName: "pages\\manufacturer\\pc" */).then(m => m.default || m)
const _39cb70bf = () => import('..\\pages\\digitalCurrency\\mobile.vue' /* webpackChunkName: "pages\\digitalCurrency\\mobile" */).then(m => m.default || m)
const _7ca63730 = () => import('..\\pages\\mobile\\personcenter.vue' /* webpackChunkName: "pages\\mobile\\personcenter" */).then(m => m.default || m)
const _131b24d6 = () => import('..\\pages\\mobile\\notice.vue' /* webpackChunkName: "pages\\mobile\\notice" */).then(m => m.default || m)
const _7351385a = () => import('..\\pages\\mobile\\property.vue' /* webpackChunkName: "pages\\mobile\\property" */).then(m => m.default || m)
const _6c05a2bd = () => import('..\\pages\\equipmentEvaluate\\mobile.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\mobile" */).then(m => m.default || m)
const _5e659237 = () => import('..\\pages\\mobile\\bdcForm.vue' /* webpackChunkName: "pages\\mobile\\bdcForm" */).then(m => m.default || m)
const _c0a66de4 = () => import('..\\pages\\equipmentEvaluate\\pc.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\pc" */).then(m => m.default || m)
const _35696aa8 = () => import('..\\pages\\manufacturer\\detail\\_id.vue' /* webpackChunkName: "pages\\manufacturer\\detail\\_id" */).then(m => m.default || m)
const _60178358 = () => import('..\\pages\\equipments\\detail\\_id.vue' /* webpackChunkName: "pages\\equipments\\detail\\_id" */).then(m => m.default || m)
const _165fc7fe = () => import('..\\pages\\equipmentEvaluate\\detail\\_id.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\detail\\_id" */).then(m => m.default || m)
const _b1d6dc0a = () => import('..\\pages\\computeNews\\detail\\_id.vue' /* webpackChunkName: "pages\\computeNews\\detail\\_id" */).then(m => m.default || m)



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
			component: _2e0797a6,
			name: "index",
			children: [
				{
					path: "pc",
					component: _6e0da899,
					name: "index-pc"
				},
				{
					path: "mobile",
					component: _5885c4c8,
					name: "index-mobile"
				}
			]
		},
		{
			path: "/webInfo",
			component: _2151c1f6,
			name: "webInfo",
			children: [
				{
					path: "issues",
					component: _723295a0,
					name: "webInfo-issues"
				},
				{
					path: "aboutUs",
					component: _626059f6,
					name: "webInfo-aboutUs"
				},
				{
					path: "list/:type?",
					component: _49d96935,
					name: "webInfo-list-type"
				},
				{
					path: "detail/:id?",
					component: _3ec34c83,
					name: "webInfo-detail-id"
				},
				{
					path: "issuesDetail/:id?",
					component: _4623d62e,
					name: "webInfo-issuesDetail-id"
				}
			]
		},
		{
			path: "/compute",
			component: _739944ea,
			name: "compute"
		},
		{
			path: "/user",
			component: _4b5e97b2,
			name: "user",
			children: [
				{
					path: "account",
					component: _73fa7216,
					name: "user-account"
				},
				{
					path: "virtualCurrencyFlow",
					component: _607a211a,
					name: "user-virtualCurrencyFlow"
				},
				{
					path: "moneyFlow",
					component: _bbc4d592,
					name: "user-moneyFlow"
				},
				{
					path: "address",
					component: _237b6f46,
					name: "user-address"
				},
				{
					path: "incomeChart",
					component: _41237b1e,
					name: "user-incomeChart"
				},
				{
					path: "recharge",
					component: _4cc2ec0e,
					name: "user-recharge"
				},
				{
					path: "accountEvaluate",
					component: _0b20204f,
					name: "user-accountEvaluate"
				},
				{
					path: "computeProperty",
					component: _2908dad6,
					name: "user-computeProperty"
				},
				{
					path: "message",
					component: _0c4f6af0,
					name: "user-message"
				},
				{
					path: "lpCenter",
					component: _280af140,
					name: "user-lpCenter"
				},
				{
					path: "calculator",
					component: _435fdb29,
					name: "user-calculator"
				},
				{
					path: "password",
					component: _2299e3fc,
					name: "user-password"
				},
				{
					path: "repaymentDetail/:id?",
					component: _ea433506,
					name: "user-repaymentDetail-id"
				},
				{
					path: "repayment/:type?",
					component: _35e570a6,
					name: "user-repayment-type"
				},
				{
					path: "order/:status?",
					component: _1d17ca2a,
					name: "user-order-status"
				},
				{
					path: "messageDetail/:id?",
					component: _05ae4729,
					name: "user-messageDetail-id"
				},
				{
					path: "orderDetail/:id?",
					component: _104a00c2,
					name: "user-orderDetail-id"
				}
			]
		},
		{
			path: "/transaction",
			component: _34fb7eb2,
			name: "transaction"
		},
		{
			path: "/auth",
			component: _3f916f84,
			name: "auth",
			children: [
				{
					path: "regist",
					component: _26e2290c,
					name: "auth-regist"
				},
				{
					path: "login",
					component: _49d8cb95,
					name: "auth-login"
				},
				{
					path: "passwordRetrieval",
					component: _08c1ddf6,
					name: "auth-passwordRetrieval"
				}
			]
		},
		{
			path: "/quickNews",
			component: _69f13f98,
			name: "quickNews"
		},
		{
			path: "/minerShop",
			component: _2bd87569,
			name: "minerShop",
			children: [
				{
					path: "mining",
					component: _1a78df8e,
					name: "minerShop-mining"
				},
				{
					path: "list",
					component: _ba01dc72,
					name: "minerShop-list"
				},
				{
					path: "activity",
					component: _507c8338,
					name: "minerShop-activity"
				},
				{
					path: "detail/:id?",
					component: _eecde820,
					name: "minerShop-detail-id"
				},
				{
					path: "miner/:type?",
					component: _2423c93a,
					name: "minerShop-miner-type"
				}
			]
		},
		{
			path: "/industryInformation",
			component: _5da00c42,
			name: "industryInformation"
		},
		{
			path: "/notFound",
			component: _f115466a,
			name: "notFound"
		},
		{
			path: "/bdc",
			component: _1040aa96,
			name: "bdc"
		},
		{
			path: "/currency",
			component: _9eaa3926,
			name: "currency"
		},
		{
			path: "/computeChart",
			component: _3788c043,
			name: "computeChart"
		},
		{
			path: "/mobile/administration",
			component: _6cfd155c,
			name: "mobile-administration"
		},
		{
			path: "/mobile/help",
			component: _7bb6a23f,
			name: "mobile-help"
		},
		{
			path: "/mobile/information",
			component: _99854bc4,
			name: "mobile-information"
		},
		{
			path: "/digitalCurrency/list",
			component: _d6f1e00a,
			name: "digitalCurrency-list"
		},
		{
			path: "/mobile/advice",
			component: _1c31faf6,
			name: "mobile-advice"
		},
		{
			path: "/digitalCurrency/pc",
			component: _6e042fe0,
			name: "digitalCurrency-pc"
		},
		{
			path: "/manufacturer/mobile",
			component: _b1baa962,
			name: "manufacturer-mobile"
		},
		{
			path: "/manufacturer/list",
			component: _1ee8a2ea,
			name: "manufacturer-list"
		},
		{
			path: "/computeNews/list",
			component: _68c91bc8,
			name: "computeNews-list"
		},
		{
			path: "/mobile/anuFacturermobile",
			component: _ccd58fdc,
			name: "mobile-anuFacturermobile"
		},
		{
			path: "/equipmentEvaluate/list",
			component: _7b01a979,
			name: "equipmentEvaluate-list"
		},
		{
			path: "/equipments/list",
			component: _86eac142,
			name: "equipments-list"
		},
		{
			path: "/manufacturer/pc",
			component: _308e2ac0,
			name: "manufacturer-pc"
		},
		{
			path: "/digitalCurrency/mobile",
			component: _39cb70bf,
			name: "digitalCurrency-mobile"
		},
		{
			path: "/mobile/personcenter",
			component: _7ca63730,
			name: "mobile-personcenter"
		},
		{
			path: "/mobile/notice",
			component: _131b24d6,
			name: "mobile-notice"
		},
		{
			path: "/mobile/property",
			component: _7351385a,
			name: "mobile-property"
		},
		{
			path: "/equipmentEvaluate/mobile",
			component: _6c05a2bd,
			name: "equipmentEvaluate-mobile"
		},
		{
			path: "/mobile/bdcForm",
			component: _5e659237,
			name: "mobile-bdcForm"
		},
		{
			path: "/equipmentEvaluate/pc",
			component: _c0a66de4,
			name: "equipmentEvaluate-pc"
		},
		{
			path: "/manufacturer/detail/:id?",
			component: _35696aa8,
			name: "manufacturer-detail-id"
		},
		{
			path: "/equipments/detail/:id?",
			component: _60178358,
			name: "equipments-detail-id"
		},
		{
			path: "/equipmentEvaluate/detail/:id?",
			component: _165fc7fe,
			name: "equipmentEvaluate-detail-id"
		},
		{
			path: "/computeNews/detail/:id?",
			component: _b1d6dc0a,
			name: "computeNews-detail-id"
		}
    ],
    fallback: false
  })
}
