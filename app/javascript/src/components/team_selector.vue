<template>
  <select @change="handleChange">
    <option 
      v-for="id in allTeamIds" :key="id" 
      :value="id"
      :selected="id === selectedId"
    >
      {{ allTeams[id].name }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TeamSelector',

  props: {
    selectedId: {
      type: Number,
      required: false
    }
  },

  computed: {
    allTeams(): object[] {
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
