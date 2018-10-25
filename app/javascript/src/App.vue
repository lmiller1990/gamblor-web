<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component :is="leftStickyComponent"
        v-if="loaded && loadedBets" 
        class="left_sticky_window"
        @toggle="toggleLeftSticky"
      />
    </transition>
    <CurrentMatchupContainer 
      :currentMatchupSelected="currentMatchupSelected"
      :blueSideGames="blueSideGames"
      :blueSideTeamId="blueSideTeamId"
      :redSideTeamId="redSideTeamId"
      :redSideGames="redSideGames"
      @teamSelected="selectTeam"
      @createBet="showBetSleeve"
    />
    <UpcomingMatchesContainer 
      class="schedule"
      :splitId="splitId"
      @matchupSelected="setMatchup" 
      @selectSplit="setSplitId"
    />
  </div>
</template>

<script lang="ts">
import HowToUse from './components/how_to_use.vue'
import BetSleeve from './bet_sleeve/bet_sleeve.vue'
import CurrentMatchupContainer from './current_matchup/current_matchup_container.vue'
import UpcomingMatchesContainer from './upcoming_matches/upcoming_matches_container.vue'

export default {
  name: 'App',

  components: {
    CurrentMatchupContainer,
    UpcomingMatchesContainer
  },

  async created() {
    this.fetchBets().then(() => this.loadedBets = true)
    this.fetchLeaguesAndSplits().then(() => {
      this.setDefaults()
      this.loaded = true
    })
  },
  
  data() {
    return {
      leftStickyComponent: HowToUse, // BetSleeve,
      loadedBets: false,
      loaded: false,
      redSideTeamId: 0,
      blueSideTeamId: 0,
      redSideGames: [],
      blueSideGames: [],
      splitId: undefined
    }
  },

  computed: {
    currentMatchupSelected(): boolean {
      return (this.blueSideTeamId && this.redSideTeamId) !== 0
    }
  },

  methods: {
    showBetSleeve(): void {
      this.leftStickyComponent = BetSleeve
    },

    toggleLeftSticky(): void {
      this.leftStickyComponent === HowToUse
      ? this.leftStickyComponent = BetSleeve
      : this.leftStickyComponent = HowToUse

    },

    async fetchBets() {
      await this.$store.dispatch('bets/getBets')
      const gameIds = this.$store.getters['bets/gameIdsForAllBets']
      await this.$store.dispatch('games/getByIds', gameIds)
    },

    setSplitId({ id }: { id: number }) {
      this.splitId = id
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
      this.setSplitId({ id: defaultSplitId })

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

<style scoped>
#app {
  display: flex;
}

.left_sticky_window {
  overflow-y: scroll;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 400px;
}

.schedule {
  height: 80vh;
  width: 400px;
  position: sticky;
  top: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
