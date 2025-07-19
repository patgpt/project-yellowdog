<template>
  <strong class="font-weight-bold text-high-emphasis">
    <slot />
  </strong>
</template>

<script setup lang="ts">
// No props needed for basic strong text
</script>

<style scoped>
strong {
  font-weight: 700;
}
</style>
