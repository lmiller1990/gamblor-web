<template>
  <div id="app">
    <ModalManager />
    <CurrentMatchupContainer 
      :currentMatchupSelected="currentMatchupSelected"
      :blueSideGames="blueSideGames"
      :blueSideTeamId="blueSideTeamId"
      :redSideTeamId="redSideTeamId"
      :redSideGames="redSideGames"
      @teamSelected="selectTeam"
      @createBet="showBetSleeve"
    />

    <Sidebar>
      <HowToUse v-if="sidebarComponent === HowToUse" />
      <BetSleeve 
        v-if="sidebarComponent === BetSleeve && (loaded && loadedBets)" 
        @betPlaced="fetchBankAccount"
      />
      <UpcomingMatchesContainer 
        v-if="sidebarComponent === UpcomingMatchesContainer"
        :splitId="splitId"
        @matchupSelected="setMatchup" 
        @selectSplit="setSplitId"
        />
      <SidebarControls 
        slot="controls" 
        @showBetSleeve="showBetSleeve"
        @showHowToUse="showHowToUse"
        @showSchedule="showSchedule"
      />
    </Sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HowToUse from './components/how_to_use.vue'
import BetSleeve from './bet_sleeve/bet_sleeve.vue'
import SidebarControls from './components/sidebar_controls.vue'
import CurrentMatchupContainer from './current_matchup/current_matchup_container.vue'
import UpcomingMatchesContainer from './upcoming_matches/upcoming_matches_container.vue'
import ModalManager from './components/modal_manager.vue'
import Sidebar from './components/sidebar.vue'
import BankrollContainer from './bankroll_management/bankroll_container.vue'
import SplitStatsModalContainer from './components/modals/split_stats_modal/split_stats_modal_container.vue'
import { ModalOptions } from './store/types'

export default Vue.extend({
  name: 'App',

  components: {
    ModalManager,
    CurrentMatchupContainer,
    Sidebar,
    HowToUse,
    BetSleeve,
    UpcomingMatchesContainer,
    SidebarControls
  },

  created(): void {
    Promise.all([
      this.fetchBets(), 
      this.fetchBankAccount(),
      this.$store.dispatch('settings/getSettings')
      ]
    )
      .then(() => this.loadedBets = true)

    this.fetchLeaguesAndSplits().then(() => {
      this.setDefaultSplitId()
      this.loaded = true
    })
  },
  
  data() {
    return {
      sidebarComponent: UpcomingMatchesContainer,
      UpcomingMatchesContainer,
      HowToUse,
      BetSleeve,
      loadedBets: false,
      loaded: false,
      redSideTeamId: 0,
      blueSideTeamId: 0,
      redSideGames: [],
      blueSideGames: []
    }
  },

  computed: {
    splitId(): number {
      return this.$store.state.leagues.splitId
    },

    currentMatchupSelected(): boolean {
      return (this.blueSideTeamId && this.redSideTeamId) !== 0
    }
  },

  methods: {
    showBetSleeve(): void {
      this.sidebarComponent = BetSleeve
    },

    showSchedule(): void {
      this.sidebarComponent = UpcomingMatchesContainer
    },

    showHowToUse(): void {
      this.sidebarComponent = HowToUse
    },

    fetchBankAccount() {
      return this.$store.dispatch('bankAccount/getBalance')
    },

    async fetchBets() {
      await this.$store.dispatch('bets/getBets')
      const gameIds = this.$store.getters['bets/gameIdsForAllBets']
      await this.$store.dispatch('games/getByIds', gameIds)
    },

    setSplitId({ id }: { id: number }): void {
      this.$store.commit('leagues/SET_SPLIT_ID', id)
    },

    selectTeam({ teamId, side }: { teamId: string, side: string }): void {
      if (side === 'blue')
        this.setMatchup({ blueSideTeamId: parseInt(teamId), redSideTeamId: this.redSideTeamId })

      if (side === 'red')
        this.setMatchup({ blueSideTeamId: this.blueSideTeamId, redSideTeamId: parseInt(teamId) })
    },

    // Set default settings declared on server side in config/settings.yml
    fetchLeaguesAndSplits(): Promise<any> {
      return this.$store.dispatch('leagues/getLeagues')
    },

    setDefaultSplitId(): void {
      if (localStorage.getItem('favoriteSplitId')) {
        const id =  JSON.parse(localStorage.getItem('favoriteSplitId')) 
        this.$store.commit('leagues/SET_SPLIT_ID', id)
      }
    },

    async setMatchup({ blueSideTeamId, redSideTeamId }: { blueSideTeamId: number, redSideTeamId: number }) {
      await Promise.all([
        this.$store.dispatch('historicalGames/getByTeamId', blueSideTeamId),
        this.$store.dispatch('historicalGames/getByTeamId', redSideTeamId)
      ])

      this.$store.dispatch('matchups/setMatchup', {
        firstTeamId: blueSideTeamId,
        secondTeamId: redSideTeamId
      })

      this.fetchCurrentMatchup()
    },

    fetchCurrentMatchup(): void {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      const gamesForFirstTeam = this.$store.getters['historicalGames/byTeamId'](firstTeamId)
      const gamesForSecondTeam = this.$store.getters['historicalGames/byTeamId'](secondTeamId)

      this.blueSideTeamId = firstTeamId
      this.redSideTeamId = secondTeamId
      this.blueSideGames = gamesForFirstTeam
      this.redSideGames = gamesForSecondTeam
    }
  }
})
</script>

<style src="./global_style.css"></style>

<style lang="scss" scoped>
#app {
  display: flex;
}
</style>

<style>
body {
  font-family: verdana, arial, helvetica, sans-serif;
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}
  header {
  display: flex;
  justify-content: flex-end;
}

header > a {
  margin: 0 0 0 10px;
}

html, body {
  height: 100%;
}

h2 {
  margin: 0;
}

</style>

