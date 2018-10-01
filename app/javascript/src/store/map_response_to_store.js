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
function mapResponseToStore(state, response) {
  state.ids = response.map(x => x.id)
  for (let id of state.ids) {
    state.all = {
      ...state.all, 
      [id]: {...response.find(x => x.id === id)}
    }
  }
}

export { mapResponseToStore }
