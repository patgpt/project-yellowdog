<template>
  <v-app>
    <v-layout>
      <!-- App Bar Component -->
      <AppBarSection :navigation="navigation" />

      <v-main>
        <slot />
      </v-main>
    </v-layout>
    <FooterSection />
  </v-app>
</template>

<script setup lang="ts">
const navigation = ref([
  {
    label: "Home",
    to: "/",
    icon: "mdi-home",
  },
  {
    label: "Blog",
    to: "/blog",
    icon: "mdi-pencil",
  },
  {
    label: "Services",
    to: "/services",
    icon: "mdi-briefcase",
  },
  {
    label: "About",
    to: "/about",
    icon: "mdi-information",
  },
  {
    label: "Contact",
    to: "/contact",
    icon: "mdi-email",
  },
]);
</script>
