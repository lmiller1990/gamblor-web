export const state = {
  admin: false
}

export const mutations = {
  SET_ADMIN(state, { admin }) {
    state.admin = admin
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
