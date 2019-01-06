import axios from 'axios'
import { ActionContext } from 'vuex'

import { Game } from '../types/game'
import { AxiosResponse, HistoricalGamesState } from '@/store/types'
import { mapResponseToStore } from './map_response_to_store'


const state: HistoricalGamesState = {
  ids: [],
  all: {}
}

export const mutations = {
  SET_GAMES(state: HistoricalGamesState, axiosResponse: AxiosResponse[]) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const actions = {
  async getByTeamId({ commit }: ActionContext<HistoricalGamesState, {}>, teamId: number) {
    const response = await axios.get(`/api/v1/teams/${teamId}`)

    commit('SET_GAMES', response.data.games)
    commit('games/SET_GAMES', response.data.games, { root: true })
  }
}

export const getters = {
  gameIdsbySplitId: (state: HistoricalGamesState) => (splitId: number): number[] =>
    state.ids.filter(id => state.all[id].splitId === splitId),

  byTeamId: (state: HistoricalGamesState) => (teamId: number) => {
    const inGame = 
      (teamId: number, game: Game) => {
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
