import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // All pages - let content structure define itself
    pages: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        // Blog-specific fields
        date: z.string().optional(),
        author: z
          .object({
            name: z.string(),
            avatar: z.string().optional(),
            bio: z.string().optional(),
          })
          .optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),

        // Landing/service page fields
        hero: z.any().optional(),
        sections: z.any().optional(),
        services: z.any().optional(),

        // Image handling
        image: z
          .object({
            src: z.string().editor({ input: "media" }),
            alt: z.string(),
          })
          .optional(),

        // Common fields that might be used
        excerpt: z.string().optional(),
        tagline: z.string().optional(),
        icon: z.string().optional().editor({ input: "icon" }),
      }),
    }),
  },
});
