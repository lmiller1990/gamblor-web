import axios from 'axios'
import { Module, GetterTree, MutationTree } from 'vuex'
import { RootState, GamesState, AxiosResponse } from './types'
import { mapResponseToStore } from './map_response_to_store'
import { Game } from '../types/game';
import { mapper } from '../market_mapper'
const capitalize = require('lodash/capitalize')

export const state: GamesState = {
  ids: [],
  all: {}
}

export const mutations: MutationTree<GamesState> = {
  SET_GAMES(state: GamesState, axiosResponse: AxiosResponse[]) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const getters: GetterTree<GamesState, RootState> = {
  titleById: (state, getters, rootState, rootGetters) => (id: number): string => {
    const game = state.all[id]
    const blueTeam: string  = rootGetters['teams/nameById'](game.blueSideTeamId)
    const redTeam: string = rootGetters['teams/nameById'](game.redSideTeamId)

    return `${blueTeam} vs ${redTeam}`
  },

  oddsForMarket: (state) => 
  ({ gameId, market, teamId }: { gameId: number, market: string, teamId: number }): number => {
    const game = state.all[gameId]
    const side = game.blueSideTeamId === teamId ? 'blue' : 'red'

    return game[`${side}SideTeam${capitalize(market)}Odds`]
  },

  // formula for EV
  // (chance to get + opponent chance to not get / 2) * odds
  evByTeamId: (state, {}, {}, rootGetters) => 
  ({ teamId, opponentId, market, nLastGames, odds } : 
    { teamId: number, 
      opponentId: number, 
      market: string, 
      nLastGames: number, 
      odds: number 
    }): number => {
      const teamGames = rootGetters['historicalGames/byTeamId'](teamId)
      const gamesOfInterest = teamGames.slice(0, nLastGames)

      const gamesGotMarket = gamesOfInterest.filter((x: Game) => 
        x[`${mapper[market]}TeamId`] === teamId
      )

      console.log(gamesGotMarket.length)
      console.log(gamesOfInterest.length)
      console.log(odds)

      return ((gamesGotMarket.length / gamesOfInterest.length) * odds)
  }
}

export const games: Module<GamesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations
}
