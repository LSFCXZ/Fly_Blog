import HttpRequest from './axios'
import config from '../config/index'
// 定义baseUrl
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// 实例化HttpRequest
const axios = new HttpRequest(baseUrl)
export default axios
