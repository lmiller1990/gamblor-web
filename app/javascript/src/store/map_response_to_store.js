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
