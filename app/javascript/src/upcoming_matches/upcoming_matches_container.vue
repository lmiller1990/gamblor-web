<template>
  <div class="matchups_wrapper">
    <div class="header border-bottom">
      <h2>Schedule</h2>
      <span class="league-selector">
        <LeagueSplitSelector 
          :selectedId="splitId"
          @change="selectSplit" 
        />
        <LcsButton 
          @click="setFavorite"
          width="40px"
        >
          <div v-if="onFavoriteSplit">★</div>
          <div v-else>☆</div>
        </LcsButton>
        
      </span>
    </div>
    <div class="matchup-container border-bottom">
      <div 
        v-if="!allGamesShown"
        data-test-more
        class="show_more" 
        @click="fetchAllGames">
        {{ loadingAllGames ? 'Loading...' : 'Show All' }}
      </div>
      <Match
        v-for="matchId in matchIds"
        :key="matchId"
        :match-id="matchId"
        @selected="fetchMatchup"
      />
      <div id="end_of_schedule"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LeagueSplitSelector from '../components/league_split_selector.vue'
import Match from './match.vue'
import LcsButton from '../widgets/lcs_button.vue'

const favoriteSplitId = 'favoriteSplitId'

export default Vue.extend({
  name: 'UpcomingMatchContainer',

  components: {
    Match,
    LeagueSplitSelector,
    LcsButton
  },

  props: {
    splitId: {
      type: Number,
      required: false
    }
  },

  watch: {
    splitId(val) {
      if (val) {
        this.fetchGamesAndTeams()
        this.allGamesShown = false
      }
      this.updateFavouriteSplit()
    }
  },

  data() {
    return {
      allGamesShown: false,
      loadingAllGames: false,
      onFavoriteSplit: JSON.parse(localStorage.getItem(favoriteSplitId)) == this.splitId
    }
  },

  computed: {
    matchIds(): number[] {
      return this.$store.getters['scheduledGames/bySplitId'](this.splitId)
    },

    matches(): object[] {
      return this.$store.state.scheduledGames.all
    }
  },

  methods: {
    updateFavouriteSplit() {
      const splitId = JSON.parse(localStorage.getItem(favoriteSplitId))

      this.onFavoriteSplit = this.splitId === splitId
    },

    setFavorite() {
      const splitId = JSON.parse(localStorage.getItem(favoriteSplitId))
      console.log(splitId, this.splitId)
      if (splitId === this.splitId) {
        this.onFavoriteSplit = false
        localStorage.removeItem(favoriteSplitId)
      } else {
        localStorage.setItem(favoriteSplitId, this.splitId)
        this.onFavoriteSplit = true
      }
    },

    async fetchAllGames() {
      this.loadingAllGames = true
      await this.$store.dispatch('scheduledGames/getUpcomingGames', {
        splitId: this.splitId,
        recentlyPlayed: 100, // arbitrarily large number to get all
        upcoming: 100
      })
      this.allGamesShown = true
      this.loadingAllGames = false
    },

    async selectSplit(splitId) {
      this.$emit('selectSplit', { id: splitId }) 
      await this.fetchGames(splitId)
      this.scrollToBottomOfContainer()
    },

    fetchMatchup({ matchId }) {
      this.$emit('matchupSelected', { 
        blueSideTeamId: this.matches[matchId].blueSideTeamId,
        redSideTeamId: this.matches[matchId].redSideTeamId
      })
    },

    fetchGames(splitId: number) {
      return this.$store.dispatch('scheduledGames/getUpcomingGames', { splitId })
    },
    
    scrollToBottomOfContainer() {
      this.$el.querySelector('#end_of_schedule').scrollIntoView()
    },

    async fetchGamesAndTeams() {
      await Promise.all([
        this.fetchGames(this.splitId),
        this.$store.dispatch('teams/getTeams')
      ])

      setTimeout(this.scrollToBottomOfContainer)
    }
  }
})
</script>

<style lang="scss" scoped>
$color: silver;

.show_more {
  display: flex;
  justify-content: center;
  
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    background-color: rgba(100, 100, 100, 0.2);
  }
}

.border-bottom {
  box-sizing: border-box;
  border-bottom: 1px solid $color;
}

.header {
  height: 10vh;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.league-selector {
  display: flex;
  align-items: center;
}

.matchups_wrapper {
  height: 100%;
}

.matchup-container {
  height: 80vh;
  overflow-y: scroll;
}
</style>
