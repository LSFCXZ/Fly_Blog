import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import Home from '../views/Home.vue'
// 登录注册忘记密码组件
const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Forget = () => import('../views/Forget.vue')
// 重置密码组件
const Reset = () => import('../views/Reset.vue')
// 确认修改用户名，邮箱组件
const Confirm = () => import('../views/Confirm.vue')
// 不同侧边栏组件
const Index = () => import('../views/channels/Index.vue')
const Template1 = () => import('../views/channels/Template1.vue')
// 个人中心组件
const User = () => import('../views/User.vue')
const Center = () => import('../views/Center.vue')
const UserCenter = () => import('../components/user/Center.vue')
const Settings = () => import('../components/user/Settings.vue')
const Posts = () => import('../components/user/Posts.vue')
const Msg = () => import('../components/user/Msg.vue')
const Others = () => import('../components/user/Others.vue')
const Myinfo = () => import('../components/user/common/Myinfo.vue')
const PicUpload = () => import('../components/user/common/PicUpload.vue')
const Password = () => import('../components/user/common/Password.vue')
const Accounts = () => import('../components/user/common/Accounts.vue')
const MyPost = () => import('../components/user/common/MyPost.vue')
const MyCollections = () => import('../components/user/common/MyCollections.vue')
// 发帖组件
const Add = () => import('../components/contents/Add.vue')
// 帖子详情组件
const Detail = () => import('../components/contents/Detail.vue')
// 404
const NoFound = () => import('@/views/NotFound.vue')
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
  },
  // 重置密码
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },
  // 确认修改用户名，邮箱
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  // 个人主页
  {
    path: '/user/:uid',
    name: 'user',
    props: true,
    component: User
  },
  // 用户中心
  {
    path: '/center',
    component: Center,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'set',
        // name: 'set',
        component: Settings,
        // 用户设置的子路由
        children: [
          // 我的资料
          {
            path: '',
            name: 'info',
            component: Myinfo
          },
          // 我的头像
          {
            path: 'picUpload',
            name: 'picUpload',
            component: PicUpload
          },
          // 修改密码
          {
            path: 'password',
            name: 'password',
            component: Password
          },
          // 账号绑定
          {
            path: 'accounts',
            name: 'accounts',
            component: Accounts
          }
        ]
      },
      {
        path: 'mypost',
        // name: 'mypost',
        component: Posts,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollections',
            name: 'mycollections',
            component: MyCollections
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  },
  // 发帖
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { requiresAuth: true }
  },
  // 帖子详情
  {
    path: '/detail/:tid',
    name: 'detail',
    component: Detail,
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: NoFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]
const router = new VueRouter({
  routes,
  linkExactActiveClass: 'layui-this'// 选中颜色
})

router.beforeEach((to, from, next) => {
  // const isLogin = store.state.isLogin
  // if (isLogin) {
  //   next()
  // } else {
  //   next('/')
  // }
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // 获取解析token的到期时间
    const payload = jwt.decode(token)
    // 判断jwt是否过期
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
