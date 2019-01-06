import Vue, { VueConstructor } from 'vue'
import { Module, MutationTree } from 'vuex'
import { RootState, ModalState, ModalOptions } from './types'

export const state: ModalState = {
  component: undefined,
  show: false,
  title: ''
}

export const mutations: MutationTree<ModalState> = {
  SET_MODAL(
    state: ModalState, 
    { show = false, component, title }: ModalOptions 
  ) {
    state.component = component
    state.show = show
    state.title = title
  }
}

export const modal: Module<ModalState, RootState> = {
  namespaced: true,
  state,
  mutations
}
