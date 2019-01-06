import axios from 'axios'
import { ActionTree, GetterTree } from 'vuex'

import { ITeamsState, AxiosResponse } from '@/store/types'
import { mapResponseToStore } from './map_response_to_store'

const state: ITeamsState = {
  ids: [],
  all: {}
}

export const mutations = {
  SET_TEAMS(state: ITeamsState, axiosResponse: AxiosResponse[]) {
    mapResponseToStore(state, axiosResponse)
  }
}

export const actions: ActionTree<ITeamsState, {}> = {
  async getTeams({ commit }) {
    const response = await axios.get('/api/v1/teams')

    commit('SET_TEAMS', response.data)
  }
}

export const getters: GetterTree<ITeamsState, {}> = {
  nameById: (state) => (teamId: number) => state.all[teamId].name
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
