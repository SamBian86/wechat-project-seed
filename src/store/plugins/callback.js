import { setCallBackUrl } from '@/utils/storage'

export function callBackPlugin(store) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // 设置callback url
    if (mutation.type === 'callback/setCallBackUrl') {
      const nextCallBackUrl = state.callback.url
      setCallBackUrl(nextCallBackUrl)
    }
  })
}
