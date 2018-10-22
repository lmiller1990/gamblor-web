<template>
  <div class="bet" :class="betStatus">
    <div class="header">
      <div>{{ teamBetOn }} to get {{ market }}</div>
      <div>{{ odds }}</div>
    </div>
    <div class="info">
      <div>
        {{ gameTitle }}
      </div>
      <div class="stake">
        Stake: {{ priceCents | dollars }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BetStatus } from '../types/bet'
import { betProps } from './bet_props'
import { dollars } from '../filters/index'

export default Vue.extend({
  name: 'Bet',

  props: betProps,

  filters: { dollars },

  computed: {
    betStatus(): string {
      if (this.status === BetStatus.AwaitingResult) 
        return 'awaiting'
      else
        return this.status === BetStatus.Won ? 'won' : 'lost'
    }
  }
})
</script>

<style lang="scss" scoped>
@import './bet_form.scss';
.won {
  color: blue;
}

.lost {
  color: red
}

.awaiting {
}
</style>
