<template>
  <div class="matchup_container">
    <MatchHistory 
      v-if="isCurrentMatchup"
      :games="blueSideGames"
      :teamId="blueSideTeamId"
    />
    <MatchHistory 
      v-if="isCurrentMatchup"
      :games="redSideGames"
      :teamId="redSideTeamId"
    />
    <UpcomingMatchesContainer @matchupSelected="setMatchup" />
  </div>
</template>

<script>
// import { ChartCreator } from './draw_chart.js'
// import { getAndProcessMarketData } from './fetch_and_process_market_data.js'
import { options } from '../teams/chart_options.js'
import UpcomingMatchesContainer from '../upcoming_matches/upcoming_matches_container.vue'
import MatchHistory from './match_history.vue'

export default {
  data() {
    return {
      redSideTeamId: 0,
      blueSideTeamId: 0,
      redSideGames: [],
      blueSideGames: []
    }
  },

  components: {
    UpcomingMatchesContainer,
    MatchHistory
  },

  computed: {
    isCurrentMatchup() {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      return firstTeamId && secondTeamId
    }
  },

  methods: {
    fetchCurrentMatchup() {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      const gamesForFirstTeam = this.$store.getters['games/byTeamId'](firstTeamId)
      const gamesForSecondTeam = this.$store.getters['games/byTeamId'](secondTeamId)

      this.blueSideTeamId = firstTeamId
      this.redSideTeamId = secondTeamId
      this.blueSideGames = gamesForFirstTeam
      this.redSideGames = gamesForSecondTeam
    },

    async setMatchup({ blueSideTeamId, redSideTeamId }) {
      await this.$store.dispatch('matchups/setMatchup', {
        firstTeamId: blueSideTeamId,
        secondTeamId: redSideTeamId
      })
      this.fetchCurrentMatchup()
    },

    getTeamById(id) {
      return this.$store.state.teams.all[id]
    },

    // TODO: Delete me
    fetchDataForTeams(firstTeamId, secondTeamId) {
      const firstTeam = this.getTeamById(firstTeamId)
      const secondTeam = this.getTeamById(secondTeamId)

      return Promise.all([
        getAndProcessMarketData({ 
          label: firstTeam.name, 
          teamId: firstTeamId, 
          firstMarket: 'first_blood',
          borderColor: 'red' 
        }), 
        getAndProcessMarketData({ 
          label: secondTeam.name, 
          teamId: secondTeamId, 
          firstMarket: 'first_blood', 
          borderColor: 'red' 
        })
      ])
    }
  }
}
</script>

<style scoped>
.matchup_container {
  display: flex;

}
</style>
