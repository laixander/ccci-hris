# Installing Nuxt UI

Sources: https://ui.nuxt.com/docs/getting-started/installation/nuxt · https://ui.nuxt.com/docs/getting-started/installation/vue

## Nuxt

```bash
pnpm add @nuxt/ui tailwindcss   # or npm/yarn/bun
```
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```
```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";
```
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css']
})
```
```vue
<!-- app.vue -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```
Do **not** manually add `@nuxt/icon`, `@nuxt/fonts`, or `@nuxtjs/color-mode` to `modules` — `@nuxt/ui` registers them automatically (still configurable via the `icon`, `fonts`, `colorMode` keys).

### Recommended VS Code / editor settings
```json
// .vscode/settings.json
{
  "files.associations": { "*.css": "tailwindcss" },
  "editor.quickSuggestions": { "strings": "on" },
  "tailwindCSS.classAttributes": ["class", "ui"],
  "tailwindCSS.classFunctions": ["defineAppConfig"]
}
```

### Official starter templates
```bash
npm create nuxt@latest -- -t ui            # Starter
npm create nuxt@latest -- -t ui/landing    # Landing (Nuxt Content)
npm create nuxt@latest -- -t ui/docs       # Docs site (Nuxt Content)
npm create nuxt@latest -- -t ui/saas       # SaaS (landing+pricing+docs+blog)
npm create nuxt@latest -- -t ui/dashboard  # Multi-column admin dashboard
npm create nuxt@latest -- -t ui/chat       # AI chatbot (Vercel AI SDK)
npm create nuxt@latest -- -t ui/portfolio  # Portfolio + blog
npm create nuxt@latest -- -t ui/changelog  # GitHub-release-powered changelog
npm create nuxt@latest -- -t ui/editor     # TipTap rich text editor
```

## Vue (Vite, no Nuxt — also works for Inertia/Laravel/AdonisJS)

Add the Vite + Vue plugins in `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui()
  ]
})
```
Same CSS imports (`@import "tailwindcss"; @import "@nuxt/ui";`) in your global stylesheet, and wrap your root component in `<UApp>`. Auto-imports for components/composables work the same way once the plugin is registered. All module options below are passed into `ui({ ... })` instead of `nuxt.config.ts`'s `ui` key.

## Module options (nuxt.config.ts `ui` key / Vue `ui()` plugin options)

| Option | Default | Purpose |
|---|---|---|
| `prefix` | `'U'` | Component name prefix, e.g. `prefix: 'Nuxt'` → `<NuxtButton>`. |
| `fonts` | `true` | Enable/disable the bundled `@nuxt/fonts` integration. |
| `colorMode` | `true` | Enable/disable the bundled `@nuxtjs/color-mode` integration. |
| `theme.colors` | `['primary','secondary','success','info','warning','error']` | Which dynamic semantic color aliases get generated into component themes. Add custom aliases here (e.g. `'tertiary'`) before assigning them a palette in `app.config.ts`. |
| `theme.transitions` | `true` | Adds `transition-colors` to components with hover/active states; disable for a snappier/no-animation feel. |
| `theme.unstyled` (4.9+) | `false` | Strip **all** default theme classes (including structural ones) from every component, keeping only what you supply via `class`/`ui`/`app.config`. |
| `theme.defaultVariants` | `{ color: 'primary', size: 'md' }` | Override default `color`/`size` for all components at once. |
| `theme.prefix` (4.2+) | — | Mirrors a Tailwind CSS class prefix (`@import "tailwindcss" prefix(tw);`) so Nuxt UI's generated classes/variables use the same prefix. May require `fonts: { processCSSVariables: true }`. |
| `prose` | `false` | Force-import Nuxt UI's `Prose` typography components even without `@nuxt/content`/`@nuxtjs/mdc` installed. |
| `content` | `false` | Force-import `<Prose>` / `<UContent>` even without `@nuxt/content` installed. |
| `experimental.componentDetection` (4.1+) | `false` | `boolean \| string[]`. Scans source for used components to tree-shake unused component CSS. Pass an array to force-include components used only via dynamic `<component :is>`. |

### Example: full options
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    prefix: 'U',
    fonts: true,
    colorMode: true,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      transitions: true,
      defaultVariants: { color: 'neutral', size: 'sm' }
    },
    experimental: { componentDetection: true }
  }
})
```

## Continuous preview releases
Nuxt UI publishes a preview build for every commit/PR to `v4` via `pkg.pr.new`:
```diff
{
  "dependencies": {
-   "@nuxt/ui": "^4.0.0",
+   "@nuxt/ui": "https://pkg.pr.new/@nuxt/ui@<commit-hash>",
  }
}
```
Only use this deliberately (testing an unreleased fix) — default to the published `^4.x` version otherwise.
