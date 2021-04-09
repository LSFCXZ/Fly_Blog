import { extend, localize } from 'vee-validate'
// eslint-disable-next-line
import { required, email, min, max, length, confirmed, is_not } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)
extend('is_not', is_not)
// 自定义规则
extend('name', {
  validate: value => {
    return !(/^\d+/).test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    username: '用户名',
    code: '验证码',
    name: '昵称',
    password: '密码',
    usernamecode: '邮箱验证码',
    oldpassword: '旧密码',
    title: '标题',
    catalog: '分类'
  },
  fields: {
    catalog: {
      is_not: '请选择{_field_}'
    },
    password: {
      min: (field, { length }) => {
        return `请输入至少${length}位数`
      },
      confirmed: (field, { target }) => {
        return `两次输入的${field}不一致！`
      }
    },
    code: {
      length: '请输入4位数的验证码'
    }
  }
})
