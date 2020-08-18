import { getCallBackUrl } from '@/utils/storage'

const callback = {
  namespaced: true,
  state: {
    url: getCallBackUrl()
  },
  mutations: {
    setCallBackUrl: (state, data) => {
      state.url = data.url
    }
  },
  actions: {}
}

export default callback
