<template>
  <ol class="my-4 ps-6">
    <slot />
  </ol>
</template>

<script setup lang="ts">
// No props needed for basic ordered list
</script>

<style scoped>
ol {
  list-style-type: decimal;
  color: rgb(var(--v-theme-medium-emphasis));
}

ol ::v-deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

ol ::v-deep(li:last-child) {
  margin-bottom: 0;
}
</style>
