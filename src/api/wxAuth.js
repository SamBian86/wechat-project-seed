import request from '@/utils/request'

export function getWxSign(params) {
  return request({
    url: `/wxapi/sign`,
    method: 'get',
    params
  })
}

export function getWxShareInfo(params) {
  return request({
    url: `/wxapi/share`,
    method: 'get',
    params
  })
}
