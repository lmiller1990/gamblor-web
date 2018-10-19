import axios from 'axios'
import { Game } from '../../src/types/game'
import { Bet } from '../../src/types/bet'
import { BetsState, AxiosResponse } from './types'
import { mapResponseToStore } from './map_response_to_store'

export const state: BetsState = {
  all: {},
  ids: []
}

export const mutations = {
  SET_BETS(state: BetsState, axiosResponse: AxiosResponse[]) {
    mapResponseToStore(state, axiosResponse)
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


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
