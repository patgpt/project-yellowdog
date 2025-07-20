<template>
  <v-container class="content-pricing py-16">
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

    <!-- Pricing Grid -->
    <v-row v-if="pricing?.length" justify="center" class="gy-8">
      <v-col
        v-for="(plan, index) in pricing"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
          :variant="plan.highlight ? 'elevated' : 'outlined'"
          :color="plan.highlight ? 'primary' : undefined"
          class="h-100 d-flex flex-column text-center pa-6 position-relative"
          :elevation="plan.highlight ? 8 : 1"
        >
          <!-- Highlight Badge -->
          <v-chip
            v-if="plan.badge"
            :color="plan.highlight ? 'secondary' : 'primary'"
            size="small"
            class="position-absolute"
            style="top: -12px; left: 50%; transform: translateX(-50%)"
          >
            {{ plan.badge }}
          </v-chip>

          <!-- Plan Header -->
          <v-card-title class="text-h5 font-weight-bold mb-2 px-0">
            {{ plan.title }}
          </v-card-title>

          <v-card-text v-if="plan.description" class="text-body-1 mb-4 px-0">
            {{ plan.description }}
          </v-card-text>

          <!-- Price -->
          <div class="mb-6">
            <div class="text-h3 font-weight-bold mb-1">
              {{ plan.price }}
            </div>
            <div v-if="plan.billing" class="text-body-2 text-medium-emphasis">
              {{ plan.billing }}
            </div>
          </div>

          <!-- Features List -->
          <v-list
            v-if="plan.features?.length"
            class="flex-grow-1 mb-6 pa-0"
            density="compact"
          >
            <v-list-item
              v-for="(feature, featureIndex) in plan.features"
              :key="featureIndex"
              class="px-0 py-1"
              density="compact"
            >
              <template #prepend>
                <v-icon
                  icon="mdi-check-circle"
                  color="success"
                  size="small"
                  class="me-2"
                />
              </template>
              <v-list-item-title class="text-body-2">
                {{ feature }}
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <!-- CTA Button -->
          <v-btn
            v-if="plan.cta"
            :to="plan.cta.to"
            :target="plan.cta.target"
            :variant="plan.cta.variant"
            :size="plan.cta.size"
            :color="plan.cta.color"
            :prepend-icon="plan.cta.icon"
            class="text-none"
            block
          >
            {{ plan.cta.label }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  pricing?: Array<{
    title: string;
    description?: string;
    price: string;
    billing?: string;
    features?: string[];
    cta?: {
      label?: string;
      to?: string;
      target?: string;
      variant?: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
      size?: string;
      color?: string;
      icon?: string;
    };
    highlight?: boolean;
    badge?: string;
  }>;
}>();
</script>
