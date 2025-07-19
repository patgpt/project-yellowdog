<template>
  <v-card
    :to="`/blog/${post.path?.split('/').pop()}`"
    class="h-100 border-thin"
    hover
    :elevation="hover ? 8 : 2"
    rounded="lg"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Featured Image -->
    <div v-if="post.image?.src" class="position-relative overflow-hidden">
      <v-img
        :src="post.image.src"
        :alt="post.image.alt"
        height="200"
        cover
        class="transition-transform"
        :class="{ 'transform-scale-105': hover }"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </template>
      </v-img>

      <!-- Category Badge Overlay -->
      <div class="position-absolute" style="top: 12px; right: 12px; z-index: 2">
        <Badge
          :text="post.category.name"
          :color="post.category.color"
          variant="elevated"
          elevation="4"
        />
      </div>
    </div>

    <!-- Card Content -->
    <v-card-text class="pa-6">
      <!-- Meta Information -->
      <div class="d-flex align-center justify-space-between mb-3">
        <div class="d-flex align-center text-caption text-medium-emphasis">
          <v-icon icon="mdi-calendar" size="small" class="me-1" />
          {{ formatDate(post.date) }}
        </div>
        <div
          v-if="post.readTime"
          class="d-flex align-center text-caption text-medium-emphasis"
        >
          <v-icon icon="mdi-clock-outline" size="small" class="me-1" />
          {{ post.readTime }} min read
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-h6 font-weight-bold mb-3 text-clamp-2">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-body-2 text-medium-emphasis mb-4 text-clamp-3">
        {{ post.excerpt }}
      </p>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="d-flex flex-wrap ga-1 mb-4">
        <Badge
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          :text="tag"
          variant="outlined"
          size="x-small"
          color="primary"
        />
        <Badge
          v-if="post.tags.length > 3"
          :text="`+${post.tags.length - 3}`"
          variant="text"
          size="x-small"
          color="primary"
        />
      </div>
    </v-card-text>

    <!-- Author Information -->
    <v-card-actions class="px-6 pb-6 pt-0">
      <div class="d-flex align-center w-100">
        <v-avatar size="32" class="me-3">
          <v-img
            v-if="post.author.avatar"
            :src="post.author.avatar"
            :alt="post.author.name"
          />
          <v-icon v-else icon="mdi-account" />
        </v-avatar>

        <div class="flex-grow-1">
          <div class="text-body-2 font-weight-medium">
            {{ post.author.name }}
          </div>
          <div v-if="post.author.bio" class="text-caption text-medium-emphasis">
            {{ truncateText(post.author.bio, 40) }}
          </div>
        </div>

        <!-- Read More Arrow -->
        <v-icon
          icon="mdi-arrow-right"
          color="primary"
          class="transition-transform"
          :class="{ 'transform-translateX-1': hover }"
        />
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

interface PostCardProps {
  post: Post;
}

defineProps<PostCardProps>();
const hover = ref(false);

// Format date to readable format
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

// Truncate text helper
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
</script>

<style scoped>
/* Utility classes for text clamping */
.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.text-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

/* Transform utilities */
.transform-scale-105 {
  transform: scale(1.05);
}

.transform-translateX-1 {
  transform: translateX(4px);
}

/* Transition utilities */
.transition-transform {
  transition: transform 0.3s ease;
}
</style>
