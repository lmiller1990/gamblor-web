<template>
  <td :class="checkForVictory" 
    @mouseenter="showBetWindow"
    @mouseleave="hideBetWindow"
    @click="createBet">
    {{ resultSymbol }}
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
import { Bet } from '../types/bet'

export default Vue.extend({
  name: 'MatchHistoryRow',

  props: {
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
        return ''

      return this.victory ? 'victory' : 'defeat'
    }
  },

  methods: {
    createBet(): void {
      // negative id represents a bet not yet persisted to the database
      const bet: Bet = {
        id: this.unusedId * -1,
        priceCents: 0,
        odds: this.odds,
        teamBetOnId: this.teamId,
        gameId: this.gameId
      }

      if (!this.gameCompleted)
        this.$store.commit('bets/ADD_BET', { bet })
    },

    hideBetWindow() {
      // console.log('hide it !!', this.odds)
    },

    showBetWindow() {
      console.log('show it!!', this.odds)
    }
  }
})
</script>

<style scoped>
.victory { background-color: deepskyblue; }
.defeat  { background-color: red; }

td { 
  border: 1px solid black; 
  text-align: center;
  padding: 5px;
  width: 30px;
}

</style>
