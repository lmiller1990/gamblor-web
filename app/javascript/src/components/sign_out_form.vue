<template>
  <form @submit.prevent="signout">
    <input type="submit" value="Sign out">
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignOutForm',

  methods: {
    async signout() {
      await axios.delete('/api/v1/session')
      document.location.replace('/')
    }
  }
}
</script>

<style scoped>
</style>
