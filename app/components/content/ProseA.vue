<template>
  <a
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="text-decoration-none text-primary font-weight-medium d-inline-flex align-center"
    style="transition: color 0.2s ease"
    @mouseenter="onHover"
    @mouseleave="onLeave"
  >
    <slot />
    <v-icon
      v-if="target === '_blank'"
      class="ms-1"
      size="x-small"
      color="primary"
    >
      mdi-open-in-new
    </v-icon>
  </a>
</template>

<script setup lang="ts">
interface Props {
  href?: string;
  target?: string;
}

defineProps<Props>();

const onHover = () => {
  // Could add additional hover effects here
};

const onLeave = () => {
  // Could add additional leave effects here
};
</script>

<style scoped>
a:hover {
  color: rgb(var(--v-theme-primary-darken-1)) !important;
}

a:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
