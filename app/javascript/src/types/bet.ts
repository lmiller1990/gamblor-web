import { Game } from './game'

export enum BetStatus {
  Won,
  Lost,
  AwaitingResult
}

export interface Bet {
  status: BetStatus
  id: number
  teamBetOnId: number
  market: string
  priceCents: number
  odds: number
  gameId: number
  game?: Game
  won?: boolean
}

export const setBetStatus = (won: boolean | null) => {
  if (won === null)
    return BetStatus.AwaitingResult

  return won ? BetStatus.Won : BetStatus.Lost
}
