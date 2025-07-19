<template>
  <v-container class="content-cta py-16">
    <v-row justify="center">
      <v-col cols="12" lg="8" class="text-center">
        <!-- Section Header -->
        <h2 v-if="title" class="text-h3 text-md-h2 font-weight-bold mb-4">
          {{ title }}
        </h2>

        <p v-if="description" class="text-h6 text-medium-emphasis mb-8">
          {{ description }}
        </p>

        <!-- CTA Buttons -->
        <div
          v-if="cta?.length"
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
</template>

<script setup lang="ts">
import type { LinkType } from "../../../content.config";

interface Props {
  title?: string;
  description?: string;
  cta?: LinkType[];
}

defineProps<Props>();
</script>
