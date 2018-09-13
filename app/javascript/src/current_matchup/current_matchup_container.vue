<template>
  <div>
    <div v-if="isCurrentMatchup">
      <div class="charts">
        <canvas id="first_blood" width="400" height="400"></canvas>
      </div>
    </div>

    <div v-if=!currentMatchup>
    </div>
  </div>
</template>

<script>
import { ChartCreator } from './draw_chart.js'
import { getAndProcessMarketData } from './fetch_and_process_market_data.js'
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

    async currentMatchup() {
      if (this.isCurrentMatchup) {
        const { firstTeamId, secondTeamId } = this.$store.state.matchups

        const [firstTeamData, secondTeamData] = await this.fetchDataForTeams(firstTeamId, secondTeamId) 

        this.firstTeamData = {...this.firstTeamData, ...firstTeamData}
        this.secondTeamData = {...this.secondTeamData, ...secondTeamData}


        const ctx = document.getElementById('first_blood').getContext('2d')
        new ChartCreator({ ctx, options, datasets: [this.firstTeamData] }).drawChart({ ctx })
      }
    }
  },

  methods: {
    getTeamById(id) {
      return this.$store.state.teams.all[id]
    },

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
