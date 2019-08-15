
import Vue from 'vue' 
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  showFooter: true,
  changableNum: 0,
  count: 0
}
// const getters = {   //实时监听state值的变化(最新状态)
//   isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
//     return state.showFooter
//   },
//   getChangedNum(state){  //方法名随意,主要是用来承载变化的changableNum的值
//     return state.changebleNum
//   },
//   page(state) {
//     return state.count
//   }
// }
const mutations = {
  getNunver (state, sum) {
    state.count = sum
  }
}
const store = new Vuex.Store({
  state,
  mutations
})
export default store
