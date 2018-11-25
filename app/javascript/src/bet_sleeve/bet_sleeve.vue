<template>
  <div class="bet_window">
    <div class="header">
      <span>Balance: {{ balance | dollars }}</span>
    </div>
    <span id="top"></span>
    <NewBetForm 
      v-for="id in tentativeBetIds" 
      :key="id"
      :id="id"
      :teamBetOn="teamBetOn(bets[id].teamBetOnId)"
      :priceCents="bets[id].priceCents"
      :odds="bets[id].odds"
      :gameTitle="gameTitle(bets[id].gameId)"
      :market="bets[id].market"
      :status="bets[id].status"
      @submit="priceDollars => createBet({ id, priceDollars })"
      @cancel="cancel({ id })"
      @recommend="handleRecommend"
    />
    <SingleBet 
       v-for="id in persistedBetIds" 
       :key="id"
       :id="id"
       :teamBetOn="teamBetOn(bets[id].teamBetOnId)"
       :priceCents="bets[id].priceCents"
       :payoutCents="bets[id].payoutCents"
       :odds="bets[id].odds"
       :gameTitle="gameTitle(bets[id].gameId)"
       :market="bets[id].market"
       :status="bets[id].status"
     />

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

import { ModalOptions } from '../store/types'
import { Bet, BetStatus } from '../types/bet'
import { dollars } from '../filters/index'

import NewBetForm from './new_bet_form.vue'
import LcsButton from '../widgets/lcs_button.vue'
import BankrollContainer from '../bankroll_management/bankroll_container.vue'
import SingleBet from './single_bet.vue'

export default Vue.extend({
  name: 'BetSleeve',

  filters: { dollars },
  
  watch: {
    tentativeBetIds() {
      setTimeout(this.scrollToTop)
    }
  },

  components: {
    SingleBet,
    NewBetForm,
    LcsButton
  },

  computed: {
    balance(): number {
      return this.$store.state.bankAccount.balanceCents
    },

    balanceInDollars(): number {
      return this.$store.getters['bankAccount/balanceInDollars']
    },

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
    handleRecommend(odds: number, gameTitle: string) {
      const opts: ModalOptions = { component: BankrollContainer, show: true, title: gameTitle }
      this.$store.commit('bets/SET_SELECTED_ODDS', odds)
      this.$store.commit('modal/SET_MODAL', opts)
    },

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
        gameId: this.bets[id].gameId,
        status: BetStatus.AwaitingResult
      }

      await this.$store.dispatch('bets/create', { bet })
      this.$emit('betPlaced')
    },

    scrollToTop(): void {
      this.$el.querySelector('#top').scrollIntoView(true)
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
.header {
  padding: 8px;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  background-color: white;
  top: 0;
}

.bet_window {
  border-right: 1px solid silver;
}
</style>
