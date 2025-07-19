<template>
  <v-code class="text-primary font-weight-medium" tag="code">
    <slot />
  </v-code>
</template>

<script setup lang="ts">
interface Props {
  lang?: string;
}

defineProps<Props>();
</script>
