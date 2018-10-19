<template>
  <div class="bet_window">
    <SingleBet 
       v-for="id in betIds" 
       :key="id"
       :id="id"
       :teamBetOn="teamBetOn(id)"
       :priceCents="bets[id].priceCents"
       :odds="bets[id].odds"
       :gameTitle="gameTitle(bets[id].gameId)"
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
    // TODO: Proper types
    // { [bet.id]: Bet }
    bets(): object {
      return this.$store.state.bets.all
    },

    betIds(): number[] {
      return this.$store.state.bets.ids
    }
  },

  methods: {
    gameTitle(id: number): string {
      return this.$store.getters['games/titleById'](id)
    },

    teamBetOn(id: number): string {
      return this.$store.getters['teams/nameById'](id)
    }
  }
})
</script>

<style scoped>
.bet_window {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 400px;
  border-right: 1px solid silver;
}
</style>
