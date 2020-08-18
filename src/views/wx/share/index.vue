<template>
  <div></div>
</template>

<script>
import wxMixin from '@/mixins/wxMixin'
import { getAppOpenid, setSharePath, setShareBackType } from '@/utils/storage'
export default {
  mixins: [wxMixin],
  created() {
    const { path, backType } = this.$route.query
    const openid = getAppOpenid()

    // ?path=/report&backType=home
    const targetPath = `${path}?backType=${backType}`
    if (openid) {
      this.$router.push({
        path: targetPath
      })
    } else {
      setSharePath(path)
      setShareBackType(backType)
      this.$router.push({
        path: `/code`
      })
    }
  }
}
</script>
