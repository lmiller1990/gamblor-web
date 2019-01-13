<template>
  <div class="bankroll_wrapper">
    <div>
      Odds: {{ odds }} 
    </div>
    <div>
      Current Bankroll: {{ bankroll | dollars }}
    </div>

    <br>

    <div>
      <label for="fraction">Kelly criterion fraction:</label>
      <input 
         id="fraction"
         v-model="fraction" 
         type="number"
      >%

    </div>

    <br>
    
    <div>
      Using the odds and your current bankroll, the recommended bet calculated using the <a href="/kelly_criterion">Kelly Criterion</a> is:
    </div>

    <ul v-for="{ amountInCents, nLastGames } in getRecommendedBets">
      <li>
        Based on last {{ nLastGames }} games: {{ amountInCents | dollars }}
        <div v-if="amountInCents < 0" class="warning">
         * This bet has a EV less than 1.0.
        </div>
      </li>

    </ul>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import { Ev } from '../types/ev'
import { Bet } from '../types/bet'
import { dollars } from '../filters'

import { fractionalKelly } from '../bankroll'

export default Vue.extend({
  name: 'BankrollContainer',

  filters: { dollars },

  data() {
    return {
      fraction: 20
    }
  },

  computed: {
    odds(): number {
      return this.$store.state.bets.selectedOdds
    },

    bankroll(): number {
      return this.$store.state.bankAccount.balanceCents
    },

    evs(): Ev[] {
      return this.$store.state.bets.selectedBetEvs
    },

    getRecommendedBets(): number[] {
      const recommendations = []

      for (const { ev, nLastGames } of this.evs) {
        // all-time isn't useful, since players change so often.
        if (nLastGames > 0) {
          recommendations.push({
            nLastGames,
            amountInCents: fractionalKelly(this.bankroll, ev, this.odds, this.fraction / 100)
          })
        }
      }

      return recommendations
    }
  }
})
</script>

<style scoped>
.warning {
  margin-left: 20px;
  color: red;
}

#fraction {
  width: 35px;
}
</style>

