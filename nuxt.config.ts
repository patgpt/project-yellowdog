import { md3 } from "vuetify/blueprints";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  experimental: {
    typedPages: true,
  },
  pages: {
    enabled: true,
  },

  content: {
    preview: {
      dev: true,
      api: "https://api.nuxt.studio",
    },

    watch: {
      port: 4000,
      showURL: true,
    },

    renderer: {
      anchorLinks: { h2: true, h3: true, h4: true },
    },

    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: "github-light",
            // Theme used if `html.dark`
            dark: "github-dark",
            // Theme used if `html.sepia`
            sepia: "monokai",
          },
        },
      },
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
  ],
  features: {
    inlineStyles: false,
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */

      prefixComposables: true,
      ssrClientHints: {
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          cookieName: "color-mode",
          darkThemeName: "dark",
          lightThemeName: "light",
          useBrowserThemeOnly: true,
        },
      },

      importComposables: true,
    },
    vuetifyOptions: {
      blueprint: md3,
      theme: {
        defaultTheme: "light",
        themes: {
          light: {},
          dark: {},
        },
      },
    },
  },
});
