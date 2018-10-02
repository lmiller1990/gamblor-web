<template>
  <td :class="checkForVictory">
    {{ victory ? 'O' : 'X' }}
  </td>
</template>

<script>
export default {
  name: 'MatchHistoryRow',

  props: {
    victory: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    checkForVictory() {
      if (this.victory === undefined || this.victory === null)
        return ''

      return this.victory ? 'victory' : 'defeat'
    }
  }
}
</script>

<style scoped>
.victory { background-color: deepskyblue; }
.defeat  { background-color: red; }

td { 
  border: 1px solid black; 
  text-align: center;
  padding: 5px;
}

</style>
