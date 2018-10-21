import axios from 'axios'
import { Module, GetterTree } from 'vuex'
import { keysToSnake } from '../utils.js'
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
  },

  /**
   * before persisting to DB, tentative bets have negative ids
   * when a bet is persisted, simply change the negative id to the
   * real id from the DB.
   */
  MOVE_TENTATIVE_BET_TO_CONFIRMED(state: BetsState, { tentativeId, bet }
    : { tentativeId: number, bet: Bet }) {
    state.ids = state.ids.filter(x => x !== tentativeId)
    state.ids.push(bet.id)
    state.all = {...state.all, [bet.id]: {...bet} }
    delete state.all[tentativeId]
  }
}

export const actions = {
  async create({ commit }, { bet }: { commit: Function, bet: Bet }) {
    const tentativeId = bet.id
    const res = await axios.post('/api/v1/bets', keysToSnake(bet))

    commit('MOVE_TENTATIVE_BET_TO_CONFIRMED', {
      tentativeId, bet: res.data
    })
  },

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
