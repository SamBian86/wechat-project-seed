<template>
  <div class="container">
    <div class="container_area">
      <div class="auth_info">您好，为获取到您的用户信息，请授权!</div>
      <van-button @click="getCode" class="login_item_join" block round size="large">获取授权</van-button>
    </div>
  </div>
</template>

<script>
import wxMixin from '@/mixins/wxMixin'
import { getAppOpenid } from '@/utils/storage'
import Vue from 'vue'
import { Button } from 'vant'
import 'vant/lib/button/style'
Vue.use(Button)

export default {
  mixins: [wxMixin],
  data: {
    showBtn: false
  },
  created() {
    const app_openid = getAppOpenid()
    if (app_openid) {
      this.$router.push({
        path: `/login`
      })
    } else {
      this.showBtn = true
    }
  },
  methods: {
    getCode() {
      this.$router.push({
        path: `/code`
      })
    }
  }
}
</script>
<style lang="scss">
.container_area {
  padding: 0 5.3333vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.auth_info {
  font-size: 4.2667vw;
  text-align: center;
  padding-bottom: 4vw;
}

.login_item_join {
  background: #956bb7;
  color: #fff;
}
</style>