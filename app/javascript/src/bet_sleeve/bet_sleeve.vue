<template>
  <div class="bet_window">
    <SingleBet 
       v-for="id in betIds" 
       :key="id"
       :id="id"
       :bet="bets[id]"
     />
  </div>
</template>

<script lang="ts">
import { Bet } from '../types/bet'
import Vue from 'vue'
import axios from 'axios'
import SingleBet from './bet.vue'

export default Vue.extend({
  name: 'BetSleeve',

  components: {
    SingleBet
  },

  created() {
    this.$store.dispatch('bets/getBets')
  },

  computed: {
    bets(): Bet[] {
      return this.$store.state.bets.all
    },

    betIds(): number[] {
      return this.$store.state.bets.ids
    }
  }
})
</script>

<style scoped>
.bet_window {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 300px;
  border-right: 1px solid silver;
}
</style>
