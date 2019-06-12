<template>
  <div>
    <p>
      This modal ranks bets for the upcoming games based on their EV over the last 15 games.
    </p>
    <p>
      You can change the number of past games considered when ranking the bets. Make sure both teams have at least
      that many games, or you may get inaccuarte data.
    </p>

    <form @submit.prevent="fetchBets">
      <input
        v-model="lastNGames"
      />
      <button>Submit</button>
    </form>
    <br />

    <div class="table">
      <table>
        <tr>
          <td>Team</td>
          <td>Opponent</td>
          <td>Market</td>
          <td>EV</td>
          <td>Odds</td>
          <td>Success Rate</td>
        </tr>

        <tr
          v-for="bet in bets"
          :key="bet.id"
        >
          <td>{{ bet.team }}</td>      
          <td>{{ bet.opponent }}</td>      
          <td>{{ bet.market }}</td>      
          <td>{{ bet.ev | rounded }}</td>      
          <td>{{ bet.odds }}</td>      
          <td>{{ bet.percentage | rounded }}%</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

import { rounded } from '../../filters'

interface IBetWithEv {
  id: number
  ev: number
  market: 'fb' | 'ft' | 'fd' | 'fbaron'
  percentage: number
  odds: number
  team: string
  opponent: string
}

interface IData {
  bets: IBetWithEv[]
  lastNGames: number
}


export default Vue.extend({
  name: 'RankedBetsModal',

  filters: {
    rounded
  },

  data(): IData {
    return {
      bets: [],
      lastNGames: 15
    }
  },

  created() {
    this.fetchBets()
  },

  methods: {
    async fetchBets() {
      const response = await axios.get<IBetWithEv[]>(`/api/v1/markets_with_ev?last_n_games=${this.lastNGames}`)
      this.bets = response.data.sort((x, y) => y.ev - x.ev)
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