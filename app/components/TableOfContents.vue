<template>
  <v-navigation-drawer
    v-if="links && links.length"
    class="table-of-contents"
    floating
  >
    <v-list class="py-0" density="compact" nav>
      <v-list-item
        v-for="link in links"
        :key="link.id"
        :href="`#${link.id}`"
        :class="`toc-depth-${link.depth}`"
        class="text-body-2 rounded-lg ma-1 transition-all"
        @click="scrollToHeading(link.id)"
      >
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>

      <!-- Recursive nested items -->
      <template v-for="link in links" :key="`nested-${link.id}`">
        <TableOfContents
          v-if="link.children && link.children.length"
          :links="link.children"
          class="ps-4"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

defineProps<{
  links: TocLink[];
}>();

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.toc-depth-2 {
  padding-left: 0rem;
  font-size: 0.9rem;
}

.toc-depth-3 {
  padding-left: 1rem;
  font-size: 0.85rem;
}

.toc-depth-4 {
  padding-left: 1.5rem;
  font-size: 0.8rem;
}

.toc-depth-5,
.toc-depth-6 {
  padding-left: 2rem;
  font-size: 0.75rem;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  color: rgb(var(--v-theme-primary));
}
</style>
