import { getAppToken, getAppTokenType, getAppOpenid } from '@/utils/storage'

const auth = {
  namespaced: true,
  state: {
    token: getAppToken(),
    tokenType: getAppTokenType(),
    openid: getAppOpenid()
  },
  mutations: {
    setAppToken: (state, data) => {
      state.token = data.token
    },
    setAppTokenType: (state, data) => {
      state.tokenType = data.tokenType
    },
    setAppOpenid: (state, data) => {
      state.openid = data.openid
    }
  },
  actions: {
    setAppToken({ commit }, state) {
      return new Promise(resolve => {
        commit({
          type: 'setAppToken',
          token: state.token
        })
        resolve()
      })
    },
    setAppTokenType({ commit }, state) {
      return new Promise(resolve => {
        commit({
          type: 'setAppTokenType',
          tokenType: state.tokenType
        })
        resolve()
      })
    },
    setAppOpenid({ commit }, state) {
      return new Promise(resolve => {
        commit({
          type: 'setAppOpenid',
          openid: state.openid
        })
        resolve()
      })
    }
  }
}

export default auth
