import axios from 'axios'
import { mapResponseToStore } from './map_response_to_store.js'

const state = {
  ids: [],
  all: {}
}

export const mutations = {
  SET_TEAMS(state, axiosResponse) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const actions = {
  async getTeams({ commit }) {
    const response = await axios.get('/api/v1/teams')

    commit('SET_TEAMS', response.data)
  }
}

export const getters = {
  nameById: (state) => (teamId) => state.all[teamId].name
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
