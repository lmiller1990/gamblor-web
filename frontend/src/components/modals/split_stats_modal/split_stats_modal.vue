<template>
  <div>
    <div>
      This table shows the current trends for this split. Favorite means the % profit if you consistently bet on the favorite. 
      The same goes for underdog. This can be used a guide for the current metagame, and how relevant the odds might be to 
      the actual result from region to region.
    </div>
    <h3>First Blood</h3> 
    <ul>
      <li>Favorite: {{ stats.fb.favorite.toFixed(2) }}%</li>
      <li>Underdog: {{ stats.fb.underdog.toFixed(2) }}%</li>
    </ul>

    <h3>First Turret</h3> 
    <ul>
      <li>Favorite: {{ stats.ft.favorite.toFixed(2) }}%</li>
      <li>Underdog: {{ stats.ft.underdog.toFixed(2) }}%</li>
    </ul>

    <h3>First Dragon</h3> 
    <ul>
      <li>Favorite: {{ stats.fd.favorite.toFixed(2) }}%</li>
      <li>Underdog: {{ stats.fd.underdog.toFixed(2) }}%</li>
    </ul>

    <h3>First Baron</h3> 
    <ul>
      <li>Favorite: {{ stats.fbaron.favorite.toFixed(2) }}%</li>
      <li>Underdog: {{ stats.fbaron.underdog.toFixed(2) }}%</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ISplitStats } from './'

export default Vue.extend({
  name: 'SplitStatsModal',

  props: {
    stats: {
      type: Object as () => ISplitStats
    }
  }
})
</script>
