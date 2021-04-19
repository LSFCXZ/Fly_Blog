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
// 更新评论
const updateComment = (data) => axios.post('/comments/update', { ...data })
// 采纳最佳答案
const setCommentBest = (params) => axios.get('/comments/accept?' + qs.stringify(params))
export { getComments, addComment, updateComment, setCommentBest }
