<template>
  <div 
    v-if="show" 
    class="modal_wrapper"
    @click="close"
  >
    <div class="modal_outer">
      <div class="modal_title">
        {{ title }}
      </div>
      <component 
        v-if="modal" 
        :is="modal" 
        class="modal_component"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { ModalOptions } from '../store/types'

export default Vue.extend({
  name: 'ModalManager',

  created() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.closeModal()
      }
    })
  },

  computed: {
    modal(): VueConstructor {
      return this.$store.state.modal.component
    },

    title(): string {
      return this.$store.state.modal.title
    },

    show(): boolean {
      return this.$store.state.modal.show
    }
  },

  methods: {
    close(e): void {
      if (e.target.className === 'modal_wrapper') {
        this.closeModal()
      }
    },

    closeModal(): void {
      const opts: ModalOptions = { component: null, show: false }
      this.$store.commit('modal/SET_MODAL', opts)
    }
  }
})
</script>

<style scoped>
.modal_wrapper {
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(100, 100, 100, 0.5);
}

.modal_outer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 15px;
  max-width: 600px;

  background-color: white;
}

.modal_title {
  margin: 5px;
  font-size: 1.3em;
}
</style>
