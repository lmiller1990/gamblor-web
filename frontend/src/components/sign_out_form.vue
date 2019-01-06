<template>
  <form @submit.prevent="signout">
    <LcsButton type="submit">
      Sign out
    </LcsButton>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import LcsButton from '../widgets/lcs_button.vue'

export default {
  name: 'SignOutForm',

  components: {
    LcsButton
  },

  methods: {
    async signout() {
      await axios.delete('/api/v1/session') as any
      const { location: any } = document
      location.replace('/')
    }
  }
}
</script>

<style scoped>
</style>
