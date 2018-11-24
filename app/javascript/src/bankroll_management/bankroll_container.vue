<template>
  <div class="bankroll_wrapper">
    Bankroll Container
    {{ odds }}
    <div>
    </div>
  </div> 
</template>

<script lang="ts">
import { Bet } from '../types/bet'
import Vue from 'vue'

export default Vue.extend({
  name: 'BankrollContainer',

  computed: {
    odds(): number {
      return this.$store.state.bets.selectedOdds
    }
  }
})
</script>

