import axios from 'axios'
import { Module, GetterTree } from 'vuex'
import { keysToSnake } from '../utils.js'
import { Game } from '../../src/types/game'
import { Bet, setBetStatus } from '../../src/types/bet'
import { BetsState, AxiosResponse, RootState } from './types'
import { mapResponseToStore } from './map_response_to_store'

export const state: BetsState = {
  all: {},
  ids: []
}

export const mutations = {
  CANCEL(state: BetsState, { id }: { id: number }) {
    state.ids = state.ids.filter(x => x !== id)
    delete state.all[id]
  },

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

    console.log(bet, bet.won, setBetStatus(bet.won))
    const persistedBet: Bet = {...res.data, status: setBetStatus(bet.won)}

    commit('MOVE_TENTATIVE_BET_TO_CONFIRMED', {
      tentativeId, bet: persistedBet
    })
  },

  async getBets({ commit }) {
    const res = await axios.get('/api/v1/bets')
    const games: Game[] = res.data.map((bet: Bet) => bet.game)
    const bets: Bet[] = res.data.map(x => ({...x, status: setBetStatus(x.won) }))
    
    commit('SET_BETS', bets)
    commit('games/SET_GAMES', games, { root: true })
  }
}

export const getters: GetterTree<BetsState, RootState> = {
  unusedId: (state): number => {
    if (state.ids.length > 0) {
      return Math.max(...state.ids.map(Math.abs)) + 1
    }

    return 1
  },
      

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
