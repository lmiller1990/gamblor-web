import Vue from 'vue'
import Vuex from 'vuex'

import bets from './bets'
import scheduledGames from './scheduled_games'
import historicalGames from './historical_games'
import leagues from './leagues'
import matchups from './matchups'
import teams from './teams'
import user from './user'

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
