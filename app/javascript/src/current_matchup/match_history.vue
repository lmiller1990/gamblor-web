<template>
  <div class="history">

    <div class="header">
      <TeamLogo :teamName="teamName" />
      <h3 class="team_name">{{ teamName | titlecase }}</h3>
    </div>

    <div class="first_markets">
      <FirstMarketsContainer 
        v-for="market in markets.slice(0, 2)"
        :teamId="teamId"
        :teamName="teamName"
        :games="games" 
        :side="side"
        :market="market"
        />
    </div>
    <div class="first_markets">
      <FirstMarketsContainer 
        v-for="market in markets.slice(2, 4)"
        :teamId="teamId"
        :teamName="teamName"
        :games="games" 
        :side="side"
        :market="market"
      />
    </div>

    <table>
      <tr class="header-tr">
        <td>Date</td>
        <td>Opponent</td>
        <td>FB</td>
        <td>FT</td>
        <td>FD</td>
        <td>FBaron</td>
        <td>Result</td>
      </tr>
      <tr v-for="game in games" :key="game.id">
        <td>{{ new Date(game.date).toDateString() }}</td>
        <td>{{ getOpponent(game) }}</td>
        <MatchHistoryRow :victory="didGetFirst('Blood', game)" />
        <MatchHistoryRow :victory="didGetFirst('Turret', game)" />
        <MatchHistoryRow :victory="didGetFirst('Dragon', game)" />
        <MatchHistoryRow :victory="didGetFirst('Baron', game)" />
        <MatchHistoryRow :victory="didWin(game.winnerId)" />
      </tr>
    </table>

  </div>
</template>

<script>
import { titlecase } from '../filters/index.js'
import FirstMarketsContainer from './first_markets_container.vue'
import MatchHistoryRow from './match_history_row.vue'
import TeamLogo from '../components/team_logo.vue'

export default {
  props: {
    side: {
      type: String,
      required: true
    },

    teamId: {
      type: Number,
      required: true
    },

    games: {
      type: Array,
      required: true
    }
  },

  components: {
    FirstMarketsContainer,
    TeamLogo,
    MatchHistoryRow
  },

  filters: { titlecase },

  data() {
    return {
      markets: ['Blood', 'Turret', 'Dragon', 'Baron']
    }
  },

  computed: {
    teamName() {
      return this.$store.getters['teams/nameById'](this.teamId)
    }
  },

  methods: {
    didWin(winnerId) {
      return winnerId === this.teamId
    },

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

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
}

.team_name {
  font-size: 1.4em;
  margin: 0 10px;
}

.history {
  margin: 2px;
}

.first_markets {
  display: flex;
}

table {
  border-collapse: collapse;
}

tr, td { 
  padding: 5px;
  border: 1px solid black;
}
</style>

