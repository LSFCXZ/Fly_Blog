import axios from '../utils/request'
// import store from '../store/index'
import qs from 'qs'
// 用户签到
const userSign = () => {
  // const headers = {
  //   Authorization: 'Bearer ' + store.state.token,
  //   'Content-Type': 'application/json'
  // }
  return axios.get('/user/fav')
}
// 更新用户信息
const updateUserInfo = (data) => {
  return axios.post('/user/basic', data)
}
// 确认修改用户名
const updateUsername = (data) => {
  return axios.get('/public/resetEmail?' + qs.stringify(data))
}
// 修改密码
const changePassword = (data) => {
  return axios.post('user/changePassword', {
    ...data
  })
}
// 获取用户的基本信息
const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data))

// 收藏||取消收藏
const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data))
// 获取收藏列表
const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data))
export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePassword,
  getInfo,
  addCollect,
  getCollect
}
