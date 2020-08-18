import request from '@/utils/request'

// 用户认证管理

// 获取openid
// GET
// /api/auth/openid
export function getOpenidByCode(params = {}) {
  return request({
    url: `/api/auth/openid`,
    method: 'get',
    params
  })
}

// 登录短信
// GET
// /api/auth/sms/{mobile}
export function getSmsByMobile(params = {}) {
  const { mobile } = params
  return request({
    url: `/api/auth/sms/${mobile}`,
    method: 'get',
    params
  })
}

// 用户验证码登录
// POST
// /api/auth/login
export function login(data = {}) {
  return request({
    url: `/api/auth/login`,
    method: 'post',
    data
  })
}

// 用户退出登录
// POST
// /api/auth/logout
export function logout(params = {}) {
  return request({
    url: `/api/auth/logout`,
    method: 'post',
    params
  })
}
