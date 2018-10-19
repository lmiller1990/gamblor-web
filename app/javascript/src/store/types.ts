import { Bet } from '../types/bet'

export interface RootState {}

export interface BaseState {
  all: {},
  ids: number[]
}

export interface GamesState extends BaseState {

}

export interface BetsState extends BaseState {
}

export interface AxiosResponse {
  id: number
}