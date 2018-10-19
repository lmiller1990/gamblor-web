<template>
  <div>First{{ chartId }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FirstMarketGraphsContainer',

  props: {
    market: {
      type: String,
      required: true
    },

    side: {
      type: String,
      required: true
    },
    
    games: {
      type: () => Array,
      required: true
    }
  },

  methods: {
    createCanvas(): HTMLCanvasElement {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', this.chartId)
      return canvas
    },
  },

  computed: {
    chartId(): string {
      return `${this.side}_chart`
    }
  }
})
</script>
