import axios from 'axios'
import { Module, GetterTree, MutationTree } from 'vuex'
import { RootState, GamesState, AxiosResponse } from './types'
import { mapResponseToStore } from './map_response_to_store'
import { Game } from '../types/game';

const state: GamesState = {
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
    console.log(game, id)
    const blueTeam: string  = rootGetters['teams/nameById'](game.blueSideTeamId)
    const redTeam: string = rootGetters['teams/nameById'](game.redSideTeamId)

    return `${blueTeam} vs ${redTeam}`
  }
}

export const games: Module<GamesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations
}
