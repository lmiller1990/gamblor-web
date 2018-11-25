<template>
  <button 
    :style="{ width: width }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    width: {
      type: String,
      default: '70px'
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  border: 1px solid grey;
  margin: 2px;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
}
</style>
