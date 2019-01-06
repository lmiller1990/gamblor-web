import { VueConstructor } from 'vue'
import { Bet } from '../types/bet'
import { Game } from '../types/game'
import { ILeague } from '../types/league'
import { ITeam } from '@/types/team'

export interface RootState {}

export interface BaseState {
  all: {},
  ids: number[]
}

export interface GamesState extends BaseState {
  all: { [key: number]: Game }
}

export interface BetsState extends BaseState {
  all: { [id: number]: Bet }
  selectedId?: number
  selectedOdds?: number
  selectedBetEvs: number[]
}

export interface HistoricalGamesState extends BaseState {
  all: {
    [key: number]: Game
  }
}

export interface IScheduledGamesState extends BaseState {
  all: {
    [key: number]: Game
  }
}

export interface ITeamsState extends BaseState {
  all: {
    [key: number]: ITeam
  }
}

export interface BankAccountState {
  balanceCents: number
}

export interface AxiosResponse {
  id: number
}

export interface LeaguesState {
  all: ILeague[]
  defaultSplit: string
  splitId?: number
}

export interface ModalOptions {
  show: boolean
  component?: VueConstructor
  title?: string
}

export interface ModalState extends ModalOptions {}
