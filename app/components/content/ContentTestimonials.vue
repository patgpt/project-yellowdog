<template>
  <v-container class="content-testimonials py-16">
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

    <!-- Testimonials Carousel -->
    <v-row v-if="testimonials?.length" justify="center">
      <v-col cols="12">
        <v-carousel
          v-if="testimonials.length > 1"
          height="auto"
          hide-delimiters
          show-arrows="hover"
          cycle
          class="testimonial-carousel"
        >
          <v-carousel-item
            v-for="(testimonial, index) in testimonials"
            :key="index"
          >
            <v-container>
              <v-row justify="center">
                <v-col cols="12" lg="8">
                  <v-card
                    variant="flat"
                    class="text-center pa-8 ma-4"
                    elevation="0"
                  >
                    <!-- Quote -->
                    <blockquote
                      class="text-h6 text-md-h5 font-weight-regular mb-8 text-medium-emphasis font-italic"
                    >
                      "{{ testimonial.quote }}"
                    </blockquote>

                    <!-- Author -->
                    <div class="d-flex align-center justify-center ga-4">
                      <v-avatar
                        v-if="testimonial.author.avatar"
                        :image="testimonial.author.avatar"
                        size="64"
                      />
                      <div class="text-start">
                        <div class="text-h6 font-weight-bold">
                          {{ testimonial.author.name }}
                        </div>
                        <div
                          v-if="testimonial.author.role"
                          class="text-body-2 text-medium-emphasis"
                        >
                          {{ testimonial.author.role }}
                          <span v-if="testimonial.author.company"
                            >at {{ testimonial.author.company }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-carousel-item>
        </v-carousel>

        <!-- Single testimonial (no carousel) -->
        <v-container v-else-if="testimonials[0]">
          <v-row justify="center">
            <v-col cols="12" lg="8">
              <v-card variant="flat" class="text-center pa-8" elevation="0">
                <!-- Quote -->
                <blockquote
                  class="text-h6 text-md-h5 font-weight-regular mb-8 text-medium-emphasis font-italic"
                >
                  "{{ testimonials[0].quote }}"
                </blockquote>

                <!-- Author -->
                <div class="d-flex align-center justify-center ga-4">
                  <v-avatar
                    v-if="testimonials[0].author.avatar"
                    :image="testimonials[0].author.avatar"
                    size="64"
                  />
                  <div class="text-start">
                    <div class="text-h6 font-weight-bold">
                      {{ testimonials[0].author.name }}
                    </div>
                    <div
                      v-if="testimonials[0].author.role"
                      class="text-body-2 text-medium-emphasis"
                    >
                      {{ testimonials[0].author.role }}
                      <span v-if="testimonials[0].author.company"
                        >at {{ testimonials[0].author.company }}</span
                      >
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { TestimonialType } from "../../../content.config";

interface Props {
  title?: string;
  description?: string;
  testimonials?: TestimonialType[];
}

defineProps<Props>();
</script>
