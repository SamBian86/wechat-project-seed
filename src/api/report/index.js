import request from '@/utils/request'

// 用户健康报告

// 用户微信信息-获取头像入口
// GET
// /api/report/wechat/info
export function getWechatInfoByOpenid(params = {}) {
  return request({
    url: `/api/report/wechat/info`,
    method: 'get',
    params
  })
}

// 用户报告首页
// GET
// /api/report/index
export function getReportIndex(params = {}) {
  return request({
    url: `/api/report/index`,
    method: 'get',
    params
  })
}

// 报告详情
// GET
// /api/report/{id}
export function getReportById(params = {}) {
  const { id } = params
  return request({
    url: `/api/report/${id}`,
    method: 'get'
  })
}
