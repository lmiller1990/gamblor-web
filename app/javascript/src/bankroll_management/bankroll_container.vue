<template>
  <div class="bankroll_wrapper">
    Bankroll Container
    {{ odds }}
    {{ bankroll }}
    <div v-for="{ amountInCents, nLastGames } in getRecommendedBets(0.2)">
      Over last {{ nLastGames }}: {{ amountInCents | dollars }}
    </div>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import { Bet } from '../types/bet'
import { dollars } from '../filters'

import { fractionalKelly } from '../bankroll'

export default Vue.extend({
  name: 'BankrollContainer',

  filters: { dollars },

  computed: {
    odds(): number {
      return this.$store.state.bets.selectedOdds
    },

    bankroll(): number {
      return this.$store.state.bankAccount.balanceCents
    },

    evs(): number {
      return this.$store.state.bets.selectedBetEvs
    }
  },

  methods: {
    getRecommendedBets(fraction: number): number[] {
      const recommendations = []

      for (const { ev, nLastGames } of this.evs) {
        // all-time isn't useful, since players change so often.
        if (nLastGames > 0) {
          recommendations.push({
            nLastGames,
            amountInCents: fractionalKelly(this.bankroll, ev, this.odds, fraction)
          })
        }
      }

      return recommendations
    }
  }
})
</script>

