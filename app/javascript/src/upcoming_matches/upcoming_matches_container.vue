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

  props: {
    splitId: {
      type: Number,
      required: true
    }
  },

  created() {
    this.fetchData()
  },

  data() {
    return {
      loading: true
    }
  },

  watch: {
    splitId(val) {
      this.fetchGames()
    }
  },

  computed: {
    matchIds() {
      console.log(this.splitId)
      return this.$store.getters['scheduledGames/bySplitId'](this.splitId)
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

    fetchGames() {
      return this.$store.dispatch('scheduledGames/getUpcomingGames', { splitId: this.splitId })
    },

    async fetchData() {
      await Promise.all([
        this.fetchGames(),
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
