<template>
  <div class="controls_wrapper">
    <div class="buttons">
      <button @click="show('Schedule')" data-test-schedule>
        Schedule
      </button>
      <button @click="show('BetSleeve')">Bet Sleeve</button>
      <button @click="show('HowToUse')">How To Use</button>
    </div>

    <div class="signout_wrapper">
      <div class="signout">
        <SignOutForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignOutForm from './sign_out_form.vue'

export default Vue.extend({
  name: 'SidebarControls',

  components: {
    SignOutForm
  },

  methods: {
    show(component) {
      this.$emit(`show${component}`)
    }
  }
})
</script>

<style scoped>
button {
  border: 1px solid grey;
  width: 70px;
  margin: 2px;
}

.controls_wrapper {
  margin: 10px 36px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.signout_wrapper {
  display: flex;
  justify-content: flex-end;
}

.signout {
  display: inline-block;
}
</style>
