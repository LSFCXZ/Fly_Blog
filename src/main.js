import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/axios'
import '@/utils/veevalidate'
import Alert from './components/modules/alert'
Vue.config.productionTip = false
Vue.use(Alert)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
