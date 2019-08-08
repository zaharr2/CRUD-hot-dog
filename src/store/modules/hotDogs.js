import axios from 'axios'
import Vue from 'vue'

const state = {
  hotDogs: []
}

const getters = {
  getDefaultCard: state => state.defaultCard
}

const actions = {}

const mutations = {
  SET_HOT_DOGS () {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
