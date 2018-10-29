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

    <MatchHistoryTable 
      :games="previousGames"
      :teamId="teamId"
      :canEdit="admin"
      @showMoreGames="showMoreGames"
      @createBet="createBet"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import MatchHistoryTable from './match_history_table.vue'
import { Game } from '../types/game'
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
    TeamLogo,
    MatchHistoryTable,
    MatchDate,
    FirstMarketsContainer,
    MatchHistoryRow
  },

  filters: {
    titlecase
  },

  data() {
    return {
      markets: ['Blood', 'Turret', 'Dragon', 'Baron'],
      nPreviousGames: 10,
      NUM_PREV_GAMES: 5
    }
  },

  computed: {
    previousGames(): Game[] {
      if (this.games.length - this.nPreviousGames <= 0)
        return this.games
      else
        return this.games.slice(this.games.length - this.nPreviousGames)
    },

    admin(): boolean {
      return this.$store.state.user.admin
    },

    teamName(): string {
      return this.$store.getters['teams/nameById'](this.teamId)
    }
  },

  methods: {
    createBet() {
      this.$emit('createBet')
    },

    showMoreGames(numGames: number) {
      // @ts-ignore
      this.nPreviousGames += numGames
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
</style>
