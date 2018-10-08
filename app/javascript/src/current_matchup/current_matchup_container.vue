<template>
  <div class="matchup_container">
    <div 
      v-if="isCurrentMatchup"
      class="team_history">

      <MatchHistory 
        :games="blueSideGames"
        :teamId="blueSideTeamId"
        side="blue"
      >
        <TeamSelector 
          slot="team-selector"
          :selectedId="blueSideTeamId"
          @change="(teamId) => selectTeam(teamId, 'blue')"
        />
      </MatchHistory>

      <MatchHistory 
        :games="redSideGames"
        :teamId="redSideTeamId"
        side="red" 
      >
        <TeamSelector 
          slot="team-selector"
          :selectedId="redSideTeamId"
          @change="(teamId) => selectTeam(teamId, 'red')"
        />
      </MatchHistory>

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
import TeamSelector from '../components/team_selector.vue'

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
    TeamSelector,
    UpcomingMatchesContainer,
    MatchHistory
  },

  computed: {
    isCurrentMatchup() {
      return this.blueSideTeamId && this.redSideTeamId
    }
  },

  methods: {
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
  width: 450px;

  height: 100vh;
  overflow-y: scroll;
}
</style>
