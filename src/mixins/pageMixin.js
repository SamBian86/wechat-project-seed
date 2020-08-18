import store from '@/store'
import router from '@/router'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['callback_url', 'auth_token', 'auth_tokenType'])
  },
  created() {
    const title = this.$route.meta.title
    this.setTitle(title)
  },
  methods: {
    setTitle: function (title) {
      document.title = title
    },
    loginCheck: function (url) {
      const { callback_url, auth_token, auth_tokenType } = this
      return new Promise((resolve, reject) => {
        console.log(auth_tokenType)
        // 已经登录
        if (auth_token) {
          if (callback_url !== '') {
            store.commit('setCallBackUrl', {
              url: ''
            })
            router.push(callback_url)
            reject()
          }
          resolve()
        } else {
          if (url) {
            // 尚未登录
            store.commit('setCallBackUrl', {
              url
            })
            router.push('/login')
            reject()
          }
          resolve()
        }
      })
    }
  }
}
