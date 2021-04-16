import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/axios'
import '@/utils/veevalidate'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'
import filters from './utils/filter'
import directives from './utils/directives'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import BackTop from './components/modules/backTop/BackTop.vue'
// 循环绑定keys
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
Vue.use(BackTop)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Alert)
Vue.use(Pop)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
