<template>
  <div>
    <div v-if="!loading">
      <h3>Current Match (container)</h3>
      <div class="matchup-container">
        <Match
          v-for="matchId in matchIds"
          :key="matchId"
          :match-id="matchId"
          @selected="fetchMatchup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Match from './match.vue'

export default {
  components: {
    Match
  },

  created() {
    this.fetchData()
  },

  data() {
    return {
      loading: true
    }
  },

  computed: {
    matchIds() {
      return this.$store.state.games.ids
    },

    matches() {
      return this.$store.state.games.all
    }
  },

  methods: {
    fetchMatchup({ matchId }) {
      this.$store.dispatch('matchups/setMatchup', { 
        firstTeamId: this.matches[matchId].blueSideTeamId,
        secondTeamId: this.matches[matchId].redSideTeamId
      })
    },

    async fetchData() {
      await Promise.all([
        this.$store.dispatch('games/getUpcomingGames'),
        this.$store.dispatch('teams/getTeams')
      ])
      this.loading = false 
    }
  }
}
</script>

<style scoped>
.matchup-container {
  width: 400px;
}
</style>
