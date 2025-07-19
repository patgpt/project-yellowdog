<template>
  <ul class="my-4 ps-6">
    <slot />
  </ul>
</template>

<script setup lang="ts">
// No props needed for basic unordered list
</script>

<style scoped>
ul {
  list-style-type: disc;
  color: rgb(var(--v-theme-medium-emphasis));
}

ul ::v-deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

ul ::v-deep(li:last-child) {
  margin-bottom: 0;
}
</style>
