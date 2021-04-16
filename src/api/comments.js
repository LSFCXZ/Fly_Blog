import axios from '../utils/request'
import qs from 'qs'
// 文章评论接口
const getComments = (params) => {
  return axios.get('public/comments?' + qs.stringify(params))
}
// 添加评论
const addComment = (data) => {
  return axios.post('/comments/reply', { ...data })
}
export { getComments, addComment }
