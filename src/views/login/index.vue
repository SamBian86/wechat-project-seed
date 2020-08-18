<template>
  <div class="container">
    <div class="login_content">
      <div class="login_area">
        <van-cell-group>
          <div class="login_title">请验证手机号</div>
          <van-field v-model="mobile" placeholder="手机号"></van-field>
          <van-field v-model="vcode" placeholder="验证码">
            <van-button
              class="login_item_code"
              slot="button"
              size="small"
              type="default"
              :disabled="pressVButton"
              @click="getVCode"
              >{{ vCodeText }}</van-button
            >
          </van-field>
        </van-cell-group>
      </div>

      <div class="login_item_box">
        <van-button
          @click="loginNow"
          class="login_item_join"
          block
          round
          size="large"
          >验证手机号</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import Vue from 'vue'
import { Field, CellGroup, Button, Toast } from 'vant'
import 'vant/lib/field/style'
import 'vant/lib/cell-group/style'
import 'vant/lib/button/style'
import 'vant/lib/toast/style'
Vue.use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Toast)

import { validatePhone } from '@/utils/validate'
import pageMixin from '@/mixins/pageMixin'
import { login, getSmsByMobile } from '@/api/auth'

export default {
  mixins: [pageMixin],
  created() {},
  data() {
    return {
      vCodeText: '获取验证码',
      pressVButton: false,
      vCodeDefaultTime: 60,
      vCodeTime: 0,
      vCodeTimer: null,
      mobile: '',
      vcode: ''
    }
  },
  watch: {
    // $route: {
    //   handler(val) {},
    //   immediate: true
    // }
  },
  methods: {
    loginNow() {
      const { mobile, vcode } = this

      if (mobile.length !== 11 || !validatePhone(mobile)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (vcode === '') {
        Toast('请输入验证码')
        return false
      }
      login({
        mobile,
        vcode
      })
        .then(res => {
          store.commit('app/setAppToken', {
            token: res.data.token
          })
          return this.loginCheck()
        })
        .then(() => {
          // 登录成功
          this.getCode()
        })
        .catch(res => {
          Toast(res.msg)
        })
    },
    getCode() {
      this.$router.push({
        path: `/code`
      })
    },
    getVCode() {
      if (!this.pressVButton) {
        // 获取验证码
        this.getSmsByMobile()
      } else {
        // 倒计时尚未结束
        Toast(`${this.vCodeTime}秒后重试`)
      }
    },
    getVCodeTimer() {
      if (this.vCodeTime === 0) {
        this.pressVButton = false
        this.vCodeTime = this.vCodeDefaultTime
        this.vCodeText = `获取验证码`
        clearTimeout(this.vCodeTimer)
      } else {
        this.vCodeText = `${this.vCodeTime}秒后重发`
        this.vCodeTime--
        this.vCodeTimer = setTimeout(() => {
          this.getVCodeTimer()
        }, 1000)
      }
    },
    // 获取验证码
    getSmsByMobile() {
      const { mobile } = this
      if (mobile.length === 11) {
        getSmsByMobile({
          mobile
        })
          .then(res => {
            this.pressVButton = true
            this.vCodeTime = this.vCodeDefaultTime
            this.getVCodeTimer()
            Toast(res.msg)
          })
          .catch(res => {
            Toast(res.msg)
          })
      } else {
        Toast('请输入正确的手机号码')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login_title {
  padding: 10.6667vw 4vw;
  font-size: 8vw;
  font-weight: bold;
  line-height: 8vw;
  color: #333;
}

.login_item_box {
  padding: 4vw;
  margin-top: 13.3333vw;
}

.login_item_join {
  background: #fa5067;
  color: #fff;
}

.login_item_code {
  color: #fff;
  background: #fa5067;
  border: none;
  border-radius: 2.6667vw;
}
</style>
