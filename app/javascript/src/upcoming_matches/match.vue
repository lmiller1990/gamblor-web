<template>
  <div 
    class="matchup_wrapper"
    @click="$emit('selected', { matchId })">
    <div class="matchup">
      <div 
        class="team_and_name blue_team"
        :class="styleCompleteGameByResult(blueTeam)">
        <TeamLogo :teamName="blueTeam && blueTeam.name" />
        <div class="blue_team team_name">
          <!-- hack for what appears to be a race condition -->
          {{ blueTeam && blueTeam.name }}
        </div>
      </div>

      <div> vs </div>

      <div 
        class="team_and_name red_team"
        :class="styleCompleteGameByResult(redTeam)">
        <TeamLogo :teamName="redTeam && redTeam.name" />
        <div class="red_team team_name">
          <!-- hack for what appears to be a race condition -->
          {{ redTeam && redTeam.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TeamLogo from '../components/team_logo.vue'

export default {
  components: {
    TeamLogo
  },

  props: {
    matchId: {
      type: Number,
      required: true
    }
  },

  computed: {
    // returns the winning side color - blue or red
    match() {
      return this.$store.state.scheduledGames.all[this.matchId]
    },

    teams() {
      return this.$store.state.teams.all
    },

    blueTeam() {
      return this.teams[this.match.blueSideTeamId]
    },

    redTeam() {
      return this.teams[this.match.redSideTeamId]
    }
  },

  methods: {
    styleCompleteGameByResult(team) {
      console.log(team === undefined)
      if (team === undefined) {
        return 'result_pending'
      }

      if (team.id === this.match.winnerId) {
        return 'winning_team'
      }

      if (team.id === this.match.loserId) {
        return 'losing_team'
      }
      
      return 'result_pending'
    },

  }
}
</script>

<style lang="scss" scoped>
@import '../shared_style.scss';

.matchup_wrapper {
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
    // border: 1px solid rgba(100, 100, 100, 0.1);
    background: rgba(100, 100, 100, 0.05);
  }
}

.team_and_name {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.matchup {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.team_name {
  width: 100%;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
}

.blue_team, .red_team { 
  display: flex; 
  justify-content: center; 
}

.losing_team {
  opacity: 0.15;
}
</style>
