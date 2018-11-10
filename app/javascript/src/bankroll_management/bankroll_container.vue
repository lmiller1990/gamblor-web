<template>
  <div class="bankroll_wrapper">
    Bankroll Container
    {{ selectedBet }}
  </div> 
</template>

<script lang="ts">
import { Bet } from '../types/bet'
import Vue from 'vue'

export default Vue.extend({
  name: 'BankrollContainer',

  computed: {
    selectedBet(): Bet {
      return this.$store.getters['bets/selected']
    }
  }
})
</script>

