<template>
  <a v-if="canEdit" :href="`/games/${id}/edit`">
    {{ date | shortDate }}
  </a>
  <div v-else-if="!canEdit">
    {{ date | shortDate }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { shortDate } from '../filters/index'

export default Vue.extend({
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
    
    canEdit: {
      type: Boolean,
      required: true
    }
  }
})
</script>
