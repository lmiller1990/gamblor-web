import { Module, MutationTree } from 'vuex'

interface IUserState {
  admin: boolean
}

const state: IUserState = {
  admin: false 
}

const mutations: MutationTree<IUserState> = {
  SET_ADMIN(state: IUserState, admin: boolean) {
    state.admin = admin
  }
}

const user: Module<IUserState, {}> = {
  namespaced: true,
  state,
  mutations
}


export default user

export { state, mutations }