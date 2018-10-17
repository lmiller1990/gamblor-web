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

export const getters = {
  splits: ({ all }) => {
    const splits = []
    for (const league of all) {
      for (const split of league.splits) {
        splits.push({ 
          id: split.id, 
          name: `${league.name} - ${split.name}` 
        })
      }
    }

    return splits
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
