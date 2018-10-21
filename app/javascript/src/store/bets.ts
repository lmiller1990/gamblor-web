import axios from 'axios'
import { Module, GetterTree } from 'vuex'
import { Game } from '../../src/types/game'
import { Bet } from '../../src/types/bet'
import { BetsState, AxiosResponse, RootState } from './types'
import { mapResponseToStore } from './map_response_to_store'

export const state: BetsState = {
  all: {},
  ids: []
}

export const mutations = {
  SET_BETS(state: BetsState, axiosResponse: AxiosResponse[]) {
    mapResponseToStore(state, axiosResponse)
  },

  ADD_BET(state: BetsState, { bet }: { bet: Bet } ) {
    state.ids.push(bet.id)
    state.all = {...state.all, [bet.id]: bet}
  }
}

export const actions = {
  async getBets({ commit }) {
    const res = await axios.get('/api/v1/bets')
    const games: Game[] = res.data.map((bet: Bet) => bet.game)
    
    commit('SET_BETS', res.data)
    commit('games/SET_GAMES', games, { root: true })
  }
}

export const getters: GetterTree<BetsState, RootState> = {
  unusedId: (state): number => Math.max(...state.ids) + 1,

  persistedBetIds: (state): number[] => state.ids.filter(x => x > 0),

  tentativeBetIds: (state): number[] => state.ids.filter(x => x < 0)
}


export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
