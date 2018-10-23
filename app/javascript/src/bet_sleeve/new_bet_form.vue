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
        <button 
          data-test="cancel-btn" 
          type="button" 
          @click="cancel">
          <span> ✕ </span>
        </button>
        <input type="string" v-model="priceDollars">
        <input type="submit" value="Place Bet">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { betProps } from './bet_props'
import { dollars } from '../filters/index'

import Vue from 'vue'

export default Vue.extend({
  name: 'NewBetForm',

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
