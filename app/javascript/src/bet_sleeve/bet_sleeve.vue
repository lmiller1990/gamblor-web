<template>
  <div class="bet_window">
    <Bet 
       v-for="id in betIds" 
       :key="id"
       :id="id"
       :bet="bets[id]"
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

  computed: {
    bets() {
      return this.$store.state.bets.all
    },

    betIds() {
      return this.$store.state.bets.ids
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
