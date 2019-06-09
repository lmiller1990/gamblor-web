import { Module } from 'vuex'
import axios from 'axios'

import { HARDCODED_DEFAULT_SPLIT_ID } from '@/constants'

interface ISettingsResponse {
  admin: boolean
  defaultSplitId: number
}

const settings: Module<{}, {}> = {
  namespaced: true,

  actions: {
    async getSettings({ commit }): Promise<any> {
      const response = await axios.get<ISettingsResponse>('/api/v1/settings')
      const { admin, defaultSplitId } = response.data

      commit('user/SET_ADMIN', admin, { root: true })
      commit('leagues/SET_SPLIT_ID', HARDCODED_DEFAULT_SPLIT_ID, { root: true })
    }
  }
}

export { settings }
