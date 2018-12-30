<template>
  <LcsButton 
    @click="setFavorite"
    width="40px"
  >
    <div v-if="onFavoriteSplit">★</div>
    <div v-else>☆</div>
  </LcsButton>
</template>

<script lang="ts">
import Vue from 'vue'
import LcsButton from '../widgets/lcs_button.vue'

const favoriteSplitId = 'favoriteSplitId'

export default Vue.extend({
  name: 'FavoriteMatchButton',

  components: {
    LcsButton
  },

  props: {
    splitId: {
      type: Number,
      required: false
    }
  },

  watch: {
    splitId: {
      handler() {
        this.updateFavoriteSplit()
      }
    }
  },

  data(): {
    onFavoriteSplit: boolean
  } {
    return {
      onFavoriteSplit: JSON.parse(localStorage.getItem(favoriteSplitId)) == this.splitId
    }
  },

  methods: {
    setFavorite() {
      const splitId = JSON.parse(localStorage.getItem(favoriteSplitId))
      if (splitId === this.splitId) {
        localStorage.removeItem(favoriteSplitId)
        this.onFavoriteSplit = false
      } else {
        localStorage.setItem(favoriteSplitId, this.splitId)
        this.onFavoriteSplit = true
      }
    },

    updateFavoriteSplit() {
      const splitId = JSON.parse(localStorage.getItem(favoriteSplitId))

      this.onFavoriteSplit = this.splitId === splitId
    }
  }
})
</script>
