<template>
  <div class="matchup_container">
    <CurrentMatchupInfo 
      v-if="currentMatchupSelected"
      class="team_history"
      :blueSideGames="blueSideGames"
      :blueSideTeamId="blueSideTeamId"
      :redSideTeamId="redSideTeamId"
      :redSideGames="redSideGames"
      @change="selectTeam" />

    <div 
      v-if="!currentMatchupSelected" 
      class="team_history no_matchup">
      Select a matchup on the right.
    </div>
  </div>
</template>

<script>
import { options } from '../teams/chart_options.js'
import CurrentMatchupInfo from './current_matchup_info.vue'

export default {
  components: {
    CurrentMatchupInfo
  },

  props: {
    currentMatchupSelected: {
      type: Boolean,
      default: false
    },

    blueSideGames: {
      type: Array,
      required: true
    },

    redSideGames: {
      type: Array,
      required: true
    },

    blueSideTeamId: {
      type: Number,
      required: true
    },

    redSideTeamId: {
      type: Number,
      required: true
    }
  },


  methods: {
    selectTeam(teamId, side) {
      this.$emit('teamSelected', { teamId, side })
    }
  }
}
</script>

<style scoped>
.matchup_container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px 0 0 0;
}

.no_matchup {
  align-items: center;
}

.team_history {
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: space-around;
}
</style>
