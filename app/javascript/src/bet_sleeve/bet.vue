<template>
  <div class="bet">
    bet!!
    {{ bet }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'Bet',

  props: {
    id: {
      type: Number,
      required: true
    },

    bet: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
