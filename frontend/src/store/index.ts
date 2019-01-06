import Vue from 'vue'
import Vuex from 'vuex'

import bets from './bets'
import { modal } from './modal'
import { bankAccount } from './bank_account'
import { games } from './games'
import scheduledGames from './scheduled_games'
import historicalGames from './historical_games'
import leagues from './leagues'
import matchups from './matchups'
import { settings } from '@/store/settings'
import teams from './teams'
import user from './user'
import { RootState } from './types'

Vue.use(Vuex)

const state: RootState = {}

export default new Vuex.Store({
  state,
  modules: {
    bankAccount,
    bets,
    games,
    modal,
    scheduledGames,
    matchups,
    leagues,
    settings,
    teams,
    historicalGames,
    user
  }
})
