<template>
  <div class="bet" :class="betStatus">
    <div class="header">
      <div data-bet-title>{{ teamBetOn }} to get {{ format(market) }}</div>
      <div>{{ odds.toFixed(2) }}</div>
    </div>
    <div class="info">
      <div>
        {{ gameTitle }}
      </div>
      <div class="stake">
        Stake: {{ priceCents | dollars }}
      </div>
      <div class="stake" v-if="payoutCents">
        Payout: {{ payoutCents | dollars }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BetStatus } from '../types/bet'
import { betProps } from './bet_props'
import { dollars } from '../filters/index'
import { shortToFull } from '../market_mapper'
import startCase from 'lodash/startCase'

export default Vue.extend({
  name: 'Bet',

  props: {
    ...betProps,

    payoutCents: {
      type: Number,
      required: false
    }
  },

  filters: { dollars },

  computed: {
    betStatus(): string {
      if (this.status === BetStatus.AwaitingResult) 
        return 'awaiting'
      else
        return this.status === BetStatus.Won ? 'won' : 'lost'
    }
  },

  methods: {
    format(market): string {
      return startCase(shortToFull[market])
    }
  }
})
</script>

<style lang="scss" scoped>
@import './bet_form.scss';
.won {
  color: dodgerblue;
}

.lost {
  color: red;
}

.awaiting {
}
</style>
