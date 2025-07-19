<template>
  <v-container class="content-faq py-16">
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

    <!-- FAQ Accordion -->
    <v-row v-if="faq?.length" justify="center">
      <v-col cols="12" lg="8">
        <v-expansion-panels variant="accordion" multiple>
          <v-expansion-panel
            v-for="(item, index) in faq"
            :key="index"
            :value="index"
          >
            <v-expansion-panel-title class="text-h6 font-weight-medium">
              <v-icon icon="mdi-help-circle-outline" class="me-3" />
              {{ item.question }}
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <div class="text-body-1 pt-2">
                {{ item.answer }}
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { FaqItemType } from "../../../content.config";

interface Props {
  title?: string;
  description?: string;
  faq?: FaqItemType[];
}

defineProps<Props>();
</script>
