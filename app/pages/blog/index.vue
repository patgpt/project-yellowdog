<template>
  <div class="w-full">
    <!-- Hero Section with Featured Post -->
    <section v-if="featuredPost" class="hero-section mb-12">
      <v-container>
        <PostHero :post="featuredPost" />
      </v-container>
    </section>

    <!-- Blog Header -->
    <section class="blog-header mb-8">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">Latest Articles</h1>
            <p class="text-h6 text-medium-emphasis mb-6">
              Discover insights, tutorials, and thoughts on web development,
              design, and technology
            </p>

            <!-- Search Bar -->
            <v-text-field
              v-model="searchQuery"
              placeholder="Search articles..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              clearable
              class="mb-6 mx-auto"
              style="max-width: 400px"
            />

            <!-- Category Filter -->
            <div class="d-flex flex-wrap justify-center gap-2 mb-6">
              <Badge
                text="All"
                :variant="selectedCategory === '' ? 'elevated' : 'outlined'"
                :color="selectedCategory === '' ? 'primary' : 'default'"
                size="default"
                class="cursor-pointer"
                @click="selectedCategory = ''"
              />
              <Badge
                v-for="category in categories"
                :key="category.slug"
                :text="category.name"
                :variant="
                  selectedCategory === category.slug ? 'elevated' : 'outlined'
                "
                :color="
                  selectedCategory === category.slug
                    ? category.color || 'primary'
                    : 'default'
                "
                size="default"
                class="cursor-pointer"
                @click="selectedCategory = category.slug"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Blog Posts Grid -->
    <section class="posts-section">
      <v-container>
        <!-- Posts Count -->
        <div class="mb-6">
          <p class="text-body-1 text-medium-emphasis">
            Showing {{ paginatedPosts.length }} of
            {{ filteredPosts.length }} articles
            <span v-if="selectedCategoryName">
              in {{ selectedCategoryName }}
            </span>
          </p>
        </div>

        <!-- Posts Grid -->
        <v-row v-if="paginatedPosts.length > 0">
          <v-col
            v-for="post in paginatedPosts"
            :key="post.path"
            cols="12"
            md="6"
            lg="4"
          >
            <PostCard :post="post" />
          </v-col>
        </v-row>

        <!-- No Posts Found -->
        <div v-else class="text-center py-12">
          <v-icon
            icon="mdi-file-document-outline"
            size="64"
            color="medium-emphasis"
            class="mb-4"
          />
          <h3 class="text-h5 mb-2">No articles found</h3>
          <p class="text-body-1 text-medium-emphasis mb-4">
            Try adjusting your filters or search terms
          </p>
          <v-btn variant="outlined" @click="resetFilters">
            Clear Filters
          </v-btn>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="d-flex justify-center mt-8">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
            variant="elevated"
          />
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Blog - Yellowdog",
  description:
    "Discover insights, tutorials, and thoughts on web development, design, and technology from the Yellowdog team.",
  ogTitle: "Blog - Yellowdog",
  ogDescription:
    "Discover insights, tutorials, and thoughts on web development, design, and technology from the Yellowdog team.",
});

// Reactive state
const searchQuery = ref("");
const selectedCategory = ref("");
const currentPage = ref(1);
const postsPerPage = 6;

// Fetch data using queryCollection from content.config.ts
const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("posts").order("date", "DESC").all(),
);

const { data: categories } = await useAsyncData("blog-categories", () =>
  queryCollection("categories").order("order", "ASC").all(),
);

// Computed properties
const filteredPosts = computed(() => {
  if (!posts.value) return [];

  return posts.value.filter((post) => {
    // Skip draft posts
    if (post.draft) return false;

    const matchesSearch =
      !searchQuery.value ||
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (post.tags &&
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.value.toLowerCase()),
        ));

    const matchesCategory =
      !selectedCategory.value || post.category.slug === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

const featuredPost = computed(() => {
  return (
    posts.value?.find((post) => post.featured && !post.draft) ||
    posts.value?.[0] ||
    null
  );
});

const selectedCategoryName = computed(() => {
  if (!selectedCategory.value) return "";
  const category = categories.value?.find(
    (cat) => cat.slug === selectedCategory.value,
  );
  return category?.name || "";
});

// Methods
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  currentPage.value = 1;
};

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});
</script>
