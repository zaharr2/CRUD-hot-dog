import Vue from 'vue'
import Vuex from 'vuex'
import hotDogs from './modules/hotDogs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hotDogs
  }
})
