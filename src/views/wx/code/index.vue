<template>
  <div></div>
</template>

<script>
import store from '@/store'
import wxMixin from '@/mixins/wxMixin'
import { getOpenidByCode } from '@/api/auth'
import {
  getSharePath,
  setSharePath,
  getShareBackType,
  setShareBackType
} from '@/utils/storage'
export default {
  mixins: [wxMixin],
  created() {
    const { code } = this.$route.query
    const path = getSharePath()
    const backType = getShareBackType()
    if (!code) {
      this.handleGetCode('/code')
    } else {
      getOpenidByCode({
        code
      }).then((response) => {
        store.commit('app/setAppOpenid', {
          openid: response.data
        })
        if (path && backType) {
          setSharePath()
          setShareBackType()
          this.$router.replace({
            path: `${path}?backType=${backType}`
          })
        } else {
          this.enterApp()
        }
      })
    }
  },
  methods: {
    enterApp() {
      this.$router.push({
        path: `/report`
      })
    }
  }
}
</script>
