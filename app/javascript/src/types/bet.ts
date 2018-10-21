import { Game } from './game'

export interface Bet {
  id: number
  teamBetOnId: number
  priceCents: number
  odds: number
  gameId: number
  game?: Game
}
