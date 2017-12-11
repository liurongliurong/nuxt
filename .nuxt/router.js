import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2c9d49f4 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _2332880e = () => import('..\\pages\\index\\pc.vue' /* webpackChunkName: "pages\\index\\pc" */).then(m => m.default || m)
const _15662828 = () => import('..\\pages\\index\\mobile.vue' /* webpackChunkName: "pages\\index\\mobile" */).then(m => m.default || m)
const _cccfa554 = () => import('..\\pages\\webInfo.vue' /* webpackChunkName: "pages\\webInfo" */).then(m => m.default || m)
const _65887ee0 = () => import('..\\pages\\webInfo\\issues.vue' /* webpackChunkName: "pages\\webInfo\\issues" */).then(m => m.default || m)
const _d9c798b6 = () => import('..\\pages\\webInfo\\aboutUs.vue' /* webpackChunkName: "pages\\webInfo\\aboutUs" */).then(m => m.default || m)
const _73266afe = () => import('..\\pages\\webInfo\\issuesDetail.vue' /* webpackChunkName: "pages\\webInfo\\issuesDetail" */).then(m => m.default || m)
const _59c479d5 = () => import('..\\pages\\webInfo\\list\\_type.vue' /* webpackChunkName: "pages\\webInfo\\list\\_type" */).then(m => m.default || m)
const _4eae5d23 = () => import('..\\pages\\webInfo\\detail\\_id.vue' /* webpackChunkName: "pages\\webInfo\\detail\\_id" */).then(m => m.default || m)
const _3e79c8eb = () => import('..\\pages\\compute.vue' /* webpackChunkName: "pages\\compute" */).then(m => m.default || m)
const _2ab104c7 = () => import('..\\pages\\user.vue' /* webpackChunkName: "pages\\user" */).then(m => m.default || m)
const _30dad576 = () => import('..\\pages\\user\\account.vue' /* webpackChunkName: "pages\\user\\account" */).then(m => m.default || m)
const _594942d3 = () => import('..\\pages\\user\\virtualCurrencyFlow.vue' /* webpackChunkName: "pages\\user\\virtualCurrencyFlow" */).then(m => m.default || m)
const _af1abed2 = () => import('..\\pages\\user\\moneyFlow.vue' /* webpackChunkName: "pages\\user\\moneyFlow" */).then(m => m.default || m)
const _a9baa886 = () => import('..\\pages\\user\\address.vue' /* webpackChunkName: "pages\\user\\address" */).then(m => m.default || m)
const _06632e7e = () => import('..\\pages\\user\\incomeChart.vue' /* webpackChunkName: "pages\\user\\incomeChart" */).then(m => m.default || m)
const _2beef4ae = () => import('..\\pages\\user\\recharge.vue' /* webpackChunkName: "pages\\user\\recharge" */).then(m => m.default || m)
const _0ed1b8a2 = () => import('..\\pages\\user\\accountEvaluate.vue' /* webpackChunkName: "pages\\user\\accountEvaluate" */).then(m => m.default || m)
const _4e1ad416 = () => import('..\\pages\\user\\computeProperty.vue' /* webpackChunkName: "pages\\user\\computeProperty" */).then(m => m.default || m)
const _6da06360 = () => import('..\\pages\\user\\message.vue' /* webpackChunkName: "pages\\user\\message" */).then(m => m.default || m)
const _69b2e000 = () => import('..\\pages\\user\\lpCenter.vue' /* webpackChunkName: "pages\\user\\lpCenter" */).then(m => m.default || m)
const _07ac3bc9 = () => import('..\\pages\\user\\calculator.vue' /* webpackChunkName: "pages\\user\\calculator" */).then(m => m.default || m)
const _6441d2bc = () => import('..\\pages\\user\\password.vue' /* webpackChunkName: "pages\\user\\password" */).then(m => m.default || m)
const _32227e1d = () => import('..\\pages\\user\\repaymentDetail\\_id.vue' /* webpackChunkName: "pages\\user\\repaymentDetail\\_id" */).then(m => m.default || m)
const _b3129f66 = () => import('..\\pages\\user\\repayment\\_type.vue' /* webpackChunkName: "pages\\user\\repayment\\_type" */).then(m => m.default || m)
const _2d02daca = () => import('..\\pages\\user\\order\\_status.vue' /* webpackChunkName: "pages\\user\\order\\_status" */).then(m => m.default || m)
const _126007c9 = () => import('..\\pages\\user\\messageDetail\\_id.vue' /* webpackChunkName: "pages\\user\\messageDetail\\_id" */).then(m => m.default || m)
const _5c992d3c = () => import('..\\pages\\user\\orderDetail\\_id.vue' /* webpackChunkName: "pages\\user\\orderDetail\\_id" */).then(m => m.default || m)
const _035d3a12 = () => import('..\\pages\\transaction.vue' /* webpackChunkName: "pages\\transaction" */).then(m => m.default || m)
const _e01c7fb8 = () => import('..\\pages\\auth.vue' /* webpackChunkName: "pages\\auth" */).then(m => m.default || m)
const _2b36c7cc = () => import('..\\pages\\auth\\regist.vue' /* webpackChunkName: "pages\\auth\\regist" */).then(m => m.default || m)
const _183a86f5 = () => import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages\\auth\\login" */).then(m => m.default || m)
const _6762bc65 = () => import('..\\pages\\auth\\passwordRetrieval.vue' /* webpackChunkName: "pages\\auth\\passwordRetrieval" */).then(m => m.default || m)
const _4b607394 = () => import('..\\pages\\quickNews.vue' /* webpackChunkName: "pages\\quickNews" */).then(m => m.default || m)
const _a79cee6e = () => import('..\\pages\\minerShop.vue' /* webpackChunkName: "pages\\minerShop" */).then(m => m.default || m)
const _8ff978ce = () => import('..\\pages\\minerShop\\mining.vue' /* webpackChunkName: "pages\\minerShop\\mining" */).then(m => m.default || m)
const _ad57c5b2 = () => import('..\\pages\\minerShop\\list.vue' /* webpackChunkName: "pages\\minerShop\\list" */).then(m => m.default || m)
const _76c642d0 = () => import('..\\pages\\minerShop\\activity.vue' /* webpackChunkName: "pages\\minerShop\\activity" */).then(m => m.default || m)
const _4a027490 = () => import('..\\pages\\minerShop\\detail\\_id.vue' /* webpackChunkName: "pages\\minerShop\\detail\\_id" */).then(m => m.default || m)
const _59b1c6c3 = () => import('..\\pages\\minerShop\\miner\\_type.vue' /* webpackChunkName: "pages\\minerShop\\miner\\_type" */).then(m => m.default || m)
const _5c7f30bc = () => import('..\\pages\\industryInformation.vue' /* webpackChunkName: "pages\\industryInformation" */).then(m => m.default || m)
const _17fc5d6b = () => import('..\\pages\\notFound.vue' /* webpackChunkName: "pages\\notFound" */).then(m => m.default || m)
const _b03a73d6 = () => import('..\\pages\\bdc.vue' /* webpackChunkName: "pages\\bdc" */).then(m => m.default || m)
const _4131e40d = () => import('..\\pages\\currency.vue' /* webpackChunkName: "pages\\currency" */).then(m => m.default || m)
const _355e70e3 = () => import('..\\pages\\computeChart.vue' /* webpackChunkName: "pages\\computeChart" */).then(m => m.default || m)
const _5cd015f0 = () => import('..\\pages\\mobile\\personcenter.vue' /* webpackChunkName: "pages\\mobile\\personcenter" */).then(m => m.default || m)
const _a7f56980 = () => import('..\\pages\\manufacturer\\pc.vue' /* webpackChunkName: "pages\\manufacturer\\pc" */).then(m => m.default || m)
const _798c52df = () => import('..\\pages\\mobile\\help.vue' /* webpackChunkName: "pages\\mobile\\help" */).then(m => m.default || m)
const _0943f8d4 = () => import('..\\pages\\mobile\\advice.vue' /* webpackChunkName: "pages\\mobile\\advice" */).then(m => m.default || m)
const _4de647d9 = () => import('..\\pages\\mobile\\message.vue' /* webpackChunkName: "pages\\mobile\\message" */).then(m => m.default || m)
const _e5b86724 = () => import('..\\pages\\equipmentEvaluate\\pc.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\pc" */).then(m => m.default || m)
const _3d1e4370 = () => import('..\\pages\\digitalCurrency\\pc.vue' /* webpackChunkName: "pages\\digitalCurrency\\pc" */).then(m => m.default || m)
const _b4e1c7c2 = () => import('..\\pages\\digitalCurrency\\mobile.vue' /* webpackChunkName: "pages\\digitalCurrency\\mobile" */).then(m => m.default || m)
const _275db57e = () => import('..\\pages\\mobile\\information.vue' /* webpackChunkName: "pages\\mobile\\information" */).then(m => m.default || m)
const _3275564e = () => import('..\\pages\\equipmentEvaluate\\list.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\list" */).then(m => m.default || m)
const _2e667dfc = () => import('..\\pages\\mobile\\administration.vue' /* webpackChunkName: "pages\\mobile\\administration" */).then(m => m.default || m)
const _eab8771a = () => import('..\\pages\\mobile\\property.vue' /* webpackChunkName: "pages\\mobile\\property" */).then(m => m.default || m)
const _3e07ac45 = () => import('..\\pages\\mobile\\recharge.vue' /* webpackChunkName: "pages\\mobile\\recharge" */).then(m => m.default || m)
const _de49b508 = () => import('..\\pages\\computeNews\\list.vue' /* webpackChunkName: "pages\\computeNews\\list" */).then(m => m.default || m)
const _91e48822 = () => import('..\\pages\\manufacturer\\mobile.vue' /* webpackChunkName: "pages\\manufacturer\\mobile" */).then(m => m.default || m)
const _fe520002 = () => import('..\\pages\\equipments\\list.vue' /* webpackChunkName: "pages\\equipments\\list" */).then(m => m.default || m)
const _fc03d94a = () => import('..\\pages\\digitalCurrency\\list.vue' /* webpackChunkName: "pages\\digitalCurrency\\list" */).then(m => m.default || m)
const _1b71a514 = () => import('..\\pages\\mobile\\notice.vue' /* webpackChunkName: "pages\\mobile\\notice" */).then(m => m.default || m)
const _64ba9d97 = () => import('..\\pages\\mobile\\bdcForm.vue' /* webpackChunkName: "pages\\mobile\\bdcForm" */).then(m => m.default || m)
const _597b31aa = () => import('..\\pages\\manufacturer\\list.vue' /* webpackChunkName: "pages\\manufacturer\\list" */).then(m => m.default || m)
const _4d1e4840 = () => import('..\\pages\\mobile\\moneyFlow.vue' /* webpackChunkName: "pages\\mobile\\moneyFlow" */).then(m => m.default || m)
const _14e813c6 = () => import('..\\pages\\equipmentEvaluate\\mobile.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\mobile" */).then(m => m.default || m)
const _15434521 = () => import('..\\pages\\mobile\\order\\_status.vue' /* webpackChunkName: "pages\\mobile\\order\\_status" */).then(m => m.default || m)
const _a8facc0e = () => import('..\\pages\\mobile\\orderDetail\\_id.vue' /* webpackChunkName: "pages\\mobile\\orderDetail\\_id" */).then(m => m.default || m)
const _6ed19e0c = () => import('..\\pages\\manufacturer\\detail\\_id.vue' /* webpackChunkName: "pages\\manufacturer\\detail\\_id" */).then(m => m.default || m)
const _6849a290 = () => import('..\\pages\\equipments\\detail\\_id.vue' /* webpackChunkName: "pages\\equipments\\detail\\_id" */).then(m => m.default || m)
const _52b2dec4 = () => import('..\\pages\\equipmentEvaluate\\detail\\_id.vue' /* webpackChunkName: "pages\\equipmentEvaluate\\detail\\_id" */).then(m => m.default || m)
const _98735aca = () => import('..\\pages\\computeNews\\detail\\_id.vue' /* webpackChunkName: "pages\\computeNews\\detail\\_id" */).then(m => m.default || m)



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
			name: "index",
			children: [
				{
					path: "pc",
					component: _2332880e,
					name: "index-pc"
				},
				{
					path: "mobile",
					component: _15662828,
					name: "index-mobile"
				}
			]
		},
		{
			path: "/webInfo",
			component: _cccfa554,
			name: "webInfo",
			children: [
				{
					path: "issues",
					component: _65887ee0,
					name: "webInfo-issues"
				},
				{
					path: "aboutUs",
					component: _d9c798b6,
					name: "webInfo-aboutUs"
				},
				{
					path: "issuesDetail",
					component: _73266afe,
					name: "webInfo-issuesDetail"
				},
				{
					path: "list/:type?",
					component: _59c479d5,
					name: "webInfo-list-type"
				},
				{
					path: "detail/:id?",
					component: _4eae5d23,
					name: "webInfo-detail-id"
				}
			]
		},
		{
			path: "/compute",
			component: _3e79c8eb,
			name: "compute"
		},
		{
			path: "/user",
			component: _2ab104c7,
			name: "user",
			children: [
				{
					path: "account",
					component: _30dad576,
					name: "user-account"
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
					path: "address",
					component: _a9baa886,
					name: "user-address"
				},
				{
					path: "incomeChart",
					component: _06632e7e,
					name: "user-incomeChart"
				},
				{
					path: "recharge",
					component: _2beef4ae,
					name: "user-recharge"
				},
				{
					path: "accountEvaluate",
					component: _0ed1b8a2,
					name: "user-accountEvaluate"
				},
				{
					path: "computeProperty",
					component: _4e1ad416,
					name: "user-computeProperty"
				},
				{
					path: "message",
					component: _6da06360,
					name: "user-message"
				},
				{
					path: "lpCenter",
					component: _69b2e000,
					name: "user-lpCenter"
				},
				{
					path: "calculator",
					component: _07ac3bc9,
					name: "user-calculator"
				},
				{
					path: "password",
					component: _6441d2bc,
					name: "user-password"
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
			path: "/transaction",
			component: _035d3a12,
			name: "transaction"
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
			path: "/quickNews",
			component: _4b607394,
			name: "quickNews"
		},
		{
			path: "/minerShop",
			component: _a79cee6e,
			name: "minerShop",
			children: [
				{
					path: "mining",
					component: _8ff978ce,
					name: "minerShop-mining"
				},
				{
					path: "list",
					component: _ad57c5b2,
					name: "minerShop-list"
				},
				{
					path: "activity",
					component: _76c642d0,
					name: "minerShop-activity"
				},
				{
					path: "detail/:id?",
					component: _4a027490,
					name: "minerShop-detail-id"
				},
				{
					path: "miner/:type?",
					component: _59b1c6c3,
					name: "minerShop-miner-type"
				}
			]
		},
		{
			path: "/industryInformation",
			component: _5c7f30bc,
			name: "industryInformation"
		},
		{
			path: "/notFound",
			component: _17fc5d6b,
			name: "notFound"
		},
		{
			path: "/bdc",
			component: _b03a73d6,
			name: "bdc"
		},
		{
			path: "/currency",
			component: _4131e40d,
			name: "currency"
		},
		{
			path: "/computeChart",
			component: _355e70e3,
			name: "computeChart"
		},
		{
			path: "/mobile/personcenter",
			component: _5cd015f0,
			name: "mobile-personcenter"
		},
		{
			path: "/manufacturer/pc",
			component: _a7f56980,
			name: "manufacturer-pc"
		},
		{
			path: "/mobile/help",
			component: _798c52df,
			name: "mobile-help"
		},
		{
			path: "/mobile/advice",
			component: _0943f8d4,
			name: "mobile-advice"
		},
		{
			path: "/mobile/message",
			component: _4de647d9,
			name: "mobile-message"
		},
		{
			path: "/equipmentEvaluate/pc",
			component: _e5b86724,
			name: "equipmentEvaluate-pc"
		},
		{
			path: "/digitalCurrency/pc",
			component: _3d1e4370,
			name: "digitalCurrency-pc"
		},
		{
			path: "/digitalCurrency/mobile",
			component: _b4e1c7c2,
			name: "digitalCurrency-mobile"
		},
		{
			path: "/mobile/information",
			component: _275db57e,
			name: "mobile-information"
		},
		{
			path: "/equipmentEvaluate/list",
			component: _3275564e,
			name: "equipmentEvaluate-list"
		},
		{
			path: "/mobile/administration",
			component: _2e667dfc,
			name: "mobile-administration"
		},
		{
			path: "/mobile/property",
			component: _eab8771a,
			name: "mobile-property"
		},
		{
			path: "/mobile/recharge",
			component: _3e07ac45,
			name: "mobile-recharge"
		},
		{
			path: "/computeNews/list",
			component: _de49b508,
			name: "computeNews-list"
		},
		{
			path: "/manufacturer/mobile",
			component: _91e48822,
			name: "manufacturer-mobile"
		},
		{
			path: "/equipments/list",
			component: _fe520002,
			name: "equipments-list"
		},
		{
			path: "/digitalCurrency/list",
			component: _fc03d94a,
			name: "digitalCurrency-list"
		},
		{
			path: "/mobile/notice",
			component: _1b71a514,
			name: "mobile-notice"
		},
		{
			path: "/mobile/bdcForm",
			component: _64ba9d97,
			name: "mobile-bdcForm"
		},
		{
			path: "/manufacturer/list",
			component: _597b31aa,
			name: "manufacturer-list"
		},
		{
			path: "/mobile/moneyFlow",
			component: _4d1e4840,
			name: "mobile-moneyFlow"
		},
		{
			path: "/equipmentEvaluate/mobile",
			component: _14e813c6,
			name: "equipmentEvaluate-mobile"
		},
		{
			path: "/mobile/order/:status?",
			component: _15434521,
			name: "mobile-order-status"
		},
		{
			path: "/mobile/orderDetail/:id?",
			component: _a8facc0e,
			name: "mobile-orderDetail-id"
		},
		{
			path: "/manufacturer/detail/:id?",
			component: _6ed19e0c,
			name: "manufacturer-detail-id"
		},
		{
			path: "/equipments/detail/:id?",
			component: _6849a290,
			name: "equipments-detail-id"
		},
		{
			path: "/equipmentEvaluate/detail/:id?",
			component: _52b2dec4,
			name: "equipmentEvaluate-detail-id"
		},
		{
			path: "/computeNews/detail/:id?",
			component: _98735aca,
			name: "computeNews-detail-id"
		}
    ],
    fallback: false
  })
}
