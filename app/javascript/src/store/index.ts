import Vue from 'vue'
import Vuex from 'vuex'

import bets from './bets'
import { games } from './games'
import scheduledGames from './scheduled_games'
import historicalGames from './historical_games'
import leagues from './leagues'
import matchups from './matchups'
import teams from './teams'
import user from './user'
import { RootState } from './types'

Vue.use(Vuex)

const state: RootState = {}

export default new Vuex.Store({
  state,
  modules: {
    bets,
    games,
    scheduledGames,
    matchups,
    leagues,
    teams,
    historicalGames,
    user
  }
})
