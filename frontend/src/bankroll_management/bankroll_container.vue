<template>
  <div class="bankroll_wrapper">
    <div>
      Odds: {{ odds }} 
    </div>
    <div>
      Current bankroll: $
      <input 
        class="bankroll" 
        type="number" 
        v-model="bankrollInDollars"
      >
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

    <ul 
      v-for="{ amountInCents, nLastGames, ev } in getRecommendedBets"
      :key="nLastGames"
    >
      <li>
        <div class="recommended_bet">
          <span>Based on last {{ nLastGames }} games: {{ amountInCents | dollars }}</span>
          <LcsButton 
            width="190px"
            class="place_bet"
            @click="() => placeBet(amountInCents, ev)"
          >
            Place Bet {{ amountInCents | dollars }} @ EV of {{ ev }}
          </LcsButton>
        </div>
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
import { Bet, BetStatus } from '../types/bet'
import { dollars } from '../filters'
import LcsButton from '../widgets/lcs_button.vue'

import { fractionalKelly } from '../bankroll'

interface IRecommendedBetWithEv {
  ev: number
  nLastGames: number
  amountInCents: number
}

export default Vue.extend({
  name: 'BankrollContainer',

  components: {
    LcsButton
  },

  filters: { dollars },

  data(): {
    fraction: number, bankrollInDollars: number
  } {
    return {
      fraction: 20,
      bankrollInDollars: 0
    }
  },

  created() {
    const currentBankroll: number = this.$store.state.bankAccount.balanceCents

    this.bankrollInDollars = currentBankroll / 100
  },

  computed: {
    odds(): number {
      return this.$store.state.bets.selectedOdds
    },

    evs(): Ev[] {
      return this.$store.state.bets.selectedBetEvs
    },

    selectedBetId(): number {
      return this.$store.state.bets.selectedId
    },

    modalExtra() {
      return this.$store.state.modal.extra
    },

    getRecommendedBets(): IRecommendedBetWithEv[] {
      const bankrollInCents = this.bankrollInDollars * 100
      const recommendations: IRecommendedBetWithEv[] = []

      for (const { ev, nLastGames } of this.evs) {
        // all-time isn't useful, since players change so often.
        if (nLastGames > 0) {
          recommendations.push({
            nLastGames,
            ev: ev.toFixed(2),
            amountInCents: fractionalKelly(bankrollInCents, ev, this.odds, this.fraction / 100)
          })
        }
      }

      return recommendations
    }
  },

  methods: {
    async placeBet(amountInCents: number, ev: number) {
      const bet: Bet = {
        id: this.modalExtra.betId,
        priceCents: amountInCents,
        market: this.modalExtra.market,
        teamBetOnId: this.modalExtra.teamBetOnId,
        estimatedValue: ev,
        odds: amountInCents,
        gameId: this.modalExtra.gameId,
        status: BetStatus.AwaitingResult
      }

      await this.$store.dispatch('bets/create', { bet })
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

.bankroll {
  width: 65px;
}

.recommended_bet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.place_bet {
  margin: 0 5px;
}
</style>

