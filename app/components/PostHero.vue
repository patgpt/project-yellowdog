<template>
  <v-card
    :to="`/blog/${post.path?.split('/').pop()}`"
    class="post-hero position-relative overflow-hidden transition-transform elevation-8 rounded-xl"
    height="500"
    hover
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Background Image with Overlay -->
    <v-img
      v-if="post.image?.src"
      :src="post.image.src"
      :alt="post.image.alt"
      cover
      class="hero-image transition-transform"
      :class="{ 'transform-scale-102': hover }"
      height="100%"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="white" />
        </div>
      </template>

      <!-- Gradient Overlay -->
      <div class="hero-overlay position-absolute w-100 h-100" />

      <!-- Content Overlay -->
      <div
        class="hero-content position-absolute w-100 h-100 d-flex align-center"
      >
        <v-container>
          <v-row class="fill-height" align="center">
            <v-col cols="12" md="8" lg="6">
              <!-- Featured Badge -->
              <div class="mb-4">
                <Badge
                  text="Featured Post"
                  color="yellow-darken-3"
                  variant="elevated"
                  icon="mdi-star"
                  size="default"
                  class="featured-badge"
                />
              </div>

              <!-- Category -->
              <div class="mb-3">
                <Badge
                  :text="post.category.name"
                  :color="post.category.color"
                  variant="tonal"
                  size="small"
                />
              </div>

              <!-- Title -->
              <h1
                class="text-h3 text-md-h2 font-weight-bold text-white mb-4 text-shadow-1"
              >
                {{ post.title }}
              </h1>

              <!-- Excerpt -->
              <p
                class="text-h6 text-md-h5 font-weight-regular text-white text-opacity-90 mb-6 text-shadow-1"
              >
                {{ post.excerpt }}
              </p>

              <!-- Meta Information -->
              <div
                class="d-flex flex-wrap align-center ga-4 mb-6 text-white text-opacity-80"
              >
                <div class="d-flex align-center">
                  <v-icon icon="mdi-calendar" size="small" class="me-2" />
                  <span class="text-body-2">{{ formatDate(post.date) }}</span>
                </div>
                <div v-if="post.readTime" class="d-flex align-center">
                  <v-icon icon="mdi-clock-outline" size="small" class="me-2" />
                  <span class="text-body-2">{{ post.readTime }} min read</span>
                </div>
              </div>

              <!-- Tags -->
              <div v-if="post.tags?.length" class="d-flex flex-wrap ga-2 mb-6">
                <Badge
                  v-for="tag in post.tags.slice(0, 4)"
                  :key="tag"
                  :text="tag"
                  variant="outlined"
                  size="small"
                  color="white"
                  class="text-white"
                />
              </div>

              <!-- Call to Action -->
              <v-btn
                color="white"
                variant="elevated"
                size="large"
                :to="`/blog/${post.path?.split('/').pop()}`"
                class="text-primary font-weight-medium text-none"
                prepend-icon="mdi-book-open-page-variant"
              >
                Read Full Article
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-img>

    <!-- Author Information (Bottom) -->
    <v-card-actions class="pa-6 bg-surface-variant">
      <div class="d-flex align-center w-100">
        <v-avatar size="48" class="me-4">
          <v-img
            v-if="post.author.avatar"
            :src="post.author.avatar"
            :alt="post.author.name"
          />
          <v-icon v-else icon="mdi-account" />
        </v-avatar>

        <div class="flex-grow-1">
          <div class="text-subtitle-1 font-weight-bold">
            {{ post.author.name }}
          </div>
          <div v-if="post.author.bio" class="text-body-2 text-medium-emphasis">
            {{ post.author.bio }}
          </div>
        </div>

        <!-- Social Links -->
        <div v-if="post.author.social" class="d-flex ga-1">
          <v-btn
            v-if="post.author.social.twitter"
            :href="`https://twitter.com/${post.author.social.twitter}`"
            icon="mdi-twitter"
            variant="text"
            size="small"
            target="_blank"
            color="primary"
          />
          <v-btn
            v-if="post.author.social.github"
            :href="`https://github.com/${post.author.social.github}`"
            icon="mdi-github"
            variant="text"
            size="small"
            target="_blank"
            color="primary"
          />
          <v-btn
            v-if="post.author.social.linkedin"
            :href="`https://linkedin.com/in/${post.author.social.linkedin}`"
            icon="mdi-linkedin"
            variant="text"
            size="small"
            target="_blank"
            color="primary"
          />
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
interface Post {
  path?: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
    social?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      website?: string;
    };
  };
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
  readTime?: number;
  featured?: boolean;
}

interface PostHeroProps {
  post: Post;
}

defineProps<PostHeroProps>();

const hover = ref(false);

// Format date to readable format
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
</script>

<style scoped>
.post-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.transform-scale-102 {
  transform: scale(1.02);
}

.hero-overlay {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}

.hero-content {
  z-index: 2;
}

.text-shadow-1 {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.featured-badge {
  animation: pulse-glow 2s infinite alternate;
}

@keyframes pulse-glow {
  from {
    box-shadow: 0 0 5px rgba(255, 193, 7, 0.5);
  }
  to {
    box-shadow: 0 0 20px rgba(255, 193, 7, 0.8);
  }
}

/* Responsive adjustments that Vuetify can't handle */
@media (max-width: 768px) {
  .post-hero {
    height: 400px !important;
  }
}

@media (max-width: 480px) {
  .post-hero {
    height: 350px !important;
  }
}
</style>
