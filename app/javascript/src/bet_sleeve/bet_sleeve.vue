<template>
  <div class="bet_window">
    <Bet v-for="bet in bets" :key="bet.id"
         :priceCents="bet.priceCents"
         :odds="bet.odds"
         :teamToWinId="bet.teamToWinId"
         :market="bet.market"
     />
  </div>
</template>

<script>
import axios from 'axios'
import Bet from './bet.vue'

export default {
  name: 'BetSleeve',

  components: {
    Bet
  },

  created() {
    this.$store.dispatch('bets/getBets')
  },

  data() {
    return {
      bets: [
        { id: 0, priceCents: 100020, odds: 1.2, teamToWinId: 1,  market: 'ft' }
      ]
    }
  }
}
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
