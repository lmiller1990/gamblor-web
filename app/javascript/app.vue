<template>
  <div id="app">
    <CurrentMatchupContainer />
    <UpcomingMatchesContainer />
  </div>
</template>

<script>
import CurrentMatchupContainer from './src/current_matchup/current_matchup_container.vue'
import UpcomingMatchesContainer from './src/upcoming_matches/upcoming_matches_container.vue'

export default {
  components: {
    CurrentMatchupContainer,
    UpcomingMatchesContainer
  }
}
</script>
