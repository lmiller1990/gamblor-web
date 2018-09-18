<template>
  <div class="matchup_container">
    <div 
      v-if="isCurrentMatchup"
      class="team_history">
      <MatchHistory 
        :games="blueSideGames"
        :teamId="blueSideTeamId"
        side="blue" />
      <MatchHistory 
        :games="redSideGames"
        :teamId="redSideTeamId"
        side="red" />
    </div>
    <div v-else class="team_history">
      No matchup selected
    </div>
    <div class="upcoming_matches">
      <UpcomingMatchesContainer @matchupSelected="setMatchup" />
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>
.matchup_container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.team_history {
  width: 100%;
  padding: 2px;
  display: flex;
}

.upcoming_matches {
  border-left: 1px solid black;
  padding: 2px;
  width: 450px;
}
</style>
