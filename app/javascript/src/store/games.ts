import axios from 'axios'
import { Module, GetterTree, MutationTree } from 'vuex'
import { RootState, GamesState, AxiosResponse } from './types'
import { mapResponseToStore } from './map_response_to_store'
import { Game } from '../types/game';
import { mapperAppendTeam } from '../market_mapper'
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
      const getCompletedGames = id => 
        rootGetters['historicalGames/byTeamId'](id)
          .filter((x: Game) => x.winnerId && x.loserId)

      const teamGames = getCompletedGames(teamId)
      const opponentGames = getCompletedGames(opponentId)

      const nTeamGames = (n: number, games: Game[]) => 
        n > 0 ? games.slice(games.length - n) : games

      const nTeamLastGames = nTeamGames(nLastGames, teamGames)
      const nOpponentLastGames = nTeamGames(nLastGames, opponentGames)

      const gamesWonMarket = (games, id) => games.filter((x: Game) => x[`${mapperAppendTeam[market]}Id`] === id)
      const teamGamesWonMarket = gamesWonMarket(nTeamLastGames, teamId)
      const opponentGamesWonMarket = gamesWonMarket(nOpponentLastGames, opponentId)

      const teamWinChance = teamGamesWonMarket.length / nTeamLastGames.length
      const opponentNonWinChance = Math.abs(1 - opponentGamesWonMarket.length / nOpponentLastGames.length)

      return ((teamWinChance + opponentNonWinChance) / 2) * odds
  }
}

export const games: Module<GamesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations
}
