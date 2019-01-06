<template>
  <div class="tooltip" :style="offset">
    <div class="title">
      Estimated Value considering last n games:
    </div>
    <div 
      class="ev"
      v-for="{ ev, nLastGames } in evs"
      :key="nLastGames"
    >
      {{ gameCount(nLastGames) }}: {{ ev.toFixed(2) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { EvProp } from './ev_prop'

export default Vue.extend({
  name: 'MatchEvTooltip',

  props: {
    evs: {
      type: Array as () => EvProp[],
      required: true
    },

    topOffset: {
      type: Number,
      required: true
    }
  },

  computed: {
    offset(): object {
      return { bottom: `${this.topOffset}px` }
    }
  },

  methods: {
    gameCount(count: number): string {
      return count > 0 ? count.toString() : 'All'
    }
  }
})
</script>

<style scoped>
.title {
  margin: 4px 0;
}

.tooltip {
  text-align: left;
  margin: 4px 0;
  min-width: 200px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  box-shadow: 0 1px 15px silver;
  padding: 12px;
  position: absolute;
  z-index: 1;
}
</style>
