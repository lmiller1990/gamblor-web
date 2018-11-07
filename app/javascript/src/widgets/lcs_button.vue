<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend()
</script>

<style lang="scss" scoped>
button {
  border: 1px solid grey;
  width: 70px;
  margin: 2px;

  &:hover {
    cursor: pointer;
  }
}
</style>
