<template>
  <div @click="$emit('selected', { matchId })">
    <div class="matchup">
      <div class="blue_team team_name">
        {{ blueTeam.name }}
      </div>

      <div> vs </div>

      <div class="red_team team_name">
        {{ redTeam.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      return this.teams[this.$store.state.games.all[this.matchId].blueSideTeamId]
    },

    redTeam() {
      return this.teams[this.$store.state.games.all[this.matchId].redSideTeamId]
    }
  }
}
</script>

<style scoped>
.matchup {
  display: flex;
}

* {
  border: 1px solid;
}

.team_name {
  width: 100%;
}

.blue_team, .red_team { 
  display: flex; 
  justify-content: center; 
}
</style>
