<template>
  <h1
    :id="id"
    class="text-h2 font-weight-bold mt-8 mb-4 text-high-emphasis pb-2 border-b-thin border-primary border-opacity-20"
    style="scroll-margin-top: 2rem"
  >
    <slot />
  </h1>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
}

defineProps<Props>();
</script>
