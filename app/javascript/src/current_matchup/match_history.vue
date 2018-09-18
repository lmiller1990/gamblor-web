<template>
  <div>
    <h3>{{ teamName }}</h3>
    <table>
      <tr>
        <td>Date</td>
        <td>Opponent</td>
        <td>FB</td>
        <td>FT</td>
        <td>FD</td>
        <td>FBaron</td>
        <td>Result</td>
      </tr>
      <tr v-for="game in games">
        <td>{{ new Date(game.date).toDateString() }}</td>
        <td>{{ getOpponent(game) }}</td>
        <td>{{ didGetFirst('blood', game) }}</td>
        <td>{{ didGetFirst('Turret', game) }}</td>
        <td>{{ didGetFirst('Dragon', game) }}</td>
        <td>{{ didGetFirst('Baron', game) }}</td>
        <td>{{ game.winnerId === teamId }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    teamId: {
      type: Number,
      required: true
    },

    games: {
      type: Array,
      required: true
    }
  },

  computed: {
    teamName() {
      return this.$store.getters['teams/nameById'](this.teamId)
    }
  },

  methods: {
    didGetFirst(market, game) {
      return game[`first${market}TeamId`] === this.teamId
    },

    getOpponent(game) {
      const { blueSideTeamId, redSideTeamId } = game
      return this.$store.getters['teams/nameById'](this.teamId === blueSideTeamId
        ? redSideTeamId
        : blueSideTeamId)
    }
  }
}
</script>

<style scoped>
</style>

