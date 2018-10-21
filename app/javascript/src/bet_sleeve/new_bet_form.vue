<template>
  <div class="bet">
    <div class="header">
      <div>{{ teamBetOn }} to get {{ market }}</div>
      <div>{{ odds }}</div>
    </div>
    <div class="info">
      <div>
        {{ gameTitle }}
      </div>
      <div class="stake">
      </div>
      <form @submit.prevent="createBet">
        <input type="string" v-model="priceDollars">
        <input type="submit" value="Create Bet">
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
    createBet() {
      this.$emit('submit', parseFloat(this.priceDollars))
    }
  }
})
</script>

<style lang="scss" scoped>
@import './bet_form.scss';
</style>
