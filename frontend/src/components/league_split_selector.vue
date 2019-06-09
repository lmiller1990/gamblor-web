<template>
  <select @change="handleChange">
    <option
      v-for="{id, name} in splits" :key="id"
      :value="id"
      :selected="id === selectedId"
      :disabled="!defaultSplit(id)"
    >
      {{ name }}
    </option>
    <option 
      v-if="showAllPlaceholder" 
      value="0"
      :selected="!selectedId"
    >
      All
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue'

import { HARDCODED_DEFAULT_SPLIT_ID } from '../constants'

export default Vue.extend({
  name: 'LeagueSplitSelector',

  props: {
    selectedId: {
      type: Number,
      required: false
    },

    showAllPlaceholder: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    splits(): object[] {
      return this.$store.getters['leagues/splits']
    }
  },
  
  methods: {
    defaultSplit(id: number): boolean {
      return id === HARDCODED_DEFAULT_SPLIT_ID
    },

    handleChange(e: Event) {
      this.$emit('change', parseInt(((e.target as HTMLSelectElement).value)))
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
