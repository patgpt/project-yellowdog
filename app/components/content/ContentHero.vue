<template>
  <v-container fluid class="content-hero pa-0">
    <v-row no-gutters align="center" class="min-h-screen">
      <!-- Hero Image Background (if provided) -->
      <v-img
        v-if="image"
        :src="image"
        cover
        class="position-absolute w-100 h-100"
      >
        <div class="hero-overlay w-100 h-100" />
      </v-img>

      <!-- Hero Content -->
      <v-col cols="12" class="position-relative">
        <v-container>
          <v-row justify="center" class="text-center">
            <v-col cols="12" lg="8">
              <!-- Heading -->
              <h1 class="text-h2 text-md-h1 font-weight-bold mb-6 text-white">
                {{ heading }}
              </h1>

              <!-- Subheading -->
              <p
                v-if="subheading"
                class="text-h6 text-md-h5 mb-8 text-white text-opacity-90"
              >
                {{ subheading }}
              </p>

              <!-- CTA Buttons -->
              <div
                v-if="cta && cta.length"
                class="d-flex flex-column flex-sm-row justify-center ga-4"
              >
                <v-btn
                  v-for="(button, index) in cta"
                  :key="index"
                  :to="button.to"
                  :target="button.target"
                  :variant="button.variant"
                  :size="button.size"
                  :color="button.color"
                  :prepend-icon="button.icon"
                  class="text-none"
                >
                  {{ button.label }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { HeroType } from "../../../content.config";

defineProps<HeroType>();
</script>

<style scoped>
.content-hero {
  position: relative;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgb(var(--v-theme-secondary)) 100%
  );
}

.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
</style>
