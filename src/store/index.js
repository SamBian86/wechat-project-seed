import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import callback from './modules/callback'
import { appPlugin } from '@/store/plugins/app'
import { callBackPlugin } from '@/store/plugins/callback'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    callback
  },
  plugins: [appPlugin, callBackPlugin],
  getters
})
