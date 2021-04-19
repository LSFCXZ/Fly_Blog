import axios from '../utils/request'
import qs from 'qs'
import store from '@/store'
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
/**
 * 图片上传接口
 */
const uploadImg = (formData) => {
  return axios.post('/content/upload', formData)
}
/**
 * 发帖
 */
const addPost = (data) => {
  return axios.post('/content/add', { ...data })
}
// 文章详情
const getDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('public/content/detail?tid=' + tid, headers)
}
// 编辑帖子
const updatePost = (data) => axios.post('/content/update', { ...data })
export { getList, getTips, getTop, getLinks, uploadImg, addPost, getDetail, updatePost }
