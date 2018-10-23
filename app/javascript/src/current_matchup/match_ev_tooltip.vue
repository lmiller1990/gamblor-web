<template>
  <div 
    class="tooltip"
    :style="offset">
     {{ ev }}
    Some info
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MatchEvTooltip',

  props: {
    ev: {
      type: Number,
      required: true
    },

    topOffset: {
      type: Number,
      required: true
    }
  },

  computed: {
    offset(): object {
      return { top: `${this.topOffset}px` }
    }
  }
})
</script>

<style scoped>
.tooltip {
  margin: 4px 0;
  width: 200px;
  background-color: lightgreen;
  position: absolute;
  z-index: 1;
}
</style>
