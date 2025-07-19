<template>
  <v-footer class="py-8" color="surface-variant">
    <v-container>
      <v-row align="center" justify="center" class="fill-height">
        <!-- Left Sticker -->
        <v-col cols="12" md="3" class="d-flex justify-center justify-md-start">
          <v-img
            src="/stickers/yellowdog-sticker.png"
            alt="Yellowdog Sticker"
            max-width="240"
            max-height="160"
            contain
            class="sticker-image rotate-22"
          />
        </v-col>

        <!-- Center Content -->
        <v-col cols="12" md="6" class="text-center">
          <!-- Social Links -->
          <div class="d-flex justify-center ga-2 mb-4">
            <v-btn
              v-for="social in settings.footer.social"
              :key="social.icon"
              :icon="social.icon"
              variant="text"
              size="small"
              color="primary"
              :href="social.link"
              target="_blank"
              :aria-label="`Visit our ${social.icon.replace('mdi-', '')} page`"
            />
          </div>

          <v-divider
            class="mx-auto mb-4"
            width="80"
            thickness="2"
            color="primary"
          />

          <!-- Footer Description -->
          <p class="text-body-2 text-medium-emphasis mb-3 text-secondary">
            {{ settings.footer.description }}
          </p>

          <v-divider class="mx-auto mb-4" width="60" />

          <!-- Copyright -->
          <div class="text-caption text-high-emphasis">
            {{ new Date().getFullYear() }} —
            <strong class="text-accent">{{ settings.footer.copyright }}</strong>
          </div>
        </v-col>

        <!-- Right Sticker -->
        <v-col cols="12" md="3" class="d-flex justify-center justify-md-end">
          <v-img
            src="/stickers/yellowdog-japanese-sticker.png"
            alt="イエロードッグ Japanese Sticker"
            max-width="240"
            max-height="160"
            contain
            class="sticker-image rotate"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const settings = useAppConfig();
</script>

<style scoped>
.sticker-image {
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}

.rotate {
  transform: rotate(-9deg);
}
.rotate-22 {
  transform: rotate(9deg);
}

.sticker-image:hover {
  transform: scale(1.05) rotate(2deg);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .sticker-image {
    max-width: 80px !important;
    max-height: 60px !important;
  }
}
</style>
