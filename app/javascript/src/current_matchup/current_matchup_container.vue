<template>
  <div>
    <div v-if="isCurrentMatchup">
    </div>

    <div v-if=!currentMatchup>
    </div>
  </div>
</template>

<script>
// import { ChartCreator } from './draw_chart.js'
// import { getAndProcessMarketData } from './fetch_and_process_market_data.js'
import { options } from '../teams/chart_options.js'

export default {
  data() {
    return {
      firstTeamData: {},
      secondTeamData: {}
    }
  },

  computed: {
    isCurrentMatchup() {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      return firstTeamId && secondTeamId
    },

    currentMatchup() {
      if (this.isCurrentMatchup) {
        const { firstTeamId, secondTeamId } = this.$store.state.matchups
        const gamesForFirstTeam = this.$store.getters['games/byTeamId'](firstTeamId)
        const gamesForSecondTeam = this.$store.getters['games/byTeamId'](secondTeamId)
        console.log(gamesForFirstTeam)
        console.log(gamesForSecondTeam)
      }
    }
  },

  methods: {
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
</style>
