<template>
  <div id="app">
    <BetSleeve />
    <CurrentMatchupContainer 
      :currentMatchupSelected="currentMatchupSelected"
      :blueSideGames="blueSideGames"
      :blueSideTeamId="blueSideTeamId"
      :redSideTeamId="redSideTeamId"
      :redSideGames="redSideGames"
      @teamSelected="selectTeam"
    />
    <UpcomingMatchesContainer 
      class="schedule"
      @matchupSelected="setMatchup" 
    />
  </div>
</template>

<script lang="ts">
import BetSleeve from './bet_sleeve/bet_sleeve.vue'
import CurrentMatchupContainer from './current_matchup/current_matchup_container.vue'
import UpcomingMatchesContainer from './upcoming_matches/upcoming_matches_container.vue'

export default {
  name: 'App',

  components: {
    CurrentMatchupContainer,
    UpcomingMatchesContainer,
    BetSleeve
  },

  created() {
    console.log(this.$store)
    this.setDefaults()
  },
  
  data() {
    return {
      redSideTeamId: 0,
      blueSideTeamId: 0,
      redSideGames: [],
      blueSideGames: []
    }
  },

  computed: {
    currentMatchupSelected(): boolean {
      return (this.blueSideTeamId && this.redSideTeamId) !== 0
    }
  },

  methods: {
    selectTeam({ teamId, side }: { teamId: string, side: string }) {
      if (side === 'blue')
        this.setMatchup({ blueSideTeamId: parseInt(teamId), redSideTeamId: this.redSideTeamId })

      if (side === 'red')
        this.setMatchup({ blueSideTeamId: this.blueSideTeamId, redSideTeamId: parseInt(teamId) })
    },

    // Set default settings declared on server side in config/settings.yml
    setDefaults() {
      const dataSettings =  <HTMLDivElement>document.querySelector('#settings')
      const { defaultSplit, admin } = JSON.parse(dataSettings.getAttribute('data_settings') as string)
      this.$store.commit('leagues/SET_DEFAULT_SPLIT', { defaultSplit })
      this.$store.commit('user/SET_ADMIN', { admin }) 
    },

    async setMatchup({ blueSideTeamId, redSideTeamId }: { blueSideTeamId: number, redSideTeamId: number }) {
      await Promise.all([
        this.$store.dispatch('historicalGames/getByTeamId', blueSideTeamId),
        this.$store.dispatch('historicalGames/getByTeamId', redSideTeamId)
      ])

      this.$store.dispatch('matchups/setMatchup', {
        firstTeamId: blueSideTeamId,
        secondTeamId: redSideTeamId
      })

      this.fetchCurrentMatchup()
    },

    fetchCurrentMatchup() {
      const { firstTeamId, secondTeamId } = this.$store.state.matchups
      const gamesForFirstTeam = this.$store.getters['historicalGames/byTeamId'](firstTeamId)
      const gamesForSecondTeam = this.$store.getters['historicalGames/byTeamId'](secondTeamId)

      this.blueSideTeamId = firstTeamId
      this.redSideTeamId = secondTeamId
      this.blueSideGames = gamesForFirstTeam
      this.redSideGames = gamesForSecondTeam
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
}

.nav {
  position: sticky;
  top: 0;
}
.schedule {
  height: 80vh;
  width: 400px;
  position: sticky;
  top: 0;
}

</style>
