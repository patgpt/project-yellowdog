<template>
  <h2
    :id="id"
    class="text-h3 font-weight-bold mt-6 mb-3 text-high-emphasis d-flex align-center group"
    style="scroll-margin-top: 2rem"
  >
    <slot />
    <v-btn
      v-if="id"
      :href="`#${id}`"
      variant="text"
      icon="mdi-link"
      size="small"
      color="primary"
      class="ms-2 opacity-0 group-hover:opacity-100 transition-opacity"
      style="transition: opacity 0.2s ease"
    />
  </h2>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
}

defineProps<Props>();
</script>

<style scoped>
.group:hover .opacity-0 {
  opacity: 1;
}
</style>
