export default {
  baseUrl: {
    // axios.defaults.baseURL = 'http://localhost:3000'
    dev: 'http://localhost:3000',
    pro: 'https://api.frontblog.top'
  },
  // 不需要鉴权的路径
  publicPath: [/^\/public/, /^\/login/]
}
