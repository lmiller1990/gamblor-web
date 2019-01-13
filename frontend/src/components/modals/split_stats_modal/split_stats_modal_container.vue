<template>
    <SplitStatsModal :stats="{fb, ft, fd, fbaron}" />
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

import SplitStatsModal from './split_stats_modal.vue'
import { IMarketPair, ISplitStats } from './'

export default Vue.extend({
  name: 'SplitStatsModalContainer',

  components: {
    SplitStatsModal
  },

  data(): {
    fb: IMarketPair,
    ft: IMarketPair,
    fd: IMarketPair,
    fbaron: IMarketPair
  } {
    return {
      fb: { underdog: 0, favorite: 0 },
      ft: { underdog: 0, favorite: 0 },
      fd: { underdog: 0, favorite: 0 },
      fbaron: { underdog: 0, favorite: 0 }
    }
  },

  async created() {
    if (this.splitId) {
      const response = await axios.get<ISplitStats>(`/api/v1/splits/${this.splitId}/stats`)
      this.fb = { ...response.data.fb }
      this.ft = { ...response.data.ft }
      this.fd = { ...response.data.fd }
      this.fbaron = { ...response.data.fbaron }
    }
  },

  computed: {
    splitId(): number {
      return this.$store.state.leagues.splitId
    }
  }
})
</script>
