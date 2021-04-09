export default {
  baseUrl: {
    dev: 'http://192.168.43.239:3000',
    pro: 'https://api.frontblog.top'
  },
  // 不需要鉴权的路径
  publicPath: [/^\/public/, /^\/login/]
}
