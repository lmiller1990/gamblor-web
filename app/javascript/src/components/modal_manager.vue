<template>
  <div class="modal_wrapper">
    <component v-if="modal" :is="modal" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

export default Vue.extend({
  name: 'ModalManager',

  computed: {
    modal(): VueConstructor {
      console.log(this.$store.state.modal.component)
      return this.$store.state.modal.component
    }
  }
})
</script>

<style lang="scss" scoped>
.modal_wrapper {
  position: absolute;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.5);
}
</style>