---
applyTo: "**"
---

# tech: global

- Styling and components. Use Vuetify
- State management. Use Pinia
- Use the Nuxt4 framework for server-side rendering and static site generation.

# Project Structure

```ts
my-nuxt-app/
├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ plugins/
│  ├─ utils/
│  ├─ app.vue
│  ├─ app.config.ts
│  └─ error.vue
├─ content/
├─ public/
├─ shared/
├─ server/
└─ nuxt.config.ts
```

Nuxt directly auto-imports files created in defined directories:

```ts
components/ for Vue components.
composables/ for Vue composables.
utils/ for helper functions and other utilities.
```

# Global Instructions

## General Guidelines

- After each task is completed, provide a brief summary of the actions taken.
- Ensure that all code is well-commented and follows best practices.
- Maintain a consistent coding style throughout the project. using Typescript and the Nuxt4 framework. with Vue setup script syntax.

# Markdown

> Create and query Markdown files in your Nuxt applications and use the MDC syntax to integrate Vue components.

## Nuxt Content Usage

# Configuration

> Nuxt Content is configured with sensible defaults.

To configure the content module and customize its behavior, you can use the `content` property in your `nuxt.config`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    // Options
  },
});
```

<note to="https://github.com/nuxt-modules/mdc#configurations">

In addition to configuring via `content.markdown`, you can use Markdown Components (MDC) to customize the rendering of Markdown elements with `mdc` property.

</note>

## `build`

Nuxt Content read and parse all the available contents at build time. This option gives you control over parsing contents.

### `markdown`

Configure markdown parser.

#### `toc`

<code-group>

```ts [Default]
toc: {
  depth: 2,
  searchDepth: 2
}
```

```ts [Signature]
type Toc = {
  depth: number;
  searchDepth: number;
};
```

</code-group>

Control behavior of Table of Contents generation.

Value:

- `depth`: Maximum heading depth to include in the table of contents.
- `searchDepth`: Maximum depth of nested tags to search for heading.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
      },
    },
  },
});
```

#### `remarkPlugins`

<code-group>

```ts [Default]
remarkPlugins: {
}
```

```ts [Signature]
type RemarkPlugins = Record<string, false | MarkdownPlugin>;
```

</code-group>

A list of [remark](https://github.com/remarkjs/remark) plugins to use.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        // Object syntax can be used to override default options
        remarkPlugins: {
          // Override remark-emoji options
          "remark-emoji": {
            options: {
              emoticon: true,
            },
          },
          // Disable remark-gfm
          "remark-gfm": false,
          // Add remark-oembed
          "remark-oembed": {
            // Options
          },
        },
      },
    },
  },
});
```

#### `rehypePlugins`

<code-group>

```ts [Default]
rehypePlugins: {
}
```

```ts [Signature]
type RehypePlugins = object;
```

</code-group>

A list of [rehype](https://github.com/remarkjs/remark-rehype) plugins to use.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        // Object syntax can be used to override default options
        rehypePlugins: {
          "rehype-figure": {},
        },
      },
    },
  },
});
```

#### `highlight`

<code-group>

```ts [Default]
highlight: false;
```

```ts [Signature]
type Highlight = false | object;
```

</code-group>

Nuxt Content uses [Shiki](https://github.com/shikijs/shiki) to provide syntax highlighting for [`ProsePre`](/docs/components/prose#prosepre) and [`ProseCode`](/docs/components/prose#prosecode).

<table>
<thead>
  <tr>
    <th>
      Option
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        theme
      </code>
    </td>
    
    <td>
      <code>
        ShikiTheme
      </code>
      
       or <code>
        Record<string, ShikiTheme>
      </code>
    </td>
    
    <td>
      The <a href="https://github.com/shikijs/shiki/blob/main/docs/themes.md" rel="nofollow">
        color theme
      </a>
      
       to use.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        langs
      </code>
    </td>
    
    <td>
      <code>
        ShikiLang[]
      </code>
    </td>
    
    <td>
      The <a href="https://github.com/shikijs/shiki/blob/main/docs/languages.md" rel="nofollow">
        loaded languages
      </a>
      
       available for highlighting.
    </td>
  </tr>
</tbody>
</table>

- `highlight.theme`

Theme can be specified by a single string but also supports an object with multiple themes.

This option is compatible with [Color Mode module](https://color-mode.nuxtjs.org/).

If you are using multiple themes, it's recommended to always have a `default` theme specified.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          theme: "github-light",
          // OR
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
});
```

- `highlight.langs`

By default, the module loads a couple of languages for syntax highlighting:

```ts [Default]
["json", "js", "ts", "html", "css", "vue", "shell", "mdc", "md", "yaml"];
```

If you plan to use code samples of other languages, you need to define the language in these options.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["c", "cpp", "java"],
        },
      },
    },
  },
});
```

If you wish to add highlighting for an unsupported language, you can do so by loading the grammar file for the language.

```ts [nuxt.config.ts]
import { readFileSync } from "node:fs";

export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            // Read more about Shiki languages: https://shiki.style/guide/load-lang
            JSON.parse(
              readFileSync(
                "./shiki/languages/gdscript.tmLanguage.json",
                "utf-8",
              ),
            ),
          ],
        },
      },
    },
  },
});
```

Read more about adding languages in the [Shiki documentation](https://github.com/shikijs/shiki/blob/main/docs/languages.md#adding-grammar).

### `pathMeta`

Content module uses files path to generate the slug, default title and content order, you can customize this behavior with `pathMeta` option.

#### `pathMeta.forceLeadingSlash`

If set to `true`, the path will be prefixed with a leading slash. Default value is `true`.

#### `pathMeta.slugifyOptions`

Content module uses [slugify](https://github.com/simov/slugify) to generate the slug, you can customize the behavior of slugify with this option.

Checkout [slugify options](https://github.com/simov/slugify#options) for more information.

### `transformers`

Nuxt Content has specific transformers for each content type to parse the raw content and prepare it for querying and rendering. Using this option you can define custom transformers to support new content types or improve functionalities of supported content types.

<code-group>

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      transformers: ["~/transformers/title-suffix"],
    },
  },
});
```

```ts [~/transformers/title-suffix.ts]
import { defineTransformer } from "@nuxt/content";

export default defineTransformer({
  name: "title-suffix",
  extensions: [".md"],
  transform(file) {
    return {
      ...file,
      title: file.title + " (suffix)",
    };
  },
});
```

</code-group>

Read more about transformers in the [Transformers](/docs/advanced/transformers) documentation.

## `database`

By default Nuxt Content uses a local SQLite database to store and query content. If you like to use another database or you plan to deploy on Cloudflare Workers, you can modify this option.

Here is the list of supported database adapters:

### `SQLite`

If you want to change the default database location and move it to elsewhere you can use `sqlite` adapter to do so. This is the default value to the `database` option. Depending on your runtime-environment different sqlite adapters will be used (Node: better-sqlite-3, Bun: bun:sqlite).

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: "sqlite",
      filename: "SQLITE_DB_LOCATION",
    },
  },
});
```

### `D1`

If you plan to deploy your application to Cloudflare workers, you need to use the `d1` database adapter. Create a `d1` binding in the Cloudflare dashboard and fill in the `bindingName` field.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: "d1",
      bindingName: "CF_BINDING_NAME",
    },
  },
});
```

### `Postgres`

If you plan to deploy your application using PostgreSQL database you need to use the `postgres` database adapter.

First, make sure to install the `pg` package:

```bash [Terminal]
npx npm i pg
```

Then, configure the `postgres` adapter in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: "postgres",
      url: process.env.POSTGRES_URL,
      /* Other options for `pg` */
    },
  },
});
```

### `LibSQL`

If you plan to deploy your application using a LibSQL database you need to use the `libsql` database adapter.

First, make sure to install the `@libsql/client` package:

```bash [Terminal]
npx npm i @libsql/client
```

Then, configure the `libsql` adapter in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: "libsql",
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },
});
```

<note>

The most popular LibSQL hosting services is [Turso](https://turso.tech/).

</note>

## `renderer`

Configure content renderer.

### `anchorLinks`

<code-group>

```ts [Default]
{ h2: true, h3: true, h4: true }
```

```ts [Signature]
type AnchorLinks =
  | boolean
  | Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", boolean>;
```

</code-group>

Control anchor link generation, by default it generates anchor links for `h2`, `h3` and `h4` heading

Value:

- `false`: will disable link generation.
- `true`: will enable link generation for all headings.

### `alias`

<code-group>

```ts [Default]
alias: {
}
```

```ts [Signature]
type Alias = Record<string, string>;
```

</code-group>

Aliases will be used to replace markdown components and render custom components instead of default ones.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    renderer: {
      alias: {
        p: "MyCustomParagraph",
      },
    },
  },
});
```

## `watch`

```ts [Default]
watch: {
  enabled: true,
  port: 4000,
  showURL: false
}
```

Configure content hot reload in development.

Value:

- `enabled`: Enable/Disable hot reload.
- `port`: Select the port used for the WebSocket server.
- `showURL`: Toggle URL display in dev server boot message.

Nuxt Content uses [listhen](https://github.com/unjs/listhen) to provide a local development server. Check out the [listhen documentation](https://github.com/unjs/listhen#options) for more information.

<callout>

The watcher is a development feature and will not be included in production.

</callout>

<code-group>

```ts [Enabled]
export default defineNuxtConfig({
  content: {
    watch: {
      port: 4000,
      showURL: true,
    },
  },
});
```

```ts [Disabled]
export default defineNuxtConfig({
  content: {
    watch: {
      enabled: false,
    },
  },
});
```

</code-group>

## `preview`

Enable `Preview API`

<prose-note>

This is needed to enable live preview on [Nuxt Studio](/studio).

</prose-note>

Value:

- `dev`: Enable in development mode
- `api`: Activate the preview mode and set the `API` to be linked with.

```ts [Enable Studio]
preview: {
  api: 'https://api.nuxt.studio',
}
```

## `experimental`

Experimental features that are not yet stable.

### `experimental.nativeSqlite`

As of Node.js v22.5.0, the `node:sqlite` module is available natively in Node.js.
This allows Nuxt Content to use SQLite as a database without the need for an external package.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    experimental: { nativeSqlite: true },
  },
});
```

<prose-note>

This feature is only available in Node.js v22.5.0 and above. Enabling this feature in older version will not do anything.

</prose-note>

### Define a Collection

```ts [content.config.ts]
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.string(),
      }),
    }),
  },
});
```

<note to="/docs/collections/types#page-type">

Learn more about the `page` collection type.

</note>

### Create `.md` files

Create blog posts in `content/blog/` directory.

<code-group>

```md [foo.md]
---
date: 2020-11-11
---

# Foo

This is Foo blog post.
```

```md [bar.md]
---
date: 2024-12-12
---

Hello
I am bar. Nice to meet you.
```

</code-group>

### Query Markdown Files

Now we can query blog posts:

```ts
// Get the foo post
const fooPost = await queryCollection("blog").path("/blog/foo").first();

// Find all posts
const allPosts = await queryCollection("blog").order("date", "DESC").all();
```

### Display Markdown

To display the content of a markdown file, you can use the [`<ContentRenderer>`](/docs/components/content-renderer) component.

```vue [blog/[slug].vue]
<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>
```

<note>

Read more about the [`<ContentRenderer>`](/docs/components/content-renderer) component and [`Prose Components`](/docs/components/prose).

</note>

## Frontmatter

Frontmatter is a convention of Markdown-based CMS to provide meta-data to pages, like description or title. In Nuxt Content, the frontmatter uses the YAML syntax with `key: value` pairs.

These data are available when rendering the content and can store any information that you would need.

### Syntax

You can declare a frontmatter block at the top of the Markdown files in the `content/` directory with the `---` identifier.

```md [content/index.md]
---
title: "Title of the page"
description: "meta description of the page"
---

<!-- Content of the page -->
```

```ts [example.ts]
const home = await queryCollection("content").path("/").first();

console.log(home.title);
// => 'Title of the page'
console.log(home.description);
// => 'meta description of the page'
console.log(home.body);
// => AST object of the page content
```

### Native parameters

<table>
<thead>
  <tr>
    <th>
      
    </th>
    
    <th>
      
    </th>
    
    <th>
      
    </th>
    
    <th>
      
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Key
    </td>
    
    <td>
      Type
    </td>
    
    <td>
      Default
    </td>
    
    <td>
      Description
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        title
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      First <code>
        <h1>
      </code>
      
       of the page
    </td>
    
    <td>
      Title of the page, will also be injected in metas
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      First <code>
        <p>
      </code>
      
       of the page
    </td>
    
    <td>
      Description of the page, will be shown below the title and injected into the metas
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        navigation
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Define if the page is included in <a href="/docs/utils/query-collection-navigation">
        <code>
          queryCollectionNavigation
        </code>
      </a>
      
       return value.
    </td>
  </tr>
</tbody>
</table>

<warning>

Additional parameters that you have defined in your frontmatter block need to be defined in your schema (see the date parameter in the example at top of this page) to be able to use them for querying.

</warning>

## MDC Syntax

We created the MDC syntax to supercharge Markdown and give you the ability to integrate Vue components with slots and props inside your Markdown.

<callout icon="i-simple-icons-visualstudiocode" to="https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc">

Install the **MDC VS Code extension** to get proper syntax highlighting for the MDC syntax.

</callout>

### Vue Components

You can use any Vue component in your Markdown files.

We have a special syntax to make it easier to use components in your Markdown files.

```mdc [content/index.md]
::component-name
Default slot content
::
```

<warning>

Components that are used in Markdown has to be marked as `global` in your Nuxt app if you don't use the `components/content/` directory, visit [Nuxt 3 docs](https://nuxt.com/docs/guide/directory-structure/components) to learn more about it.

</warning>

#### Block Components

Block components are components that accept Markdown content or another component as a slot.

The component must contain at least one `<slot />` component to accept formatted text.

In a markdown file, use the component with the `::` identifier.

<code-group>

```mdc [index.md]
::card
The content of the card
::
```

```html [Card.vue]
<!-- components/content/Card.vue -->
<template>
  <div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <slot />
  </div>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-card>

The content of the card

</example-card>
</code-preview>
</code-group>

#### Slots

A component's slots can accept content or another components.

- **Default slot** renders the top-level content inside the block component or with `#default`
- **Named slots** use the `#` identifier to render the corresponding content.

<code-group>

```mdc [index.md]
::hero
My Page Title

#description
This will be rendered inside the `description` slot.
::
```

```html [Hero.vue]
<template>
  <section>
    <h1 class="text-4xl">
      <slot mdc-unwrap="p" />
    </h1>
    <slot name="description" />
  </section>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-hero>

My Page Title

<template v-slot:description="">

This will be rendered inside the `description` slot.

</template>
</example-hero>
</code-preview>
</code-group>

<note>

Read more about the [`<slot />`](/docs/components/slot) component.

</note>

<tip>

You can use Markdown inside your components slots:

<code-group>

```mdc [index.md]
::my-title
A [rich text](/) will be **rendered** by the component.
::
```

```html [MyTitle.vue]
<template>
  <h1 class="text-4xl">
    <slot mdc-unwrap="p" />
  </h1>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-title>

A [rich text](/) will be **rendered** by the component.

</example-title>
</code-preview>
</code-group>
</tip>

#### Props

There are two ways to pass props to components using MDC.

##### **Inline method**

The `{}` identifier passes props to components in a terse way by using a `key=value` syntax.

<code-group>

```mdc [index.md]
::alert{type="warning"}
The **alert** component.
::
```

```vue [Alert.vue]
<script setup>
const props = defineProps({ type: { type: String } });

const alertClass = computed(() => {
  return {
    warning:
      "bg-orange-100 border-orange-200 dark:bg-orange-900 dark:border-orange-800",
    info: "bg-blue-100 border-blue-200 dark:bg-blue-900 dark:border-blue-800",
    success:
      "bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-800",
  }[props.type];
});
</script>

<template>
  <div
    class="text-black p-2 border dark:text-white rounded"
    :class="alertClass"
  >
    <slot mdc-unwrap="p" />
  </div>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-alert type="warning">

The **alert** component.

</example-alert>
</code-preview>
</code-group>

Multiple props can be separated with a space:

```mdc
::alert{type="warning" icon="exclamation-circle"}
Oops! An error occurred
::
```

The `v-bind` shorthand `:` can be also be used to bind a prop to a value in the frontmatter.

```mdc
---
type: "warning"
---

::alert{:type="type"}
Your warning
::
```

If you want to pass arrays or objects as props to components you can pass them as JSON string and prefix the prop key with a colon to automatically decode the JSON string. Note that in this case you should use single quotes for the value string so you can use double quotes to pass a valid JSON string:

<code-group>

```mdc [array.md]
::dropdown{:items='["Nuxt", "Vue", "React"]'}
::
```

```mdc [number-array.md]
::dropdown{:items='[1,2,3.5]'}
::
```

```mdc [object.md]
::chart{:options='{"responsive": true, "scales": {"y": {"beginAtZero": true}}}'}
::
```

</code-group>

##### **YAML method**

The YAML method uses the `---` identifier to declare one prop per line, that can be useful for readability.

<code-group>

```mdc [index.md]
::icon-card
---
icon: IconNuxt
description: Harness the full power of Nuxt and the Nuxt ecosystem.
title: Nuxt Architecture.
---
::
```

```html [IconCard.vue]
<script setup>
  defineProps({
    title: {
      type: String,
      default: "Default title",
    },
    description: {
      type: String,
      default: "Default description",
    },
    icon: {
      type: String,
      default: "IconMarkdown",
    },
  });
</script>

<template>
  <div class="p-6 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <component :is="icon" class="w-20 h-20" />
    <h2 class="text-3xl font-semibold mb-2">{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-icon-card description="Harness the full power of Nuxt and the Nuxt ecosystem." icon="i-simple-icons-nuxtdotjs" title="Nuxt Architecture.">

</example-icon-card>
</code-preview>
</code-group>

### Attributes

Attributes are useful for highlighting and modifying part of paragraph. The syntax is nearly similar to inline components and markdown links syntax.

Possible values are all named attributes, classes with the notation `.class-name` and an ID with `#id-name`.

<code-group>

```mdc [index.md]
Hello [World]{style="color: green;" .custom-class #custom-id}!
```

<code-preview label="Preview" icon="i-lucide-eye">

Hello <span className="custom-class" id="custom-id" style="color: green;">

World

</span>

!

</code-preview>
</code-group>

In addition to mdc components and `span`, attribute syntax will work on images, links, inline `code`, **bold** and _italic_ text.

<code-group>

```md [index.md]
Attributes work on:

- [link](#attributes){style="background-color: green;"}, `code`{style="color: cyan;"},
- _italic_{style="background-color: yellow; color:black;"} and **bold**{style="background-color: lightgreen;"} texts.
```

<code-preview label="Preview" :prose="true" prose="">

Attributes work on:

- [link](#attributes), `code`,
- _italic_ and **bold** texts.

</code-preview>
</code-group>

### Binding Data

You can bind data within your Markdown document using the `{{ $doc.variable || 'defaultValue' }}` syntax. These values can be defined in the YAML frontmatter at the top of the document, within each MDC component, or injected using the `data` prop of the `<ContentRenderer>` component.

#### Define in YAML

```mdc
---
title: 'Title of the page'
description: 'meta description of the page'
customVariable: 'Custom Value'
---

# The Title is {{ $doc.title }} and customVariable is {{ $doc.customVariable || 'defaultValue' }}
```

#### Define in external with `<ContentRenderer>`

```html [test.vue]
<template>
  <div>
    <ContentRenderer :value="data" :data="mdcVars" />
    <button type="button" v-on:click="mdcVars.name = 'Hugo'">
      Change name
    </button>
  </div>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData(() =>
    queryCollection("content").path("/test").first(),
  );
  const mdcVars = ref({ name: "Maxime" });
</script>
```

```mdc [test.md]
# Hello {{ $doc.name || 'World' }}
```

## Prose Components

In Nuxt Content, the prose represents HTML tags generated by the Markdown syntax, such as heading levels and links.

For each HTML tag, a Vue component is used, allowing you to override them if needed, for example `<p>` becomes `<ProseP>`.

If you want to customize a Prose component, here are the recommended steps:

- Check out the original [component sources](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose).
- Use the exact same props.
- In your `components/content/` directory, give it the same name.
- Make it yours 🚀.

<note to="/docs/components/prose">

Read the complete Prose reference in the Prose Components section.

</note>

## Code Highlighting

Nuxt Content uses [Shiki](https://github.com/shikijs/shiki), which colors tokens with VSCode themes.

Code highlighting works both on [`ProsePre`](/docs/components/prose#prosepre) and [`ProseCode`](/docs/components/prose#prosecodeinline).

Each line of a code block gets its line number in the `line` attribute so lines can be labeled or individually styled.

<callout>

[Read the API reference to configure or entirely disable syntax highlighting.](/docs/getting-started/configuration)

</callout>

## Images

You can add images to your `public` directory:

```bash [Directory structure]
content/
  index.md
public/
  image.png
nuxt.config.ts
package.json
```

And then use them in your markdown files in the `content` directory as such:

```md [content/index.md]
![my image](/image.png)
```

## Excerpt

Content excerpt or summary can be extracted from the content using `<!--more-->` as a divider.

```md [content/index.md]
---
title: Introduction
---

Learn how to use `@nuxt/content`.

<!--more-->

Full amount of content beyond the more divider.
```

Description property will contain the excerpt content unless defined within the frontmatter props.

If there is no `<!--more-->` divider in the text then excerpt is undefined.

<tip>

You should define the `excerpt` field in the collection schema if you want to use the excerpt feature.

```ts [content.config.ts]
const content = defineCollection({
  type: "page",
  source: "**",
  schema: z.object({
    excerpt: z.object({
      type: z.string(),
      children: z.any(),
    }),
  }),
});
```

Read more about the [collection schema](/docs/collections/define#collection-schema).

</tip>

Example variables will be injected into the document:

```json
{
  "excerpt": Object
  "body": Object
  // ... other keys
}
```

# Define Content Collections

> Learn how to define and configure content collections in your Nuxt application.

The Nuxt Content module automatically parses any content files within the `content/` directory located at the root of your Nuxt application. This setup allows you to freely structure the folder to suit your project's needs.

For better organization, consider using Content Collections, which let you categorize and manage content more effectively. These collections are defined in a `content.config.ts` file.

<warning>

If no `content.config.ts` file is present, all files within the content folder are parsed and imported by default. However, once a config file is added, only files matching the specified path patterns defined in collections will be imported.

</warning>

## What are Content Collections?

Content Collections organize related items within your Nuxt Content project. They provide a structured way to manage your content, making it easier to query, display, and maintain your site's data.

Key features include:

- **Logical Grouping**: Group similar content together, such as blog posts, product pages, or documentation articles
- **Shared Configuration**: Apply common settings and validations across all items within a collection
- **Improved Querying**: Fetch and filter related content items efficiently
- **Automatic Type Inference**: Get type safety and autocompletion in your development environment
- **Flexible Structure**: Organize collections by content type, category, or any other logical grouping that suits your needs

## Defining Collections

Create a `content.config.ts` file in your project's root directory. This special file configures your collections database, utility types, and content handling.

Here's a basic example:

```ts [content.config.ts]
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      // Load every file inside the `content` directory
      source: "**",
      // Specify the type of content in this collection
      type: "page",
    }),
  },
});
```

<warning>

Currently, a document is designed to be present in only one collection at a time. If a file is referenced in multiple collections, live reload will not work correctly. To avoid this, it is recommended to use the `exclude` attribute to explicitly exclude a document from other collections using appropriate regex patterns.

This topic is still under discussion in this issue: [nuxt/content#2966](https://github.com/nuxt/content/issues/2966).

</warning>

### Collection Schema

Schemas enforce data consistency within a collection and serve as the source of truth for TypeScript types.

On top of the built-in fields, you can define a schema by adding the `schema` property to your collection by using a [`zod`](https://zod.dev) schema:

```ts [content.config.ts]
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      // Define custom schema for docs collection
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),
  },
});
```

<note>

`@nuxt/content` exposes a `z` object that contains a set of Zod schemas for common data types. Check [Zod’s README](https://github.com/colinhacks/zod) for complete documentation on how Zod works and what features are available.

</note>

<tip>

You can define as many collections as you want to organize different types of content.

</tip>

## Querying Collections

Use the [`queryCollection`](/docs/utils/query-collection) util to fetch one or all items from a collection:

```vue [pages/blog.vue]
<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () =>
  queryCollection("blog").all(),
);
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

<note to="/docs/utils/query-collection">

Learn more about the available query options in our `queryCollections` API documentation.

</note>

## defineCollection()

The `defineCollection` function defines a collection in your content configuration. Here's its TypeScript signature:

```ts
function defineCollection(collection: Collection): DefinedCollection;

type Collection = {
  // Determines how content is processed
  type: "page" | "data";
  // Specifies content location
  source?: string | CollectionSource;
  // Zod schema for content validation and typing
  schema?: ZodObject<T>;
};
```

<note to="/docs/collections/types">

Learn more about collection types.

</note>

```ts
type CollectionSource = {
  // Glob pattern for content matching
  include: string;
  // .path prefix (only applies to 'page' type)
  prefix?: string;
  // Glob patterns to exclude content
  exclude?: string[];
  // Root directory for content matching
  cwd?: string;
  // Remote git repository URL (e.g., https://github.com/nuxt/content)
  repository?: string;
  // Authentication token for private repositories (e.g., GitHub personal access token)
  authToken?: string;
};
```

<note to="/docs/collections/sources">

Learn more about collection sources.

</note>

The function returns the defined collection object.

# Collection Types

> Learn about the two types of collections you can define in Nuxt Content.

In Nuxt Content, you can specify a type for each collection, depending on the intended purpose of the collection files. Collections can be defined as either **page** or **data** types.

For both types, built-in fields are generated. Every collection includes these default fields:

- `id`: Unique content identifier
- `stem`: File path without extension (used for sorting and location)
- `extension`: File extension
- `meta`: Custom fields not defined in the collection schema

## Page type

```ts
defineCollection({
  source: "**/*.md",
  type: "page",
});
```

<tip>

Use the **page** type if there is a 1-to-1 relationship between content files and pages on your site.

</tip>

### Path generation

Nuxt Content will automatically generate a path for each file in the collection, making it easy to create URL mappings.

Here are examples of generated paths based on file structure:

<table>
<thead>
  <tr>
    <th>
      
    </th>
    
    <th>
      
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      
    </td>
    
    <td>
      
    </td>
  </tr>
  
  <tr>
    <td>
      File
    </td>
    
    <td>
      Path
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/index.md
      </code>
    </td>
    
    <td>
      <code>
        /
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/about.md
      </code>
    </td>
    
    <td>
      <code>
        /about
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/blog/index.md
      </code>
    </td>
    
    <td>
      <code>
        /blog
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/blog/hello.md
      </code>
    </td>
    
    <td>
      <code>
        /blog/hello
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/1.guide/2.installation
      </code>
    </td>
    
    <td>
      <code>
        /guide/installation
      </code>
    </td>
  </tr>
</tbody>
</table>

<note>

You can use the helper [`queryCollection('COLLECTION').path('PATH')`](/docs/utils/query-collection) to retrieve content by a specific path.

</note>

### Schema Overrides

When you use the **page** type, Nuxt Content generates several standard fields that are commonly used for web pages. These fields provide structure and are **automatically** applied to the collection’s schema:

- `path`: Generated route path
- `title`: Page title
- `description`: Page description
- `seo`: SEO metadata (to be used with Nuxt's `useSeoMeta` composable)
- `body`: Page content parsed as AST
- `navigation`: Page navigation configuration (for [queryCollectionNavigation](/docs/utils/query-collection-navigation))

Here is the corresponding schema applied:

```ts
path: z.string(),
  title: z.string(),
  description: z.string(),
  seo: z.intersection(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      meta: z.array(z.record(z.string(), z.any())).optional(),
      link: z.array(z.record(z.string(), z.any())).optional(),
    }),
    z.record(z.string(), z.any()),
  ).optional().default({}),
  body: z.object({
    type: z.string(),
    children: z.any(),
    toc: z.any(),
  }),
  navigation: z.union([
    z.boolean(),
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ]).default(true),
```

<note>

You can override any of these fields by defining them in the collection’s schema.

</note>

## Data type

```ts
defineCollection({
  source: "authors/**.yml",
  type: "data",
});
```

The data type is useful for content that doesn't directly correspond to a webpage but instead represents structured data you might want to query and display within your application.

With data collections, you have complete control over the schema, allowing you to define custom structures.

<note>

There's no strict relationship between collection type and file extension. For instance, a **page** collection can use [Markdown](/docs/files/markdown) or [YAML](/docs/files/yaml) or [JSON](/docs/files/json) files, and **data** collections can use any of these formats as well.

</note>

## Ordering Files

For both types, you may want to control the display order in lists. Use numeric prefixes in file and directory names to specify an order. Nuxt Content will use these numbers when ordering content lists.

<note>

Nuxt Content uses alphabetical order for sorting, so if you want to use numerical order, you need to prefix single digit numbers with `0`. For example, without the `0` prefix, `10.foo.md` would come before `2.bar.md`.

</note>

```text [Directory structure]
content/
  1.frameworks/
    1.vue.md
    2.nuxt.md
    ...
  2.examples/
    01.nuxthub.md
    02.vercel.md
    03.netlify.md
    04.heroku.md
    ...
    10.cloudflare.md
    index.md
```

<warning>

Separate number from file name using `.` character. Using any other separator will not work.

</warning>

# Collection Sources

> Learn how to import your files in Nuxt Content collections.

Nuxt Content provides several ways to import content files into your collection. You can configure the source by using the `source` property within `defineCollection`:

```ts [content.config.ts]
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: "**",
      type: "page",
    }),
  },
});
```

## `source`

The `source` property can be defined as either a string (following a glob pattern) or an object, allowing more detailed source configuration for your target directory and files within the content folder.

**Example:**

- `source: '**'` includes all files within the content directory and its subdirectories.
- `source: '**/*.md'`includes all `Markdown` files within the content directory and its subdirectories.
- `source: 'docs/**/*.yml'` includes all `YML` files within the `content/docs` and its subdirectories.
- `source: '**/*.{json,yml}'` includes `JSON` or `YML` file within the content directory and all its subdirectories.
- `source: '*.json'` includes only `JSON` files located directly within the content directory, excluding any subdirectories.

### `include` (required)

Glob pattern of your target repository and files in the content folder.

### `exclude`

Glob patterns to exclude content from the import.

### `prefix`

This configuration only applied for **page** type with 1-to-1 relationship between content files and pages on your site.

It represents the path prefix (base URL) of the corresponding page on the website.

<prose-warning>

The `prefix` must start by a leading `/`.

</prose-warning>

By default, module extracts the static prefix of `source`(or `source.include`) and uses it as a prefix for content paths. For example, if you define `/en/**` source, module will auto-fill the `prefix` with `/en`. You can manually provide a prefix to override this behavior. The prefix can be removed by setting `prefix: '/'` in the collection source.

```ts
defineCollection({
  type: "page",
  source: {
    include: "en/**",
    exclude: ["en/index.md"],
    prefix: "/",
  },
});
```

### `cwd`

Root directory for content matching.

**Example:**

If you want to include files from a folder outside the content directory, set the absolute path of that folder to the `cwd` property.

```ts
source: {
  cwd: path.resolve('packages/my-pkg/docs'),
  include: '**/*.md',
}
```

### `repository`

External source representing a remote git repository URL (e.g., [https://github.com/nuxt/content](https://github.com/nuxt/content)).

When defining an external source you must also define the `include` option.
`include` pattern is essential for the module to know which files to use for the collection.

```js
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: "page",
      source: {
        repository: "https://github.com/nuxt/content",
        include: "docs/content/**",
      },
    }),
  },
});
```

### `authToken`

Authentication token for private repositories (e.g., GitHub personal access token).

<warning icon="i-lucide-shield-alert">

Never commit authentication tokens or credentials directly in your code. Use environment variables or other secure methods to provide these values at runtime.

</warning>

### `authBasic`

Basic authentication for private repositories (e.g., Bitbucket username and password).

```ts
defineCollection({
  type: "page",
  source: {
    repository: "https://bitbucket.org/username/repo",
    authBasic: {
      username: "username",
      password: "password",
    },
  },
});
```

# queryCollection

> The queryCollection composable provides methods for querying and fetching your collections.

## Usage

Use the auto-imported `queryCollection` to find contents inside a collection. Here we assume that you have defined `docs` collection inside `content.config.ts`.

If you have not defined any collection, check [How to define a collection](/docs/collections/define#defining-collections).

```vue [pages/[...slug].vue]
<script>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("docs").path(route.path).first();
});
</script>
```

<tip>

The `queryCollection` utility is available in both Vue and Nitro. Checkout [Server Usage](#server-usage) for more details on how to use it on the server side.

</tip>

## API

### Type

```ts
function queryCollection<T extends keyof Collections>(
  collection: T,
): CollectionQueryBuilder<Collections[T]>;

interface CollectionQueryBuilder<T> {
  where(
    field: keyof T | string,
    operator: SQLOperator,
    value?: unknown,
  ): CollectionQueryBuilder<T>;
  andWhere(groupFactory: QueryGroupFunction<T>): CollectionQueryBuilder<T>;
  orWhere(groupFactory: QueryGroupFunction<T>): CollectionQueryBuilder<T>;
  order(field: keyof T, direction: "ASC" | "DESC"): CollectionQueryBuilder<T>;
  // ... other methods
}
```

### `queryCollection(collection: CollectionName)`

Create a query builder to search in the specific collection.

- Parameter:
  - `collection`: The key of defined collection in `content.config.ts`

### `path(path: string)`

Search for contents that have specific `path`. (`path` is an special field in `page` collections which generates based on fs path and can be use as route to render the content)

- Parameter:
  - `path`: The path string to match.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs").path(route.path).first();
});
```

### `select(...fields: keyof Collection)`

Select specific fields from the collection to be returned in the query result.

- Parameters:
  - `...fields`: A list of field names to select from the collection.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs").select("path", "title", "description").first();
});
```

### `where(field: keyof Collection | string, operator: SqlOperator, value?: unknown)`

Add a condition to the query to filter results based on a specific field.

- Parameters:
  - `field`: The field to filter on
  - `operator`: The SQL operator to use for comparison. Possible values include:
    - `'='`: Equal to
    - `'>'`: Greater than
    - `'<'`: Less than
    - `'<>'`: Not equal to
    - `'IN'`: In a list of values
    - `'BETWEEN'`: Between two values
    - `'NOT BETWEEN'`: Not between two values
    - `'IS NULL'`: Is null
    - `'IS NOT NULL'`: Is not null
    - `'LIKE'`: Matches a pattern
    - `'NOT LIKE'`: Does not match a pattern

  - `value`: The value to compare against. The type depends on the operator used.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs")
    .where("date", "<", "2024-04-04")
    .where("category", "=", "news")
    .all();
});

// Generated SQL
// SELECT * FROM docs WHERE date < '2024-04-04' AND category = 'news'
```

### `andWhere(groupFactory: QueryGroupFunction<Collection>)`

Add an AND condition group to the query. This allows for more complex query conditions.

- Parameter:
  - `groupFactory`: A function that receives a query builder and can add multiple conditions that will be grouped together with AND

```ts
const { data } = await useAsyncData("recent-docs", () => {
  return queryCollection("docs")
    .where("published", "=", true)
    .andWhere((query) =>
      query.where("date", ">", "2024-01-01").where("category", "=", "news"),
    )
    .all();
});

// Generated SQL
// SELECT * FROM docs WHERE published = true AND (date > '2024-01-01' AND category = 'news')
```

### `orWhere(groupFactory: QueryGroupFunction<Collection>)`

Add an OR condition group to the query. This allows for alternative conditions.

- Parameter:
  - `groupFactory`: A function that receives a query builder and can add multiple conditions that will be grouped together with OR

```ts
const { data } = await useAsyncData("featured-docs", () => {
  return queryCollection("docs")
    .where("published", "=", true)
    .orWhere((query) =>
      query.where("featured", "=", true).where("priority", ">", 5),
    )
    .all();
});

// Generated SQL
// SELECT * FROM docs WHERE published = true AND (featured = true OR priority > 5)
```

### `order(field: keyof Collection, direction: 'ASC' | 'DESC')`

Order the query results based on a specific field.

- Parameters:
  - `field`: The field to order by.
  - `direction`: The direction of ordering, either 'ASC' for ascending or 'DESC' for descending.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs").order("date", "DESC").all();
});
```

### `limit(limit: number)`

Limit the number of results returned by the query.

- Parameter:
  - `limit`: The maximum number of results to return.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs").limit(10).all();
});
```

### `skip(skip: number)`

Skip a specified number of results in the query.

- Parameter:
  - `skip`: The number of results to skip.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return (
    queryCollection("docs")
      // Skip first 5 items
      .skip(5)
      .all()
  );
});
```

### `all()`

Execute the query and return all matching results.

- Returns: A Promise that resolves to an array of all matching documents.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs").all();
});
```

### `first()`

Execute the query and return the first matching result.

- Returns: A Promise that resolves to the first matching document, or `null` if no documents match.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection("docs").first();
});
```

### `count()`

Count the number of matched collection entries based on the query.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return (
    queryCollection("docs")
      // Count matches
      .count()
  );
});

// Returns
5; // number of matches
```

You can also use `count()` with other methods defined above such as `where()` in order to apply additional conditions within the collection query.

```ts
const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return (
    queryCollection("docs")
      .where("date", "<", "2024-04-04")
      // Count matches
      .count()
  );
});

// Returns
3; // number of matches for the provided query
```

## Examples

Here is a complete example of how to fetch a list of documents in the `docs` collections.

```vue [index.vue]
<script setup lang="ts">
const { data: docs } = await useAsyncData("documents-list", () => {
  return queryCollection("docs")
    .order("date", "DESC")
    .select("title", "path", "description")
    .all();
});
</script>

<template>
  <NuxtLink v-for="doc in docs" :key="doc.path" :to="doc.path">
    <h2>{{ doc.title }}</h2>
    <p>{{ doc.description }}</p>
  </NuxtLink>
</template>
```

## Server Usage

Nuxt Content provides a similar utility to query collections on the server side. The only difference is that you need to pass `event` as the first argument to the `queryCollection` function.

```ts [server/api/[slug].ts]
export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event);
  const page = await queryCollection(event, "docs").path(slug).first();
  return page;
});
```

<note>

Make sure to create `server/tsconfig.json` file with the following content to avoid type error.

```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
```

</note>

# queryCollectionNavigation

> The queryCollectionNavigation composable generates the navigation tree of given collection.

## Type

```ts
function queryCollectionNavigation<T extends keyof PageCollections>(
  collection: T,
  fields?: Array<keyof PageCollections[T]>,
): ChainablePromise<T, ContentNavigationItem[]>;

interface ChainablePromise<T extends keyof PageCollections, R>
  extends Promise<R> {
  where(
    field: keyof PageCollections[T] | string,
    operator: SQLOperator,
    value?: unknown,
  ): ChainablePromise<T, R>;
  andWhere(
    groupFactory: QueryGroupFunction<PageCollections[T]>,
  ): ChainablePromise<T, R>;
  orWhere(
    groupFactory: QueryGroupFunction<PageCollections[T]>,
  ): ChainablePromise<T, R>;
  order(
    field: keyof PageCollections[T],
    direction: "ASC" | "DESC",
  ): ChainablePromise<T, R>;
}
```

## Usage

Use the auto-imported `queryCollectionNavigation` to generate a navigation tree for a specific collection. This is particularly useful for creating dynamic navigation menus or sidebars based on your content structure.

The function returns a chainable promise that allows you to add additional query conditions:

```vue [pages/[...slug].vue]
<script setup lang="ts">
const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("docs")
    .where("published", "=", true)
    .order("date", "DESC");
});
</script>
```

<tip>

The `queryCollectionNavigation` utility is available in both Vue and Nitro. Checkout [Server Usage](#server-usage) for more details on how to use it on the server side.

</tip>

### Navigation metadata with `.navigation.yml`

You can add metadata to a directory using a `.navigation.yml` file.

```yml [.navigation.yml]
title: Getting Started
icon: i-lucide-square-play
```

## API

### `queryCollectionNavigation(collection: CollectionName, extraField: keyof Collection)`

Generate a navigation tree for the specified collection.

- Parameters:
  - `collection`: The key of the defined collection in `content.config.ts`.
  - `extraFields`: (Optional) An array of additional fields to include in the navigation items. (By default `title` and `path` are included in the navigation items.)

- Returns: A chainable promise that resolves to a navigation tree structure. The promise includes methods for adding query conditions:
  - `where(field, operator, value)`: Add a WHERE condition
  - `andWhere(groupFactory)`: Add a grouped AND condition
  - `orWhere(groupFactory)`: Add a grouped OR condition
  - `order(field, direction)`: Add an ORDER BY clause

The navigation tree is generated based on the directory structure and ordering happens based on files [ordering](/docs/collections/types#ordering-files)

## Examples

Basic usage without additional query conditions:

```vue [pages/[...slug].vue]
<script setup lang="ts">
const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("docs");
});
</script>

<template>
  <nav>
    <ul v-if="data">
      <li v-for="item in data" :key="item.path">
        <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
```

Example with additional query conditions and extra fields:

```vue [pages/[...slug].vue]
<script setup lang="ts">
const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("docs", ["description", "badge"])
    .where("draft", "=", false)
    .where("partial", "=", false)
    .order("title", "ASC");
});
</script>

<template>
  <nav>
    <ul v-if="data">
      <li v-for="item in data" :key="item.path">
        <NuxtLink :to="item.path">
          {{ item.title }}
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </NuxtLink>
        <p v-if="item.description">{{ item.description }}</p>
      </li>
    </ul>
  </nav>
</template>
```

## Server Usage

Nuxt Content provides a similar utility to query collections on the server side. The only difference is that you need to pass `event` as the first argument to the `queryCollectionNavigation` function.

```ts [server/api/navigation.ts]
export default eventHandler(async (event) => {
  const navigation = await queryCollectionNavigation(event, "docs");
  return navigation;
});
```

<note>

Make sure to create `server/tsconfig.json` file with the following content to avoid type error.

```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
```

</note>

---

## Extra utilities to work with navigation

Content module provides some extra utilities to simplify common use cases like building breadcrumb navigation.

### `findPageHeadline(navigation, path, options?)`

Returns the headline (name of the parent folder) for a given path within a navigation tree. Useful for displaying section titles or contextual navigation headers.

- `navigation`: The navigation tree (array of ContentNavigationItem).
- `path`: The current page path.
- `options` (optional):
  - `indexAsChild`: Treat index pages as children.

**Example:**

```ts
import { findPageHeadline } from "@nuxt/content/utils";

const headline = findPageHeadline(navigation, "/docs/guide/getting-started");
// headline is a string that contains the name of the parent folder
```

### `findPageBreadcrumb(navigation, path, options?)`

Returns the breadcrumb trail (array of navigation items) for a given path within a navigation tree. Useful for building breadcrumb navigation components.

- `navigation`: The navigation tree (array of ContentNavigationItem).
- `path`: The current page path.
- `options` (optional):
  - `current`: Include the current page in the breadcrumb.
  - `indexAsChild`: Treat index pages as children.

**Example:**

```ts
import { findPageBreadcrumb } from "@nuxt/content/utils";

const breadcrumb = findPageBreadcrumb(
  navigation,
  "/docs/guide/getting-started",
);
// breadcrumb is an array of navigation items leading to the current page
```

### `findPageChildren(navigation, path, options?)`

Finds and returns the direct children of a given path in the navigation tree.

- `navigation`: The navigation tree (array of ContentNavigationItem).
- `path`: The parent path to find children for.
- `options` (optional):
  - `indexAsChild`: Treat index pages as children.

**Example:**

```ts
import { findPageChildren } from "@nuxt/content/utils";

const children = findPageChildren(navigation, "/docs/guide");
// children is an array of navigation items under '/docs/guide'
```

### `findPageSiblings(navigation, path, options?)`

Returns the sibling navigation items for a given path (i.e., other items with the same parent).

- `navigation`: The navigation tree (array of ContentNavigationItem).
- `path`: The current page path.
- `options` (optional):
  - `indexAsChild`: Treat index pages as children.

**Example:**

```ts
import { findPageSiblings } from "@nuxt/content/utils";

const siblings = findPageSiblings(navigation, "/docs/guide/getting-started");
// siblings is an array of navigation items that share the same parent as the current page
```

# ContentRenderer

> Takes your component from an AST to a wonderful template.

The `<ContentRenderer>` component renders a document coming from a query with [`queryCollection()`](/docs/utils/query-collection).

<note>

This component **only works** with `Markdown` files.

</note>

## Props

<table>
<thead>
  <tr>
    <th>
      Prop
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        value
      </code>
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      <code>
        ParsedContent
      </code>
    </td>
    
    <td>
      The document to render.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tag
      </code>
    </td>
    
    <td>
      <code>
        'div'
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The tag to use for the renderer element if it is used.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        excerpt
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether to render the excerpt only without the rest of the content.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        components
      </code>
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      The map of custom components to use for rendering. This prop will pass to the markdown renderer and will not affect other file types.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        data
      </code>
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
      
       (required)
    </td>
    
    <td>
      A map of variables to inject into the markdown content for later use in binding variables.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prose
      </code>
    </td>
    
    <td>
      <code>
        undefined
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether or not to render Prose components instead of HTML tags.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        class
      </code>
    </td>
    
    <td>
      <code>
        undefined
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       or <code>
        object
      </code>
    </td>
    
    <td>
      Root tag to use for rendering.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unwrap
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
      
       or <code>
        string
      </code>
    </td>
    
    <td>
      Tags to unwrap separated by spaces. Example: <code>
        'ul li'
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

## Example Usage

```vue [pages/[...slug].vue]
<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("docs").path(route.path).first();
});
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
```

## Handling Missing Pages

If the queried content is **missing**, you can display a **custom fallback message**.

```vue [pages/[...slug].vue]
<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("docs").path(route.path).first();
});
</script>

<template>
  <template v-if="page">
    <ContentRenderer :value="page" />
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
```

## Handling Empty Pages

If the queried content is **empty**, you can display a **custom fallback message**.

# Slot

> The fastest way to inject Markdown into your Vue components.

When you write contents and paragraphs inside a component with the MDC syntax, you can use Vue's `<slot>` component to render the content.

## Usage

If you don't want to modify the rendered content, simply use Vue's `<slot>` component.

```vue [components/content/Callout.vue]
<template>
  <div class="callout">
    <slot />
  </div>
</template>
```

Now let's use it in Markdown:

```mdc [content/index.md]
::callout
This is a callout.
::
```

The rendered HTML will be:

```html
<div class="callout">
  <p>This is a callout.</p>
</div>
```

This usage would be similar to using the native `<slot>` component.

### Unwrapping

The `mdc-unwrap` prop allows you to remove one or multiple wrapping elements from the rendered content. This is useful when you want to extract the content nested in native Markdown syntax. Each specified tag will get removed from AST.

Let's unwrap the `<p>` element from the previous example:

```vue [components/content/Callout.vue]
<template>
  <div class="callout">
    <slot mdc-unwrap="p" />
  </div>
</template>
```

Now the rendered HTML will be:

```html
<div class="callout">This is a callout.</div>
```

### Named Slots

The `name` prop allows you to bind a slot by its name. This is useful when you want to render a slot that is not the default one.

Let's improve our `Callout` component to have a `title` slot:

```vue [components/content/Callout.vue]
<template>
  <div class="callout">
    <h2 v-if="$slots.title">
      <slot name="title" mdc-unwrap="p" />
    </h2>
    <slot />
  </div>
</template>
```

Now let's use it in Markdown:

```mdc [content/index.md]
::callout
#title
Please be careful!
#default
Using MDC & Vue components is addictive.
::
```

This will result into:

```html
<div class="callout">
  <h2>Please be careful!</h2>
  <p>Using MDC & Vue components is addictive.</p>
</div>
```

When not using the `title` slot, the `h2` element will not be rendered.

## Props

- `mdc-unwrap`: Whether to unwrap the content or not. This is useful when you want to extract the content nested in native Markdown syntax. Each specified tag will get removed from AST.
  - **Type:** `boolean` or `string`
  - **Default:** `false`
  - **Example:** `'p'` or `'ul li'`

  # Prose Components

> A list of Prose components.

Prose components are replacements for HTML typography tags. Prose components provide a simple way to customize content UI.

To overwrite a prose component, create a component with the same name in your project `components/content/` directory (ex: `components/content/ProseA.vue`).

<note>

Prose components are originally part of [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc).

</note>

## `ProseA`

<code-group>

```md [Code]
[Link](/docs/components/prose)
```

<code-preview label="Preview" icon="i-lucide-eye">

[Link](/docs/components/prose)

</code-preview>
</code-group>

## `ProseBlockquote`

<code-group>

```md [Code]
> Block quote
```

<code-preview label="Preview" icon="i-lucide-eye">

> Block quote

</code-preview>
</code-group>

## `ProsePre`

<code-group>

````md [Code]
```js [file.js]{2} meta-info=val
export default () => {
  console.log("Code block");
};
```
````

````

<code-preview label="Preview" icon="i-lucide-eye">

```js [file.js]
export default () => {
  console.log('Code block')
}
````

</code-preview>
</code-group>

Component properties will be:

```json
{
  code: "export default () => {\n    console.log('Code block')\n}"
  language: "js"
  filename: "file.js"
  highlights: [2]
  meta: "meta-info=val"
}
```

Check out the [highlight options](/docs/getting-started/configuration#highlight) for more about the syntax highlighting.

<callout type="warning">

If you want to use `]` in the filename, you need to escape it with 2 backslashes: `\\]`. This is necessary since JS will automatically escape the backslash in a string so `\]` will be resolved as `]` breaking our regex.

</callout>

## `ProseCode`

<code-group>

```md [Code]
`code`

`const code: string = 'highlighted code inline'`{lang="ts"}
```

<code-preview label="Preview" icon="i-lucide-eye">

`code`

`const code: string = 'highlighted code inline'`

</code-preview>
</code-group>

## `ProseH1`

<code-group>

```md [Code]
# H1 Heading
```

<code-preview label="Preview" className="pt-4">

# H1 Heading

</code-preview>
</code-group>

## `ProseH2`

<code-group>

```md [Code]
## H2 Heading
```

<code-preview label="Preview" icon="i-lucide-eye">

## H2 Heading

</code-preview>
</code-group>

## `ProseH3`

<code-group>

```md [Code]
### H3 Heading
```

<code-preview label="Preview" icon="i-lucide-eye">

### H3 Heading

</code-preview>
</code-group>

## `ProseH4`

<code-group>

```md [Code]
#### H4 Heading
```

<code-preview label="Preview" icon="i-lucide-eye">

#### H4 Heading

</code-preview>
</code-group>

## `ProseH5`

<code-group>

```md [Code]
##### H5 Heading
```

<code-preview label="Preview" icon="i-lucide-eye">

##### H5 Heading

</code-preview>
</code-group>

## `ProseH6`

<code-group>

```md [Code]
###### H6 Heading
```

<code-preview label="Preview" icon="i-lucide-eye">

###### H6 Heading

</code-preview>
</code-group>

## `ProseHr`

<code-group>

```md [Code]
Divider under.

---

Divider above.
```

<code-preview label="Preview" icon="i-lucide-eye">

Divider under.

---

Divider above.

</code-preview>
</code-group>

## `ProseImg`

<code-group>

```md [Code]
![A Cool Image](https://nuxt.com/assets/design-kit/icon-green.png)
```

<code-preview label="Preview" icon="i-lucide-eye">

![A Cool Image](https://nuxt.com/assets/design-kit/icon-green.png)

</code-preview>
</code-group>

## `ProseUl`

<code-group>

```md [Code]
- Just
- An
- Unordered
- List
```

<code-preview label="Preview" icon="i-lucide-eye">

- Just
- An
- Unordered
- List

</code-preview>
</code-group>

## `ProseLi`

<code-group>

```md [Code]
- List element
```

<code-preview label="Preview" icon="i-lucide-eye">

- List element

</code-preview>
</code-group>

## `ProseOl`

<code-group>

```md [Code]
1. Foo
2. Bar
3. Baz
```

<code-preview label="Preview" icon="i-lucide-eye">

1. Foo
2. Bar
3. Baz

</code-preview>
</code-group>

## `ProseP`

<code-group>

```md [Code]
Just a paragraph.
```

<code-preview label="Preview" icon="i-lucide-eye">

Just a paragraph.

</code-preview>
</code-group>

## `ProseStrong`

<code-group>

```md [Code]
**Just a strong paragraph.**
```

<code-preview label="Preview" icon="i-lucide-eye">

**Just a strong paragraph.**

</code-preview>
</code-group>

## `ProseEm`

<code-group>

```md [Code]
_Just an italic paragraph._
```

<code-preview label="Preview" icon="i-lucide-eye">

_Just an italic paragraph._

</code-preview>
</code-group>

## `ProseTable`

<code-group>

```md [Code]
| Key | Type      | Description |
| --- | --------- | ----------- |
| 1   | Wonderful | Table       |
| 2   | Wonderful | Data        |
| 3   | Wonderful | Website     |
```

<code-preview label="Preview" icon="i-lucide-eye">
<table>
<thead>
  <tr>
    <th>
      Key
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      1
    </td>
    
    <td>
      Wonderful
    </td>
    
    <td>
      Table
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      Wonderful
    </td>
    
    <td>
      Data
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      Wonderful
    </td>
    
    <td>
      Website
    </td>
  </tr>
</tbody>
</table>
</code-preview>
</code-group>

## `ProseTbody`

Included in **ProseTable** example.

## `ProseTd`

Included in **ProseTable** example.

## `ProseTh`

Included in **ProseTable** example.

## `ProseThead`

Included in **ProseTable** example.

## `ProseTr`

Included in **ProseTable** example.

<callout icon="i-simple-icons-github" to="https://github.com/nuxt-modules/mdc/tree/main/src/runtime/components/prose">

Checkout the source code for these components on GitHub.

</callout>

# Setup Nuxt Studio

> Studio is the intuitive CMS interface to edit Nuxt Content websites. Edit your Markdown, YAML and JSON files and publish your changes to GitHub.

Studio is an intuitive CMS interface to edit your Nuxt Content websites.

It takes advantage of the `Preview API` included in Nuxt Content to propose the best editing experience for your content files. Editors can benefit from a user-friendly interface to edit their `Markdown`, `YAML` or `JSON` files.

Developers can customize the editing experience and provide tools to the editor who can focus on content without requiring any technical expertise.

<video :autoplay="true" :controls="true" :loop="true" poster="/home/videos/HomeNotionLikePoster.webp" src="https://res.cloudinary.com/nuxt/video/upload/v1733494722/contentv3final_rc8bvu.mp4">

</video>

## Authentication

The Studio admin is located on [nuxt.studio](https://nuxt.studio). From there you can either login with GitHub or with Google. Both methods give you the same editing rights but since Studio is [synchronized with GitHub](/docs/studio/github), the repository import must be handled by a GitHub user.

<warning>

Google authentication is adapted for non technical users. Google users have to join a team with existing projects to edit them.

</warning>

## Connect your Nuxt Content Repository

Once you are logged in the admin, you have the possibility to import your Nuxt Content repository from the interface.

<tip>

Two options are available, you can either import an existing repository or use one of our [templates](/templates).

</tip>

The only requirement is to host your repository on GitHub. From the interface, connect to our [GitHub app](/docs/studio/github), you'll be then able to link a GitHub repository to your Studio project.

Once the project is created, you can start editing your files with the Studio editors and publish your changes.

## **Enable the Full Editing Experience**

To unlock the complete range of features in Studio, make sure your project URL is properly configured in the deployment section.

**This will enable all Studio features including:**

- **Live preview of your website:** instantly see changes reflected on your site as you work.
- **Dynamic form generation:** Automatically generate forms to edit your files based on your Nuxt Content [collections](/docs/collections/define).
- **Enhanced markdown editors:** enjoy an improved editing experience, including the ability to list and integrate [Vue components](/docs/studio/content#vue-components) that you’ve exposed.
- **Automatic app configuration:** generate [application configurations](/docs/studio/config) based on the schema you’ve defined.

<tip>

We are proposing a GitHub Pages deployment. By using it, we will handle all the requirements for you. However, if you want to use the deployment platform of your choice, please follow the simple guideline below.

</tip>

To be able to set your URL in Studio, you just need to set the `Preview API` in the content configuration of your `nuxt.config.ts` file.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    preview: {
      api: "https://api.nuxt.studio",
    },
  },
});
```

Once deployed, you can ensure the `Preview API` has been activated by navigating to the `/__preview.json` page on your site. This metadata page is automatically generated by the Content module and must be accessible to connect your URL in the self-hosted section of Studio.

### Troubleshooting

The `__preview.json` file is generated but you encounter a `Forbidden error: invalid property check` when setting your URL in the self-hosted section, follow these steps:

<prose-steps level="4">

#### Ensure the `gitInfo` field is set and accurate in the `__preview.json` file

```json [https://your-website.com/__preview.json]
"gitInfo": {
  "name": "content",
  "owner": "nuxt",
  "url": "https://github.com/nuxt/content"
},
```

<warning>

This information should be populated automatically in most cases. We support most popular providers (NuxtHub, Vercel, Netlify, etc.), but if you're using a non supported provider or a custom one, it may not be fetched correctly.

</warning>

#### Override `gitInfo` in your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    preview: {
      api: "https://api.nuxt.studio",
      gitInfo: {
        name: "Your repository name",
        owner: "Your repository owner/organization",
        url: "Your GitHub repository URL",
      },
    },
  },
});
```

#### Ensure these fields are correctly set in `__preview.json`

The `Forbidden error` should be resolved and you should be able to set your URL on Nuxt Studio. If not, please contact us on the [Discord server](https://discord.gg/sBXDm6e8SP).

</prose-steps>

# Real time synchronization between Studio and GitHub

> Nuxt Studio is natively synced with GitHub. Install the Nuxt Studio GitHub app and enable content publication on GitHub directly from Studio.

<tip>

This section explains the syncronization behaviour between Studio and GitHub. This process is handled directly from the platform and does not require any external action. This page purpose is purely informational.

</tip>

## Overview

Nuxt Studio integrates with the [GitHub](https://github.com) API, enabling smooth synchronization between Studio and your GitHub repositories. This first-class integration is made possible through the utilization of [GitHub Apps](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps#about-github-apps).

## Installation

During Studio project creation, you'll need to install the [Nuxt Studio GitHub App](https://github.com/apps/nuxt-studio) in your personal account or in the organizations you manage. Installing a GitHub App requires either organization ownership or admin permissions in a repository. If you lack the necessary permissions, the repository owner will need to approve the request.

You can access the installation page from anywhere on the app by clicking on [Install with GitHub](https://github.com/apps/nuxt-studio/installations/new).

### Permissions

During the installation of our GitHub app, you will be prompted to grant certain permissions:

- Read access to `actions`, `metadata`, `members`, and `plan`
- Read and write access to `secrets`, `administration`, `contents`, `pages`, `pull requests` and `workflows`

We need read access to `actions` to send a notification when a workflow run fails on a pull request or on the repository default branch. `metadata` is mandatory to fetch repository data, `members` to import your organization members and repository collaborators and `plan` is used to propose features based on your GitHub account plan.

Nuxt Studio acts on your behalf to create repositories, branches, pull requests, and perform commits and merges. We also offer one-click deployment to GitHub Pages with instant preview of workflows and environment variables secrets management. To accomplish this, we need read and write access to `administration`, `contents`, `pages`, `pull requests`, `workflows` and `secrets`.

### Repositories Installations

When installing our GitHub app, you will be prompted to select all repositories or a subset of them. This selection can be changed at any time by going to the [GitHub app settings](https://github.com/apps/nuxt-studio/installations/new).

By clicking on `Install`, Nuxt Studio will install each repository you have selected, enabling you to perform all the actions listed above.

## Uninstall

All the data imported from GitHub is directly associated with your GitHub app installation. If you uninstall the GitHub app, all the associated data will be deleted.

If you delete your GitHub repository, the associated Nuxt Studio project will be automatically removed. However, if this project was subscribed to a Team plan, the subscription will not be canceled automatically. You will need to manually end the subscription via [Lemon Squeezy]() or [contact us](team@nuxt.studio) for assistance.

# Edit your content

> Discover and select your favorite way to manage your content between the visual or the code editor.

Nuxt Studio offers a versatile workspace for both developers and content writers, giving them the freedom to choose between our differents editors:

- [Notion-like editor](#notion-like-editor-markdown-files) for `Markdown` files
- [Form editor](#form-editor-yaml-and-json-files) for `YAML` and `JSON` files
- [Code editor](#code-editor) for any kind of files (for technical users only)

<tip>

You can choose your favorite editor from the settings page of your project.

</tip>

Each editor serves its own purpose. Some users are used to code edition, while others prefer a non-technical, visual approach. At the end, **code syntax is the final output** for both editors.

## Notion-like editor (`Markdown` files)

![edit your website with a visual interface](/docs/studio/visual-markdown-editor.webp)

This editor is heavily inspired by Notion, well known for its intuitive design and flexibility. Much like a standard text editor, this editor is designed to be familiar and easy to use. However, it stands out with its additional features that improve the writing experience.

<tip to="/blog/visual-editor">

You want to know how we've built this editor and how it works under the hood? Check this blog post.

</tip>

### Frontmatter

[Frontmatter](/docs/files/markdown#frontmatter) is a convention of Markdown-based CMS to provide meta-data to pages, like description or title or any other data you would like to store as `key: value` pair.

Based on the user [collection and schema](/docs/collections/define) provided, a form is generated to edit this metadata from the editor.

<video :autoplay="true" :controls="true" :loop="true" src="https://res.cloudinary.com/nuxt/video/upload/v1739982761/frontmatterform_yjafgt.mp4" poster="/home/videos/HomeNotionLikePoster.webp">

</video>

<prose-note to="#form-editor-yaml-and-json-files">

Check this section to learn more about form generation based on schema.

</prose-note>

### Toolbar

Highlight your text to reveal the toolbar, giving you access to all the standard text editing features (title formatting, Bold, Italic, Strike-through, code, link, class, bullet list, numerated list...).

### Medias

Users can simply drag and drop images directly into the editor. An upload modal will open to let you choose the destination folder.

By typing `/` and searching for `Image` or `Video`, they can quickly insert a media. A modal will open to let them choose the media they want to insert from the media gallery (aka the`public` folder of the Nuxt application).

From the media modal, you can set the [alt attribute](https://www.w3schools.com/tags/att_img_alt.asp) for SEO and accessibility purpose.

### Vue Components

One of this editor standout features is its ability to integrate and customize any complex `Vue` component directly within the editor.

#### Create and integrate your own component

A developer can create any kind of visually complex components and editors will be able to use them and focus on the content. An editor can also play with the component properties, styles, and behaviour to fit its specific requirements as long as the developer made it customisable.

<steps level="4">

#### Create your component

You can create Vue components and integrate them into Markdown. They just need to be located in the `/components/content` folder to be available.

```vue [components/content/HomeFeature.vue]
<template>
  <div class="flex items-start gap-3">
    <div class="flex items-center justify-center border rounded-lg p-1.5">
      <UIcon :name="icon" />
    </div>
    <div class="flex flex-col">
      <h3 class="font-semibold">
        <slot name="title" />
      </h3>
      <span>
        <slot name="description" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: "i-ph-cursor-click",
  },
});
</script>
```

#### Integrate these components easily within any Markdown file using [MDC syntax](/docs/files/markdown#mdc-syntax)

```mdc [content/index.md]
::home-feature
  ---
  icon: i-mdi-vuejs
  ---
  #title
  Embedded Vue components
  #description
  Edit slots and props inside the Notion-like editor.
::
```

#### Edit them with our Studio editors

The visual editor simplifies the component edition, allowing you to integrate and edit them directly in the visual editor. Non technical users can play with **slots** and **props** without any technical knowledge.

<video :autoplay="true" :controls="true" :loop="true" src="https://res.cloudinary.com/nuxt/video/upload/v1744126742/studio/finalpropscomps_usfabp.mp4">

</video>

All components in the `/components/content` folder are available in the editor. Studio users can type `/` anywhere while editing to access the list of available components.

<tip to="/docs/studio/debug">

Take a look at this section to validate your `Vue` component integration in the editor in local development.

</tip>
</steps>

#### Integrate built-in components from external libraries

By default, you can integrate any component inside a Markdown file and it should work and be editable from Studio but external components **won't be displayed in the components list in Studio and can't be integrated manually by a Studio editor**.

To list this component inside Studio and fetch all its metadata, you need to set it as global in your Nuxt config file.

Here is an example to integrate Button and Icon components from the [Nuxt UI](https://ui.nuxt.com) library:

```ts
export default defineNuxtConfig({
  hooks: {
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton", "UIcon"].includes(c.pascalName),
      );

      globals.forEach((c) => (c.global = true));
    },
  },
});
```

## Form editor

![YAML and JSON edition with auto generated form](/blog/frontmatters.png)

This editor is used whether you’re editing the [frontmatter]() of a `Markdown` file or a `JSON` / `YAML` file.

It eliminates the need to interact directly with complex file syntax. Instead, a form is automatically generated based on the provided user [collection schema](/docs/collections/define).

### **Defining your form with** `zod` Schema

<prose-note to="/docs/collections/define">

Learn more about schema collection definition in the dedicated section.

</prose-note>

Once the `schema` property has been defined in your collection, this will automatically generate the corresponding form on Studio interface.

<prose-code-group>

```ts [content.config.ts]
export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        draft: z.boolean().default(false),
        category: z.enum(["Alps", "Himalaya", "Pyrenees"]).optional(),
        date: z.date(),
        image: z.object({
          src: z.string().editor({ input: "media" }),
          alt: z.string(),
        }),
        slug: z.string().editor({ hidden: true }),
        icon: z.string().optional().editor({ input: "icon" }),
        authors: z.array(
          z.object({
            slug: z.string(),
            username: z.string(),
            name: z.string(),
            to: z.string(),
            avatar: z.object({
              src: z.string(),
              alt: z.string(),
            }),
          }),
        ),
      }),
    }),
  },
});
```

<code-preview icon="i-lucide-eye" label="Generated Form">

![Form preview](/docs/studio/preview-schema.png)

</code-preview>
</prose-code-group>

### **Native Inputs Mapping**

Primitive Zod types are automatically mapped to appropriate form inputs in:

- **String** → Text input
- **Date** → Date picker
- **Number** → Number input (counter)
- **Boolean** → Toggle switch
- **Enum** → Select dropdown
- **Arrays of strings** → List of badge inputs
- **Arrays of objects** → Accordion of items with embedded form

<video :autoplay="true" :controls="true" :loop="true" src="https://res.cloudinary.com/nuxt/video/upload/v1740679550/arrayobjectandstring_r1jpvz.mp4" poster="https://res.cloudinary.com/nuxt/video/upload/v1740679550/arrayobjectandstring_r1jpvz.jpg">

</video>

### Custom Inputs Mapping

Studio goes beyond primitive types. You can customise form fields using the `editor` method, which extends Zod types with metadata to empower editor interface.

This allows you to define custom inputs or hide fields.

#### Usage

```ts [content.config.ts]
mainScreen: z.string().editor({ input: "media" });
```

#### Options

##### `input: 'media' | 'icon'`

You can set the editor input type. Currently `icon` and `media` are available.

##### `hidden: Boolean`

This option can be set to avoid the display of a field in the Studio editor.

<prose-tip>

Studio inputs are fully extensible. We can create as many input as we want based on our users needs.

</prose-tip>

## Code editor

![Edit directly your raw content with our code editor](/docs/studio/code-editor.webp)

Even though the two previous editors are dedicated to a specific file extension (`md` or `yaml`/`json`). The code editor can be used with any kind of file.

It provides full control over your content, allowing you to write raw content directly:

- [MDC](/docs/files/markdown) syntax for `Markdown` files
- [JSON](/docs/files/json) or [YAML](/docs/files/yaml) syntax

When your file is saved with the code editor, the content is stored exactly as you've written it, preserving all specific syntax and formatting. This editor is ideal for users comfortable with code syntax (`Markdown`, `YAML` or `JSON`) who want precise control over structure of their content.

# Manage and integrate Medias in Nuxt Content Studio CMS

> Explore how to browse and manage media files, and integrate them into your projects using Nuxt Content Studio CMS features.

## Browse your medias

All medias located in the `/public` directory are available in the **Media** tab of the Studio platform.

![Media gallery on Studio](/docs/studio/editors-medias.webp)

It's an intuitive interface for non technical users to manage their `/public` directory.

Users can easily browse folders, upload new media at any level, and drag and drop media into other folders, making medias organization straightforward.

The interface is designed to be intuitive for non-technical users. It can be viewed as a user friendly IDE.

## Use it in the Notion-like editor

Users can simply drag and drop images directly into the editor. An upload modal will open to let you choose the destination folder.

By typing `/` and searching for `Image`, they can quickly insert a media. A modal will open to let them choose the media they want to insert.

From the media modal, you can set the [alt attribute](https://www.w3schools.com/tags/att_img_alt.asp) for SEO and accessibility purpose.

# Tailor application configuration edition

> Discover how to customize application config edition in Studio by providing schema. Ensure a smooth and structured content management experience.

When entering the **Config** tab of the editor, you can browse configurations to customize your website. These configurations represent the settings defined in your `app.config.ts` file.

## `app.config.ts`

The [`app.config.ts`](https://nuxt.com/docs/guide/directory-structure/app-config) file is a configuration file introduced in Nuxt 3. It's a TypeScript file that allows you to configure various aspects of your application settings. Developers can easily turn any website into a configurable experience using this file.

## Customize edition

<prose-note>

Ensure you have at least an empty config file in your app.

```ts [app.config.ts]
export default defineAppConfig({});
```

</prose-note>

To create a customized editing experience for your `app.config.ts` in Studio, you need to create a `nuxt.schema.ts` file in your project. This schema serves as a representation of your `app.config.ts`.

### Helpers

<prose-note>

Those helpers are provided by the Nuxt Content `Preview API`.

</prose-note>

- The `group` method allows you to customize parent objects.
- The `field` method allows you to customize inputs (aka leaf).

```ts [nuxt.schema.ts]
import { field, group } from "@nuxt/content/preview";

export default defineNuxtSchema({
  appConfig: {
    parent: group({
      title: "Parent title",
      description: "Parent description.",
      icon: "i-icon-to-display",
      fields: {
        leaf: field({
          type: "Type of component used to edit your field",
          title: "Field title",
          description: "Field Description",
          icon: "i-icon-to-display",
          default: "default value",
        }),
      },
    }),
  },
});
```

<tip>

It is not mandatory to include all your app config keys; only those you wish to showcase on the Studio interface need to be added.

</tip>

#### Input Types

The `type` in the `field()` method's first parameter can accept various values:

- string
- number
- boolean
- array
- object
- icon
- media

Based on these values, the Studio UI will adapt to display the appropriate input type. For instance, an icon picker is displayed for `icon` type or the media library is displayed for `media` type.

Text can be displayed as a select instead on a classical input if you provide a `required` key in the `field()` method:

```ts [nuxt.schema.ts]
import { field, group } from "@nuxt/content/preview";

export default defineNuxtSchema({
  appConfig: {
    parent: group({
      title: "UI",
      description: "UI configuration",
      icon: "i-ph-palette-fill",
      fields: {
        primary: field({
          type: "string",
          title: "Primary",
          description: "Primary color of your UI.",
          icon: "i-ph-palette",
          default: "sky",
          required: ["sky", "mint", "rose", "amber"],
        }),
      },
    }),
  },
});
```

### Edit on Studio

Once your schema is deployed. Any user can access the **Data** section and play with the generated form.

Any update in the form will be directly applied to the `app.config.ts` file. You can review those changes on the review page.

<code-group>
<code-preview icon="i-lucide-eye" label="Preview">

![app config UI on Studio](/docs/studio/home-data-studio-dark.webp)

</code-preview>

```ts [nuxt.schema.ts]
export default defineNuxtSchema({
  ui: group({
    title: 'UI',
    description: 'UI Customization.',
    icon: 'i-mdi-palette-outline',
    fields: {
      primary: field({
        type: 'string',
        title: 'Primary',
        description: 'Primary color of your UI.',
        icon: 'i-mdi-palette-outline',
        required: ['sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', '...']
      }),
      gray: field({ ... }),
      icons: group({
        title: 'Icons',
        description: 'Manage icons used in UI Pro.',
        icon: 'i-mdi-application-settings-outline',
        fields: {
          search: field({ ...}),
          dark: field({ ... }),
          light: field({ ... }),
          external: field({ ...}),
          chevron: field({ ... }),
          hash: field({ ... })
        }
      })
    }
  })
})
```

</code-group>

<tip to="/docs/studio/debug">

Take a look at this section to validate your schema in local development.

</tip>

<tip to="https://github.com/nuxt-ui-pro/docs/blob/main/nuxt.schema.ts">

For a practical example, take a look at the schema we've developed for the UI Pro Docs starter.

</tip>

# Components use Vuetify

> Do not style pages or components with css classes. Instead, use Vuetify's built-in utility classes and props for styling.
> Vuetify is a powerful UI library that provides a wide range of components and utilities to build responsive and visually appealing applications. When using Vuetify, it's important to follow best practices for styling and layout.
> This section provides guidelines on how to effectively use Vuetify's utility classes and props to style your pages and components.

## Use Vuetify's utility classes
Vuetify provides a comprehensive set of utility classes that can be used to style your components and pages. These utility classes are designed to be consistent and easy to use, allowing you to quickly apply styles without writing custom CSS.
