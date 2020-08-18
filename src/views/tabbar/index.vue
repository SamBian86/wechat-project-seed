<template>
  <div>
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <van-tabbar v-model="active" @change="handleChange" :active-color="$activeColor">
      <van-tabbar-item icon="iconfont van-icon-course-tab">课程</van-tabbar-item>
      <van-tabbar-item icon="iconfont van-icon-service-tab">咨询</van-tabbar-item>
      <van-tabbar-item icon="iconfont van-icon-mine-tab">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
Vue.use(Tabbar).use(TabbarItem)

export default {
  mixins: [],
  components: {},
  data() {
    return {
      active: 0
    }
  },
  watch: {
    $route: {
      handler(val) {
        const menu = ['course', 'consultation', 'mine']
        // const menu = ['course', 'mine']
        const path = val.path.split('/')[1]
        const active = menu.findIndex(item => item === path)
        this.active = active
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    handleChange(active) {
      switch (active) {
        case 0:
          this.$router.push('/course')
          break
        case 1:
          this.$router.push('/consultation')
          break
        case 2:
          this.$router.push('/mine')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
