<template>
  <td 
    :class="checkForVictory" 
    @mouseenter="showBetWindow"
    @mouseleave="hideBetWindow"
    @click="createBet">
    {{ resultSymbol }}
    <MatchEvTooltip 
      v-if="showEv" 
      :topOffset="topOffset"
      :ev="ev"
    />
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
import MatchEvTooltip from './match_ev_tooltip.vue'
import { Bet, BetStatus } from '../types/bet'

export default Vue.extend({
  name: 'MatchHistoryRow',

  components: {
    MatchEvTooltip
  },

  props: {
    market: {
      type: String,
      required: true
    },

    teamId: {
      type: Number,
      required: true
    },

    gameId: {
      type: Number,
      required: true
    },

    victory: {
      type: Boolean,
      required: false
    },

    gameCompleted: {
      type: Boolean,
      required: true
    },

    odds: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      showEv: false,
      topOffset: 0,
      ev: 0
    }
  },

  mounted(): void {
    this.topOffset = this.$el.offsetHeight
  },

  computed: {
    unusedId(): number {
      return this.$store.getters['bets/unusedId']
    },

    resultSymbol(): string {
      if (!this.gameCompleted)
        return this.odds ? this.odds.toString() : ''

      return this.victory ? '✓' : '✘'
    },

    checkForVictory(): string {
      if (!this.gameCompleted)
        return 'awaiting_result'

      return this.victory ? 'victory' : 'defeat'
    }
  },

  methods: {
    createBet(): void {
      // negative id represents a bet not yet persisted to the database
      const bet: Bet = {
        market: this.market,
        id: this.unusedId * -1,
        priceCents: 0,
        odds: this.odds,
        teamBetOnId: this.teamId,
        gameId: this.gameId,
        status: BetStatus.AwaitingResult
      }

      if (!this.gameCompleted)
        this.$store.commit('bets/ADD_BET', { bet })
    },

    hideBetWindow() {
      this.showEv = false
      // console.log('hide it !!', this.odds)
    },

    showBetWindow() {
      this.ev = this.$store.getters['games/evByTeamId']({
        teamId: this.teamId,
        opponentId: 0,
        market: this.market,
        nLastGames: 4,
        odds: this.odds
      })
      this.showEv = true
      // console.log('show it!!', this.odds)
    }
  }
})
</script>

<style lang="scss" scoped>
.victory { background-color: deepskyblue; }
.defeat  { background-color: red; }

td { 
  border: 1px solid black; 
  text-align: center;
  padding: 5px;
  width: 30px;
  cursor: default;
  position: relative;
}

.awaiting_result {
  &:hover {
    background-color: silver;
    cursor: pointer;
  }
}
</style>
