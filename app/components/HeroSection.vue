<template>
  <v-parallax
    :height="800"
    :src="backgroundImage"
    content-class="d-flex align-center justify-center"
  >
    <v-container fluid>
      <v-row
        justify="center"
        align="center"
        class="flex-column-reverse flex-md-row fill-height"
      >
        <v-col cols="12" md="6" class="text-center text-md-start">
          <h1
            class="text-h1 text-md-h1 text-sm-h2 mb-6 font-weight-bold text-white"
          >
            {{ heading }}
          </h1>
          <p
            class="text-h4 text-md-h4 text-sm-h5 mb-8 font-weight-light text-white opacity-90"
          >
            {{ subheading }}
          </p>
          <v-btn
            :to="buttonLink"
            color="primary"
            size="x-large"
            variant="elevated"
            class="text-none px-8 py-4"
            rounded="lg"
            elevation="4"
          >
            {{ buttonText }}
          </v-btn>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <v-img
            :src="image"
            :alt="heading"
            max-width="400"
            aspect-ratio="1"
            class="mx-auto"
            rounded="circle"
            cover
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary" />
              </div>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script setup lang="ts">
interface HeroProps {
  heading: string;
  subheading: string;
  backgroundImage: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

defineProps<HeroProps>();
</script>
