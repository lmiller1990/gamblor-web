import { AxiosResponse, BaseState } from './types'
/**
 * This maps a typical axios response to a state like this:
 * ids: []
 * all: {}
 *
 * where the structure is:
 *
 * ids: [1, 2],
 * all: {
 *   '1': { id: 1, ... },
 *   '2': { id: 2, ... }
 * }
 *
 * @param {Object} the reactive Vuex state
 * @param {Array} AxiosResponse.data array, containing [{ id... }]
 */
function mapResponseToStore(state: BaseState, response: AxiosResponse[]) {
  for (let obj of response) {
    if (!state.ids.includes(obj.id)) {
      state.ids.push(obj.id)
    }
    state.all = {
      ...state.all, 
      [obj.id]: {...response.find(x => x.id === obj.id)}
    }
  }
}

export { mapResponseToStore }
