<template>
  <a v-if="admin" :href="`/games/${id}/edit`">
    {{ date | shortDate }}
  </a>
  <div v-else-if="!admin">
    {{ date | shortDate }}
  </div>
</template>

<script lang="ts">
import { shortDate } from '../filters/index.js'

export default {
  name: 'MatchDate',

  filters: {
    shortDate
  },

  props: {
    date: {
      type: String,
      required: true
    },

    id: {
      type: Number,
      required: true
    },
    
    admin: {
      type: Boolean,
      required: true
    }
  }
}
</script>
