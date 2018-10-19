import axios from 'axios'
const snakeCase = require('lodash/snakeCase')
import { mapResponseToStore } from './map_response_to_store'

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
  async getUpcomingGames({ commit }, { splitId }) {
    const response = await axios.get('/api/v1/upcoming_games', { params: { [snakeCase('splitId')]: splitId } })

    commit('SET_GAMES', response.data)
  }
}

export const getters = {
  bySplitId: (state) => (splitId) => {
    return state.ids
      .filter(x => state.all[x].splitId === splitId)
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
