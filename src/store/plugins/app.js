import { setAppToken, setAppTokenType, setAppOpenid } from '@/utils/storage'

export function appPlugin(store) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // 设置token
    if (mutation.type === 'app/setAppToken') {
      const nextAppToken = state.app.token
      setAppToken(nextAppToken)
    }

    // 设置tokenType
    if (mutation.type === 'app/setAppTokenType') {
      const nextAppTokenType = state.app.tokenType
      setAppTokenType(nextAppTokenType)
    }

    // 设置openid
    if (mutation.type === 'app/setAppOpenid') {
      const nextAppOpenid = state.app.openid
      setAppOpenid(nextAppOpenid)
    }
  })
}
