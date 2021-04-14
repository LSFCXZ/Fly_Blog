import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // 获取解析token的到期时间
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  // 这里判断是否需要鉴权
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      // console.log(isLogin)
      next()
    } else {
      // console.log(isLogin)
      next('/login')
    }
  } else {
    next()
  }
})
export default router
