<template>
  <v-table
    class="my-6 rounded-lg elevation-1 bg-surface-variant bg-opacity-10"
    density="comfortable"
    hover
  >
    <slot />
  </v-table>
</template>

<script setup lang="ts">
// No props needed for basic table
</script>

<style scoped>
:deep(.v-table__wrapper) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(th) {
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

:deep(td) {
  color: rgb(var(--v-theme-medium-emphasis));
}
</style>
