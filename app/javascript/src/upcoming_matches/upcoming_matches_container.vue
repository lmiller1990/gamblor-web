<template>
  <div class="matchups">
    <div class="header border-left border-bottom">
      <h2>Schedule</h2>
      <LeagueSplitSelector 
        :selectedId="splitId"
        @change="selectSplit" 
      />
    </div>
    <div class="matchup-container border-left border-bottom">
      <Match
        v-for="matchId in matchIds"
        :key="matchId"
        :match-id="matchId"
        @selected="fetchMatchup"
      />
      <div id="end_of_schedule"></div>
    </div>
    <div class="status border-left">
      <SignOutForm />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignOutForm from '../components/sign_out_form.vue'
import LeagueSplitSelector from '../components/league_split_selector.vue'
import Match from './match.vue'

export default Vue.extend({
  name: 'UpcomingMatchContainer',

  components: {
    Match,
    SignOutForm,
    LeagueSplitSelector
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
      }
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

.border-left {
  box-sizing: border-box;
  border-left: 1px solid $color;
}

.border-bottom {
  box-sizing: border-box;
  border-bottom: 1px solid $color;
}

.status, .header {
  height: 10vh;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.matchup-container {
  height: 80vh;
  overflow-y: scroll;
}
</style>
