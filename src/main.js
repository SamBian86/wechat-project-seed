import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filters from './utils/filter'
Vue.config.productionTip = false
Vue.prototype.$activeColor = '#976db9 '

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
