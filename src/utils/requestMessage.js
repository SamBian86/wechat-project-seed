const requestMessage = {
  500: '服务器内部异常',
  401: '未授权',
  403: '拒绝访问，没有权限',
  100005001: 'token不能为空',
  100005002: 'token失效，请重新登录',
  100005101: '手机号码获取失败',
  100005102: '您还不是我们的客户，暂时无法使用！',
  100005103: '客户信息不存在！',
  get(key) {
    return this[key]
  }
}

export default requestMessage
