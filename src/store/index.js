import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isloading: false
  },
  mutations: {
    // 存放唯一标识
    setSid (state, value) {
      state.sid = value
    },
    // 存放token
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 保存用户信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 存放用户登录状态
    setIsLogin (state, value) {
      state.isLogin = value
      localStorage.setItem('isLogin', value)
    },
    setisloading (state, value) {
      // console.log('sts' + state)
      state.isloading = value
      localStorage.setItem('isloading', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
