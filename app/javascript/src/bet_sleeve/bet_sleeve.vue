<template>
  <div class="bet_window">
    <SingleBet 
       v-for="id in persistedBetIds" 
       :key="id"
       :id="id"
       :teamBetOn="teamBetOn(bets[id].teamBetOnId)"
       :priceCents="bets[id].priceCents"
       :odds="bets[id].odds"
       :gameTitle="gameTitle(bets[id].gameId)"
       :market="bets[id].market"
     />

    <NewBetForm 
      v-for="id in tentativeBetIds" 
      :key="id"
      :id="id"
      :teamBetOn="teamBetOn(bets[id].teamBetOnId)"
      :priceCents="bets[id].priceCents"
      :odds="bets[id].odds"
      :gameTitle="gameTitle(bets[id].gameId)"
      :market="bets[id].market"
      @submit="priceDollars => createBet({ id, priceDollars })"
      @cancel="cancel({ id })"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Bet } from '../types/bet'
import NewBetForm from './new_bet_form.vue'
import SingleBet from './bet.vue'

export default Vue.extend({
  name: 'BetSleeve',

  components: {
    SingleBet,
    NewBetForm
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

    tentativeBetIds(): number[] {
      return this.$store.getters['bets/tentativeBetIds']
    },

    persistedBetIds(): number[] {
      return this.$store.getters['bets/persistedBetIds']
    }
  },

  methods: {
    cancel({ id }: { id: number }) {
      this.$store.commit('bets/CANCEL', { id })
    },

    async createBet({ id, priceDollars }: { id: number, priceDollars: number }) {
      const bet: Bet = {
        id: id,
        priceCents: priceDollars * 100,
        market: this.bets[id].market,
        teamBetOnId: this.bets[id].teamBetOnId,
        odds: this.bets[id].odds,
        gameId: this.bets[id].gameId
      }

      await this.$store.dispatch('bets/create', { bet })
    },

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
  overflow-y: scroll;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 400px;
  border-right: 1px solid silver;
}
</style>
