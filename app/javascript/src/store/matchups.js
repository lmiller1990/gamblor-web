import axios from 'axios'

const state = {
  firstTeamId: null,
  secondTeamId: null
}

export const mutations = {
  SET_MATCHUP(state, { firstTeamId, secondTeamId }) {
    state.firstTeamId = firstTeamId
    state.secondTeamId = secondTeamId
    console.log(state)
  }
}

export const actions = {
  setMatchup({ commit }, { firstTeamId, secondTeamId }) {
    commit('SET_MATCHUP', { firstTeamId, secondTeamId })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
