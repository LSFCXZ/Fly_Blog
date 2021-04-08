import axios from 'axios'

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
export {
  getCode
}
