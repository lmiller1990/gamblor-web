import Vue from 'vue'
import Vuex from 'vuex'

import bets from './bets.js'
import scheduledGames from './scheduled_games.js'
import historicalGames from './historical_games.js'
import leagues from './leagues.js'
import matchups from './matchups.js'
import teams from './teams.js'
import user from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bets,
    scheduledGames,
    matchups,
    leagues,
    teams,
    historicalGames,
    user
  }
})
