<template>
  <div class="matchups_wrapper">
    <div class="header border-bottom">
      <h2>Schedule</h2>
      <span class="league-selector">
        <LeagueSplitSelector 
          :selectedId="splitId"
          @change="selectSplit" 
        />
        <FavoriteMatchButton :splitId="splitId" />
      </span>

      <span class="split-stats">
        <LcsButton @click="showUpcoming" width="110px">
          {{ this.allUpcoming ? 'Show Past Games' : 'All Upcoming' }}
        </LcsButton>
        <LcsButton 
          width="90px"
          @click="showStatsModal"
        >
        [BETA] Stats
        </LcsButton>
        <LcsButton 
          width="90px"
          @click="showBestBetsModal"
        >
          Rank EVs
        </LcsButton>
      </span>

    </div>
    <div class="matchup-container border-bottom">
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
import LcsButton from '../widgets/lcs_button.vue'
import LeagueSplitSelector from '../components/league_split_selector.vue'
import FavoriteMatchButton from './favorite_match_button.vue'
import Match from './match.vue'
import SplitStatsModalContainer from '@/components/modals/split_stats_modal/split_stats_modal_container.vue'
import RankedBetsModal from '@/components/modals/ranked_bets_modal.vue'
import { ModalOptions } from '@/store/types'

export default Vue.extend({
  name: 'UpcomingMatchContainer',

  components: {
    LcsButton,
    Match,
    LeagueSplitSelector,
    FavoriteMatchButton
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
        this.fetchAllGames()
        this.allUpcoming = false
      }
    }
  },

  data() {
    return {
      loadingAllGames: false,
      allUpcoming: false
    }
  },

  computed: {
    matchIds(): number[] {
      if (this.allUpcoming)  {
        return this.$store.getters['scheduledGames/orderedByDate']
      }

      const ids = (this.$store.getters['scheduledGames/bySplitId'](this.splitId)
        .sort((x, y) => +new Date(this.matches[x].date) - +new Date(this.matches[y].date))
      )

      return ids
    },

    matches(): object[] {
      return this.$store.state.scheduledGames.all
    }
  },

  methods: {
    showBestBetsModal() {
      const opts: ModalOptions = {
        show: true,
        component: RankedBetsModal,
        title: 'Recommended Bets'
      }
      this.$store.commit('modal/SET_MODAL', opts)
    },
    
    fetchGames(splitId: number) {
      return this.$store.dispatch('scheduledGames/getUpcomingGames', { splitId })
    },

    showUpcoming(): void {
      this.allUpcoming = !this.allUpcoming
      setTimeout(this.scrollToBottomOfContainer, 100)
    },

    showStatsModal() {
      const opts: ModalOptions = {
        show: true,
        component: SplitStatsModalContainer,
        title: 'Underdog/Favorite Statistics'
      }
      this.$store.commit('modal/SET_MODAL', opts)
    },

    async fetchAllGames() {
      this.loadingAllGames = true

      await Promise.all([
        this.$store.dispatch('teams/getTeams'),

        this.$store.dispatch('scheduledGames/getByTimePeriod', {
          start: new Date(new Date().setDate(new Date().getDate() - 10)),
          end: new Date(3000, 1, 1)
        })
      ])
      this.loadingAllGames = false

      setTimeout(this.scrollToBottomOfContainer, 100)
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

    scrollToBottomOfContainer() {
      this.$el.querySelector('#end_of_schedule').scrollIntoView()
    },
  }
})
</script>

<style lang="scss" scoped>
$color: silver;

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

.split-stats {
  display: flex;
}
</style>
