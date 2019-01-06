import axios from 'axios'
import { ActionContext } from 'vuex'
const flatten = require('lodash/flatten')

import { ILeaguesState } from './types'
import { ILeague } from '@/types/league'
import { ISplit } from '@/types/split'

export const state: ILeaguesState = {
  all: [],
  defaultSplit: '', // eg play-off
  splitId: undefined
}

export const mutations = {
  SET_LEAGUES(state: ILeaguesState, { leagues }: { leagues: ILeague[] }) {
    state.all = leagues
  },

  SET_SPLIT_ID(state: ILeaguesState, splitId: number) {
    state.splitId = splitId
  },

  SET_DEFAULT_SPLIT(state: ILeaguesState, { defaultSplit }: { defaultSplit: string }) {
    state.defaultSplit = defaultSplit
  }
}

export const actions = {
  async getLeagues({ commit }: ActionContext<ILeaguesState, {}>) {
    const res = await axios.get('/api/v1/leagues')
    commit('SET_LEAGUES', { leagues: res.data })
  }
}

export const getters = {
  getSplitByName: (state: ILeaguesState) => (name: string) => {
    const splits = flatten(state.all.map(x => x.splits))
    return splits.find((x : ISplit) => x.name === name)
  },

  splits: ({ all }: ILeaguesState) => {
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
