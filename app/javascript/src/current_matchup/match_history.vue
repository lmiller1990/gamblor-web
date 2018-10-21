<template>
  <div class="history">

    <div class="header">
      <TeamLogo :teamName="teamName" />
      <h3 class="team_name">{{ teamName | titlecase }}</h3>

      <slot name="team-selector" />
    </div>

    <div class="first_markets">
      <FirstMarketsContainer 
        v-for="market in markets.slice(0, 2)"
        :key="market"
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
        :key="market"
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
        <td>
          <MatchDate 
            :id="game.id"
            :date="game.date"
            :admin="admin"
          />
        </td>
        <td>{{ getOpponent(game) }}</td>
        <MatchHistoryRow 
          :odds="getOddsFor('fb', game)"
          :victory="didGetFirst('Blood', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('ft', game)"
          :victory="didGetFirst('Turret', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('fd', game)"
          :victory="didGetFirst('Dragon', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('fbaron', game)"
          :victory="didGetFirst('Baron', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('win', game)"
          :victory="didWin(game.winnerId)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
        />
      </tr>
    </table>

  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { titlecase } from '../filters/index'
import FirstMarketsContainer from './first_markets_container.vue'
import MatchHistoryRow from './match_history_row.vue'
import TeamLogo from '../components/team_logo.vue'
import MatchDate from './match_date.vue'

export default Vue.extend({
  name: 'MatchHistory',

  props: {
    side: {
      type: String,
      required: true
    },

    games: <PropOptions<object[]>> {
      required: true
    },

    teamId: {
      type: Number,
      required: true
    }
  },

  components: {
    MatchDate,
    FirstMarketsContainer,
    TeamLogo,
    MatchHistoryRow
  },

  filters: {
    titlecase
  },

  data() {
    return {
      markets: ['Blood', 'Turret', 'Dragon', 'Baron']
    }
  },

  computed: {
    admin(): boolean {
      return this.$store.state.user.admin
    },

    teamName(): string {
      return this.$store.getters['teams/nameById'](this.teamId)
    }
  },

  methods: {
    getOddsFor(market, game) {
      if (this.teamId === game.redSideTeamId)
        return game[`redSideTeam${titlecase(market)}Odds`]

      if (this.teamId === game.blueSideTeamId)
        return game[`blueSideTeam${titlecase(market)}Odds`]
    },

    didWin(winnerId) {
      if (!winnerId) 
        return undefined

      return winnerId === this.teamId
    },

    didGetFirst(market, game) {
      if (!game[`first${market}TeamId`]) 
        return undefined

      return game[`first${market}TeamId`] === this.teamId
    },

    getOpponent(game) {
      const { blueSideTeamId, redSideTeamId } = game  
      return this.$store.getters['teams/nameById'](this.teamId === blueSideTeamId
        ? redSideTeamId
        : blueSideTeamId)
    }
  }
})
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
