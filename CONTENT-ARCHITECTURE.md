# Content Architecture - Simplified Approach

## Overview

We've simplified the content architecture to follow Nuxt Content best practices:

### Before (Over-engineered)

- Complex individual schemas for each component type
- Manual type exports from Zod schemas
- Separate collections for different page types
- Risk of schema/component type drift

### After (Nuxt Content Native)

- Single `pages` collection using `source: "**/*.md"`
- Content structure defined in frontmatter (as intended)
- Components accept flexible props
- Let Nuxt Content's built-in page type handle routing and structure

## How It Works

### Content Config (`content.config.ts`)

```typescript
export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        // Optional fields for different page types
        hero: z.any().optional(),
        sections: z.any().optional(),
        // ... etc
      }),
    }),
  },
});
```

### Content Files

Content files define their own structure in frontmatter:

```yaml
---
title: "Page Title"
hero:
  heading: "Hello World"
  cta:
    - label: "Get Started"
      to: "/contact"
sections:
  - title: "Features"
    component: "features"
    features:
      - title: "Feature 1"
        description: "Description"
---
```

### Components

Components use simple TypeScript interfaces:

```typescript
defineProps<{
  title?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}>();
```

### MDC Usage

```mdc
::content-hero{:hero="hero"}
::

::content-features{:title="sections[0].title" :features="sections[0].features"}
::
```

## Benefits

1. **Follows Nuxt Content conventions** - Uses page collections as intended
2. **Flexible content structure** - Content authors define structure in frontmatter
3. **Simpler maintenance** - No complex type systems to maintain
4. **Studio-ready** - Still works with Nuxt Studio visual editing
5. **Type-safe** - TypeScript still provides component prop validation

## File Structure

```
content/
  index.md          # Landing page
  blog/
    foo.md          # Blog post
    bar.md          # Blog post
  services/
    web.md          # Service page

app/components/content/
  ContentHero.vue     # Accepts hero prop
  ContentFeatures.vue # Accepts features array
  ContentPricing.vue  # Accepts pricing array
  # etc...
```

This approach is more maintainable, follows Nuxt Content best practices, and still provides the type safety and Studio integration we need.
