import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/axios'
import '@/utils/veevalidate'
import Alert from './components/modules/alert'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import BackTop from './components/modules/backTop/BackTop.vue'
Vue.use(BackTop)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Alert)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
