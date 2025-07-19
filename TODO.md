# Yellowdog Content Schema TODO

> Single source of truth for project tasks and implementation progress.

## 🎯 Current Priority: Content Schema Migration

### Phase 1: Core Schema Setup ✅ COMPLETE

- [x] Clean up content.config.ts - remove duplicated schemas
- [x] Create streamlined Vuetify-based enums (sizes, variants, colors)
- [x] Implement clean collection definitions (landing, services, service details)
- [x] Add proper editor inputs for Studio form generation

### Phase 2: Component Architecture ✅ COMPLETE

- [x] Create base content components in `/components/content/`
  - [x] `ContentHero.vue` - Hero sections with CTA
  - [x] `ContentFeatures.vue` - Feature grid layouts
  - [x] `ContentPricing.vue` - Pricing tables
  - [x] `ContentTestimonials.vue` - Testimonial carousels
  - [x] `ContentFaq.vue` - FAQ sections
  - [x] `ContentCta.vue` - Call-to-action blocks
- [x] Implement MDC-ready props and slots
- [x] Add Vuetify utility-based styling
- [x] **NEW**: Implement Zod type inference for 1:1 parity

### Phase 3: Content Structure ✅ COMPLETE

- [x] Create example content files
  - [x] `content/index.md` - Landing page
  - [x] `content/services/index.md` - Services landing
  - [x] `content/services/web-development.md` - Service detail example
- [ ] Test Studio visual editing workflow
- [ ] Verify `/` component insertion functionality

### Phase 4: Studio Integration ✅ NEXT

- [ ] Test form generation from Zod schemas
- [ ] Validate icon picker functionality
- [ ] Verify media library integration
- [ ] Test visual editor component insertion

### Phase 5: Advanced Features (Future)

- [ ] Dark mode media field support
- [ ] Advanced layout options
- [ ] Color/style customization from Studio
- [ ] Relation fields between collections

---

## 🔧 Technical Notes

### Principles

1. **Separation of concerns**: Content = data, Components = presentation
2. **Portable IDs**: Numeric IDs for SQLite, slugs for content routing
3. **Studio-first**: All fields mapped to Zod for form generation
4. **Vuetify-native**: Use Vuetify enums, utilities, and components

### Current Issues ✅ RESOLVED

- [x] content.config.ts has duplicate schemas and functions
- [x] Missing proper collection definitions
- [x] No TODO tracking system
- [x] Components not MDC-ready for Studio insertion
- [x] **NEW**: Type duplication between Zod schemas and component interfaces

### Dependencies

- Nuxt 4 + Content module
- Vuetify Material Design 3
- Zod schema validation
- TypeScript interfaces

---

## 📝 Implementation Log

### 2025-07-19

- Created TODO.md as single source of truth
- Identified content.config.ts cleanup needs
- Planned 5-phase implementation approach
- **MAJOR UPDATE**: Completed Phases 1-3
  - ✅ Cleaned content.config.ts with streamlined Zod schemas
  - ✅ Created Vuetify-based enums for Studio form generation
  - ✅ Built 4 core content components (ContentHero, ContentFeatures, ContentPricing, ContentCta)
  - ✅ Created example content structure with proper schema alignment
  - ✅ Set up landing page, services index, and service detail templates
- **TYPE SAFETY UPDATE**: Implemented Zod type inference
  - ✅ Exported TypeScript types from content.config.ts schemas
  - ✅ Updated all 6 components to use inferred types (1:1 parity)
  - ✅ Eliminated duplicate interface definitions
  - ✅ Added ContentTestimonials and ContentFaq components
  - ✅ All components now maintain perfect sync with Zod schemas

---

_This file should be updated with each completed task and new requirements._
