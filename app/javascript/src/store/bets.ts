import axios from 'axios'
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
    commit('SET_BETS', res.data)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
