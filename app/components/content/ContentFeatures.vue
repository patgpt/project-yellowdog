<template>
  <v-container class="content-features py-16">
    <!-- Section Header -->
    <v-row v-if="title || description" justify="center" class="mb-12">
      <v-col cols="12" lg="8" class="text-center">
        <h2 v-if="title" class="text-h3 text-md-h2 font-weight-bold mb-4">
          {{ title }}
        </h2>
        <p v-if="description" class="text-h6 text-medium-emphasis">
          {{ description }}
        </p>
      </v-col>
    </v-row>

    <!-- Features Grid -->
    <v-row v-if="features?.length" class="gy-8">
      <v-col
        v-for="(feature, index) in features"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
          variant="flat"
          class="h-100 d-flex flex-column text-center pa-6"
          :ripple="false"
        >
          <!-- Feature Icon/Image -->
          <div class="mb-4">
            <v-img
              v-if="feature.image"
              :src="feature.image"
              :alt="feature.title"
              max-height="80"
              max-width="80"
              class="mx-auto"
            />
            <v-icon
              v-else-if="feature.icon"
              :icon="feature.icon"
              size="48"
              color="primary"
            />
          </div>

          <!-- Feature Content -->
          <v-card-title class="text-h6 font-weight-bold mb-2 px-0">
            {{ feature.title }}
          </v-card-title>

          <v-card-text class="text-body-1 flex-grow-1 px-0">
            {{ feature.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { FeatureType } from "../../../content.config";

interface Props {
  title?: string;
  description?: string;
  features?: FeatureType[];
}

defineProps<Props>();
</script>
