<template>
  <div class="wrapper_overlay">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FullScreenOverlay'
})
</script>

<style lang="scss" scoped>
.wrapper_overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  position: fixed;
}
</style>
