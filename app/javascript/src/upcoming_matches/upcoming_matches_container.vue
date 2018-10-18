<template>
  <div class="matchups">
    <div class="header">
      <h2>Schedule</h2>
      <LeagueSplitSelector 
        :selectedId="splitId"
        @change="selectSplit" 
      />
    </div>
    <div 
      v-show="!loading" 
      class="matchup-container">
      <Match
        v-for="matchId in matchIds"
        :key="matchId"
        :match-id="matchId"
        @selected="fetchMatchup"
      />
      <div id="end_of_schedule"></div>
    </div>
    <div class="status">
      <form @submit.prevent="signout">
        <input type="submit" value="Sign out">
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LeagueSplitSelector from '../components/league_split_selector.vue'
import Match from './match.vue'

export default {
  components: {
    LeagueSplitSelector,
    Match
  },

  async created() {
    await this.fetchLeaguesAndSplits()
    this.setDefaultSplit()
    this.fetchGamesAndTeams()
  },

  data() {
    return {
      loading: true,
      splitId: undefined
    }
  },

  computed: {
    matchIds() {
      return this.$store.getters['scheduledGames/bySplitId'](this.splitId)
    },

    matches() {
      return this.$store.state.scheduledGames.all
    }
  },

  methods: {
    async signout() {
      await axios.delete('/api/v1/session')
      document.location.replace('/')
    },

    async selectSplit(splitId) {
      this.splitId = splitId
      await this.fetchGames()
      this.scrollToBottomOfContainer()
    },

    setDefaultSplit() {
      const name = this.$store.state.leagues.defaultSplit
      const defaultSplit = this.$store.getters['leagues/getSplitByName'](name)
      this.splitId = defaultSplit.id
    },

    fetchMatchup({ matchId }) {
      this.$emit('matchupSelected', { 
        blueSideTeamId: this.matches[matchId].blueSideTeamId,
        redSideTeamId: this.matches[matchId].redSideTeamId
      })
    },

    fetchGames() {
      return this.$store.dispatch('scheduledGames/getUpcomingGames', { splitId: this.splitId })
    },
    
    scrollToBottomOfContainer() {
      this.$el.querySelector('#end_of_schedule').scrollIntoView()
    },

    fetchLeaguesAndSplits() {
      return this.$store.dispatch('leagues/getLeagues')
    },

    async fetchGamesAndTeams() {
      await Promise.all([
        this.fetchGames(),
        this.$store.dispatch('teams/getTeams')
      ])
      this.loading = false 

      setTimeout(this.scrollToBottomOfContainer)
    }
  }
}
</script>

<style scoped>
.status, .header {
  height: 10vh;
  border: 1px solid black;
  box-sizing: border-box;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.matchup-container {
  height: 80vh;
  overflow-y: scroll;
}
</style>
