<template>
  <div class="history_table">
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
      <tr>
        <td class="more_games" colspan="7" @click="showMoreGames">
          Show {{ NUM_PREV_GAMES }} more previous games
        </td>
      </tr>
      <tr v-for="game in games" :key="game.id">
        <td>
          <MatchDate 
            :id="game.id"
            :date="game.date"
            :canEdit="canEdit"
          />
        </td>
        <td>{{ getOpponent(game) }}</td>
        <MatchHistoryRow 
          :odds="getOddsFor('fb', game)"
          :victory="didGetFirst('Blood', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :opponentId="getOpponentId(game)"
          :teamId="teamId"
          market="fb"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('ft', game)"
          :victory="didGetFirst('Turret', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
          :opponentId="getOpponentId(game)"
          market="ft"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('fd', game)"
          :victory="didGetFirst('Dragon', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
          :opponentId="getOpponentId(game)"
          market="fd"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('fbaron', game)"
          :victory="didGetFirst('Baron', game)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
          :opponentId="getOpponentId(game)"
          market="fbaron"
        />
        <MatchHistoryRow 
          :odds="getOddsFor('win', game)"
          :victory="didWin(game.winnerId)" 
          :gameCompleted="game.winnerId ? true : false" 
          :gameId="game.id"
          :teamId="teamId"
          :opponentId="getOpponentId(game)"
          market="win"
        />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Game } from '../types/game'

import { titlecase } from '../filters/index'

import MatchHistoryRow from './match_history_row.vue'
import MatchDate from './match_date.vue'

export default Vue.extend({
  name: 'MatchHistoryTable',

  components: {
    MatchDate,
    MatchHistoryRow
  },

  props: {
    canEdit: {
      type: Boolean,
      required: true
    },

    games: {
      required: true,
      type: Array as () => Array<Object>,
    },

    teamId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      NUM_PREV_GAMES: 5
    }
  },

  methods: {
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

    getOddsFor(market, game) {
      if (this.teamId === game.redSideTeamId)
        return game[`redSideTeam${titlecase(market)}Odds`]

      if (this.teamId === game.blueSideTeamId)
        return game[`blueSideTeam${titlecase(market)}Odds`]
    },

    showMoreGames() {
      this.$emit('showMoreGames', this.NUM_PREV_GAMES)
    },

    getOpponent(game): string {
      const id = this.getOpponentId(game)

      return this.$store.getters['teams/nameById'](id)
    },

    getOpponentId(game): number {
      const { blueSideTeamId, redSideTeamId } = game  

      return this.teamId === blueSideTeamId ? redSideTeamId : blueSideTeamId
    },
  }
})
</script>

<style lang="scss" scoped>
.more_games {
  text-align: center;
  cursor: pointer;
  &:hover { background: silver; }
}

.history_table {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  font-size: 12px;
}

tr, td { 
  padding: 5px;
  border: 1px solid black;
}
</style>
