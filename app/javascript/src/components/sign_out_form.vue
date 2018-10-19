<template>
  <form @submit.prevent="signout">
    <input type="submit" value="Sign out">
  </form>
</template>

<script lang="ts">
import axios,{ AxiosPromise } from 'axios'

export default {
  name: 'SignOutForm',

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
