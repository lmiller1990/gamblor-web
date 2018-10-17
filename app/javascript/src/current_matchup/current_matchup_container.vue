<template>
  <div class="matchup_container">
    <CurrentMatchupInfo 
      v-if="isCurrentMatchup"
      class="team_history"
      :blueSideGames="blueSideGames"
      :blueSideTeamId="blueSideTeamId"
      :redSideTeamId="redSideTeamId"
      :redSideGames="redSideGames"
      @change="selectTeam" />

    <div 
      v-if="!isCurrentMatchup" 
      class="team_history">
      No matchup selected
    </div>

    <div class="schedule">
      <div class="schedule_header">
        <h2 class="header">Schedule</h2>
        <LeagueSelector 
          :selectedId="splitId"
          @change="selectSplit" 
        />
      </div>
      <div class="upcoming_matches" v-if="splitId">
        <UpcomingMatchesContainer 
          :splitId="splitId"
          @matchupSelected="setMatchup" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { options } from '../teams/chart_options.js'
import CurrentMatchupInfo from './current_matchup_info.vue'
import LeagueSelector from '../components/league_selector.vue'
import UpcomingMatchesContainer from '../upcoming_matches/upcoming_matches_container.vue'

export default {
  data() {
    return {
      splitId: undefined,
      redSideTeamId: 0,
      blueSideTeamId: 0,
      redSideGames: [],
      blueSideGames: []
    }
  },

  components: {
    LeagueSelector,
    CurrentMatchupInfo,
    UpcomingMatchesContainer
  },

  computed: {
    isCurrentMatchup() {
      return this.blueSideTeamId && this.redSideTeamId
    }
  },

  methods: {
    selectSplit(splitId) {
      this.splitId = splitId
    },

    selectTeam(teamId, side) {
      if (side === 'blue')
        this.setMatchup({ blueSideTeamId: parseInt(teamId), redSideTeamId: this.redSideTeamId })

      if (side === 'red')
        this.setMatchup({ blueSideTeamId: this.blueSideTeamId, redSideTeamId: parseInt(teamId) })
    },

    fetchCurrentMatchup() {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      const gamesForFirstTeam = this.$store.getters['historicalGames/byTeamId'](firstTeamId)
      const gamesForSecondTeam = this.$store.getters['historicalGames/byTeamId'](secondTeamId)

      this.blueSideTeamId = firstTeamId
      this.redSideTeamId = secondTeamId
      this.blueSideGames = gamesForFirstTeam
      this.redSideGames = gamesForSecondTeam
    },

    async setMatchup({ blueSideTeamId, redSideTeamId }) {
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
  justify-content: space-around;
}

.upcoming_matches {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
}

.schedule {
  width: 450px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.schedule_header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
