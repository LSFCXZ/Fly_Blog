import axios from '../utils/request'
import qs from 'qs'
/**
 * 获取帖子列表
 * 使用qs拼接参数
 * @param {Object} options 获取帖子列表参数
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
// 温馨通道
const getTips = () => {
  return axios.get('/public/tips')
}
// 本周热议
const getTop = () => {
  return axios.get('/public/topweek')
}
// 友情链接
const getLinks = () => {
  return axios.get('/public/links')
}
export { getList, getTips, getTop, getLinks }
