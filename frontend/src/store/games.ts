import axios from 'axios'
import { ActionTree, Module, GetterTree, MutationTree } from 'vuex'
import flatten from 'lodash/flatten'
import { RootState, GamesState, AxiosResponse } from './types'
import { mapResponseToStore } from './map_response_to_store'
import { Game } from '../types/game'
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

const actions: ActionTree<GamesState, RootState> = {
  async getByIds({ commit }, ids: number[]): Promise<any> {
    const gamesData = await Promise.all(
      ids.map(id => axios.get(`/api/v1/games/${id}`))
    )

    // for each bet, extract both teams and commit to teams module.
    const teams = gamesData.map(game => game.data.teams)
    commit('teams/SET_TEAMS', flatten(teams), { root: true })

    commit('SET_GAMES', gamesData.map(x => x.data))
  }
}

export const getters: GetterTree<GamesState, RootState> = {
  titleById: (state: GamesState, getters, rootState, rootGetters) => (id: number): string => {
    const game = state.all[id]
    const blueTeam: string  = rootGetters['teams/nameById'](game.blueSideTeamId)
    const redTeam: string = rootGetters['teams/nameById'](game.redSideTeamId)

    return `${blueTeam} vs ${redTeam}`
  },

  oddsForMarket: (state) => 
  ({ gameId, market, teamId }: { gameId: number, market: string, teamId: number }): number => {
    const game = state.all[gameId]
    const side = game.blueSideTeamId === teamId ? 'blue' : 'red'

    // @ts-ignore
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
      const getCompletedGames = (id: number) => 
        rootGetters['historicalGames/byTeamId'](id)
          .filter((x: Game) => x.winnerId && x.loserId)

      const teamGames = getCompletedGames(teamId)
      const opponentGames = getCompletedGames(opponentId)

      const nTeamGames = (n: number, games: Game[]) => 
        n > 0 ? games.slice(games.length - n) : games

      const nTeamLastGames = nTeamGames(nLastGames, teamGames)
      const nOpponentLastGames = nTeamGames(nLastGames, opponentGames)

      // @ts-ignore
      const gamesWonMarket = (games: Game[], id: number) => games.filter((x: Game) => x[`${mapperAppendTeam[market]}Id`] === id)
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
  mutations,
  actions,
  getters
}
