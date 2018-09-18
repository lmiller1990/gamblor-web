<template>
  <div id="app">
    <CurrentMatchupContainer />
  </div>
</template>

<script>
import CurrentMatchupContainer from './src/current_matchup/current_matchup_container.vue'

export default {
  components: {
    CurrentMatchupContainer
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
