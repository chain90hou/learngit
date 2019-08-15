// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/App'
import router from './router'
import axios from 'axios'
import VueRouter from 'vue-router'
import echarts from 'echarts';
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
// Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios

require('./mock/index')
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
