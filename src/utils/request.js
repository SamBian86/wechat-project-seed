import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
import { Notify, Dialog } from 'vant'
import { getAppToken, getAppOpenid } from '@/utils/storage'
Vue.use(Notify).use(Dialog)

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

const checkToken = function() {
  if (getAppToken() === '' || getAppOpenid() === '') {
    router.push('/login')
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    if (getAppToken()) {
      config.headers['api-token'] = getAppToken()
    }
    if (getAppOpenid()) {
      config.headers['openid'] = getAppOpenid()
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  //response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (res.code === 40018) {
        // token已失效请重新登录
        Dialog.alert({
          message: res.msg
        }).then(function() {
          checkToken()
        })
        return Promise.reject(res)
      }
      if (res.code === 40002) {
        // 验证码失效
        Notify(res.msg)
        return Promise.reject(res)
      }
      if (res.code === 40001) {
        // 鉴权token失效
        return Promise.reject(res)
      }
      if (res.code === 41504) {
        return Promise.reject(res)
      }
      if (res.code === 40006) {
        // 账号或密码不正确
        return Promise.reject(res)
      }
      if (res.code === 100005102) {
        return Promise.reject(res)
      }
      if (res.code === 10021) {
        return Promise.reject(res)
      }
      Notify(res.msg)
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log(error)
    const res = error.response && error.response.data
    if (res && res.status === 400) {
      checkToken()
    }
    return Promise.reject(res)
  }
)

export default service
