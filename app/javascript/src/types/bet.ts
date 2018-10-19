import { Game } from './game'

export interface Bet {
  id: number
  teamBetOn: string
  price: number
  odds: number
  gameId: number
  game?: Game
}