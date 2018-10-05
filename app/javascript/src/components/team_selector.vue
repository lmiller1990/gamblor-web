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

<script>
export default {
  name: 'TeamSelector',

  props: {
    selectedId: {
      type: Number,
      required: false
    }
  },

  computed: {
    allTeams() {
      return this.$store.state.teams.all
    },

    allTeamIds() {
      return this.$store.state.teams.ids
    }
  },

  methods: {
    handleChange(e) {
      this.$emit('change', parseInt(e.target.value))
    }
  }
}
</script>
