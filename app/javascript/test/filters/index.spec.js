import {
  titlecase
} from '../../src/filters/index.js'

describe('titlecase', () => {
  it('capitalizes every word', () => {
    const theString = 'counter logic gaming'

    expect(titlecase(theString)).toBe('Counter Logic Gaming')
  })
})
