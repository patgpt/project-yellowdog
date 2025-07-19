<template>
  <v-sheet
    class="my-4 overflow-auto elevation-1 rounded-lg"
    color="surface-variant"
  >
    <!-- Header with filename and copy button -->
    <div
      v-if="filename || meta"
      class="d-flex justify-space-between align-center pa-3 border-b-thin border-outline border-opacity-12"
    >
      <div class="d-flex align-center">
        <v-icon class="me-2" size="small" color="primary">
          mdi-file-code-outline
        </v-icon>
        <span class="text-body-2 font-weight-medium text-high-emphasis">
          {{ filename || "Code" }}
        </span>
        <span v-if="meta" class="text-caption text-medium-emphasis ms-2">
          {{ meta }}
        </span>
      </div>
      <v-btn
        variant="text"
        size="small"
        icon="mdi-content-copy"
        @click="copyCode"
      />
    </div>

    <!-- Code content -->
    <div class="pa-4">
      <pre
        class="text-body-2 text-on-surface-variant ma-0 text-wrap"
      ><code :class="`language-${language}`">{{ code }}</code></pre>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

interface Props {
  code?: string;
  language?: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
}

const props = withDefaults(defineProps<Props>(), {
  code: "",
  language: "text",
  filename: undefined,
  highlights: () => [],
  meta: undefined,
});

const { copy } = useClipboard();

const copyCode = async () => {
  if (props.code) {
    await copy(props.code);
  }
};
</script>

<style scoped>
code {
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
