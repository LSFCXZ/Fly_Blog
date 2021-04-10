import axios from '@/utils/request'

/**
 * 验证码接口
 * @param {*} sid 唯一的标识
 * @returns
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
// 忘记密码
const forget = (option) => {
  return axios.post('/login/forget', {
    ...option
  })
}
// 注册验证邮箱
const verification = (option) => {
  return axios.post('/login/ver', {
    ...option
  })
}
// 登录
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}
/**
 * 注册接口
 * @param {} regInfo 用户注册信息
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}
export {
  getCode,
  forget,
  verification,
  login,
  reg
}
