import Vue from 'vue'
import Vuex from 'vuex'

import games from './games.js'
import matchups from './matchups.js'
import teams from './teams.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    matchups,
    teams
  }
})
