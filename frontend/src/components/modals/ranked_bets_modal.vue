<template>
  <div>
    <p>
      This modal ranks bets for the upcoming games based on their EV over the last N games.
    </p>
    <p>
      You can change the number of past games considered when ranking the bets. Make sure both teams have at least
      that many games, or you may get inaccuarte data.
    </p>

    <div class="forms">

      <form @submit.prevent="fetchBets">
        <div>
          <label for="last-n-games">Last N Games:{{' '}}</label>
          <input
            id="last-n-games"
            v-model="lastNGames"
          />
        </div>

        <LcsButton>
          Submit
        </LcsButton>
      </form>

      <form>
        <div class="filters">
          <label for="min-ev">Min EV:{{' '}}</label>
          <input
            id="min-ev"
            v-model="minEv"
          />
        </div>

        <div class="filters">
          <label for="min-ev">Min Success Rate Diff (%):{{' '}}</label>
          <input
            id="minDiff"
            v-model="minDiff"
          />
        </div>
      </form>

    </div>
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
          <td>Opp. Success Rate</td>
        </tr>

        <tr
          v-for="bet in filteredBets"
          :key="bet.id"
        >
          <td>{{ bet.team }}</td>      
          <td>{{ bet.opponent }}</td>      
          <td>{{ bet.market }}</td>      
          <td>{{ bet.ev | rounded }}</td>      
          <td>{{ bet.odds }}</td>      
          <td>{{ bet.percentage | rounded }}%</td>
          <td>{{ bet.opponentPercentage | rounded }}%</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import LcsButton from '../../widgets/lcs_button.vue'

import { rounded } from '../../filters'

interface IBetWithEv {
  id: number
  ev: number
  market: 'fb' | 'ft' | 'fd' | 'fbaron'
  percentage: number
  opponentPercentage: number
  odds: number
  team: string
  opponent: string
}

interface IData {
  bets: IBetWithEv[]
  lastNGames: number
  minEv: number
  minDiff: number
}


export default Vue.extend({
  name: 'RankedBetsModal',

  components: {
    LcsButton
  },

  filters: {
    rounded
  },

  data(): IData {
    return {
      bets: [],
      lastNGames: 20,
      minDiff: 10,
      minEv: 1.1,

    }
  },

  created() {
    this.fetchBets()
  },

  computed: {
    filteredBets(): IBetWithEv[] {
      return this.bets.filter((bet: IBetWithEv) => {
        return  bet.percentage - bet.opponentPercentage > this.minDiff &&
          bet.ev > this.minEv
      })
    }
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
form > div {
  display: flex;
}

.forms {
  display: flex;
  justify-content: space-between;
}

.filters {
  display: flex;
  justify-content: flex-end;
}

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
