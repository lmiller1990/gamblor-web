import axios from 'axios'
import { ActionContext } from 'vuex'
import { LeaguesState } from './types'
import { ILeague } from '@/types/league'
const flatten = require('lodash/flatten')

export const state: LeaguesState = {
  all: [],
  defaultSplit: '', // eg play-off
  splitId: undefined
}

export const mutations = {
  SET_LEAGUES(state: LeaguesState, { leagues }: { leagues: ILeague[] }) {
    state.all = leagues
  },

  SET_SPLIT_ID(state: LeaguesState, splitId: number) {
    state.splitId = splitId
  },

  SET_DEFAULT_SPLIT(state: LeaguesState, { defaultSplit }: { defaultSplit: string }) {
    state.defaultSplit = defaultSplit
  }
}

export const actions = {
  async getLeagues({ commit }: ActionContext<LeaguesState, {}>) {
    const res = await axios.get('/api/v1/leagues')
    commit('SET_LEAGUES', { leagues: res.data })
  }
}

export const getters = {
  getSplitByName: (state: LeaguesState) => (name: string) => {
    const splits = flatten(state.all.map(x => x.splits))
    return splits.find(x => x.name === name)
  },

  splits: ({ all }: LeaguesState) => {
    const splits = []
    for (const league of all) {
      for (const split of league.splits) {
        splits.push({ 
          id: split.id, 
          name: `${league.name} - ${split.name}` 
        })
      }
    }

    return splits
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
