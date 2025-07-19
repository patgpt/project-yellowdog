<template>
  <v-img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    class="my-4 rounded-lg w-100 h-auto transition-transform"
    cover
  >
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular indeterminate color="primary" />
      </div>
    </template>
    <template #error>
      <div
        class="d-flex align-center justify-center fill-height bg-surface-variant"
      >
        <v-icon size="48" color="medium-emphasis">
          mdi-image-broken-variant
        </v-icon>
      </div>
    </template>
  </v-img>
  <div
    v-if="title || alt"
    class="text-center text-caption text-medium-emphasis mt-2 mb-4"
  >
    {{ title || alt }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  title?: string;
}

defineProps<Props>();
</script>
