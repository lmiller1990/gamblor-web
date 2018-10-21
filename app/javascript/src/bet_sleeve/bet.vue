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
        {{ priceCents | dollars }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { betProps } from './bet_props'
import { dollars } from '../filters/index'

export default {
  name: 'Bet',

  props: betProps,

  filters: { dollars }
}
</script>

<style lang="scss" scoped>
@import './bet_form.scss';
</style>
