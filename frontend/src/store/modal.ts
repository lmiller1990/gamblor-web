import Vue, { VueConstructor } from 'vue'
import { Module, MutationTree } from 'vuex'
import { RootState, ModalState, ModalOptions } from './types'

export const state: ModalState = {
  component: undefined,
  show: false,
  title: '',
  extra: {}
}

export const mutations: MutationTree<ModalState> = {
  SET_MODAL(
    state: ModalState, 
    { show = false, component, title, extra }: ModalOptions 
  ) {
    state.component = component
    state.show = show
    state.title = title
    state.extra = {...state.extra, ...extra}
  }
}

export const modal: Module<ModalState, RootState> = {
  namespaced: true,
  state,
  mutations
}
