import axios from 'axios'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState, BankAccountState } from './types'

export const state: BankAccountState = {
  balanceCents: 0
}

export const mutations: MutationTree<BankAccountState> = {
  SET_BALANCE(state: BankAccountState, balanceCents: number) {
    state.balanceCents = balanceCents
  }
}

export const actions: ActionTree<BankAccountState, RootState> = {
  async getBalance({ commit }): Promise<any> {
    const response = await axios.get('/api/v1/bank_accounts')
    commit('SET_BALANCE', response.data.balanceCents)
  }
}

export const getters: GetterTree<BankAccountState, RootState> = {
  balanceInDollars: (state) =>
    parseFloat((state.balanceCents / 100).toFixed(2))
}

export const bankAccount: Module<BankAccountState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
