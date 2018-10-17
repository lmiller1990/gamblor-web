<template>
  <div>
    <select @change="handleChange">
      <option
        v-for="{id, name} in splits" :key="id"
        :value="id"
        :selected="id === selectedId"
      >
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LeagueSelector',

  props: {
    selectedId: {
      type: Number,
      required: false
    }
  },


  created() {
    this.$store.dispatch('leagues/getLeagues')
  },

  computed: {
    splits() {
      return this.$store.getters['leagues/splits']
    }
  },
  
  methods: {
    handleChange(e) {
      this.$emit('change', parseInt(e.target.value))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
