import { Module } from 'vuex'

interface IUserState {
  admin: boolean
}

export const state: IUserState = {
  admin: false
}

export const mutations = {
  SET_ADMIN(state: IUserState, { admin }: { admin: boolean }) {
    state.admin = admin
  }
}

const user: Module<IUserState, {}> = {
  namespaced: true,
  state,
  mutations
}


export default user
