<template>
  <div 
    class="matchup_wrapper"
    @click="$emit('selected', { matchId })">
    <div class="matchup">
      <img :src="teamImage(blueTeam.name)">
      <div class="blue_team team_name">
        {{ blueTeam.name }}
      </div>

      <div> vs </div>

      <img :src="teamImage(redTeam.name)">
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
  },

  methods: {
    teamImage(name) {
      return `/images/${name.replace(/\s/g, '_')}.png`
    }
  }
}
</script>

<style scoped>
.matchup_wrapper {
  padding: 4px;
}

.matchup {
  display: flex;
}

.team_name {
  width: 100%;
}

.blue_team, .red_team { 
  display: flex; 
  justify-content: center; 
}
</style>
