import { ActionTree, Module } from 'vuex'
import axios from 'axios'

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
      commit('leagues/SET_SPLIT_ID', defaultSplitId, { root: true })
    }
  }
}

export { settings }
