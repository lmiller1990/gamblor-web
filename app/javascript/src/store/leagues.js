import axios from 'axios'

export const state = {
  all: []
}

export const mutations = {
  SET_LEAGUES(state, { leagues }) {
    state.all = leagues
  }
}

export const actions = {
  async getLeagues({ commit }) {
    const res = await axios.get('/api/v1/leagues')
    commit('SET_LEAGUES', { leagues: res.data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
