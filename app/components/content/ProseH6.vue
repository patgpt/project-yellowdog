<template>
  <h6
    :id="id"
    class="text-subtitle-1 font-weight-medium mt-3 mb-2 text-high-emphasis d-flex align-center"
    style="scroll-margin-top: 2rem"
  >
    <slot />
    <v-icon
      v-if="id"
      :href="`#${id}`"
      class="ms-2 opacity-0 hover-visible"
      size="x-small"
      color="primary"
      style="transition: opacity 0.2s ease"
    >
      mdi-link
    </v-icon>
  </h6>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
}

defineProps<Props>();
</script>

<style scoped>
.hover-visible {
  opacity: 0;
}

h6:hover .hover-visible {
  opacity: 1;
}
</style>
