import { BetStatus } from '../types/bet'

export const betProps = {
  status: {
    type: Number as () => BetStatus,
    required: true
  },

  market: {
    type: String,
    required: true
  },

  gameTitle: {
    type: String,
    required: true
  },

  odds: {
    type: Number,
    required: true
  },

  priceCents: {
    type: Number,
    required: true
  },

  id: {
    type: Number,
    required: true
  },

  teamBetOn: {
    type: String,
    required: true
  }
}
