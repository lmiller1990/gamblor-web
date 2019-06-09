<template>
  <select @change="handleChange">
    <!-- currently the only teams with league_id are LCS teams -->
    <!-- this is to hide any teams in leagues I do not collect data for. -->
    <!-- TODO: do not hard code this, have proper logic -->
    <option 
      v-for="id in allTeamIds" :key="id" 
      :value="id"
      :selected="id === selectedId"

      :disabled="!allTeams[id].leagueId"
    >
      {{ allTeams[id].name }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITeam } from '../types/team'

export default Vue.extend({
  name: 'TeamSelector',

  props: {
    selectedId: {
      type: Number,
      required: false
    }
  },

  computed: {
    allTeams(): { [id: number]: ITeam } {
      return this.$store.state.teams.all
    },

    allTeamIds(): number[] {
      return this.$store.state.teams.ids
    }
  },

  methods: {
    handleChange(e) {
      this.$emit('change', parseInt(e.target.value))
    }
  }
})
</script>
