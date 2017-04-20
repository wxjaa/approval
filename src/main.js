// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import { AjaxPlugin } from 'vux'
import store from './store/'
Vue.use(VueRouter)
Vue.use(AjaxPlugin)
const routes = [{
  path: '/',
  component: Home
}]
window.vue = new Vue()
const router = new VueRouter({
  routes,
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
