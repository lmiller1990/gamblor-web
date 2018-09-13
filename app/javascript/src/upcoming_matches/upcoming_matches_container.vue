<template>
  <div>
    <div v-if="!loading">
      <div class="matchup-container">
        <Match
          v-for="matchId in matchIds"
          :key="matchId"
          :match-id="matchId"
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
    }
  },

  methods: {
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
