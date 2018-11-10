import Vue, { VueConstructor } from 'vue'
import { Bet } from '../types/bet'

export interface RootState {}

export interface BaseState {
  all: {},
  ids: number[]
}

export interface GamesState extends BaseState {}

export interface BetsState extends BaseState {
  all: { [id: number]: Bet },
  selectedId?: number
}

export interface ModalState {
  component?: VueConstructor
  show: boolean
}

export interface BankAccountState {
  balanceCents: number
}

export interface AxiosResponse {
  id: number
}

export interface LeaguesState {
  all: string[]
  defaultSplit: string
  splitId?: number
}

export interface ModalOptions {
  show: boolean
  component?: VueConstructor
}
