<template>
  <div class="bet">
    <div class="header">
      <div>{{ teamBetOn }}</div>
      <div>{{ odds }}</div>
    </div>
    <div class="info">
      <div>
        {{ gameTitle }}
      </div>
      <div class="stake">
        {{ priceCents | dollars }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { betProps } from './bet_props'

import Vue from 'vue'

export default Vue.extend({
  name: 'NewBetForm',

  props: {
    ...betProps,
    priceCents: {
      type: Number,
      default: 0.0
    }
  }
})
</script>

<style lang="scss" scoped>
@import './bet_form.scss';
</style>
