<template>
  <v-btn
    variant="text"
    icon
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <v-icon>{{ isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

// Theme management with Vuetify
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};
</script>
