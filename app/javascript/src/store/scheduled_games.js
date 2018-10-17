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

export const getters = {
  bySplitId: (state) => (splitId) => {
    return state.ids
      .filter(x => state.all[x].splitId === splitId)
      .map(x => state.all[x])
  },

  byTeamId: (state) => (teamId) => {
    const inGame = 
      (teamId, game) => {
        const { blueSideTeamId, redSideTeamId } = game
        return [blueSideTeamId, redSideTeamId].includes(teamId)
      }

    const ids = state.ids.filter(gameId => inGame(teamId, state.all[gameId]))

    return ids.map(x => state.all[x])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
