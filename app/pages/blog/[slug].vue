<template>
  <div class="blog-post-page">
    <!-- Loading State with Skeleton -->
    <template v-if="pending">
      <div class="mb-8">
        <!-- Hero skeleton -->
        <v-skeleton-loader type="image" height="400" class="rounded-lg mb-4" />
        <!-- Breadcrumb skeleton -->
        <v-skeleton-loader type="breadcrumbs" class="mb-4" />
        <!-- Title skeleton -->
        <v-skeleton-loader type="heading" class="mb-4" />
        <!-- Meta skeleton -->
        <v-skeleton-loader type="text" width="300" class="mb-6" />
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" lg="8">
            <!-- Content skeleton -->
            <v-skeleton-loader
              type="paragraph, paragraph, paragraph"
              class="mb-6"
            />
          </v-col>
          <v-col cols="12" lg="4">
            <!-- Sidebar skeleton -->
            <v-skeleton-loader type="card" height="200" class="mb-4" />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- Error State -->
    <v-container
      v-else-if="error"
      min-height="full-width"
      class="text-center py-16"
    >
      <v-icon size="64" color="error" class="mb-4">
        mdi-alert-circle-outline
      </v-icon>
      <h2 class="text-h4 mb-4">Post not found</h2>
      <p class="text-body-1 mb-6">
        The blog post you're looking for doesn't exist.
      </p>
      <v-btn to="/blog" color="primary" variant="elevated" size="large">
        <v-icon start>mdi-arrow-left</v-icon>
        Back to Blog
      </v-btn>
    </v-container>

    <!-- Post Content -->
    <v-container v-else-if="post" min-width="full-width">
      <!-- Hero Image -->
      <div v-if="post.image" class="mb-8">
        <v-img
          :src="post.image.src"
          :alt="post.image.alt"
          height="400"
          cover
          class="rounded-lg"
        >
          <div class="hero-overlay d-flex align-end">
            <v-container class="pb-8">
              <!-- Breadcrumbs -->
              <v-breadcrumbs
                :items="breadcrumbItems"
                class="pa-0 mb-4"
                color="white"
              >
                <template #divider>
                  <v-icon color="white" size="small">
                    mdi-chevron-right
                  </v-icon>
                </template>
              </v-breadcrumbs>

              <!-- Category Badge -->
              <Badge
                v-if="post.category"
                :text="post.category.name"
                :color="post.category.color || 'primary'"
                class="mb-4"
              />

              <!-- Title -->
              <h1 class="text-h2 text-white font-weight-bold mb-4">
                {{ post.title }}
              </h1>

              <!-- Excerpt -->
              <p class="text-h6 text-white mb-6 font-weight-regular">
                {{ post.excerpt }}
              </p>

              <!-- Meta Information -->
              <div class="d-flex flex-wrap align-center ga-4 text-white">
                <div class="d-flex align-center">
                  <v-avatar size="32" class="me-2">
                    <v-img :src="post.author.avatar" :alt="post.author.name" />
                  </v-avatar>
                  <span class="text-body-1">{{ post.author.name }}</span>
                </div>

                <v-divider vertical class="mx-2" color="white" opacity="0.5" />

                <div class="d-flex align-center">
                  <v-icon size="small" class="me-1">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ formatDate(post.date) }}</span>
                </div>

                <div v-if="post.readTime" class="d-flex align-center">
                  <v-icon size="small" class="me-1"> mdi-clock-outline </v-icon>
                  <span class="text-body-2">
                    {{ post.readTime }} min read
                  </span>
                </div>
              </div>
            </v-container>
          </div>
        </v-img>

        <!-- Image Credit -->
        <div
          v-if="post.image.credit"
          class="text-caption text-medium-emphasis mt-2 text-center"
        >
          {{ post.image.credit }}
        </div>
      </div>

      <!-- Main Content Area -->
      <v-container min-width="full-width">
        <v-row min-width="full-width">
          <!-- Main Content -->
          <v-col cols="12" lg="8">
            <!-- Content without hero image (fallback) -->
            <div v-if="!post.image" class="mb-8">
              <!-- Breadcrumbs -->
              <v-breadcrumbs :items="breadcrumbItems" class="pa-0 mb-4">
                <template #divider>
                  <v-icon size="small">mdi-chevron-right</v-icon>
                </template>
              </v-breadcrumbs>

              <!-- Category Badge -->
              <Badge
                v-if="post.category"
                :text="post.category.name"
                :color="post.category.color || 'primary'"
                class="mb-4"
              />

              <!-- Title -->
              <h1 class="text-h2 font-weight-bold mb-4">
                {{ post.title }}
              </h1>

              <!-- Excerpt -->
              <p class="text-h6 text-medium-emphasis mb-6 font-weight-regular">
                {{ post.excerpt }}
              </p>

              <!-- Meta Information -->
              <div
                class="d-flex flex-wrap align-center ga-4 mb-8 pb-4 border-b-thin border-outline border-opacity-12"
              >
                <div class="d-flex align-center">
                  <v-avatar size="32" class="me-2">
                    <v-img :src="post.author.avatar" :alt="post.author.name" />
                  </v-avatar>
                  <span class="text-body-1">{{ post.author.name }}</span>
                </div>

                <v-divider vertical class="mx-2" />

                <div class="d-flex align-center">
                  <v-icon size="small" class="me-1">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ formatDate(post.date) }}</span>
                </div>

                <div v-if="post.readTime" class="d-flex align-center">
                  <v-icon size="small" class="me-1">mdi-clock-outline</v-icon>
                  <span class="text-body-2">{{ post.readTime }} min read</span>
                </div>
              </div>
            </div>

            <!-- Article Content -->
            <v-article min-width="full-width">
              <ContentRenderer :value="post" />
            </v-article>

            <!-- Tags -->
            <div
              v-if="post.tags && post.tags.length"
              class="mt-8 pt-6 border-t-thin border-outline border-opacity-12"
            >
              <h3 class="text-h6 mb-4">Tags</h3>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="tag in post.tags"
                  :key="tag"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  <v-icon start size="small">mdi-tag</v-icon>
                  {{ tag }}
                </v-chip>
              </div>
            </div>

            <!-- Share Buttons -->
            <div
              class="mt-8 pt-6 border-t-thin border-outline border-opacity-12"
            >
              <h3 class="text-h6 mb-4">Share this post</h3>
              <div class="d-flex flex-wrap ga-2">
                <v-btn
                  :href="twitterShareUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue"
                  variant="outlined"
                  size="small"
                >
                  <v-icon start>mdi-twitter</v-icon>
                  Twitter
                </v-btn>

                <v-btn
                  :href="linkedinShareUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue-darken-3"
                  variant="outlined"
                  size="small"
                >
                  <v-icon start>mdi-linkedin</v-icon>
                  LinkedIn
                </v-btn>

                <v-btn
                  color="grey-darken-1"
                  variant="outlined"
                  size="small"
                  @click="copyToClipboard"
                >
                  <v-icon start>{{ copied ? "mdi-check" : "mdi-link" }}</v-icon>
                  {{ copied ? "Copied!" : "Copy Link" }}
                </v-btn>
              </div>
            </div>
          </v-col>

          <!-- Sidebar -->
          <v-col cols="12" lg="12">
            <div class="d-flex flex-column ga-6">
              <!-- Author Card -->
              <v-card elevation="2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-avatar size="64" class="me-4">
                      <v-img
                        :src="post.author.avatar"
                        :alt="post.author.name"
                      />
                    </v-avatar>
                    <div>
                      <h3 class="text-h6 mb-1">{{ post.author.name }}</h3>
                      <p class="text-body-2 text-medium-emphasis mb-0">
                        Author
                      </p>
                    </div>
                  </div>

                  <p class="text-body-2 mb-4">{{ post.author.bio }}</p>

                  <div v-if="post.author.social" class="d-flex ga-2">
                    <v-btn
                      v-if="post.author.social.twitter"
                      :href="`https://twitter.com/${post.author.social.twitter}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon
                      size="small"
                      variant="outlined"
                    >
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="post.author.social.github"
                      :href="`https://github.com/${post.author.social.github}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon
                      size="small"
                      variant="outlined"
                    >
                      <v-icon>mdi-github</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="post.author.social.linkedin"
                      :href="`https://linkedin.com/in/${post.author.social.linkedin}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon
                      size="small"
                      variant="outlined"
                    >
                      <v-icon>mdi-linkedin</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="post.author.social.website"
                      :href="post.author.social.website"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon
                      size="small"
                      variant="outlined"
                    >
                      <v-icon>mdi-web</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Table of Contents (if available) -->
              <v-card
                v-if="
                  post.body &&
                  post.body.toc &&
                  post.body.toc.links &&
                  post.body.toc.links.length
                "
                elevation="2"
              >
                <v-card-title class="text-h6">Table of Contents</v-card-title>
                <v-card-text>
                  <TableOfContents :links="post.body.toc.links" />
                </v-card-text>
              </v-card>

              <!-- Related Posts Placeholder -->
              <v-card elevation="2">
                <v-card-title class="text-h6">Related Posts</v-card-title>
                <v-card-text>
                  <p class="text-body-2 text-medium-emphasis">
                    More related posts coming soon!
                  </p>
                  <v-btn
                    to="/blog"
                    color="primary"
                    variant="outlined"
                    block
                    class="mt-4"
                  >
                    <v-icon start>mdi-arrow-left</v-icon>
                    Back to All Posts
                  </v-btn>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = (route.params as { slug: string }).slug;

// Fetch the blog post
const {
  data: post,
  pending,
  error,
} = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("posts").path(`/blog/${slug}`).first();
});

// Filter out draft posts in production
if (post.value?.draft && process.env.NODE_ENV === "production") {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog post not found",
  });
}

// Reactive state
const copied = ref(false);

// Computed properties
const breadcrumbItems = computed(() => [
  {
    title: "Home",
    href: "/",
    disabled: false,
  },
  {
    title: "Blog",
    href: "/blog",
    disabled: false,
  },
  {
    title: post.value?.title || "Post",
    href: "#",
    disabled: true,
  },
]);

const currentUrl = computed(() => {
  if (import.meta.client) {
    return window.location.href;
  }
  return `https://yourwebsite.com${route.fullPath}`;
});

const twitterShareUrl = computed(() => {
  const text = `Check out this article: ${post.value?.title}`;
  const url = currentUrl.value;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
});

const linkedinShareUrl = computed(() => {
  const url = currentUrl.value;
  const title = post.value?.title || "";
  const summary = post.value?.excerpt || "";
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
});

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const copyToClipboard = async () => {
  if (import.meta.client && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(currentUrl.value);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
};

// SEO Meta
if (post.value) {
  useSeoMeta({
    title: post.value.seo?.title || post.value.title,
    description: post.value.seo?.description || post.value.excerpt,
    ogTitle: post.value.title,
    ogDescription: post.value.excerpt,
    ogImage: post.value.image?.src,
    ogUrl: currentUrl,
    twitterCard: "summary_large_image",
    twitterTitle: post.value.title,
    twitterDescription: post.value.excerpt,
    twitterImage: post.value.image?.src,
  });

  if (post.value.seo?.keywords) {
    useSeoMeta({
      keywords: post.value.seo.keywords.join(", "),
    });
  }
}

// Handle 404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog post not found",
  });
}
</script>

<style scoped>
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

/* Minimal responsive adjustments for large screens only */
@media (min-width: 1280px) {
  .sidebar {
    position: sticky;
    top: 2rem;
  }
}
</style>
