import axios from 'axios'
import { mapResponseToStore } from './map_response_to_store.js'

const state = {
  ids: [],
  all: {}
}

export const mutations = {
  SET_GAMES(state, axiosResponse) {
    for (let game of axiosResponse) {
      if (!state.ids.includes(game.id)) {
        state.ids.push(game.id)
      }
      state.all = {
        ...state.all, 
        [game.id]: {...axiosResponse.find(x => x.id === game.id)}
      }
    }
    //mapResponseToStore(state, axiosResponse)
  }
}

export const actions = {
  async getByTeamId({ commit }, teamId) {
    const response = await axios.get(`/api/v1/teams/${teamId}`)

    commit('SET_GAMES', response.data.games)
  }
}

export const getters = {
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
