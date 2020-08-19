import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
import { Notify, Dialog } from 'vant'
import { getAppToken, setAppToken, getAppOpenid } from '@/utils/storage'
import requestMessage from '@/utils/requestMessage'
Vue.use(Notify).use(Dialog)

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

const checkToken = function() {
  if (getAppToken() === '') {
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
      const message = requestMessage.get(res.code)
      // 需要重新登录的报错
      const loginAgain = [100005001, 100005002, 500, 401, 403]

      if (loginAgain.includes(res.code)) {
        // token已失效请重新登录,清空token
        setAppToken()
        Notify(message)
        checkToken()
        return false
      }
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
