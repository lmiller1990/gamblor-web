import {
  titlecase,
  dollars
} from '../../src/filters/index'

describe('titlecase', () => {
  it('capitalizes every word', () => {
    const theString = 'counter logic gaming'

    expect(titlecase(theString)).toBe('Counter Logic Gaming')
  })
})

describe('dollars', () => {
  it('converts cents to dollars', () => {
    const cents = 1040

    expect(dollars(cents)).toBe('A$10.40')
  })
})