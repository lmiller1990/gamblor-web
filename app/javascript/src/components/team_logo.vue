<template>
  <img :src="teamLogo">
</template>

<script>
export default {
  props: {
    teamName: {
      type: String,
      required: true
    }
  },

  computed: {
    teamLogo() {
      return this.teamImage(this.teamName)
    }
  },

  methods: {
    teamImage(name) {
      return `/images/${name.replace(/\s/g, '_')}.png`
    }
  }
}
</script>

<style lang="scss" scoped>
$img_dim: 70px;

img {
  width: $img_dim;
  height: $img_dim;
}
</style>
