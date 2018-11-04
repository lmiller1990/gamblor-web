<template>
  <div>
    <button @click="show('Schedule')">Schedule</button>
    <button @click="show('BetSleeve')">Bet Sleeve</button>
    <button @click="show('HowToUse')">How To Use</button>
    <SignOutForm />
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
