import { defineCollection, defineContentConfig, z } from "@nuxt/content"

/* ───────────────────────────────────────────────────────────
 * Reusable component schemas - Export for type inference
 * ─────────────────────────────────────────────────────────── */
/* ───────────────────────────────────────────────────────────
 * Shared schemas for consistent typing
 * ─────────────────────────────────────────────────────────── */
const buttonVariantEnum = z.enum([
  "elevated",
  "flat",
  "tonal",
  "outlined",
  "text",
  "plain",
]);
const buttonSizeEnum = z.enum([
  "x-small",
  "small",
  "default",
  "large",
  "x-large",
]);

export import { defineCollection, defineContentConfig, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    // All pages - let content structure define itself
    pages: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        // Blog-specific fields
        date: z.string().optional(),
        author: z.object({
          name: z.string(),
          avatar: z.string().optional(),
          bio: z.string().optional(),
        }).optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        
        // Landing/service page fields
        hero: z.any().optional(),
        sections: z.any().optional(),
        services: z.any().optional(),
        
        // Image handling
        image: z.object({
          src: z.string().editor({ input: "media" }),
          alt: z.string(),
        }).optional(),
        
        // Common fields that might be used
        excerpt: z.string().optional(),
        tagline: z.string().optional(),
        icon: z.string().optional().editor({ input: "icon" }),
      }),
    }),
  },
})

export const featureSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  icon: z.string().optional().editor({ input: "icon" }),
  image: z.string().optional().editor({ input: "media" }),
});

export const testimonialSchema = z.object({
  quote: z.string().nonempty(),
  author: z.object({
    name: z.string().nonempty(),
    role: z.string().optional(),
    company: z.string().optional(),
    avatar: z.string().optional().editor({ input: "media" }),
  }),
});

export const pricingPlanSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  price: z.string().nonempty(),
  billing: z.string().optional().default("monthly"),
  features: z.array(z.string().nonempty()),
  cta: linkSchema,
  highlight: z.boolean().optional().default(false),
  badge: z.string().optional(),
});

export const faqItemSchema = z.object({
  question: z.string().nonempty(),
  answer: z.string().nonempty(),
});

export const heroSchema = z.object({
  heading: z.string().nonempty(),
  subheading: z.string().optional(),
  image: z.string().optional().editor({ input: "media" }),
  cta: z.array(linkSchema).optional(),
});

/* ───────────────────────────────────────────────────────────
 * Collection Definitions
 * ─────────────────────────────────────────────────────────── */
export default defineContentConfig({
  collections: {
    // Landing page (/)
    landing: defineCollection({
      type: "page",
      source: "index.md",
      schema: base().extend({
        hero: heroSchema,
        sections: z
          .array(
            base().extend({
              id: z.string().optional(),
              component: enumOf([
                "features",
                "testimonials",
                "pricing",
                "faq",
                "cta",
              ]),
              features: z.array(featureSchema).optional(),
              testimonials: z.array(testimonialSchema).optional(),
              pricing: z.array(pricingPlanSchema).optional(),
              faq: z.array(faqItemSchema).optional(),
              cta: z.array(linkSchema).optional(),
            }),
          )
          .optional(),
      }),
    }),

    // Blog posts
    posts: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string().nonempty(),
        excerpt: z.string().nonempty(),
        date: z.string().nonempty(),
        author: z.object({
          name: z.string().nonempty(),
          avatar: z.string().optional().editor({ input: "media" }),
          bio: z.string().optional(),
        }),
        category: z.object({
          name: z.string().nonempty(),
          slug: z.string().nonempty(),
          color: colorPalette.optional().default("primary"),
        }),
        tags: z.array(z.string()).optional(),
        image: z
          .object({
            src: z.string().nonempty().editor({ input: "media" }),
            alt: z.string().nonempty(),
          })
          .optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    }),

    // Service pages
    services: defineCollection({
      type: "page",
      source: "services/*.md",
      schema: base().extend({
        slug: z.string().nonempty(),
        category: enumOf(["Web", "AI", "Game", "Mobile", "SEO", "Marketing"]),
        tagline: z.string().optional(),
        icon: z.string().optional().editor({ input: "icon" }),
        hero: z
          .object({
            image: z.string().optional().editor({ input: "media" }),
            heading: z.string().optional(),
            subheading: z.string().optional(),
          })
          .optional(),
        features: z.array(featureSchema).optional(),
        pricing: z.array(pricingPlanSchema).optional(),
        testimonials: z.array(testimonialSchema).optional(),
        faq: z.array(faqItemSchema).optional(),
        cta: z.array(linkSchema).optional(),
      }),
    }),

    // Services index page
    servicesIndex: defineCollection({
      type: "page",
      source: "services/index.md",
      schema: base().extend({
        hero: z.object({
          heading: z.string().nonempty(),
          subheading: z.string().optional(),
        }),
        intro: z.string().optional(),
        services: z.array(
          z.object({
            title: z.string().nonempty(),
            description: z.string().nonempty(),
            icon: z.string().optional().editor({ input: "icon" }),
            category: enumOf([
              "Web",
              "AI",
              "Game",
              "Mobile",
              "SEO",
              "Marketing",
            ]),
            url: z.string().nonempty(),
          }),
        ),
        cta: z.array(linkSchema).optional(),
      }),
    }),
  },
});
