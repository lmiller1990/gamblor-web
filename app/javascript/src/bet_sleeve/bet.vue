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

<style lang="scss" scoped>
.bet { padding: 8px; }

.header {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  padding: 4px 0;
}

.info {
  display: flex;
  flex-direction: column;

  .stake {
    align-self: flex-end;
  }
}
</style>
