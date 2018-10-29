<template>
  <div class="history">

    <div class="header">
      <TeamLogo :teamName="teamName" />
      <h3 class="team_name">{{ teamName | titlecase }}</h3>

      <slot name="team-selector" />
    </div>

    <div class="first_markets">
      <FirstMarketsContainer 
        v-for="market in markets"
        :key="market"
        :teamId="teamId"
        :teamName="teamName"
        :games="gamesToDisplay" 
        :side="side"
        :market="market"
      />
    </div>

    <div class="split_select">
      <span>Filter by split:</span>
      <LeagueSplitSelector 
        :selectedId="splitId"
        :showAllPlaceholder="true"
        @change="selectSplit"
      />
    </div>

    <MatchHistoryTable 
      :games="gamesToDisplay"
      :teamId="teamId"
      :canEdit="admin"
      @showMoreGames="showMoreGames"
      @createBet="createBet"
    />

  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Game } from '../types/game'
import { titlecase } from '../filters/index'
import MatchHistoryTable from './match_history_table.vue'
import LeagueSplitSelector from '../components/league_split_selector.vue'
import FirstMarketsContainer from './first_markets_container.vue'
import TeamLogo from '../components/team_logo.vue'

const N_PREV_GAMES_TO_SHOW = 10


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

  watch: {
    // if teamId changes, we should reset the nPreviousGames
    teamId (val) {
      this.nPreviousGames = N_PREV_GAMES_TO_SHOW
    }
  },

  components: {
    LeagueSplitSelector,
    TeamLogo,
    MatchHistoryTable,
    FirstMarketsContainer
  },

  filters: {
    titlecase
  },

  data() {
    return {
      splitId: undefined, //this.$store.state.leagues.splitId,
      markets: ['Blood', 'Turret', 'Dragon', 'Baron'],
      nPreviousGames: N_PREV_GAMES_TO_SHOW
    }
  },

  computed: {
    gamesToDisplay(): Game[] {
      if (this.splitId) {
        return this.gamesBySplit
      } else {
        return this.previousGames
      }
    },

    gamesBySplit(): Game[] {
      return this.games.filter(x => x.splitId === this.splitId)
    },

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
    selectSplit(splitId: number) {
      if (splitId === 0) {
        this.splitId = undefined
        // show all
      } else {
        this.splitId = splitId
      }
    },

    createBet() {
      this.$emit('createBet')
    },

    showMoreGames(numGames: number) {
      this.nPreviousGames += numGames
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.team_name {
  font-size: 1.4em;
  margin: 0 10px;
}

.split_select {
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.history {
  margin: 2px;
}

.first_markets {
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
