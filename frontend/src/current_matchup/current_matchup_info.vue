<template>
  <div>
    <MatchHistory 
      :games="blueSideGames"
      :teamId="blueSideTeamId"
      side="blue"
    >
      <TeamSelector 
        slot="team-selector"
        :selectedId="blueSideTeamId"
        @change="teamId => $emit('change', teamId, 'blue')"
      />
    </MatchHistory>
    <MatchHistory 
      :games="redSideGames"
      :teamId="redSideTeamId"
      side="red"
    >
      <TeamSelector 
        slot="team-selector"
        :selectedId="redSideTeamId"
        @change="teamId => teamChanged(teamId, 'red')"
      />
    </MatchHistory>
  </div>
</template>

<script lang="ts">
import TeamSelector from '../components/team_selector.vue'
import MatchHistory from './match_history.vue'

export default {
  name: 'CurrentMatchupInfo',

  components: {
    MatchHistory,
    TeamSelector
  },

  props: {
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
    teamChanged(teamId, side) {
      this.$emit('change', teamId, side)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
