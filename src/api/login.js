import axios from 'axios'

// 验证码
const getCode = async () => {
  let result = ''
  try {
    result = await axios.get('/public/getCaptcha')
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
}
// 忘记密码
const forget = async (option) => {
  let result = ''
  try {
    result = await axios.post('/login/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
}
// 注册验证邮箱
const verification = async (option) => {
  let result = ''
  try {
    result = await axios.post('/login/ver', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
}
export {
  getCode,
  forget,
  verification
}
