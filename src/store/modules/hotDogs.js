import axios from 'axios'
import Vue from 'vue'

const state = {
  all: []
}

const getters = {
  getAll: state => state.all
}

const actions = {
  create (context, payload) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'POST'
        }
      }
      axios.post(`${Vue.prototype.$apiServer}/api/hot-dog`, payload, config).then(() => {
        context.dispatch('readAll').catch(error => {
          console.log('GET_ALL_ERROR:', error)
          reject(error.message)
        })
        resolve()
      }).catch(error => {
        console.log('CREATE_ERROR:', error)
        reject(error.message)
      })
    })
  },
  readAll (context, payload) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET'
        }
      }
      axios.get(`${Vue.prototype.$apiServer}/api/hot-dogs`, config).then(response => {
        console.log(response)
        context.commit('SET_ALL', response.data)
        resolve()
      }).catch(error => {
        console.log('GET_ALL_ERROR:', error.message)
        reject(error.message)
      })
    })
  },
  update (context, payload) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT'
        }
      }
      axios.put(`${Vue.prototype.$apiServer}/api/hot-dog/${payload.id}`, payload.data, config).then(() => {
        context.dispatch('readAll').catch(error => {
          console.log('GET_ALL_ERROR:', error)
          reject(error.message)
        })
        resolve()
        console.log('UPDATED')
      }).catch(error => {
        console.log('UPDATE_ERROR:', error.message)
        reject(error.message)
      })
    })
  },
  delete (context, payload) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'DELETE'
        }
      }
      axios.delete(`${Vue.prototype.$apiServer}/api/hot-dog/${payload.id}`, config).then(() => {
        context.dispatch('readAll').catch(error => {
          console.log('GET_ALL_ERROR:', error)
          reject(error.message)
        })
        resolve()
        console.log('DELETED')
      }).catch(error => {
        console.log('DELETE_ERROR:', error.message)
        reject(error.message)
      })
    })
  }
}

const mutations = {
  SET_ALL (state, payload) {
    state.all = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
