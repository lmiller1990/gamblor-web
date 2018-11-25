<template>
  <div class="bet">
    <div class="header">
      <div>{{ teamBetOn }} to get {{ market }}</div>
      <div>{{ odds.toFixed(2) }}</div>
    </div>
    <div class="info">
      <div>
        {{ gameTitle }}
      </div>
      <div class="stake"></div>
      <form @submit.prevent="createBet">
        <LcsButton 
          data-test="cancel-btn" 
          width="20px"
          type="button" 
          @click="cancel"
        >
          X
        </LcsButton>

        <LcsButton 
          type="button"
          width="50px"
          data-test="recommend-btn" 
          @click="getRecommendation"
        >
          Help
        </LcsButton>

        <input type="string" v-model="priceDollars">
        <LcsButton type="submit">Place Bet</LcsButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import LcsButton from '../widgets/lcs_button.vue'
import { betProps } from './bet_props'
import { dollars } from '../filters/index'

import Vue from 'vue'

export default Vue.extend({
  name: 'NewBetForm',

  components: {
    LcsButton
  },

  props: {
    ...betProps,
    priceCents: {
      type: Number,
      default: 0.0
    }
  },

  filters: { dollars },

  data() {
    return {
      priceDollars: '0.00'
    }
  },

  methods: {
    getRecommendation(): void {
      this.$emit('recommend', this.odds, this.gameTitle)
    },

    cancel(): void {
      this.$emit('cancel')
    },

    createBet(): void {
      this.$emit('submit', parseFloat(this.priceDollars))
    }
  }
})
</script>

<style lang="scss" scoped>
@import './bet_form.scss';

form {
  display: flex;
}
</style>
