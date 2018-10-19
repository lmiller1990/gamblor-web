import {
  titlecase
} from '../../src/filters/index'

describe('titlecase', () => {
  it('capitalizes every word', () => {
    const theString = 'counter logic gaming'

    expect(titlecase(theString)).toBe('Counter Logic Gaming')
  })
})
