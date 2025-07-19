<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-chip
    :color="color"
    :variant="variant"
    :size="size"
    :prepend-icon="icon"
    :closable="closable"
    :class="chipClasses"
    v-bind="$attrs"
    @click:close="$emit('close')"
  >
    <slot>{{ text }}</slot>
  </v-chip>
</template>

<script setup lang="ts">
interface BadgeProps {
  text?: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | string;
  variant?: "flat" | "elevated" | "tonal" | "outlined" | "text" | "plain";
  size?: "x-small" | "small" | "default" | "large" | "x-large";
  icon?: string;
  closable?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  text: "",
  color: "primary",
  variant: "tonal",
  size: "small",
  icon: "",
  closable: false,
  rounded: false,
});

defineEmits<{
  close: [];
}>();

// Use Vuetify utility classes instead of custom CSS
const chipClasses = computed(() => [
  props.rounded ? "rounded-pill" : "",
  "text-caption",
  "font-weight-medium",
]);
</script>
