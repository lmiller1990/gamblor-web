<template>
  <div class="sidebar">

    <div class="main-item">
       <transition name="fade" mode="out-in">
          <slot />
       </transition>
    </div>

    <div class="controls">
      <slot name="controls" />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Sidebar'
})
</script>

<style lang="scss" scoped>
$color: silver;

.sidebar {
  height: 100vh;
  width: 400px;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  border-left: 1px solid $color;
}

.main-item {
  height: 90vh;
  overflow-y: scroll;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
