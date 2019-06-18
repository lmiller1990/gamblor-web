<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="submit" value="submit">

      <label for="fb">FB</label>
      <input 
        type="checkbox" 
        id="fb" 
        v-model="fb"
      >

      <label for="ft">FT</label>
      <input 
        type="checkbox" 
        id="ft" 
        v-model="ft"
      >

      <label for="fd">FD</label>
      <input 
        type="checkbox" 
        id="fd" 
        v-model="fd"
      >

      <label for="fbaron">FBaron</label>
      <input 
        type="checkbox" 
        id="fbaron" 
        v-model="fbaron"
      >

      <label for="min-ev">Min EV to bet on:</label>
      <input 
        id="min-ev" 
        v-model="minEv"
      >

      <label for="min-diff">Min % diff:</label>
      <input 
        id="min-diff" 
        v-model="minDiff"
      >


    </form>
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
          <td>Bet</td>
          <td>Outcome</td>
          <td>Profit</td>
        </tr>

        <tr
          v-for="rec in recommendations"
          :key="rec.id"
        >
          <td>{{ rec.date | shortDate }}</td>      
          <td>{{ rec.team.name }}</td>      
          <td>{{ rec.market }}</td>      
          <td>{{ rec.opponent.name }}</td>      
          <td>{{ rec.teamSuccess * 100 | rounded }}%</td>      
          <td>{{ rec.opponentSuccess * 100 | rounded }}%</td>      
          <td>{{ rec.odds }}</td>      
          <td>{{ rec.ev }}</td>
          <td>${{ getBetAmount(rec) }}</td>
          <td>{{ getResult(rec) }}</td>
          <td>${{ 
            (getResult(rec) === 'lose' ? 0 : getBetAmount(rec) * rec.odds) | rounded
            }}</td>
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
  outcomes: IBetSimulation[]
  fb: boolean
  ft: boolean
  fd: boolean
  minEv: string
  minDiff: string
  fbaron: boolean
}

interface IRecommendation {
  id: string
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
  id: string
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
  simulation: {
    outcomes: IBetSimulation[]
    percentProfit: number
    accuracy: number
  }
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
      fb: true,
      fd: true,
      ft: true,
      fbaron: false,
      recommendations: [],
      outcomes: [],
      minEv: '1.2',
      minDiff: '20'
    }
  },

  created() {
    this.fetchSimulation()
  },

  methods: {
    async handleSubmit() {
      await this.fetchSimulation()
    },

    getResult(rec: IRecommendation): 'win' | 'lose' {
      return this.outcomes.filter(x => x.id === rec.id)[0].result
        ? 'win'
        : 'lose'
    },


    getBetAmount(rec: IRecommendation): number {
      return this.outcomes.filter(x => x.id === rec.id)[0].betAmount
    },

    async fetchSimulation() {
      const markets = []
      if (this.fb) markets.push('fb')
      if (this.ft) markets.push('ft')
      if (this.fd) markets.push('fd')
      if (this.fbaron) markets.push('fbaron')

      const response = await axios.get<ISimulationPayload>(
        `/api/v1/simulation?markets=${markets.join(',')}&min_ev=${this.minEv}&min_diff=${this.minDiff}`)
      this.outcomes = response.data.simulation.outcomes
      this.recommendations = response.data.recommendations.sort((x, y) =>
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

label {
  margin-left: 5px;
}
</style>
