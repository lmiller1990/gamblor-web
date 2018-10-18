<template>
  <td :class="checkForVictory" 
    @mouseenter="showBetWindow"
    @mouseleave="hideBetWindow">
    {{ resultSymbol }}
  </td>
</template>

<script lang="ts">
export default {
  name: 'MatchHistoryRow',

  props: {
    victory: {
      type: Boolean,
      required: false
    },

    gameCompleted: {
      type: Boolean,
      required: true
    },

    odds: {
      type: Number,
      required: false
    }
  },

  computed: {
    resultSymbol() {
      if (!this.gameCompleted)
        return this.odds

      return this.victory ? '✓' : '✘'
    },

    checkForVictory() {
      if (!this.gameCompleted)
        return ''

      return this.victory ? 'victory' : 'defeat'
    }
  },

  methods: {
    hideBetWindow() {
      console.log('hide it !!')
    },

    showBetWindow() {
      console.log('show it!!')
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
  width: 30px;
}

</style>
