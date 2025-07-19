<template>
  <em class="font-style-italic text-high-emphasis">
    <slot />
  </em>
</template>

<script setup lang="ts">
// No props needed for basic emphasis text
</script>

<style scoped>
em {
  font-style: italic;
}
</style>
