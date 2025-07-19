import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import type { z as ZodSchema } from "zod";

/* ───────────────────────────────────────────────────────────
 * Yellowdog Content Schema - Nuxt Studio Ready
 * Single source of truth with Zod type inference
 * ─────────────────────────────────────────────────────────── */

// Tiny helpers for cleaner schema definitions
const enumOf = <T extends readonly [string, ...string[]]>(opts: T) =>
  z.enum(opts);

const base = () =>
  z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
  });

/* ───────────────────────────────────────────────────────────
 * Vuetify-based enums for Studio form generation
 * ─────────────────────────────────────────────────────────── */
export const vuetifySize = enumOf([
  "x-small",
  "small",
  "default",
  "large",
  "x-large",
]);
export const vuetifyVariant = enumOf([
  "elevated",
  "flat",
  "tonal",
  "outlined",
  "text",
  "plain",
]);
export const target = enumOf(["_blank", "_self"]);
export const colorPalette = enumOf([
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
  "surface",
  "on-surface",
  "background",
  "on-background",
]);

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

const linkSchema = z.object({
  text: z.string(),
  label: z.string().optional(), // For button display text
  url: z.string(),
  to: z.string().optional(), // For router navigation
  target: z.string().optional(),
  variant: buttonVariantEnum.optional(),
  color: z.string().optional(),
  size: buttonSizeEnum.optional(),
  icon: z.string().optional().editor({ input: "icon" }),
  external: z.boolean().default(false),
});

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
 * Type exports for component props (using Zod inference)
 * ─────────────────────────────────────────────────────────── */
export type LinkType = ZodSchema.infer<typeof linkSchema>;
export type FeatureType = ZodSchema.infer<typeof featureSchema>;
export type TestimonialType = ZodSchema.infer<typeof testimonialSchema>;
export type PricingPlanType = ZodSchema.infer<typeof pricingPlanSchema>;
export type FaqItemType = ZodSchema.infer<typeof faqItemSchema>;
export type HeroType = ZodSchema.infer<typeof heroSchema>;

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
