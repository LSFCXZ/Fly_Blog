import axios from '../utils/request'
import qs from 'qs'

// 获取签到排行
const getHotSignRecord = (data) => {
  return axios.get('/public/hotSignRecord?' + qs.stringify(data))
}
export { getHotSignRecord }
