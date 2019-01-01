import { mapResponseToStore } from '../../src/store/map_response_to_store'

describe('mapResponseToStore', () => {
  it('maps ids and objects from axios response to store.state', () => {
    const state = {
      ids: [],
      all: {}
    }
    const data = [
      { id: 0, val: 'val_0' },
      { id: 1, val: 'val_1' },
    ]

    mapResponseToStore(state, data)

    expect(state).toEqual({
      ids: [0, 1],
      all: {
        0: { id: 0, val: 'val_0' },
        1: { id: 1, val: 'val_1' },
      }
    })
  })
})
