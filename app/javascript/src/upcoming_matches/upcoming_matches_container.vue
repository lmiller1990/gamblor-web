<template>
  <div class="matchups">
    <div v-if="!loading">
      <div class="matchup-container">
        <Match
          v-for="matchId in matchIds"
          :key="matchId"
          :match-id="matchId"
          @selected="fetchMatchup"
        />
        <div id="end_of_schedule" />
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
      return this.$store.state.scheduledGames.ids
    },

    matches() {
      return this.$store.state.scheduledGames.all
    }
  },

  methods: {
    fetchMatchup({ matchId }) {
      this.$emit('matchupSelected', { 
        blueSideTeamId: this.matches[matchId].blueSideTeamId,
        redSideTeamId: this.matches[matchId].redSideTeamId
      })
    },

    async fetchData() {
      await Promise.all([
        this.$store.dispatch('scheduledGames/getUpcomingGames'),
        this.$store.dispatch('teams/getTeams')
      ])
      this.loading = false 
      setTimeout(() => this.$el.querySelector('#end_of_schedule').scrollIntoView())
    }
  }
}
</script>

<style scoped>

.header {
  text-align: center;
}
</style>
