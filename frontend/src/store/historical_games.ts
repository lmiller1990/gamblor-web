import axios from 'axios'
import { Game } from '../types/game'
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
  async getByTeamId({ commit }, teamId) {
    const response = await axios.get(`/api/v1/teams/${teamId}`)

    commit('SET_GAMES', response.data.games)
    commit('games/SET_GAMES', response.data.games, { root: true })
  }
}

export const getters = {
  gameIdsbySplitId: (state) => (splitId): Game[] =>
    state.ids.filter(id => state.all[id].splitId === splitId),

  byTeamId: (state) => (teamId) => {
    const inGame = 
      (teamId, game) => {
        const { blueSideTeamId, redSideTeamId } = game
        return [blueSideTeamId, redSideTeamId].includes(teamId)
      }

    const ids = state.ids
      .filter(gameId => inGame(teamId, state.all[gameId]))
      .sort((x, y) => x - y)
      
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
