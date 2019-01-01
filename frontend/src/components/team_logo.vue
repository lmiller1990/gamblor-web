<template>
  <img :src="teamLogo">
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TeamLogo',

  props: {
    teamName: {
      type: String,
      default: ''
    }
  },

  computed: {
    teamLogo(): string {
      return this.teamImage(this.teamName)
    }
  },

  methods: {
    teamImage(name: string): string {
      return `/images/${name.replace(/\s/g, '_').toLowerCase()}.png`
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../shared_style.scss';

img {
  width: $img_dim;
  height: $img_dim;
}
</style>
