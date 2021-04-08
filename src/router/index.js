import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Forget = () => import('../views/Forget.vue')
Vue.use(VueRouter)

const routes = [
  // 首页路由
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 注册
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
  // 找回密码
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  routes
})

export default router
