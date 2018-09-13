import axios from 'axios'
import { mapResponseToStore } from './map_response_to_store.js'

const state = {
  ids: [],
  all: {}
}

export const mutations = {
  SET_GAMES(state, axiosResponse) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const actions = {
  async getUpcomingGames({ commit }) {
    const response = await axios.get('/api/v1/upcoming_games')

    commit('SET_GAMES', response.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
