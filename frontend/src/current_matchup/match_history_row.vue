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
      :evs="evs"
    />
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
import MatchEvTooltip from './match_ev_tooltip.vue'
import { Ev } from '../types/ev'
import { Bet, BetStatus } from '../types/bet'

export default Vue.extend({
  name: 'MatchHistoryRow',

  components: {
    MatchEvTooltip
  },

  props: {
    teamId: {
      type: Number,
      required: true
    },

    opponentId: {
      type: Number,
      required: false
    },

    market: {
      type: String,
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
      evs: [] as Ev[]
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
        return this.odds ? this.odds.toString() : 'TBA'

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
      // can't be on null odds
      if (!this.odds) return

      this.$emit('createBet')
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

      if (!this.gameCompleted) {
        this.$store.commit('bets/SET_SELECTED_BET_EVS', this.calcEvs())
        this.$store.commit('bets/ADD_BET', { bet })
      }
    },

    hideBetWindow() {
      this.showEv = false
    },

    calcEvs(): Ev[] {
      return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(nGames => ({
        nLastGames: nGames,
        ev: this.$store.getters['games/evByTeamId']({
          teamId: this.teamId,
          opponentId: this.opponentId,
          market: this.market,
          nLastGames: nGames,
          odds: this.odds
        })
      }) as Ev)
    },

    showBetWindow(): void {
      if (this.gameCompleted) return

      this.evs = this.calcEvs()
      this.showEv = true
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
