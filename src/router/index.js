import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Forget = () => import('../views/Forget.vue')
const Index = () => import('../views/channels/Index.vue')
const Template1 = () => import('../views/channels/Template1.vue')
Vue.use(VueRouter)

const routes = [
  // 首页路由
  {
    path: '/',
    // name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: 'index/:catalog', // 路由传参
        name: 'catalog',
        component: Template1
      }
    ]
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
  routes,
  linkExactActiveClass: 'layui-this'// 选中颜色
})

export default router
