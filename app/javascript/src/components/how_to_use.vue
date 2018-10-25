<template>
  <div class="how_to_use">

    <div class="small-title">
      <div class="welcome-border" />
        <span class="welcome-text">Welcome to</span>
      <div class="welcome-border" />
    </div>

    <div class="title">
      LCS Tracking
    </div>

    <div class="small-title">
      <div class="welcome-border" />
    </div>

    <div class="explanation">
      <div>
        Select a matchup on the right.
      </div>
      <div>
        View historical stats and compare teams.
      </div>
      <div>
        Mouse over an upcoming game's market to see the approximate Expected Value (EV). <a target="_blank" href="/expected_value.html">See here for an example and explanation.</a>
      </div> 
      <img src="/how_to_2.png">
      <div>
        An EV above 1 desirable. Never bet on markets with an EV below 1.
      </div>

      <hr>
      <div>
        <div>
        You can test out your predictions and make pretend bets using LCS Tracking, too. Place a bet by clicking on an upcoming market, and entering a stake.
        </div>
        
        <span class="link" @click="toggle">Click here to see your bets.</span> Once you are confident with your analysis, consider using a traditional bookkeeper to place bets.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HowToUse',

  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.how_to_use {
  box-sizing: border-box;
  padding: 8px;
  border-right: 1px solid silver;
}

.small-title {
  display: flex;
  align-items: center;

  .welcome-border {
    content: "";
    border: 1px solid black;
    flex-grow: 1;
    height: 0px;
  }

  .welcome-text {
    padding: 4px;
  }
}

.title {
  text-align: center;
  padding: 4px 0 8px 0;
  font-size: 2em;
}

.explanation {
  font-size: 1.1em;

  div {
    margin: 8px 0;
  }

  img { width: 100%; }

  .link {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
