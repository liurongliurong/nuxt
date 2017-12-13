import wrapper from './pullUpPullDown.vue'
let install = function(Vue, option){
  Vue.mixin({
    components:{wrapper} 
  })
}
export default{ install }
