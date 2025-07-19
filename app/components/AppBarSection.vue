<template>
  <div>
    <!-- App Bar -->
    <v-app-bar
      :color="scrolled ? 'surface' : 'transparent'"
      :elevation="scrolled ? 2 : 0"
      :flat="!scrolled"
      scroll-behavior="elevate"
      scroll-threshold="100"
      height="64"
    >
      <v-container class="d-flex align-center pa-0" fluid>
        <!-- Logo/Brand -->
        <v-toolbar-title class="d-flex align-center">
          <NuxtLink
            to="/"
            class="text-decoration-none d-flex align-center"
            :aria-label="`${settings.title} - Go to homepage`"
          >
            <NuxtImg
              src="/logo.png"
              :alt="`${settings.title} logo`"
              width="32"
              height="32"
              class="me-3"
            />
            <span
              class="text-h6 font-weight-medium text-on-surface"
              :class="{ 'text-primary': !scrolled }"
            >
              {{ settings.title }}
            </span>
          </NuxtLink>
        </v-toolbar-title>

        <v-spacer />

        <!-- Desktop Navigation -->
        <nav
          class="d-none d-md-flex align-center"
          role="navigation"
          aria-label="Main navigation"
        >
          <v-btn
            v-for="item in settings.navigation"
            :key="item.label"
            :to="item.to"
            variant="text"
            class="mx-1 text-none"
            :aria-label="`Navigate to ${item.label} page`"
            :prepend-icon="item.icon"
          >
            {{ item.label }}
          </v-btn>

          <!-- Color Mode Toggle -->
          <v-btn
            variant="text"
            icon
            class="ms-2"
            aria-label="Toggle color theme"
            @click="toggleTheme"
          >
            <v-icon>{{ themeIcon }}</v-icon>
          </v-btn>
        </nav>

        <!-- Mobile Menu Button -->
        <v-btn
          variant="text"
          icon
          class="d-md-none"
          :aria-label="
            drawer ? 'Close navigation menu' : 'Open navigation menu'
          "
          :aria-expanded="drawer"
          aria-controls="navigation-drawer"
          @click="toggleDrawer"
        >
          <v-icon>{{ drawer ? "mdi-close" : "mdi-menu" }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      id="navigation-drawer"
      v-model="drawer"
      temporary
      location="right"
      width="280"
      color="surface"
      elevation="16"
      :scrim="true"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <!-- Drawer Header -->
      <v-toolbar color="transparent" class="px-4">
        <v-toolbar-title class="d-flex align-center">
          <NuxtImg
            src="/images/logo.png"
            :alt="`${settings.title} logo`"
            width="24"
            height="24"
            class="me-2"
          />
          <span class="text-h6 font-weight-medium">{{ settings.title }}</span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          variant="text"
          icon
          size="small"
          aria-label="Close navigation menu"
          @click="drawer = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider />

      <!-- Navigation List -->
      <v-list nav role="navigation" aria-label="Mobile navigation links">
        <v-list-item
          v-for="item in settings.navigation"
          :key="item.label"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.label"
          :aria-label="`Navigate to ${item.label} page`"
          color="primary"
          class="mb-1"
          @click="drawer = false"
        />

        <v-divider class="my-4" />

        <!-- Theme Toggle in Mobile -->
        <v-list-item
          :prepend-icon="themeIcon"
          :title="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          @click="toggleTheme"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

// App config
const settings = useAppConfig();

// Theme management
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);

const themeIcon = computed(() =>
  isDark.value ? "mdi-weather-sunny" : "mdi-weather-night",
);

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};

// Drawer state
const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Scroll detection
const scrolled = ref(false);

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});

// Close drawer on route change
const route = useRoute();
watch(
  () => route.path,
  () => {
    drawer.value = false;
  },
);

// Close drawer on escape key
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && drawer.value) {
      drawer.value = false;
    }
  };

  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
});
</script>
