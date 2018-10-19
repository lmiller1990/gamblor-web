import { Bet } from '../types/bet'

export interface BaseState {
  all: {},
  ids: number[]
}

export interface BetsState extends BaseState {
}

export interface AxiosResponse {
  id: number
}