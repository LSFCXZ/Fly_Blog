const getParams = (key, url) => {
  // 构造一个含有目标参数的正则表达式对象
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  // 匹配目标参数
  const link = new URL(url)
  const r = link.search.substr(1).match(reg)
  // 返回参数值
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}
const getParam = (name, url) => {
  if (!url) url = location.href
  name = name.replace(/[\\[]/, '\\\\[').replace(/[\]]/, '\\\\]')
  var regexS = '[\\?&]' + name + '=([^&#]*)'
  var regex = new RegExp(regexS)
  var results = regex.exec(url)
  return results == null ? null : results[1]
}

export { getParams, getParam }
