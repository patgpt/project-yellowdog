<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: false,
    default: () => ({
      statusCode: 500,
      message: "An unexpected error occurred.",
    }),
  },
});

// Determine error type and customize messaging
const errorInfo = computed(() => {
  const code = props.error.statusCode || 500;

  switch (code) {
    case 404:
      return {
        title: "Page Not Found",
        subtitle: "The page you're looking for doesn't exist",
        icon: "mdi-compass-off-outline",
        color: "warning",
        suggestion: "Let's get you back on track",
      };
    case 500:
      return {
        title: "Server Error",
        subtitle: "Something went wrong on our end",
        icon: "mdi-server-network-off",
        color: "error",
        suggestion: "We're working to fix this issue",
      };
    default:
      return {
        title: "Oops! Something went wrong",
        subtitle: props.error.message || "An unexpected error occurred",
        icon: "mdi-alert-circle-outline",
        color: "error",
        suggestion: "Please try again later",
      };
  }
});

// Go back function
const goBack = () => {
  if (import.meta.client && window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo("/");
  }
};

// Refresh page function
const handleRefresh = () => {
  if (import.meta.client) {
    window.location.reload();
  }
};
</script>

<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center pa-4"
  >
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-8 text-center" elevation="4" rounded="xl">
          <!-- Error Icon -->
          <v-avatar
            :color="errorInfo.color"
            size="120"
            class="mb-6 mx-auto"
            variant="tonal"
          >
            <v-icon :icon="errorInfo.icon" size="64" :color="errorInfo.color" />
          </v-avatar>

          <!-- Error Code -->
          <div class="mb-4">
            <span
              class="text-h2 font-weight-bold"
              :class="`text-${errorInfo.color}`"
            >
              {{ error.statusCode || 500 }}
            </span>
          </div>

          <!-- Error Title -->
          <h1 class="text-h4 font-weight-bold text-high-emphasis mb-4">
            {{ errorInfo.title }}
          </h1>

          <!-- Error Description -->
          <p class="text-body-1 text-medium-emphasis mb-2">
            {{ errorInfo.subtitle }}
          </p>

          <p class="text-body-2 text-medium-emphasis mb-6">
            {{ errorInfo.suggestion }}
          </p>

          <!-- Error Image -->
          <div class="mb-8">
            <NuxtImg
              src="/error.png"
              format="webp"
              alt="Error illustration"
              width="200"
              height="200"
              class="mx-auto opacity-80"
              style="filter: grayscale(20%)"
            />
          </div>

          <!-- Action Buttons -->
          <div class="d-flex flex-column flex-sm-row gap-3 justify-center">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              prepend-icon="mdi-home"
              class="text-none"
              @click="navigateTo('/')"
            >
              Go Home
            </v-btn>

            <v-btn
              variant="outlined"
              size="large"
              prepend-icon="mdi-arrow-left"
              class="text-none"
              @click="goBack"
            >
              Go Back
            </v-btn>

            <v-btn
              v-if="error.statusCode !== 404"
              variant="text"
              size="large"
              prepend-icon="mdi-refresh"
              class="text-none"
              @click="handleRefresh"
            >
              Try Again
            </v-btn>
          </div>

          <!-- Additional Help -->
          <v-divider class="my-6" />

          <div class="text-caption text-medium-emphasis">
            <p class="mb-2">
              Still having issues?
              <NuxtLink
                to="/contact"
                class="text-primary text-decoration-none font-weight-medium"
              >
                Contact Support
              </NuxtLink>
            </p>
            <p class="mb-0">
              Error ID: {{ error.statusCode }}-{{
                Date.now().toString().slice(-6)
              }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gap-3 {
  gap: 12px;
}

@media (max-width: 600px) {
  .d-flex.flex-column.flex-sm-row {
    flex-direction: column;
  }
}
</style>
