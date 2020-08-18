const app_token = 'app_token'
const app_token_type = 'app_token_type'
const app_openid = 'app_openid'
const share_path = 'share_path'
const share_back_type = 'share_back_type'
const callback_url = 'callback_url'
import { setStorage, getStorage } from '@/utils'

export function getAppToken() {
  return getStorage(app_token) || ''
}

export function setAppToken(data) {
  return setStorage(app_token, data)
}

export function getAppTokenType() {
  return getStorage(app_token_type) || ''
}

export function setAppTokenType(data) {
  return setStorage(app_token_type, data)
}

export function getAppOpenid() {
  return getStorage(app_openid) || ''
}

export function setAppOpenid(data) {
  return setStorage(app_openid, data)
}

export function getSharePath() {
  return getStorage(share_path) || ''
}

export function setSharePath(data) {
  return setStorage(share_path, data)
}

export function getShareBackType() {
  return getStorage(share_back_type) || ''
}

export function setShareBackType(data) {
  return setStorage(share_back_type, data)
}

export function getCallBackUrl() {
  return getStorage(callback_url) || ''
}

export function setCallBackUrl(data) {
  return setStorage(callback_url, data)
}
