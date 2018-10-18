import axios from 'axios'
import { mapResponseToStore } from './map_response_to_store.js'

export const state = {
  all: {},
  ids: []
}

export const mutations = {
  SET_BETS(state, axiosResponse) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const actions = {
  async getBets({ commit }) {
    const res = await axios.get('/api/v1/bets')
    commit('SET_BETS', res.data)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
