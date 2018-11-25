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
import HowToUse from './components/how_to_use.vue'
import BetSleeve from './bet_sleeve/bet_sleeve.vue'
import SidebarControls from './components/sidebar_controls.vue'
import CurrentMatchupContainer from './current_matchup/current_matchup_container.vue'
import UpcomingMatchesContainer from './upcoming_matches/upcoming_matches_container.vue'
import ModalManager from './components/modal_manager.vue'
import Sidebar from './components/sidebar.vue'
import BankrollContainer from './bankroll_management/bankroll_container.vue'
import { ModalOptions } from './store/types'

export default {
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

  created() {
    const opts: ModalOptions = { component: BankrollContainer, show: true }
    // this.$store.commit('modal/SET_MODAL', opts)

    Promise.all([this.fetchBets(), this.fetchBankAccount()])
      .then(() => this.loadedBets = true)

    this.fetchLeaguesAndSplits().then(() => {
      this.setDefaults()
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

    setSplitId({ id }: { id: number }) {
      this.$store.commit('leagues/SET_SPLIT_ID', id)
    },

    selectTeam({ teamId, side }: { teamId: string, side: string }) {
      if (side === 'blue')
        this.setMatchup({ blueSideTeamId: parseInt(teamId), redSideTeamId: this.redSideTeamId })

      if (side === 'red')
        this.setMatchup({ blueSideTeamId: this.blueSideTeamId, redSideTeamId: parseInt(teamId) })
    },

    // Set default settings declared on server side in config/settings.yml
    fetchLeaguesAndSplits() {
      return this.$store.dispatch('leagues/getLeagues')
    },

    setDefaults() {
      const dataSettings =  <HTMLDivElement>document.querySelector('#settings')
      const { defaultSplit, admin } = JSON.parse(dataSettings.getAttribute('data_settings') as string)

      this.$store.commit('leagues/SET_DEFAULT_SPLIT', { defaultSplit })
      this.$store.commit('user/SET_ADMIN', { admin }) 

      const defaultSplitId = this.$store.getters['leagues/getSplitByName'](defaultSplit).id

      this.$store.commit('leagues/SET_SPLIT_ID', defaultSplitId)
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

    fetchCurrentMatchup() {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      const gamesForFirstTeam = this.$store.getters['historicalGames/byTeamId'](firstTeamId)
      const gamesForSecondTeam = this.$store.getters['historicalGames/byTeamId'](secondTeamId)

      this.blueSideTeamId = firstTeamId
      this.redSideTeamId = secondTeamId
      this.blueSideGames = gamesForFirstTeam
      this.redSideGames = gamesForSecondTeam
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
}
</style>
