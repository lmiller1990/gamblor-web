<template>
  <div class="bet">
    {{ gameTitle }}
    {{ teamBetOn }}
    {{ priceCents | dollars }}
    {{ odds }}
  </div>
</template>

<script lang="ts">
import { dollars } from '../filters/index'

export default {
  name: 'Bet',

  props: {
    gameTitle: {
      type: String,
      required: true
    },

    odds: {
      type: Number,
      required: true
    },

    priceCents: {
      type: Number,
      required: true
    },

    id: {
      type: Number,
      required: true
    },

    teamBetOn: {
      type: String,
      required: true
    }
  },

  filters: { dollars }
}
</script>

<style scoped>
</style>
