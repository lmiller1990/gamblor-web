import {
  fullKelly,
  calcOverlay,
  fractionalKelly
} from '../../src/bankroll'

const EV = 1.2
const ODDS = 2.4
const BANKROLL = 1000
const FRACTION = 0.1

describe('calcOverlay', () => {
  it('returns overlay as a percentage', () => {
    expect(calcOverlay(EV)).toBe(0.2)
  })
})

describe('fullKelly', () => {
  it('returns amount to bet based on bankroll and full kelly criterion', () => {
    const actual = fullKelly(BANKROLL, EV, ODDS) 

    expect(actual).toBe(143)
  })
})

describe('fractionalKelly', () => {
  it('returns fraction of full kelly', () => {
    const actual = fractionalKelly(BANKROLL, EV, ODDS, FRACTION) 

    expect(actual).toBe(14.3)
  })
})
