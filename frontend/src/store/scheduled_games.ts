import axios from 'axios'
import { ActionContext, GetterTree } from 'vuex'
const snakeCase = require('lodash/snakeCase')

import { mapResponseToStore } from './map_response_to_store'
import { Game } from '@/types/game'
import { IScheduledGamesState, AxiosResponse } from '@/store/types'

interface IGetUpcomingGamesPayload {
  splitId: number
  upcoming: number
  recentlyPlayed: number
}

const state = {
  ids: [],
  all: {}
}

export const mutations = {
  SET_GAMES(state: IScheduledGamesState, axiosResponse: AxiosResponse[]) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const actions = {
  async getUpcomingGames({ commit }: ActionContext<IScheduledGamesState, {}>, {
    splitId, upcoming = 6, recentlyPlayed = 5 }: IGetUpcomingGamesPayload) {
      console.log(upcoming, recentlyPlayed)

    const response = await axios.get('/api/v1/upcoming_games', { 
      params: { 
        [snakeCase('splitId')]: splitId,
        [snakeCase('recentlyPlayed')]: recentlyPlayed,
        [snakeCase('upcoming')]: upcoming,
      } 
    })

    commit('SET_GAMES', response.data)
    commit('games/SET_GAMES', response.data, { root: true })
  }
}

export const getters: GetterTree<IScheduledGamesState, {}> = {
  bySplitId: (state) => (splitId: number) => {
    return state.ids
      .filter(x => state.all[x].splitId === splitId)
      .sort((x, y) => +new Date(state.all[x].createdAt) - +new Date(state.all[y].createdAt))
  },

  byTeamId: (state) => (teamId: number) => {
    const inGame = 
      (teamId: number, game: Game) => {
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
