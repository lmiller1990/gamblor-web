<template>
  <div 
    class="matchup_wrapper"
    @click="$emit('selected', { matchId })">
    <div class="matchup">
      <div class="team_and_name">
        <TeamLogo :teamName="blueTeam.name" />
        <div class="blue_team team_name">
          {{ blueTeam.name }}
        </div>
      </div>

      <div> vs </div>

      <div class="team_and_name">
        <TeamLogo :teamName="redTeam.name" />
        <div class="red_team team_name">
          {{ redTeam.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    teams() {
      return this.$store.state.teams.all
    },

    blueTeam() {
      return this.teams[this.$store.state.scheduledGames.all[this.matchId].blueSideTeamId]
    },

    redTeam() {
      return this.teams[this.$store.state.scheduledGames.all[this.matchId].redSideTeamId]
    }
  }
}
</script>

<style lang="scss" scoped>
.matchup_wrapper {
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
    border: 1px solid rgba(100, 100, 100, 0.1);
  }
}

.team_and_name {
  width: 100%;
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
}

.blue_team, .red_team { 
  display: flex; 
  justify-content: center; 
}
</style>
