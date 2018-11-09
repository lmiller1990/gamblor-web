<template>
  <div v-if="show" class="modal_wrapper">
    <component v-if="modal" :is="modal" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

export default Vue.extend({
  name: 'ModalManager',

  computed: {
    modal(): VueConstructor {
      return this.$store.state.modal.component
    },

    show(): boolean {
      return this.$store.state.modal.show
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
