<template>
  <div>
    <div class="table">
      <table>
        <tr>
          <td>Date</td>
          <td>Team</td>
          <td>Market</td>
          <td>Opp.</td>
          <td>Team Success</td>
          <td>Opp. Success</td>
          <td>Odds</td>
          <td>EV</td>
        </tr>

        <tr
          v-for="rec in recommendations"
          :key="rec.id"
        >
          <td>{{ rec.date | shortDate }}</td>      
          <td>{{ rec.team.name }}</td>      
          <td>{{ rec.market }}</td>      
          <td>{{ rec.opponent.name }}</td>      
          <td>{{ rec.teamSuccess | rounded }}</td>      
          <td>{{ rec.opponentSuccess | rounded }}</td>      
          <td>{{ rec.odds | rounded }}</td>      
          <td>{{ rec.ev | rounded }}%</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

import { rounded, shortDate } from '../../filters'
import { Game } from '../../types/game'
import { ITeam } from '../../types/team';

interface IData {
  recommendations: IRecommendation[]
  simulations: IBetSimulation[]
}

interface IRecommendation {
  date: string
  ev: number
  game: Game
  market: 'fb' | 'ft' | 'fd' | 'fbaron'
  teamSuccess: number
  opponentSuccess: number
  odds: number
  opponent: ITeam
  team: ITeam
}

interface IBetSimulation {
  date: string
  team: ITeam
  opponent: ITeam
  ev: number
  market: 'fb' | 'ft' | 'fd' | 'fbaron'
  odds: number
  betAmount: number
  result: 0 | 1
}

interface ISimulationPayload {
  simulations: IBetSimulation[]
  recommendations: IRecommendation[]
}
export default Vue.extend({
  name: 'SimulateBetsModal',

  filters: {
    rounded,
    shortDate
  },

  data(): IData {
    return {
      recommendations: [],
      simulations: []
    }
  },

  created() {
    this.fetchSimulation()
  },

  methods: {
    async fetchSimulation() {
      const response = await axios.get<ISimulationPayload>(`/api/v1/simulation`)
      this.recommendations = response.data.recommendations.sort((x, y) =>
        +new Date(x.date) - +new Date(y.date)
      )
      this.simulations = response.data.simulations.sort((x, y) =>
        +new Date(x.date) - +new Date(y.date)
      )
    }
  }
})

</script>

<style scoped>
.table {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  font-size: 12px;
}

tr, td { 
  padding: 5px;
  border: 1px solid black;
}
</style>
