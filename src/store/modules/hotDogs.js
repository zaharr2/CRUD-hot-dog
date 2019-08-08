import axios from 'axios'
import Vue from 'vue'

const state = {
  hotDogs: []
}

const getters = {
  getHotDogs: state => state.hotDogs
}

const actions = {
  getHotDogs (context, payload) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET'
        }
      }
      axios.get(`${Vue.prototype.$apiServer}/api/hot-dogs`, config).then(response => {
        console.log(response)
        context.commit('SET_HOT_DOGS', response.data)
        resolve()
      }).catch(error => {
        console.log('GET_ALL_HOT_DOGS_ERROR:', error.message)
      })
    })
  }
}

const mutations = {
  SET_HOT_DOGS (state, payload) {
    state.hotDogs = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
