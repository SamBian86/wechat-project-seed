<template>
  <div id="app" class="wrapper" v-cloak>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './styles/reset.css';
@import './styles/style.css';
@import './styles/iconfont.css';
</style>

