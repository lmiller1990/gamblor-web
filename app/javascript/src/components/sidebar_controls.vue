<template>
  <div class="controls_wrapper">
    <div class="buttons">
      <LcsButton @click="show('Schedule')" data-test-schedule>
        Schedule
      </LcsButton>
      <LcsButton @click="show('BetSleeve')">
        Bet Sleeve
      </LcsButton>
      <LcsButton @click="show('HowToUse')">
        How To Use
      </LcsButton>
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
import LcsButton from '../widgets/lcs_button.vue'
import SignOutForm from './sign_out_form.vue'

export default Vue.extend({
  name: 'SidebarControls',

  components: {
    SignOutForm,
    LcsButton
  },

  methods: {
    show(component) {
      this.$emit(`show${component}`)
    }
  }
})
</script>

<style lang="scss" scoped>
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
